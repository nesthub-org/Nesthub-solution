import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from './SmoothScroll'

// Scrolls to the top on a route change, but leaves hash-anchor navigation
// (e.g. /#contact) alone so the browser can do its native anchor scroll.
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
