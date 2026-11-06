import type { CSSProperties, ReactNode } from 'react'
import type { BusinessTypeId } from './businessTypes'
import {
  beautyHair,
  beautyMakeup,
  beautySkin,
  clinicCare,
  craftCandle,
  craftCups,
  craftPlates,
  craftVases,
  dishBowl,
  dishCurry,
  dishSamosa,
  gymFloor,
  heroPhotos,
  homeFlats,
  homeLiving,
  homeVilla,
  studyLibrary,
  studyNotes,
} from './photos'

// The sample websites inside the hero's phone. Each one is laid out at a fixed
// 320px wide (see .ms-scale) in code, so the visitor's business name can flow
// through it as they type. A phone screen only shows the top 180 to 400px of it,
// which is why the name and the main button sit as high up as they do.
// Clinic's photo is on screen at first paint, so no other site's photo may cover
// more area: a bigger one later would count as the page's main content loading late.

interface SiteProps {
  name: string
}

/** Long names step down in size so they never push the rest of the page off-screen. */
function fit(name: string, size: number) {
  if (name.length > 26) return size * 0.62
  if (name.length > 16) return size * 0.78
  return size
}

/** Order in which a piece settles into place when the site builds. See .ms-in. */
const seq = (i: number) => ({ '--i': i }) as CSSProperties

function HeroPhoto({ id, className = '' }: { id: BusinessTypeId; className?: string }) {
  return <img src={heroPhotos[id]} alt="" decoding={id === 'clinic' ? 'sync' : 'async'} fetchPriority={id === 'clinic' ? 'high' : undefined} className={`ms-kb absolute inset-0 h-full w-full object-cover ${className}`} />
}

function Thumb({ src, className = '' }: { src: string; className?: string }) {
  return <img src={src} alt="" loading="lazy" decoding="async" className={`h-full w-full bg-black/10 object-cover ${className}`} />
}

function Glyph({ d, color, size = 16 }: { d: string; color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <path d={d} />
    </svg>
  )
}

const PHONE = 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z'
const BAG = 'M6 8h12l1 12H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2'
const PIN = 'M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z'
const HEART = 'M12 20s-7.5-4.6-9.2-9A5 5 0 0 1 12 6.4 5 5 0 0 1 21.2 11c-1.7 4.4-9.2 9-9.2 9Z'
const CHECK = 'm5 12.5 4.5 4.5L19 7.5'
const ARROW = 'M5 12h14M13 6l6 6-6 6'

function Nav({ name, ink, mark, markInk, round, overlay, end }: { name: string; ink: string; mark: string; markInk: string; round?: boolean; overlay?: boolean; end?: ReactNode }) {
  return (
    <div className={`z-[1] flex items-center justify-between gap-3 px-4 py-3 ${overlay ? 'absolute inset-x-0 top-0' : 'relative'}`}>
      <span className="flex min-w-0 items-center gap-2">
        <span className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center text-[13px] font-bold ${round ? 'rounded-full' : 'rounded-[8px]'}`} style={{ background: mark, color: markInk }}>
          {name.trim().charAt(0).toUpperCase() || '•'}
        </span>
        <span className="truncate text-[12.5px] font-semibold tracking-[-.01em]" style={{ color: ink }}>
          {name}
        </span>
      </span>
      {end ?? (
        <span className="flex shrink-0 flex-col items-end gap-[4px]">
          <span className="h-[2px] w-[18px] rounded-full" style={{ background: ink }} />
          <span className="h-[2px] w-[12px] rounded-full" style={{ background: ink }} />
        </span>
      )}
    </div>
  )
}

function Foot({ name, bg, ink, accent }: { name: string; bg: string; ink: string; accent: string }) {
  return (
    <div className="mt-5 flex-1 px-4 py-5 text-left text-[12.5px]" style={{ background: bg, color: ink }}>
      <p className="font-display text-[16px] font-bold tracking-[-.02em]">{name}</p>
      <p className="mt-2 flex items-center gap-1.5">
        <Glyph d={PIN} color={accent} size={14} />
        Find us on Google Maps
      </p>
      <p className="mt-1.5 flex items-center gap-1.5">
        <Glyph d={PHONE} color={accent} size={14} />
        Call or WhatsApp us
      </p>
    </div>
  )
}

function Clinic({ name }: SiteProps) {
  return (
    <div className="flex min-h-[800px] flex-col bg-white text-[#06302B]">
      <Nav name={name} ink="#06302B" mark="#0B8F80" markInk="#fff" />
      <div className="relative mx-3 h-[calc(232px*var(--hero-k,1))] overflow-hidden rounded-[22px] bg-[#cfe6e6]">
        <HeroPhoto id="clinic" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#042F2B] via-[#042F2B]/35 to-transparent" />
        <span className="ms-in absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-bold text-[#086560]" style={seq(0)}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          Open today · 10 am to 8 pm
        </span>
        <div className="absolute inset-x-4 bottom-3.5 text-white">
          <p className="ms-in font-display font-bold leading-[1.02] tracking-[-.03em]" style={{ ...seq(1), fontSize: fit(name, 36) }}>
            {name}
          </p>
          <p className="ms-in mt-1 text-[13.5px] leading-[1.3] text-white/90" style={seq(2)}>
            Care you can trust, close to home.
          </p>
        </div>
      </div>
      <div className="ms-in mt-3 flex gap-2 px-3" style={seq(3)}>
        <span className="ms-cta flex h-[46px] flex-1 items-center justify-center rounded-[14px] bg-[#0B8F80] text-[14px] font-bold text-white">Book appointment</span>
        <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-[#E3F6F1]">
          <Glyph d={PHONE} color="#0B8F80" />
        </span>
      </div>
      <div className="mt-5 px-4">
        <p className="text-[11px] font-bold uppercase tracking-[.08em] text-[#0B8F80]">Next available</p>
        <div className="mt-2 flex gap-2">
          {['Today 5:30', 'Today 7:00', 'Tmrw 11:00'].map((slot, i) => (
            <span key={slot} className={`flex-1 rounded-[10px] py-2 text-center text-[11.5px] font-semibold ${i === 0 ? 'bg-[#0B8F80] text-white' : 'bg-[#EEF9F5] text-[#06302B]'}`}>
              {slot}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 px-3">
        {['General check-up', 'Specialist consult', 'Lab tests', 'Home visits'].map((row) => (
          <div key={row} className="rounded-[14px] bg-[#EEF9F5] p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[15px] font-bold leading-none text-[#0B8F80]">+</span>
            <p className="mt-2 text-[13px] font-semibold leading-[1.2]">{row}</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 flex items-center gap-3 rounded-[16px] border border-[#D9EEE8] p-3">
        <span className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[12px]">
          <Thumb src={clinicCare} />
        </span>
        <span>
          <span className="block text-[11px] tracking-[1px] text-[#F5A524]">★★★★★</span>
          <span className="mt-0.5 block text-[12.5px] font-medium leading-[1.3]">“Gentle, on time and spotless.”</span>
        </span>
      </div>
      <Foot name={name} bg="#06302B" ink="#fff" accent="#5EEAD4" />
    </div>
  )
}

function Restaurant({ name }: SiteProps) {
  const dishes = [
    ['House Curry', '₹280', dishCurry],
    ['Samosa Chaat', '₹90', dishSamosa],
    ['Garden Bowl', '₹220', dishBowl],
  ]
  return (
    <div className="flex min-h-[800px] flex-col bg-[#140906] text-[#FBEFD9]">
      <div className="relative h-[calc(214px*var(--hero-k,1))] overflow-hidden bg-[#3a1c10]">
        <HeroPhoto id="restaurant" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-[#140906]" />
        <Nav name={name} ink="#fff" mark="#F2A81D" markInk="#140906" round overlay />
        <div className="absolute inset-x-5 bottom-1">
          <p className="ms-in text-[10.5px] font-bold uppercase tracking-[.18em] text-[#F2A81D]" style={seq(0)}>
            Open till 11 pm
          </p>
          <p className="ms-in mt-1 font-serif font-bold italic leading-[1] tracking-[-.02em] [text-shadow:0_2px_16px_rgba(0,0,0,.55)]" style={{ ...seq(1), fontSize: fit(name, 46) }}>
            {name}
          </p>
        </div>
      </div>
      <div className="px-5">
        <p className="ms-in mt-2 text-[13.5px] leading-[1.35] text-[#FBEFD9]/85" style={seq(2)}>
          Fresh food. Warm welcome. Every single day.
        </p>
        <div className="ms-in mt-3 flex gap-2" style={seq(3)}>
          <span className="ms-cta flex h-[44px] flex-1 items-center justify-center rounded-full bg-[#F2A81D] text-[13.5px] font-bold text-[#140906]">Order on WhatsApp</span>
          <span className="flex h-[44px] items-center rounded-full border border-[#FBEFD9]/35 px-4 text-[13px] font-semibold">Book a table</span>
        </div>
        <p className="mt-6 font-serif text-[20px] italic text-[#F2A81D]">Chef&apos;s specials</p>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {dishes.map(([dish, price, src]) => (
            <div key={dish}>
              <span className="block h-[86px] overflow-hidden rounded-[14px]">
                <Thumb src={src} />
              </span>
              <p className="mt-1.5 text-[11.5px] font-semibold leading-[1.15]">{dish}</p>
              <p className="mt-0.5 text-[12px] font-bold text-[#F2A81D]">{price}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-2.5">
          {[
            ['Masala Dosa', '₹140'],
            ['Dal Makhani', '₹240'],
            ['Filter Coffee', '₹60'],
          ].map(([dish, price]) => (
            <div key={dish} className="flex items-baseline gap-2 text-[13.5px]">
              <span className="font-semibold">{dish}</span>
              <span className="flex-1 border-b border-dotted border-[#FBEFD9]/30" />
              <span className="font-semibold text-[#F2A81D]">{price}</span>
            </div>
          ))}
        </div>
      </div>
      <Foot name={name} bg="#2A120A" ink="#FBEFD9" accent="#F2A81D" />
    </div>
  )
}

function Salon({ name }: SiteProps) {
  const services = [
    ['Hair', beautyHair],
    ['Makeup', beautyMakeup],
    ['Skin', beautySkin],
  ]
  return (
    <div className="flex min-h-[800px] flex-col bg-[#FBEDE8] text-center text-[#3F1230]">
      <p className="bg-[#3F1230] py-1.5 text-[11px] font-semibold text-[#FBEDE8]">Bridal bookings now open</p>
      <Nav name={name} ink="#3F1230" mark="#3F1230" markInk="#FBEDE8" round />
      <p className="ms-in mx-auto max-w-[290px] px-3 font-serif font-semibold leading-[1.02] tracking-[-.02em]" style={{ ...seq(0), fontSize: fit(name, 40) }}>
        {name}
      </p>
      <p className="ms-in mt-1 font-serif text-[15px] italic text-[#B81D5B]" style={seq(1)}>
        Walk in. Glow out.
      </p>
      <div className="relative mx-auto mt-4 h-[200px] w-[244px]">
        <span className="absolute -inset-[7px] bottom-0 rounded-t-[130px] border border-[#B81D5B]/40" />
        <div className="relative h-full overflow-hidden rounded-t-[122px] bg-[#EFC9CF]">
          <HeroPhoto id="salon" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5C1447]/55 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-3.5 flex justify-center">
          <span className="ms-in ms-cta inline-flex h-[42px] items-center rounded-full bg-[#3F1230] px-7 text-[13.5px] font-bold text-[#FBEDE8]" style={seq(2)}>
            Book a slot
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-4 px-3">
        {services.map(([service, src]) => (
          <span key={service} className="flex flex-col items-center gap-1.5 text-[12px] font-semibold">
            <span className="block h-[72px] w-[72px] overflow-hidden rounded-full ring-2 ring-white">
              <Thumb src={src} />
            </span>
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
      <Foot name={name} bg="#3F1230" ink="#FBEDE8" accent="#F7A8C4" />
    </div>
  )
}

function Gym({ name }: SiteProps) {
  return (
    <div className="flex min-h-[800px] flex-col bg-[#0A0A0B] text-white">
      <div className="relative h-[calc(214px*var(--hero-k,1))] overflow-hidden bg-[#222]">
        <HeroPhoto id="gym" className="grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#0A0A0B]" />
        <div
          aria-hidden
          className="absolute -right-8 -top-4 h-[180px] w-[150px]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-58deg, #C8FF00 0 10px, transparent 10px 30px)',
            maskImage: 'linear-gradient(205deg, black 15%, transparent 65%)',
            WebkitMaskImage: 'linear-gradient(205deg, black 15%, transparent 65%)',
          }}
        />
        <Nav name={name} ink="#fff" mark="#C8FF00" markInk="#0A0A0B" overlay />
        <div className="absolute inset-x-5 bottom-2">
          <p className="ms-in -skew-x-6 font-display font-extrabold uppercase leading-[.92] tracking-[-.03em]" style={{ ...seq(0), fontSize: fit(name, 50) }}>
            {name}
          </p>
        </div>
      </div>
      <div className="px-5">
        <p className="ms-in mt-2 text-[14px] font-bold uppercase tracking-[.02em] text-[#C8FF00]" style={seq(1)}>
          No excuses. Just results.
        </p>
        <span className="ms-in ms-cta mt-3 inline-flex h-[44px] items-center gap-2 bg-[#C8FF00] px-5 text-[13.5px] font-extrabold uppercase tracking-[.01em] text-[#0A0A0B]" style={seq(2)}>
          Book a free trial
          <Glyph d={ARROW} color="#0A0A0B" size={15} />
        </span>
      </div>
      <div className="mx-5 mt-5 flex items-center gap-3 border-l-[3px] border-[#C8FF00] pl-3">
        <span className="h-[62px] w-[86px] shrink-0 overflow-hidden">
          <Thumb src={gymFloor} className="grayscale" />
        </span>
        <p className="text-[12.5px] font-semibold leading-[1.3] text-white/85">Full strength floor, trainers on every shift.</p>
      </div>
      <div className="mt-5 grid gap-px bg-white/15">
        {[
          ['06:00', 'Strength'],
          ['07:30', 'HIIT'],
          ['11:00', 'Personal training'],
          ['18:30', 'Yoga'],
          ['20:00', 'CrossFit'],
        ].map(([time, session]) => (
          <div key={session} className="flex items-center gap-4 bg-[#0A0A0B] px-5 py-2.5">
            <span className="w-[46px] text-[14px] font-extrabold text-[#C8FF00]">{time}</span>
            <span className="text-[13.5px] font-bold uppercase">{session}</span>
          </div>
        ))}
      </div>
      <Foot name={name} bg="#C8FF00" ink="#0A0A0B" accent="#0A0A0B" />
    </div>
  )
}

function Realty({ name }: SiteProps) {
  const homes = [
    ['3 BHK Villa', 'Ready to move', homeVilla],
    ['2 BHK Apartments', 'New launch', homeFlats],
  ]
  return (
    <div className="flex min-h-[800px] flex-col bg-[#F6F1E4] text-[#0F1B3A]">
      <div className="relative h-[calc(214px*var(--hero-k,1))] overflow-hidden bg-[#1B2C57] text-white">
        <HeroPhoto id="realty" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1B3A]/75 via-[#0F1B3A]/45 to-[#0F1B3A]" />
        <Nav name={name} ink="#fff" mark="#D4AF37" markInk="#0F1B3A" overlay />
        <div className="absolute inset-x-5 bottom-7">
          <p className="ms-in text-[10.5px] font-bold uppercase tracking-[.14em] text-[#FFD95E] [text-shadow:0_1px_8px_rgba(8,14,44,.9)]" style={seq(0)}>
            Homes you&apos;ll never want to leave
          </p>
          <p className="ms-in mt-1 font-serif font-semibold leading-[1.02] tracking-[-.015em] [text-shadow:0_2px_14px_rgba(8,14,44,.8)]" style={{ ...seq(1), fontSize: fit(name, 40) }}>
            {name}
          </p>
        </div>
      </div>
      <div className="ms-in relative z-[1] mx-3 -mt-5 rounded-[16px] bg-white p-3 shadow-[0_12px_28px_rgba(15,27,58,.2)]" style={seq(2)}>
        <div className="flex gap-1.5 text-[12px] font-semibold">
          <span className="rounded-full bg-[#0F1B3A] px-3 py-1 text-white">Buy</span>
          <span className="rounded-full px-3 py-1 text-[#0F1B3A]/70">Rent</span>
          <span className="rounded-full px-3 py-1 text-[#0F1B3A]/70">Plots</span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[#F6F1E4] px-2.5 py-2 text-[12.5px] text-[#0F1B3A]/70">
          <Glyph d={PIN} color="#8A6D12" size={14} />
          Where are you looking?
        </div>
        <span className="ms-cta mt-2 flex h-[40px] items-center justify-center rounded-[10px] bg-[#D4AF37] text-[13.5px] font-bold text-[#0F1B3A]">Book a site visit</span>
      </div>
      <p className="mt-5 px-4 font-serif text-[18px] font-semibold">Featured homes</p>
      <div className="mt-2 grid grid-cols-2 gap-2 px-3">
        {homes.map(([kind, status, src]) => (
          <div key={kind} className="overflow-hidden rounded-[14px] bg-white">
            <span className="block h-[92px]">
              <Thumb src={src} />
            </span>
            <p className="px-2.5 pt-2 text-[12.5px] font-bold leading-[1.15]">{kind}</p>
            <p className="px-2.5 pb-2.5 pt-0.5 text-[10.5px] font-semibold text-[#8A6D12]">{status}</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-2 flex items-center gap-3 overflow-hidden rounded-[14px] bg-white pr-3">
        <span className="h-[64px] w-[84px] shrink-0">
          <Thumb src={homeLiving} />
        </span>
        <p className="text-[12.5px] font-semibold leading-[1.3]">Clear paperwork and support after possession.</p>
      </div>
      <Foot name={name} bg="#0F1B3A" ink="#fff" accent="#D4AF37" />
    </div>
  )
}

function Coaching({ name }: SiteProps) {
  return (
    <div className="flex min-h-[800px] flex-col bg-[#FFF5DC] text-[#241E6B]">
      <p className="bg-[#FF6A1A] py-1.5 text-center text-[11px] font-bold text-white">Admissions open for the new batch</p>
      <Nav name={name} ink="#241E6B" mark="#241E6B" markInk="#FFF5DC" />
      <div className="px-4">
        <p className="ms-in font-display font-extrabold leading-[1] tracking-[-.03em]" style={{ ...seq(0), fontSize: fit(name, 35) }}>
          {name}
        </p>
        <p className="ms-in mt-1.5 text-[13.5px] leading-[1.35] text-[#241E6B]/85" style={seq(1)}>
          Results that make parents proud.
        </p>
        <span className="ms-in ms-cta mt-3 inline-flex h-[42px] items-center rounded-[13px] bg-[#FF6A1A] px-4 text-[13.5px] font-bold text-white" style={seq(2)}>
          Book a free demo class
        </span>
      </div>
      <div className="relative mx-3 mt-3.5 h-[140px] overflow-hidden rounded-[20px] bg-[#FFE7A8]">
        <HeroPhoto id="coaching" className="object-left" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6A1A]/30 to-[#FFC21A]/20" />
        <span className="absolute right-3 top-3 w-[122px] rounded-[12px] bg-white p-2.5 text-[12px] font-bold leading-[1.2] shadow-[0_8px_20px_rgba(36,30,107,.22)]">
          Morning, evening and weekend batches
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 px-3">
        {[
          ['Class 9 and 10', '#241E6B', '#fff'],
          ['Class 11 and 12', '#FFC21A', '#241E6B'],
          ['Competitive exams', '#FF6A1A', '#fff'],
          ['Crash courses', '#fff', '#241E6B'],
        ].map(([course, bg, ink]) => (
          <div key={course} className="flex min-h-[72px] items-end rounded-[16px] p-3 text-[13.5px] font-bold leading-[1.15]" style={{ background: bg, color: ink }}>
            {course}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 px-3">
        {[
          [studyLibrary, 'Reading library'],
          [studyNotes, 'Printed notes'],
        ].map(([src, label]) => (
          <div key={label} className="relative h-[84px] overflow-hidden rounded-[16px]">
            <Thumb src={src} />
            <span className="absolute inset-0 bg-gradient-to-t from-[#241E6B]/80 to-transparent" />
            <span className="absolute bottom-2 left-2.5 text-[12.5px] font-bold text-white">{label}</span>
          </div>
        ))}
      </div>
      <Foot name={name} bg="#241E6B" ink="#fff" accent="#FFC21A" />
    </div>
  )
}

function Shop({ name }: SiteProps) {
  const products = [
    ['Stoneware cups', '₹649', craftCups],
    ['Hand-glazed plates', '₹899', craftPlates],
    ['Ceramic vases', '₹1,299', craftVases],
    ['Soy candle', '₹499', craftCandle],
  ]
  return (
    <div className="flex min-h-[800px] flex-col bg-[#F6EEE1] text-[#2B1A10]">
      <p className="bg-[#2B1A10] py-1.5 text-center text-[11px] font-semibold text-[#F6EEE1]">New arrivals every week</p>
      <Nav
        name={name}
        ink="#2B1A10"
        mark="#C4512D"
        markInk="#fff"
        end={
          <span className="relative shrink-0">
            <Glyph d={BAG} color="#2B1A10" size={19} />
            <span className="absolute -right-1.5 -top-1 flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#C4512D] text-[8.5px] font-bold text-white">2</span>
          </span>
        }
      />
      <div className="relative h-[calc(176px*var(--hero-k,1))] overflow-hidden bg-[#7a4a33]">
        <HeroPhoto id="shop" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute inset-x-4 bottom-3 text-white">
          <p className="ms-in font-display font-bold leading-[1] tracking-[-.03em]" style={{ ...seq(0), fontSize: fit(name, 34) }}>
            {name}
          </p>
          <p className="ms-in mt-1 text-[12.5px] text-white/90" style={seq(1)}>
            Made by hand. Delivered to your door.
          </p>
        </div>
      </div>
      <div className="ms-in flex items-center gap-1.5 overflow-hidden px-3 pt-3 text-[12px] font-semibold" style={seq(2)}>
        <span className="ms-cta rounded-full bg-[#C4512D] px-3.5 py-1.5 text-white">Shop now</span>
        <span className="rounded-full bg-white px-3 py-1.5">Ceramics</span>
        <span className="rounded-full bg-white px-3 py-1.5">Decor</span>
        <span className="rounded-full bg-white px-3 py-1.5">Gifts</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5 px-3">
        {products.map(([product, price, src]) => (
          <div key={product} className="overflow-hidden rounded-[14px] bg-white">
            <span className="relative block h-[116px]">
              <Thumb src={src} />
              <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90">
                <Glyph d={HEART} color="#C4512D" size={13} />
              </span>
            </span>
            <div className="p-2.5">
              <p className="truncate text-[12px] font-semibold">{product}</p>
              <p className="mt-0.5 text-[13px] font-bold text-[#C4512D]">{price}</p>
            </div>
          </div>
        ))}
      </div>
      <Foot name={name} bg="#2B1A10" ink="#F6EEE1" accent="#E58A5F" />
    </div>
  )
}

function Other({ name }: SiteProps) {
  return (
    <div className="flex min-h-[800px] flex-col bg-white text-[#0B1026]">
      <Nav name={name} ink="#0B1026" mark="#1337CF" markInk="#fff" />
      <div className="relative mx-3 h-[calc(128px*var(--hero-k,1))] overflow-hidden rounded-[20px] bg-[#dfe4f7]">
        <HeroPhoto id="other" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1337CF]/45 to-transparent" />
        <span className="ms-in absolute bottom-3 left-3 rounded-full bg-[#FFE14D] px-2.5 py-1 text-[11px] font-bold text-[#0B1026]" style={seq(0)}>
          Open Mon to Sat
        </span>
      </div>
      <div className="px-4 pt-3.5">
        <p className="ms-in font-display font-bold leading-[1] tracking-[-.03em]" style={{ ...seq(1), fontSize: fit(name, 38) }}>
          {name}
        </p>
        <p className="ms-in mt-2 text-[13.5px] leading-[1.35] text-[#0B1026]/75" style={seq(2)}>
          Quality work. Honest service.
        </p>
        <div className="ms-in mt-3 flex gap-2" style={seq(3)}>
          <span className="ms-cta flex h-[42px] flex-1 items-center justify-center rounded-[12px] bg-[#1337CF] text-[13.5px] font-bold text-white">Get a quote</span>
          <span className="flex h-[42px] items-center gap-1.5 rounded-[12px] border border-[#D8DDEE] px-3.5 text-[13px] font-semibold">
            <Glyph d={PHONE} color="#1337CF" size={14} />
            Call
          </span>
        </div>
      </div>
      <div className="mt-5 grid gap-2 px-3">
        {['Our services', 'Recent work', 'Visit or call us'].map((row) => (
          <div key={row} className="flex items-center justify-between rounded-[12px] bg-[#F1F3FB] p-3 text-[13.5px] font-semibold">
            {row}
            <Glyph d={ARROW} color="#1337CF" size={15} />
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 rounded-[14px] border border-[#E7E9F2] p-3">
        <p className="text-[11px] tracking-[1px] text-[#F5A524]">★★★★★</p>
        <p className="mt-1 flex items-start gap-1.5 text-[12.5px] font-medium leading-[1.3]">
          <Glyph d={CHECK} color="#1337CF" size={14} />
          “Fair price, and the job was done on time.”
        </p>
      </div>
      <Foot name={name} bg="#0B1026" ink="#fff" accent="#FFE14D" />
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
