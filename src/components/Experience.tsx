import { useState } from 'react'
import { content, type ExperienceCategory } from '../data/content'
import { AdvisorText } from './AdvisorText'
import { SectionHeading } from './SectionHeading'

const filters: (ExperienceCategory | 'all')[] = ['all', 'research', 'industry', 'teaching']

function countFor(id: ExperienceCategory | 'all') {
  return id === 'all' ? content.experience.length : content.experience.filter((entry) => entry.category === id).length
}

export function Experience() {
  const [filter, setFilter] = useState<ExperienceCategory | 'all'>('all')
  const visible = content.experience.filter((entry) => filter === 'all' || entry.category === filter)

  return (
    <section id="experience" className="section section-alt" aria-labelledby="experience-title">
      <div className="page-width">
        <SectionHeading id="experience-title" index="02 / trajectory" title="Experience" />
        <div className="filters" role="group" aria-label="Filter experience">
          {filters.map((id) => <button key={id} type="button" className="filter" aria-pressed={filter === id}
            onClick={() => setFilter(id)}>
            {id}<span>{countFor(id)}</span>
          </button>)}
        </div>
        <ol className="timeline" aria-live="polite">
          {visible.map((entry, index) => <li key={entry.id} className="timeline-entry">
            <div className="timeline-when">
              <span className="step">t={visible.length - 1 - index}</span>
              <div>
                <time>{entry.period}</time>
                <span className={'tag tag-' + entry.category}>{entry.category}</span>
              </div>
            </div>
            <div className="card timeline-card">
              <h3>{entry.title}</h3>
              <p className="organization">{entry.organization}</p>
              <p className="timeline-context"><AdvisorText text={entry.context} /></p>
              <ul>{entry.highlights.map((line) => <li key={line}>{line}</li>)}</ul>
            </div>
          </li>)}
        </ol>
      </div>
    </section>
  )
}
