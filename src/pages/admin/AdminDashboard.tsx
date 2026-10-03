import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../../hooks/useSeo'
import { blogApi, formatDate, sizedImage, type BlogSummary } from '../../lib/blog'

type Filter = '' | 'published' | 'draft'

export function AdminDashboard() {
  useSeo({ title: 'Posts | NestHub Admin', path: '/admin', noindex: true })

  const [filter, setFilter] = useState<Filter>('')
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<BlogSummary[]>([])
  const [totalPage, setTotalPage] = useState(1)
  const [counts, setCounts] = useState({ published: 0, drafts: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    blogApi
      .adminList({ page, status: filter || undefined, q: search || undefined })
      .then((d) => {
        setItems(d.items)
        setTotalPage(Math.max(1, d.totalPage))
        setCounts(d.counts)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [page, filter, search])

  useEffect(load, [load])

  // Debounce the search box
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1)
      setSearch(query.trim())
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const onDelete = async (post: BlogSummary) => {
    if (!window.confirm(`Delete "${post.title}"? This removes it from the website.`)) return
    try {
      await blogApi.remove(post._id)
      load()
    } catch (e) {
      window.alert(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  const tabs: { value: Filter; label: string; count?: number }[] = [
    { value: '', label: 'All', count: counts.published + counts.drafts },
    { value: 'published', label: 'Published', count: counts.published },
    { value: 'draft', label: 'Drafts', count: counts.drafts },
  ]

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold tracking-[-.03em] text-ink">Blog posts</h1>
          <p className="mt-1 text-[15px] text-muted">Write, edit and publish articles on nesthubsolution.in/blog.</p>
        </div>
        <Link to="/admin/posts/new" className="rounded-xl bg-ink px-5 py-3 text-[15px] font-semibold text-white hover:bg-brand-500">
          + Write a post
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-line bg-white p-1">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => {
                setFilter(t.value)
                setPage(1)
              }}
              className={`rounded-lg px-3.5 py-1.5 text-[14px] font-medium ${filter === t.value ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
            >
              {t.label} <span className="opacity-60">{t.count}</span>
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search titles…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-[14.5px] outline-none focus:border-brand-500 sm:w-72"
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-[18px] border border-line bg-white">
        {error && <div className="p-6 text-[15px] text-red-600">{error}</div>}

        {loading && !error && (
          <div className="divide-y divide-line">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="h-14 w-24 animate-shimmer rounded-lg bg-surface" />
                <div className="h-5 flex-1 animate-shimmer rounded bg-surface" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[17px] font-semibold text-ink">No posts here yet</p>
            <Link to="/admin/posts/new" className="mt-3 inline-block text-[15px] font-medium text-brand-500">
              Write your first post →
            </Link>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className="divide-y divide-line">
            {items.map((post) => (
              <li key={post._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <Link to={`/admin/posts/${post._id}`} className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-surface">
                    {post.coverImage?.url && (
                      <img src={sizedImage(post.coverImage.url, 200)} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[16px] font-semibold text-ink">{post.title}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-2 text-[13px] text-muted">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${
                          post.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                      <span>
                        {post.status === 'published' ? formatDate(post.publishedAt) : `Edited ${formatDate(post.updatedAt)}`}
                      </span>
                      <span>· {post.readingTime} min</span>
                    </p>
                  </div>
                </Link>
                <div className="flex shrink-0 gap-2">
                  {post.status === 'published' && (
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-3 py-1.5 text-[13.5px] text-ink hover:border-ink">
                      View
                    </a>
                  )}
                  <Link to={`/admin/posts/${post._id}`} className="rounded-lg border border-line px-3 py-1.5 text-[13.5px] text-ink hover:border-ink">
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => void onDelete(post)}
                    className="rounded-lg border border-line px-3 py-1.5 text-[13.5px] text-red-600 hover:border-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {totalPage > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-[14px]">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-line bg-white px-3 py-1.5 disabled:opacity-40">
            ← Prev
          </button>
          <span className="text-muted">
            {page} / {totalPage}
          </span>
          <button type="button" disabled={page >= totalPage} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-line bg-white px-3 py-1.5 disabled:opacity-40">
            Next →
          </button>
        </div>
      )}
    </main>
  )
}
