import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { SmoothScroll } from './components/SmoothScroll'
import { WhatsAppButton } from './components/WhatsAppButton'
import { AiAssistant } from './components/AiAssistant'
import { Home } from './pages/Home'
import { Careers } from './pages/Careers'
import { CaseStudies } from './pages/CaseStudies'
import { WebsiteDevelopment } from './pages/WebsiteDevelopment'
import { AiIntegration } from './pages/AiIntegration'
import { MobileAppDevelopment } from './pages/MobileAppDevelopment'
import { SeoDigitalMarketing } from './pages/SeoDigitalMarketing'
import { SocialMediaMarketing } from './pages/SocialMediaMarketing'
import { UiUxDesign } from './pages/UiUxDesign'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { ServicesPage } from './pages/ServicesPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ProductPage } from './pages/ProductPage'
import { ProcessPage } from './pages/ProcessPage'
import { AboutPage } from './pages/AboutPage'
import { FaqPage } from './pages/FaqPage'
import { ContactPage } from './pages/ContactPage'

const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-500" />
    </div>
  )
}

function App() {
  const { pathname } = useLocation()

  // The admin panel has its own chrome — no marketing header/footer/widgets
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/ai-integration" element={<AiIntegration />} />
        <Route path="/services/mobile-app-development" element={<MobileAppDevelopment />} />
        <Route path="/services/seo-digital-marketing" element={<SeoDigitalMarketing />} />
        <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
        <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <AiAssistant />
    </>
  )
}

export default App
