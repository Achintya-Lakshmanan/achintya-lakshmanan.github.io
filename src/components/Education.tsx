import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  return (
    <Section
      id="education"
      compact
      title="Education"
      subtitle="Graduate study in computer science and engineering, grounded in machine learning and systems."
    >
      <ul className="border-y border-ink/30">
        {content.education.map((edu, index) => (
          <Reveal key={edu.id} delay={index * 0.06} as="li" className="border-b border-ink/25 last:border-b-0">
            <article className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8 sm:py-6">
              <div className="flex min-w-0 items-start gap-3.5">
                <OrgLogo name={edu.institution} src={edu.logo} size={44} className="mt-0.5" />
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] sm:text-2xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-accent-cyan">
                    {edu.institution}
                    <span className="font-normal text-ink-muted"> · {edu.location}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-ink-muted sm:flex-col sm:items-end sm:gap-2">
                <time>{edu.period}</time>
                {edu.gpa && (
                  <span className="border border-ink/30 bg-[#c9f31d] px-2 py-0.5 text-sm text-ink">
                    GPA {edu.gpa}
                  </span>
                )}
              </div>
              {edu.coursework && edu.coursework.length > 0 && (
                <details className="details-panel sm:col-span-2">
                  <summary className="inline-flex items-center text-sm font-bold text-ink underline decoration-2 underline-offset-4">
                    Relevant coursework
                  </summary>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-muted">
                    {edu.coursework.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </details>
              )}
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
