import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMountAfterHydration } from '../hooks/usePrerendering'
import assistantFull from '../assets/assistant-full.webp'
import assistantFace from '../assets/assistant-face.webp'
import { LiveAvatar } from './LiveAvatar'
import {
  ASSISTANT_NAME,
  GREETING,
  getAssistantReply,
  quickReplies,
  type AssistantAction,
  type ChatTurn,
} from '../utils/assistantBrain'

interface Message extends ChatTurn {
  id: number
  actions?: AssistantAction[]
}

function AssistantAvatar({ size = 40 }: { size?: number }) {
  return (
    <img
      src={assistantFace}
      alt=""
      width={size}
      height={size}
      draggable={false}
      className="block rounded-full bg-brand-100 object-cover"
      style={{ width: size, height: size }}
    />
  )
}

// What the voice says. Kept separate from the on-screen GREETING so the
// punctuation can shape a natural, conversational delivery.
const SPOKEN_GREETING = 'Welcome to NestHub Solution! How may I help you?'

const NATURAL_VOICE = /natural|neural|online|premium|enhanced/i
const FEMALE_VOICE =
  /neerja|ava|emma|jenny|aria|michelle|sonia|libby|maisie|natasha|clara|emily|molly|heera|veena|kajal|samantha|karen|moira|tessa|serena|fiona|victoria|susan|hazel|zira|female|google us english/i
const MALE_VOICE =
  /\b(guy|davis|andrew|brian|christopher|eric|roger|steffan|ryan|thomas|prabhat|william|liam|mark|david|george|james|daniel|alex|fred|ravi|rishi|tony|jason|male)\b/i
const LEGACY_VOICE = /zira|heera|hazel|susan/i

// Rank the voices this browser offers, strongly preferring neural "Natural"
// voices (Edge ships these, e.g. Neerja, an Indian English voice) over the
// flat, robotic system voices, and female voices over male ones.
function scoreVoice(v: SpeechSynthesisVoice): number {
  const lang = v.lang.toLowerCase().replace('_', '-')
  if (!lang.startsWith('en')) return -Infinity
  if (MALE_VOICE.test(v.name)) return -Infinity
  let score = 0
  if (NATURAL_VOICE.test(v.name)) score += 100
  if (/google/i.test(v.name)) score += 40
  if (FEMALE_VOICE.test(v.name)) score += 30
  if (lang === 'en-in') score += 25
  else if (lang === 'en-gb' || lang === 'en-us') score += 10
  if (LEGACY_VOICE.test(v.name)) score -= 20
  return score
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  let best: SpeechSynthesisVoice | undefined
  let bestScore = -Infinity
  for (const v of voices) {
    const s = scoreVoice(v)
    if (s > bestScore) {
      best = v
      bestScore = s
    }
  }
  return best
}

// Voices load asynchronously in some browsers; wait for them once, then reuse
// the result so a retry after the first click speaks without another delay.
let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  const synth = window.speechSynthesis
  const now = synth.getVoices()
  if (now.length) return Promise.resolve(now)
  voicesReady ??= new Promise((resolve) => {
    const done = () => resolve(synth.getVoices())
    synth.addEventListener('voiceschanged', done, { once: true })
    window.setTimeout(done, 1200)
  })
  return voicesReady
}

function ActionLink({ action }: { action: AssistantAction }) {
  const cls =
    'inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-600 transition hover:border-brand-500 hover:bg-brand-50'
  if (action.href.startsWith('/') && !action.href.includes('#')) {
    return (
      <Link to={action.href} className={cls}>
        {action.label}
      </Link>
    )
  }
  return (
    <a href={action.href} target="_blank" rel="noreferrer" className={cls}>
      {action.label}
    </a>
  )
}

export function AiAssistant() {
  const mounted = useMountAfterHydration()
  const [open, setOpen] = useState(false)
  const [bubble, setBubble] = useState(false)
  const [typed, setTyped] = useState('')
  const [speaking, setSpeaking] = useState(false)
  const [wordTick, setWordTick] = useState(0)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: 'assistant', text: GREETING }])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Resolves true once the browser actually starts talking, false if it
  // refuses (autoplay policy: "not-allowed") or never starts.
  const speak = useCallback(async (text: string): Promise<boolean> => {
    if (!('speechSynthesis' in window)) return false
    const synth = window.speechSynthesis
    const voices = await loadVoices()
    synth.cancel()
    const voice = pickVoice(voices)
    const natural = !!voice && NATURAL_VOICE.test(voice.name)
    // One utterance per sentence: the short gap between them lands like a
    // breath, instead of one flat read-through.
    const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text]).map((s) => s.trim()).filter(Boolean)
    const utterances = sentences.map((sentence) => {
      const u = new SpeechSynthesisUtterance(sentence)
      try {
        if (voice) {
          u.voice = voice
          u.lang = voice.lang
        }
      } catch {
        // Unusable voice object: fall back to the browser default.
      }
      // Neural voices already sound natural at defaults; slowing the older
      // system voices slightly takes the rushed, robotic edge off them.
      u.rate = natural ? 1 : 0.94
      u.pitch = 1
      u.onboundary = (e) => {
        if (e.name === 'word') setWordTick((t) => t + 1)
      }
      return u
    })
    const first = utterances[0]
    const last = utterances[utterances.length - 1]
    return new Promise<boolean>((resolve) => {
      let settled = false
      const settle = (ok: boolean) => {
        if (settled) return
        settled = true
        window.clearTimeout(watchdog)
        resolve(ok)
      }
      const watchdog = window.setTimeout(() => {
        synth.cancel()
        setSpeaking(false)
        settle(false)
      }, 3500)
      first.onstart = () => {
        setSpeaking(true)
        settle(true)
      }
      last.onend = () => setSpeaking(false)
      utterances.forEach((u) => {
        u.onerror = () => {
          setSpeaking(false)
          settle(false)
        }
        synth.speak(u)
      })
    })
  }, [])

  // Greeting: on every page load, show the bubble, type the text out and say
  // it. Browsers refuse to play any sound before the visitor has interacted
  // with the page, so if the first attempt is blocked, say it on their first
  // click / tap / keypress anywhere on the page instead.
  useEffect(() => {
    if (!mounted) return

    let typeTimer = 0
    let cancelled = false
    const cleanups: (() => void)[] = []

    const startTimer = window.setTimeout(() => {
      setBubble(true)
      let i = 0
      typeTimer = window.setInterval(() => {
        i += 1
        setTyped(GREETING.slice(0, i))
        if (i >= GREETING.length) {
          window.clearInterval(typeTimer)
        }
      }, 38)

      // Only these events count as "user activation" for the autoplay policy
      // (scrolling and hovering don't).
      const events = ['mousedown', 'pointerup', 'touchend', 'keydown', 'click'] as const
      const disarm = () => events.forEach((e) => window.removeEventListener(e, onFirst, true))
      const onFirst = () => {
        disarm()
        if (!cancelled) void speak(SPOKEN_GREETING)
      }
      cleanups.push(disarm)
      void speak(SPOKEN_GREETING).then((ok) => {
        if (ok || cancelled) return
        events.forEach((e) => window.addEventListener(e, onFirst, { capture: true, passive: true }))
      })
    }, 1200)

    return () => {
      cancelled = true
      window.clearTimeout(startTimer)
      window.clearInterval(typeTimer)
      cleanups.forEach((fn) => fn())
    }
  }, [mounted, speak])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 250)
  }, [open])

  // Opening the chat doesn't cut the greeting off: the click is often the
  // visitor's first interaction, which is exactly what lets her speak.
  const openChat = () => {
    setBubble(false)
    setOpen(true)
  }

  const send = async (raw: string) => {
    const text = raw.trim()
    if (!text || thinking) return
    const userMsg: Message = { id: nextId.current++, role: 'user', text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setThinking(true)
    const started = Date.now()
    const reply = await getAssistantReply(history)
    // A short beat so instant local answers still feel conversational.
    const wait = Math.max(0, 650 - (Date.now() - started))
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, role: 'assistant', text: reply.text, actions: reply.actions }])
      setThinking(false)
    }, wait)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void send(input)
  }

  if (!mounted) return null

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 30 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="fixed bottom-3 right-3 z-[75] flex origin-bottom-right items-end sm:bottom-4 sm:right-4"
          >
            <AnimatePresence>
              {bubble && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, x: 16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="relative mb-10 mr-1 flex origin-right items-center sm:mb-14"
                  role="status"
                  aria-live="polite"
                >
                  <button
                    type="button"
                    onClick={() => setBubble(false)}
                    aria-label="Dismiss greeting"
                    className="mr-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-[0_4px_12px_rgba(17,17,17,.18)] transition hover:scale-110"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={openChat}
                    className="relative w-[190px] rounded-2xl bg-[#14161c] px-4 py-3 text-left text-white shadow-[0_14px_40px_rgba(17,17,17,.35)] ring-1 ring-white/15 transition hover:bg-[#1c1f27] sm:w-[230px]"
                  >
                    <span className="flex items-start gap-2">
                      <span className="min-h-[2.5rem] flex-1 text-[13px] font-semibold leading-snug">
                        {typed}
                        {typed.length < GREETING.length ? (
                          <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-white align-middle" />
                        ) : (
                          <span className="ml-1" aria-hidden>👋</span>
                        )}
                      </span>
                      {speaking && (
                        <span className="mt-1 flex h-3 items-end gap-[2px]" aria-hidden>
                          {[0, 1, 2, 3].map((i) => (
                            <span key={i} className="nh-wave w-[3px] rounded-full bg-brand-200" style={{ animationDelay: `${i * 110}ms` }} />
                          ))}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[11px] text-white/60">Click to chat with me</span>
                    <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-inherit" aria-hidden />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={openChat}
              aria-label={`Chat with ${ASSISTANT_NAME}, our AI assistant`}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="relative block w-[120px] shrink-0 sm:w-[180px]"
            >
              <span
                className={`absolute inset-[12%] rounded-full bg-brand-500/40 blur-2xl transition-opacity duration-500 ${speaking ? 'animate-pulse opacity-100' : 'opacity-0'}`}
                aria-hidden
              />
              <span className="relative block drop-shadow-[0_18px_30px_rgba(37,99,235,.28)]">
                <LiveAvatar src={assistantFull} width={440} height={407} speaking={speaking} wordTick={wordTick} />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label={`Chat with ${ASSISTANT_NAME}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed bottom-5 right-5 z-[80] flex h-[min(560px,calc(100dvh-2.5rem))] w-[min(380px,calc(100vw-2.5rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_70px_rgba(17,17,17,.22)] sm:bottom-6 sm:right-6"
          >
            <header className="flex items-center gap-3 bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3.5 text-white">
              <span className="relative shrink-0 overflow-hidden rounded-full ring-2 ring-white/60">
                <AssistantAvatar size={40} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">{ASSISTANT_NAME} · NestHub Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" /> Online, replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex items-start gap-2'}>
                  {m.role === 'assistant' && (
                    <span className="shrink-0 overflow-hidden rounded-full">
                      <AssistantAvatar size={26} />
                    </span>
                  )}
                  <div className="max-w-[80%]">
                    <div
                      className={
                        m.role === 'user'
                          ? 'whitespace-pre-line rounded-2xl rounded-br-sm bg-brand-500 px-3.5 py-2.5 text-sm text-white'
                          : 'whitespace-pre-line rounded-2xl rounded-bl-sm border border-line bg-white px-3.5 py-2.5 text-sm text-ink'
                      }
                    >
                      {m.text}
                    </div>
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.actions.map((a) => (
                          <ActionLink key={a.label} action={a} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex items-end gap-2">
                  <span className="shrink-0 overflow-hidden rounded-full">
                    <AssistantAvatar size={26} />
                  </span>
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-white px-3.5 py-3" aria-label={`${ASSISTANT_NAME} is typing`}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 120}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !thinking && (
                <div className="flex flex-wrap gap-1.5 pl-8">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-600 transition hover:border-brand-500 hover:bg-brand-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line bg-white p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                aria-label="Message"
                maxLength={500}
                className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand-500 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600 disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                </svg>
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
