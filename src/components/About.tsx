import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  return (
    <Section
      id="about"
      wash
      title="What belongs outside the model?"
      subtitle="The most useful systems do not ask a language model to carry every prior, constraint, and evaluation rule in its head."
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal delay={0.05}>
          <div className="relative">
            <div className="hard-card rotate-1 bg-[#c9f31d] p-6 sm:p-8">
              <p className="text-xl font-semibold leading-relaxed sm:text-2xl">
                {content.aboutResearch}
              </p>
            </div>
            <div className="mt-8 -rotate-1 border-2 border-ink bg-[#fffaf0] p-6">
              <p className="text-base leading-relaxed text-ink-muted">
                {content.aboutSoftware}
              </p>
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-widest text-ink-dim">
              Currently in {content.location}
            </p>
          </div>
        </Reveal>

        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent-bright">
            The pattern across the work
          </p>
          <ol className="border-t-2 border-ink">
            {content.currentThreads.map((thread, i) => (
              <Reveal key={thread.label} delay={0.08 + i * 0.06} as="li">
                <div className="group grid gap-3 border-b-2 border-ink py-6 sm:grid-cols-[4rem_11rem_1fr] sm:items-start">
                  <span className="font-display text-4xl font-bold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-tight">
                    {thread.label}
                  </h3>
                  <p className="leading-relaxed text-ink-muted">
                    {thread.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
