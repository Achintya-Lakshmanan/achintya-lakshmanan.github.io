import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Achievements() {
  return (
    <Section
      id="achievements"
      wash
      title="Achievements"
      subtitle="Competitions, certifications, and leadership."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.achievements.map((a, i) => (
          <Reveal key={a.id} delay={Math.min(i * 0.06, 0.3)} as="li">
            <div className="group h-full rounded-2xl border border-white/5 bg-surface-raised/60 p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-glow-sm">
              {a.logo && a.organization ? (
                <div className="mb-3">
                  <OrgLogo name={a.organization} src={a.logo} size={36} />
                </div>
              ) : (
                <div className="mb-3 h-1 w-8 rounded-full bg-accent-gradient opacity-70 transition-all duration-300 group-hover:w-12 group-hover:opacity-100" />
              )}
              <h3 className="font-display text-base font-semibold text-ink">
                {a.title}
              </h3>
              {a.detail && (
                <p className="mt-2 text-sm text-ink-muted">{a.detail}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
