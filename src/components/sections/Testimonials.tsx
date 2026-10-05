import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { testimonials } from '../../data/content'
import { SplitText } from '../SplitText'

const STEP_MS = 7000

export function Testimonials() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const t = testimonials[index]

  // Auto-advance like a slideshow; hovering the section holds the current quote.
  useEffect(() => {
    if (paused || reduced) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), STEP_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, reduced])

  return (
    <section className="mx-auto mt-28 max-w-[1320px] px-4 sm:mt-32 sm:px-6">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative overflow-hidden rounded-[28px] bg-[#07080b] px-5 py-10 sm:px-10 sm:py-12 lg:px-12"
      >
        {/* ambience */}
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-500/25 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 h-[380px] w-[380px] rounded-full bg-violet-500/15 blur-[110px]" />
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 right-6 select-none font-serif text-[240px] leading-none text-white/[.04] sm:right-16 sm:text-[320px]"
        >
          ”
        </span>

        <Reveal tilt={false}>
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Testimonials</span>
              <SplitText className="mt-3 text-[28px] font-bold leading-[1.08] tracking-[-.035em] text-white sm:text-[36px]">
                What Our Clients Say
              </SplitText>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
              <span className="text-[24px] font-bold tracking-[-.03em] text-white">5.0</span>
              <span>
                <span className="block text-[14px] tracking-[2px] text-amber-400">★★★★★</span>
                <span className="block text-[12px] text-white/50">from {testimonials.length} client reviews</span>
              </span>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px] lg:items-center lg:gap-12">
          <div className="min-h-[250px] sm:min-h-[200px] lg:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="max-w-[820px] text-pretty text-[19px] font-medium leading-[1.45] tracking-[-.02em] text-white sm:text-[24px] lg:text-[28px]">
                  <span className="text-brand-500">“</span>
                  {t.quote}
                  <span className="text-brand-500">”</span>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-[14px] font-bold text-white shadow-[0_10px_30px_rgba(37,99,235,.4)]">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-semibold text-white">{t.name}</span>
                    <span className="block text-[13.5px] text-white/55">{`${t.role} · ${t.company}`}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* client switcher with per-slide progress */}
          <div role="tablist" aria-label="Choose a testimonial" className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-2.5">
            {testimonials.map((c, i) => {
              const on = i === index
              return (
                <button
                  key={c.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setIndex(i)}
                  className={`relative overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-colors duration-300 sm:px-4 sm:py-3 ${
                    on ? 'border-white/25 bg-white/[.08]' : 'border-white/10 bg-white/[.02] hover:border-white/20'
                  }`}
                >
                  <span className={`block truncate text-[13px] font-semibold sm:text-[14.5px] ${on ? 'text-white' : 'text-white/60'}`}>
                    <span className="sm:hidden">{c.name.replace(/^(Mr|Mrs|Ms|Miss)\.\s*/, '').split(' ')[0]}</span>
                    <span className="hidden sm:inline">{c.name.replace(/^(Mr|Mrs|Ms|Miss)\.\s*/, '')}</span>
                  </span>
                  <span className="hidden truncate text-[12.5px] text-white/40 sm:block">{c.company}</span>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
                    {on && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="block h-full origin-left bg-brand-500"
                        initial={{ scaleX: paused || reduced ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused || reduced ? 0 : STEP_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
