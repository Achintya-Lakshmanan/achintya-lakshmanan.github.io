import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="about" className="section section-alt" aria-labelledby="about-title">
      <div className="page-width">
        <SectionHeading id="about-title" index="04 / about" title="About" />
        <div className="grid-two">
          {content.education.map((school, index) => <article key={school.id} className="card about-card">
            <div className="education-top">
              <p>{school.period}</p>
              <p><span className={'gpa ' + (index === 0 ? 'mint' : 'violet')}>{school.gpa}</span>/{school.scale}</p>
            </div>
            <div className="card-heading">
              <OrgLogo name={school.institution} src={school.logo} />
              <div>
                <h3>{school.degree}</h3>
                <p className="institution">{school.institution} · {school.location}</p>
              </div>
            </div>
            <p className="list">{school.coursework.join(' · ')}</p>
          </article>)}
          <article className="card about-card">
            <p className="comment">// toolkit</p>
            {content.skills.map((group) => <div key={group.category} className="skill-group">
              <h3>{group.category}</h3>
              <p className="list">{group.skills.join(' · ')}</p>
            </div>)}
          </article>
          <article className="card about-card">
            <p className="comment violet">// recognition</p>
            <ul className="awards">
              {content.achievements.map((award) => <li key={award.title}>
                <OrgLogo name={award.organization} src={award.logo} size={36} />
                <div><strong>{award.title}</strong><span>{award.detail}</span></div>
              </li>)}
            </ul>
            <p className="also">{content.alsoAchieved}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
