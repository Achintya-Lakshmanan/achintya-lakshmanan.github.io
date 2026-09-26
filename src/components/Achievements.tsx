import { content } from '../data/content'
import { Section } from './Section'

export function Achievements() {
  const selected = content.achievements.slice(0, 3)
  const additional = content.achievements.slice(3)
  return <Section id="achievements" index="06" title="A few other things">
    <ul className="recognition-list">{selected.map((entry) => <li key={entry.id}><h3>{entry.title}</h3><p>{entry.detail}</p></li>)}</ul>
    <ul className="personal-notes">{additional.map((entry) => <li key={entry.id}>{entry.title}{entry.detail && <span>, {entry.detail}</span>}</li>)}</ul>
  </Section>
}
