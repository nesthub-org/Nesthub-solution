// Runs after `vite build`. The built app is a pure client-rendered SPA, so
// the file a crawler fetches (dist/index.html) has an empty <div id="root">
// — no <h1>, no links, no text. This script serves the real `dist/` build,
// visits each route in headless Chromium, waits for React to render, and
// overwrites the static HTML for that route with the fully-rendered DOM.
// Real visitors still get the same JS bundle and hydrate normally
// (see src/main.tsx) — this only changes what non-JS crawlers see.
//
// Blog posts live in the backend, so their routes are fetched from the API
// at build time and also appended to dist/sitemap.xml. Publishing a post
// re-triggers this build (backend/utils/triggerSiteRebuild.js).
import { loadEnv, preview } from 'vite'
import { chromium } from 'playwright-chromium'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SITE_URL = 'https://nesthubsolution.in'

const routes = [
  { path: '/', out: 'index.html' },
  { path: '/careers', out: 'careers/index.html' },
  { path: '/case-studies', out: 'case-studies/index.html' },
]

const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env }
const apiUrl = (env.VITE_API_URL || '').replace(/\/$/, '')

async function fetchPublishedPosts() {
  if (!apiUrl) {
    console.warn('prerender: VITE_API_URL is not set — skipping blog prerender')
    return null
  }
  try {
    const res = await fetch(`${apiUrl}/blog/v1/blog/sitemap`, { signal: AbortSignal.timeout(20000) })
    const body = await res.json()
    if (!res.ok || !body.success) throw new Error(body.message || `HTTP ${res.status}`)
    return body.data
  } catch (error) {
    // Never fail the whole deploy because the API is briefly unreachable —
    // blog pages still work client-side, they just miss the static snapshot.
    console.warn(`prerender: could not fetch blog posts (${error.message}) — skipping blog prerender`)
    return null
  }
}

const posts = await fetchPublishedPosts()
if (posts) {
  routes.push({ path: '/blog', out: 'blog/index.html', dataId: 'blog-list-data' })
  for (const post of posts) {
    routes.push({ path: `/blog/${post.slug}`, out: `blog/${post.slug}/index.html`, dataId: 'blog-post-data' })
  }
}

const server = await preview({ preview: { port: 4174, strictPort: true }, logLevel: 'warn' })
const base = server.resolvedUrls?.local?.[0]
if (!base) throw new Error('prerender: could not resolve preview server URL')

const browser = await chromium.launch()
const page = await browser.newPage()
// Tell the app it's being captured for a static snapshot — components that
// lazy-load behind <Suspense> (see src/hooks/usePrerendering.ts) read this
// to skip rendering, so the snapshot doesn't bake in "resolved" content a
// real visitor's first paint can't possibly match yet. Runs before any page
// script, so it's set for every route below.
await page.addInitScript(() => {
  window.__PRERENDER__ = true
})

const prerenderedBlogPaths = new Set()

try {
  for (const route of routes) {
    await page.goto(new URL(route.path, base).href, { waitUntil: 'networkidle' })
    // Let above-the-fold entrance animations (Reveal/framer-motion) finish
    // so the static snapshot reads as a settled page, not a mid-transition
    // frame, for anyone (or any crawler) who never runs the JS bundle.
    await page.waitForTimeout(1200)

    // Blog pages depend on the API; if the data didn't arrive, skip the
    // snapshot rather than shipping a loading skeleton as the static page.
    if (route.dataId && !(await page.locator(`#${route.dataId}`).count())) {
      console.warn(`prerender: ${route.path} has no data (API error?) — skipped`)
      continue
    }

    const h1 = await page.locator('h1').first().textContent().catch(() => null)
    if (!h1 || !h1.trim()) {
      throw new Error(`prerender: ${route.path} rendered with no <h1> — aborting so a broken snapshot doesn't ship`)
    }

    // Lets src/main.tsx tell whether this snapshot belongs to the URL being opened
    await page.evaluate((p) => {
      document.getElementById('root').dataset.route = p
    }, route.path)

    const html = await page.content()
    const outPath = path.join('dist', route.out)
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, html)
    if (route.dataId) prerenderedBlogPaths.add(route.path)
    console.log(`prerendered ${route.path} -> dist/${route.out} (${html.length.toLocaleString()} bytes)`)
  }
} finally {
  await browser.close()
  await new Promise((resolve, reject) => server.httpServer.close((err) => (err ? reject(err) : resolve())))
}

// ─── Sitemap: static pages from public/sitemap.xml + every published post ───
if (posts) {
  const xmlEscape = (s = '') =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
  const day = (d) => (d ? new Date(d).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))

  const latest = posts.reduce((max, p) => (p.updatedAt > max ? p.updatedAt : max), '')
  const entries = [
    `  <url>\n    <loc>${SITE_URL}/blog</loc>\n    <lastmod>${day(latest)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    ...posts.map((p) => {
      const image = p.coverImage?.url
        ? `\n    <image:image>\n      <image:loc>${xmlEscape(p.coverImage.url)}</image:loc>\n      <image:title>${xmlEscape(p.coverImage.alt || p.title)}</image:title>\n    </image:image>`
        : ''
      return `  <url>\n    <loc>${SITE_URL}/blog/${xmlEscape(p.slug)}</loc>\n    <lastmod>${day(p.updatedAt || p.publishedAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>${image}\n  </url>`
    }),
  ]

  const sitemapPath = path.join('dist', 'sitemap.xml')
  let xml = await readFile(sitemapPath, 'utf8')
  if (!xml.includes('xmlns:image=')) {
    xml = xml.replace('<urlset ', '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ')
  }
  xml = xml.replace('</urlset>', `\n${entries.join('\n\n')}\n\n</urlset>`)
  await writeFile(sitemapPath, xml)
  console.log(`sitemap: added /blog + ${posts.length} post(s) (${prerenderedBlogPaths.size} prerendered)`)
}
