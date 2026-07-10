import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected work in multi-agent RAG, inference-time search, vision, and applied ML."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {content.projects.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i * 0.08, 0.32)}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface-raised/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
              {/* Glow border accent on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(139,92,246,0.12), transparent 50%, rgba(34,211,238,0.08))',
                }}
                aria-hidden
              />

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent-bright">
                    {project.title}
                  </h3>
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
                        className="flex items-center gap-2 text-xs font-medium text-accent-cyan"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
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
    </Section>
  )
}
