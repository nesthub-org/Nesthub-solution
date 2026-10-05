import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { Logo, LogoFallback } from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'
import { useSeo } from '../../hooks/useSeo'

function greeting() {
  const h = Number(new Intl.DateTimeFormat('en-IN', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date()))
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

const showcase = [
  { k: 'Write', v: 'Rich editor with images & headings' },
  { k: 'Publish', v: 'One click — the site rebuilds itself' },
  { k: 'Rank', v: 'SEO fields, schema and sitemap built in' },
]

/** Input with a label that floats up when focused or filled. */
function FloatField({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  onKey,
  trailing,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  autoComplete: string
  onKey?: (e: KeyboardEvent<HTMLInputElement>) => void
  trailing?: React.ReactNode
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        required
        autoComplete={autoComplete}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={onKey}
        onKeyDown={onKey}
        className="peer h-[58px] w-full rounded-2xl border border-white/12 bg-white/[.06] px-4 pb-2 pt-6 text-[16px] text-white outline-none transition-[border-color,box-shadow,background-color] placeholder-transparent focus:border-brand-500 focus:bg-white/[.09] focus:shadow-[0_0_0_4px_rgba(37,99,235,.22)]"
        style={trailing ? { paddingRight: 56 } : undefined}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-white/50 transition-all duration-200 peer-focus:top-[17px] peer-focus:text-[11.5px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[.08em] peer-focus:text-brand-200 peer-[:not(:placeholder-shown)]:top-[17px] peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[.08em]"
      >
        {label}
      </label>
      {trailing && <div className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</div>}
    </div>
  )
}

export function AdminLogin() {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || '/admin'
  const reduced = useReducedMotion()
  const shake = useAnimationControls()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [caps, setCaps] = useState(false)
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
      if (!reduced) shake.start({ x: [0, -10, 10, -7, 7, -3, 0], transition: { duration: 0.45 } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-[100dvh] overflow-hidden bg-[#07080b] text-white">
      {/* aurora + grid backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduced ? undefined : { x: [0, 60, -20, 0], y: [0, 40, 80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-500/35 blur-[110px] sm:h-[560px] sm:w-[560px]"
        />
        <motion.div
          animate={reduced ? undefined : { x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -right-24 h-[380px] w-[380px] rounded-full bg-violet-500/25 blur-[110px] sm:h-[520px] sm:w-[520px]"
        />
        <div
          className="absolute inset-0 opacity-[.08]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        {/* Showcase — desktop only, so the form is the first thing a phone sees */}
        <section className="hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12.5px] font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            NestHub Studio · Content desk
          </span>
          <h2 className="mt-6 text-[60px] font-bold leading-[.98] tracking-[-.05em]">
            Write. Publish.
            <br />
            <span className="text-shimmer">Rank.</span>
          </h2>
          <p className="mt-5 max-w-[440px] text-[16.5px] leading-[1.6] text-white/55">
            Everything behind the NestHub blog — drafts, publishing and SEO — in one quiet place.
          </p>
          <div className="mt-10 grid max-w-[460px] gap-3">
            {showcase.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 backdrop-blur"
              >
                <span className="font-mono text-[12px] font-bold text-brand-500">0{i + 1}</span>
                <span className="w-[72px] text-[16px] font-semibold">{s.k}</span>
                <span className="text-[14px] text-white/55">{s.v}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[440px]"
        >
          <a href="/" className="mb-8 flex items-center justify-center gap-2.5 text-white lg:justify-start">
            <Logo size={42} />
            <LogoFallback size={42} />
            <span className="text-[17px] font-bold tracking-[-.02em]">
              NestHub<span className="text-brand-500"> Solution</span>
            </span>
          </a>

          <motion.form
            animate={shake}
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[.05] p-6 shadow-[0_30px_80px_rgba(0,0,0,.5)] backdrop-blur-xl sm:p-9"
          >
            {/* top highlight line */}
            <span aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

            <p className="text-[13px] font-medium text-white/50">{greeting()} 👋</p>
            <h1 className="mt-1 text-[28px] font-bold tracking-[-.035em] sm:text-[30px]">Welcome back</h1>
            <p className="mt-1.5 text-[15px] text-white/55">Sign in to manage the blog.</p>

            {error && (
              <div role="alert" className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[14px] text-red-200">
                <span aria-hidden>⚠</span>
                {error}
              </div>
            )}

            <div className="mt-7 grid gap-3.5">
              <FloatField id="login-email" label="Email" type="email" autoComplete="username" value={email} onChange={setEmail} />
              <FloatField
                id="login-password"
                label="Password"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
                onKey={(e) => setCaps(e.getModifierState('CapsLock'))}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    aria-pressed={showPw}
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                      {showPw && <path d="M3 3l18 18" />}
                    </svg>
                  </button>
                }
              />
            </div>

            {caps && <p className="mt-2.5 text-[13px] font-medium text-amber-300">Caps Lock is on</p>}

            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.98 }}
              className="group relative mt-7 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-brand-500 text-[16px] font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,.4)] transition-colors hover:bg-brand-600 disabled:opacity-70"
            >
              {/* sheen sweep on hover */}
              <span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[450%]" />
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </>
              )}
            </motion.button>

            <p className="mt-5 flex items-center justify-center gap-2 text-[12.5px] text-white/40">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              Admins only · secure session
            </p>
          </motion.form>

          <p className="mt-6 text-center lg:text-left">
            <a href="/" className="text-[14px] text-white/50 transition-colors hover:text-white">
              ← Back to website
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
