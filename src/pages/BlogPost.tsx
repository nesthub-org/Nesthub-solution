import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BlogCard } from '../components/blog/BlogCard'
import { useSeo } from '../hooks/useSeo'
import { brand } from '../data/content'
import { ApiError } from '../lib/api'
import {
  blogApi,
  embedJson,
  formatDate,
  readEmbeddedData,
  SITE_URL,
  sizedImage,
  type BlogPost as Post,
  type BlogSummary,
} from '../lib/blog'

const DATA_ID = 'blog-post-data'

interface PostState {
  slug: string
  blog: Post
  related: BlogSummary[]
}

// Below-the-fold images in the article body shouldn't compete with the cover for bandwidth
const lazyImages = (html: string) => html.replace(/<img (?![^>]*loading=)/g, '<img loading="lazy" decoding="async" ')

export function BlogPost() {
  const { slug = '' } = useParams()
  const [state, setState] = useState<PostState | null>(() => {
    const embedded = readEmbeddedData<PostState>(DATA_ID)
    return embedded?.slug === slug ? embedded : null
  })
  const [status, setStatus] = useState<'idle' | 'notfound' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (state?.slug === slug) return
    let cancelled = false
    setStatus('idle')
    blogApi
      .bySlug(slug)
      .then((data) => {
        if (cancelled) return
        if (data.redirectTo) {
          window.location.replace(`/blog/${data.redirectTo}`)
          return
        }
        if (data.blog) setState({ slug, blog: data.blog, related: data.related ?? [] })
      })
      .catch((e) => !cancelled && setStatus(e instanceof ApiError && e.status === 404 ? 'notfound' : 'error'))
    return () => {
      cancelled = true
    }
  }, [slug, state?.slug])

  const post = state?.slug === slug ? state.blog : null
  const related = state?.slug === slug ? state.related : []
  const path = `/blog/${slug}`
  const url = `${SITE_URL}${path}`
  const cover = post?.coverImage?.url ? sizedImage(post.coverImage.url, 1200) : undefined
  const description = post ? post.metaDescription || post.excerpt || '' : undefined

  useSeo({
    title: post
      ? `${post.metaTitle || post.title} | NestHub Solution`
      : status === 'notfound'
        ? 'Article not found | NestHub Solution'
        : 'Blog | NestHub Solution',
    description,
    path,
    image: cover,
    imageAlt: post?.coverImage?.alt || post?.title,
    type: post ? 'article' : 'website',
    noindex: status === 'notfound',
    keywords: post ? [post.focusKeyword, ...post.tag].filter(Boolean).join(', ') : undefined,
    publishedTime: post?.publishedAt,
    modifiedTime: post?.updatedAt,
    author: post?.created_by || brand.name,
    tags: post?.tag,
  })

  const html = useMemo(() => (post ? lazyImages(post.content) : ''), [post])

  if (status === 'notfound') {
    return (
      <main id="top" className="relative z-[1] mx-auto max-w-[760px] px-6 pb-28 pt-40 text-center">
        <h1 className="text-[44px] font-bold tracking-[-.04em]">Article not found</h1>
        <p className="mt-4 text-[17px] text-muted">It may have moved or been unpublished.</p>
        <a href="/blog" className="mt-8 inline-block rounded-xl bg-ink px-6 py-3 font-semibold text-white">
          Browse all articles
        </a>
      </main>
    )
  }

  if (!post) {
    return (
      <main id="top" className="relative z-[1] mx-auto max-w-[760px] px-6 pb-28 pt-40" aria-busy={status === 'idle'}>
        {status === 'error' ? (
          <p className="text-center text-muted">We couldn&apos;t load this article. Please refresh in a moment.</p>
        ) : (
          <div className="space-y-5">
            <div className="h-6 w-40 animate-shimmer rounded bg-surface" />
            <div className="h-14 w-full animate-shimmer rounded bg-surface" />
            <div className="h-[340px] w-full animate-shimmer rounded-[22px] bg-surface" />
          </div>
        )}
      </main>
    )
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description,
        image: cover ? [cover] : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: post.created_by
          ? { '@type': 'Person', name: post.created_by, worksFor: { '@id': `${SITE_URL}/#business` } }
          : { '@id': `${SITE_URL}/#business` },
        publisher: { '@id': `${SITE_URL}/#business` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: { '@id': `${SITE_URL}/blog#blog` },
        articleSection: post.category,
        keywords: post.tag.join(', '),
        wordCount: post.wordCount,
        timeRequired: `PT${post.readingTime}M`,
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  const share = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
  ]

  return (
    <main id="top" className="relative z-[1] pb-28 pt-32 sm:pb-32 sm:pt-40">
      <article className="mx-auto max-w-[760px] px-6">
        <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
          <a href="/" className="text-muted hover:text-ink">Home</a>
          <span className="mx-2">/</span>
          <a href="/blog" className="text-muted hover:text-ink">Blog</a>
          {post.category && (
            <>
              <span className="mx-2">/</span>
              <span className="text-ink">{post.category}</span>
            </>
          )}
        </nav>

        <header className="mt-6">
          <h1 className="text-balance text-[36px] font-bold leading-[1.08] tracking-[-.04em] text-ink sm:text-[50px]">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-5 text-pretty text-[19px] leading-[1.6] text-muted sm:text-[21px]">{post.excerpt}</p>}

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-line py-4 text-[14.5px] text-muted">
            <span className="font-semibold text-ink">{post.created_by || brand.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
            {post.updatedAt && post.publishedAt && new Date(post.updatedAt).getTime() - new Date(post.publishedAt).getTime() > 86400000 && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              </>
            )}
          </div>
        </header>

        {cover && (
          <figure className="mt-9 -mx-6 sm:mx-0">
            <img
              src={cover}
              alt={post.coverImage?.alt || post.title}
              width={post.coverImage?.width || 1200}
              height={post.coverImage?.height || 675}
              fetchPriority="high"
              className="h-auto w-full object-cover sm:rounded-[22px]"
            />
          </figure>
        )}

        <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: html }} />

        {post.tag.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tag.map((t) => (
              <a
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className="rounded-full border border-line px-3.5 py-1.5 text-[14px] text-ink hover:border-ink"
              >
                #{t}
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
          <span className="mr-2 text-[14px] font-semibold text-ink">Share</span>
          {share.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-line px-3.5 py-2 text-[14px] text-ink hover:border-ink"
            >
              {s.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(url).then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 1800)
              })
            }}
            className="rounded-xl border border-line px-3.5 py-2 text-[14px] text-ink hover:border-ink"
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>

        <aside className="mt-14 rounded-[22px] bg-ink p-8 text-white sm:p-10">
          <p className="text-[24px] font-bold leading-tight tracking-[-.03em] sm:text-[28px]">Want this built for your business?</p>
          <p className="mt-3 max-w-[520px] text-[16px] leading-relaxed text-white/70">
            NestHub Solution designs and develops fast, SEO-ready websites, apps and AI features for businesses across India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={brand.calendly} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-600">
              Book a free call
            </a>
            <a href="/#contact" className="rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:border-white">
              Contact us
            </a>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1320px] px-6" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-[30px] font-bold tracking-[-.03em]">
            Keep reading
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      )}

      <script id={DATA_ID} type="application/json" dangerouslySetInnerHTML={embedJson({ slug, blog: post, related } satisfies PostState)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={embedJson(schema)} />
    </main>
  )
}
