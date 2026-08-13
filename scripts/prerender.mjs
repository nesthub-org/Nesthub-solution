// Runs after `vite build`. The built app is a pure client-rendered SPA, so
// the file a crawler fetches (dist/index.html) has an empty <div id="root">
// — no <h1>, no links, no text. This script serves the real `dist/` build,
// visits each route in headless Chromium, waits for React to render, and
// overwrites the static HTML for that route with the fully-rendered DOM.
// Real visitors still get the same JS bundle and hydrate normally
// (see src/main.tsx) — this only changes what non-JS crawlers see.
import { preview } from 'vite'
import { chromium } from 'playwright-chromium'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const routes = [
  { path: '/', out: 'index.html' },
  { path: '/careers', out: 'careers/index.html' },
  { path: '/case-studies', out: 'case-studies/index.html' },
]

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

try {
  for (const route of routes) {
    await page.goto(new URL(route.path, base).href, { waitUntil: 'networkidle' })
    // Let above-the-fold entrance animations (Reveal/framer-motion) finish
    // so the static snapshot reads as a settled page, not a mid-transition
    // frame, for anyone (or any crawler) who never runs the JS bundle.
    await page.waitForTimeout(1200)

    const h1 = await page.locator('h1').first().textContent().catch(() => null)
    if (!h1 || !h1.trim()) {
      throw new Error(`prerender: ${route.path} rendered with no <h1> — aborting so a broken snapshot doesn't ship`)
    }

    const html = await page.content()
    const outPath = path.join('dist', route.out)
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, html)
    console.log(`prerendered ${route.path} -> dist/${route.out} (${html.length.toLocaleString()} bytes)`)
  }
} finally {
  await browser.close()
  await new Promise((resolve, reject) => server.httpServer.close((err) => (err ? reject(err) : resolve())))
}
