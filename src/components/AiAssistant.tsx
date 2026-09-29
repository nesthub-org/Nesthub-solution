import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMountAfterHydration } from '../hooks/usePrerendering'
import assistantFull from '../assets/assistant-full.webp'
import assistantFace from '../assets/assistant-face.webp'
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

const GREETED_KEY = 'nh-assistant-greeted'

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

function pickFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
  const preferred = /female|zira|samantha|susan|hazel|heera|aria|jenny|libby|sonia|victoria|karen|moira|tessa|google uk english female|google us english/i
  return english.find((v) => preferred.test(v.name) && /en-(in|gb|us)/i.test(v.lang)) ?? english.find((v) => preferred.test(v.name)) ?? english[0]
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  const synth = window.speechSynthesis
  const now = synth.getVoices()
  if (now.length) return Promise.resolve(now)
  return new Promise((resolve) => {
    const done = () => resolve(synth.getVoices())
    synth.addEventListener('voiceschanged', done, { once: true })
    window.setTimeout(done, 1200)
  })
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
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: 'assistant', text: GREETING }])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const speak = useCallback(async (text: string) => {
    if (!('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    const voices = await loadVoices()
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const voice = pickFemaleVoice(voices)
    if (voice) {
      u.voice = voice
      u.lang = voice.lang
    }
    u.rate = 1
    u.pitch = 1.1
    u.onstart = () => setSpeaking(true)
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    synth.speak(u)
  }, [])

  // Greeting: show the bubble, type the text out, and say it once per session.
  // Browsers block speech until the visitor has interacted with the page, so
  // if they haven't yet, wait for their first click/tap/keypress.
  useEffect(() => {
    if (!mounted) return
    let alreadyGreeted = false
    try {
      alreadyGreeted = sessionStorage.getItem(GREETED_KEY) === '1'
    } catch {
      // Storage unavailable (private mode etc.): greet anyway.
    }

    let typeTimer = 0
    let cancelled = false
    const cleanups: (() => void)[] = []

    const startTimer = window.setTimeout(() => {
      setBubble(true)
      let i = 0
      setSpeaking(true)
      typeTimer = window.setInterval(() => {
        i += 1
        setTyped(GREETING.slice(0, i))
        if (i >= GREETING.length) {
          window.clearInterval(typeTimer)
          if (!window.speechSynthesis?.speaking) setSpeaking(false)
        }
      }, 38)

      if (alreadyGreeted) return
      const sayIt = () => {
        if (cancelled) return
        try {
          sessionStorage.setItem(GREETED_KEY, '1')
        } catch {
          // ignore
        }
        void speak(GREETING)
      }
      const activation = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation
      if (!activation || activation.hasBeenActive) {
        sayIt()
      } else {
        const onFirst = () => {
          events.forEach((e) => window.removeEventListener(e, onFirst))
          sayIt()
        }
        const events = ['pointerdown', 'keydown', 'touchstart'] as const
        events.forEach((e) => window.addEventListener(e, onFirst, { once: true, passive: true }))
        cleanups.push(() => events.forEach((e) => window.removeEventListener(e, onFirst)))
      }
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

  const openChat = () => {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
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
              <img
                src={assistantFull}
                alt=""
                width={440}
                height={407}
                draggable={false}
                className="animate-floaty-slow relative block h-auto w-full select-none drop-shadow-[0_18px_30px_rgba(37,99,235,.28)]"
              />
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
