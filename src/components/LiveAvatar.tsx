import { useCallback, useEffect, useRef } from 'react'
import { useAnimate, useReducedMotion } from 'framer-motion'

interface Feature {
  /** Centre, as % of the image width / height. */
  x: number
  y: number
  /** Size, as % of the image width / height. */
  w: number
  h: number
  /** Tilt in degrees, following the head angle in the photo. */
  rotate: number
}

// Measured on ai-modal.png (1305×1206). If the photo changes, re-measure these.
const EYES: (Feature & { lid: string })[] = [
  { x: 47.3, y: 20.4, w: 3.5, h: 2.2, rotate: 12, lid: 'linear-gradient(to bottom, #b07660 0%, #9a624d 72%, #2a1812 90%)' },
  { x: 55.3, y: 23.0, w: 5.1, h: 2.5, rotate: 10, lid: 'linear-gradient(to bottom, #b37861 0%, #9c6751 72%, #2a1812 90%)' },
]
const MOUTH: Feature = { x: 48.3, y: 30.6, w: 4.5, h: 1.7, rotate: 14 }

function place(f: Feature) {
  return {
    left: `${f.x}%`,
    top: `${f.y}%`,
    width: `${f.w}%`,
    height: `${f.h}%`,
    transform: `translate(-50%, -50%) rotate(${f.rotate}deg)`,
  } as const
}

interface LiveAvatarProps {
  src: string
  width: number
  height: number
  speaking: boolean
  /** Increments on every spoken word (speech `boundary` events). */
  wordTick: number
}

/**
 * Brings the still photo to life: she breathes, blinks at natural random
 * intervals, and while speaking her head/body moves and her lips part in time
 * with each word. Browsers that don't report word timings get an even rhythm
 * instead.
 */
export function LiveAvatar({ src, width, height, speaking, wordTick }: LiveAvatarProps) {
  const reduced = useReducedMotion()
  const [bodyRef, animateBody] = useAnimate<HTMLSpanElement>()
  const [eyesRef, animateEyes] = useAnimate<HTMLSpanElement>()
  const [mouthRef, animateMouth] = useAnimate<HTMLSpanElement>()
  const lastWord = useRef(0)

  const syllable = useCallback(() => {
    if (reduced || !bodyRef.current || !mouthRef.current) return
    const tilt = (Math.random() - 0.5) * 2.6
    animateBody(bodyRef.current, { rotate: [null, tilt, tilt * 0.35], y: [null, -2.5, -0.5] }, { duration: 0.38, ease: 'easeOut' })
    animateMouth(
      mouthRef.current,
      { scaleY: [0.1, 0.55 + Math.random() * 0.45, 0.1], opacity: [0.2, 0.9, 0.2] },
      { duration: 0.18 + Math.random() * 0.1, ease: 'easeInOut' },
    )
  }, [reduced, animateBody, animateMouth, bodyRef, mouthRef])

  // A lip/head movement on every spoken word.
  useEffect(() => {
    if (!wordTick) return
    lastWord.current = Date.now()
    syllable()
  }, [wordTick, syllable])

  // Keep the lips moving through long words, or on voices that never report
  // word boundaries; settle back to rest when she stops talking.
  useEffect(() => {
    if (!speaking) {
      if (bodyRef.current) animateBody(bodyRef.current, { rotate: 0, y: 0 }, { duration: 0.5, ease: 'easeOut' })
      if (mouthRef.current) animateMouth(mouthRef.current, { scaleY: 0.1, opacity: 0 }, { duration: 0.2 })
      return
    }
    const id = window.setInterval(() => {
      if (Date.now() - lastWord.current > 420) syllable()
    }, 260)
    return () => window.clearInterval(id)
  }, [speaking, syllable, animateBody, animateMouth, bodyRef, mouthRef])

  // Natural blinking: every 2.5–5.5s, occasionally a double blink.
  useEffect(() => {
    if (reduced) return
    let timer = 0
    const blink = async () => {
      const lids = eyesRef.current?.querySelectorAll('[data-lid]')
      if (lids?.length) {
        await animateEyes(lids, { scaleY: [0, 1, 1, 0] }, { duration: 0.2, times: [0, 0.35, 0.55, 1], ease: 'easeInOut' })
        if (Math.random() < 0.2) await animateEyes(lids, { scaleY: [0, 1, 1, 0] }, { duration: 0.2, times: [0, 0.35, 0.55, 1], delay: 0.08 })
      }
      timer = window.setTimeout(blink, 2500 + Math.random() * 3000)
    }
    timer = window.setTimeout(blink, 1500)
    return () => window.clearTimeout(timer)
  }, [reduced, animateEyes, eyesRef])

  return (
    <span className="nh-breathe relative block" style={{ transformOrigin: '50% 100%' }}>
      <span ref={bodyRef} className="relative block" style={{ transformOrigin: '50% 85%' }}>
        <img src={src} alt="" width={width} height={height} draggable={false} className="relative block h-auto w-full select-none" />
        <span ref={eyesRef} aria-hidden>
          {EYES.map((eye, i) => (
            <span key={i} className="pointer-events-none absolute" style={place(eye)}>
              <span
                data-lid
                className="block h-full w-full rounded-[50%]"
                style={{ background: eye.lid, transform: 'scaleY(0)', transformOrigin: '50% 0%' }}
              />
            </span>
          ))}
        </span>
        <span className="pointer-events-none absolute" style={place(MOUTH)} aria-hidden>
          <span
            ref={mouthRef}
            className="block h-full w-full rounded-[50%]"
            style={{
              background: 'radial-gradient(ellipse at 50% 45%, #2e0f10 0%, #4a1a1c 45%, rgba(110,40,42,.6) 75%, transparent 100%)',
              transform: 'scaleY(0.1)',
              transformOrigin: '50% 35%',
              opacity: 0,
            }}
          />
        </span>
      </span>
    </span>
  )
}
