import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Achievements() {
  const selected = content.achievements.slice(0, 3)
  const additional = content.achievements.slice(3)

  return (
    <Section
      id="achievements"
      compact
      title="Selected recognition"
      subtitle="A few signals beyond project work."
    >
      <ul className="grid gap-4 sm:grid-cols-3">
        {selected.map((achievement, index) => (
          <Reveal key={achievement.id} delay={index * 0.05} as="li">
            <article className="h-full border border-ink/30 bg-[#fffaf0] p-4">
              {achievement.logo && achievement.organization && (
                <OrgLogo name={achievement.organization} src={achievement.logo} size={36} className="mb-4" />
              )}
              <h3 className="font-display text-lg font-bold leading-tight">{achievement.title}</h3>
              {achievement.detail && <p className="mt-2 text-sm text-ink-muted">{achievement.detail}</p>}
            </article>
          </Reveal>
        ))}
      </ul>

      {additional.length > 0 && (
        <details className="details-panel mt-5 border-t border-ink/20 pt-4">
          <summary className="inline-flex items-center text-sm font-bold text-ink underline decoration-2 underline-offset-4">
            Other campus and personal background
          </summary>
          <ul className="mt-4 grid gap-x-8 gap-y-3 text-base text-ink-muted sm:grid-cols-2">
            {additional.map((achievement) => (
              <li key={achievement.id}>
                <span className="font-semibold text-ink">{achievement.title}</span>
                {achievement.detail && <span> · {achievement.detail}</span>}
              </li>
            ))}
          </ul>
        </details>
      )}
    </Section>
  )
}
