import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { WhatsAppButton } from './components/WhatsAppButton'
import { Home } from './pages/Home'
import { Careers } from './pages/Careers'

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
