import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  return (
    <Section
      id="exploring"
      wash
      compact
      title="Currently exploring"
      subtitle="The questions currently shaping my experiments. The work above carries the evidence; these are the next tests."
    >
      <ol className="divide-y-2 divide-ink border-y-2 border-ink bg-surface">
        {content.currentThreads.map((thread, index) => (
          <Reveal
            key={thread.label}
            delay={Math.min(index * 0.05, 0.15)}
            as="li"
            className="grid gap-3 px-4 py-4 sm:grid-cols-[8rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-start sm:gap-6 sm:px-6"
          >
            <span className="text-sm font-bold uppercase tracking-[0.12em] text-accent-cyan">
              {thread.status}
            </span>
            <h3 className="font-display text-xl font-bold leading-tight">
              {thread.label}
            </h3>
            <p className="text-base leading-relaxed text-ink-muted">
              {thread.text}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
