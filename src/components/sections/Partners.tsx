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
          <div className="flex w-max animate-marquee items-center gap-20">
            {marqueeItems.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex h-19 shrink-0 items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-35"
              >
                <img src={client.logo} alt={client.name} title={client.name} className="h-full w-auto max-w-[200px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
