import { content } from '../data/content'
import { IconEmail, IconGitHub, IconLinkedIn } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Contact() {
  const github = content.socials.find((social) => social.icon === 'github')
  const linkedin = content.socials.find((social) => social.icon === 'linkedin')

  return (
    <Section
      id="contact"
      className="border-y border-ink bg-accent-cyan"
      title="Let’s talk"
      subtitle="For ML and research engineering roles, collaboration, or a thoughtful question about the work."
      headerTone="on-accent"
    >
      <Reveal>
        <div className="grid gap-8 border-2 border-ink bg-[#fffaf0] p-6 shadow-[8px_8px_0_#171717] sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <p className="max-w-2xl text-lg font-semibold leading-relaxed sm:text-2xl">
            {content.contactCopy}
          </p>
          <div className="flex flex-col items-start gap-4">
            <a
              href={`mailto:${content.email}`}
              className="inline-flex items-center gap-2 border-2 border-ink bg-[#c9f31d] px-5 py-3 text-base font-bold text-ink shadow-[4px_4px_0_#171717] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <IconEmail className="h-5 w-5" />
              {content.email}
            </a>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
                >
                  <IconLinkedIn className="h-4 w-4" /> LinkedIn
                </a>
              )}
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
                >
                  <IconGitHub className="h-4 w-4" /> GitHub
                </a>
              )}
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
    <footer className="bg-ink py-7 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 text-sm sm:flex-row sm:items-center sm:px-8">
        <p className="font-bold">© {year} {content.name}</p>
        <p className="text-sm text-white/70">Built around the questions worth testing.</p>
      </div>
    </footer>
  )
}
