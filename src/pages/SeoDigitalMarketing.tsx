import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { servicePageSchema } from '../lib/schema'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Faq } from '../components/sections/Faq'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand } from '../data/content'
import { SplitText } from '../components/SplitText'

const seoTechStack = [
  {
    name: 'Google Analytics 4 & Tag Manager',
    category: 'Analytics & Tracking',
    badge: 'Conversion Funnels',
    description: 'Setting up custom event tracking, conversion goals, e-commerce revenue tracking, and audience attribution models.',
  },
  {
    name: 'Google Search Console & Indexing',
    category: 'Technical SEO',
    badge: 'Search Visibility',
    description: 'Monitoring Google index coverage, sitemap health, crawl errors, search query rankings, and Core Web Vitals performance.',
  },
  {
    name: 'Ahrefs & SEMrush',
    category: 'Keyword Research',
    badge: 'Competitive Analysis',
    description: 'In-depth keyword gap analysis, backlink audit profiling, competitor strategy benchmarking, and organic rank tracking.',
  },
  {
    name: 'Google Ads & Meta Ads Manager',
    category: 'Paid Advertising',
    badge: 'High ROI PPC',
    description: 'Structuring hyper-targeted search ads, display remarketing, Meta custom audiences, and conversion-optimized ad campaigns.',
  },
  {
    name: 'Schema.org & Structured Data',
    category: 'Semantic SEO',
    badge: 'Rich Snippets',
    description: 'Implementing JSON-LD schema markup for products, FAQs, local business profiles, organization metadata, and review stars.',
  },
  {
    name: 'Screaming Frog & Lighthouse',
    category: 'Site Audit Tools',
    badge: 'Technical Audit',
    description: 'Comprehensive crawl audits uncovering broken links, duplicate content, missing meta tags, redirect chains, and page speed bottlenecks.',
  },
]

const seoPillars = [
  {
    title: 'Technical SEO & Speed Audits',
    icon: 'seo',
    description: 'Fixing foundational technical obstacles that prevent search engine bots from crawling, indexing, and ranking your website pages.',
    points: ['Core Web Vitals & page load speed optimization', 'XML sitemaps, robots.txt & canonical tags', 'Structured data JSON-LD schema implementation', 'Mobile usability & HTTPS security verification'],
  },
  {
    title: 'On-Page & Content Strategy',
    icon: 'chat',
    description: 'Crafting search-intent aligned content targeting high-value keywords that your prospective customers search for every day.',
    points: ['Title tag, meta description & H1-H3 optimization', 'Keyword mapping & search intent alignment', 'Internal linking structure architecture', 'High-authority blog & article strategy'],
  },
  {
    title: 'PPC & Search Engine Advertising',
    icon: 'target',
    description: 'Drive instant qualified traffic and leads through optimized Google Search Ads, Display Network, and Meta ad campaigns.',
    points: ['Keyword bidding & negative keyword optimization', 'High-converting ad copy & landing page design', 'A/B split testing of ad creatives', 'Retargeting campaigns for warm visitors'],
  },
  {
    title: 'Local SEO & Google Business Profile',
    icon: 'mapPin',
    description: 'Dominate local Google Map pack searches for buyers searching for your services in your specific city or region.',
    points: ['Google Business Profile setup & optimization', 'Local citation building & NAP consistency', 'Customer review generation strategy', 'Geo-targeted landing page creation'],
  },
]

export function SeoDigitalMarketing() {
  useDocumentTitle(
    'SEO & Digital Marketing Services — NestHub Solution',
    'Drive organic Google rankings, technical SEO audits, high-ROI Google & Meta ads campaigns, and conversion optimization with NestHub Solution.',
    '/services/seo-digital-marketing',
  )

  return (
    <main id="top" className="relative z-[1]">
      <JsonLd data={servicePageSchema('/services/seo-digital-marketing', 'SEO & Digital Marketing Services — NestHub Solution', 'Drive organic Google rankings, technical SEO audits, high-ROI Google & Meta ads campaigns, and conversion optimization with NestHub Solution.')} />
      <section className="blueprint text-white">
        <div className="mx-auto max-w-[1320px] px-4 pb-14 pt-[100px] sm:px-6 sm:pb-20 sm:pt-[132px]">
        <div className="max-w-[880px]">
          <div className="sheet-label flex items-center gap-2 text-white/90">
            <span className="h-2 w-2 rounded-full bg-marker animate-pulse" />
            Search Dominance & Growth
          </div>

          <h1 className="mt-5 text-[36px] font-bold leading-[1.06] tracking-[-.035em] text-white sm:text-[52px] lg:text-[64px] text-balance">
            Data-Driven <span className="marker">SEO</span> & Digital Marketing Services
          </h1>

          <p className="mt-5 text-[17.5px] leading-[1.65] text-white/85 sm:text-[19px] text-pretty">
            Great websites deserve to be found. Our data-driven SEO and digital marketing services ensure your brand dominates search engine results, attracts qualified organic leads, and achieves measurable ROI on every marketing rupee spent.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">#1 Rank</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Google Focus</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">3x - 5x</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Organic Growth</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">100%</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Transparent Reporting</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">High ROI</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Paid Ad Funnels</span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              Get Free SEO Audit
            </motion.a>
            <a
              href={brand.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Icon name="clock" color="currentColor" size={17} />
              Book Marketing Discovery
            </a>
          </div>
        </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-28">
        <Reveal className="max-w-[720px]">
          <span className="sheet-label text-blueprint">Growth Services</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            Comprehensive SEO & Marketing Solutions
          </SplitText>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {seoPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05}>
              <div data-glow className="group flex h-full flex-col rounded-[28px] border border-line bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:border-blueprint hover:shadow-[0_16px_40px_rgba(19,55,207,.12)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-blueprint">
                    <Icon name={pillar.icon} color="#1337CF" size={22} />
                  </span>
                  <h3 className="text-[20px] font-bold tracking-[-.02em] text-ink">{pillar.title}</h3>
                </div>

                <p className="mt-4 text-[14.5px] leading-[1.6] text-muted">{pillar.description}</p>

                <ul className="mt-5 grid gap-2 pt-4 border-t border-line/60">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[13.5px] font-medium text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blueprint" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-32">
        <div className="rounded-[36px] border border-line bg-gradient-to-b from-white to-surface p-8 shadow-[0_10px_50px_rgba(0,0,0,.04)] sm:p-12">
          <Reveal className="max-w-[760px]">
            <span className="sheet-label text-blueprint">Marketing Toolkit</span>
            <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[40px]">
              Tools & Platforms We Utilize
            </SplitText>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {seoTechStack.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white p-6 transition-all duration-300 hover:border-blueprint hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-[.08em] text-blueprint">{tech.category}</span>
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-blueprint">
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[20px] font-bold tracking-[-.02em] text-ink">{tech.name}</h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.6] text-muted">{tech.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="mx-auto max-w-[840px] px-6 pt-20 sm:pt-28">
        <Reveal>
          <div className="blueprint overflow-hidden rounded-[28px] px-6 py-12 text-center text-white sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-marker text-ink">
              <Icon name="seo" color="#111111" size={24} />
            </span>
            <SplitText className="mt-6 text-[26px] font-bold leading-[1.15] tracking-[-.03em] text-white sm:text-[38px]">
              Ready to Grow Your Organic Traffic?
            </SplitText>
            <p className="mt-3 text-[16px] leading-[1.65] text-white/90">
              Request a comprehensive technical SEO & keyword analysis for your website today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="/#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Request Free Audit
              </motion.a>
            </div>
          </div>
        </Reveal>
      </section>

      <Faq />
    </main>
  )
}
