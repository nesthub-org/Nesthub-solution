import { WhatsAppGlyph, WhatsAppLink } from '../WhatsAppButton'
import { footerLinks, packages } from '../../data/content'

export function Packages() {
  const otherServices = footerLinks.services.filter((s) => s.href !== '/services/website-development')

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

        <ul className="mt-9 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 lg:grid-cols-3 lg:gap-5">
          {packages.map((pack) => (
            <li key={pack.id} className="rise flex flex-col rounded-[22px] border border-ink/12 bg-paper p-6 sm:p-7">
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

        <div className="rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 rounded-[18px] bg-paper p-5 sm:p-6">
          <span className="text-[15px] font-semibold">Also from the same team:</span>
          {otherServices.map((s) => (
            <a key={s.href} href={s.href} className="text-[15px] font-semibold text-blueprint underline decoration-blueprint/30 underline-offset-4 hover:decoration-blueprint">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
