import { nextSteps } from '../../data/content'

export function NextSteps() {
  return (
    <section id="process" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="rise max-w-[780px]">
          <p className="sheet-label text-blueprint">No surprises</p>
          <h2 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-[-.035em] sm:text-[52px]">What happens when you message us.</h2>
        </div>

        <ol className="mt-9 grid list-none grid-cols-1 gap-7 p-0 sm:mt-12 md:grid-cols-3 md:gap-6">
          {nextSteps.map((step, i) => (
            <li key={step.title} className="rise draw-line">
              <span className="font-display text-[46px] font-bold leading-none tracking-[-.04em] text-blueprint sm:text-[60px]">{i + 1}</span>
              <h3 className="mt-2 text-[22px] font-bold leading-[1.15] tracking-[-.02em] sm:text-[25px]">{step.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.5] text-ink/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
