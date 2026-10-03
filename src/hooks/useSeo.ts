import { useEffect } from 'react'
import { SITE_URL } from '../lib/blog'

interface SeoOptions {
  title: string
  description?: string
  /** Path only, e.g. "/blog/my-post" */
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noindex?: boolean
  keywords?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}

type Restore = () => void

// Sets (or creates) a <meta>/<link> and returns a function that puts the
// previous value back — so leaving a page never leaks its tags onto the next.
function setTag(selector: string, create: () => HTMLElement, attr: string, value: string | undefined): Restore {
  if (value === undefined) return () => {}
  let el = document.head.querySelector<HTMLElement>(selector)
  const existed = Boolean(el)
  const prev = el?.getAttribute(attr) ?? null
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
  return () => {
    if (!existed) el!.remove()
    else if (prev !== null) el!.setAttribute(attr, prev)
  }
}

const meta = (key: 'name' | 'property', name: string, value: string | undefined) =>
  setTag(
    `meta[${key}="${name}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute(key, name)
      return m
    },
    'content',
    value,
  )

/**
 * Per-route SEO tags. Every route shares one static index.html, so without
 * this each page would inherit the homepage's title, canonical and social
 * preview. The prerender step snapshots <head> after this runs, so the static
 * HTML search engines fetch carries the right tags too.
 */
export function useSeo(opts: SeoOptions) {
  const { title, description, path, image, imageAlt, type = 'website', noindex, keywords, publishedTime, modifiedTime, author } = opts
  const tagList = opts.tags?.join('|')

  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const prevTitle = document.title
    document.title = title

    const restores: Restore[] = [
      meta('name', 'description', description),
      meta('name', 'title', title),
      meta('name', 'keywords', keywords),
      meta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
      setTag(
        'link[rel="canonical"]',
        () => {
          const l = document.createElement('link')
          l.rel = 'canonical'
          return l
        },
        'href',
        url,
      ),
      meta('property', 'og:type', type),
      meta('property', 'og:url', url),
      meta('property', 'og:title', title),
      meta('property', 'og:description', description),
      meta('property', 'og:image', image),
      meta('property', 'og:image:alt', imageAlt ?? (image ? title : undefined)),
      meta('name', 'twitter:url', url),
      meta('name', 'twitter:title', title),
      meta('name', 'twitter:description', description),
      meta('name', 'twitter:image', image),
      meta('name', 'twitter:image:alt', imageAlt ?? (image ? title : undefined)),
      meta('property', 'article:published_time', type === 'article' ? publishedTime : undefined),
      meta('property', 'article:modified_time', type === 'article' ? modifiedTime : undefined),
      meta('property', 'article:author', type === 'article' ? author : undefined),
    ]

    // Size hints in index.html describe the default OG image only
    const sizeRestores =
      image !== undefined
        ? ['og:image:width', 'og:image:height'].map((p) => {
            const el = document.head.querySelector(`meta[property="${p}"]`)
            if (!el) return () => {}
            el.remove()
            return () => document.head.appendChild(el)
          })
        : []

    // A prerendered snapshot already contains these; start clean so they don't double up
    document.head.querySelectorAll('meta[property="article:tag"]').forEach((m) => m.remove())
    const tagEls = (type === 'article' && tagList ? tagList.split('|') : []).map((t) => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'article:tag')
      m.setAttribute('content', t)
      document.head.appendChild(m)
      return m
    })

    return () => {
      document.title = prevTitle
      restores.reverse().forEach((r) => r())
      sizeRestores.forEach((r) => r())
      tagEls.forEach((m) => m.remove())
    }
  }, [title, description, path, image, imageAlt, type, noindex, keywords, publishedTime, modifiedTime, author, tagList])
}
