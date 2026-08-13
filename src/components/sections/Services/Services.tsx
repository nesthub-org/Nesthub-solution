import { Reveal } from '../../Reveal'
import { BackgroundGrid } from './BackgroundGrid'
import { ServiceCard } from './ServiceCard'
import { services } from '../../../data/content'

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <BackgroundGrid />

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

      {/* Uniform 3-col x 2-row grid — every card shares the same footprint. */}
      <ul className="mt-14 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {services.map((service, i) => (
          <li key={service.title}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <ServiceCard service={service} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
