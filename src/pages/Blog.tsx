import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { BlogCard } from '../components/blog/BlogCard'
import { useSeo } from '../hooks/useSeo'
import { blogApi, embedJson, readEmbeddedData, SITE_URL, type BlogSummary, type Paginated } from '../lib/blog'

const PAGE_SIZE = 12
const DATA_ID = 'blog-list-data'

interface ListState {
  key: string
  data: Paginated<BlogSummary>
}

export function Blog() {
  const [params] = useSearchParams()
  const page = Math.max(1, Number(params.get('page')) || 1)
  const tag = params.get('tag') || undefined
  const key = `${page}|${tag ?? ''}`

  const [state, setState] = useState<ListState | null>(() => {
    const embedded = readEmbeddedData<ListState>(DATA_ID)
    return embedded?.key === key ? embedded : null
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (state?.key === key) return
    let cancelled = false
    setError(null)
    blogApi
      .list(page, PAGE_SIZE, tag)
      .then((data) => !cancelled && setState({ key, data }))
      .catch((e: Error) => !cancelled && setError(e.message))
    return () => {
      cancelled = true
    }
  }, [key, page, tag, state?.key])

  const pageHref = (p: number) => {
    const qs = new URLSearchParams()
    if (tag) qs.set('tag', tag)
    if (p > 1) qs.set('page', String(p))
    const s = qs.toString()
    return `/blog${s ? `?${s}` : ''}`
  }

  useSeo({
    title: tag
      ? `${tag} Articles | NestHub Solution Blog`
      : `Blog: Web Development, AI & Digital Growth Insights | NestHub Solution${page > 1 ? ` (Page ${page})` : ''}`,
    description: tag
      ? `Articles about ${tag} from the NestHub Solution team in Jaipur. Practical guides on web development, AI and digital marketing.`
      : 'Practical guides on web development, AI integration, SEO, UI/UX and growing your business online, from the NestHub Solution team in Jaipur, India.',
    path: pageHref(page),
  })

  const ready = state?.key === key
  const items = ready ? state.data.items : []
  const totalPage = ready ? state.data.totalPage : 0
  const loading = !error && !ready
  const [featured, ...rest] = items
  const showFeatured = page === 1 && !tag && Boolean(featured)

  const blogSchema = items.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'NestHub Solution Blog',
        url: `${SITE_URL}/blog`,
        publisher: { '@id': `${SITE_URL}/#business` },
        blogPost: items.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.publishedAt,
          image: p.coverImage?.url,
        })),
      }
    : null

  return (
    <main id="top" className="relative z-[1] pb-28 pt-32 sm:pb-32 sm:pt-40">
      <section className="relative mx-auto max-w-[1320px] px-6">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />
        <Reveal>
          <div className="relative border-b border-line pb-12">
            <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
              <a href="/" className="text-muted hover:text-ink">Home</a>
              <span className="mx-2">/</span>
              {tag ? (
                <>
                  <a href="/blog" className="text-muted hover:text-ink">Blog</a>
                  <span className="mx-2">/</span>
                  <span className="text-ink">{tag}</span>
                </>
              ) : (
                <span className="text-ink">Blog</span>
              )}
            </nav>
            <h1 className="mt-6 text-[48px] font-bold leading-[.98] tracking-[-.05em] sm:text-[68px] lg:text-[84px]">
              {tag ? (
                <>
                  <span className="text-brand-500">#</span>
                  {tag}
                </>
              ) : (
                <>
                  Insights from
                  <br />
                  <span className="text-brand-500">NestHub.</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-[620px] text-pretty text-[17px] leading-[1.65] text-muted sm:text-[18px]">
              Practical notes on building fast websites, shipping AI features, ranking on Google and growing a business
              online, written by the team that does it every day.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-14 max-w-[1320px] px-6">
        {error && (
          <div className="rounded-[18px] border border-line bg-surface p-8 text-center text-muted">
            We couldn&apos;t load articles right now. Please refresh in a moment.
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[380px] animate-shimmer rounded-[22px] bg-surface" />
            ))}
          </div>
        )}

        {ready && items.length === 0 && (
          <div className="rounded-[18px] border border-line bg-surface p-10 text-center">
            <p className="text-[18px] font-semibold text-ink">No articles yet</p>
            <p className="mt-2 text-muted">We&apos;re writing our first posts. Check back soon.</p>
          </div>
        )}

        {showFeatured && (
          <div className="mb-7">
            <BlogCard post={featured} featured />
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {(showFeatured ? rest : items).map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {totalPage > 1 && (
          <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
            {page > 1 && (
              <a href={pageHref(page - 1)} rel="prev" className="rounded-xl border border-line px-4 py-2.5 text-[15px] font-medium text-ink hover:border-ink">
                ← Newer
              </a>
            )}
            <span className="px-3 text-[14.5px] text-muted">
              Page {page} of {totalPage}
            </span>
            {page < totalPage && (
              <a href={pageHref(page + 1)} rel="next" className="rounded-xl border border-line px-4 py-2.5 text-[15px] font-medium text-ink hover:border-ink">
                Older →
              </a>
            )}
          </nav>
        )}
      </section>

      {ready && <script id={DATA_ID} type="application/json" dangerouslySetInnerHTML={embedJson(state)} />}
      {blogSchema && <script type="application/ld+json" dangerouslySetInnerHTML={embedJson(blogSchema)} />}
    </main>
  )
}
