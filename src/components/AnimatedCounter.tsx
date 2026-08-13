import { animate } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { isPrerendering } from '../hooks/usePrerendering'

interface AnimatedCounterProps {
  value: number
  format?: (n: number) => string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, format, duration = 1400, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  // Starts at the settled final value, not 0 — the prerender snapshot always
  // captures the count-up already finished, so a real visitor's first paint
  // (before hydration, before this effect has run) has to start there too or
  // hydration can't reconcile the two. The count-up is then replayed as a
  // purely post-hydration client effect, which hydration never sees.
  const [display, setDisplay] = useState(value)
  const played = useRef(false)

  useEffect(() => {
    if (!inView || played.current || isPrerendering()) return
    played.current = true
    const counter = { val: 0 }
    setDisplay(0)
    animate(counter, {
      val: value,
      duration,
      ease: 'outExpo',
      onUpdate: () => setDisplay(counter.val),
    })
  }, [inView, value, duration])

  const formatted = format ? format(display) : Math.round(display).toString()

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}
