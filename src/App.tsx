import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './components/sections/Hero'
import { TrustBar } from './components/sections/TrustBar'
import { Services } from './components/sections/Services'
import { Work } from './components/sections/Work'
import { Product } from './components/sections/Product'
import { Testimonials } from './components/sections/Testimonials'
import { TechStack } from './components/sections/TechStack'
import { Process } from './components/sections/Process'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <>
      <Header />
      <main id="top" className="relative z-[1]">
        <Hero />
        <TrustBar />
        <Services />
        <Work />
        <Product />
        <Testimonials />
        <TechStack />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
