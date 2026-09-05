export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="paper-grid absolute inset-0 opacity-70" />
      <div className="absolute right-[9%] top-0 hidden h-full w-px bg-ink/10 lg:block" />
      <div className="absolute right-0 top-[42%] h-px w-[28%] bg-accent-cyan/35" />
      <div className="absolute bottom-12 left-0 h-16 w-1 bg-accent-cyan sm:h-24" />
    </div>
  )
}
