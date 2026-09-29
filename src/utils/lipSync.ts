// Text-driven lip sync. The Web Speech API never exposes the audio itself, only
// *which* word is being spoken and when (the `boundary` event), so mouth
// shapes are derived from each word's letters and spread over its estimated
// spoken length.

export interface Viseme {
  /** Jaw opening, 0 (closed) – 1 (wide open). */
  open: number
  /** Lip width, 0 (rounded, "oo") – 1 (stretched, "ee"). */
  wide: number
  /** Relative share of the word's duration. */
  weight: number
}

const VOWEL_SHAPES: Record<string, Omit<Viseme, 'weight'>> = {
  a: { open: 1, wide: 0.6 },
  e: { open: 0.6, wide: 0.9 },
  i: { open: 0.45, wide: 1 },
  y: { open: 0.45, wide: 0.95 },
  o: { open: 0.8, wide: 0.3 },
  u: { open: 0.45, wide: 0.2 },
}

const CLOSED = /[mbp]/ // lips pressed together
const ROUNDED = /[wq]/ // lips pushed forward
const LIP_TEETH = /[fv]/ // lower lip to teeth

// Common short words whose spelling misleads the letter rules.
const ROUND_WORDS = new Set(['to', 'too', 'two', 'do', 'who', 'you', 'your', 'new', 'through', 'into'])
const ROUND: Omit<Viseme, 'weight'> = { open: 0.4, wide: 0.15 } // "oo"
const NEUTRAL: Omit<Viseme, 'weight'> = { open: 0.55, wide: 0.45 } // "uh"

function vowelShape(word: string, start: number, end: number): Omit<Viseme, 'weight'> {
  const cluster = word.slice(start, end + 1)
  const atEnd = end === word.length - 1
  if (cluster === 'oo' || cluster === 'ew' || (cluster === 'ou' && atEnd)) return ROUND
  if (cluster === 'ee' || cluster === 'ea' || cluster === 'ie') return VOWEL_SHAPES.e
  if (cluster === 'o' && atEnd && ROUND_WORDS.has(word)) return ROUND
  // A lone "u" is usually the neutral "uh" (hub, but, up), rounded only
  // after l/r/j ("solution", "rule", "June").
  if (cluster === 'u') return /[lrj]/.test(word[start - 1] ?? '') ? ROUND : NEUTRAL
  return VOWEL_SHAPES[cluster[0]]
}

/** Mouth shapes for one word, in order. */
export function wordToVisemes(raw: string): Viseme[] {
  let word = raw.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return []
  // Silent trailing "e" ("welcome", "solution" is fine, "made" → "mad").
  if (word.length > 2 && word.endsWith('e') && !/[aeiouy]/.test(word[word.length - 2])) word = word.slice(0, -1)

  const out: Viseme[] = []
  for (let i = 0; i < word.length; i++) {
    const ch = word[i]
    if (ch === 'y' && i === 0) {
      // Leading "y" is a glide ("you", "yes"), not a vowel of its own.
      out.push({ open: 0.3, wide: 0.9, weight: 0.35 })
    } else if (ch in VOWEL_SHAPES) {
      // A vowel cluster ("ou", "ee", "ai") is one syllable.
      const start = i
      while (i + 1 < word.length && word[i + 1] in VOWEL_SHAPES) i++
      out.push({ ...vowelShape(word, start, i), weight: 1 })
    } else if (CLOSED.test(ch)) {
      out.push({ open: 0, wide: 0.5, weight: 0.45 })
    } else if (ROUNDED.test(ch)) {
      out.push({ open: 0.25, wide: 0.15, weight: 0.4 })
    } else if (LIP_TEETH.test(ch)) {
      out.push({ open: 0.15, wide: 0.6, weight: 0.35 })
    }
    // Other consonants are left out: they're fast tongue movements that read
    // as transitions between the shapes above.
  }
  return out.length ? out : [{ open: 0.3, wide: 0.5, weight: 1 }]
}

/** Roughly how long a word takes to say, in ms, at speech rate 1. */
export function estimateWordMs(word: string): number {
  const shapes = wordToVisemes(word)
  const weight = shapes.reduce((n, v) => n + v.weight, 0)
  return Math.max(140, weight * 190)
}

/** One word to mouth, emitted as the voice reaches it. An empty word closes the mouth. */
export interface SpeechCue {
  id: number
  word: string
  /** How long the mouth should take to shape this word. */
  ms: number
}
