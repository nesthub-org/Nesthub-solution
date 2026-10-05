import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { services } from '../../data/content'

const words = [...services.map((s) => s.title), 'Built in Jaipur']

function Row({ dark, reverse }: { dark?: boolean; reverse?: boolean }) {
  // Repeated twice so the -50% marquee translate loops seamlessly
  const run = [...words, ...words]
  return (
    <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {[run, run].map((r, k) => (
        <div key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
          {r.map((w, i) => (
            <span key={i} className="flex items-center">
              <span
                className={`whitespace-nowrap px-6 text-[28px] font-bold tracking-[-.03em] sm:text-[40px] ${
                  i % 2 === 1 ? (dark ? 'text-transparent [-webkit-text-stroke:1.2px_rgba(255,255,255,.75)]' : 'text-transparent [-webkit-text-stroke:1.2px_#ffffff]') : 'text-white'
                }`}
              >
                {w}
              </span>
              <span className={`text-[22px] ${dark ? 'text-brand-500' : 'text-white/70'}`}>✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

/** Two crossing marquee ribbons that drift sideways as the page scrolls. */
export function KineticRibbons() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['4%', '-8%'])
  const x2 = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '4%'])

  return (
    <section ref={ref} aria-label="What we do" className="relative overflow-hidden pb-4 pt-20 sm:pt-24">
      <motion.div style={{ x: x1 }} className="relative z-10 -mx-[12%] -rotate-[3deg] bg-brand-500 py-4 shadow-[0_20px_50px_rgba(37,99,235,.3)] sm:py-5">
        <Row />
      </motion.div>
      <motion.div style={{ x: x2 }} className="relative -mx-[12%] mt-3 rotate-[2.5deg] bg-ink py-4 sm:mt-4 sm:py-5">
        <Row dark reverse />
      </motion.div>
    </section>
  )
}
