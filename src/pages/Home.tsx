import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { StudioHero } from '../components/sections/StudioHero'
import { LiveProof } from '../components/sections/LiveProof'
import { Packages } from '../components/sections/Packages'
import { AskThem } from '../components/sections/AskThem'
import { NextSteps } from '../components/sections/NextSteps'
import { Team } from '../components/sections/Team'
import { Faq } from '../components/sections/Faq'
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
    speakable: ['h1', '#faq'],
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
      <StudioHero />
      <LiveProof />
      <Packages />
      <AskThem />
      <NextSteps />
      <Team />
      <Faq />
      <Contact />
    </main>
  )
}
