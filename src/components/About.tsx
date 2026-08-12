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
      subtitle="Three questions I’m actively building and testing around language-model systems."
    >
      <ol className="grid overflow-hidden border-2 border-ink bg-surface md:grid-cols-3">
        {content.currentThreads.map((thread, i) => (
          <Reveal
            key={thread.label}
            delay={0.05 + i * 0.06}
            as="li"
            className={`relative p-5 sm:p-6 ${i > 0 ? 'border-t-2 border-ink md:border-l-2 md:border-t-0' : ''}`}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="border-2 border-ink bg-[#c9f31d] px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em]">
                {thread.status}
              </span>
              <span
                className="font-display text-sm font-bold text-accent"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
              {thread.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              {thread.text}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
