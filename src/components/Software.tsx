import { content } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function Software() {
  return (
    <section id="software" className="section" aria-labelledby="software-title">
      <div className="page-width">
        <SectionHeading id="software-title" index="03 / software" title="Software" />
        <div className="stack">
          {content.software.map((project) => <article key={project.id} className="card card-large software-card">
            <div className="software-columns">
              <div className="software-title">
                <div className="chips">
                  <span className="software-label">{project.label}</span>
                  {project.badge && <span className="chip chip-solid">{project.badge}</span>}
                </div>
                <h3>{project.title}</h3>
                <p className="lead">{project.tagline}</p>
                <p className="meta">{project.tags.join(' · ')}</p>
              </div>
              <div className="software-body">
                <p className="muted">{project.summary}</p>
                <p>{project.contribution}</p>
                {project.link && <a className="button button-ghost" href={project.link.href} target="_blank" rel="noopener noreferrer">{project.link.label} ↗</a>}
              </div>
            </div>
            {project.images && <figure className="screens">
              <div className="grid-auto">
                {project.images.map((image) => <img key={image.src} src={image.src} alt={image.alt}
                  width={image.width} height={image.height} loading="lazy" decoding="async" />)}
              </div>
              {project.caption && <figcaption>{project.caption}</figcaption>}
            </figure>}
          </article>)}
        </div>
      </div>
    </section>
  )
}
