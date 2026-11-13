import { content } from '../data/content'
import { ChapterHeading } from './ChapterHeading'
import { OrgLogo } from './OrgLogo'

export function About() {
  return (
    // Read out in the night sky, through the open window: a searchlight finds each card in turn (see index.css).
    <section id="about" className="chapter chapter-sky" data-chapter="3" aria-labelledby="about-title">
      {/* The chapter opens with its heading, held at the top while the camera turns to its corner of the room. */}
      <div className="gate" data-beat="about">
        <ChapterHeading id="about-title" number={4} title="About" />
      </div>
      <div className="card about-intro" data-beat="about-intro">
        <figure className="portrait">
          <img src={content.photo} alt="Achintya Lakshmanan at the Grand Canyon" width={520} height={650} loading="lazy" decoding="async" />
        </figure>
        <div className="about-words">
          {content.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>

      <article className="card" data-beat="education">
        <h3 className="kicker">Education</h3>
        <ul className="plain-list">
          {content.education.map((school) => <li key={school.id}>
            <OrgLogo name={school.institution} src={school.logo} size={40} />
            <div>
              <strong>{school.degree}</strong>
              <span>{school.institution} · {school.period}</span>
              <span>GPA <b className="figure">{school.gpa}</b></span>
            </div>
          </li>)}
        </ul>
      </article>

      <article className="card" data-beat="recognition">
        <h3 className="kicker">Recognition</h3>
        <ul className="plain-list">
          {content.achievements.map((award) => <li key={award.title}>
            <OrgLogo name={award.organization} src={award.logo} size={40} />
            <div><strong>{award.title}</strong><span>{award.detail}</span></div>
          </li>)}
        </ul>
      </article>

      <article className="card" data-beat="skills">
        <h3 className="kicker">Skills</h3>
        <dl className="skills">
          {content.skills.map((group) => <div key={group.category}>
            <dt>{group.category}</dt>
            <dd>{group.skills.join(' · ')}</dd>
          </div>)}
        </dl>
      </article>
    </section>
  )
}
