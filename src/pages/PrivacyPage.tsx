import { JsonLd } from '../components/JsonLd'
import { breadcrumb, graph, webPage } from '../lib/schema'
import { PageHero } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand } from '../data/content'

const sections = [
  {
    title: 'What we collect',
    items: [
      'The contact form: your name, phone number and anything else you choose to add, such as your email, business name, budget or project details.',
      'The homepage preview: the business name you type stays in your browser. It only reaches us if you choose to send it to us on WhatsApp or through the form.',
      'WhatsApp and phone: whatever you share with us in that conversation.',
      'Usage data: which pages are viewed and how, on what kind of device, and which ad or link brought you here.',
    ],
  },
  {
    title: 'What we use it for',
    items: [
      'To reply to you and talk about your project.',
      'To understand which of our ads and pages are useful, and to improve them.',
      'We do not sell your information.',
    ],
  },
  {
    title: 'Services that help us',
    items: [
      'StaticForms delivers the contact form to our inbox.',
      'WhatsApp, a Meta product, carries any chat you start with us.',
      'Calendly handles call bookings.',
      'Microsoft Clarity shows us how the site is used, including anonymised recordings of visits.',
      'The Meta Pixel tells us whether our Facebook and Instagram ads bring people who go on to get in touch.',
    ],
  },
  {
    title: 'Your choices',
    items: [`To see, correct or delete what we hold about you, email ${brand.email} and we will take care of it.`],
  },
]

const schema = graph(
  webPage({
    path: '/privacy',
    name: 'Privacy policy — NestHub Solution',
    description: 'What NestHub Solution collects through this website, what it is used for and how to ask for it to be deleted.',
    speakable: ['h1', '.page-summary'],
  }),
  breadcrumb([{ name: 'Privacy', path: '/privacy' }]),
)

export function PrivacyPage() {
  useDocumentTitle(
    'Privacy Policy | NestHub Solution',
    'What NestHub Solution collects through this website, what it is used for and how to ask for it to be deleted.',
    '/privacy',
  )

  return (
    <main id="top" className="relative z-[1]">
      <JsonLd data={schema} />
      <PageHero
        crumb="Privacy"
        eyebrow="Last updated November 2026"
        title="Privacy policy"
        description="In plain language: what this website collects, why, and how to ask us to delete it."
      />

      <div className="mx-auto grid max-w-[760px] gap-10 px-6 py-14 sm:py-20">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-[26px] font-bold tracking-[-.025em] sm:text-[30px]">{section.title}</h2>
            <ul className="mt-4 grid list-disc gap-2.5 pl-5 text-[16.5px] leading-[1.6] text-ink/80">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
