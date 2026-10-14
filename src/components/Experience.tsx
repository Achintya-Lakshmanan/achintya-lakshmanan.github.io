import { useState } from 'react'
import { content, type ExperienceCategory, type Experience as ExperienceEntry } from '../data/content'
import { AdvisorText } from './AdvisorText'
import { OrgLogo } from './OrgLogo'
import { Section } from './Section'

const months: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 }

function startDate(entry: ExperienceEntry): number {
  const match = entry.period.match(/^([A-Za-z]{3})\s+(\d{4})/)
  if (!match) return 0
  const month = months[match[1]!.toLowerCase()]
  return month === undefined ? 0 : Date.UTC(Number(match[2]), month, 1)
}

const experience = [...content.experience].sort((a, b) => startDate(b) - startDate(a))

const filters: { id: ExperienceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research' },
  { id: 'industry', label: 'Industry' },
  { id: 'teaching', label: 'Teaching' },
]

function countFor(id: ExperienceCategory | 'all') {
  return id === 'all' ? experience.length : experience.filter((entry) => entry.category === id).length
}

export function Experience() {
  const [filter, setFilter] = useState<ExperienceCategory | 'all'>('all')
  const visible = experience.filter((entry) => filter === 'all' || entry.category === filter)

  return <Section id="experience" index="02" title="Experience" label="Where I've worked"
    description="Research labs, startups, and a classroom. Most recent first.">
    <div className="filter-bar" role="group" aria-label="Filter experience">
      {filters.map((option) => <button key={option.id} type="button" className="filter-chip"
        aria-pressed={filter === option.id} onClick={() => setFilter(option.id)}>
        {option.label}<span>{countFor(option.id)}</span>
      </button>)}
    </div>
    <ol className="timeline" aria-live="polite">
      {visible.map((entry) => <li className="timeline-entry" key={entry.id} data-category={entry.category}>
        <div className="timeline-when">
          <time>{entry.period}</time>
          <span className={'category-tag category-' + entry.category}>{entry.category}</span>
        </div>
        <div className="timeline-card spotlight">
          <div className="timeline-heading">
            <OrgLogo name={entry.organization} src={entry.logo} size={40} />
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.organization}</p>
            </div>
          </div>
          <p className="timeline-context"><AdvisorText text={entry.context} /></p>
          <ul className="timeline-bullets" aria-label={entry.title + ' at ' + entry.organization}>
            {entry.highlights.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </div>
      </li>)}
    </ol>
  </Section>
}
