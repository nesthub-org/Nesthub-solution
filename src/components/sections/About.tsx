import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import { aboutIntro, brand, values } from '../../data/content'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal className="mx-auto max-w-[820px] text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">About us</span>
        <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em] text-balance">
          Building the Web, One Pixel at a Time
        </h2>
        <p className="text-pretty mt-5 text-[17px] sm:text-[18px] leading-[1.65] text-muted">{aboutIntro}</p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            <TiltCard max={6} className="h-full rounded-[20px]">
              <div className="h-full rounded-[20px] border border-line bg-white px-7.5 py-8 text-center shadow-[0_8px_40px_rgba(0,0,0,.05)]">
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl border border-line bg-brand-50"
                >
                  <Icon name={v.icon} color="#2563EB" />
                </motion.span>
                <div className="mt-5 text-[19px] font-semibold tracking-[-.02em]">{v.title}</div>
                <p className="mt-2 text-[16px] leading-[1.6] text-muted">{v.body}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 overflow-hidden rounded-[24px] border border-line bg-[radial-gradient(700px_260px_at_50%_0%,rgba(37,99,235,.08),rgba(37,99,235,0)_70%)] bg-ink px-8 py-14 text-center sm:px-16 sm:py-16">
          <h3 className="text-balance text-[26px] sm:text-[34px] font-bold leading-[1.15] tracking-[-.03em] text-white">
            Ready to Work With Jaipur's Top Agency?
          </h3>
          <p className="text-pretty mx-auto mt-4 max-w-[560px] text-[16px] sm:text-[17px] leading-[1.6] text-white/60">
            Whether you're in Jaipur, Delhi, Mumbai, or anywhere in India — let's build something great together.
            Get a free consultation today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
              whileTap={{ scale: 0.97 }}
              className="flex h-13 items-center rounded-2xl bg-brand-500 px-7 text-[15.5px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.35)]"
            >
              Get Free Consultation
            </motion.a>
            <motion.a
              href={`mailto:${brand.email}`}
              whileHover={{ y: -2, borderColor: '#ffffff' }}
              whileTap={{ scale: 0.97 }}
              className="flex h-13 items-center rounded-2xl border border-white/20 px-7 text-[15.5px] font-semibold text-white"
            >
              Book a Free Call
            </motion.a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
