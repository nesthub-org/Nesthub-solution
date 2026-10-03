import { Link, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Logo, LogoFallback } from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'

export function AdminLayout() {
  const { user, loading, logout } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-500" />
      </div>
    )
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-[14.5px] font-medium transition-colors ${isActive ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="flex items-center gap-2 text-ink">
              <Logo size={32} />
              <LogoFallback size={32} />
              <span className="hidden text-[15px] font-bold tracking-[-.02em] sm:inline">NestHub Admin</span>
            </Link>
            <nav className="flex items-center gap-1">
              <NavLink to="/admin" end className={navClass}>
                Posts
              </NavLink>
              <NavLink to="/admin/posts/new" className={navClass}>
                New post
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/blog" target="_blank" rel="noreferrer" className="hidden text-[14px] text-muted hover:text-ink sm:inline">
              View blog ↗
            </a>
            <span className="hidden text-[14px] text-ink md:inline">{user.name}</span>
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-lg border border-line px-3 py-1.5 text-[14px] text-ink hover:border-ink"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
