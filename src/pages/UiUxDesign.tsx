import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { servicePageSchema } from '../lib/schema'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Faq } from '../components/sections/Faq'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand } from '../data/content'
import { SplitText } from '../components/SplitText'

const designTools = [
  {
    name: 'Figma & FigJam',
    category: 'Design & Prototyping',
    badge: 'Industry Standard',
    description: 'Collaborative vector design, wireframing, high-fidelity UI design systems, auto-layout components, and clickable prototypes.',
  },
  {
    name: 'Design Systems & Tokens',
    category: 'Visual System',
    badge: 'Reusable Components',
    description: 'Building cohesive color variables, typography scales, spacing tokens, button variants, and dark mode themes.',
  },
  {
    name: 'Interactive Prototyping',
    category: 'User Flow',
    badge: 'Clickable Demos',
    description: 'Connecting screens with smart-animate transitions, modal triggers, micro-interactions, and realistic state transitions.',
  },
  {
    name: 'User Research & Personas',
    category: 'UX Strategy',
    badge: 'Data Driven',
    description: 'Conducting user interviews, journey mapping, empathy maps, competitive benchmarking, and information architecture hierarchy.',
  },
  {
    name: 'Usability Testing & Feedback',
    category: 'UX Validation',
    badge: 'Iterative Design',
    description: 'Running user testing sessions, heatmaps, drop-off analysis, and click-tracking to optimize conversion funnels.',
  },
  {
    name: 'Developer Handoff Specs',
    category: 'Engineering Sync',
    badge: 'Pixel Perfect',
    description: 'Providing clean design specs, inspectable CSS values, exported SVG icons, and responsive breakpoint rules for engineers.',
  },
]

const designPillars = [
  {
    title: 'User Research & Journey Mapping',
    icon: 'search',
    description: 'Understanding your end users, their pain points, and their key tasks to design intuitive flows that eliminate friction.',
    points: ['User persona creation & empathy mapping', 'User flow & information architecture (IA) planning', 'Competitive UI/UX audit benchmarking', 'Problem framing & feature prioritization'],
  },
  {
    title: 'Wireframing & High-Fidelity UI',
    icon: 'design',
    description: 'Transforming napkin sketches into sleek, modern, high-fidelity visual interfaces designed to wow users.',
    points: ['Low-fidelity wireframes for layout validation', 'High-fidelity screens with modern glassmorphic aesthetics', 'Responsive UI for desktop, tablet & mobile', 'Light & dark theme variations'],
  },
  {
    title: 'Design Systems & Component Libraries',
    icon: 'target',
    description: 'Creating scalable design systems that ensure brand consistency across all digital touchpoints and speed up development.',
    points: ['Typography scales & harmonious color palettes', 'Reusable UI components (Buttons, Cards, Inputs, Modals)', 'Micro-interaction states (Hover, Active, Disabled)', 'Design token export for React/Tailwind'],
  },
  {
    title: 'Clickable Prototypes & Usability Testing',
    icon: 'eye',
    description: 'Test your product before writing a single line of code with realistic, clickable prototypes.',
    points: ['Interactive Figma prototypes with smart animations', 'User usability testing sessions & feedback loops', 'Conversion rate optimization (CRO) improvements', 'Seamless developer handoff documentation'],
  },
]

export function UiUxDesign() {
  useDocumentTitle(
    'UI/UX Design Services — NestHub Solution',
    'Transform ideas into beautiful, intuitive, and high-converting user interfaces with Figma wireframing, design systems, and clickable prototypes from NestHub Solution.',
    '/services/ui-ux-design',
  )

  return (
    <main id="top" className="relative z-[1]">
      <JsonLd data={servicePageSchema('/services/ui-ux-design', 'UI/UX Design Services — NestHub Solution', 'Transform ideas into beautiful, intuitive, and high-converting user interfaces with Figma wireframing, design systems, and clickable prototypes from NestHub Solution.')} />
      <section className="blueprint text-white">
        <div className="mx-auto max-w-[1320px] px-4 pb-14 pt-[100px] sm:px-6 sm:pb-20 sm:pt-[132px]">
        <div className="max-w-[880px]">
          <div className="sheet-label flex items-center gap-2 text-white/90">
            <span className="h-2 w-2 rounded-full bg-marker animate-pulse" />
            Product Design & UI/UX
          </div>

          <h1 className="mt-5 text-[36px] font-bold leading-[1.06] tracking-[-.035em] text-white sm:text-[52px] lg:text-[64px] text-balance">
            User-Centered <span className="marker">UI/UX</span> Product Design Services
          </h1>

          <p className="mt-5 text-[17.5px] leading-[1.65] text-white/85 sm:text-[19px] text-pretty">
            Design is not just how it looks — it's how it works. At NestHub Solution, we design intuitive, elegant, and high-converting digital products. From wireframing and user research to full design systems and interactive Figma prototypes, we bring your vision to life.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">100%</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Figma Prototypes</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">Design</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">System Ready</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">Mobile & Desktop</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Responsive Views</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">Dev</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Seamless Handoff</span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              Start Product Design
            </motion.a>
            <a
              href={brand.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Icon name="clock" color="currentColor" size={17} />
              Book UI/UX Consultation
            </a>
          </div>
        </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-28">
        <Reveal className="max-w-[720px]">
          <span className="sheet-label text-blueprint">Design Pillars</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            Our End-to-End Product Design Process
          </SplitText>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {designPillars.map((pillar, index) => (
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

      {/* Tools */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-32">
        <div className="rounded-[36px] border border-line bg-gradient-to-b from-white to-surface p-8 shadow-[0_10px_50px_rgba(0,0,0,.04)] sm:p-12">
          <Reveal className="max-w-[760px]">
            <span className="sheet-label text-blueprint">Design System</span>
            <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[40px]">
              Design Deliverables & Methodology
            </SplitText>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designTools.map((tech, i) => (
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
              <Icon name="design" color="#111111" size={24} />
            </span>
            <SplitText className="mt-6 text-[26px] font-bold leading-[1.15] tracking-[-.03em] text-white sm:text-[38px]">
              Ready to Design Your Next Digital Product?
            </SplitText>
            <p className="mt-3 text-[16px] leading-[1.65] text-white/90">
              Get in touch with our UI/UX design team to review your wireframes, product specs, or redesign brief.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="/#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Contact UI/UX Designers
              </motion.a>
            </div>
          </div>
        </Reveal>
      </section>

      <Faq />
    </main>
  )
}
