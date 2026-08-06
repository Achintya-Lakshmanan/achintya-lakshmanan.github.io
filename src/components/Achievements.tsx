import { content } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Achievements() {
  return (
    <Section
      id="achievements"
      wash
      title="A few other things"
      subtitle="The parts that do not fit neatly into papers, projects, or commit history."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.achievements.map((a, i) => (
          <Reveal key={a.id} delay={Math.min(i * 0.06, 0.3)} as="li">
            <div
              className={`group h-full border-2 border-ink p-5 shadow-[5px_5px_0_#171717] transition-transform hover:rotate-0 ${
                i % 3 === 0 ? '-rotate-1' : i % 3 === 1 ? 'rotate-1' : ''
              } ${
                i % 3 === 0
                  ? 'bg-[#c9f31d]'
                  : i % 3 === 1
                    ? 'bg-[#ff8eb3]'
                    : 'bg-[#fffaf0]'
              }`}
            >
              {a.logo && a.organization ? (
                <div className="mb-3">
                  <OrgLogo name={a.organization} src={a.logo} size={36} />
                </div>
              ) : (
                <div className="mb-4 font-display text-3xl font-bold" aria-hidden>
                  ✦
                </div>
              )}
              <h3 className="font-display text-lg font-bold leading-tight text-ink">
                {a.title}
              </h3>
              {a.detail && (
                <p className="mt-2 text-sm font-medium text-ink">{a.detail}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
