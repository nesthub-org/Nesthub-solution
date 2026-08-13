import { DecorativePattern } from './DecorativePattern'
import { GradientBlob } from './GradientBlob'
import { FloatingParticles } from './FloatingParticles'
import { tones } from './tones'

/** Section-wide decorative backdrop: dot texture + drifting gradient blobs + floating particles. */
export function BackgroundGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <DecorativePattern className="absolute inset-0" />

      <GradientBlob color={tones.violet[200]} size={520} top="-12%" left="-8%" duration={17} opacity={0.4} />
      <GradientBlob color={tones.sky[200]} size={440} top="14%" right="-10%" duration={19} delay={2} opacity={0.35} />
      <GradientBlob color={tones.amber[100]} size={400} bottom="-14%" left="22%" duration={21} delay={1} opacity={0.4} />
      <GradientBlob color={tones.emerald[100]} size={360} bottom="4%" right="8%" duration={18} delay={3} opacity={0.3} />

      <FloatingParticles />

      {/* soft top-to-bottom wash so the blobs stay a whisper, not a spotlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white" />
    </div>
  )
}
