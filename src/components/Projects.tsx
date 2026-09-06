import { content, type Project, type ProjectLink } from '../data/content'
import { IconExternal, IconGitHub } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

const primaryResearchOrder = ['attention-bias-rag', 'mcts-llm']
const secondaryResearchOrder = ['aura', 'haze-removal']

export function Projects() {
  const primaryResearchProjects = primaryResearchOrder
    .map((id) => content.projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))
  const secondaryResearchProjects = secondaryResearchOrder
    .map((id) => content.projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))
  const softwareProjects = content.projects.filter((project) => project.kind === 'build')

  return (
    <Section
      id="projects"
      title="Selected work"
      subtitle="Two connected ways of working: research systems with careful evaluation, and software that has to hold together in use."
    >
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <section
          id="software-work"
          aria-labelledby="software-work-title"
          className="scroll-mt-24 border-2 border-ink bg-[#fffaf0] p-4 shadow-[8px_8px_0_#c83d22] sm:p-6"
        >
          <LaneHeader
            id="software-work-title"
            eyebrow="Software / product"
            title="Software"
            description="Native and full-stack builds where interfaces, integrations, and handoffs have to work together."
          />
          <div className="space-y-4">
            {softwareProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section
          id="research-work"
          aria-labelledby="research-work-title"
          className="scroll-mt-24 border-2 border-ink bg-[#fffaf0] p-4 shadow-[8px_8px_0_#2457f5] sm:p-6"
        >
          <LaneHeader
            id="research-work-title"
            eyebrow="Research / evaluation"
            title="Research"
            description="Collaborative work where the question, controls, and limits of the evidence stay visible."
          />

          <ResearchArtifact />
          <div className="mt-4 space-y-4">
            {primaryResearchProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-5 border-t-2 border-ink pt-4">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-display text-xl font-bold tracking-[-0.02em]">Earlier research</h4>
              <p className="text-sm text-ink-muted">Secondary projects and challenge work</p>
            </div>
            <div className="space-y-3">
              {secondaryResearchProjects.map((project) => (
                <SecondaryResearchRow key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Section>
  )
}

function LaneHeader({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-5 min-h-[9rem] border-b-2 border-ink pb-5 sm:mb-6">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent-cyan">{eyebrow}</p>
      <h3 id={id} className="mt-2 font-display text-3xl font-bold leading-none tracking-[-0.04em] sm:text-4xl">
        {title}
      </h3>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p>
    </div>
  )
}

function ResearchArtifact() {
  const artifact = content.researchArtifacts[0]
  if (!artifact) return null

  return (
    <Reveal>
      <article className="border border-ink/35 bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">
            Public research artifact · {artifact.period}
          </p>
          <span className="text-sm text-ink-muted">{artifact.status}</span>
        </div>
        <h4 className="mt-3 font-display text-xl font-bold leading-tight tracking-[-0.025em] sm:text-2xl">
          {artifact.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">{artifact.summary}</p>
        <a
          href={artifact.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
        >
          {artifact.linkLabel} <IconExternal className="h-4 w-4" />
        </a>
      </article>
    </Reveal>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const isResearch = project.kind === 'research'
  const evidence = project.evidence ?? []
  const links = project.links ?? []
  const firstEvidence = evidence[0]

  return (
    <Reveal>
      <article
        id={project.id}
        aria-labelledby={`${project.id}-title`}
        className="border border-ink/35 bg-surface"
      >
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">
              {isResearch
                ? 'Research project'
                : project.scope === 'professional'
                  ? 'Professional / company project'
                  : 'Software project'}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              <time>{project.period}</time>
              {project.status && (
                <span className="border border-ink/30 bg-[#c9f31d] px-2 py-0.5 font-bold text-ink">
                  {project.status}
                </span>
              )}
            </div>
          </div>

          <h4
            id={`${project.id}-title`}
            className="mt-3 font-display text-2xl font-bold leading-[1.03] tracking-[-0.03em] sm:text-3xl"
          >
            {project.title}
          </h4>
          <p className="mt-3 text-base font-medium leading-relaxed text-ink">{project.question}</p>

          <div className="mt-4 grid gap-4 border-t border-ink/20 pt-4 sm:grid-cols-2 sm:gap-5">
            <InfoBlock label="My contribution" text={project.contribution} />
            {firstEvidence && (
              <InfoBlock label={isResearch ? 'Evidence so far' : 'Result'} text={firstEvidence} />
            )}
          </div>

          <TagList tags={project.tags} />
        </div>

        {links.length > 0 && (
          <div className="border-t border-ink/20 px-4 py-3 sm:px-5">
            <ProjectLinks links={links} />
          </div>
        )}

        <details className="details-panel border-t border-ink/20 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
          <summary className="inline-flex items-center text-sm font-bold text-ink underline decoration-2 underline-offset-4">
            Project details
          </summary>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <InfoBlock label={isResearch ? 'Approach' : 'How it works'} text={project.approach} />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
                Evidence and status
              </p>
              <ul className="mt-2 space-y-2 border-l-2 border-ink/20 pl-3">
                {evidence.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink-muted sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
              {project.status && (
                <p className="mt-3 text-sm font-semibold text-ink-muted">Status: {project.status}</p>
              )}
            </div>
          </div>
        </details>
      </article>
    </Reveal>
  )
}

function SecondaryResearchRow({ project }: { project: Project }) {
  const evidence = project.evidence ?? []
  const links = project.links ?? []
  const firstEvidence = evidence[0]
  const isChallenge = project.id === 'haze-removal'

  return (
    <Reveal>
      <article
        id={project.id}
        aria-labelledby={`${project.id}-title`}
        className="border border-ink/30 bg-surface"
      >
        <div className="p-3 sm:p-4">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent-cyan">
                {isChallenge ? 'Challenge research' : 'Secondary research'}
              </p>
              <h4
                id={`${project.id}-title`}
                className="mt-1 font-display text-xl font-bold leading-tight tracking-[-0.025em] sm:text-2xl"
              >
                {project.title}
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              <time>{project.period}</time>
              {project.status && (
                <span className="border border-ink/30 bg-[#c9f31d] px-2 py-0.5 font-bold text-ink">
                  {project.status}
                </span>
              )}
            </div>
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-ink">{project.question}</p>
        </div>

        <div className="grid gap-3 border-t border-ink/20 px-3 py-3 sm:grid-cols-2 sm:gap-5 sm:px-4">
          <InfoBlock label="My contribution" text={project.contribution} />
          {firstEvidence && (
            <InfoBlock label={isChallenge ? 'Reported result' : 'Evidence so far'} text={firstEvidence} />
          )}
        </div>

        {links.length > 0 && (
          <div className="border-t border-ink/20 px-3 py-3 sm:px-4">
            <ProjectLinks links={links} />
          </div>
        )}

        <details className="details-panel border-t border-ink/20 px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
          <summary className="inline-flex items-center text-sm font-bold text-ink underline decoration-2 underline-offset-4">
            Project details
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <InfoBlock label="Approach" text={project.approach} />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
                Evidence and status
              </p>
              <ul className="mt-2 space-y-2 border-l-2 border-ink/20 pl-3">
                {evidence.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink-muted sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
              {project.status && (
                <p className="mt-3 text-sm font-semibold text-ink-muted">Status: {project.status}</p>
              )}
            </div>
          </div>
        </details>
      </article>
    </Reveal>
  )
}

function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">{text}</p>
    </div>
  )
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
      {tags.map((tag) => (
        <li key={tag} className="border border-ink/25 px-2 py-1 text-sm text-ink-muted">
          {tag}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
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
