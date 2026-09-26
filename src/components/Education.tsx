import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Section } from './Section'

export function Education() {
  return <Section id="education" index="04" title="Education">
    <div className="education-list">{content.education.map((entry) => <article key={entry.id} className="education-entry">
      <div className="education-identity"><OrgLogo name={entry.institution} src={entry.logo} size={36} />
        <div><h3>{entry.institution}</h3><p>{entry.degree}</p><span>{entry.location}</span></div>
      </div>
      <div className="education-meta"><time>{entry.period}</time>{entry.gpa && <span>GPA {entry.gpa}</span>}</div>
      {entry.coursework && <details className="education-courses">
        <summary>Coursework<span className="details-symbol" aria-hidden /></summary>
        <ul>{entry.coursework.map((course) => <li key={course}>{course}</li>)}</ul>
      </details>}
    </article>)}</div>
  </Section>
}
