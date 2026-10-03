import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import { AdminDashboard } from './AdminDashboard'
import { AdminEditor } from './AdminEditor'
import { AdminLayout } from './AdminLayout'
import { AdminLogin } from './AdminLogin'

// Everything under /admin — lazy-loaded from App.tsx so the editor bundle
// never ships to regular visitors.
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts/:id" element={<AdminEditor />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
