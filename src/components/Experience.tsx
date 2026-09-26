import { content, type Experience as ExperienceEntry } from '../data/content'
import { OrgLogo } from './OrgLogo'
import { Section } from './Section'

const months: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 }

function startDate(entry: ExperienceEntry): number {
  const match = entry.period.match(/^([A-Za-z]{3})\s+(\d{4})/)
  if (!match) return 0
  const month = months[match[1]!.toLowerCase()]
  return month === undefined ? 0 : Date.UTC(Number(match[2]), month, 1)
}

const experience = [...content.experience].sort((a, b) => startDate(b) - startDate(a))

export function Experience() {
  return <Section id="experience" index="03" title="Experience">
    <ol className="experience-list">
      {experience.map((entry) => <li className="experience-entry" key={entry.id}>
        <div className="experience-heading">
          <time>{entry.period}</time>
          <div className="experience-organization">
            <OrgLogo name={entry.organization} src={entry.logo} size={28} />
            <h3>{entry.organization}</h3>
          </div>
          <p>{entry.title}</p>
        </div>
        <ul className="experience-bullets" aria-label={entry.title + ' at ' + entry.organization}>
          {[entry.context, ...entry.highlights].map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      </li>)}
    </ol>
  </Section>
}
