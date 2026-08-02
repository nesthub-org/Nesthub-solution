import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { Icon } from '../Icon'
import { services } from '../../data/content'

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal>
        <div className="max-w-[760px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Services</span>
          <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
            Services That Deliver
          </h2>
          <p className="mt-4.5 text-[17px] sm:text-[18px] leading-[1.6] text-muted">
            One senior team across strategy, design, engineering and growth — no handoffs, no agencies inside
            agencies.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.06}>
            <TiltCard max={7} className="h-full rounded-[20px]">
              <div className="group h-full rounded-[20px] border border-line bg-white px-8 pb-9 pt-8.5 shadow-[0_8px_40px_rgba(0,0,0,.05)]">
                <motion.span
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  className="flex h-13 w-13 items-center justify-center rounded-2xl border border-line bg-surface group-hover:border-brand-500/40 group-hover:bg-brand-50"
                >
                  <Icon name={s.icon} color="#2563EB" />
                </motion.span>
                <h3 className="mt-6 text-[21px] font-semibold tracking-[-.02em]">{s.title}</h3>
                <p className="mt-2.5 text-[16.5px] leading-[1.6] text-muted">{s.body}</p>
                <div className="mt-5.5 flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-muted transition-colors group-hover:border-brand-200 group-hover:text-brand-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
