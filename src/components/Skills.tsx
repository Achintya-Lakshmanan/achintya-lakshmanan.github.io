import { content } from '../data/content'
import { Section } from './Section'

export function Skills() {
  return <Section id="skills" index="05" title="Tools I work with">
    <div className="skill-groups">{content.skills.map((group) => <div className="skill-group" key={group.id}>
      <h3>{group.category}</h3>
      <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
    </div>)}</div>
  </Section>
}
