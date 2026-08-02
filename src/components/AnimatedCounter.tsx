import { animate } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  format?: (n: number) => string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, format, duration = 1400, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const [display, setDisplay] = useState(0)
  const played = useRef(false)

  useEffect(() => {
    if (!inView || played.current) return
    played.current = true
    const counter = { val: 0 }
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
