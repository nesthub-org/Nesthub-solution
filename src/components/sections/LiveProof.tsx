import { homepageProjects, testimonials, type Project } from '../../data/content'
import { track } from '../../lib/track'
import { getDomain } from '../../utils/url'

const quoteFor = (project: Project) => testimonials.find((t) => t.projectSlug === project.slug)

function ProofCard({ project: p }: { project: Project }) {
  const domain = getDomain(p.href)
  const quote = quoteFor(p)
  const open = () => track('client_site_open', { content_name: p.slug })

  return (
    <li data-glow className="rise flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-ink/10 bg-white transition-transform duration-300 hover:-translate-y-1 sm:rounded-[22px]">
      <a href={p.href} target="_blank" rel="noopener noreferrer" onClick={open} aria-label={`${p.title}: open the live site`} className="block bg-navy p-1.5 sm:p-2">
        <span className="flex items-center gap-1.5 px-1 pb-1.5 pt-0.5 sm:px-1.5 sm:pb-2 sm:pt-1" aria-hidden>
          <span className="hidden h-2 w-2 rounded-full bg-white/30 sm:block" />
          <span className="hidden h-2 w-2 rounded-full bg-white/30 sm:block" />
          <span className="hidden h-2 w-2 rounded-full bg-white/30 sm:block" />
          <span className="truncate text-[10.5px] font-medium text-white/75 sm:ml-2 sm:text-[11.5px]">{domain}</span>
        </span>
        <picture>
          {p.screenPhone && <source media="(max-width: 639px)" srcSet={p.screenPhone} />}
          <img
            src={p.screen}
            srcSet={p.screenSmall ? `${p.screenSmall} 640w, ${p.screen} 1200w` : undefined}
            sizes="(min-width: 1024px) 620px, 50vw"
            alt={`${p.title} website`}
            loading="lazy"
            width={1200}
            height={700}
            className="block aspect-[39/50] w-full rounded-[8px] bg-white object-cover object-top sm:aspect-[12/7] sm:rounded-[10px]"
          />
        </picture>
      </a>

      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <p className="sheet-label hidden !text-[11px] text-blueprint sm:block">{p.category}</p>
        <h3 className="text-[16.5px] font-bold leading-[1.12] tracking-[-.02em] sm:mt-2 sm:text-[28px] sm:leading-[1.08] sm:tracking-[-.025em]">{p.title}</h3>
        {p.outcome && <p className="mt-1.5 w-fit rounded-[5px] bg-marker px-1.5 py-0.5 text-[12px] font-bold leading-[1.25] text-ink sm:mt-2.5 sm:rounded-[6px] sm:px-2 sm:text-[13.5px]">{p.outcome}</p>}

        {/* Larger screens carry the client's words on the card. Phones show them under the grid. */}
        <div className="hidden sm:block">
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
        </div>

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={open}
          className="mt-auto inline-flex min-h-10 items-end gap-1 pt-2 text-[14px] font-bold text-blueprint hover:text-blueprint-deep sm:gap-1.5 sm:pt-5 sm:text-[15.5px]"
        >
          <span className="sm:hidden">Open site</span>
          <span className="hidden sm:inline">Open {domain}</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

        {/* Every client at a glance, with nothing hidden behind a swipe. */}
        <ul className="mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:mt-12 sm:gap-6">
          {homepageProjects.map((p) => (
            <ProofCard key={p.slug} project={p} />
          ))}
        </ul>

        <ul className="mt-3 grid list-none gap-3 p-0 sm:hidden">
          {homepageProjects.map((p) => {
            const quote = quoteFor(p)
            return (
              quote && (
                <li key={p.slug} className="rise rounded-[16px] border border-ink/10 bg-white p-4">
                  <blockquote className="text-[15.5px] font-medium leading-[1.45] text-ink">“{quote.highlight}”</blockquote>
                  <p className="mt-2 text-[13px] leading-[1.35] text-ink/65">
                    <span className="font-semibold text-ink">{quote.name}</span>, {p.title}
                  </p>
                </li>
              )
            )
          })}
        </ul>
      </div>
    </section>
  )
}
