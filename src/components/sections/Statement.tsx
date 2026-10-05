import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

// Words wrapped in *asterisks* are highlighted in brand blue once lit.
const text =
  "We're a small, senior team from Jaipur. We design, build and grow digital products that feel *effortless* to use — and *perform* like they mean business."

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const accent = word.startsWith('*')
  const clean = word.replace(/\*/g, '')
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className={`mr-[.25em] inline-block ${accent ? 'text-brand-500' : ''}`}>
      {clean}
    </motion.span>
  )
}

/** A big statement whose words light up one by one as it scrolls through the viewport. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-36">
      <div className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">
        <span className="h-px w-10 bg-brand-500" />
        Who we are
      </div>
      <p
        ref={ref}
        aria-label={text.replace(/\*/g, '')}
        className="mt-6 max-w-[1100px] text-[32px] font-bold leading-[1.15] tracking-[-.04em] sm:text-[46px] lg:text-[60px]"
      >
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  )
}
