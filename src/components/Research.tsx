import { logitBars } from '../data/bars'
import { content } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function Research() {
  const { featured, research, publication } = content
  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="page-width">
        <SectionHeading id="research-title" index="01 / research" title="Research" />

        <article className="card card-large featured">
          <div className="featured-title">
            <div className="chips">
              <span className="chip chip-solid">{featured.label}</span>
              <span className="chip chip-outline">{featured.status}</span>
            </div>
            <h3 className="featured-name">{featured.title}</h3>
            <p className="featured-subtitle">{featured.subtitle}</p>
          </div>
          <div className="featured-body">
            <p className="lead">{featured.question}</p>
            <p className="muted">{featured.summary}</p>
            <p className="contribution"><span className="comment">what I do · </span>{featured.contribution}</p>
            <p className="meta">{featured.meta}</p>
          </div>
        </article>

        <div className="grid-two research-grid">
          {research.map((project, index) => <article key={project.id} className="card project-card">
            <div className={'bars logits accent-' + project.accent} aria-hidden>
              {logitBars(24, index + 1).map((value, i) => <span key={i} style={{ height: value * 100 + '%', opacity: 0.35 + value * 0.6 }} />)}
            </div>
            <div className="project-meta">
              <span>{project.period}</span>
              <span className={'status status-' + project.tone}>{project.status}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="project-hook">{project.tagline}</p>
            <p className="muted">{project.summary}</p>
            <div className="project-footer">
              <span>{project.tags.join(' · ')}</span>
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">repository ↗</a>}
            </div>
          </article>)}
        </div>

        <article className="publication">
          <div className="paper-cover" aria-hidden>
            <span className="paper-venue">{publication.venue}</span>
            <span className="paper-year">{publication.year}</span>
          </div>
          <div className="publication-body">
            <p className="publication-label">{publication.label}</p>
            <h3>{publication.title}</h3>
            <p>{publication.summary}</p>
            <a className="button button-violet" href={publication.link} target="_blank" rel="noopener noreferrer">Read the paper ↗</a>
          </div>
        </article>
      </div>
    </section>
  )
}
