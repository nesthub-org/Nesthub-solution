import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Reveal } from '../Reveal'
import { HeroBackground } from '../HeroBackground'
import { AnimatedCounter } from '../AnimatedCounter'
import { heroBadge, heroPanel, trustedBy } from '../../data/content'

// three.js/r3f/drei is the heaviest dependency in the bundle — load it off
// the critical path so it never blocks first paint or input responsiveness.
const HeroScene = lazy(() => import('../three/HeroScene').then((m) => ({ default: m.HeroScene })))

const headline = ['Websites', 'Powered', 'By']

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

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#05060A]">
      <HeroBackground />

      <div className="absolute inset-0 z-[1]">
        <Suspense fallback={null}>
          <HeroScene scrollProgress={scrollYProgress} />
        </Suspense>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 58% 52% at 50% 44%, rgba(5,6,10,.55) 0%, rgba(5,6,10,.25) 50%, transparent 78%)',
        }}
      />

      <motion.div
        style={{ opacity: heroFade }}
        className="relative z-[2] mx-auto flex w-full max-w-[900px] flex-1 flex-col items-center justify-center px-6 pt-[120px] pb-16 text-center sm:pt-[140px]"
      >
        <Reveal>
          <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[11.5px] font-medium tracking-[.02em] text-white/80 backdrop-blur-md sm:h-[34px] sm:py-0 sm:text-[13px] sm:tracking-[.03em]">
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
          className="text-balance mt-7 text-[42px] leading-[1.05] font-bold tracking-[-.035em] text-white sm:text-[56px] lg:text-[68px]"
        >
          {headline.map((word, i) => (
            <motion.span key={i} variants={wordItem} className="mr-[0.28em] inline-block">
              {word}
            </motion.span>
          ))}
          <motion.span variants={wordItem} className="text-shimmer inline-block">
            Intelligent AI
          </motion.span>
        </motion.h1>

        <Reveal delay={0.1}>
          <p className="text-pretty mx-auto mt-6 max-w-[620px] text-[18px] font-medium leading-[1.55] text-white/65 sm:text-[20px]">
            Jaipur&apos;s AI-native web development studio. We engineer intelligent websites, AI platforms &amp;
            automation-driven e-commerce for businesses across Jaipur, Delhi, Mumbai &amp; all of India.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
              whileTap={{ scale: 0.97 }}
              className="flex h-14 items-center rounded-2xl bg-brand-500 px-7 text-[16px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.35)]"
            >
              Start a Project
            </motion.a>
            <motion.a
              href="/#work"
              whileHover={{ y: -2, borderColor: 'rgba(255,255,255,.4)' }}
              whileTap={{ scale: 0.97 }}
              className="flex h-14 items-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-6.5 text-[16px] font-semibold text-white backdrop-blur-md"
            >
              View Our Work
              <span className="block h-1.5 w-1.5 rotate-45 border-r-[1.6px] border-t-[1.6px] border-white/60" />
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-md sm:px-6">
            <span className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[.06em] text-white/70">
              <span className="block h-1.5 w-1.5 rounded-full bg-success" />
              {heroPanel.aiEnabled}
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="text-[13px] font-semibold text-white/70">
              <AnimatedCounter value={heroPanel.lighthouse.value} />/{heroPanel.lighthouse.max} {heroPanel.lighthouse.label}
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="flex flex-wrap items-center justify-center gap-1.5">
              {heroPanel.techStack.map((t) => (
                <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white/70">
                  {t}
                </span>
              ))}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <span className="shrink-0 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[.09em] text-white/45">
              Trusted by
            </span>
            <div className="flex min-w-0 flex-wrap items-center justify-center gap-3">
              {trustedBy.map((client) => (
                <div
                  key={client.name}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 p-1.5 transition-transform duration-300 hover:scale-105 sm:h-12 sm:w-12"
                >
                  <img src={client.logo} alt={client.name} title={client.name} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </motion.div>

      <motion.a
        href="/#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-[2] mx-auto mb-8 hidden w-fit flex-col items-center gap-2 self-center text-white/45 sm:flex"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[.14em]">Scroll</span>
          <span className="flex h-9 w-5.5 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
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
