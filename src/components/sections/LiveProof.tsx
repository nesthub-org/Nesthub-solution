import { projects, testimonials, type Project } from '../../data/content'
import { track } from '../../lib/track'
import { getDomain } from '../../utils/url'

// The four client sites with a live address and a real outcome to point at.
const featured = projects.slice(0, 4)

function ProofCard({ project: p }: { project: Project }) {
  const domain = getDomain(p.href)
  const quote = testimonials.find((t) => t.projectSlug === p.slug)
  const open = () => track('client_site_open', { content_name: p.slug })

  return (
    <li className="rise flex w-[84vw] max-w-[440px] shrink-0 snap-center flex-col overflow-hidden rounded-[22px] border border-ink/10 bg-white lg:w-auto lg:max-w-none">
      <a href={p.href} target="_blank" rel="noopener noreferrer" onClick={open} aria-label={`${p.title}: open the live site`} className="block bg-navy p-2">
        <span className="flex items-center gap-1.5 px-1.5 pb-2 pt-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="ml-2 truncate text-[11.5px] font-medium text-white/70">{domain}</span>
        </span>
        <img
          src={p.screen}
          srcSet={p.screenSmall ? `${p.screenSmall} 640w, ${p.screen} 1200w` : undefined}
          sizes="(min-width: 1024px) 620px, 84vw"
          alt={`${p.title} website`}
          loading="lazy"
          width={1200}
          height={700}
          className="block aspect-[12/7] w-full rounded-[10px] bg-white object-cover object-top"
        />
      </a>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="sheet-label !text-[11px] text-blueprint">{p.category}</p>
        <h3 className="mt-2 text-[24px] font-bold leading-[1.08] tracking-[-.025em] sm:text-[28px]">{p.title}</h3>
        {p.outcome && <p className="mt-2.5 w-fit rounded-[6px] bg-marker px-2 py-0.5 text-[13.5px] font-bold text-ink">{p.outcome}</p>}

        {!quote && <p className="mt-4 text-[15px] leading-[1.5] text-ink/80">{p.body}</p>}
        {quote && (
          <figure className="mt-4">
            <blockquote className="text-[15px] leading-[1.5] text-ink/80">“{quote.quote}”</blockquote>
            <figcaption className="mt-2 text-[13.5px] font-semibold text-ink">
              {quote.name}
              <span className="font-normal text-ink/60"> · {quote.role}</span>
            </figcaption>
          </figure>
        )}

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={open}
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15.5px] font-bold text-blueprint hover:text-blueprint-deep"
        >
          Open {domain}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </li>
  )
}

export function LiveProof() {
  return (
    <section id="work" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="rise max-w-[780px]">
          <p className="sheet-label text-blueprint">Real work</p>
          <h2 className="mt-3 text-[38px] font-bold leading-[1.04] tracking-[-.035em] sm:text-[56px] lg:text-[68px]">
            That was a sample.
            <br />
            <span className="marker">These are real.</span>
          </h2>
          <p className="mt-4 text-pretty text-[17px] leading-[1.5] text-ink/75 sm:text-[19px]">
            Live websites we built for real businesses. Don&apos;t take our word for it: open them on your phone and try them.
          </p>
        </div>
      </div>

      <ul className="chip-scroller mt-8 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:mt-12 sm:px-6 lg:mx-auto lg:grid lg:max-w-[1320px] lg:grid-cols-2 lg:gap-6 lg:overflow-visible">
        {featured.map((p) => (
          <ProofCard key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  )
}
