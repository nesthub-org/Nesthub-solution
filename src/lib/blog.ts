import { api } from './api'

export const SITE_URL = 'https://nesthubsolution.in'

export interface BlogImage {
  url: string
  publicId?: string
  alt?: string
  width?: number
  height?: number
}

export interface BlogSummary {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: BlogImage | null
  tag: string[]
  category?: string
  created_by?: string
  publishedAt?: string
  updatedAt: string
  readingTime: number
  status: 'draft' | 'published'
}

export interface BlogPost extends BlogSummary {
  content: string
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  wordCount: number
  createdAt: string
}

export interface Paginated<T> {
  items: T[]
  total: number
  limit: number
  page: number
  totalPage: number
}

export interface BlogPostResponse {
  blog?: BlogPost
  related?: BlogSummary[]
  redirectTo?: string
}

export type BlogInput = Partial<
  Pick<BlogPost, 'title' | 'slug' | 'excerpt' | 'content' | 'metaTitle' | 'metaDescription' | 'focusKeyword' | 'category' | 'tag' | 'status'>
> & { coverImage?: BlogImage | null }

export interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
}

export const blogApi = {
  list: (page = 1, limit = 12, tag?: string) =>
    api<Paginated<BlogSummary>>(
      `/blog/v1/blog?page=${page}&limit=${limit}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`,
    ),
  bySlug: (slug: string) => api<BlogPostResponse>(`/blog/v1/blog/slug/${encodeURIComponent(slug)}`),

  adminList: (params: { page?: number; status?: string; q?: string } = {}) => {
    const qs = new URLSearchParams()
    qs.set('page', String(params.page ?? 1))
    if (params.status) qs.set('status', params.status)
    if (params.q) qs.set('q', params.q)
    return api<Paginated<BlogSummary> & { counts: { published: number; drafts: number } }>(`/blog/v1/admin/blog?${qs}`)
  },
  adminGet: (id: string) => api<BlogPost>(`/blog/v1/admin/blog/${id}`),
  create: (input: BlogInput) => api<BlogPost>('/blog/v1/blog', { method: 'POST', body: JSON.stringify(input) }),
  update: (id: string, input: BlogInput) =>
    api<BlogPost>(`/blog/v1/blog/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  remove: (id: string) => api<{ _id: string }>(`/blog/v1/blog/${id}`, { method: 'DELETE' }),
  uploadImage: (file: File) => {
    const form = new FormData()
    form.append('image', file)
    return api<UploadedImage>('/blog/v1/admin/upload', { method: 'POST', body: form })
  },
}

export function formatDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Cloudinary delivery URL at a given width (keeps f_auto/q_auto). Non-Cloudinary URLs pass through. */
export function sizedImage(url: string | undefined, width: number) {
  if (!url) return ''
  if (!url.includes('res.cloudinary.com')) return url
  return url.replace(/\/image\/upload\/(?:[^/]*\/)?(v\d+\/)/, `/image/upload/f_auto,q_auto,c_limit,w_${width}/$1`)
}

export function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

/**
 * Prerendered blog pages embed the data they were rendered with in a JSON
 * <script>. Reading it synchronously on first render lets hydration match the
 * static HTML exactly instead of flashing a loading state.
 */
export function readEmbeddedData<T>(id: string): T | null {
  if (typeof document === 'undefined') return null
  const el = document.getElementById(id)
  if (!el?.textContent) return null
  try {
    return JSON.parse(el.textContent) as T
  } catch {
    return null
  }
}

export function embedJson(data: unknown) {
  // Escape "<" so post content can never close the <script> early
  return { __html: JSON.stringify(data).replace(/</g, '\u003c') }
}
