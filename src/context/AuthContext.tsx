import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from '../lib/api'

export interface AdminUser {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

interface AuthState {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<AdminUser>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

// The session lives in an httpOnly cookie set by the backend, so the client
// never touches the token — it just asks the API who is logged in.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api<{ user: AdminUser }>('/api/v1/users/profile')
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { user } = await api<{ user: AdminUser }>('/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (user.role !== 'admin') {
      await api('/api/v1/users/logout', { method: 'POST' }).catch(() => {})
      throw new Error('This account does not have admin access')
    }
    setUser(user)
    return user
  }, [])

  const logout = useCallback(async () => {
    await api('/api/v1/users/logout', { method: 'POST' }).catch(() => {})
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
