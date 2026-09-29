import { brand, faqs, jobs, projects, services, steps } from '../data/content'

export interface AssistantAction {
  label: string
  href: string
}

export interface AssistantReply {
  text: string
  actions?: AssistantAction[]
}

export interface ChatTurn {
  role: 'user' | 'assistant'
  text: string
}

export const ASSISTANT_NAME = 'Aria'
export const GREETING = `Welcome to ${brand.name}, how may I help you?`

export const quickReplies = ['What services do you offer?', 'How much does a website cost?', 'Show me your work', 'Book a call']

const whatsappHref = `https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`
const bookCall: AssistantAction = { label: 'Book a free call', href: brand.calendly }
const whatsapp: AssistantAction = { label: 'WhatsApp us', href: whatsappHref }

const faq = (q: string) => faqs.find((f) => f.q === q)?.a ?? ''
const service = (title: string) => services.find((s) => s.title === title)

function serviceReply(title: string, extra = ''): AssistantReply {
  const s = service(title)
  if (!s) return fallback()
  return {
    text: `${s.title}: ${s.body}${extra ? ` ${extra}` : ''}\n\nWe cover ${s.tags.join(', ')}.`,
    actions: s.href ? [{ label: `Explore ${s.title}`, href: s.href }, bookCall] : [bookCall],
  }
}

function fallback(): AssistantReply {
  return {
    text: `I'm not sure I have the answer to that one, but our team definitely will. You can book a free 30-minute call, WhatsApp us, or email ${brand.email}.`,
    actions: [bookCall, whatsapp],
  }
}

interface Intent {
  keywords: string[]
  reply: () => AssistantReply
}

// Ordered from most to least specific: on a tie in score, the earlier intent wins.
const intents: Intent[] = [
  {
    keywords: ['price', 'pricing', 'cost', 'costs', 'budget', 'quote', 'charge', 'charges', 'rate', 'rates', 'fee', 'fees', 'expensive', 'cheap', 'afford'],
    reply: () => ({ text: faq('How much does a website cost?'), actions: [bookCall] }),
  },
  {
    keywords: ['how long', 'timeline', 'duration', 'deadline', 'days', 'weeks', 'fast', 'quickly', 'deliver', 'delivery'],
    reply: () => ({ text: faq('How long does a project take?'), actions: [bookCall] }),
  },
  {
    keywords: ['job', 'jobs', 'career', 'careers', 'hiring', 'hire me', 'vacancy', 'vacancies', 'intern', 'internship', 'opening', 'openings', 'apply', 'resume', 'cv'],
    reply: () => ({
      text: `Yes, we're hiring! Current openings:\n${jobs.map((j) => `• ${j.title} (${j.type}, ${j.location})`).join('\n')}`,
      actions: [{ label: 'View openings', href: '/careers' }],
    }),
  },
  {
    keywords: ['ai', 'artificial intelligence', 'chatbot', 'chatbots', 'bot', 'automation', 'automate', 'gpt', 'llm', 'machine learning', 'ml'],
    reply: () => serviceReply('AI Integration', faq('Can you integrate AI into my website or app?')),
  },
  {
    keywords: ['app', 'apps', 'mobile', 'android', 'ios', 'iphone', 'react native', 'play store', 'app store'],
    reply: () => serviceReply('Mobile App Development'),
  },
  {
    keywords: ['seo', 'google ads', 'meta ads', 'ads', 'ranking', 'rank', 'traffic', 'digital marketing', 'marketing', 'analytics'],
    reply: () => serviceReply('SEO & Digital Marketing'),
  },
  {
    keywords: ['social', 'social media', 'instagram', 'facebook', 'linkedin', 'followers', 'content', 'reels', 'engagement'],
    reply: () => serviceReply('Social Media Marketing'),
  },
  {
    keywords: ['design', 'ui', 'ux', 'figma', 'wireframe', 'prototype', 'redesign', 'interface'],
    reply: () => serviceReply('UI/UX Design'),
  },
  {
    keywords: ['website', 'websites', 'web', 'site', 'ecommerce', 'e-commerce', 'online store', 'shop', 'landing page', 'crm', 'cms', 'wordpress', 'web app'],
    reply: () => serviceReply('Website Development'),
  },
  {
    keywords: ['service', 'services', 'offer', 'provide', 'what do you do', 'what can you do', 'help with', 'expertise'],
    reply: () => ({
      text: `Here's what we do:\n${services.map((s) => `• ${s.title}`).join('\n')}\n\nWhich one are you interested in?`,
      actions: services.flatMap((s) => (s.href ? [{ label: s.title, href: s.href }] : [])).slice(0, 3),
    }),
  },
  {
    keywords: ['portfolio', 'work', 'projects', 'project', 'case study', 'case studies', 'clients', 'client', 'examples', 'previous'],
    reply: () => ({
      text: `Some of our recent work:\n${projects.map((p) => `• ${p.title} (${p.category})`).join('\n')}`,
      actions: [{ label: 'View case studies', href: '/case-studies' }],
    }),
  },
  {
    keywords: ['process', 'steps', 'approach', 'workflow', 'methodology', 'how do you work'],
    reply: () => ({
      text: `Our process:\n${steps.map((s) => `${s.n}. ${s.title} (${s.duration})`).join('\n')}`,
      actions: [bookCall],
    }),
  },
  {
    keywords: ['where', 'location', 'located', 'based', 'address', 'office', 'jaipur', 'city', 'remote', 'outside'],
    reply: () => ({ text: faq('Do you work with clients outside Jaipur?') }),
  },
  {
    keywords: ['book', 'call', 'meeting', 'schedule', 'appointment', 'consult', 'consultation', 'demo', 'discuss'],
    reply: () => ({
      text: "I'd love to set that up! Pick a slot for a free 30-minute discovery call and we'll talk through your project.",
      actions: [bookCall, whatsapp],
    }),
  },
  {
    keywords: ['contact', 'phone', 'number', 'email', 'mail', 'whatsapp', 'reach', 'talk', 'human', 'agent', 'someone'],
    reply: () => ({
      text: `You can reach us here:\n• Phone / WhatsApp: ${brand.phone}\n• Email: ${brand.email}`,
      actions: [whatsapp, bookCall],
    }),
  },
  {
    keywords: ['who', 'about', 'company', 'nesthub', 'team', 'founded'],
    reply: () => ({ text: faq('Who is NestHub Solution?') }),
  },
  {
    keywords: ['thanks', 'thank', 'thank you', 'thx', 'great', 'awesome', 'cool', 'perfect'],
    reply: () => ({ text: "You're welcome! Is there anything else I can help you with?" }),
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    reply: () => ({ text: `Thanks for stopping by ${brand.name}. Have a great day!` }),
  },
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'namaste', 'good morning', 'good evening', 'good afternoon'],
    reply: () => ({ text: `Hi there! I'm ${ASSISTANT_NAME}. Ask me about our services, pricing, timelines or past work.` }),
  },
]

function localReply(input: string): AssistantReply {
  const text = ` ${input.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ')} `
  let best: Intent | null = null
  let bestScore = 0
  for (const intent of intents) {
    const score = intent.keywords.reduce((n, k) => (text.includes(` ${k} `) ? n + k.split(' ').length : n), 0)
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }
  return best ? best.reply() : fallback()
}

// Set VITE_ASSISTANT_API_URL to a backend that accepts
// `{ messages: { role, content }[] }` and returns `{ reply: string }` to answer
// with a real LLM. Keep API keys on that server, never in this bundle. Any
// failure falls back to the built-in keyword responder.
const API_URL = import.meta.env.VITE_ASSISTANT_API_URL as string | undefined

export async function getAssistantReply(history: ChatTurn[]): Promise<AssistantReply> {
  const last = history[history.length - 1]?.text ?? ''
  if (API_URL) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map((t) => ({ role: t.role, content: t.text })) }),
      })
      if (res.ok) {
        const data = (await res.json()) as { reply?: string }
        if (data.reply) return { text: data.reply }
      }
    } catch {
      // Network or server error: fall through to the local responder.
    }
  }
  return localReply(last)
}
