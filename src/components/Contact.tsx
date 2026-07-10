import { content } from '../data/content'
import { socialIconMap } from './socialIcons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Open to research collaborations, internships, and interesting problems."
    >
      <Reveal>
        <div className="rounded-2xl border border-white/5 bg-surface-raised/80 p-8 text-center sm:p-12">
          <p className="mx-auto max-w-lg text-base text-ink-muted sm:text-lg">
            The best way to reach me is by email. I&apos;m always happy to talk
            about LLMs, interpretability, multi-agent systems, and building
            efficient ML systems.
          </p>
          <a
            href={`mailto:${content.email}`}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {content.email}
          </a>

          <div className="mt-8 flex items-center justify-center gap-4">
            {content.socials.map((s) => {
              const Icon = socialIconMap[s.icon]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.icon === 'email' ? undefined : '_blank'}
                  rel={s.icon === 'email' ? undefined : 'noopener noreferrer'}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-ink-muted transition-all duration-200 hover:border-accent/40 hover:text-ink hover:shadow-glow-sm"
                  aria-label={s.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-ink-dim sm:flex-row sm:px-8">
        <p>
          © {year} {content.name}
        </p>
        <p className="text-xs">
          Built with React, Vite, Tailwind & Framer Motion
        </p>
      </div>
    </footer>
  )
}
