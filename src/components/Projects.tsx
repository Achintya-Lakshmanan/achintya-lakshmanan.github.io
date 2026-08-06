import { content, type Project } from '../data/content'
import { IconExternal, IconGitHub } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

const colors = ['#2457f5', '#c83d22', '#c9f31d', '#7a43d1', '#ff8eb3', '#8bd3dd']

const groups: Array<{
  kind: Project['kind']
  title: string
  description: string
}> = [
  {
    kind: 'research',
    title: 'Research questions',
    description:
      'Work where the evaluation design matters as much as the model or decoding method.',
  },
  {
    kind: 'build',
    title: 'Built products',
    description:
      'Native apps, ML prototypes, and end-to-end systems that had to work outside a notebook.',
  },
]

export function Projects() {
  return (
    <Section
      id="projects"
      title="Selected work"
      subtitle="A shorter set of projects with the question, my contribution, the evidence, and an honest status."
    >
      <div className="space-y-24">
        {groups.map((group) => {
          const projects = content.projects.filter((project) => project.kind === group.kind)

          return (
            <div key={group.kind}>
              <Reveal>
                <div className="mb-9 grid gap-3 border-b-2 border-ink pb-5 sm:grid-cols-[1fr_1fr] sm:items-end">
                  <h3 className="font-display text-3xl font-bold leading-none tracking-tight sm:text-4xl">
                    {group.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    {group.description}
                  </p>
                </div>
              </Reveal>

              <div className="space-y-7">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={content.projects.findIndex((item) => item.id === project.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const paletteIndex = index % colors.length
  const color = colors[paletteIndex]
  const badgeTextColor = [0, 1, 3].includes(paletteIndex) ? '#ffffff' : '#171717'

  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)}>
      <article
        id={project.id}
        aria-labelledby={`${project.id}-title`}
        className="group relative scroll-mt-24 overflow-hidden border-2 border-ink bg-[#fffaf0] transition-transform hover:-translate-y-1"
        style={{ boxShadow: `9px 9px 0 ${color}` }}
      >
        <div
          className="absolute inset-y-0 left-0 hidden w-20 items-center justify-center border-r-2 border-ink sm:flex"
          style={{ backgroundColor: color }}
          aria-hidden
        >
          <span className="-rotate-90 font-display text-4xl font-bold text-white mix-blend-difference">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="grid gap-8 p-6 sm:ml-20 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className="border-2 border-ink px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ backgroundColor: color, color: badgeTextColor }}
              >
                {project.kind === 'research' ? 'Research' : 'Build'} ·{' '}
                {String(index + 1).padStart(2, '0')}
              </span>
              <time className="text-xs font-bold uppercase tracking-widest text-ink-dim">
                {project.period}
              </time>
            </div>

            <h4
              id={`${project.id}-title`}
              className="max-w-3xl font-display text-3xl font-bold leading-[0.98] tracking-tight sm:text-4xl"
            >
              {project.title}
            </h4>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-bright">
                  {project.kind === 'research' ? 'The question' : 'The problem'}
                </p>
                <p className="mt-2 max-w-3xl text-base font-medium leading-relaxed text-ink sm:text-lg">
                  {project.question}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-dim">
                  What I built
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {project.contribution}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-b-2 border-ink text-xs font-bold uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-ink pt-5 lg:border-l-2 lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-bright">
              Evidence & status
            </p>
            <ul className="space-y-4">
              {project.evidence.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    className="mt-1.5 h-3 w-3 shrink-0 border-2 border-ink"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {project.status && (
              <p className="mt-6 inline-block border-2 border-ink bg-[#c9f31d] px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
                {project.status}
              </p>
            )}

            {project.links && project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((link) => {
                  const Icon = link.kind === 'github' ? IconGitHub : IconExternal
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:-rotate-2 hover:bg-accent-cyan"
                      aria-label={`${link.label} for ${project.title} (opens in a new tab)`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
