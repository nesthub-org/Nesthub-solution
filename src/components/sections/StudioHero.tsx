import { useEffect, useRef, useState, type FormEvent } from 'react'
import { PhonePreview } from '../studio/PhonePreview'
import { heroPhotos } from '../studio/photos'
import { WhatsAppGlyph } from '../WhatsAppButton'
import { businessTypeList, businessTypes, detectBusinessType, isBusinessType, type BusinessTypeId } from '../studio/businessTypes'
import { isPrerendering } from '../../hooks/usePrerendering'
import { getLead, leadMessage, setLead, shareHref, whatsappHref } from '../../lib/lead'
import { track } from '../../lib/track'
import { homepageProjects } from '../../data/content'
import { getDomain } from '../../utils/url'

const MAX_NAME = 40
const TYPE_SPEED_MS = 90
const HOLD_MS = 3500
const DEMO_START_MS = 2600
const demoOrder: BusinessTypeId[] = ['restaurant', 'gym', 'salon', 'shop', 'realty', 'coaching', 'clinic']

export function StudioHero() {
  // This first render has to match the prerendered HTML exactly, so the URL and
  // anything saved in the session are only read in an effect, after hydration.
  const [typeId, setTypeId] = useState<BusinessTypeId>('clinic')
  const [headlineType, setHeadlineType] = useState<BusinessTypeId | null>(null)
  const [typed, setTyped] = useState('')
  const [demoName, setDemoName] = useState(businessTypes.clinic.sample)
  const [demoOn, setDemoOn] = useState(true)
  const [demoOnly, setDemoOnly] = useState<BusinessTypeId | null>(null)
  const [focused, setFocused] = useState(false)
  const [buildKey, setBuildKey] = useState(0)
  const [finished, setFinished] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)
  const pickedTypeRef = useRef(false)
  const finishedRef = useRef('')
  const offScreenRef = useRef(false)

  const name = typed.trim()
  const hasName = name.length >= 2
  const siteName = name || (demoOn || buildKey === 0 ? demoName : 'Your Business Name')
  const noun = headlineType ? businessTypes[headlineType].noun : 'business'

  const applyType = (next: BusinessTypeId) => {
    setTypeId(next)
    setHeadlineType(next)
    setBuildKey((k) => k + 1)
  }

  // An ad can open the page on its own vertical (?t=clinic), and a shared link
  // can open on a finished preview (?b=Sharma+Dental&t=clinic).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const stored = getLead()
    const linkedName = (params.get('b') ?? stored.businessName).slice(0, MAX_NAME).trim()
    const linkedType = params.get('t') ?? stored.typeId
    const validType = isBusinessType(linkedType) ? linkedType : null

    if (validType) {
      setTypeId(validType)
      setHeadlineType(validType)
      setDemoName(businessTypes[validType].sample)
      if (params.has('t')) pickedTypeRef.current = true
    }
    if (linkedName) {
      setTyped(linkedName)
      finishedRef.current = `${linkedName}|${validType}`
      setFinished(true)
      setDemoOn(false)
      setLead({ businessName: linkedName, typeId: validType })
    } else if (params.has('t') && validType) {
      setDemoOnly(validType)
    }
  }, [])

  // Attract mode: until the visitor touches anything, the phone keeps building
  // sites for different businesses and the headline follows along.
  useEffect(() => {
    if (!demoOn || isPrerendering() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)))

    const run = async () => {
      const order = demoOnly ? [demoOnly] : demoOrder
      new Image().src = heroPhotos[order[0]]
      await wait(DEMO_START_MS)
      for (let i = 0; !cancelled; i += 1) {
        if (offScreenRef.current || document.hidden) {
          await wait(500)
          continue
        }
        const next = businessTypes[order[i % order.length]]
        setDemoName('')
        applyType(next.id)
        new Image().src = heroPhotos[order[(i + 1) % order.length]]
        for (let c = 2; !cancelled; c += 2) {
          setDemoName(next.sample.slice(0, c))
          await wait(TYPE_SPEED_MS)
          if (c >= next.sample.length) break
        }
        if (demoOnly) return
        await wait(HOLD_MS)
      }
    }
    void run()

    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [demoOn, demoOnly])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      offScreenRef.current = !entry.isIntersecting
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Keep the active chip in view in the sideways-scrolling row on phones.
  useEffect(() => {
    const row = chipsRef.current
    const chip = row?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }, [typeId])

  const start = () => {
    setDemoOn(false)
    if (startedRef.current) return
    startedRef.current = true
    track('preview_start')
  }

  // The moment the preview feels finished: the build replays with their name on
  // it, which is also what turns this from a toy into something they made.
  const finish = () => {
    if (!hasName) return
    const key = `${name}|${typeId}`
    if (finishedRef.current === key) return
    finishedRef.current = key
    setFinished(true)
    setBuildKey((k) => k + 1)
    track('preview_ready', { content_category: typeId })
  }

  const onPhoneTap = () => {
    start()
    track('preview_tap')
  }

  const onNameChange = (value: string) => {
    setTyped(value)
    setFinished(false)
    const detected = pickedTypeRef.current ? null : detectBusinessType(value)
    if (detected && detected !== typeId) applyType(detected)
    setLead({ businessName: value.trim(), typeId: detected ?? typeId })
  }

  const onPickType = (next: BusinessTypeId) => {
    start()
    pickedTypeRef.current = true
    finishedRef.current = ''
    applyType(next)
    setLead({ typeId: next })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!hasName) {
      inputRef.current?.focus()
      return
    }
    inputRef.current?.blur()
    finish()
  }

  return (
    <section ref={sectionRef} id="studio" className="blueprint relative overflow-hidden text-white">
      <div className="studio-layout mx-auto grid max-w-[1320px] grid-cols-1 px-4 pb-8 pt-[86px] sm:px-6 sm:pt-[112px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-14 lg:pb-6 lg:pt-[104px]">
        {/* headline */}
        <div className="studio-copy lg:col-start-1 lg:row-start-2">
          <p className="text-[13px] font-semibold text-white/85 sm:text-[15px]">Website design and development, from Jaipur</p>
          <h1
            aria-label={`What's your ${noun} called?`}
            className="mt-2 text-[clamp(28px,9.2vw,40px)] font-bold leading-[1.04] tracking-[-.035em] sm:mt-3 sm:text-[56px] lg:text-[clamp(44px,4.9vw,72px)] lg:leading-[1.02]"
          >
            <span aria-hidden>
              What&apos;s your
              <br />
              {/* One line, whichever word is showing, so nothing below it jumps. */}
              <span className="whitespace-nowrap">
                <span key={noun} className={`marker ${headlineType ? 'noun-in' : ''}`}>
                  {noun}
                </span>{' '}
                called?
              </span>
            </span>
          </h1>
          <p aria-live="polite" className="mt-2 min-h-[42px] max-w-[520px] text-pretty text-[15px] leading-[1.4] text-white/90 sm:mt-4 sm:min-h-0 sm:text-[19px] lg:text-[21px]">
            {finished && hasName ? (
              <>
                <strong className="font-bold text-marker">That&apos;s {name}.</strong> Like it? Let&apos;s build the real one, made just for you.
              </>
            ) : (
              'Type it below and watch its website build itself, live on this page.'
            )}
          </p>
        </div>

        {/* phone */}
        <div className="studio-stage mt-3 sm:mt-8 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:self-center">
          <p className="sheet-label mb-2 flex items-center justify-center gap-2 !text-[11px] text-white/90 lg:mb-4 lg:!text-[11.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7CFFCB]" />
            Live preview, not a video
          </p>
          <PhonePreview typeId={typeId} name={siteName} buildKey={buildKey} drift={!focused} onTap={onPhoneTap} />
        </div>

        {/* controls: docked over the phone's lower edge on small screens, so the
            phone stays right above the field when the keyboard is up */}
        <div className="studio-controls relative z-[4] -mt-[26px] sm:mt-6 lg:col-start-1 lg:row-start-3 lg:mt-7 lg:self-start">
          <form onSubmit={onSubmit} className={`relative rounded-[18px] ${demoOn ? 'field-glow' : 'shadow-[0_0_0_3px_rgba(255,225,77,.95),0_14px_34px_rgba(5,12,60,.3)]'}`}>
            <label htmlFor="studio-name" className="sr-only">
              Your business name
            </label>
            <input
              ref={inputRef}
              id="studio-name"
              value={typed}
              maxLength={MAX_NAME}
              autoComplete="organization"
              autoCapitalize="words"
              enterKeyHint="done"
              placeholder={demoOn ? undefined : 'Your business name'}
              onChange={(e) => onNameChange(e.target.value)}
              onFocus={() => {
                start()
                setFocused(true)
                setLead({ typing: true })
              }}
              onBlur={() => {
                setFocused(false)
                setLead({ typing: false })
                finish()
              }}
              className="h-[56px] w-full rounded-[18px] bg-white pl-4 pr-[104px] text-[17px] font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink/45 sm:h-[64px] sm:pl-5 sm:text-[19px]"
            />
            {demoOn && !typed && (
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-4 flex items-center overflow-hidden whitespace-nowrap pr-[104px] text-[17px] font-semibold text-ink/55 sm:left-5 sm:text-[19px]">
                {demoName}
                <span className="type-caret ml-0.5 inline-block h-[1.1em] w-[2px] bg-blueprint" />
              </span>
            )}
            <button
              type="submit"
              className="absolute right-[6px] top-[6px] h-[44px] rounded-[13px] bg-blueprint px-4 text-[15px] font-bold text-white transition-colors hover:bg-blueprint-deep sm:h-[52px] sm:px-6 sm:text-[16px]"
            >
              {demoOn ? 'Try yours' : 'Build it'}
            </button>
          </form>

          <div
            ref={chipsRef}
            role="group"
            aria-label="Type of business"
            className="chip-scroller relative -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:mt-4 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {businessTypeList.map((t) => {
              const on = t.id === typeId
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onPickType(t.id)}
                  className={`h-10 shrink-0 rounded-full border px-3.5 text-[13.5px] font-semibold transition-colors sm:h-[38px] sm:text-[14.5px] lg:px-[11px] xl:px-3 ${
                    on ? 'border-marker bg-marker text-ink' : 'border-white/35 bg-white/10 text-white hover:border-white/70'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>

          {hasName ? (
            <div className="note-in mt-4 sm:mt-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={whatsappHref(leadMessage({ businessName: name, typeId }))}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('whatsapp_click', { content_category: 'hero' })}
                  className="flex h-[52px] items-center gap-2.5 rounded-[15px] bg-marker px-5 text-[16px] font-bold text-ink transition-transform hover:-translate-y-0.5 sm:h-[58px] sm:px-6 sm:text-[17px]"
                >
                  <WhatsAppGlyph size={20} color="#0B1026" />
                  Build the real one with us
                </a>
                <a
                  href={shareHref(name, typeId)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('preview_share')}
                  className="flex h-[52px] items-center rounded-[15px] border border-white/40 px-4 text-[14.5px] font-semibold text-white transition-colors hover:border-white sm:h-[58px] sm:px-5"
                >
                  Show someone
                </a>
              </div>
              <p className="mt-2.5 max-w-[500px] text-[13px] leading-[1.45] text-white/85">
                This is a quick sample. Your real website is designed from scratch around your business.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-[13.5px] text-white/85 sm:mt-5 sm:text-[15px]">
              No signup. No phone number.{' '}
              <a href="#work" className="font-semibold text-white underline decoration-marker decoration-2 underline-offset-4">
                See real client websites
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Verifiable proof, on the first screen of a laptop */}
      <div className="relative border-t border-white/20 bg-blueprint-deep/70">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-4 px-4 py-2 sm:gap-x-6 sm:px-6">
          <span className="sheet-label w-full pt-1.5 !text-[11px] text-white/80 sm:w-auto sm:pt-0">Built by us, live now</span>
          {homepageProjects.map((p) => (
            <a
              key={p.slug}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('client_site_open', { content_name: p.slug })}
              className="py-2 text-[14px] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-marker"
            >
              {getDomain(p.href)}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
