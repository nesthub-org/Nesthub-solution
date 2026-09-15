import { Reveal } from '../Reveal'
import { trustedBy } from '../../data/content'

// Repeated to give the marquee track enough width, then the whole run is
// duplicated once more below so translateX(-50%) loops seamlessly.
const track = [...trustedBy, ...trustedBy, ...trustedBy]
const marqueeItems = [...track, ...track]

export function Partners() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-28">
      <Reveal className="text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Our partners</span>
        <h2 className="mt-4 text-[26px] sm:text-[32px] font-bold leading-[1.15] tracking-[-.03em]">
          Trusted by the brands we build for
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          className="relative mt-11 overflow-hidden py-2"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
        >
          <div className="flex w-max animate-marquee items-center gap-6 sm:gap-24">
            {marqueeItems.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="group flex h-36 shrink-0 items-center justify-center rounded-3xl bg-white px-3 py-5 transition-all duration-300 sm:h-48 sm:px-8"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  title={client.name}
                  className="h-full w-auto max-w-[380px] object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 sm:max-w-[480px]"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
