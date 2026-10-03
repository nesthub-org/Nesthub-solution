import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RichEditor } from '../../components/blog/RichEditor'
import { useSeo } from '../../hooks/useSeo'
import { blogApi, sizedImage, slugify, type BlogImage, type BlogInput } from '../../lib/blog'

interface Draft {
  title: string
  excerpt: string
  content: string
  slug: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  category: string
  tags: string
  coverImage: BlogImage | null
}

const EMPTY: Draft = {
  title: '',
  excerpt: '',
  content: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  focusKeyword: '',
  category: '',
  tags: '',
  coverImage: null,
}

const CATEGORIES = ['Web Development', 'AI Integration', 'Mobile Apps', 'SEO & Marketing', 'UI/UX Design', 'Business', 'Case Study']

const textOf = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

function AutoTextarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [props.value])
  return <textarea ref={ref} rows={1} className={`w-full resize-none overflow-hidden bg-transparent outline-none ${className ?? ''}`} {...props} />
}

function Counter({ value, min, max }: { value: number; min: number; max: number }) {
  const ok = value >= min && value <= max
  return <span className={`text-[12px] ${ok ? 'text-green-600' : value > max ? 'text-red-600' : 'text-muted'}`}>{value}/{max}</span>
}

export function AdminEditor() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [postId, setPostId] = useState<string | null>(isNew ? null : id!)
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [slugTouched, setSlugTouched] = useState(false)
  const [loaded, setLoaded] = useState(isNew)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)
  const coverInput = useRef<HTMLInputElement>(null)
  // Bumped on every edit, so a save only marks the post clean if nothing changed while it was in flight
  const revision = useRef(0)

  useSeo({ title: `${isNew ? 'New post' : 'Edit post'} | NestHub Admin`, path: '/admin/posts', noindex: true })

  useEffect(() => {
    // After the first save of a new post the URL switches to its id — the draft in memory is already current
    if (isNew || (loaded && postId === id)) return
    blogApi
      .adminGet(id!)
      .then((p) => {
        setDraft({
          title: p.title,
          excerpt: p.excerpt ?? '',
          content: p.content,
          slug: p.slug,
          metaTitle: p.metaTitle ?? '',
          metaDescription: p.metaDescription ?? '',
          focusKeyword: p.focusKeyword ?? '',
          category: p.category ?? '',
          tags: p.tag.join(', '),
          coverImage: p.coverImage ?? null,
        })
        setStatus(p.status)
        setSlugTouched(true)
        setLoaded(true)
      })
      .catch((e: Error) => setLoadError(e.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isNew])

  const update = useCallback(<K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }))
    revision.current += 1
    setDirty(true)
  }, [])

  // Slug follows the title until it's edited by hand (or the post exists)
  useEffect(() => {
    if (!slugTouched) setDraft((d) => ({ ...d, slug: slugify(d.title) }))
  }, [draft.title, slugTouched])

  const onContentChange = useCallback((html: string) => update('content', html), [update])
  const onUpload = useCallback((file: File) => blogApi.uploadImage(file), [])

  const save = useCallback(
    async (nextStatus: 'draft' | 'published', { silent = false } = {}) => {
      if (!draft.title.trim()) {
        if (!silent) setError('Add a title before saving')
        return false
      }
      if (!textOf(draft.content) && !draft.content.includes('<img')) {
        if (!silent) setError('Write something before saving')
        return false
      }
      setSaving(true)
      if (!silent) setError(null)
      const rev = revision.current
      const payload: BlogInput = {
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        slug: draft.slug || slugify(draft.title),
        metaTitle: draft.metaTitle,
        metaDescription: draft.metaDescription,
        focusKeyword: draft.focusKeyword,
        category: draft.category,
        tag: draft.tags.split(',').map((t) => t.trim()).filter(Boolean),
        coverImage: draft.coverImage,
        status: nextStatus,
      }
      try {
        const saved = postId ? await blogApi.update(postId, payload) : await blogApi.create(payload)
        setStatus(saved.status)
        setDraft((d) => ({ ...d, slug: saved.slug }))
        setSlugTouched(true)
        if (revision.current === rev) setDirty(false)
        setSavedAt(new Date())
        if (!postId) {
          setPostId(saved._id)
          navigate(`/admin/posts/${saved._id}`, { replace: true })
        }
        return true
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Save failed')
        return false
      } finally {
        setSaving(false)
      }
    },
    [draft, postId, navigate],
  )

  // Autosave drafts (published posts only change when "Update" is pressed)
  useEffect(() => {
    if (!dirty || status !== 'draft' || saving) return
    const t = setTimeout(() => void save('draft', { silent: true }), 4000)
    return () => clearTimeout(t)
  }, [dirty, status, saving, save])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const uploadCover = async (file?: File) => {
    if (!file) return
    setCoverUploading(true)
    setError(null)
    try {
      const img = await blogApi.uploadImage(file)
      update('coverImage', { url: img.url, publicId: img.publicId, width: img.width, height: img.height, alt: draft.coverImage?.alt || draft.title })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Cover upload failed')
    } finally {
      setCoverUploading(false)
    }
  }

  // Live SEO checklist — mirrors what Google uses to understand a page
  const seo = useMemo(() => {
    const text = textOf(draft.content)
    const words = text ? text.split(' ').length : 0
    const kw = draft.focusKeyword.trim().toLowerCase()
    const seoTitle = draft.metaTitle || draft.title
    const desc = draft.metaDescription || draft.excerpt
    const imgs = draft.content.match(/<img [^>]*>/g) ?? []
    const missingAlt = imgs.filter((t) => !/alt="[^"]+"/.test(t)).length
    const firstPara = textOf(draft.content.split('</p>')[0] ?? '').toLowerCase()
    const checks = [
      { ok: seoTitle.length >= 30 && seoTitle.length <= 60, label: 'SEO title is 30–60 characters' },
      { ok: desc.length >= 120 && desc.length <= 160, label: 'Meta description is 120–160 characters' },
      { ok: words >= 600, label: `Article has 600+ words (${words} now)` },
      { ok: Boolean(draft.coverImage?.url), label: 'Has a cover image (used for social previews)' },
      { ok: Boolean(draft.coverImage?.alt?.trim()) || !draft.coverImage, label: 'Cover image has alt text' },
      { ok: missingAlt === 0, label: missingAlt ? `${missingAlt} image(s) missing alt text` : 'All images have alt text' },
      { ok: /<h2/.test(draft.content), label: 'Uses H2 headings to structure the article' },
      { ok: /href="(\/|https?:\/\/(www\.)?nesthubsolution\.in)/.test(draft.content), label: 'Links to another NestHub page' },
      ...(kw
        ? [
            { ok: seoTitle.toLowerCase().includes(kw), label: 'Focus keyword in SEO title' },
            { ok: desc.toLowerCase().includes(kw), label: 'Focus keyword in meta description' },
            { ok: draft.slug.includes(slugify(kw)), label: 'Focus keyword in URL' },
            { ok: firstPara.includes(kw), label: 'Focus keyword in first paragraph' },
          ]
        : [{ ok: false, label: 'Set a focus keyword' }]),
    ]
    return { checks, score: Math.round((checks.filter((c) => c.ok).length / checks.length) * 100), words, seoTitle, desc }
  }, [draft])

  if (loadError) {
    return <main className="mx-auto max-w-[760px] px-6 py-16 text-center text-red-600">{loadError}</main>
  }
  if (!loaded) {
    return (
      <main className="flex justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-500" />
      </main>
    )
  }

  const saveLabel = saving ? 'Saving…' : dirty ? 'Unsaved changes' : savedAt ? `Saved ${savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : status === 'published' ? 'Published' : 'Draft'
  const scoreColor = seo.score >= 80 ? 'text-green-600' : seo.score >= 50 ? 'text-amber-600' : 'text-red-600'

  const inputCls = 'mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[14.5px] text-ink outline-none focus:border-brand-500'

  return (
    <div className="bg-white">
      {/* Action bar */}
      <div className="sticky top-16 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2 text-[13.5px] text-muted">
            <span className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
              {status === 'published' ? 'Published' : 'Draft'}
            </span>
            <span className="hidden sm:inline">{saveLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPanelOpen((o) => !o)}
              className="rounded-lg border border-line px-3 py-1.5 text-[14px] text-ink hover:border-ink"
            >
              SEO & settings <span className={`font-semibold ${scoreColor}`}>{seo.score}</span>
            </button>
            {status === 'published' ? (
              <>
                <button type="button" disabled={saving} onClick={() => void save('draft')} className="hidden rounded-lg px-3 py-1.5 text-[14px] text-muted hover:text-ink sm:block">
                  Unpublish
                </button>
                <button type="button" disabled={saving} onClick={() => void save('published')} className="rounded-lg bg-success px-4 py-1.5 text-[14px] font-semibold text-white disabled:opacity-60">
                  Update
                </button>
              </>
            ) : (
              <>
                <button type="button" disabled={saving} onClick={() => void save('draft')} className="hidden rounded-lg px-3 py-1.5 text-[14px] text-muted hover:text-ink sm:block">
                  Save draft
                </button>
                <button type="button" disabled={saving} onClick={() => void save('published')} className="rounded-lg bg-success px-4 py-1.5 text-[14px] font-semibold text-white disabled:opacity-60">
                  Publish
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-auto mt-4 max-w-[760px] px-6">
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Writing surface */}
      <main className="mx-auto max-w-[760px] px-6 pb-40 pt-10">
        {draft.coverImage?.url ? (
          <figure className="group relative mb-10">
            <img src={sizedImage(draft.coverImage.url, 1200)} alt={draft.coverImage.alt || ''} className="w-full rounded-[18px] object-cover" />
            <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button type="button" onClick={() => coverInput.current?.click()} className="rounded-lg bg-white/95 px-3 py-1.5 text-[13px] font-medium text-ink shadow">
                Replace
              </button>
              <button type="button" onClick={() => update('coverImage', null)} className="rounded-lg bg-white/95 px-3 py-1.5 text-[13px] font-medium text-red-600 shadow">
                Remove
              </button>
            </div>
            <input
              value={draft.coverImage.alt ?? ''}
              onChange={(e) => update('coverImage', { ...draft.coverImage!, alt: e.target.value })}
              placeholder="Describe the cover image (alt text)"
              className="mt-2 w-full bg-transparent text-center text-[13.5px] text-muted outline-none placeholder:text-muted/60"
            />
          </figure>
        ) : (
          <button
            type="button"
            disabled={coverUploading}
            onClick={() => coverInput.current?.click()}
            className="mb-8 flex w-full items-center justify-center gap-2 rounded-[18px] border border-dashed border-line py-8 text-[14.5px] text-muted hover:border-ink hover:text-ink"
          >
            {coverUploading ? 'Uploading cover…' : '+ Add a cover image'}
          </button>
        )}
        <input ref={coverInput} type="file" accept="image/*" hidden onChange={(e) => { void uploadCover(e.target.files?.[0]); e.target.value = '' }} />

        <AutoTextarea
          value={draft.title}
          onChange={(e) => update('title', e.target.value.replace(/\n/g, ''))}
          placeholder="Title"
          maxLength={160}
          className="font-[Georgia,serif] text-[40px] font-bold leading-[1.15] tracking-[-.02em] text-ink placeholder:text-line sm:text-[46px]"
        />
        <AutoTextarea
          value={draft.excerpt}
          onChange={(e) => update('excerpt', e.target.value.replace(/\n/g, ''))}
          placeholder="Add a subtitle — a one-line summary readers see in search results and cards"
          maxLength={300}
          className="mt-3 text-[21px] leading-[1.5] text-muted placeholder:text-muted/40"
        />

        <div className="mt-8">
          <RichEditor initialContent={draft.content} onChange={onContentChange} onUpload={onUpload} />
        </div>
      </main>

      {/* SEO & settings drawer */}
      {panelOpen && <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setPanelOpen(false)} />}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[440px] overflow-y-auto border-l border-line bg-white p-6 transition-[transform,visibility] duration-300 ${
          panelOpen ? 'visible translate-x-0 shadow-2xl' : 'invisible translate-x-full'
        }`}
        aria-hidden={!panelOpen}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold tracking-[-.02em]">SEO & settings</h2>
          <button type="button" onClick={() => setPanelOpen(false)} aria-label="Close" className="text-[22px] text-muted hover:text-ink">
            ✕
          </button>
        </div>

        {/* Google preview */}
        <div className="mt-6 rounded-xl border border-line p-4">
          <p className="text-[12px] font-semibold uppercase tracking-[.06em] text-muted">Google preview</p>
          <p className="mt-3 truncate text-[13px] text-[#202124]">nesthubsolution.in › blog › {draft.slug || 'your-post-url'}</p>
          <p className="mt-1 line-clamp-2 text-[19px] leading-snug text-[#1a0dab]">{seo.seoTitle || 'Post title'} | NestHub Solution</p>
          <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-[#4d5156]">{seo.desc || 'Add a meta description or subtitle to control this text.'}</p>
        </div>

        <label className="mt-6 block">
          <span className="text-[14px] font-medium text-ink">Focus keyword</span>
          <input value={draft.focusKeyword} onChange={(e) => update('focusKeyword', e.target.value)} placeholder="e.g. website development cost in India" className={inputCls} />
          <span className="mt-1 block text-[12px] text-muted">The main search phrase you want this post to rank for.</span>
        </label>

        <label className="mt-5 block">
          <span className="text-[14px] font-medium text-ink">URL slug</span>
          <div className="mt-1.5 flex items-center rounded-xl border border-line bg-surface pl-3.5 text-[14px] text-muted focus-within:border-brand-500">
            /blog/
            <input
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true)
                update('slug', slugify(e.target.value))
              }}
              className="w-full bg-white px-2 py-2.5 text-ink outline-none"
            />
          </div>
          {status === 'published' && <span className="mt-1 block text-[12px] text-muted">Changing this keeps the old URL working with a redirect.</span>}
        </label>

        <label className="mt-5 block">
          <span className="flex items-center justify-between text-[14px] font-medium text-ink">
            SEO title <Counter value={(draft.metaTitle || draft.title).length} min={30} max={60} />
          </span>
          <input value={draft.metaTitle} onChange={(e) => update('metaTitle', e.target.value)} maxLength={70} placeholder={draft.title || 'Defaults to the post title'} className={inputCls} />
        </label>

        <label className="mt-5 block">
          <span className="flex items-center justify-between text-[14px] font-medium text-ink">
            Meta description <Counter value={(draft.metaDescription || draft.excerpt).length} min={120} max={160} />
          </span>
          <textarea
            value={draft.metaDescription}
            onChange={(e) => update('metaDescription', e.target.value)}
            maxLength={170}
            rows={3}
            placeholder={draft.excerpt || 'Defaults to the subtitle'}
            className={`${inputCls} resize-none`}
          />
        </label>

        <label className="mt-5 block">
          <span className="text-[14px] font-medium text-ink">Category</span>
          <input list="blog-categories" value={draft.category} onChange={(e) => update('category', e.target.value)} placeholder="Pick or type a category" className={inputCls} />
          <datalist id="blog-categories">
            {CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className="mt-5 block">
          <span className="text-[14px] font-medium text-ink">Tags</span>
          <input value={draft.tags} onChange={(e) => update('tags', e.target.value)} placeholder="react, seo, jaipur (comma separated)" className={inputCls} />
        </label>

        {/* Checklist */}
        <div className="mt-7 rounded-xl border border-line p-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">SEO checklist</p>
            <span className={`text-[15px] font-bold ${scoreColor}`}>{seo.score}/100</span>
          </div>
          <ul className="mt-3 space-y-2">
            {seo.checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2 text-[13.5px]">
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] text-white ${c.ok ? 'bg-success' : 'bg-line'}`}>
                  {c.ok ? '✓' : ''}
                </span>
                <span className={c.ok ? 'text-ink' : 'text-muted'}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {status === 'published' && draft.slug && (
          <a href={`/blog/${draft.slug}`} target="_blank" rel="noreferrer" className="mt-5 block text-[14px] font-medium text-brand-500">
            View live post ↗
          </a>
        )}
      </aside>
    </div>
  )
}
