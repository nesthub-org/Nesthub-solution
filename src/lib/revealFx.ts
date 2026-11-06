import { isPrerendering } from '../hooks/usePrerendering'

const REVEALS = '.rise, .draw-line, main h2 .marker'
const STAGGER_MS = 70

/**
 * Keeps scrolling free of animation work. Things that animate in play once as they
 * arrive and are then left alone, and looping animations rest while their section is
 * off-screen. What they look like lives in index.css. Anything already on screen when
 * the page loads, or everything if JavaScript is off, is simply there.
 */
export function initRevealFx() {
  if (isPrerendering() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const root = document.getElementById('root')
  if (!root) return

  const reveal = new IntersectionObserver(
    (entries) => {
      let order = 0
      for (const { target, isIntersecting, boundingClientRect } of entries) {
        const el = target as HTMLElement
        const waiting = el.classList.contains('is-waiting')
        if (isIntersecting) {
          if (waiting) {
            el.style.setProperty('--reveal-delay', `${order++ * STAGGER_MS}ms`)
            el.classList.replace('is-waiting', 'is-in')
          }
          reveal.unobserve(el)
        } else if (!waiting) {
          if (boundingClientRect.top > 0) el.classList.add('is-waiting')
          else reveal.unobserve(el)
        }
      }
    },
    { rootMargin: '0px 0px -4% 0px' },
  )

  const rest = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) target.classList.toggle('is-offscreen', !isIntersecting)
    },
    { rootMargin: '100px' },
  )

  const seen = new WeakSet<Element>()
  const watch = (selector: string, observer: IntersectionObserver) => {
    root.querySelectorAll(selector).forEach((el) => {
      if (seen.has(el)) return
      seen.add(el)
      observer.observe(el)
    })
  }

  let frame = 0
  const scan = () => {
    frame = 0
    watch(REVEALS, reveal)
    watch('[data-pausable]', rest)
  }
  scan()

  // A new page arrives without a reload, so its sections have to be picked up too.
  new MutationObserver(() => {
    if (!frame) frame = requestAnimationFrame(scan)
  }).observe(root, { childList: true, subtree: true })
}
