import { useState } from 'react'
import { Icon } from '../Icon'
import { WhatsAppGlyph, WhatsAppLink } from '../WhatsAppButton'
import { moreServices, packages } from '../../data/content'

export function Packages() {
  const [picked, setPicked] = useState<string | null>(null)

  const pick = (id: string) => {
    const next = picked === id ? null : id
    setPicked(next)
    // Stacked on phones, so bring the card that lit up into view.
    if (next && window.matchMedia('(max-width: 1023px)').matches) {
      document.getElementById(`package-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section id="services" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="rise max-w-[780px]">
          <p className="sheet-label text-blueprint">What we build</p>
          <h2 className="mt-3 text-[38px] font-bold leading-[1.04] tracking-[-.035em] sm:text-[56px]">Three ways to start.</h2>
          <p className="mt-4 text-pretty text-[17px] leading-[1.5] text-ink/75 sm:text-[19px]">
            Not sure which one is right? Send us your preview on WhatsApp and we&apos;ll tell you honestly.
          </p>
        </div>

        <div className="rise mt-7 sm:mt-9" role="group" aria-label="What do you want most?">
          <p className="text-[15.5px] font-semibold">What do you want most?</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {packages.map((pack) => {
              const on = picked === pack.id
              return (
                <button
                  key={pack.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(pack.id)}
                  className={`min-h-11 rounded-full border px-4 py-2 text-left text-[14.5px] font-semibold transition-colors ${on ? 'border-blueprint bg-blueprint text-white' : 'border-ink/20 bg-white text-ink hover:border-ink'}`}
                >
                  {pack.goal}
                </button>
              )
            })}
          </div>
        </div>

        <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:mt-8 lg:grid-cols-3 lg:gap-5">
          {packages.map((pack) => (
            <li
              key={pack.id}
              id={`package-${pack.id}`}
              data-glow
              data-picked={picked === null ? undefined : picked === pack.id}
              className="package-card rise flex flex-col rounded-[22px] border border-ink/12 bg-paper p-6 sm:p-7"
            >
              <span className="package-flag" aria-hidden>
                Start here
              </span>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[25px] font-bold leading-[1.08] tracking-[-.025em] sm:text-[28px]">{pack.title}</h3>
                <span className="mt-1 shrink-0 rounded-full bg-ink px-2.5 py-1 text-[12.5px] font-semibold text-white">{pack.timeline}</span>
              </div>
              <p className="mt-3 text-[15.5px] leading-[1.5] text-ink/75">{pack.forWhom}</p>

              <ul className="mt-5 grid list-none gap-2.5 p-0">
                {pack.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] leading-[1.35]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-blueprint)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0" aria-hidden>
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <p className="text-[14.5px] font-semibold text-ink/70">
                  {pack.priceFrom ? (
                    <>
                      From <span className="font-display text-[26px] font-bold tracking-[-.02em] text-ink">{pack.priceFrom}</span>
                    </>
                  ) : (
                    'Fixed quote after a free call'
                  )}
                </p>
                <WhatsAppLink
                  message={`Hi NestHub! I'm interested in a ${pack.title.toLowerCase()}. Can we talk about it?`}
                  placement={`package_${pack.id}`}
                  className="mt-3 flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-ink text-[15.5px] font-bold text-white transition-colors hover:bg-blueprint"
                >
                  <WhatsAppGlyph size={18} />
                  Ask about this
                </WhatsAppLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="rise mt-14 max-w-[780px] sm:mt-20">
          <h3 className="text-[30px] font-bold leading-[1.08] tracking-[-.03em] sm:text-[42px]">Need more than a website?</h3>
          <p className="mt-3 text-pretty text-[17px] leading-[1.5] text-ink/75 sm:text-[19px]">The same team does all of this too, so nothing gets lost between agencies.</p>
        </div>

        <ul className="mt-7 grid list-none grid-cols-1 gap-3 p-0 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {moreServices.map((service) => (
            <li key={service.href} className="rise">
              <a href={service.href} data-glow className="group flex h-full gap-3.5 rounded-[18px] border border-ink/12 bg-white p-4 text-ink transition-all hover:-translate-y-0.5 hover:border-blueprint active:scale-[.98] sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-brand-50 transition-all duration-300 group-hover:-rotate-6 group-hover:bg-marker">
                  <Icon name={service.icon} size={22} color="var(--color-blueprint)" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-display text-[19px] font-bold leading-[1.15] tracking-[-.02em]">{service.title}</span>
                  <span className="mt-1 text-[15px] leading-[1.45] text-ink/70">{service.body}</span>
                  <span className="mt-auto hidden pt-2 text-[14.5px] font-bold text-blueprint sm:block">
                    Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </span>
                <span aria-hidden className="ml-auto self-center pl-1 text-[18px] font-bold text-blueprint sm:hidden">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="rise mt-5 text-pretty text-[15.5px] leading-[1.5] text-ink/75 sm:mt-6 sm:text-[17px]">
          Not ready for a full project? Start with a{' '}
          <a href="/services" className="font-semibold text-blueprint underline decoration-blueprint/30 underline-offset-4 hover:decoration-blueprint">
            one-off audit of your site
          </a>
          , or keep us on a{' '}
          <a href="/services" className="font-semibold text-blueprint underline decoration-blueprint/30 underline-offset-4 hover:decoration-blueprint">
            monthly partnership
          </a>
          .
        </p>
      </div>
    </section>
  )
}
