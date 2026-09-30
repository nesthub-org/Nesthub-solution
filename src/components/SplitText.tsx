import { Children, isValidElement, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

interface SplitTextProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  stagger?: number
}

const easeOut = [0.16, 1, 0.3, 1] as const

const word: Variants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(8px)' },
  show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: easeOut } },
}

// Break children into animatable units: every word of a text node becomes
// its own unit, while nested elements (a coloured <span>, a <br />) are kept
// intact as a single unit so their styling survives.
function toUnits(children: ReactNode): ReactNode[] {
  const units: ReactNode[] = []
  Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      for (const part of String(child).split(/(\s+)/)) {
        if (part) units.push(part)
      }
    } else if (isValidElement(child)) {
      units.push(child)
    }
  })
  return units
}

// Headline reveal: each word slides up from behind a mask and un-blurs, in
// a stagger, the first time the heading scrolls into view.
export function SplitText({ children, as = 'h2', className, delay = 0, stagger = 0.06 }: SplitTextProps) {
  const Tag = motion[as] as typeof motion.h2
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={container}
    >
      {toUnits(children).map((unit, i) => {
        if (typeof unit === 'string' && /^\s+$/.test(unit)) return unit
        if (isValidElement(unit) && unit.type === 'br') return <br key={i} />
        return (
          // Extra bottom padding + matching negative margin keeps descenders
          // (g, y, p) from being clipped by the mask.
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span variants={word} className="inline-block will-change-transform">
              {unit}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
