import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Section } from './Section'

export function About() {
  const highlights = content.achievements.slice(0, 4)
  const notes = content.achievements.slice(4)

  return <Section id="background" index="04" title="About" label="Education, tools & more"
    description="Where I studied, what I build with, and a few things outside the résumé bullet points.">
    <div className="bento">
      {content.education.map((entry) => <article key={entry.id} className="bento-card education-card spotlight" data-reveal>
        <div className="education-top">
          <OrgLogo name={entry.institution} src={entry.logo} size={44} />
          {entry.gpa && <span className="gpa"><span className="gradient-text">{entry.gpa.split('/')[0]}</span>/{entry.gpa.split('/')[1]} GPA</span>}
        </div>
        <p className="mono-label">{entry.period}</p>
        <h3>{entry.degree}</h3>
        <p className="education-school">{entry.institution} <span aria-hidden>·</span> {entry.location}</p>
        {entry.coursework && <>
          <h4 className="bento-subhead">Coursework</h4>
          <ul className="chip-list">{entry.coursework.map((course) => <li key={course}>{course}</li>)}</ul>
        </>}
      </article>)}

      {content.skills.map((group) => <article key={group.id} className="bento-card skills-card spotlight" data-reveal>
        <p className="mono-label">Toolkit</p>
        <h3>{group.category}</h3>
        <ul className="chip-list chip-list-strong">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </article>)}

      <article className="bento-card recognition-card spotlight" data-reveal>
        <p className="mono-label">Recognition</p>
        <h3>A few other things</h3>
        <ul className="recognition-list">
          {highlights.map((entry) => <li key={entry.id}>
            <OrgLogo name={entry.organization ?? entry.title} src={entry.logo} size={32} />
            <div><strong>{entry.title}</strong>{entry.detail && <span>{entry.detail}</span>}</div>
          </li>)}
        </ul>
        {notes.length > 0 && <p className="recognition-notes">
          Also: {notes.map((entry, index) => <span key={entry.id}>{entry.title}{entry.detail && <> ({entry.detail})</>}{index < notes.length - 1 ? '; ' : '.'}</span>)}
        </p>}
      </article>
    </div>
  </Section>
}
