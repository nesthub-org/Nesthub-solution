import type { BusinessTypeId } from './businessTypes'

// The sample websites inside the hero's phone. Each one is drawn at a fixed
// 320px wide (see .ms-scale) in code rather than as an image, so the visitor's
// business name can flow through it as they type and nothing extra downloads.

interface SiteProps {
  name: string
}

/** Long names step down in size so they never push the rest of the page off-screen. */
function fit(name: string, size: number) {
  if (name.length > 26) return size * 0.62
  if (name.length > 16) return size * 0.78
  return size
}

function Nav({ name, ink, mark, markInk, round }: { name: string; ink: string; mark: string; markInk: string; round?: boolean }) {
  return (
    <div className="relative flex items-center justify-between gap-3 px-4 py-3">
      <span className="flex min-w-0 items-center gap-2">
        <span
          className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center text-[13px] font-bold ${round ? 'rounded-full' : 'rounded-[8px]'}`}
          style={{ background: mark, color: markInk }}
        >
          {name.trim().charAt(0).toUpperCase() || '•'}
        </span>
        <span className="truncate text-[12.5px] font-semibold tracking-[-.01em]" style={{ color: ink }}>
          {name}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-[4px]">
        <span className="h-[2px] w-[18px] rounded-full" style={{ background: ink }} />
        <span className="h-[2px] w-[12px] rounded-full" style={{ background: ink }} />
      </span>
    </div>
  )
}

function Clinic({ name }: SiteProps) {
  return (
    <div className="min-h-[800px] bg-[#EEF9F5] pb-8 text-[#06302B]">
      <Nav name={name} ink="#06302B" mark="#0B8F80" markInk="#fff" />
      <div className="relative mx-3 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0DA08F] to-[#086560] px-5 pb-6 pt-5 text-white">
        <svg viewBox="0 0 280 260" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d="M-10 196h86l14-38 24 74 22-60 13 24h141" fill="none" stroke="#fff" strokeOpacity=".24" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          <g transform="translate(216 20)" fill="#fff" fillOpacity=".95">
            <rect x="14" width="16" height="44" rx="5" />
            <rect y="14" width="44" height="16" rx="5" />
          </g>
        </svg>
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10.5px] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7CFFCB]" />
          Open today · 10 am to 8 pm
        </span>
        <p className="relative mt-4 max-w-[220px] font-display font-bold leading-[1.02] tracking-[-.03em]" style={{ fontSize: fit(name, 36) }}>
          {name}
        </p>
        <p className="relative mt-2.5 max-w-[200px] text-[13.5px] leading-[1.35] text-white/85">Care you can trust, close to home.</p>
        <span className="relative mt-4 inline-flex h-[42px] items-center rounded-[13px] bg-white px-4 text-[13.5px] font-bold text-[#086560]">Book appointment</span>
      </div>
      <div className="mt-5 px-4">
        <p className="text-[11px] font-bold uppercase tracking-[.08em] text-[#0B8F80]">Next available</p>
        <div className="mt-2 flex gap-2">
          {['Today 5:30', 'Today 7:00', 'Tmrw 11:00'].map((slot, i) => (
            <span key={slot} className={`flex-1 rounded-[10px] py-2 text-center text-[11.5px] font-semibold ${i === 0 ? 'bg-[#0B8F80] text-white' : 'bg-white text-[#06302B]'}`}>
              {slot}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-2 px-3">
        {['General check-up', 'Specialist consult', 'Lab tests', 'Home visits'].map((row) => (
          <div key={row} className="flex items-center gap-3 rounded-[14px] bg-white p-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CFF1E8] text-[16px] font-bold leading-none text-[#0B8F80]">+</span>
            <span className="text-[13.5px] font-semibold">{row}</span>
            <span className="ml-auto text-[#0B8F80]">→</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Restaurant({ name }: SiteProps) {
  return (
    <div className="relative min-h-[800px] overflow-hidden bg-[#1B0C07] pb-8 text-[#FBEFD9]">
      <svg viewBox="0 0 240 240" className="absolute -right-[58px] top-[26px] h-[196px] w-[196px]" aria-hidden>
        <circle cx="120" cy="120" r="118" fill="#F4E5C8" />
        <circle cx="120" cy="120" r="94" fill="#FFF9EC" />
        <circle cx="120" cy="120" r="70" fill="#D8611A" />
        <path d="M78 104c18-20 56-24 78-4M72 134c22 18 66 22 92-2" fill="none" stroke="#FFD9A0" strokeWidth="5" strokeLinecap="round" />
        <g fill="#FFEFC9">
          <rect x="88" y="108" width="21" height="21" rx="4" transform="rotate(-14 98 118)" />
          <rect x="128" y="96" width="21" height="21" rx="4" transform="rotate(18 138 106)" />
          <rect x="124" y="136" width="21" height="21" rx="4" transform="rotate(-8 134 146)" />
        </g>
        <g fill="#4F9A2E">
          <circle cx="112" cy="146" r="5" />
          <circle cx="150" cy="128" r="5" />
          <circle cx="100" cy="92" r="4" />
          <circle cx="120" cy="120" r="4" />
        </g>
      </svg>
      <Nav name={name} ink="#FBEFD9" mark="#F2A81D" markInk="#1B0C07" round />
      <div className="relative px-5 pt-[176px]">
        <p className="font-serif font-bold italic leading-[1] tracking-[-.02em] [text-shadow:0_2px_18px_rgba(27,12,7,.75)]" style={{ fontSize: fit(name, 44) }}>
          {name}
        </p>
        <p className="mt-3 max-w-[230px] text-[13.5px] leading-[1.4] text-[#FBEFD9]/80">Fresh food. Warm welcome. Every single day.</p>
        <span className="mt-4 inline-flex h-[42px] items-center rounded-full bg-[#F2A81D] px-5 text-[13.5px] font-bold text-[#1B0C07]">Order on WhatsApp</span>
      </div>
      <div className="relative mt-7 px-5">
        <p className="font-serif text-[20px] italic text-[#F2A81D]">Today's menu</p>
        <div className="mt-2 grid gap-3">
          {[
            ['Paneer Tikka', '₹280'],
            ['Masala Dosa', '₹140'],
            ['Dal Makhani', '₹240'],
            ['Filter Coffee', '₹60'],
            ['Gulab Jamun', '₹90'],
          ].map(([dish, price]) => (
            <div key={dish} className="flex items-baseline gap-2 text-[14px]">
              <span className="font-semibold">{dish}</span>
              <span className="flex-1 border-b border-dotted border-[#FBEFD9]/30" />
              <span className="font-semibold text-[#F2A81D]">{price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Salon({ name }: SiteProps) {
  return (
    <div className="min-h-[800px] bg-[#FBE8E2] pb-8 text-center text-[#3F1230]">
      <Nav name={name} ink="#3F1230" mark="#3F1230" markInk="#FBE8E2" round />
      <div className="relative mx-auto mt-1 h-[196px] w-[176px] overflow-hidden rounded-t-full bg-gradient-to-b from-[#EE6A8F] via-[#B81D5B] to-[#5C1447]">
        <svg viewBox="0 0 176 196" className="absolute inset-0 h-full w-full" aria-hidden>
          <path d="M-10 118c34-32 66 22 96-8s54-46 100-18" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3" />
          <path d="M-10 142c34-32 66 22 96-8s54-46 100-18" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" />
          <path d="M-10 166c34-32 66 22 96-8s54-46 100-18" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="3" />
          <path d="M88 34c2 16 6 20 22 22-16 2-20 6-22 22-2-16-6-20-22-22 16-2 20-6 22-22z" fill="#FFE9B0" />
          <path d="M128 72c1 8 3 10 11 11-8 1-10 3-11 11-1-8-3-10-11-11 8-1 10-3 11-11z" fill="#FFE9B0" fillOpacity=".8" />
        </svg>
      </div>
      <p className="mx-auto mt-4 max-w-[290px] px-3 font-serif font-semibold leading-[1.02] tracking-[-.02em]" style={{ fontSize: fit(name, 40) }}>
        {name}
      </p>
      <p className="mt-2 font-serif text-[15px] italic text-[#B81D5B]">Walk in. Glow out.</p>
      <span className="mt-4 inline-flex h-[42px] items-center rounded-full bg-[#3F1230] px-6 text-[13.5px] font-bold text-[#FBE8E2]">Book a slot</span>
      <div className="mt-6 flex justify-center gap-3 px-3">
        {['Hair', 'Skin', 'Bridal', 'Nails'].map((service, i) => (
          <span key={service} className="flex flex-col items-center gap-1.5 text-[11.5px] font-semibold">
            <span className="h-[58px] w-[58px] rounded-full" style={{ background: ['#F4C6BC', '#EE9BB1', '#D9628C', '#7A2A5E'][i] }} />
            {service}
          </span>
        ))}
      </div>
      <div className="mx-4 mt-6 rounded-[18px] bg-white p-4 text-left">
        <p className="font-serif text-[17px] font-semibold">Popular this week</p>
        <div className="mt-2 grid gap-2 text-[13px]">
          {[
            ['Keratin treatment', '2 hrs'],
            ['Glow facial', '60 min'],
            ['Party makeup', '90 min'],
          ].map(([service, time]) => (
            <div key={service} className="flex justify-between">
              <span className="font-semibold">{service}</span>
              <span className="text-[#B81D5B]">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Gym({ name }: SiteProps) {
  return (
    <div className="relative min-h-[800px] overflow-hidden bg-[#0A0A0B] pb-8 text-white">
      <div
        aria-hidden
        className="absolute -right-10 -top-6 h-[290px] w-[230px] opacity-90"
        style={{
          backgroundImage: 'repeating-linear-gradient(-58deg, #C8FF00 0 13px, transparent 13px 36px)',
          maskImage: 'linear-gradient(200deg, black 25%, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(200deg, black 25%, transparent 72%)',
        }}
      />
      <Nav name={name} ink="#fff" mark="#C8FF00" markInk="#0A0A0B" />
      <div className="relative px-5 pt-[56px]">
        <p className="-skew-x-6 font-display font-extrabold uppercase leading-[.92] tracking-[-.03em]" style={{ fontSize: fit(name, 50) }}>
          {name}
        </p>
        <p className="mt-4 text-[14px] font-bold uppercase tracking-[.02em] text-[#C8FF00]">No excuses. Just results.</p>
        <span className="mt-4 inline-flex h-[44px] items-center bg-[#C8FF00] px-5 text-[13.5px] font-extrabold uppercase tracking-[.01em] text-[#0A0A0B]">Book a free trial</span>
      </div>
      <svg viewBox="0 0 280 60" className="relative mt-6 w-full px-5" aria-hidden>
        <rect x="20" y="26" width="240" height="8" rx="3" fill="#fff" fillOpacity=".85" />
        <g fill="#C8FF00">
          <rect x="24" y="6" width="16" height="48" rx="4" />
          <rect x="44" y="14" width="12" height="32" rx="3" />
          <rect x="240" y="6" width="16" height="48" rx="4" />
          <rect x="224" y="14" width="12" height="32" rx="3" />
        </g>
      </svg>
      <div className="relative mt-5 grid gap-px bg-white/15">
        {[
          ['06:00', 'Strength'],
          ['07:30', 'HIIT'],
          ['11:00', 'Personal training'],
          ['18:30', 'Yoga'],
          ['20:00', 'CrossFit'],
        ].map(([time, session]) => (
          <div key={session} className="flex items-center gap-4 bg-[#0A0A0B] px-5 py-3">
            <span className="w-[46px] text-[14px] font-extrabold text-[#C8FF00]">{time}</span>
            <span className="text-[14px] font-bold uppercase">{session}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Realty({ name }: SiteProps) {
  return (
    <div className="min-h-[800px] bg-[#F6F1E4] pb-8 text-[#0F1B3A]">
      <div className="relative overflow-hidden bg-[#0F1B3A] text-white">
        <Nav name={name} ink="#fff" mark="#D4AF37" markInk="#0F1B3A" />
        <div className="relative z-[1] px-5 pb-[126px] pt-5">
          <p className="text-[10.5px] font-bold uppercase tracking-[.16em] text-[#D4AF37]">New launches</p>
          <p className="mt-2 font-serif font-semibold leading-[1.02] tracking-[-.015em]" style={{ fontSize: fit(name, 42) }}>
            {name}
          </p>
          <p className="mt-2.5 max-w-[230px] text-[13.5px] leading-[1.4] text-white/75">Homes you'll never want to leave.</p>
          <span className="mt-4 inline-flex h-[42px] items-center rounded-[4px] bg-[#D4AF37] px-5 text-[13.5px] font-bold text-[#0F1B3A]">Book a site visit</span>
        </div>
        <svg viewBox="0 0 320 120" className="absolute inset-x-0 bottom-0 w-full" aria-hidden>
          <g fill="#1B2C57">
            <rect x="0" y="58" width="56" height="62" />
            <rect x="60" y="24" width="48" height="96" />
            <rect x="112" y="46" width="62" height="74" />
            <rect x="178" y="10" width="52" height="110" />
            <rect x="234" y="52" width="40" height="68" />
            <rect x="278" y="32" width="42" height="88" />
          </g>
          <g fill="#D4AF37">
            {[
              [70, 34], [84, 34], [70, 50], [94, 66], [84, 82], [122, 58], [146, 58], [134, 74], [158, 90],
              [188, 22], [204, 22], [188, 40], [214, 58], [204, 76], [188, 94], [244, 64], [256, 82], [288, 44], [304, 62], [288, 80], [14, 72], [34, 88],
            ].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="8" height="9" rx="1" />
            ))}
          </g>
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 px-3">
        {[
          ['2 BHK', 'Ready to move'],
          ['3 BHK', 'New launch'],
          ['Plots', 'Limited'],
        ].map(([kind, status]) => (
          <div key={kind} className="rounded-[10px] bg-white p-2.5">
            <p className="font-serif text-[17px] font-semibold">{kind}</p>
            <p className="mt-0.5 text-[10px] font-semibold leading-[1.2] text-[#8A6D12]">{status}</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 rounded-[12px] bg-white p-3.5">
        <p className="font-serif text-[18px] font-semibold">Why families choose us</p>
        <div className="mt-2 grid gap-1.5 text-[13px]">
          {['Clear paperwork', 'Good connectivity', 'Support after possession'].map((point) => (
            <p key={point}>
              <span className="mr-1.5 font-bold text-[#8A6D12]">✓</span>
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function Coaching({ name }: SiteProps) {
  return (
    <div className="min-h-[800px] bg-[#FFF5DC] pb-8 text-[#241E6B]">
      <p className="bg-[#FF6A1A] py-1.5 text-center text-[11px] font-bold text-white">Admissions open for the new batch</p>
      <Nav name={name} ink="#241E6B" mark="#241E6B" markInk="#FFF5DC" />
      <div className="relative px-5 pt-2">
        <svg viewBox="0 0 120 96" className="absolute right-3 top-0 h-[92px] w-[116px]" aria-hidden>
          <path d="M60 28C46 16 26 14 8 18v62c18-4 38-2 52 10z" fill="#FF6A1A" />
          <path d="M60 28c14-12 34-14 52-10v62c-18-4-38-2-52 10z" fill="#241E6B" />
          <path d="M18 34c11-2 22-1 32 5M18 48c11-2 22-1 32 5M18 62c11-2 22-1 32 5" stroke="#fff" strokeOpacity=".6" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M102 34c-11-2-22-1-32 5M102 48c-11-2-22-1-32 5M102 62c-11-2-22-1-32 5" stroke="#fff" strokeOpacity=".5" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M92 0l3 9h9l-7 6 3 9-8-5-8 5 3-9-7-6h9z" fill="#FFC21A" />
        </svg>
        <p className="max-w-[190px] pt-[6px] font-display font-extrabold leading-[1] tracking-[-.03em]" style={{ fontSize: fit(name, 37) }}>
          {name}
        </p>
        <p className="mt-3 max-w-[250px] text-[13.5px] leading-[1.4] text-[#241E6B]/80">Results that make parents proud.</p>
        <span className="mt-4 inline-flex h-[42px] items-center rounded-[13px] bg-[#FF6A1A] px-4 text-[13.5px] font-bold text-white">Book a free demo class</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 px-3">
        {[
          ['Class 9 and 10', '#241E6B', '#fff'],
          ['Class 11 and 12', '#FFC21A', '#241E6B'],
          ['Competitive exams', '#FF6A1A', '#fff'],
          ['Crash courses', '#fff', '#241E6B'],
        ].map(([course, bg, ink]) => (
          <div key={course} className="flex min-h-[86px] items-end rounded-[16px] p-3 text-[14px] font-bold leading-[1.15]" style={{ background: bg, color: ink }}>
            {course}
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 rounded-[16px] bg-white p-3.5">
        <p className="text-[14px] font-bold">Timings</p>
        <p className="mt-1 text-[13px] text-[#241E6B]/80">Morning, evening and weekend batches</p>
      </div>
    </div>
  )
}

function Shop({ name }: SiteProps) {
  const products = [
    ['Block print cushion', '₹649', '#C4512D', '#F6D9B8'],
    ['Handmade tote', '₹899', '#2F5D50', '#E7D7A9'],
    ['Clay planter', '₹499', '#8A3B24', '#EBC49F'],
    ['Brass lamp', '₹1,299', '#B98A22', '#2B1A10'],
  ]
  return (
    <div className="min-h-[800px] bg-[#F6EEE1] pb-8 text-[#2B1A10]">
      <Nav name={name} ink="#2B1A10" mark="#C4512D" markInk="#fff" />
      <div className="px-4 pt-1">
        <p className="font-display font-bold leading-[1] tracking-[-.03em]" style={{ fontSize: fit(name, 38) }}>
          {name}
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.35] text-[#2B1A10]/75">Handpicked. Delivered to your door.</p>
        <span className="mt-3 inline-flex h-[40px] items-center rounded-full bg-[#C4512D] px-5 text-[13.5px] font-bold text-white">Shop now</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5 px-3">
        {products.map(([product, price, tile, dot]) => (
          <div key={product} className="overflow-hidden rounded-[14px] bg-white">
            <div
              className="relative h-[108px]"
              style={{
                backgroundColor: tile,
                backgroundImage: `radial-gradient(${dot} 22%, transparent 24%), radial-gradient(${dot} 22%, transparent 24%)`,
                backgroundSize: '26px 26px',
                backgroundPosition: '0 0, 13px 13px',
              }}
            >
              <span className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[17px] font-bold leading-none text-[#2B1A10]">+</span>
            </div>
            <div className="p-2.5">
              <p className="truncate text-[12px] font-semibold">{product}</p>
              <p className="mt-0.5 text-[13px] font-bold text-[#C4512D]">{price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 flex justify-between rounded-[14px] bg-[#2B1A10] p-3.5 text-[12.5px] font-semibold text-[#F6EEE1]">
        <span>Secure checkout</span>
        <span>UPI · Cards</span>
      </div>
    </div>
  )
}

function Other({ name }: SiteProps) {
  return (
    <div className="min-h-[800px] bg-white pb-8 text-[#0B1026]">
      <Nav name={name} ink="#0B1026" mark="#1337CF" markInk="#fff" />
      <div className="relative mx-3 h-[150px] overflow-hidden rounded-[20px] bg-[#1337CF]">
        <span className="absolute -left-6 -top-8 h-[120px] w-[120px] rounded-full bg-[#FFE14D]" />
        <span className="absolute left-[92px] top-[44px] h-[106px] w-[86px] rounded-t-[12px] bg-white/90" />
        <span className="absolute right-[38px] top-[20px] h-[130px] w-[60px] rounded-t-full bg-[#0B1026]" />
      </div>
      <div className="px-4 pt-4">
        <p className="font-display font-bold leading-[1] tracking-[-.03em]" style={{ fontSize: fit(name, 38) }}>
          {name}
        </p>
        <p className="mt-2.5 text-[13.5px] leading-[1.35] text-[#0B1026]/70">Quality work. Honest service.</p>
        <span className="mt-3.5 inline-flex h-[42px] items-center rounded-[12px] bg-[#1337CF] px-5 text-[13.5px] font-bold text-white">Get a quote</span>
      </div>
      <div className="mt-6 grid gap-2 px-3">
        {['Our services', 'Recent work', 'What customers say', 'Visit or call us'].map((row) => (
          <div key={row} className="flex items-center justify-between rounded-[12px] border border-[#E7E9F2] p-3 text-[13.5px] font-semibold">
            {row}
            <span className="text-[#1337CF]">→</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const sites = {
  clinic: Clinic,
  restaurant: Restaurant,
  salon: Salon,
  gym: Gym,
  realty: Realty,
  coaching: Coaching,
  shop: Shop,
  other: Other,
}

export function MiniSite({ typeId, name }: SiteProps & { typeId: BusinessTypeId }) {
  const Site = sites[typeId]
  return <Site name={name} />
}
