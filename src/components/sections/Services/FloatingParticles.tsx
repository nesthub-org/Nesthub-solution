import { motion, useReducedMotion } from 'framer-motion'

interface Particle {
  x: string
  y: string
  size: number
  duration: number
  delay: number
}

// Fixed, hand-placed positions rather than Math.random() — this section is
// prerendered, and randomizing per-render would mismatch between the
// server-rendered markup and the client hydration pass.
const PARTICLES: Particle[] = [
  { x: '6%', y: '16%', size: 5, duration: 8, delay: 0 },
  { x: '20%', y: '64%', size: 3, duration: 10, delay: 0.6 },
  { x: '36%', y: '10%', size: 4, duration: 9, delay: 1.2 },
  { x: '52%', y: '80%', size: 3, duration: 11, delay: 0.3 },
  { x: '66%', y: '28%', size: 5, duration: 7.5, delay: 1.8 },
  { x: '82%', y: '58%', size: 3, duration: 9.5, delay: 0.9 },
  { x: '93%', y: '18%', size: 4, duration: 8.5, delay: 1.4 },
  { x: '12%', y: '88%', size: 3, duration: 10.5, delay: 0.4 },
  { x: '46%', y: '46%', size: 4, duration: 9, delay: 2 },
  { x: '76%', y: '90%', size: 3, duration: 8, delay: 1.1 },
]

/** A handful of tiny drifting dots scattered across the section background. */
export function FloatingParticles() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-300/60"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={reduceMotion ? undefined : { y: [0, -18, 0], opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  )
}
