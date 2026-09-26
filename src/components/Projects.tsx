import { content, type Project, type ProjectLink } from '../data/content'
import { IconExternal, IconGitHub } from './Icons'
import { Section } from './Section'

const research = content.projects.filter((project) => project.kind === 'research')
const software = content.projects.filter((project) => project.kind === 'build')

export function Projects() {
  return (
    <div id="projects">
      <Section id="research-work" index="01" title="Research"
        description="Agent behavior, context sharing, and controlled generation with LLMs.">
        <div className="project-list">
          {research.map((project) => <ProjectEntry key={project.id} project={project} />)}
        </div>
        <ResearchArtifact />
      </Section>
      <Section id="software-work" index="02" title="Software"
        description="macOS apps I want to use, and software built with product teams.">
        <div className="project-list">
          {software.map((project) => <ProjectEntry key={project.id} project={project} />)}
        </div>
      </Section>
    </div>
  )
}

function ProjectEntry({ project }: { project: Project }) {
  const [result, ...moreEvidence] = project.evidence
  const featured = project.id === 'aura'
  return (
    <article id={project.id} className={'project-entry ' + (featured ? 'project-featured' : '')} aria-labelledby={project.id + '-title'}>
      <div className="project-meta">
        <p className={'project-kind ' + (featured ? 'featured-label' : '')}>
          {featured ? 'Featured research' : project.kind === 'research' ? 'Research' : project.scope === 'professional' ? 'At Lumel' : project.id === 'notchnest' ? 'Personal project' : 'Team project'}
        </p>
        <time>{project.period}</time>
        {project.status && project.scope !== 'professional' && <span className="project-status">{project.status}</span>}
        <ul className="technology-list" aria-label="Technologies">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
      <div className="project-body">
        <h3 id={project.id + '-title'}>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-contribution">{project.contribution}</p>
        {result && <p className="project-result">{result}</p>}
        <div className="project-actions">
          <details className="project-details">
            <summary>Technical details<span aria-hidden className="details-symbol" /></summary>
            <div className="project-detail-copy">
              <p>{project.approach}</p>
              {moreEvidence.length > 0 && <ul>{moreEvidence.map((item) => <li key={item}>{item}</li>)}</ul>}
            </div>
          </details>
          {project.links && <ProjectLinks links={project.links} />}
        </div>
      </div>
    </article>
  )
}

function ResearchArtifact() {
  const artifact = content.researchArtifacts[0]
  if (!artifact) return null
  return (
    <article className="publication" aria-labelledby="publication-title">
      <div className="publication-meta"><span className="eyebrow">Publication</span><span>{artifact.status} / {artifact.period}</span></div>
      <div>
        <h3 id="publication-title">{artifact.title}</h3>
        <p>{artifact.summary}</p>
        <a className="text-link" href={artifact.link} target="_blank" rel="noopener noreferrer">{artifact.linkLabel}<IconExternal /></a>
      </div>
    </article>
  )
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return <div className="project-links">{links.map((link) => {
    const Icon = link.kind === 'github' ? IconGitHub : IconExternal
    return <a className="text-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
      <Icon />{link.label}
    </a>
  })}</div>
}
