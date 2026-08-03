import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { TiltCard } from '../TiltCard'
import { projects } from '../../data/content'

export function Work() {
  return (
    <section id="work" className="mt-28 border-y border-line bg-surface sm:mt-32">
      <div className="mx-auto max-w-[1320px] px-6 py-24 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-[700px]">
              <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our work</span>
              <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
                Projects We're Proud Of
              </h2>
            </div>
            <a
              href="/#contact"
              className="flex h-13 items-center rounded-2xl border border-line bg-white px-6 text-[16px] font-semibold text-ink hover:border-ink transition-colors"
            >
              All case studies
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <TiltCard max={5} lift={-8} className="h-full rounded-[20px]">
                <div className="h-full overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)]">
                  <div className="flex items-center justify-center bg-gradient-to-b from-white to-[#F0F2F6] px-6 pt-8 pb-2 sm:px-8 sm:pt-9">
                    <img
                      src={p.image}
                      alt={`${p.title} website, shown on a laptop screen`}
                      loading="lazy"
                      className="w-full max-w-[480px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.12)]"
                    />
                  </div>
                  <div className="border-t border-line px-8 pb-8.5 pt-7.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.logo}
                        alt=""
                        aria-hidden
                        className="h-7 w-7 rounded-full border border-line object-contain p-0.5"
                      />
                      <span className="text-[12.5px] font-bold uppercase tracking-[.08em] text-brand-500">{p.category}</span>
                    </div>
                    <h3 className="mt-3 text-[22px] sm:text-[24px] font-semibold tracking-[-.025em]">{p.title}</h3>
                    <p className="mt-2 text-[16.5px] leading-[1.6] text-muted">{p.body}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={p.href}
                      target={p.href.startsWith('http') ? '_blank' : undefined}
                      rel={p.href.startsWith('http') ? 'noreferrer' : undefined}
                      whileHover={{ x: 4 }}
                      className="mt-5.5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-500"
                    >
                      View Details →
                    </motion.a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
