import { useMemo, type ReactNode } from 'react'
import { content, type Experience as ExperienceEntry } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

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
    if (match.index > last) nodes.push(text.slice(last, match.index))
    nodes.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
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
  const items = useMemo(() => [...content.experience].sort(byStartDateDesc), [])

  return (
    <Section
      id="experience"
      wash
      title="Experience"
      subtitle="The teams and products behind the work, with my contribution and the evidence I can stand behind."
    >
      <ol className="timeline-list border-t border-ink/30">
        {items.map((item, index) => {
          const bullets = [item.context, ...item.highlights]
          return (
            <Reveal
              key={item.id}
              delay={Math.min(index * 0.04, 0.2)}
              as="li"
              className="grid gap-x-4 border-b border-ink/25 py-6 sm:grid-cols-[8rem_1.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-7"
            >
              <time className="text-sm font-bold uppercase leading-relaxed tracking-[0.08em] text-ink-muted sm:pt-1 sm:text-right">
                {item.period}
              </time>

              <div className="relative hidden justify-center sm:flex">
                <span className="relative z-10 mt-1.5 h-3.5 w-3.5 rotate-45 border-2 border-ink bg-[#c9f31d]" aria-hidden />
              </div>

              <article className="min-w-0">
                <div className="flex items-start gap-3">
                  <OrgLogo name={item.organization} src={item.logo} size={40} className="mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]">
                        {item.title}
                      </h3>
                      <span className="text-sm font-bold uppercase tracking-[0.1em] text-accent-cyan">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-1 text-base font-semibold text-ink-muted">{item.organization}</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-3 sm:ml-[3.25rem]" aria-label={`${item.title} highlights`}>
                  {bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bullet}
                      className={`relative pl-5 text-base leading-relaxed ${bulletIndex === 0 ? 'text-ink-muted' : 'text-ink'}`}
                    >
                      <span className="absolute left-0 top-[0.65em] h-2 w-2 bg-accent-cyan" aria-hidden />
                      <HighlightText text={bullet} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
