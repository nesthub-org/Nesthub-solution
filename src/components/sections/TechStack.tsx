import { animate, stagger } from 'animejs'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from '../Reveal'
import { stack } from '../../data/content'

export function TechStack() {
  const listRef = useRef<HTMLDivElement>(null)
  const inView = useInView(listRef, { once: true, margin: '-10% 0px -10% 0px' })
  const played = useRef(false)

  useEffect(() => {
    if (!inView || !listRef.current || played.current) return
    played.current = true
    const badges = listRef.current.querySelectorAll('[data-badge]')

    animate(badges, {
      opacity: [0, 1],
      translateY: [22, 0],
      scale: [0.9, 1],
      duration: 700,
      delay: stagger(70),
      ease: 'outCubic',
      onComplete: () => {
        animate(badges, {
          translateY: [0, -12],
          duration: 3200,
          delay: stagger(220),
          loop: true,
          alternate: true,
          ease: 'inOutSine',
        })
      },
    })
  }, [inView])

  return (
    <section className="mx-auto max-w-[1320px] px-6 pt-28 text-center sm:pt-32">
      <Reveal>
        <h2 className="text-[30px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] tracking-[-.035em]">
          A stack chosen for the next five years
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="text-pretty mx-auto mt-4 max-w-[620px] text-[17px] sm:text-[18px] leading-[1.6] text-muted">
          Boring where it should be boring, modern where it compounds.
        </p>
      </Reveal>

      <div ref={listRef} className="mt-13 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-3.5">
        {stack.map((tech) => (
          <div
            key={tech.name}
            data-badge
            onMouseEnter={(e) => {
              animate(e.currentTarget, { scale: 1.07, translateY: -4, duration: 260, ease: 'outQuad' })
            }}
            onMouseLeave={(e) => {
              animate(e.currentTarget, { scale: 1, translateY: 0, duration: 320, ease: 'outQuad' })
            }}
            className="flex items-center justify-center gap-2.5 rounded-[18px] border border-line bg-white px-3.5 py-3.5 opacity-0 shadow-[0_8px_40px_rgba(0,0,0,.05)] transition-colors hover:border-ink sm:justify-start sm:gap-3 sm:py-4 sm:pl-4.5 sm:pr-6"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-line bg-surface text-[13px] font-bold tracking-[-.03em] text-ink">
              {tech.mark}
            </span>
            <span className="text-[16px] font-semibold tracking-[-.015em]">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
