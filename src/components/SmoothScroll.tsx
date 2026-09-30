import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { isPrerendering } from '../hooks/usePrerendering'

// Shared instance so other components (e.g. ScrollToTop) can drive Lenis
// instead of fighting it with raw window.scrollTo calls.
let lenis: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenis
}

// Inertia-style smooth scrolling for the whole page. Skipped during the
// prerender capture and for users who prefer reduced motion, in which case
// the browser's native scroll is used untouched.
export function SmoothScroll() {
  useEffect(() => {
    if (isPrerendering()) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Let scrollable children (chat panel, mobile menu) scroll on their own.
      allowNestedScroll: true,
    })
    lenis = instance

    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })

    // Same-page anchor links like "/#contact" glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (!link || link.target === '_blank') return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
      const target = url.hash === '#top' ? 0 : document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (target === null) return
      e.preventDefault()
      history.pushState(null, '', url.hash)
      instance.scrollTo(target, { offset: -90 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      instance.destroy()
      lenis = null
    }
  }, [])

  return null
}
