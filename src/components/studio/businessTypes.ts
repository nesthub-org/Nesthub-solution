export type BusinessTypeId = 'clinic' | 'restaurant' | 'salon' | 'gym' | 'realty' | 'coaching' | 'shop' | 'other'

export interface BusinessType {
  id: BusinessTypeId
  /** Chip label */
  label: string
  /** Fills the headline: "What's your {noun} called?" */
  noun: string
  /** Typed into the preview by the attract-mode demo. */
  sample: string
  /** Callouts around the phone: what this kind of business would get. */
  notes: [string, string, string]
  /** What a customer might send from this kind of site. Shown as a clearly marked example. */
  enquiry: string
  /** Words in a business name that give its type away. */
  keywords: string[]
}

export const businessTypes: Record<BusinessTypeId, BusinessType> = {
  clinic: {
    id: 'clinic',
    label: 'Clinic',
    noun: 'clinic',
    sample: 'Sharma Dental Clinic',
    notes: ['Online booking', 'WhatsApp button', 'Fast on any network'],
    enquiry: 'Can I book a check-up for tomorrow?',
    keywords: ['clinic', 'dental', 'dentist', 'hospital', 'doctor', 'dr', 'physio', 'physiotherapy', 'diagnostic', 'diagnostics', 'pharmacy', 'medical', 'ayurveda', 'ayurvedic', 'nursing', 'healthcare'],
  },
  restaurant: {
    id: 'restaurant',
    label: 'Restaurant',
    noun: 'restaurant',
    sample: 'Café Aroma',
    notes: ['Phone-friendly menu', 'WhatsApp orders', 'On Google Maps'],
    enquiry: 'Do you have a table for 4 at 8 pm?',
    keywords: ['restaurant', 'cafe', 'café', 'dhaba', 'kitchen', 'bakery', 'sweets', 'mithai', 'food', 'foods', 'biryani', 'pizza', 'tiffin', 'catering', 'caterers', 'bistro', 'lounge'],
  },
  salon: {
    id: 'salon',
    label: 'Salon',
    noun: 'salon',
    sample: 'Glow Studio',
    notes: ['Online slot booking', 'Show off your looks', 'WhatsApp button'],
    enquiry: 'Any slot for a haircut this Sunday?',
    keywords: ['salon', 'parlour', 'parlor', 'beauty', 'spa', 'makeup', 'barber', 'unisex', 'nails', 'mehendi', 'mehndi', 'glow'],
  },
  gym: {
    id: 'gym',
    label: 'Gym',
    noun: 'gym',
    sample: 'Iron Temple Fitness',
    notes: ['Trial sign-ups', 'Class timings', 'Fast on any network'],
    enquiry: 'How do I start the free trial?',
    keywords: ['gym', 'gymnasium', 'fitness', 'crossfit', 'yoga', 'zumba', 'muscle'],
  },
  realty: {
    id: 'realty',
    label: 'Real estate',
    noun: 'realty firm',
    sample: 'Skyline Homes',
    notes: ['Site visit booking', 'A page per project', 'WhatsApp enquiries'],
    enquiry: 'Can I visit the 3 BHK this weekend?',
    keywords: ['realty', 'realtors', 'estate', 'estates', 'homes', 'properties', 'property', 'builders', 'developers', 'infra', 'infratech', 'construction', 'constructions', 'interiors'],
  },
  coaching: {
    id: 'coaching',
    label: 'Coaching',
    noun: 'institute',
    sample: 'Bright Minds Academy',
    notes: ['Demo class booking', 'Courses and batches', 'WhatsApp enquiries'],
    enquiry: 'When is the next demo class?',
    keywords: ['academy', 'classes', 'coaching', 'institute', 'tutorial', 'tutorials', 'school', 'college', 'education', 'learning', 'tuition'],
  },
  shop: {
    id: 'shop',
    label: 'Shop',
    noun: 'shop',
    sample: 'Aanya Handicrafts',
    notes: ['Secure checkout', 'Add your products', 'Orders on your phone'],
    enquiry: 'Do you deliver to Jaipur?',
    keywords: ['shop', 'store', 'stores', 'mart', 'boutique', 'jeweller', 'jewellers', 'jewelers', 'jewellery', 'handicraft', 'handicrafts', 'fashion', 'garments', 'textiles', 'kirana', 'traders', 'collection', 'collections', 'saree', 'sarees', 'emporium'],
  },
  other: {
    id: 'other',
    label: 'Other',
    noun: 'business',
    sample: 'Mehta & Sons',
    notes: ['Your services, explained', 'WhatsApp enquiries', 'Easy to find on Google'],
    enquiry: 'Can I get a quote for this?',
    keywords: [],
  },
}

export const businessTypeList = Object.values(businessTypes)

export function isBusinessType(value: string | null | undefined): value is BusinessTypeId {
  return !!value && value in businessTypes
}

const typeByKeyword = new Map(businessTypeList.flatMap((t) => t.keywords.map((k) => [k, t.id] as const)))

/** Reads the type off a name. Checked from the last word, since "Home Bakery" is a bakery. */
export function detectBusinessType(name: string): BusinessTypeId | null {
  const words = name.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  for (let i = words.length - 1; i >= 0; i -= 1) {
    const match = typeByKeyword.get(words[i])
    if (match) return match
  }
  return null
}

/** The address bar in the preview: "Sharma Dental Clinic" becomes sharmadentalclinic.in */
export function previewDomain(name: string): string {
  const slug = name.normalize('NFD').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 26)
  return `${slug || 'yourbusiness'}.in`
}
