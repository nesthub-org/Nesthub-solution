import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
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

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/ai-integration" element={<AiIntegration />} />
        <Route path="/services/mobile-app-development" element={<MobileAppDevelopment />} />
        <Route path="/services/seo-digital-marketing" element={<SeoDigitalMarketing />} />
        <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
        <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <AiAssistant />
    </>
  )
}

export default App
