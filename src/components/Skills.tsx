import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Languages, tools, and libraries I reach for most often."
    >
      <div className="space-y-10">
        {content.skills.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 0.08}>
            <div>
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-ink-dim">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-flex rounded-xl border border-white/10 bg-surface-raised px-3.5 py-2 text-sm font-medium text-ink-muted transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-ink hover:shadow-glow-sm">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
