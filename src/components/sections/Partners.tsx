import { trustedBy } from '../../data/content'

// Repeated so the rail is always wider than the screen, then doubled so that
// translateX(-50%) loops seamlessly.
const run = [...trustedBy, ...trustedBy, ...trustedBy]
const rail = [...run, ...run]

export function Partners() {
  return (
    <section aria-label="Brands we build for" data-pausable className="border-b border-ink/10 bg-white py-8 sm:py-11">
      <p className="sheet-label px-4 text-center text-blueprint">Trusted by the brands we build for</p>
      <div
        className="mt-5 overflow-hidden sm:mt-7"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <ul className="flex w-max animate-marquee list-none items-center gap-10 p-0 sm:gap-16">
          {rail.map((client, i) => (
            <li key={`${client.name}-${i}`} aria-hidden={i >= trustedBy.length} className="shrink-0">
              <img src={client.logo} alt={i < trustedBy.length ? client.name : ''} title={client.name} loading="lazy" decoding="async" className="h-12 w-auto max-w-[132px] object-contain sm:h-16 sm:max-w-[176px]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
