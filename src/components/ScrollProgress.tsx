import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-brand-500 via-sky-400 to-violet-500"
    />
  )
}
