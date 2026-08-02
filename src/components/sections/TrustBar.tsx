import { Reveal } from '../Reveal'
import { AnimatedCounter } from '../AnimatedCounter'
import { trustStats } from '../../data/content'

export function TrustBar() {
  return (
    <section className="relative z-[1]">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-6 pt-24">
          <div className="grid grid-cols-2 rounded-[20px] border border-line bg-surface lg:grid-cols-4">
            {trustStats.map((s, i) => (
              <div
                key={s.label}
                className={`border-line px-7 py-10 sm:px-9 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i < trustStats.length - 1 ? 'lg:border-r' : ''}`}
              >
                <div className="text-[32px] sm:text-[44px] font-bold tracking-[-.04em]">
                  <AnimatedCounter value={s.number} />
                  {s.suffix}
                </div>
                <div className="mt-1.5 text-[15px] sm:text-[16px] font-medium text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
