import { lazy, Suspense, useEffect, useState } from 'react'
import assistantFace from '../assets/assistant-face.webp'
import { isPrerendering } from '../hooks/usePrerendering'

const AiAssistant = lazy(() => import('./AiAssistant').then((m) => ({ default: m.AiAssistant })))

const ARRIVE_DELAY_MS = 9000

/**
 * Keeps the assistant, and the animation library it brings along, off the first
 * screen. Larger screens get her after a short delay. Phones get a small button
 * once they scroll past the hero, and only load her if they tap it.
 */
export function AssistantLoader() {
  const [phone, setPhone] = useState(false)
  const [arrived, setArrived] = useState(false)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (isPrerendering()) return
    if (!window.matchMedia('(max-width: 639px)').matches) {
      const t = window.setTimeout(() => setLoad(true), ARRIVE_DELAY_MS)
      return () => window.clearTimeout(t)
    }
    setPhone(true)
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.8) return
      setArrived(true)
      window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (load) {
    return (
      <Suspense fallback={null}>
        <AiAssistant startOpen={phone} />
      </Suspense>
    )
  }

  if (!phone || !arrived) return null

  return (
    <button
      type="button"
      onClick={() => setLoad(true)}
      aria-label="Chat with our AI assistant"
      className="note-in fixed bottom-[76px] right-3 z-[65] rounded-full shadow-[0_8px_24px_rgba(5,12,60,.3)]"
    >
      <img src={assistantFace} alt="" width={52} height={52} draggable={false} className="block h-[52px] w-[52px] rounded-full bg-brand-100 object-cover" />
    </button>
  )
}
