import { content } from '../data/content'
import { ChapterHeading } from './ChapterHeading'

export function Research() {
  const { interests, current, publication, earlier } = content.research
  return (
    <section id="research" className="chapter" data-chapter="0" aria-labelledby="research-title">
      {/* The chapter opens with its heading, held at the top while the camera turns to its corner of the room. */}
      <div className="gate" data-beat="research">
        <ChapterHeading id="research-title" number={1} title="Research" />
      </div>
      <p className="chapter-lead">{interests}</p>

      <h3 className="subheading">What I'm working on</h3>
      {current.map((project) => <article key={project.id} className="card" data-beat={project.id}>
        <p className="card-top"><span className="tag tag-research">{project.status}</span></p>
        <h4 className="card-title">{project.name}</h4>
        <p className="bubble">{project.question}</p>
        <p>{project.line}</p>
        <p className="meta">{project.tags.join(' · ')}</p>
      </article>)}

      <h3 className="subheading">Preprint</h3>
      <article className="card" data-beat="publication">
        <p className="card-top"><span className="kicker">{publication.venue} · {publication.year}</span></p>
        <h4 className="card-title card-title-small">{publication.title}</h4>
        <p className="authors">
          {publication.authors.map((author, index) => <span key={author}>
            {index > 0 && ', '}
            {author === content.name ? <strong>{author}</strong> : author}
          </span>)}
        </p>
        <p>{publication.summary}</p>
        <p>{publication.findings}</p>
        <p><strong>My part:</strong> {publication.contribution}</p>
        <a className="inline-link" href={publication.link} target="_blank" rel="noopener noreferrer">Read the paper ↗</a>
      </article>

      <h3 className="subheading">Earlier</h3>
      <article className="card" data-beat="haze">
        <p className="card-top"><span className="kicker">{earlier.kicker}</span></p>
        <h4 className="card-title card-title-small">{earlier.title}</h4>
        <p>{earlier.summary}</p>
        <p className="meta">{earlier.results.map((result) => result.headline + ' ' + result.label).join(' · ')}</p>
      </article>
    </section>
  )
}
