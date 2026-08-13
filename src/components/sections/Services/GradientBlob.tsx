import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface GradientBlobProps {
  color: string
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  duration?: number
  delay?: number
  opacity?: number
}

/** A large, softly blurred radial-gradient blob that drifts slowly — pure background chrome. */
export function GradientBlob({
  color,
  size = 420,
  top,
  left,
  right,
  bottom,
  duration = 16,
  delay = 0,
  opacity = 0.4,
}: GradientBlobProps) {
  const reduceMotion = useReducedMotion()

  const style: CSSProperties = {
    width: size,
    height: size,
    top,
    left,
    right,
    bottom,
    background: `radial-gradient(circle at 32% 32%, ${color}, transparent 70%)`,
    opacity,
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={style}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 28, -18, 0],
              y: [0, -22, 14, 0],
              scale: [1, 1.08, 0.95, 1],
            }
      }
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}
