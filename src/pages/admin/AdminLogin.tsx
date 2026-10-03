import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Logo, LogoFallback } from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'
import { useSeo } from '../../hooks/useSeo'

export function AdminLogin() {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useSeo({ title: 'Admin login | NestHub Solution', path: '/admin/login', noindex: true })

  if (!loading && user?.role === 'admin') return <Navigate to={from} replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-16">
      <div className="w-full max-w-[420px]">
        <a href="/" className="mb-8 flex items-center justify-center gap-2.5 text-ink">
          <Logo size={42} />
          <LogoFallback size={42} />
          <span className="text-[17px] font-bold tracking-[-.02em]">
            NestHub<span className="text-brand-500"> Solution</span>
          </span>
        </a>

        <form onSubmit={onSubmit} className="rounded-[22px] border border-line bg-white p-7 shadow-[0_8px_40px_rgba(0,0,0,.05)] sm:p-9">
          <h1 className="text-[26px] font-bold tracking-[-.03em] text-ink">Admin login</h1>
          <p className="mt-1.5 text-[15px] text-muted">Sign in to manage the blog.</p>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
              {error}
            </div>
          )}

          <label className="mt-6 block">
            <span className="text-[14px] font-medium text-ink">Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-[15px] text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-[14px] font-medium text-ink">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-[15px] text-ink outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full rounded-xl bg-ink px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-[14px]">
          <a href="/" className="text-muted hover:text-ink">← Back to website</a>
        </p>
      </div>
    </main>
  )
}
