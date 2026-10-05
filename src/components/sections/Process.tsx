import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Icon } from '../Icon'
import { steps, processHighlights, type ServiceAccent } from '../../data/content'
import { tones } from './Services/tones'
import { SplitText } from '../SplitText'

// Cycles the same accent palette Services uses so each step reads as its own
// stop along the process rather than six identical gray boxes.
const accentCycle: ServiceAccent[] = ['violet', 'sky', 'orange', 'emerald', 'amber', 'teal']

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal className="mx-auto max-w-[640px] text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-line sm:w-14" />
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our Process</span>
          <span className="h-px w-10 bg-line sm:w-14" />
        </div>
        <SplitText className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
          Six steps. No surprises<span className="text-brand-500">.</span>
        </SplitText>
        <p className="text-pretty mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-muted">
          A clear, proven process that keeps your project on track from start to success.
        </p>
      </Reveal>

      <ol className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((st, i) => {
          const c = tones[accentCycle[i % accentCycle.length]]
          return (
            <motion.li
              key={st.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(0,0,0,.08)]"
            >
              {/* accent glow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: c[200] }}
              />

              {/* journey progress: how far along the six steps this one sits */}
              <div className="relative flex gap-1.5">
                {steps.map((_, j) => (
                  <span
                    key={j}
                    className="h-1 flex-1 rounded-full"
                    style={{ background: j <= i ? c[400] : '#ececec' }}
                  />
                ))}
              </div>

              <div className="relative mt-7 flex items-start justify-between">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ background: c[50], boxShadow: `inset 0 0 0 1px ${c[200]}` }}
                >
                  <Icon name={st.icon} color={c[600]} size={24} />
                </span>
                <span className="text-[44px] font-bold leading-none tracking-[-.05em] transition-colors duration-300" style={{ color: c[200] }}>
                  {st.n}
                </span>
              </div>

              <h3 className="relative mt-6 text-[21px] font-semibold tracking-[-.025em]">{st.title}</h3>
              <p className="relative mt-2 text-[15px] leading-[1.65] text-muted">{st.body}</p>

              <div className="relative mt-auto flex items-center gap-2 pt-6 text-[12px] font-semibold uppercase tracking-[.12em]" style={{ color: c[600] }}>
                {i < steps.length - 1 ? (
                  <>
                    Next · {steps[i + 1].title}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </>
                ) : (
                  <>
                    And we keep going
                    <span className="transition-transform duration-500 group-hover:rotate-180">↻</span>
                  </>
                )}
              </div>
            </motion.li>
          )
        })}
      </ol>

      <Reveal delay={0.1}>
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-7 rounded-[20px] border border-line bg-surface px-7 py-8 sm:grid-cols-2 sm:px-9 lg:grid-cols-4">
          {processHighlights.map((h) => (
            <div key={h.title} className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
                <Icon name={h.icon} color="#2563EB" size={20} />
              </span>
              <div>
                <div className="text-[15px] font-semibold tracking-[-.01em]">{h.title}</div>
                <p className="mt-0.5 text-[13.5px] leading-[1.5] text-muted">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
