import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Faq } from '../components/sections/Faq'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand } from '../data/content'
import { SplitText } from '../components/SplitText'

const socialTools = [
  {
    name: 'Instagram Reels & Stories',
    category: 'Short-Form Video',
    badge: 'High Reach',
    description: 'Creating engaging vertical reels, viral hooks, and story sequences designed for algorithmic amplification.',
  },
  {
    name: 'Meta Ads Manager',
    category: 'Paid Campaigns',
    badge: 'Targeted Leads',
    description: 'Running laser-targeted Instagram and Facebook ad campaigns optimized for lead generation, site visits, and direct sales.',
  },
  {
    name: 'LinkedIn Content & Ads',
    category: 'B2B Growth',
    badge: 'Corporate Authority',
    description: 'Building founder branding, B2B thought leadership posts, lead magnet carousels, and targeted LinkedIn InMail campaigns.',
  },
  {
    name: 'Figma & Adobe Premiere',
    category: 'Creative Design',
    badge: 'Brand Aesthetics',
    description: 'Designing custom branded carousel graphics, motion graphic titles, color-graded video reels, and thumbnail assets.',
  },
  {
    name: 'Social Analytics & Listening',
    category: 'Reporting',
    badge: 'Audience Insights',
    description: 'Tracking reach metrics, engagement rates, click-through rates (CTR), cost-per-lead (CPL), and follower growth trends.',
  },
  {
    name: 'Community & DM Management',
    category: 'Audience Care',
    badge: 'Direct Sales',
    description: 'Active comment moderation, automated direct message (DM) funnel triggers, and community relationship building.',
  },
]

const socialPillars = [
  {
    title: 'Content Strategy & Monthly Calendars',
    icon: 'social',
    description: 'Developing structured monthly content calendars aligned with product launches, seasonal campaigns, and audience interests.',
    points: ['Brand story mapping & visual identity rules', 'Content pillars: Educational, Promotional & Viral', 'Weekly posting schedule & optimal time posting', 'Copywriting with high-converting calls to action'],
  },
  {
    title: 'Short-Form Video Reels & Creatives',
    icon: 'video',
    description: 'Producing eye-catching short videos and custom graphics that grab attention in crowded social feeds.',
    points: ['Scripting, editing & motion graphic captions', 'High-quality graphic carousel design', 'Trending audio selection & hashtag research', 'Brand asset library creation'],
  },
  {
    title: 'Paid Social Advertising Funnels',
    icon: 'target',
    description: 'Turn ad spend into measurable revenue with targeted Meta & LinkedIn campaigns.',
    points: ['Custom lookalike & interest audience targeting', 'Ad creative A/B testing & copy variations', 'Lead form integration & instant notifications', 'Conversion pixel tracking setup'],
  },
  {
    title: 'Community Management & Engagement',
    icon: 'team',
    description: 'Fostering an active, loyal community around your brand through prompt interaction and DM automation.',
    points: ['Active comment moderation & response management', 'Automated DM response triggers for lead capture', 'Brand reputation monitoring & sentiment analysis', 'Influencer outreach & collaboration outreach'],
  },
]

export function SocialMediaMarketing() {
  useDocumentTitle(
    'Social Media Marketing Services — NestHub Solution',
    'Build brand authority, engaging video reels, targeted Meta & LinkedIn ad campaigns, and community growth with NestHub Solution.',
    '/services/social-media-marketing',
  )

  return (
    <main id="top" className="relative z-[1] pb-16 pt-32 sm:pt-36">
      <section className="mx-auto max-w-[1320px] px-6">
        <Reveal className="max-w-[840px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[.08em] text-amber-600">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Social & Brand Growth
          </div>

          <h1 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-[-.035em] text-ink sm:text-[48px] lg:text-[56px] text-balance">
            Strategic Social Media Marketing & Paid Campaigns
          </h1>

          <p className="mt-5 text-[17.5px] leading-[1.65] text-muted sm:text-[19px] text-pretty">
            Social media is where your audience lives. We craft strategic visual content, engaging short-form video reels, high-converting paid ad funnels, and community engagement campaigns that turn casual scrollers into loyal customers.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-amber-600 sm:text-[28px]">10x</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Social Reach</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-amber-600 sm:text-[28px]">High ROI</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Meta & LinkedIn Ads</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-amber-600 sm:text-[28px]">Daily</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Community Care</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-amber-600 sm:text-[28px]">HD</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Reels & Graphics</span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2, backgroundColor: '#D97706' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-amber-600 px-7 text-[15.5px] font-semibold text-white shadow-[0_10px_30px_rgba(217,119,6,.28)] transition-all"
            >
              Grow Your Social Brand
            </motion.a>
            <a
              href={brand.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-6 text-[15px] font-semibold text-ink transition-all hover:border-ink"
            >
              <Icon name="clock" color="#475569" size={17} />
              Book Social Strategy Call
            </a>
          </div>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-28">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-amber-600">Social Pillars</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            What We Do for Your Social Presence
          </SplitText>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {socialPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05}>
              <div className="group flex h-full flex-col rounded-[28px] border border-line bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_16px_40px_rgba(217,119,6,.12)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-600">
                    <Icon name={pillar.icon} color="#D97706" size={22} />
                  </span>
                  <h3 className="text-[20px] font-bold tracking-[-.02em] text-ink">{pillar.title}</h3>
                </div>

                <p className="mt-4 text-[14.5px] leading-[1.6] text-muted">{pillar.description}</p>

                <ul className="mt-5 grid gap-2 pt-4 border-t border-line/60">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[13.5px] font-medium text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tech / Platforms */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-32">
        <div className="rounded-[36px] border border-line bg-gradient-to-b from-white to-surface p-8 shadow-[0_10px_50px_rgba(0,0,0,.04)] sm:p-12">
          <Reveal className="max-w-[760px]">
            <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-amber-600">Platforms & Tools</span>
            <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[40px]">
              Platforms & Creative Tools We Use
            </SplitText>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {socialTools.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white p-6 transition-all duration-300 hover:border-amber-400 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-[.08em] text-amber-600">{tech.category}</span>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
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
          <div className="rounded-[32px] border border-amber-500/20 bg-gradient-to-b from-amber-50/70 to-white p-8 text-center shadow-[0_12px_45px_rgba(217,119,6,.1)] sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-md">
              <Icon name="social" color="#ffffff" size={24} />
            </span>
            <SplitText className="mt-6 text-[26px] font-bold leading-[1.15] tracking-[-.03em] text-ink sm:text-[34px]">
              Elevate Your Social Media Presence Today
            </SplitText>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted">
              Get a tailored social media content plan and paid campaign strategy for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="/#contact"
                whileHover={{ y: -2, backgroundColor: '#D97706' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-13 items-center justify-center rounded-2xl bg-amber-600 px-8 text-[15.5px] font-semibold text-white shadow-[0_10px_30px_rgba(217,119,6,.28)]"
              >
                Start Social Marketing
              </motion.a>
            </div>
          </div>
        </Reveal>
      </section>

      <Faq />
    </main>
  )
}
