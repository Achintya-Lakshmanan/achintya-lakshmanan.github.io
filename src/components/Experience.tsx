import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  content,
  type Experience as ExperienceEntry,
  type ExperienceCategory,
} from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

const tabs: { id: ExperienceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research' },
  { id: 'industry', label: 'Industry' },
]

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

/** Parse start month/year from period strings like "Apr 2026 – Present". */
function startDateMs(period: string): number {
  const match = period.trim().match(/^([A-Za-z]{3})\s+(\d{4})/)
  if (!match) return 0
  const month = MONTHS[match[1]!.toLowerCase()]
  const year = Number(match[2])
  if (month === undefined || Number.isNaN(year)) return 0
  return Date.UTC(year, month, 1)
}

function byStartDateDesc(a: ExperienceEntry, b: ExperienceEntry): number {
  return startDateMs(b.period) - startDateMs(a.period)
}

export function Experience() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('all')
  const shouldReduce = useReducedMotion()

  const items = useMemo(() => {
    const filtered =
      tab === 'all'
        ? content.experience
        : content.experience.filter((e) => e.category === tab)
    return [...filtered].sort(byStartDateDesc)
  }, [tab])

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Research and industry roles spanning LLMs, RL, vision, and full-stack systems."
    >
      <Reveal delay={0.05}>
        <div
          className="mb-10 inline-flex rounded-xl border border-white/10 bg-surface-raised p-1"
          role="tablist"
          aria-label="Experience filter"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? 'text-ink' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {tab === t.id && !shouldReduce && (
                <motion.span
                  layoutId="exp-tab"
                  className="absolute inset-0 rounded-lg bg-accent/20 ring-1 ring-accent/40"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              {tab === t.id && shouldReduce && (
                <span className="absolute inset-0 rounded-lg bg-accent/20 ring-1 ring-accent/40" />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent sm:left-[15px]"
          aria-hidden
        />

        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={shouldReduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {items.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i * 0.06, 0.3)} as="li">
                <article className="group relative flex gap-5 sm:gap-7">
                  <div className="relative z-10 mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center sm:h-8 sm:w-8">
                    <span className="absolute h-3 w-3 rounded-full bg-accent shadow-glow-sm ring-4 ring-surface transition-transform duration-300 group-hover:scale-125" />
                  </div>

                  <div className="flex-1 rounded-2xl border border-white/5 bg-surface-raised/60 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-surface-raised hover:shadow-glow-sm sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3.5">
                        <OrgLogo
                          name={item.organization}
                          src={item.logo}
                          size={44}
                          className="mt-0.5"
                        />
                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-semibold text-ink">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-sm text-accent-bright">
                            {item.organization}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-ink-dim">
                          {item.category}
                        </span>
                        <time className="text-xs text-ink-dim sm:text-sm">
                          {item.period}
                        </time>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2 text-sm leading-relaxed text-ink-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </Section>
  )
}
