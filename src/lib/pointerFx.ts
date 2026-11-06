import { isPrerendering } from '../hooks/usePrerendering'

/**
 * Cursor and touch effects for the whole site. One listener and no React state:
 * it only writes CSS variables and classes, and what they look like lives in
 * index.css, so nothing here can slow the page down while it loads.
 */
export function initPointerFx() {
  if (isPrerendering() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) followCursor()
  else pingOnTouch()
}

const setVars = (el: HTMLElement, names: [string, string], x: number, y: number) => {
  const box = el.getBoundingClientRect()
  el.style.setProperty(names[0], `${x - box.left}px`)
  el.style.setProperty(names[1], `${y - box.top}px`)
}

// The blueprint grid lights up around the cursor, cards glow under it, and the hero's phone leans towards it.
function followCursor() {
  let frame = 0
  let x = 0
  let y = 0
  let target: Element | null = null
  let band: HTMLElement | null = null

  const apply = () => {
    frame = 0
    const nextBand = target?.closest<HTMLElement>('.blueprint') ?? null
    if (nextBand !== band) {
      band?.classList.remove('is-hot')
      nextBand?.classList.add('is-hot')
      band = nextBand
    }
    if (band) setVars(band, ['--px', '--py'], x, y)

    const card = target?.closest<HTMLElement>('[data-glow]')
    if (card) setVars(card, ['--gx', '--gy'], x, y)

    const phone = band?.querySelector<HTMLElement>('.studio-phone')
    if (band && phone) {
      const box = band.getBoundingClientRect()
      phone.style.setProperty('--ty', `${((x - box.left) / box.width - 0.5) * 12}deg`)
      phone.style.setProperty('--tx', `${(0.5 - (y - box.top) / box.height) * 8}deg`)
    }
  }

  document.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX
      y = e.clientY
      target = e.target as Element
      if (!frame) frame = requestAnimationFrame(apply)
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', () => {
    band?.classList.remove('is-hot')
    band = null
  })
}

// Touch screens have no cursor, so a tap on the grid sends a ring across it instead.
function pingOnTouch() {
  document.addEventListener(
    'pointerdown',
    (e) => {
      const target = e.target as Element
      const band = target.closest<HTMLElement>('.blueprint')
      if (!band || target.closest('a, button, input, textarea, .studio-phone')) return
      const box = band.getBoundingClientRect()
      const ring = document.createElement('span')
      ring.className = 'blueprint-ping'
      ring.style.left = `${e.clientX - box.left}px`
      ring.style.top = `${e.clientY - box.top}px`
      ring.addEventListener('animationend', () => ring.remove())
      band.appendChild(ring)
    },
    { passive: true },
  )
}
