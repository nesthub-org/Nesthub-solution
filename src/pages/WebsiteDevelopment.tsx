import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Faq } from '../components/sections/Faq'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand, projects } from '../data/content'
import { SplitText } from '../components/SplitText'

// Technologies used in NestHub Solution's web projects
const webTechStack = [
  {
    name: 'React 19',
    category: 'Frontend Framework',
    badge: 'Core UI',
    description: 'Component-driven UI library used to build modular, stateful, and lightning-fast user interfaces with optimal DOM updates.',
    icon: 'dev',
    color: '#61DAFB',
  },
  {
    name: 'Next.js 15',
    category: 'Full-Stack Framework',
    badge: 'SSR / SSG',
    description: 'Empowers hybrid rendering — Server-Side Rendering (SSR) for instant first-contentful paint and Static Site Generation (SSG) for top SEO.',
    icon: 'dev',
    color: '#000000',
  },
  {
    name: 'TypeScript',
    category: 'Programming Language',
    badge: 'Type Safety',
    description: 'Provides compile-time type safety, preventing runtime crashes and ensuring maintainable codebases across enterprise web applications.',
    icon: 'seo',
    color: '#3178C6',
  },
  {
    name: 'Material UI & Modern CSS',
    category: 'Styling & Design System',
    badge: 'Utility CSS',
    description: 'Utility-first styling system coupled with custom CSS design tokens, HSL color palettes, responsive breakpoints, and glassmorphism.',
    icon: 'design',
    color: '#38BDF8',
  },
  {
    name: 'Vite',
    category: 'Build Tool & Bundler',
    badge: 'Lightning Fast',
    description: 'Next-generation build tool delivering sub-second Hot Module Replacement (HMR) during development and optimized production bundles.',
    icon: 'sync',
    color: '#646CFF',
  },
  {
    name: 'Framer Motion & Three.js',
    category: 'Animations & 3D',
    badge: 'Interactive UI',
    description: 'Delivers buttery 60fps micro-animations, scroll-driven entrance reveals, interactive 3D WebGL scenes, and fluid page transitions.',
    icon: 'target',
    color: '#F0047F',
  },
  {
    name: 'Node.js & Express',
    category: 'Backend Architecture',
    badge: 'REST / GraphQL',
    description: 'Asynchronous event-driven server runtime for handling high-concurrency API requests, user authentication, and data processing.',
    icon: 'sync',
    color: '#5FA04E',
  },
  {
    name: 'MongoDB & PostgreSQL',
    category: 'Database Systems',
    badge: 'Data Persistence',
    description: 'NoSQL document stores and relational SQL databases for flexible JSON document handling, indexed schemas, and transactional queries.',
    icon: 'chart',
    color: '#47A248',
  },
  {
    name: 'Vercel / Netlify / AWS',
    category: 'Cloud Deployment',
    badge: 'Global Edge',
    description: 'Automated CI/CD pipelines deploying web applications across global edge networks with instant SSL, CDN caching, and 99.99% uptime.',
    icon: 'rocket',
    color: '#000000',
  },
]

// Core aspects & pillars of website development
const webDevelopmentPillars = [
  {
    title: 'Frontend Engineering',
    icon: 'dev',
    accent: 'sky',
    description: 'Building responsive, pixel-perfect user interfaces that convert visitors into customers. We write clean, semantic HTML5, modern CSS, and modular React components engineered for maximum performance across every device screen.',
    points: ['Responsive layouts for Mobile, Tablet & Desktop', 'Modular component architecture with React/Next.js', 'State management & seamless client side routing', 'Accessibility compliance (WCAG 2.1 & ARIA standards)'],
  },
  {
    title: 'Backend & API Integration',
    icon: 'sync',
    accent: 'violet',
    description: 'Developing resilient server-side applications, secure API endpoints, and database models. We build robust backend logic that seamlessly connects your user interface with databases, payment gateways, and third-party services.',
    points: ['RESTful & GraphQL API development', 'Secure authentication (OAuth, JWT, Session management)', 'Database architecture (MongoDB, PostgreSQL, Redis)', 'Payment gateway integration (Stripe, Razorpay)'],
  },
  {
    title: 'Performance & Core Web Vitals',
    icon: 'rocket',
    accent: 'emerald',
    description: 'Optimizing speed and page loading metrics to ensure sub-second rendering. Fast websites rank higher on Google search and deliver significantly higher conversion rates.',
    points: ['95+ Lighthouse speed score target', 'Asset compression, code splitting & lazy loading', 'Edge CDN caching & image optimization', 'Zero layout shifts (CLS) & quick interaction (INP)'],
  },
  {
    title: 'SEO & Technical Optimization',
    icon: 'seo',
    accent: 'teal',
    description: 'Embedding search engine optimization directly into the code structure from day one. We ensure search engine crawlers index every page accurately with rich snippets and structured data.',
    points: ['Dynamic metadata & Open Graph social tags', 'Structured JSON-LD schema markup', 'Automated sitemap.xml & robots.txt generator', 'Semantic HTML5 heading hierarchy'],
  },
  {
    title: 'UI/UX Design Systems',
    icon: 'design',
    accent: 'orange',
    description: 'Creating cohesive visual language, typography scales, interactive component libraries, and intuitive navigation flows that make your brand stand out.',
    points: ['Figma wireframing to production code', 'Custom color palettes & glassmorphic aesthetics', 'Micro-interactions & hover feedback', 'Consistent design tokens across all views'],
  },
  {
    title: 'Security & Maintenance',
    icon: 'care',
    accent: 'amber',
    description: 'Protecting your web applications from vulnerabilities, ensuring SSL encryption, regular security audits, and continuous uptime monitoring.',
    points: ['SSL/TLS encryption & HTTPS enforcement', 'DDoS mitigation & rate limiting', 'Automated database backups & disaster recovery', 'Continuous maintenance & framework updates'],
  },
]

// Specialized Web Solutions offered
const webSolutions = [
  {
    title: 'Custom Web Applications & SaaS',
    badge: 'Web App',
    body: 'Bespoke web applications, SaaS platforms, internal admin dashboards, and custom client portals engineered with React and Node.js for scalability.',
    icon: 'chart',
    tags: ['SaaS', 'Dashboards', 'React', 'Node.js'],
  },
  {
    title: 'E-Commerce Storefronts',
    badge: 'Online Store',
    body: 'High-converting online stores featuring dynamic product catalogs, seamless shopping carts, checkout systems, order tracking, and payment gateways.',
    icon: 'menu',
    tags: ['E-Commerce', 'Stripe', 'Catalogs', 'Cart'],
  },
  {
    title: 'Corporate & Marketing Websites',
    badge: 'Brand Presence',
    body: 'Stunning brand showcase sites and marketing landing pages engineered to establish authority, generate leads, and capture audience attention.',
    icon: 'target',
    tags: ['Corporate', 'Landing Pages', 'Leads', 'UI/UX'],
  },
  {
    title: 'Headless CMS & Publishing Systems',
    badge: 'Content Platform',
    body: 'Empower your marketing team to create and publish blogs, articles, and landing pages effortlessly through modern Headless CMS integrations.',
    icon: 'clipboardCheck',
    tags: ['CMS', 'Blogs', 'Content Management', 'SEO'],
  },
  {
    title: 'Progressive Web Apps (PWA)',
    badge: 'App Experience',
    body: 'Deliver app-like responsiveness, offline browsing capability, instant loading speeds, and home screen installability without app store friction.',
    icon: 'mobile',
    tags: ['PWA', 'Offline Mode', 'Fast', 'Installable'],
  },
  {
    title: 'AI-Powered Web Solutions',
    badge: 'AI Enabled',
    body: 'Integrate artificial intelligence — smart chatbots, automated content recommendations, semantic search, and lead qualification into your site.',
    icon: 'ai',
    tags: ['AI Chatbots', 'LLM Integration', 'Smart Search', 'Automation'],
  },
]

export function WebsiteDevelopment() {
  useDocumentTitle(
    'Website Development Services — NestHub Solution',
    'Explore NestHub Solution website development services, technologies used (React 19, Next.js 15, TypeScript, Node.js, Tailwind CSS), engineering pillars, and bespoke web solutions.',
    '/services/website-development',
  )

  const webProjects = projects.filter(
    (p) => p.slug === 'vedyara-organic' || p.slug === 'fitlife-sutra' || p.slug === 'thefinegrow' || p.slug === 'agency-os',
  )

  return (
    <main id="top" className="relative z-[1] pb-16 pt-32 sm:pt-36">
      {/* Hero Section */}
      <section className="mx-auto max-w-[1320px] px-6">
        <Reveal className="max-w-[840px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[.08em] text-brand-600">
            <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            Web Engineering & Development
          </div>

          <h1 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-[-.035em] text-ink sm:text-[48px] lg:text-[56px] text-balance">
            Crafting High-Performance Websites & Next-Gen Web Applications
          </h1>

          <p className="mt-5 text-[17.5px] leading-[1.65] text-muted sm:text-[19px] text-pretty">
            Website development is the complete lifecycle process of designing, coding, architecting, and optimizing digital experiences on the web. At NestHub Solution, we combine modern visual aesthetics with enterprise-grade web technologies to build fast, secure, and conversion-focused websites.
          </p>

          {/* Key Metrics / Highlights */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-brand-600 sm:text-[28px]">98/100</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Lighthouse Speed</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-brand-600 sm:text-[28px]">100%</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Mobile Responsive</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-brand-600 sm:text-[28px]">60 FPS</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Micro-Animations</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-brand-600 sm:text-[28px]">SEO</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Ready Architecture</span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-brand-500 px-7 text-[15.5px] font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,.28)] transition-all"
            >
              Start Your Web Project
            </motion.a>
            <a
              href={brand.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-6 text-[15px] font-semibold text-ink transition-all hover:border-ink"
            >
              <Icon name="clock" color="#475569" size={17} />
              Book 30-Min Discovery Call
            </a>
          </div>
        </Reveal>
      </section>

      {/* Section 1: What is Website Development? */}
      <section className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-28">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Overview</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            What is Website Development?
          </SplitText>
          <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
            Website development is far more than putting images and text on a screen. It encompasses the end-to-end engineering discipline of creating, structuring, coding, and maintaining web portals and applications that operate smoothly on any web browser worldwide.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {webDevelopmentPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05}>
              <div className="group relative flex h-full flex-col rounded-[28px] border border-line bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[0_16px_40px_rgba(37,99,235,.12)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-600 transition-transform group-hover:scale-110">
                    <Icon name={pillar.icon} color="#2563EB" size={22} />
                  </span>
                  <h3 className="text-[20px] font-bold tracking-[-.02em] text-ink">{pillar.title}</h3>
                </div>

                <p className="mt-4 text-[14.5px] leading-[1.6] text-muted">{pillar.description}</p>

                <ul className="mt-5 grid gap-2 pt-4 border-t border-line/60">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[13.5px] font-medium text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section 2: Technologies Used in Our Projects */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-32">
        <div className="rounded-[36px] border border-line bg-gradient-to-b from-white to-surface p-8 shadow-[0_10px_50px_rgba(0,0,0,.04)] sm:p-12">
          <Reveal className="max-w-[760px]">
            <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Tech Stack</span>
            <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[40px]">
              Technologies Used in Our Web Projects
            </SplitText>
            <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
              We leverage modern, industry-standard frameworks, programming languages, build tools, and cloud platforms to build web applications that perform seamlessly under heavy traffic.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webTechStack.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white p-6 transition-all duration-300 hover:border-brand-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-[.08em] text-brand-600">{tech.category}</span>
                    <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] font-bold text-muted">
                      {tech.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[21px] font-bold tracking-[-.02em] text-ink">{tech.name}</h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.6] text-muted">{tech.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: All Types of Website Development We Offer */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-32">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Solutions</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            Comprehensive Website Development Solutions
          </SplitText>
          <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
            Whether you need a high-converting landing page, an e-commerce storefront, or a complex web portal, we architect solutions tailored specifically to your business goals.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {webSolutions.map((sol, index) => (
            <Reveal key={sol.title} delay={index * 0.05}>
              <div className="flex h-full flex-col rounded-[28px] border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-400 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-600">
                    <Icon name={sol.icon} color="#2563EB" size={20} />
                  </span>
                  <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700">
                    {sol.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-[20px] font-bold tracking-[-.02em] text-ink">{sol.title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-muted">{sol.body}</p>

                <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-line/60">
                  {sol.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] font-semibold text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section 4: Web Projects Featured */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-32">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Portfolio</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            Websites Built by NestHub Solution
          </SplitText>
          <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
            Explore live production websites engineered for our clients across e-commerce, health & wellness, trading platforms, and SaaS.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {webProjects.map((p) => (
            <Reveal key={p.slug}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[11.5px] font-bold uppercase tracking-[.07em] text-brand-600">{p.category}</span>
                  <h3 className="mt-1.5 text-[18px] font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-[13.5px] leading-[1.55] text-muted">{p.body}</p>
                  <a
                    href={`/case-studies#${p.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand-600 hover:text-brand-700"
                  >
                    View Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="mx-auto max-w-[840px] px-6 pt-20 sm:pt-28">
        <Reveal>
          <div className="rounded-[32px] border border-brand-500/20 bg-gradient-to-b from-brand-50/70 to-white p-8 text-center shadow-[0_12px_45px_rgba(37,99,235,.1)] sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-md">
              <Icon name="rocket" color="#ffffff" size={24} />
            </span>
            <SplitText className="mt-6 text-[26px] font-bold leading-[1.15] tracking-[-.03em] text-ink sm:text-[34px]">
              Ready to Build Your Website with NestHub?
            </SplitText>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted">
              Get in touch with our engineering team for a free quote, scope review, and technical proposal.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="/#contact"
                whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-13 items-center justify-center rounded-2xl bg-brand-500 px-8 text-[15.5px] font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,.28)]"
              >
                Contact Engineers
              </motion.a>
              <a
                href="/case-studies"
                className="inline-flex h-13 items-center justify-center rounded-2xl border border-line bg-white px-7 text-[15px] font-semibold text-ink hover:border-ink"
              >
                Browse All Case Studies
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <Faq />
    </main>
  )
}
