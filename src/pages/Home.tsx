import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Hero } from '../components/sections/Hero'
import { TrustBar } from '../components/sections/TrustBar'
import { Partners } from '../components/sections/Partners'
import { Services } from '../components/sections/Services'
import { Work } from '../components/sections/Work'
import { Product } from '../components/sections/Product'
import { Testimonials } from '../components/sections/Testimonials'
import { TechStack } from '../components/sections/TechStack'
import { Process } from '../components/sections/Process'
import { About } from '../components/sections/About'
import { Team } from '../components/sections/Team'
import { Faq } from '../components/sections/Faq'
import { BookCall } from '../components/sections/BookCall'
import { Contact } from '../components/sections/Contact'
import { JsonLd } from '../components/JsonLd'
import { breadcrumb, faqPage, graph, webPage } from '../lib/schema'
import { faqs } from '../data/content'

// Homepage-only nodes; the business/website graph lives in index.html.
const schema = graph(
  webPage({
    path: '/',
    name: 'Top Web Development Agency in Jaipur | NestHub Solution India',
    description:
      "NestHub Solution — Jaipur's top-rated web development and freelancing agency. Websites, AI platforms and e-commerce for businesses across India.",
    speakable: ['h1', '#about p', '#faq'],
  }),
  faqPage('/', faqs),
  breadcrumb([]),
)

export function Home() {
  useDocumentTitle(
    'Top Web Development Agency in Jaipur | NestHub Solution India',
    "NestHub Solution - Jaipur's top-rated web development & freelancing agency. Websites, AI platforms & e-commerce for businesses across India.",
  )

  return (
    <main id="top" className="relative z-[1]">
      <JsonLd data={schema} />
      <Hero />
      <TrustBar />
      <Partners />
      <Services />
      <Work />
      <Product />
      <Testimonials />
      <TechStack />
      <Process />
      <About />
      <Team />
      <Faq />
      <BookCall />
      <Contact />
    </main>
  )
}
