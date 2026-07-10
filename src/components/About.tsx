import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  return (
    <Section
      id="about"
      wash
      title="About"
      subtitle="Research interests, software engineering, and the work in between."
    >
      <Reveal delay={0.08}>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>{content.aboutResearch}</p>
            <p>{content.aboutSoftware}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-surface-raised/80 p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ink-dim">Location</dt>
                <dd className="mt-1 font-medium text-ink">{content.location}</dd>
              </div>
              <div>
                <dt className="text-ink-dim">Focus</dt>
                <dd className="mt-1 font-medium text-ink">
                  LLMs · Reinforcement Learning · Software Engineering
                </dd>
              </div>
              <div>
                <dt className="text-ink-dim">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${content.email}`}
                    className="font-medium text-accent-bright transition-colors hover:text-accent-cyan"
                  >
                    {content.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
