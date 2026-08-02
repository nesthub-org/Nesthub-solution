import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  max?: number
  lift?: number
  glare?: boolean
}

export function TiltCard({ children, className, style, max = 10, lift = -6, glare = true }: TiltCardProps) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const [hovering, setHovering] = useState(false)

  const springConf = { stiffness: 200, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springConf)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springConf)
  const translateY = useSpring(0, springConf)
  const glareX = useTransform(px, [0, 1], [0, 100])
  const glareY = useTransform(py, [0, 1], [0, 100])

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleEnter() {
    translateY.set(lift)
    setHovering(true)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
    translateY.set(0)
    setHovering(false)
  }

  return (
    <motion.div
      className={className}
      style={{ ...style, perspective: 1000 }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          y: translateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          height: '100%',
        }}
      >
        {children}
        {/* Mounted only while hovered — a blend-mode layer left on every card
            all the time is expensive to composite and was a source of scroll jank. */}
        <AnimatePresence>{glare && hovering && <Glare x={glareX} y={glareY} />}</AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function Glare({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const background = useTransform([x, y], (latest: number[]) => {
    const [gx, gy] = latest
    return `radial-gradient(320px circle at ${gx}% ${gy}%, rgba(255,255,255,.35), transparent 62%)`
  })
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        inset: 0,
        background,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
      }}
    />
  )
}
