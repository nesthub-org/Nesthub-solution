import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { ScrollProgress } from './components/ScrollProgress'
import { SmoothScroll } from './components/SmoothScroll'
import { MobileActionBar, WhatsAppButton } from './components/WhatsAppButton'
import { AssistantLoader } from './components/AssistantLoader'
import { pageRoutes, type InitialPage } from './routes'
import { captureSource } from './lib/lead'
import { initMetaPixel } from './lib/track'
import { initPointerFx } from './lib/pointerFx'

const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

const lazyPages = new Map(pageRoutes.map((route) => [route.path, lazy(route.load)]))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-500" />
    </div>
  )
}

function App({ initialPage }: { initialPage: InitialPage | null }) {
  const { pathname } = useLocation()
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  useEffect(() => {
    if (isAdmin) return
    captureSource()
    initMetaPixel()
    initPointerFx()
  }, [isAdmin])

  // The admin panel has its own chrome — no marketing header/footer/widgets
  if (isAdmin) {
    return (
      <Suspense fallback={<AdminFallback />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <Routes>
        {pageRoutes.map(({ path }) => {
          const Page = lazyPages.get(path)!
          const element =
            initialPage?.path === path ? (
              <initialPage.Component />
            ) : (
              <Suspense fallback={<AdminFallback />}>
                <Page />
              </Suspense>
            )
          return <Route key={path} path={path} element={element} />
        })}
      </Routes>
      <Footer />
      <MobileActionBar />
      <WhatsAppButton />
      <AssistantLoader />
    </>
  )
}

export default App
