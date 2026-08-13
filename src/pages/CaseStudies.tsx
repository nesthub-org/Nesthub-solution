import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { accentStyles, tones } from '../components/sections/Services/tones'
import { getDomain } from '../utils/url'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { projects, type Project } from '../data/content'

function ProjectGallery({ project }: { project: Project }) {
  const images = [project.image, ...(project.gallery ?? [])]
  const [active, setActive] = useState(0)
  const t = tones[project.accent]
  const domain = getDomain(project.href)

  return (
    <div>
      <div className="overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-white to-[#F0F2F6] shadow-[0_8px_40px_rgba(0,0,0,.06)]">
        <div className="flex items-center gap-1.5 border-b border-line/70 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 flex-1 truncate rounded-full border border-line/60 bg-white px-3 py-1 text-center text-[11px] font-medium text-muted">
            {domain}
          </span>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden px-5 pb-3 pt-6">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={images[active]}
              alt={images.length > 1 ? `${project.title} — screen ${active + 1} of ${images.length}` : `${project.title} website, shown on a laptop screen`}
              loading="lazy"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[460px] object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,.12)]"
            />
          </AnimatePresence>
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3" role="tablist" aria-label={`${project.title} screenshots`}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`View screen ${i + 1} of ${images.length}`}
              onClick={() => setActive(i)}
              style={{ borderColor: active === i ? t[500] : 'transparent' }}
              className={`overflow-hidden rounded-xl border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ${
                active === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" aria-hidden className="h-16 w-24 rounded-[10px] bg-white object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectSection({ project, index }: { project: Project; index: number }) {
  const a = accentStyles[project.accent]
  const t = tones[project.accent]
  const reverse = index % 2 === 1
  const domain = getDomain(project.href)

  return (
    <section id={project.slug} className="scroll-mt-28 border-t border-line py-16 first:border-t-0 first:pt-0 sm:py-20">
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
            <ProjectGallery project={project} />
          </div>

          <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
            <span aria-hidden className="text-[13px] font-bold tracking-[.05em] text-line">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>

            <div className="mt-3 flex items-center gap-2">
              {project.logo ? (
                <img src={project.logo} alt="" aria-hidden className="h-7 w-7 rounded-full border border-line bg-white object-contain p-0.5 shadow-sm" />
              ) : (
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${a.badgeBorder} ${a.badgeBg}`}>
                  <Icon name={project.icon ?? 'briefcase'} size={13} color={t[600]} />
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.07em] ${a.badgeBg} ${a.badgeText} ${a.badgeBorder}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${a.badgeDot}`} />
                {project.category}
              </span>
            </div>

            <h2 className="mt-4 text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[34px]">{project.title}</h2>
            <span className={`mt-3 block h-[3px] w-10 rounded-full ${a.underline}`} />
            <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">{project.body}</p>

            <ul className="mt-6 grid gap-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[15px] leading-[1.55] text-ink">
                  <span className={`mt-2 block h-1.5 w-1.5 shrink-0 rounded-full ${a.underline}`} />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] font-semibold text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-7 inline-flex h-13 items-center gap-2 rounded-2xl px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,.35)] transition-transform hover:-translate-y-0.5`}
              style={{ backgroundColor: t[600] }}
            >
              Visit live site
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
            <span className="ml-3 text-[13.5px] font-medium text-muted">{domain}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function CaseStudies() {
  useDocumentTitle(
    'Case Studies — NestHub Solution Client Work',
    'A closer look at the products NestHub Solution has shipped — dashboards, e-commerce, health & wellness platforms and fintech, each broken down in detail.',
    '/case-studies',
  )

  return (
    <main id="top" className="relative z-[1] pb-8 pt-32 sm:pt-36">
      <section className="mx-auto max-w-[1320px] px-6">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Case Studies</span>
          <h1 className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.08] tracking-[-.035em] text-balance">
            Selected work, in detail.
          </h1>
          <p className="text-pretty mt-5 text-[17px] sm:text-[18px] leading-[1.65] text-muted">
            Every project below shipped to production for a real client — the platform, the capabilities we built,
            and a link to see it live.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <nav aria-label="Jump to case study" className="mt-8 flex flex-wrap gap-2">
            {projects.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13.5px] font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
              >
                {p.title}
              </a>
            ))}
          </nav>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pt-16 sm:pt-20">
        {projects.map((project, i) => (
          <ProjectSection key={project.slug} project={project} index={i} />
        ))}
      </section>

      <section className="mx-auto max-w-[720px] px-6 pt-8 sm:pt-12">
        <Reveal>
          <div className="rounded-[20px] border border-line bg-white p-8 text-center shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:p-10">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-brand-50">
              <Icon name="send" color="#2563EB" size={20} />
            </span>
            <h2 className="mt-5 text-[24px] sm:text-[28px] font-bold leading-[1.15] tracking-[-.03em]">
              Have a project like this in mind?
            </h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted">
              Tell us what you're building — we'll get back to you within a couple of business days with next steps.
            </p>
            <motion.a
              href="/#contact"
              whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex h-13 items-center justify-center rounded-2xl bg-brand-500 px-8 text-[15.5px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)]"
            >
              Start a project
            </motion.a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
