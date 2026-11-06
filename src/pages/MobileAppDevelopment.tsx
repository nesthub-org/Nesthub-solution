import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { servicePageSchema } from '../lib/schema'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Faq } from '../components/sections/Faq'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand } from '../data/content'
import { SplitText } from '../components/SplitText'

const mobileTechStack = [
  {
    name: 'React Native & Expo',
    category: 'Cross-Platform Framework',
    badge: 'iOS & Android',
    description: 'Build native iOS and Android applications with single-codebase efficiency, shared business logic, and native rendering speeds.',
  },
  {
    name: 'TypeScript',
    category: 'Application Logic',
    badge: 'Strict Types',
    description: 'End-to-end type checking across navigation props, global Redux/Zustand state, and backend API responses.',
  },
  {
    name: 'Native Swift / Kotlin Modules',
    category: 'Platform Hardware',
    badge: 'Hardware Access',
    description: 'Bespoke native bridge code for Bluetooth hardware, camera/sensors, background location tracking, and biometric security.',
  },
  {
    name: 'Firebase & Push Notifications',
    category: 'Real-Time Services',
    badge: 'Push Messaging',
    description: 'Instant FCM/APNs push notifications, cloud messaging, crashlytics monitoring, and real-time remote configuration.',
  },
  {
    name: 'SQLite & Async Storage',
    category: 'Local Database',
    badge: 'Offline Sync',
    description: 'Encrypted local mobile database storing offline user sessions, cached assets, and offline transactional queues.',
  },
  {
    name: 'TestFlight & Play Console',
    category: 'Store Deployment',
    badge: 'App Stores',
    description: 'Automated CI/CD release pipelines managing beta testing builds, versioning, metadata compliance, and store submissions.',
  },
]

const mobilePillars = [
  {
    title: 'Cross-Platform Engineering',
    icon: 'mobile',
    description: 'Ship simultaneously to Apple App Store and Google Play Store using React Native, reducing launch timelines by 50% while maintaining native performance.',
    points: ['Single reusable TypeScript codebase', 'Native UI elements on iOS (UIKit) and Android (Material)', 'Consistent brand experience across mobile screen sizes', 'Fast feature updates via OTA updates'],
  },
  {
    title: 'Offline-First Capabilities',
    icon: 'sync',
    description: 'Ensure your app functions seamlessly in low-connectivity environments. Data syncs automatically once an active connection is restored.',
    points: ['Local SQLite database caching', 'Optimistic UI updates for immediate feedback', 'Background data sync workers', 'Offline queue for pending user actions'],
  },
  {
    title: 'Native Device Hardware Access',
    icon: 'target',
    description: 'Deep hardware integrations using native platform SDKs for maximum responsiveness and security.',
    points: ['Camera, QR scanner & media gallery capture', 'GPS location tracking & Geofencing', 'Biometric authentication (FaceID & Fingerprint)', 'Bluetooth Low Energy (BLE) peripheral sync'],
  },
  {
    title: 'App Store Submission & Compliance',
    icon: 'clipboardCheck',
    description: 'We manage the entire submission process, adhering strictly to Apple HIG and Google Play policy guidelines to guarantee approval.',
    points: ['App Store & Play Store listing optimization', 'Privacy policy & data permission compliance', 'TestFlight & internal beta testing distribution', 'Over-The-Air (OTA) bug fixes with Expo EAS'],
  },
]

export function MobileAppDevelopment() {
  useDocumentTitle(
    'Mobile App Development (Android & iOS) — NestHub Solution',
    'Build fast, native-feeling mobile applications for iOS and Android using React Native, TypeScript, and modern mobile architectures with NestHub Solution.',
    '/services/mobile-app-development',
  )

  return (
    <main id="top" className="relative z-[1]">
      <JsonLd data={servicePageSchema('/services/mobile-app-development', 'Mobile App Development (Android & iOS) — NestHub Solution', 'Build fast, native-feeling mobile applications for iOS and Android using React Native, TypeScript, and modern mobile architectures with NestHub Solution.')} />
      <section className="blueprint text-white">
        <div className="mx-auto max-w-[1320px] px-4 pb-14 pt-[100px] sm:px-6 sm:pb-20 sm:pt-[132px]">
        <div className="max-w-[880px]">
          <div className="sheet-label flex items-center gap-2 text-white/90">
            <span className="h-2 w-2 rounded-full bg-marker animate-pulse" />
            iOS & Android Mobile Engineering
          </div>

          <h1 className="mt-5 text-[36px] font-bold leading-[1.06] tracking-[-.035em] text-white sm:text-[52px] lg:text-[64px] text-balance">
            Native & Cross-Platform <span className="marker">Mobile App</span> Development
          </h1>

          <p className="mt-5 text-[17.5px] leading-[1.65] text-white/85 sm:text-[19px] text-pretty">
            Mobile applications put your business directly into the hands of your customers. We design and engineer mobile apps for iOS and Android that deliver 60fps performance, instant push engagement, and intuitive user experiences.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">iOS & Android</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Dual Store Release</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">60 FPS</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Fluid Animations</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">Offline</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Data Sync Support</span>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-4 text-center">
              <span className="block text-[24px] font-extrabold text-marker sm:text-[28px]">100%</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-white/85">Store Approval</span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              Build Your Mobile App
            </motion.a>
            <a
              href={brand.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Icon name="clock" color="currentColor" size={17} />
              Book Mobile App Consult
            </a>
          </div>
        </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-28">
        <Reveal className="max-w-[720px]">
          <span className="sheet-label text-blueprint">Mobile Engineering</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            Key Features of Our Mobile App Architecture
          </SplitText>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {mobilePillars.map((pillar, index) => (
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
            <span className="sheet-label text-blueprint">Mobile Stack</span>
            <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[40px]">
              Technologies Used in Mobile App Projects
            </SplitText>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mobileTechStack.map((tech, i) => (
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
              <Icon name="mobile" color="#111111" size={24} />
            </span>
            <SplitText className="mt-6 text-[26px] font-bold leading-[1.15] tracking-[-.03em] text-white sm:text-[38px]">
              Ready to Launch Your Mobile App?
            </SplitText>
            <p className="mt-3 text-[16px] leading-[1.65] text-white/90">
              Get a custom app estimate, architecture plan, and App Store submission roadmap from our team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="/#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Contact Mobile Team
              </motion.a>
            </div>
          </div>
        </Reveal>
      </section>

      <Faq />
    </main>
  )
}
