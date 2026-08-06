import { useEffect } from 'react'

const SITE_URL = 'https://nesthubsolution.in'

export function useDocumentTitle(title: string, description?: string, path = '/') {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let prevDescription: string | null = null
    const meta = description ? document.querySelector('meta[name="description"]') : null
    if (meta && description) {
      prevDescription = meta.getAttribute('content')
      meta.setAttribute('content', description)
    }

    // Every route shares one static index.html, so the canonical tag (and
    // og:url) baked into <head> only ever points at "/". Without updating it
    // per-route, search engines are told every page is a duplicate of the
    // homepage and consolidate them — e.g. /careers was never indexable on
    // its own. Reset on unmount so navigating away doesn't leak a stale URL.
    const canonical = document.querySelector('link[rel="canonical"]')
    const prevCanonical = canonical?.getAttribute('href') ?? null
    const canonicalHref = `${SITE_URL}${path}`
    if (canonical) canonical.setAttribute('href', canonicalHref)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    const prevOgUrl = ogUrl?.getAttribute('content') ?? null
    if (ogUrl) ogUrl.setAttribute('content', canonicalHref)

    return () => {
      document.title = prevTitle
      if (meta && prevDescription !== null) meta.setAttribute('content', prevDescription)
      if (canonical && prevCanonical !== null) canonical.setAttribute('href', prevCanonical)
      if (ogUrl && prevOgUrl !== null) ogUrl.setAttribute('content', prevOgUrl)
    }
  }, [title, description, path])
}
