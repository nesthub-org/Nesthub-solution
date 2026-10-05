import { motion } from 'framer-motion'
import { JsonLd } from '../components/JsonLd'
import { servicePageSchema } from '../lib/schema'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { Faq } from '../components/sections/Faq'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { brand } from '../data/content'
import { SplitText } from '../components/SplitText'

const aiTechStack = [
  {
    name: 'OpenAI GPT-4o & Claude 3.5',
    category: 'Large Language Models',
    badge: 'Generative AI',
    description: 'Empowering applications with advanced reasoning, automated lead drafting, code intelligence, and human-like natural conversations.',
  },
  {
    name: 'LangChain & LlamaIndex',
    category: 'AI Orchestration',
    badge: 'Agent Pipelines',
    description: 'Chaining LLMs with external tools, APIs, CRM databases, and memory buffers to build autonomous agentic email and outreach workflows.',
  },
  {
    name: 'Pinecone / Qdrant Vector DBs',
    category: 'Vector Embeddings',
    badge: 'Semantic Search',
    description: 'Storing semantic embeddings to perform sub-millisecond similarity search across enterprise knowledge bases and proprietary documentation.',
  },
]

const aiPillars = [
  {
    title: 'AI-Powered Lead Generation Software',
    icon: 'target',
    description: 'Automate prospect discovery, lead qualification, personalized outreach, and lead scoring with custom AI agents and LLM data enrichment pipelines.',
    points: ['Automated ICP target prospect identification', 'AI email & message personalization at scale', 'Real-time lead intent scoring & qualification', 'CRM integration (HubSpot, Salesforce, Agency OS)'],
  },
  {
    title: 'AI-Powered Email Agents & Outreach',
    icon: 'send',
    description: 'Deploy autonomous AI email agents that triage inboxes, classify lead intent, draft contextual replies, execute cold email sequences, and trigger CRM updates 24/7.',
    points: ['Autonomous inbox triaging & intent classification', 'Contextual auto-drafting & personalized replies', 'Automated email drip sequences & follow-ups', 'Seamless Gmail, Outlook & CRM synchronization'],
  },
  {
    title: 'LinkedIn Search Prompts & Claude Artifacts',
    icon: 'search',
    description: 'AI Boolean search prompts & custom Claude Artifact workflows engineered to mine LinkedIn for high-intent decision makers seeking web development, redesigns, and AI integration.',
    points: ['Boolean AI search prompt generation for web leads', 'Decision-maker target extraction (Founders, CEOs)', 'Claude Artifact templates for project scoping & proposals', 'Automated connection request & outreach drafting'],
  },
]

const aiSolutions = [
  {
    title: 'AI Lead Generation & LinkedIn Mining Engine',
    badge: 'Sales & Lead Gen',
    body: 'Discover target accounts, mine LinkedIn for high-value web dev decision-makers using AI prompts, qualify prospects with chat flows, and push warm leads directly to your sales team.',
  },
  {
    title: 'AI Email Assistant & Outreach Agent',
    badge: 'Email Automation',
    body: 'Automate inbox triaging, auto-draft responses based on knowledge base data, run personalized cold email drip sequences, and never miss an incoming lead.',
  },
  {
    title: 'Claude Artifacts for Project Scoping & Proposals',
    badge: 'Proposal & Scoping',
    body: 'Turn raw client briefs into structured proposals, technical specifications, competitor tech audits, and interactive Claude Artifacts within seconds.',
  },
]

export function AiIntegration() {
  useDocumentTitle(
    'AI Integration & Intelligent Automation — NestHub Solution',
    'Embed cutting-edge AI chatbots, RAG vector search, automated LLM workflows, and predictive analytics into your web and mobile applications with NestHub Solution.',
    '/services/ai-integration',
  )

  return (
    <main id="top" className="relative z-[1] pb-16 pt-32 sm:pt-36">
      <JsonLd data={servicePageSchema('/services/ai-integration', 'AI Integration & Intelligent Automation — NestHub Solution', 'Embed cutting-edge AI chatbots, RAG vector search, automated LLM workflows, and predictive analytics into your web and mobile applications with NestHub Solution.')} />
      <section className="mx-auto max-w-[1320px] px-6">
        <Reveal className="max-w-[840px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[.08em] text-violet-600">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            Artificial Intelligence & LLMs
          </div>

          <h1 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-[-.035em] text-ink sm:text-[48px] lg:text-[56px] text-balance">
            AI Integration & Intelligent Automation Services
          </h1>

          <p className="mt-5 text-[17.5px] leading-[1.65] text-muted sm:text-[19px] text-pretty">
            We integrate LLMs, AI lead generation software, autonomous email agents, and intelligent workflows directly into your software to scale your business.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-violet-600 sm:text-[28px]">24/7</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">AI Support</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-violet-600 sm:text-[28px]">&lt; 1s</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Token Response</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-violet-600 sm:text-[28px]">80%</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Cost Savings</span>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm">
              <span className="block text-[24px] font-extrabold text-violet-600 sm:text-[28px]">100%</span>
              <span className="mt-0.5 block text-[12.5px] font-semibold text-muted">Data Security</span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="/#contact"
              whileHover={{ y: -2, backgroundColor: '#6D28D9' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-violet-600 px-7 text-[15.5px] font-semibold text-white shadow-[0_10px_30px_rgba(109,40,217,.28)] transition-all"
            >
              Integrate AI Into Your Product
            </motion.a>
            <a
              href={brand.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-6 text-[15px] font-semibold text-ink transition-all hover:border-ink"
            >
              <Icon name="clock" color="#475569" size={17} />
              Schedule AI Discovery Call
            </a>
          </div>
        </Reveal>
      </section>

      {/* Overview & Pillars */}
      <section className="mx-auto max-w-[1320px] px-6 pt-20 sm:pt-28">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-violet-600">Capabilities</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            What We Build with Artificial Intelligence
          </SplitText>
          <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
            From customer service automation to intelligent document processing and semantic search, our AI engineering team builds production-ready solutions tailored to your workflow.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05}>
              <div className="group flex h-full flex-col rounded-[28px] border border-line bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_16px_40px_rgba(124,58,237,.12)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
                    <Icon name={pillar.icon} color="#7C3AED" size={22} />
                  </span>
                  <h3 className="text-[20px] font-bold tracking-[-.02em] text-ink">{pillar.title}</h3>
                </div>

                <p className="mt-4 text-[14.5px] leading-[1.6] text-muted">{pillar.description}</p>

                <ul className="mt-5 grid gap-2 pt-4 border-t border-line/60">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[13.5px] font-medium text-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" />
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
            <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-violet-600">AI Stack</span>
            <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[40px]">
              Technologies & AI Frameworks We Use
            </SplitText>
            <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
              We leverage top-tier AI models, vector search engines, and orchestration frameworks to ensure low latency, high accuracy, and enterprise data privacy.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aiTechStack.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 0.04}>
                <div className="flex h-full flex-col rounded-2xl border border-line/80 bg-white p-6 transition-all duration-300 hover:border-violet-400 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-[.08em] text-violet-600">{tech.category}</span>
                    <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[11px] font-bold text-violet-700">
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

      {/* Common Solutions */}
      <section className="mx-auto max-w-[1320px] px-6 pt-24 sm:pt-32">
        <Reveal className="max-w-[720px]">
          <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-violet-600">Use Cases</span>
          <SplitText className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[38px]">
            Popular AI Integration Solutions
          </SplitText>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {aiSolutions.map((sol) => (
            <Reveal key={sol.title}>
              <div className="flex h-full flex-col rounded-[24px] border border-line bg-white p-7 shadow-sm">
                <span className="w-fit rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-700">
                  {sol.badge}
                </span>
                <h3 className="mt-4 text-[19px] font-bold text-ink">{sol.title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-muted">{sol.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="mx-auto max-w-[840px] px-6 pt-20 sm:pt-28">
        <Reveal>
          <div className="rounded-[32px] border border-violet-500/20 bg-gradient-to-b from-violet-50/70 to-white p-8 text-center shadow-[0_12px_45px_rgba(124,58,237,.1)] sm:p-12">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md">
              <Icon name="ai" color="#ffffff" size={24} />
            </span>
            <SplitText className="mt-6 text-[26px] font-bold leading-[1.15] tracking-[-.03em] text-ink sm:text-[34px]">
              Supercharge Your Software with AI
            </SplitText>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted">
              Talk to our AI engineers to discuss your custom use case, data security model, and API integration plan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                href="/#contact"
                whileHover={{ y: -2, backgroundColor: '#6D28D9' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-13 items-center justify-center rounded-2xl bg-violet-600 px-8 text-[15.5px] font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,.28)]"
              >
                Contact AI Engineers
              </motion.a>
            </div>
          </div>
        </Reveal>
      </section>

      <Faq />
    </main>
  )
}
