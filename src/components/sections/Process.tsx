import { Reveal } from '../Reveal'
import { steps } from '../../data/content'

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal>
        <div className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Process</span>
          <h2 className="mt-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-[-.035em]">
            Six steps. No surprises.
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_8px_40px_rgba(0,0,0,.05)]">
        {steps.map((st, i) => (
          <Reveal key={st.n} delay={Math.min(i * 0.04, 0.2)} tilt={false}>
            <div
              className={`grid grid-cols-1 items-baseline gap-2 px-6 py-7 transition-colors duration-300 hover:bg-surface sm:grid-cols-[80px_1fr] sm:gap-8 sm:px-10 sm:py-8.5 lg:grid-cols-[120px_1fr_1fr] ${
                i < steps.length - 1 ? 'border-b border-line' : ''
              }`}
            >
              <span className="font-mono text-[14px] font-semibold text-brand-500">{st.n}</span>
              <span className="text-[22px] sm:text-[26px] font-semibold tracking-[-.025em]">{st.title}</span>
              <span className="text-[16px] sm:text-[16.5px] leading-[1.6] text-muted">{st.body}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
