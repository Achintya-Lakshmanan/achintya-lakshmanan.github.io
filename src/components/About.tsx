import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="Building learning systems that reason, decide, and adapt — efficiently."
    >
      <Reveal delay={0.08}>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
            {content.bio}
          </p>
          <div className="rounded-2xl border border-white/5 bg-surface-raised/80 p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ink-dim">Location</dt>
                <dd className="mt-1 font-medium text-ink">{content.location}</dd>
              </div>
              <div>
                <dt className="text-ink-dim">Focus</dt>
                <dd className="mt-1 font-medium text-ink">
                  LLMs · Reinforcement Learning · Alignment
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
