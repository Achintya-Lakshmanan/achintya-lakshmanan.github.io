import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { useActiveSection } from '../hooks/useScrollSpy'
import { IconClose, IconMenu } from './Icons'

const sectionIds = content.nav.map((n) => n.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
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
          ? 'border-b border-accent/10 bg-surface/75 shadow-glow-sm backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="bg-accent-gradient bg-clip-text text-transparent">
            AL
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {content.nav.map((item) => {
            const id = item.href.replace('#', '')
            return (
              <li key={item.href}>
                <a href={item.href} className={linkClass(id)}>
                  {item.label}
                  {active === id && !shouldReduce && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent-gradient"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {active === id && shouldReduce && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent-gradient" />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-ink-muted hover:bg-white/5 hover:text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/5 bg-surface/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {content.nav.map((item) => {
                const id = item.href.replace('#', '')
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`block rounded-lg px-3 py-2.5 text-base ${
                        active === id
                          ? 'bg-accent/10 text-accent-bright'
                          : 'text-ink-muted hover:bg-white/5 hover:text-ink'
                      }`}
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
