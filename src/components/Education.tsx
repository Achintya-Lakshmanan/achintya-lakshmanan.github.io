import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  return (
    <Section
      id="education"
      title="Education"
      subtitle="Academic path in AI, data science, and computer science."
    >
      <ul className="space-y-6">
        {content.education.map((edu, i) => (
          <Reveal key={edu.id} delay={i * 0.1} as="li">
            <article className="rounded-2xl border border-white/5 bg-surface-raised/60 p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-glow-sm sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3.5">
                  <OrgLogo
                    name={edu.institution}
                    src={edu.logo}
                    size={48}
                    className="mt-0.5"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-sm text-accent-bright">
                      {edu.institution}
                      <span className="text-ink-dim"> · {edu.location}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm text-ink-dim">
                  <time className="block">{edu.period}</time>
                  {edu.gpa && (
                    <span className="mt-1 inline-block rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-bright">
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
              </div>
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-dim">
                    Coursework
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {edu.coursework.map((c) => (
                      <li
                        key={c}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ink-muted"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
