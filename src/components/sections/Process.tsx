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

      <ol className="mt-16 grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-6">
        {steps.map((st, i) => {
          const c = tones[accentCycle[i % accentCycle.length]]
          return (
            <Reveal key={st.n} delay={Math.min(i * 0.06, 0.3)} tilt={false} className="h-full">
              <li className="relative flex h-full flex-col">
                <motion.span
                  whileHover={{ y: -2, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                  className="absolute -top-6 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-white font-mono text-[13px] font-bold shadow-[0_4px_14px_rgba(0,0,0,.06)]"
                  style={{ borderColor: c[300], color: c[600] }}
                >
                  {st.n}
                </motion.span>

                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white pt-10 pb-5 text-center shadow-[0_8px_30px_rgba(0,0,0,.04)]">
                  <div className="flex flex-1 flex-col items-center px-5">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: c[50] }}>
                      <Icon name={st.icon} color={c[600]} size={26} />
                    </span>
                    <h3 className="mt-4 text-[18px] font-semibold tracking-[-.02em]">{st.title}</h3>
                    <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-muted">{st.body}</p>
                  </div>

                  {/* <div className="mt-4 flex justify-center px-5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[.06em]"
                      style={{ background: c[50], color: c[700] }}
                    >
                      <Icon name="clock" color={c[600]} size={12} />
                      {st.duration}
                    </span>
                  </div> */}

                  <span className="mt-5 block h-[3px] w-full" style={{ background: c[400] }} />
                </div>
              </li>
            </Reveal>
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
