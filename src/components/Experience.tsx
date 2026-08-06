import { useMemo, useState, type ReactNode } from 'react'
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
  { id: 'teaching', label: 'Teaching' },
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

/** Renders highlight text with optional [label](url) markdown links. */
function HighlightText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    nodes.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="ink-link font-bold text-ink underline decoration-2 underline-offset-2"
      >
        {match[1]}
      </a>,
    )
    last = match.index + match[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return <>{nodes}</>
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
      wash
      title="Experience"
      subtitle="Research, teaching, and product work—organized by what I actually contributed."
    >
      <Reveal delay={0.05}>
        <div
          className="mb-12 grid w-full grid-cols-2 border-2 border-ink bg-[#fffaf0] p-1 shadow-[4px_4px_0_#171717] sm:inline-grid sm:w-auto sm:grid-cols-4"
          role="group"
          aria-label="Experience filter"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                tab === t.id ? 'text-ink' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {tab === t.id && !shouldReduce && (
                <motion.span
                  layoutId="exp-filter"
                  className="absolute inset-0 bg-[#c9f31d]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              {tab === t.id && shouldReduce && (
                <span className="absolute inset-0 bg-[#c9f31d]" />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.ol
          key={tab}
          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="border-t-2 border-ink"
        >
          {items.map((item, i) => {
            return (
              <Reveal
                key={item.id}
                delay={Math.min(i * 0.05, 0.28)}
                as="li"
                className="relative grid grid-cols-[1.1rem_1fr] gap-x-5 border-b-2 border-ink sm:grid-cols-[9.75rem_1.25rem_1fr] sm:gap-x-6"
              >
                {/* Desktop date column */}
                <div className="hidden pt-7 sm:block">
                  <time className="block whitespace-nowrap text-right text-xs font-bold uppercase leading-relaxed tracking-wide text-ink-dim">
                    {item.period}
                  </time>
                </div>

                {/* Rail + node */}
                <div className="relative flex justify-center">
                  <div
                    className="relative z-10 mt-8 h-4 w-4 rotate-45 border-2 border-ink bg-accent"
                    aria-hidden
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 py-7 sm:py-8">
                  <div className="mb-3 flex flex-wrap items-center gap-2 sm:hidden">
                    <time className="text-xs font-bold uppercase tracking-wide text-ink-dim">
                      {item.period}
                    </time>
                    <span className="border border-ink bg-[#c9f31d] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <OrgLogo
                      name={item.organization}
                      src={item.logo}
                      size={44}
                      className="mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-2xl font-bold leading-tight text-ink">
                          {item.title}
                        </h3>
                        <span className="hidden border border-ink bg-[#fffaf0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-dim sm:inline-block">
                          {item.category}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold text-accent-cyan">
                        {item.organization}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3 border-l-2 border-ink/20 pl-4 sm:ml-[3.625rem]">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                      >
                        <span className="mt-1.5 font-display text-sm font-bold text-accent" aria-hidden>
                          ↳
                        </span>
                        <span>
                          <HighlightText text={h} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </motion.ol>
      </AnimatePresence>
    </Section>
  )
}
