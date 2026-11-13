import { useRef, useState } from 'react'
import { content } from '../data/content'
import { ChapterHeading } from './ChapterHeading'
import { OrgLogo } from './OrgLogo'
import { RichText } from './RichText'

/** Industry is industry; research and teaching are both academic. */
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'industry', label: 'Industry' },
  { id: 'academic', label: 'Academic' },
] as const
type Filter = (typeof FILTERS)[number]['id']
const side = (category: string): Filter => (category === 'industry' ? 'industry' : 'academic')
const count = (filter: Filter) => content.experience.filter((role) => filter === 'all' || side(role.category) === filter).length

export function Experience() {
  const [filter, setFilter] = useState<Filter>('all')
  const strip = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const choose = (next: Filter) => {
    setFilter(next)
    requestAnimationFrame(() => {
      // Chosen from further down the list, which has just got shorter: go back to its top, under the strip, rather
      // than being left wherever that offset now falls (often the next chapter).
      const top = list.current?.getBoundingClientRect().top ?? 0
      const under = strip.current?.getBoundingClientRect().bottom ?? 0
      if (top < under) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: top + window.scrollY - under - 12, behavior: reduced ? 'auto' : 'smooth' })
      }
      // The cards have moved: let the tour (and the room's pinboard) catch up with what is now being read.
      window.dispatchEvent(new Event('scroll'))
    })
  }

  return (
    <section id="experience" className="chapter" data-chapter="2" data-filter={filter} aria-labelledby="experience-title">
      {/* The chapter opens with its heading, held at the top while the camera turns to its corner of the room. */}
      <div className="gate" data-beat="experience">
        <ChapterHeading id="experience-title" number={3} title="Experience" />
      </div>
      <div ref={strip} className="role-filter" role="group" aria-label="Show experience">
        {FILTERS.map((option) => <button key={option.id} type="button" className={'role-filter-option role-filter-' + option.id}
          aria-pressed={filter === option.id} onClick={() => choose(option.id)}>
          {option.label} <span className="role-filter-count">{count(option.id)}<span className="sr-only"> roles</span></span>
        </button>)}
      </div>
      {/* Says what the list now shows, for anyone who can't see it change. */}
      <p className="sr-only" role="status" aria-live="polite">
        {filter === 'all' ? '' : `Showing ${count(filter)} ${filter} roles`}
      </p>
      <ol ref={list} className="roles">
        {content.experience.map((role) => <li key={role.id} className="card role" data-beat={role.id}
          hidden={filter !== 'all' && side(role.category) !== filter}>
          <p className="card-top">
            <time>{role.period}</time>
            <span className={'tag tag-' + role.category}>{role.category}</span>
          </p>
          <div className="role-head">
            <OrgLogo name={role.organization} src={role.logo} size={40} />
            <div>
              <h3>{role.title}</h3>
              <p className="muted">{role.organization}</p>
            </div>
          </div>
          <ul className="points">{role.points.map((point) => <li key={point}><RichText text={point} /></li>)}</ul>
        </li>)}
      </ol>
    </section>
  )
}
