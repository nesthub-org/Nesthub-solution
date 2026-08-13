import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  tilt?: boolean
}

const easeOut = [0.16, 1, 0.3, 1] as const

export function Reveal({ children, delay = 0, y = 24, className, tilt = true }: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      rotateX: tilt ? 6 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, delay, ease: easeOut },
    },
  }

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 800 }}
      initial="hidden"
      whileInView="show"
      // Fixed pixel margin, not percentage — percentage rootMargin resolves
      // against the IntersectionObserver root's size, which on mobile Safari
      // and Chrome keeps shifting as the address bar shows/hides and the
      // visual viewport resizes. That made the trigger zone unstable: content
      // would sometimes pop in already-revealed on load, or never fire at
      // all. Pixel values are resolved once and stay correct regardless of
      // device or viewport-height changes.
      viewport={{ once: true, margin: '0px 0px -80px 0px', amount: 0.15 }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
