import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { socialIconMap } from './socialIcons'
import { HeroBackground } from './HeroBackground'

export function Hero() {
  const roles = content.taglineRoles
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(roles[0] ?? '')
      return
    }

    const current = roles[index] ?? ''
    const typingSpeed = deleting ? 28 : 55
    const pauseAtEnd = 1800
    const pauseAtStart = 400

    if (!deleting && display === current) {
      const t = window.setTimeout(() => setDeleting(true), pauseAtEnd)
      return () => window.clearTimeout(t)
    }

    if (deleting && display === '') {
      const t = window.setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % roles.length)
      }, pauseAtStart)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(() => {
      setDisplay((prev) =>
        deleting
          ? current.slice(0, Math.max(0, prev.length - 1))
          : current.slice(0, prev.length + 1),
      )
    }, typingSpeed)

    return () => window.clearTimeout(t)
  }, [display, deleting, index, roles, shouldReduce])

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-16"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <motion.p
          className="mb-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-accent-cyan"
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.p>

        <motion.h1
          className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <span className="bg-accent-gradient bg-clip-text text-transparent">
            {content.name}
          </span>
        </motion.h1>

        <motion.div
          className="mt-5 flex min-h-[2.5rem] items-center font-display text-xl text-ink-muted sm:text-2xl md:text-3xl"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          <span className="mr-2 text-ink-dim">I&apos;m a</span>
          <span className="relative inline-flex text-ink">
            <AnimatePresence mode="wait">
              <motion.span
                key={shouldReduce ? 'static' : display}
                className="inline-block"
              >
                {shouldReduce ? roles[0] : display}
              </motion.span>
            </AnimatePresence>
            {!shouldReduce && (
              <span
                className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] animate-pulse bg-accent-cyan"
                aria-hidden
              />
            )}
          </span>
        </motion.div>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
        >
          {content.bio}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            View Projects
          </a>

          {content.socials.map((s) => {
            const Icon = socialIconMap[s.icon]
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.icon === 'email' ? undefined : '_blank'}
                rel={s.icon === 'email' ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-ink-muted backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-ink hover:shadow-glow-sm"
                aria-label={s.label}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
