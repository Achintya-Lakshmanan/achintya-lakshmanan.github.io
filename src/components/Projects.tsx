import { content } from '../data/content'
import { IconGitHub } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  return (
    <Section
      id="projects"
      wash
      title="Projects"
      subtitle="Research and applied ML work, plus a few personal tools I build for myself."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {content.projects.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i * 0.08, 0.32)}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface-raised/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent-cyan to-accent-violet opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(45,212,191,0.08), transparent 50%, rgba(124,106,240,0.06))',
                }}
                aria-hidden
              />

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent-bright">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 text-ink-muted transition-all hover:border-accent/40 hover:text-ink hover:shadow-glow-sm"
                      aria-label={`View ${project.title} on GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconGitHub className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <time className="mt-2 text-xs text-ink-dim">{project.period}</time>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  {project.description}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors group-hover:border-accent/20 group-hover:text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {content.sideProjects.length > 0 && (
        <div className="mt-16">
          <Reveal delay={0.05}>
            <div className="mb-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent-cyan/80">
                Side projects
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                Built for myself
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                Local-first tools I use daily: notch UI, a second brain, personal
                finance, and a Linux calendar sync.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.sideProjects.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(0.08 + i * 0.06, 0.3)}>
                <article className="group relative flex h-full flex-col border-l border-accent/30 bg-transparent py-1 pl-5 transition-colors hover:border-accent-cyan/60">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-accent-bright">
                      {project.title}
                    </h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-1.5 text-ink-muted transition-all hover:border-accent/40 hover:text-ink"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <IconGitHub className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wide text-ink-dim"
                      >
                        {ti > 0 && (
                          <span className="mr-2 text-white/20" aria-hidden>
                            ·
                          </span>
                        )}
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
