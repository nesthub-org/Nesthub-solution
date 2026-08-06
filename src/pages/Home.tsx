import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Hero } from '../components/sections/Hero'
import { TrustBar } from '../components/sections/TrustBar'
import { Services } from '../components/sections/Services'
import { Work } from '../components/sections/Work'
import { Product } from '../components/sections/Product'
import { Testimonials } from '../components/sections/Testimonials'
import { TechStack } from '../components/sections/TechStack'
import { Process } from '../components/sections/Process'
import { About } from '../components/sections/About'
import { Team } from '../components/sections/Team'
import { BookCall } from '../components/sections/BookCall'
import { Contact } from '../components/sections/Contact'

export function Home() {
  useDocumentTitle(
    'Top Web Development Agency in Jaipur | NestHub Solution India',
    "NestHub Solution — Jaipur's top-rated web development & freelancing agency. We build websites, AI platforms & e-commerce for businesses across Jaipur, Delhi, Mumbai & all of India. 5★ rated · Free discovery call.",
  )

  return (
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
      <Team />
      <BookCall />
      <Contact />
    </main>
  )
}
