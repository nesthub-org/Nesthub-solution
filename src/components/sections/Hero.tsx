import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Reveal } from '../Reveal'
import { HeroBackground } from '../HeroBackground'
import { AnimatedCounter } from '../AnimatedCounter'
import { useFloat } from '../../hooks/useFloat'
import { heroBadge, heroPanel, trustedBy } from '../../data/content'

// three.js/r3f/drei is the heaviest dependency in the bundle — load it off
// the critical path so it never blocks first paint or input responsiveness.
const HeroScene = lazy(() => import('../three/HeroScene').then((m) => ({ default: m.HeroScene })))

const headline = ['Websites', '&', 'AI', 'Platforms', 'That']

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const wordItem: Variants = {
  hidden: { opacity: 0, y: 18, rotateX: 25 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.35])

  const aiFloat = useFloat<HTMLDivElement>(9, 3600, 0)
  const cardFloat = useFloat<HTMLDivElement>(7, 4600, 0)

  return (
    <section ref={sectionRef} className="relative">
      <HeroBackground />

      <motion.div style={{ opacity: heroFade }} className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 pt-12 sm:gap-16 sm:pt-16 lg:grid-cols-[1.05fr_.95fr] lg:pt-24">
        <div>
          <Reveal>
            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-2 text-[11.5px] font-medium tracking-[.02em] text-muted shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:h-[34px] sm:py-0 sm:text-[13px] sm:tracking-[.03em]">
              <span className="relative flex h-[7px] w-[7px] shrink-0 items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inline-flex h-full w-full rounded-full bg-success"
                />
                <span className="relative block h-[7px] w-[7px] rounded-full bg-success" />
              </span>
              <span>{heroBadge}</span>
            </div>
          </Reveal>

          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px -8% 0px' }}
            variants={wordContainer}
            style={{ perspective: 800 }}
            className="text-balance mt-6 text-[42px] leading-[1.05] font-bold tracking-[-.035em] sm:text-[52px] lg:text-[62px]"
          >
            {headline.map((word, i) => (
              <motion.span key={i} variants={wordItem} className="mr-[0.28em] inline-block">
                {word}
              </motion.span>
            ))}
            <motion.span variants={wordItem} className="text-shimmer inline-block">
              Drive Results
            </motion.span>
          </motion.h1>

          <Reveal delay={0.1}>
            <p className="text-pretty mt-6 max-w-[560px] text-[18px] font-medium leading-[1.55] text-muted sm:text-[20px]">
              Top-rated web development &amp; freelancing agency in Jaipur, India. We build high-performance
              websites, AI platforms &amp; e-commerce for businesses across Jaipur, Delhi, Mumbai &amp; all of India.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <motion.a
                href="#contact"
                whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
                whileTap={{ scale: 0.97 }}
                className="flex h-14 items-center rounded-2xl bg-brand-500 px-7 text-[16px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)]"
              >
                Start a Project
              </motion.a>
              <motion.a
                href="#work"
                whileHover={{ y: -2, borderColor: '#111111' }}
                whileTap={{ scale: 0.97 }}
                className="flex h-14 items-center gap-2.5 rounded-2xl border border-line bg-white px-6.5 text-[16px] font-semibold text-ink"
              >
                View Our Work
                <span className="block h-1.5 w-1.5 rotate-45 border-r-[1.6px] border-t-[1.6px] border-muted" />
              </motion.a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <span className="shrink-0 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[.09em] text-muted">Trusted by</span>
              <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2">
                {trustedBy.map((name) => (
                  <span key={name} className="text-[15px] sm:text-[17px] font-bold tracking-[-.02em] text-ink opacity-35">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40} className="relative h-[560px] sm:h-[540px] lg:h-[580px]">
          <div className="absolute inset-0 z-0">
            <Suspense fallback={null}>
              <HeroScene scrollProgress={scrollYProgress} />
            </Suspense>
          </div>

          <div
            ref={cardFloat}
            className="absolute inset-x-0 sm:inset-x-6 top-8 bottom-8 sm:top-11 sm:bottom-11 z-10 overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_80px_rgba(0,0,0,.08)]"
          >
            <div className="flex h-12 items-center justify-between border-b border-line px-4.5">
              <div className="flex items-center gap-2">
                <span className="block h-2.5 w-2.5 rounded-full bg-line" />
                <span className="block h-2.5 w-2.5 rounded-full bg-line" />
                <span className="block h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-3 text-[12px] font-medium text-muted">nesthubsolution.in</span>
              </div>
              <span className="rounded-full border border-success/30 bg-[#EFFBF3] px-2.5 py-1 text-[10.5px] font-bold tracking-[.06em] text-success">
                {heroPanel.aiEnabled}
              </span>
            </div>
            <div className="grid gap-3 p-4 sm:gap-4 sm:p-5">
              <div className="rounded-2xl border border-line p-4 sm:p-4.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-semibold tracking-[.06em] text-muted">
                    {heroPanel.lighthouse.label}
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-[36px] font-bold tracking-[-.03em] text-brand-500">
                    <AnimatedCounter value={heroPanel.lighthouse.value} />
                  </span>
                  <span className="text-[16px] font-semibold text-muted">/ {heroPanel.lighthouse.max}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${heroPanel.lighthouse.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-brand-500"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-line p-4 sm:p-4.5">
                <div className="text-[11.5px] font-semibold tracking-[.06em] text-muted">TECH STACK</div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {heroPanel.techStack.map((t) => (
                    <span key={t} className="rounded-md border border-line bg-surface px-2 py-1 text-[11.5px] font-semibold text-ink">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-line p-4 sm:p-4.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[.06em] text-muted">
                    <span className="block h-1.5 w-1.5 rounded-full bg-success" />
                    {heroPanel.status}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-[11.5px] font-semibold tracking-[.06em] text-muted">
                    {heroPanel.performanceIndex.label}
                  </span>
                  <span className="text-[13px] font-bold text-ink">
                    <AnimatedCounter value={heroPanel.performanceIndex.value} />%
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${heroPanel.performanceIndex.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-brand-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={aiFloat}
            className="absolute left-0 bottom-2 z-20 hidden rounded-[18px] border border-line bg-white px-4.5 py-3.5 shadow-[0_16px_50px_rgba(0,0,0,.09)] sm:-left-3.5 sm:bottom-6 sm:flex sm:flex-col"
          >
            <span className="block text-[12px] font-semibold tracking-[.05em] text-muted">AI CONTENT ENGINE</span>
            <span className="mt-1 block text-[15px] font-semibold">
              Drafting 12 pages…<span className="animate-shimmer text-brand-500"> ●</span>
            </span>
          </div>
        </Reveal>
      </motion.div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mx-auto mt-16 mb-4 hidden w-fit flex-col items-center gap-2 text-muted sm:flex"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[.14em]">Scroll</span>
          <span className="flex h-9 w-5.5 items-start justify-center rounded-full border-2 border-line p-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-1.5 w-1.5 rounded-full bg-brand-500"
            />
          </span>
        </motion.div>
      </motion.a>
    </section>
  )
}
