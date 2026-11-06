import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { brand } from '../data/content'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  /** Breadcrumb label for the current page. */
  crumb: ReactNode
  children?: ReactNode
  aside?: ReactNode
}

/** Shared top-of-page band for the standalone pages, in the homepage's blueprint look. */
export function PageHero({ eyebrow, title, description, crumb, children, aside }: PageHeroProps) {
  return (
    <section className="blueprint text-white">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-4 pb-14 pt-[100px] sm:px-6 sm:pb-20 sm:pt-[132px] lg:grid-cols-[1.35fr_.65fr] lg:gap-14">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-medium text-white/75">
            <a href="/" className="-my-2 py-2 text-white/75 transition-colors hover:text-white">
              Home
            </a>
            <span aria-hidden>/</span>
            <span className="text-white">{crumb}</span>
          </nav>
          <p className="sheet-label mt-6 flex items-center gap-2 text-white/90">
            <span className="h-2 w-2 shrink-0 rounded-full bg-marker" />
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-[40px] font-bold leading-[1.04] tracking-[-.035em] sm:text-[60px] lg:text-[72px]">{title}</h1>
          <div className="page-summary mt-5 max-w-[640px] text-pretty text-[17px] leading-[1.55] text-white/90 sm:text-[19px]">{description}</div>
          {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </section>
  )
}

export function PrimaryButton({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="btn-primary">
      {children}
    </a>
  )
}

export function GhostButton({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="btn-ghost">
      {children}
    </a>
  )
}

/** Stat stack used in the hero's right column. */
export function HeroFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-white/25 bg-white/20">
      {facts.map((f) => (
        <div key={f.label} className="bg-blueprint p-5">
          <dt className="sheet-label !text-[11px] text-white/80">{f.label}</dt>
          <dd className="mt-1.5 font-display text-[24px] font-bold tracking-[-.03em] text-marker">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Blueprint closing call-to-action shared by the nav pages. */
export function PageCta({
  title = "Let's build something great together.",
  body = "Tell us what you're planning — we'll reply within one business day with next steps and a clear quote.",
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-24">
      <div className="blueprint rise overflow-hidden rounded-[28px] px-6 py-14 text-center text-white sm:px-16 sm:py-20">
        <h2 className="mx-auto max-w-[760px] text-balance text-[32px] font-bold leading-[1.08] tracking-[-.035em] sm:text-[48px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-[560px] text-pretty text-[16.5px] leading-[1.55] text-white/90 sm:text-[18px]">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PrimaryButton href="/contact">Start a project →</PrimaryButton>
          <GhostButton href={brand.calendly} external>
            Book a free call
          </GhostButton>
        </div>
      </div>
    </section>
  )
}

/** Small section heading used inside the nav pages. */
export function SectionHead({ eyebrow, title, body, center }: { eyebrow: string; title: ReactNode; body?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-[720px] text-center' : 'max-w-[720px]'} tilt={false}>
      <span className="sheet-label text-blueprint">{eyebrow}</span>
      <h2 className="mt-3 text-balance text-[32px] font-bold leading-[1.06] tracking-[-.035em] sm:text-[44px]">{title}</h2>
      {body && <p className="mt-4 text-pretty text-[16.5px] leading-[1.6] text-ink/75">{body}</p>}
    </Reveal>
  )
}
