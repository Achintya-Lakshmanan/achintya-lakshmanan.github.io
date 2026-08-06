import { motion, useReducedMotion } from 'framer-motion'

export function HeroBackground() {
  const shouldReduce = useReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="paper-grid absolute inset-0 opacity-40" />
      <motion.div
        className="absolute -right-24 top-10 hidden h-72 w-72 rounded-full border-[3px] border-ink bg-[#c9f31d] sm:block"
        animate={shouldReduce ? undefined : { rotate: [0, 8, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute -left-16 bottom-14 hidden h-40 w-40 rotate-12 border-[3px] border-ink bg-accent-cyan sm:block" />
      <svg
        className="absolute bottom-[8%] right-[38%] hidden h-24 w-40 lg:block"
        viewBox="0 0 180 100"
        fill="none"
      >
        <path
          d="M5 72c35-52 73-51 108-12 12 14 25 12 58-17"
          stroke="#171717"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 10"
        />
        <path d="m157 32 15 11-17 7" stroke="#171717" strokeWidth="4" />
      </svg>
    </div>
  )
}
