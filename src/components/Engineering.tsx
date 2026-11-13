import { content } from '../data/content'
import { ChapterHeading } from './ChapterHeading'

export function Engineering() {
  return (
    <section id="engineering" className="chapter" data-chapter="1" aria-labelledby="engineering-title">
      {/* The chapter opens with its heading, held at the top while the camera turns to its corner of the room. */}
      <div className="gate" data-beat="engineering">
        <ChapterHeading id="engineering-title" number={2} title="Engineering" />
      </div>
      {content.software.map((project) => <article key={project.id} className="card project" data-beat={project.id}>
        <p className="card-top">
          <span className="kicker">{project.label}</span>
          {project.badge && <span className="tag tag-mint">{project.badge}</span>}
        </p>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-lead">{project.tagline}</p>
        <p>{project.summary}</p>
        {project.images && <figure className="shots">
          <div className="shots-row">
            {project.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />)}
          </div>
          {project.caption && <figcaption>{project.caption}</figcaption>}
        </figure>}
        <p className="kicker">What I built</p>
        <ul className="points">{project.built.map((line) => <li key={line}>{line}</li>)}</ul>
        {project.team && <p className="muted">{project.team}</p>}
        <p className="meta">{project.tags.join(' · ')}</p>
        {project.links && <div className="card-links">
          {project.links.map((link, index) => <a key={link.href} className={'button' + (index === 0 ? ' button-ink' : '')} href={link.href}
            target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
        </div>}
      </article>)}
    </section>
  )
}
