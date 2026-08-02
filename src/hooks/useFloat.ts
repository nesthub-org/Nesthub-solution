import { animate } from 'animejs'
import { useEffect, useRef } from 'react'

export function useFloat<T extends HTMLElement>(distance = 14, duration = 3500, delay = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const anim = animate(el, {
      translateY: [0, -distance],
      duration,
      delay,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    })
    return () => {
      anim.pause()
    }
  }, [distance, duration, delay])

  return ref
}
