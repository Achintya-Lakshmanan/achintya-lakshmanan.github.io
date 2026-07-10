import { useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  content,
  type Experience as ExperienceEntry,
  type ExperienceCategory,
} from '../data/content'
import { IconExternal } from './Icons'
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
        className="font-medium text-accent-cyan underline decoration-accent-cyan/40 underline-offset-2 transition-colors hover:text-accent-bright hover:decoration-accent-bright"
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
          initial={shouldReduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="space-y-0"
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <Reveal
                key={item.id}
                delay={Math.min(i * 0.05, 0.28)}
                as="li"
                className="relative grid grid-cols-[1.1rem_1fr] gap-x-5 sm:grid-cols-[9.75rem_1.25rem_1fr] sm:gap-x-6"
              >
                {/* Desktop date column */}
                <div className="hidden pt-1 sm:block">
                  <time className="block whitespace-nowrap text-right text-xs font-medium leading-relaxed text-ink-dim">
                    {item.period}
                  </time>
                </div>

                {/* Rail + node */}
                <div className="relative flex justify-center">
                  {!isLast && (
                    <div
                      className="absolute top-3 bottom-0 w-px bg-gradient-to-b from-accent-cyan/80 via-white/10 to-white/5"
                      aria-hidden
                    />
                  )}
                  <div
                    className="relative z-10 mt-1.5 h-3 w-3 rounded-full bg-accent-cyan shadow-[0_0_0_4px_rgba(7,9,15,1),0_0_0_5px_rgba(34,211,238,0.35)]"
                    aria-hidden
                  />
                </div>

                {/* Content */}
                <div className={`min-w-0 ${isLast ? 'pb-2' : 'pb-10 sm:pb-12'}`}>
                  <div className="mb-3 flex flex-wrap items-center gap-2 sm:hidden">
                    <time className="text-xs font-medium text-ink-dim">
                      {item.period}
                    </time>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-dim">
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
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {item.title}
                        </h3>
                        <span className="hidden rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-dim sm:inline-block">
                          {item.category}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-accent-bright">
                        {item.organization}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent-cyan transition-colors hover:text-accent-bright"
                        >
                          <IconExternal className="h-3 w-3" />
                          {item.linkLabel ?? 'View paper'}
                        </a>
                      )}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 border-l border-white/5 pl-4 sm:ml-[3.625rem] sm:border-0 sm:pl-0">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan/80" />
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
