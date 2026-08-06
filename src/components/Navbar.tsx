import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { useActiveSection } from '../hooks/useScrollSpy'
import { IconClose, IconMenu } from './Icons'

const sectionIds = content.nav.map((n) => n.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(sectionIds)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const desktop = window.matchMedia('(min-width: 768px)')
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      window.requestAnimationFrame(() => toggleRef.current?.focus())
    }
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpointChange)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpointChange)
    }
  }, [open])

  const linkClass = (id: string) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      active === id
        ? 'text-ink'
        : 'text-ink-muted hover:text-ink'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b-2 border-ink bg-[#fffaf0]/95'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 -rotate-3 place-items-center border-2 border-ink bg-accent-cyan text-white transition-transform group-hover:rotate-3">
            AL
          </span>
          <span className="hidden sm:inline">field notes</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-4 md:flex xl:gap-6">
          {content.nav.map((item) => {
            const id = item.href.replace('#', '')
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={linkClass(id)}
                  aria-current={active === id ? 'location' : undefined}
                >
                  {active === id && !shouldReduce && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-2 -rotate-1 bg-[#c9f31d]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {active === id && shouldReduce && (
                    <span className="absolute -bottom-1 left-0 right-0 h-2 -rotate-1 bg-[#c9f31d]" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="border-2 border-ink bg-[#fffaf0] p-2 text-ink hover:bg-[#c9f31d] md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={shouldReduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b-2 border-ink bg-[#fffaf0] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => {
                const id = item.href.replace('#', '')
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`block border-l-4 px-3 py-2.5 text-base font-bold ${
                        active === id
                          ? 'border-accent bg-[#c9f31d] text-ink'
                          : 'border-transparent text-ink-muted hover:border-ink hover:text-ink'
                      }`}
                      aria-current={active === id ? 'location' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
