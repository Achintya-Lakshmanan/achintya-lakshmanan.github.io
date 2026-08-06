import { content } from '../data/content'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  const skills = content.skills.flatMap((group) => group.skills)

  return (
    <Section
      id="skills"
      title="The toolbox"
      subtitle="A shorter list of things I have actually used to make the work above."
    >
      <Reveal>
        <div
          className="mb-16 w-full border-2 border-ink bg-accent-cyan px-4 py-4 text-white"
          aria-hidden="true"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 font-display text-base font-bold uppercase sm:text-lg"
              >
                <span className="text-[#c9f31d]">✦</span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-0 border-2 border-ink bg-[#fffaf0] md:grid-cols-2">
        {content.skills.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 0.08}>
            <div
              className={`h-full border-b-2 border-ink p-6 ${
                gi % 2 === 0 ? 'md:border-r-2' : ''
              } ${gi >= content.skills.length - 2 ? 'md:border-b-0' : ''}`}
            >
              <h3 className="font-display text-2xl font-bold">
                {group.category}
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-ink-muted">
                {group.skills.map((skill, i) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 border border-ink ${
                        i % 3 === 0
                          ? 'bg-accent'
                          : i % 3 === 1
                            ? 'bg-[#c9f31d]'
                            : 'bg-accent-cyan'
                      }`}
                      aria-hidden
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
