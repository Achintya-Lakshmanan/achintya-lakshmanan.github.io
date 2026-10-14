import { content, type Project, type ProjectLink } from '../data/content'
import { IconArrowUpRight, IconGitHub, IconPlus } from './Icons'
import { Section } from './Section'

const research = content.projects.filter(project => project.kind === 'research')
const software = content.projects.filter(project => project.kind === 'build')
const [featured, ...otherResearch] = research

export function ResearchProjects() {
  return <div id="projects">
    <Section id="research-work" index="01" title="Research" label="Selected research"
      description="What I'm working on now, a few earlier projects, and a coauthored paper.">
      {featured && <ProjectCard project={featured} featured />}
      <div className="project-grid">
        {otherResearch.map(project => <ProjectCard key={project.id} project={project} />)}
        <Publication />
      </div>
    </Section>
  </div>
}

export function SoftwareProjects() {
  return <Section id="software-work" index="03" title="Software" label="Things I've built"
    description="Apps I build for myself, and projects shipped with a team.">
    <div className="project-grid software-grid">
      {software.map(project => <ProjectCard key={project.id} project={project} featured />)}
    </div>
  </Section>
}

function categoryOf(project: Project): string {
  if (project.kind === 'build') return project.scope === 'personal' ? 'Personal macOS app' : 'Team hackathon project'
  return project.context ?? 'Research'
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article id={project.id} className={'project spotlight' + (featured ? ' project-featured' : '')} aria-labelledby={project.id + '-title'} data-reveal>
    <div className="project-meta">
      <span className="pill">{featured && project.kind === 'research' ? 'Featured · ' : ''}{categoryOf(project)}</span>
      <span className="project-period">{project.status && <><span className={'live-dot' + (/ongoing|progress/i.test(project.status) ? ' is-live' : '')} aria-hidden />{project.status} <span aria-hidden>·</span> </>}{project.period}</span>
    </div>

    <div className="project-body">
      <div className="project-identity">
        <h3 className="project-title" id={project.id + '-title'}>
          {project.title}
          {project.subtitle && <span className="project-subtitle">{project.subtitle}</span>}
        </h3>
        <p className="project-hook">{project.tagline}</p>
        <ul className="tag-list" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </div>

      <div className="project-copy">
        <p className="project-summary">{project.summary}</p>
        <dl className="project-facts">
          <div><dt>What I did</dt><dd>{project.contribution}</dd></div>
          {project.highlight && <div className="project-finding">
            <dt>{project.kind === 'research' ? 'What we found' : 'Recognition'}</dt><dd>{project.highlight}</dd>
          </div>}
        </dl>
        {project.links && <ProjectLinks links={project.links} />}
      </div>
    </div>

    {project.images && <figure className="project-gallery">
      <div className="project-gallery-images">{project.images.map(img => <img key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />)}</div>
      {project.imageCaption && <figcaption>{project.imageCaption}</figcaption>}
    </figure>}

    {project.approach && <details className="project-details">
      <summary><span>How it works{project.evidence.length > 0 ? (project.kind === 'research' ? ' & caveats' : ' & testing') : ''}</span><span className="details-icon" aria-hidden><IconPlus /></span></summary>
      <div className="project-details-body">
        <div className="detail-block"><h4>How it works</h4><p>{project.approach}</p></div>
        {project.study && <dl className="study-steps" aria-label="Study protocol">
          {project.study.map((item, index) => <div key={item.label}><dt><span aria-hidden>{index + 1}</span>{item.label}</dt><dd>{item.text}</dd></div>)}
        </dl>}
        {project.evidence.length > 0 && <div className="detail-block">
          <h4>{project.kind === 'research' ? 'Evaluation & caveats' : 'Testing & scope'}</h4>
          <ul>{project.evidence.map(item => <li key={item}>{item}</li>)}</ul>
        </div>}
      </div>
    </details>}
  </article>
}

function Publication() {
  const artifact = content.researchArtifacts[0]
  if (!artifact) return null
  return <article className="publication spotlight" aria-labelledby="publication-title" data-reveal>
    <div className="publication-badge" aria-hidden><span>arXiv</span><span>{artifact.period.replace(/\D/g, '')}</span></div>
    <div>
      <p className="mono-label">Publication · {artifact.status}</p>
      <h3 id="publication-title">{artifact.title}</h3>
      <p>{artifact.summary}</p>
      <a className="arrow-link" href={artifact.link} target="_blank" rel="noopener noreferrer">{artifact.linkLabel}<IconArrowUpRight /></a>
    </div>
  </article>
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return <div className="project-links">{links.map(link => (
    <a className="arrow-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
      {link.kind === 'github' && <IconGitHub />}{link.label}<IconArrowUpRight />
    </a>
  ))}</div>
}
