import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section
      id="skills"
      compact
      title="Skills"
      subtitle="Two concise toolkits drawn from the projects and roles above: research systems and software products."
    >
      <div className="grid border-y border-ink/30 sm:grid-cols-2">
        {content.skills.map((group, index) => (
          <Reveal key={group.id} delay={Math.min(index * 0.05, 0.15)}>
            <article
              className={`h-full border-b border-ink/25 py-5 sm:px-6 sm:py-6 ${
                index % 2 === 0 ? 'sm:border-r' : ''
              } ${index >= content.skills.length - 2 ? 'sm:border-b-0' : ''}`}
            >
              <h3 className="font-display text-xl font-bold tracking-[-0.02em]">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-base text-ink-muted">
                {group.skills.map((skill) => (
                  <li key={skill} className="before:mr-2 before:text-accent-cyan before:content-['·']">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
