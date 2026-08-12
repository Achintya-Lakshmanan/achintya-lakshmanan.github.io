import { content } from '../data/content'
import { socialIconMap } from './socialIcons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contact() {
  return (
    <Section
      id="contact"
      className="border-y-2 border-ink bg-accent-cyan"
      title="Say hello"
      subtitle="The fastest way to reach me is email."
      headerTone="on-accent"
    >
      <Reveal>
        <div className="grid gap-8 border-2 border-ink bg-[#fffaf0] p-7 shadow-[10px_10px_0_#171717] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-2xl text-xl font-semibold leading-relaxed sm:text-2xl">
            {content.contactCopy}
          </p>
          <div>
            <a
              href={`mailto:${content.email}`}
              className="inline-flex -rotate-1 items-center justify-center border-2 border-ink bg-[#c9f31d] px-6 py-4 text-sm font-bold uppercase tracking-wide text-ink shadow-[5px_5px_0_#171717] transition-transform hover:rotate-1 hover:shadow-none"
            >
              {content.email}
            </a>
            <div className="mt-6 flex items-center gap-3">
              {content.socials
                .filter((s) => s.icon !== 'email')
                .map((s) => {
                  const Icon = socialIconMap[s.icon]
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-ink bg-[#fffaf0] p-3 text-ink transition-transform hover:-rotate-6 hover:bg-[#ff8eb3]"
                      aria-label={`${s.label} (opens in a new tab)`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-ink-dim sm:flex-row sm:px-8">
        <p className="font-bold text-white">
          © {year} {content.name}
        </p>
        <p className="text-xs text-white/60">
          Designed and built by the person whose name is enormous at the top.
        </p>
      </div>
    </footer>
  )
}
