import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Education() {
  return (
    <Section
      id="education"
      title="Where I studied"
      subtitle="Penn State now; Shiv Nadar before that."
    >
      <ul className="border-t-2 border-ink">
        {content.education.map((edu, i) => (
          <Reveal key={edu.id} delay={i * 0.1} as="li">
            <article className="border-b-2 border-ink py-7 sm:py-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3.5">
                  <OrgLogo
                    name={edu.institution}
                    src={edu.logo}
                    size={48}
                    className="mt-0.5"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-bold leading-tight text-ink">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-accent-cyan">
                      {edu.institution}
                      <span className="text-ink-dim"> · {edu.location}</span>
                    </p>
                  </div>
                </div>
                <div className="text-left text-sm font-bold text-ink-dim sm:text-right">
                  <time className="block">{edu.period}</time>
                  {edu.gpa && (
                    <span className="mt-2 inline-block border-2 border-ink bg-[#c9f31d] px-2 py-0.5 text-xs text-ink">
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
              </div>
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-dim">
                    Useful coursework
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {edu.coursework.map((c) => (
                      <li
                        key={c}
                        className="border-b border-ink px-1 py-0.5 text-xs text-ink-muted"
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
