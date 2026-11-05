import type { BusinessTypeId } from './businessTypes'
import clinic from '../../assets/studio/clinic.webp'
import food from '../../assets/studio/food.webp'
import salon from '../../assets/studio/salon.webp'
import gym from '../../assets/studio/gym.webp'
import home from '../../assets/studio/home.webp'
import study from '../../assets/studio/study.webp'
import craft from '../../assets/studio/craft.webp'
import office from '../../assets/studio/office.webp'

export { default as clinicCare } from '../../assets/studio/clinic-care.webp'
export { default as dishCurry } from '../../assets/studio/dish-curry.webp'
export { default as dishSamosa } from '../../assets/studio/dish-samosa.webp'
export { default as dishBowl } from '../../assets/studio/dish-bowl.webp'
export { default as beautyHair } from '../../assets/studio/beauty-hair.webp'
export { default as beautyMakeup } from '../../assets/studio/beauty-makeup.webp'
export { default as beautySkin } from '../../assets/studio/beauty-skin.webp'
export { default as gymFloor } from '../../assets/studio/gym-floor.webp'
export { default as homeVilla } from '../../assets/studio/home-villa.webp'
export { default as homeFlats } from '../../assets/studio/home-flats.webp'
export { default as homeLiving } from '../../assets/studio/home-living.webp'
export { default as studyLibrary } from '../../assets/studio/study-library.webp'
export { default as studyNotes } from '../../assets/studio/study-notes.webp'
export { default as craftCups } from '../../assets/studio/craft-cups.webp'
export { default as craftPlates } from '../../assets/studio/craft-plates.webp'
export { default as craftVases } from '../../assets/studio/craft-vases.webp'
export { default as craftCandle } from '../../assets/studio/craft-candle.webp'

/** The main photo of each sample site. Stock photography (Unsplash), there to show the design, not real clients. */
export const heroPhotos: Record<BusinessTypeId, string> = {
  clinic,
  restaurant: food,
  salon,
  gym,
  realty: home,
  coaching: study,
  shop: craft,
  other: office,
}
