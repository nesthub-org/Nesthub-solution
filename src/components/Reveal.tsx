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
      viewport={{ once: true, margin: '-10% 0px -8% 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
