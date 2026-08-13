import logoVedyara from '../assets/logo-vedyara.png'
import logoFitlifeSutra from '../assets/logo-fitlifesutra.png'
import logoTheFineGrow from '../assets/logo-thefinegrow.png'
import logoIllusionmed from '../assets/illusionmed-logo.png'
import projectHoney from '../assets/project-honey.png'
import projectHealth from '../assets/project-health.png'
import projectHealth1 from '../assets/project-health1.png'
import projectTrading from '../assets/project-trading.png'
import projectAgencyOS from '../assets/agencyos.png'
import projectIllusionmed from '../assets/illusionmed-img.png'
import scanitMockup from '../assets/scanit-mockup.png'

export type IconDef = string[]

export const brand = {
  name: 'NestHub Solution',
  location: 'Jaipur, Rajasthan, India',
  founded: '2023',
  email: 'contact@nesthubsolution.in',
  phone: '+91 8188941304',
  calendly: 'https://calendly.com/workquerysol/30min',
}

export const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Portfolio' },
  { href: '/#product', label: 'Product' },
  { href: '/#process', label: 'Process' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
  { href: '/careers', label: 'Careers' },
]

export const productMockup = scanitMockup

export const trustedBy = [
  { name: 'Vedyara Organic', logo: logoVedyara },
  { name: 'Fitlife Sutra', logo: logoFitlifeSutra },
  { name: 'TheFineGrow', logo: logoTheFineGrow },
  { name: 'IllusionMed', logo: logoIllusionmed },
]

export const trustStats = [
  { number: 10, suffix: '+', label: 'Projects delivered' },
  { number: 100, suffix: '%', label: 'Client satisfaction' },
  { number: 2, suffix: '+', label: 'Years experience' },
  { number: 98, suffix: '/100', label: 'Lighthouse score' },
]

export const heroBadge = 'AI-POWERED DEVELOPMENT'

export const heroPanel = {
  aiEnabled: 'AI ENABLED',
  lighthouse: { label: 'LIGHTHOUSE SCORE', value: 98, max: 100 },
  techStack: ['React', 'Node.js', 'AI', 'TypeScript'],
}

export const icons: Record<string, IconDef> = {
  design: [
    'M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5z',
    'M3 9h18',
    'M9 21V9',
  ],
  dev: ['M8 17 3 12l5-5', 'M16 7l5 5-5 5', 'M13.5 4 10.5 20'],
  ai: [
    'M12 3v3',
    'M12 18v3',
    'M4.9 4.9 7 7',
    'M17 17l2.1 2.1',
    'M3 12h3',
    'M18 12h3',
    'M4.9 19.1 7 17',
    'M17 7l2.1-2.1',
  ],
  responsive: ['M4 4h16v11H4z', 'M9 20h6', 'M12 17v3', 'M15 7h3v6h-3z'],
  mobile: ['M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z', 'M11 19h2'],
  speed: ['M13 3 4 14h7l-1 7 9-11h-7z'],
  seo: ['M4 19V9', 'M10 19V5', 'M16 19v-7', 'M22 19H2'],
  care: ['M12 3 4 6.5v5c0 4.6 3.2 8.4 8 9.5 4.8-1.1 8-4.9 8-9.5v-5z', 'M9 12l2 2 4-4'],
  target: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'],
  eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  heart: ['M12 20.5s-7.5-4.6-9.5-9A5.3 5.3 0 0 1 12 6.2 5.3 5.3 0 0 1 21.5 11.5c-2 4.4-9.5 9-9.5 9Z'],
  qr: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h3v3', 'M20 14v3h-3', 'M14 20h3'],
  menu: ['M3 3h4l1 4h13l-2 8H7', 'M7 7h13', 'M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'],
  sync: ['M3 12a9 9 0 0 1 15-6.7L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-15 6.7L3 16', 'M3 21v-5h5'],
  chart: ['M4 19V9', 'M10 19V5', 'M16 19v-12', 'M22 19H2'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3.5 2'],
  video: ['M3 6.5A2.5 2.5 0 0 1 5.5 4h7A2.5 2.5 0 0 1 15 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 3 17.5z', 'M15 9.5 21 6v12l-6-3.5Z'],
  briefcase: ['M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z', 'M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7', 'M3 12h18'],
  mapPin: ['M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z', 'M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  send: ['m3 11 18-8-8 18-2.5-7.5L3 11Z'],
}

export type ServiceAccent = 'violet' | 'sky' | 'orange' | 'emerald' | 'amber' | 'teal'

export interface Service {
  title: string
  body: string
  tags: string[]
  icon: string
  accent: ServiceAccent
  /** Small category label shown above the title in the service card. */
  badge: string
}

export const services: Service[] = [
  {
    title: 'AI Integration',
    body: 'Embed AI-powered capabilities into your product — intelligent chatbots, smart search, recommendation engines, content generation & predictive analytics.',
    tags: ['AI Chatbots', 'Smart Search', 'Recommendations', 'Automation'],
    icon: 'ai',
    accent: 'violet',
    badge: 'Artificial Intelligence',
  },
  {
    title: 'Website Development',
    body: 'Tailored websites and web applications built with cutting-edge technologies.',
    tags: ['React & Node.js', 'API Integration', 'CMS Development'],
    icon: 'dev',
    accent: 'sky',
    badge: 'Web Engineering',
  },
  {
    title: 'UI/UX Design',
    body: 'User-centered design that converts. Intuitive interfaces backed by research.',
    tags: ['Wireframing', 'Prototyping', 'User Testing'],
    icon: 'design',
    accent: 'orange',
    badge: 'Product Design',
  },
  {
    title: 'Mobile App Development',
    body: 'Native and cross-platform apps built for Android and iOS that feel fast and native.',
    tags: ['Android', 'iOS', 'React Native'],
    icon: 'mobile',
    accent: 'emerald',
    badge: 'Mobile Engineering',
  },
  {
    title: 'Performance Optimization',
    body: 'Lightning-fast websites that rank higher and convert better.',
    tags: ['Core Web Vitals', 'Caching Strategy', 'Code Splitting'],
    icon: 'speed',
    accent: 'amber',
    badge: 'Web Performance',
  },
  {
    title: 'SEO & Digital Marketing',
    body: 'Data-driven strategies to improve your online visibility.',
    tags: ['Technical SEO', 'Content Strategy', 'Analytics Setup'],
    icon: 'seo',
    accent: 'teal',
    badge: 'Growth & Marketing',
  },
]

export interface Project {
  slug: string
  title: string
  body: string
  category: string
  tags: string[]
  href: string
  image: string
  /** Extra screenshots shown in the case-study gallery, alongside `image`. */
  gallery?: string[]
  /** Short, tag-grounded capability bullets shown on the case-study detail page. */
  highlights: string[]
  logo?: string
  icon?: string
  /** Reuses the Services accent palette to give each case study its own color identity. */
  accent: ServiceAccent
}

export const projects: Project[] = [
  {
    slug: 'agency-os',
    title: 'Agency OS',
    body: 'An in-house agency management suite — lead pipeline, client & project tracking, invoicing and revenue analytics in one dashboard.',
    category: 'SaaS Dashboard',
    tags: ['Dashboard', 'CRM', 'Analytics', 'SaaS'],
    highlights: [
      'Visual lead pipeline for tracking prospects from first contact to signed brief',
      'Per-client and per-project tracking with task status and ownership',
      'Invoicing built in, with revenue analytics rolled up on one dashboard',
    ],
    href: 'https://agencyos.nestsphere.in',
    image: projectAgencyOS,
    icon: 'chart',
    accent: 'sky',
  },
  {
    slug: 'vedyara-organic',
    title: 'Vedyara Organic',
    body: 'A warm, inviting e-commerce platform for an artisanal honey brand with product catalog, cart system, secure checkout, and a blog.',
    category: 'E-Commerce',
    tags: ['E-Commerce', 'Stripe', 'Product Catalog', 'Blog'],
    highlights: [
      'Full product catalog with a cart and secure Stripe checkout',
      'Warm, brand-led visual design suited to an artisanal food product',
      'Built-in blog for storytelling and content marketing',
    ],
    href: 'https://vedyara.in',
    image: projectHoney,
    logo: logoVedyara,
    accent: 'amber',
  },
  {
    slug: 'fitlife-sutra',
    title: 'Fitlife Sutra',
    body: 'A comprehensive digital platform for Vitality Management, showcasing their Herbalife nutrition programs and facilitating community engagement through an intuitive, modern interface.',
    category: 'Health & Wellness',
    tags: ['Health', 'Wellness', 'Responsive', 'UI/UX'],
    highlights: [
      'Herbalife nutrition programs presented with a clean, conversion-focused layout',
      'Fully responsive across devices, from phone to desktop',
      'Community engagement features woven into an intuitive, modern interface',
    ],
    href: 'https://fitlifesutra.in',
    image: projectHealth,
    gallery: [projectHealth1],
    logo: logoFitlifeSutra,
    accent: 'emerald',
  },
  {
    slug: 'thefinegrow',
    title: 'TheFineGrow',
    body: 'An educational trading platform combining real-time market data visualization with structured learning modules, interactive charts, and community discussions.',
    category: 'Trading Platform',
    tags: ['Real-time Data', 'Charts', 'LMS', 'WebSockets'],
    highlights: [
      'Live market data streamed over WebSockets and visualized in interactive charts',
      'Structured learning modules for teaching trading fundamentals',
      'Community discussion space built alongside the learning content',
    ],
    href: 'https://thefinegrow.com',
    image: projectTrading,
    logo: logoTheFineGrow,
    accent: 'violet',
  },
  {
    slug: 'illusionmed',
    title: 'IllusionMed',
    body: 'IllusionMed helps pharmaceutical companies communicate approved product information through high-impact brand strategy, visual aids, LBLs, and bespoke digital experiences.',
    category: 'Pharma Brand & Digital Marketing',
    tags: ['Brand Strategy', 'Visual Aids & LBLs', 'Digital Creatives', 'Web Development'],
    highlights: [
      'Brand strategy and positioning, from messaging maps to launch planning',
      'Print-ready visual aids and LBLs designed for doctor-detailing',
      'Regulatory-aware creative process built around medical and compliance review',
    ],
    href: 'https://illusionmed.nestsphere.in',
    image: projectIllusionmed,
    logo: logoIllusionmed,
    accent: 'teal',
  },
]

export interface QrFeature {
  n: string
  icon: string
  title: string
  body: string
}

export const qrFeatures: QrFeature[] = [
  { n: '01', icon: 'qr', title: 'Scan to Order', body: 'Customers scan a table QR code — no app download, no login. Instant digital menu from any phone.' },
  { n: '02', icon: 'menu', title: 'Live Menu Management', body: 'Update prices, add dishes, or mark items sold-out in real time from a single dashboard.' },
  { n: '03', icon: 'sync', title: 'Real-Time Order Flow', body: 'Orders appear on the kitchen display instantly. Staff notified; customers track status live.' },
  { n: '04', icon: 'chart', title: 'Revenue Analytics', body: 'Track bestsellers, peak hours, and revenue trends from a clean, role-based analytics panel.' },
]

export interface Testimonial {
  quote: string
  name: string
  initials: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Our honey brand needed an online presence that matched the quality of our product. NestHub delivered beyond expectations — the site is gorgeous and our online sales have tripled.',
    name: 'Mr. Avinash Maurya',
    initials: 'AM',
    role: 'Manager, Vedyara Agro Foods',
    company: 'E-Commerce Platform',
  },
  {
    quote: 'Building a trading education platform is complex, but the NestHub team handled it with precision. Real-time charts, course modules, community features — everything works flawlessly.',
    name: 'Mr. Amit Mishra',
    initials: 'AM',
    role: 'CEO, TheFineGrow',
    company: 'Trading Platform',
  },
  {
    quote: 'NestHub helped us create a stronger online presence with a clean, user-friendly design. The website made it easier for us to connect with our community and showcase our Herbalife nutrition programs in a simple, professional, and engaging manner.',
    name: 'Mr. Mahtab Alam',
    initials: 'MA',
    role: 'Health & Wellness',
    company: 'Fitlifesutra',
  },
]

export const stack = [
  { name: 'React 19', mark: 'Re' },
  { name: 'Next.js 15', mark: 'N' },
  { name: 'TypeScript', mark: 'TS' },
  { name: 'Node.js', mark: 'Nd' },
  { name: 'MongoDB', mark: 'M' },
  { name: 'SQL', mark: 'SQ' },
  { name: 'Postgres', mark: 'PG' },
  { name: 'Tailwind', mark: 'Tw' },
  { name: 'AI / LLM', mark: 'AI' },
  { name: 'Agentic Ai', mark: 'Ag' },
  { name: 'SEO', mark: 'SE' },
]

export interface Step {
  n: string
  title: string
  body: string
}

export const steps: Step[] = [
  { n: '01', title: 'Discovery', body: 'Stakeholder interviews, analytics audit and a written brief we both sign off on.' },
  { n: '02', title: 'Design', body: 'Wireframes to high-fidelity system in Figma, reviewed live rather than by email.' },
  { n: '03', title: 'Development', body: 'Component-driven build with preview deploys on every pull request.' },
  { n: '04', title: 'Testing', body: 'Cross-device QA, accessibility audit and Core Web Vitals budgets enforced in CI.' },
  { n: '05', title: 'Launch', body: 'Zero-downtime migration, redirects mapped, analytics and monitoring verified.' },
  { n: '06', title: 'Support', body: 'A named engineer, monthly performance reporting and a roadmap that keeps moving.' },
]

export const needs = ['New website', 'Redesign', 'AI integration', 'Ongoing partner']

export const aboutIntro =
  "Founded in 2023, NestHub Solution is Jaipur's top-rated web development and freelancing agency. Our team of designers, developers, and strategists serves businesses across Jaipur, Delhi, Mumbai, Bangalore, and all of India — delivering websites and digital products that drive real results."

export const values = [
  { title: 'Innovation First', body: 'We stay ahead of the curve, leveraging the latest technologies.', icon: 'target' },
  { title: 'Transparency', body: "Open communication and honest timelines. You're always in the loop.", icon: 'eye' },
  { title: 'Client-Centric', body: 'Your success is our success. Every decision aligns with your goals.', icon: 'heart' },
]

export interface TeamMember {
  name: string
  initials: string
  role: string
  /** Path under /public, e.g. '/team/apoorv.jpg'. Falls back to the initials mark when absent or broken. */
  img?: string
  /** CSS object-position for the crop — useful for full-body shots where the face sits high. */
  imgPosition?: string
}

export const team: TeamMember[] = [
  { name: 'Mr. Apoorv Arya', initials: 'AA', role: 'Founder and CEO', img: '/team/apoorv.jpg' },
  { name: 'Miss. Roli Nagar', initials: 'JN', role: 'Head of HR & BDE', img: '/team/juhi.jpg', imgPosition: '50% 25%' },
  { name: 'Mr. Yogendra Maurya', initials: 'YM', role: 'CFO', img: '/team/yogendra.jpg', imgPosition: '50% 30%' },
  { name: 'Mr. Naveen Soni', initials: 'NS', role: 'Full Stack Developer', img: '/team/naveen-img.jpeg', imgPosition: '50% 25%' },

]

export const footerLinks = {
  quick: [
    { href: '/#top', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#work', label: 'Portfolio' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
  ],
  services: [
    { href: '/#services', label: 'AI Integration' },
    { href: '/#services', label: 'Website Development' },
    { href: '/#services', label: 'UI/UX Design' },
    { href: '/#services', label: 'SEO & Digital Marketing' },
  ],
}

export interface Job {
  id: 'react-native' | 'bde' | 'mern-intern'
  title: string
  type: string
  location: string
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

export const jobs: Job[] = [
  {
    id: 'react-native',
    title: 'React Native Developer',
    type: 'Full-time',
    location: 'Jaipur, Rajasthan (On-site / Hybrid)',
    experience: '1–3 years experience',
    description:
      'Build and ship native mobile apps for Android and iOS using React Native — from architecture through to App Store and Play Store release.',
    responsibilities: [
      'Build and maintain cross-platform mobile apps in React Native for Android and iOS',
      'Integrate REST/GraphQL APIs, push notifications and third-party SDKs',
      'Optimize app performance, memory usage and load times across devices',
      'Handle App Store and Google Play releases, versioning and store listings',
      'Collaborate with designers and backend engineers to ship pixel-accurate, production-ready features',
    ],
    requirements: [
      'Solid hands-on experience with React Native, JavaScript and TypeScript',
      'Familiarity with native build tooling (Xcode, Android Studio)',
      'Experience integrating REST APIs and third-party libraries',
      'Understanding of mobile UI/UX and platform guidelines (HIG / Material)',
      'Published apps on the App Store or Play Store are a strong plus',
    ],
  },
  {
    id: 'bde',
    title: 'Business Development Executive',
    type: 'Full-time',
    location: 'Jaipur, Rajasthan (On-site / Hybrid)',
    experience: '0–2 years experience',
    description:
      'Drive new client relationships for our web, mobile app and AI integration services — from first outreach through to a signed project brief.',
    responsibilities: [
      'Identify and reach out to prospective clients across India',
      'Run discovery calls and qualify project requirements',
      'Prepare proposals and pricing in collaboration with the delivery team',
      'Maintain and grow relationships with existing clients',
    ],
    requirements: [
      'Strong written and verbal communication in English and Hindi',
      'Comfortable on client calls and following up independently',
      'Interest in web development, mobile apps, AI and digital products',
      'Prior sales or business development experience is a plus, not required',
    ],
  },
  {
    id: 'mern-intern',
    title: 'MERN Stack Intern',
    type: 'Internship · 3–6 months',
    location: 'Remote or Jaipur',
    experience: 'MongoDB, Express, React, Node.js',
    description:
      'Work directly with our engineering team on real client projects — production MERN-stack code, not busywork.',
    responsibilities: [
      'Build and ship features on live client projects under senior review',
      'Work across the stack with MongoDB, Express, React and Node.js',
      'Write clean, tested API endpoints and wire them up to the frontend',
      'Participate in code review and pull request workflows',
    ],
    requirements: [
      'Working knowledge of MongoDB, Express, React and Node.js',
      'Comfortable with Git and collaborative workflows',
      'A GitHub profile or portfolio showing prior projects',
      'Available for 3–6 months, remote or Jaipur-based',
      'Currently studying or recently graduated in CS or a related field',
    ],
  },
]
