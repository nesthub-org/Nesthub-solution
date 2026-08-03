import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Icon } from '../Icon'
import { brand } from '../../data/content'
import calendlyCta from '../../assets/calendly-cta.jpg'

export function BookCall() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pt-28 sm:pt-32">
      <Reveal>
        <div className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-line bg-surface lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <span className="text-[13px] font-semibold uppercase tracking-[.09em] text-brand-500">Schedule a call</span>
            <h2 className="mt-4 text-[28px] sm:text-[34px] font-bold leading-[1.15] tracking-[-.03em]">
              Book a Free 1-on-1 Discovery Call
            </h2>
            <p className="mt-4 max-w-[420px] text-[16px] sm:text-[17px] leading-[1.6] text-muted">
              Let's discuss your project in detail. Pick a time that works for you and we'll walk through your
              vision, goals, and how we can bring it to life.
            </p>
            <div className="mt-6 flex flex-wrap gap-5 text-[14px] font-semibold text-muted">
              <span className="flex items-center gap-2">
                <Icon name="clock" size={18} color="#6B7280" />
                30 min session
              </span>
              <span className="flex items-center gap-2">
                <Icon name="video" size={18} color="#6B7280" />
                Video or Phone
              </span>
            </div>
            <motion.a
              href={brand.calendly}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, backgroundColor: '#1D4ED8' }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex h-14 items-center gap-2 rounded-2xl bg-brand-500 px-7 text-[16px] font-semibold text-white shadow-[0_8px_28px_rgba(37,99,235,.24)]"
            >
              Book Your Free Call
              <span className="block h-1.5 w-1.5 rotate-45 border-r-[1.6px] border-t-[1.6px] border-white" />
            </motion.a>
          </div>
          <div className="relative min-h-[240px] lg:min-h-full">
            <img
              src={calendlyCta}
              alt="Two people on a video call scheduling a discovery meeting"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
