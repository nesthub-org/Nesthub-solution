import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { team } from '../../data/content'
import { SplitText } from '../SplitText'

export function Team() {
  // A member whose photo 404s falls back to the initials mark rather than a broken-image icon.
  const [broken, setBroken] = useState<string[]>([])

  return (
    <section id="team" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal className="mx-auto max-w-[820px] text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our team</span>
        <SplitText className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em] text-balance">
          Team Behind Wonders
        </SplitText>
        <p className="text-pretty mt-5 text-[17px] sm:text-[18px] leading-[1.65] text-muted">
          A small, senior crew from Jaipur — the same people who scope your project are the ones who build it.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-[1120px] grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.07} tilt={false}>
            <motion.article
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-ink shadow-[0_10px_40px_rgba(17,17,17,.08)]"
            >
              {m.img && !broken.includes(m.name) ? (
                <motion.img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  onError={() => setBroken((b) => [...b, m.name])}
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ objectPosition: m.imgPosition ?? 'center' }}
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-500 to-ink">
                  <span className="text-[56px] font-bold tracking-[-.04em] text-white/90">{m.initials}</span>
                </div>
              )}

              {/* legibility gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* index tag */}
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-md">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <motion.div
                  variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-[19px] font-semibold leading-tight tracking-[-.02em] text-white">{m.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-px w-5 bg-brand-200 transition-all duration-500 group-hover:w-9" />
                    <p className="text-[13.5px] font-medium uppercase tracking-[.06em] text-white/75">{m.role}</p>
                  </div>
                </motion.div>
              </div>

              {/* hover ring */}
              <span className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-brand-500/70" />
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
