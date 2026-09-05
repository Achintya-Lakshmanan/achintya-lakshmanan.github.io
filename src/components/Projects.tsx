import { content, type Project, type ProjectLink } from '../data/content'
import { IconExternal, IconGitHub } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

const researchOrder = ['attention-bias-rag', 'mcts-llm', 'aura']

export function Projects() {
  const researchProjects = researchOrder
    .map((id) => content.projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))
  const earlierResearchProjects = content.projects.filter(
    (project) => project.kind === 'research' && !researchOrder.includes(project.id),
  )
  const buildProjects = content.projects.filter((project) => project.kind === 'build')

  return (
    <Section
      id="projects"
      title="Selected work"
    >
      <div className="space-y-14 sm:space-y-16">
        <div>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/30 pb-3">
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Research systems
            </h3>
            <p className="text-sm text-ink-muted">Questions, controls, and current status</p>
          </div>

          {content.researchArtifacts.map((artifact) => (
            <Reveal key={artifact.id} className="mb-5">
              <article className="border border-ink/40 bg-[#fffaf0] p-5 shadow-[8px_8px_0_#2457f5] sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">
                    Public research artifact · {artifact.period}
                  </p>
                  <span className="text-sm text-ink-muted">{artifact.status}</span>
                </div>
                <h3 className="mt-3 max-w-4xl font-display text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-3xl">
                  {artifact.title}
                </h3>
                <p className="mt-3 max-w-4xl text-base leading-relaxed text-ink-muted">
                  {artifact.summary}
                </p>
                <a
                  href={artifact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
                >
                  {artifact.linkLabel} <IconExternal className="h-4 w-4" />
                </a>
              </article>
            </Reveal>
          ))}

          <div className="space-y-5">
            {researchProjects.map((project) => (
              <ResearchProject key={project.id} project={project} featured={project.id === 'mcts-llm'} />
            ))}
          </div>

          {earlierResearchProjects.length > 0 && (
            <div className="mt-10">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/30 pb-3">
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Earlier research
                </h3>
                <p className="text-sm text-ink-muted">Computer vision · challenge work</p>
              </div>
              <div className="space-y-3">
                {earlierResearchProjects.map((project) => (
                  <CompactResearchProject key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/30 pb-3">
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Software projects
            </h3>
            <p className="text-sm text-ink-muted">Native product and full-stack work</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {buildProjects.map((project) => (
              <BuildProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function ResearchProject({ project, featured }: { project: Project; featured: boolean }) {
  const evidence = project.evidence ?? []
  const links = project.links ?? []
  const primaryEvidence = evidence[0]
  const secondaryEvidence = evidence[evidence.length - 1]

  return (
    <Reveal>
      <article
        id={project.id}
        aria-labelledby={`${project.id}-title`}
        className={`border border-ink/40 ${featured ? 'bg-[#fffaf0] shadow-[8px_8px_0_#2457f5]' : 'bg-surface'}`}
      >
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">
              <span>{featured ? 'Featured research' : 'Research'}</span>
              <span className="text-ink/30" aria-hidden>·</span>
              <time className="text-ink-muted">{project.period}</time>
            </div>
            <h4
              id={`${project.id}-title`}
              className="mt-3 max-w-3xl font-display text-2xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-4xl"
            >
              {project.title}
            </h4>
            <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-ink sm:text-lg">
              {project.question}
            </p>

            {featured && (
              <div className="mt-6 grid gap-5 border-t border-ink/20 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">System</p>
                  <p className="mt-2 text-base leading-relaxed text-ink-muted">{project.approach}</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">My role</p>
                  <p className="mt-2 text-base leading-relaxed text-ink-muted">{project.contribution}</p>
                </div>
              </div>
            )}

            <TagList tags={project.tags} />
          </div>

          <div className="min-w-0 border-t border-ink/20 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">
              Evidence so far
            </p>
            {primaryEvidence && (
              <p className="mt-3 text-base font-semibold leading-relaxed text-ink">
                {primaryEvidence}
              </p>
            )}
            {secondaryEvidence && secondaryEvidence !== primaryEvidence && (
              <p className="mt-3 border-l-2 border-accent-cyan pl-3 text-base leading-relaxed text-ink-muted">
                {secondaryEvidence}
              </p>
            )}
            {project.status && (
              <p className="mt-4 inline-block border border-ink/35 bg-[#c9f31d] px-2.5 py-1 text-sm font-bold text-ink">
                {project.status}
              </p>
            )}
            <ProjectLinks links={links} />
          </div>
        </div>

        <details className="details-panel border-t border-ink/20 px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
          <summary className="inline-flex items-center text-sm font-bold text-ink underline decoration-2 underline-offset-4">
            Project details
          </summary>
          <div className="mt-4 grid max-w-5xl gap-5 sm:grid-cols-2">
            {!featured && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">System</p>
                <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-muted">{project.approach}</p>
              </div>
            )}
            {!featured && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">My role</p>
                <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-muted">{project.contribution}</p>
              </div>
            )}
            <ul className="space-y-3 border-l-2 border-ink/20 pl-4 sm:col-span-2">
              {evidence.map((item) => (
                <li key={item} className="max-w-prose text-base leading-relaxed text-ink-muted">{item}</li>
              ))}
            </ul>
          </div>
        </details>
      </article>
    </Reveal>
  )
}

function CompactResearchProject({ project }: { project: Project }) {
  const evidence = project.evidence ?? []
  const links = project.links ?? []

  return (
    <Reveal>
      <article
        id={project.id}
        aria-labelledby={`${project.id}-title`}
        className="border border-ink/35 bg-surface p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">
              Computer vision · Challenge research
            </p>
            <h4
              id={`${project.id}-title`}
              className="mt-2 font-display text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-3xl"
            >
              {project.title}
            </h4>
          </div>
          <time className="text-sm text-ink-muted">{project.period}</time>
        </div>

        <p className="mt-3 max-w-3xl text-base font-medium leading-relaxed text-ink">
          {project.question}
        </p>

        <div className="mt-4 grid gap-4 border-t border-ink/20 pt-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">My role</p>
            <p className="mt-2 text-base leading-relaxed text-ink-muted">{project.contribution}</p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">Reported result</p>
            <p className="mt-2 text-base leading-relaxed text-ink-muted">
              {evidence.slice(0, 2).join(' ')}
            </p>
          </div>
        </div>

        <details className="details-panel mt-5 border-t border-ink/20 pt-4">
          <summary className="inline-flex items-center text-sm font-bold text-ink underline decoration-2 underline-offset-4">
            Project details
          </summary>
          <div className="mt-4 max-w-4xl space-y-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">Approach</p>
              <p className="mt-2 text-base leading-relaxed text-ink-muted">{project.approach}</p>
            </div>
            {evidence.length > 2 && (
              <ul className="space-y-3 border-l-2 border-ink/20 pl-4">
                {evidence.slice(2).map((item) => (
                  <li key={item} className="text-base leading-relaxed text-ink-muted">{item}</li>
                ))}
              </ul>
            )}
          </div>
        </details>

        <ProjectLinks links={links} />
      </article>
    </Reveal>
  )
}

function BuildProject({ project }: { project: Project }) {
  const evidence = project.evidence ?? []

  return (
    <Reveal>
      <article
        id={project.id}
        aria-labelledby={`${project.id}-title`}
        className="flex h-full min-w-0 flex-col border border-ink/35 bg-[#fffaf0] p-5 sm:p-6"
      >
        <div className="flex items-center justify-between gap-3 text-sm font-bold uppercase tracking-[0.12em]">
          <span className="text-accent-cyan">Software</span>
          <time className="text-ink-muted">{project.period}</time>
        </div>
        <h4 id={`${project.id}-title`} className="mt-4 font-display text-2xl font-bold leading-tight tracking-[-0.025em]">
          {project.title}
        </h4>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">{project.question}</p>
        {evidence[0] && (
          <div className="mt-5 border-t border-ink/20 pt-4">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">Result</p>
            <p className="mt-2 text-base font-semibold leading-relaxed text-ink">{evidence[0]}</p>
          </div>
        )}
        <TagList tags={project.tags} />
        <div className="mt-auto pt-5">
          <details className="details-panel border-t border-ink/20 pt-4">
            <summary className="inline-flex items-center text-sm font-bold text-ink underline decoration-2 underline-offset-4">
              Project details
            </summary>
            <div className="mt-4 max-w-prose space-y-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">How it works</p>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{project.approach}</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">My contribution</p>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{project.contribution}</p>
              </div>
              <ul className="space-y-3 border-l-2 border-ink/20 pl-4">
                {evidence.map((item) => (
                  <li key={item} className="text-base leading-relaxed text-ink-muted">{item}</li>
                ))}
              </ul>
            </div>
          </details>
          <ProjectLinks links={project.links ?? []} />
        </div>
      </article>
    </Reveal>
  )
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
      {tags.map((tag) => (
        <li key={tag} className="border border-ink/25 px-2 py-1 text-sm text-ink-muted">
          {tag}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null

  return (
    <div className="mt-5 flex flex-wrap gap-4">
      {links.map((link) => {
        const Icon = link.kind === 'github' ? IconGitHub : IconExternal
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
            aria-label={`${link.label} for project (opens in a new tab)`}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
