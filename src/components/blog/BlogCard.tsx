import { formatDate, sizedImage, type BlogSummary } from '../../lib/blog'

export function BlogCard({ post, featured = false }: { post: BlogSummary; featured?: boolean }) {
  const href = `/blog/${post.slug}`

  return (
    <article
      className={`group relative flex overflow-hidden rounded-[22px] border border-line bg-white transition-shadow hover:shadow-[0_18px_50px_rgba(17,17,17,.08)] ${
        featured ? 'flex-col lg:flex-row' : 'flex-col'
      }`}
    >
      <div className={`relative overflow-hidden bg-surface ${featured ? 'aspect-[16/9] lg:aspect-auto lg:w-[58%]' : 'aspect-[16/9]'}`}>
        {post.coverImage?.url ? (
          <img
            src={sizedImage(post.coverImage.url, featured ? 1200 : 720)}
            alt={post.coverImage.alt || post.title}
            width={featured ? 1200 : 720}
            height={featured ? 675 : 405}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
            <span className="text-[56px] font-bold tracking-[-.05em] text-brand-200">NH</span>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${featured ? 'p-7 sm:p-10 lg:justify-center' : 'p-6'}`}>
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
          {post.category && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[12px] font-semibold text-brand-600">{post.category}</span>
          )}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h2
          className={`mt-3 font-bold tracking-[-.03em] text-ink text-balance ${
            featured ? 'text-[28px] leading-[1.1] sm:text-[38px]' : 'text-[21px] leading-[1.2]'
          }`}
        >
          {/* Stretched link: the whole card is clickable, but there's one crawlable anchor */}
          <a href={href} className="text-ink after:absolute after:inset-0 after:content-['']">
            {post.title}
          </a>
        </h2>

        {post.excerpt && (
          <p className={`mt-3 text-muted text-pretty ${featured ? 'text-[17px] leading-[1.65]' : 'line-clamp-3 text-[15.5px] leading-[1.6]'}`}>
            {post.excerpt}
          </p>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-brand-500">
          Read article
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  )
}
