import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { team } from '../../data/content'

export function Team() {
  // A member whose photo 404s falls back to the initials mark rather than a broken-image icon.
  const [broken, setBroken] = useState<string[]>([])

  return (
    <section id="team" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal className="mx-auto max-w-[820px] text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our team</span>
        <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em] text-balance">
          Team Behind Wonders
        </h2>
        <p className="text-pretty mt-5 text-[17px] sm:text-[18px] leading-[1.65] text-muted">
          A small, senior crew from Jaipur — the same people who scope your project are the ones who build it.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-[1080px] grid-cols-1 justify-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06}>
            <TiltCard max={6} className="h-full rounded-[20px]">
              <div className="h-full overflow-hidden rounded-[20px] border border-line bg-white text-center shadow-[0_8px_40px_rgba(0,0,0,.05)]">
                <div className="overflow-hidden bg-brand-50">
                  {m.img && !broken.includes(m.name) ? (
                    <motion.img
                      src={m.img}
                      alt={m.name}
                      loading="lazy"
                      onError={() => setBroken((b) => [...b, m.name])}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ objectPosition: m.imgPosition ?? 'center' }}
                      className="h-[240px] w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-[240px] w-full items-center justify-center">
                      <motion.span
                        whileHover={{ scale: 1.08, rotate: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-white text-[24px] font-bold tracking-[-.02em] text-brand-500"
                      >
                        {m.initials}
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="px-6 py-6">
                  <div className="text-[19px] font-semibold tracking-[-.02em]">{m.name}</div>
                  <p className="mt-1 text-[15px] text-muted">{m.role}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
