import { useEffect } from 'react'
import { useAnimate, useReducedMotion } from 'framer-motion'
import { wordToVisemes, type SpeechCue } from '../utils/lipSync'

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
  /** The word currently being spoken; drives the mouth shapes. */
  cue: SpeechCue | null
}

/**
 * Brings the still photo to life: she breathes, blinks at natural random
 * intervals, and while speaking her lips form each word's shapes (open for
 * "a", rounded for "o"/"u", closed for "m"/"b"/"p") in time with the voice,
 * with her head moving on the stressed words.
 */
export function LiveAvatar({ src, width, height, speaking, cue }: LiveAvatarProps) {
  const reduced = useReducedMotion()
  const [bodyRef, animateBody] = useAnimate<HTMLSpanElement>()
  const [eyesRef, animateEyes] = useAnimate<HTMLSpanElement>()
  const [mouthRef, animateMouth] = useAnimate<HTMLSpanElement>()

  // Play one word's mouth shapes across its expected duration. A new word
  // interrupts the previous one, so the mouth always follows the voice.
  useEffect(() => {
    const mouth = mouthRef.current
    if (!cue || !mouth) return
    const shapes = reduced ? [] : wordToVisemes(cue.word)
    if (!shapes.length || cue.ms <= 0) {
      animateMouth(mouth, { scaleY: 0.1, scaleX: 1, opacity: 0.15 }, { duration: 0.12 })
      return
    }
    const total = shapes.reduce((n, v) => n + v.weight, 0)
    const times = [0]
    let acc = 0
    for (const v of shapes) {
      acc += v.weight
      times.push(Math.min(0.92, (acc - v.weight * 0.5) / total))
    }
    times.push(1)
    animateMouth(
      mouth,
      {
        scaleY: [null, ...shapes.map((v) => 0.1 + v.open * 0.9), 0.2],
        scaleX: [null, ...shapes.map((v) => 0.78 + v.wide * 0.34), 1],
        opacity: [null, ...shapes.map((v) => (v.open < 0.05 ? 0.12 : 0.35 + v.open * 0.6)), 0.25],
      },
      { duration: cue.ms / 1000, times, ease: 'easeInOut' },
    )

    // Head and body follow the rhythm, moving more on open, stressed words.
    const body = bodyRef.current
    const stress = Math.max(...shapes.map((v) => v.open))
    if (body && cue.word.length > 2) {
      const tilt = (Math.random() - 0.5) * 2.4 * stress
      animateBody(body, { rotate: [null, tilt, tilt * 0.35], y: [null, -2.6 * stress, -0.5] }, { duration: 0.42, ease: 'easeOut' })
    }
  }, [cue, reduced, animateMouth, animateBody, mouthRef, bodyRef])

  // Settle back to rest when she stops talking.
  useEffect(() => {
    if (speaking) return
    if (bodyRef.current) animateBody(bodyRef.current, { rotate: 0, y: 0 }, { duration: 0.5, ease: 'easeOut' })
    if (mouthRef.current) animateMouth(mouthRef.current, { scaleY: 0.1, scaleX: 1, opacity: 0 }, { duration: 0.2 })
  }, [speaking, animateBody, animateMouth, bodyRef, mouthRef])

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
