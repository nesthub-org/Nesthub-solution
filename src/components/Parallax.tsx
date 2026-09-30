import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

interface ParallaxProps {
  children: ReactNode
  // Total travel in px across the element's pass through the viewport.
  // Positive drifts slower than the page, negative drifts faster.
  offset?: number
  className?: string
}

// Scroll-linked drift: the element moves a little out of step with the page
// so neighbouring blocks slide past each other at different speeds.
export function Parallax({ children, offset = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  )
}
