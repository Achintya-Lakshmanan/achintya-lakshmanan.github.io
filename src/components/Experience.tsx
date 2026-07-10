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

/** Parse start month/year from period strings like "Apr 2026 to Present". */
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
      subtitle="Research and industry roles spanning LLMs, multi-agent systems, vision, and full-stack ML."
    >
      <Reveal delay={0.05}>
        <div
          className="mb-12 inline-flex rounded-xl border border-white/10 bg-surface-raised p-1"
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

      <AnimatePresence mode="wait">
        <motion.ol
          key={tab}
          initial={shouldReduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="relative ml-3 border-l border-white/10 pl-8 sm:ml-4 sm:pl-10"
        >
          {/* Accent rail over the border */}
          <div
            className="pointer-events-none absolute -left-px top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-violet/70 to-transparent"
            aria-hidden
          />

          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={Math.min(i * 0.06, 0.3)}
              as="li"
              className={`relative ${i < items.length - 1 ? 'pb-10 sm:pb-12' : 'pb-2'}`}
            >
              {/* Timeline node */}
              <div
                className="absolute -left-[2.55rem] top-1 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-surface shadow-glow-sm sm:-left-[3.05rem] sm:h-11 sm:w-11"
                aria-hidden
              >
                <span className="absolute inset-0 rounded-full bg-accent-gradient opacity-20" />
                <OrgLogo
                  name={item.organization}
                  src={item.logo}
                  size={32}
                  className="relative z-10 !rounded-full border-0"
                />
              </div>

              {/* Connector stub */}
              <div
                className="absolute -left-8 top-5 h-px w-5 bg-gradient-to-r from-accent-cyan/70 to-transparent sm:-left-10 sm:w-7"
                aria-hidden
              />

              <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-surface-raised/70 p-5 transition-all duration-300 hover:border-accent/35 hover:bg-surface-raised hover:shadow-glow-sm sm:p-6">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-cyan via-accent-violet/80 to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="flex flex-wrap items-center gap-2">
                  <time className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-bright">
                    {item.period}
                  </time>
                  <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-dim">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold text-ink sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-accent-bright">
                  {item.organization}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </motion.ol>
      </AnimatePresence>
    </Section>
  )
}
