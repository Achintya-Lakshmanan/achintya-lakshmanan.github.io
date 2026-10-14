import { content } from '../data/content'
import { AdvisorText } from './AdvisorText'
import { IconArrowDown, IconGitHub, IconLinkedIn, IconPin } from './Icons'

const github = content.socials.find((link) => link.icon === 'github')
const linkedin = content.socials.find((link) => link.icon === 'linkedin')
const gpa = content.education[0]?.gpa?.split('/')[0]

const stats = [
  { value: gpa ?? '', label: 'GPA in the MS CSE program at Penn State' },
  { value: '1st', label: 'place at the Encryptcon hackathon, IIT Madras' },
].filter((stat) => stat.value)

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden>
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" />
        <div className="hero-grid" />
      </div>
      <div className="page-width">
        <div className="hero-layout">
          <div className="hero-introduction">
            <p className="hero-badge"><span className="status-dot" aria-hidden />Graduate researcher <span aria-hidden>·</span> Penn State NLP</p>
            <h1 className="hero-name" id="hero-title">
              <span className="name-mask"><span>Achintya</span></span>
              <span className="name-mask"><em className="gradient-text">Lakshmanan</em></span>
            </h1>
            <p className="hero-role">Software engineer &amp; ML researcher working on <strong>LLM agents</strong> and <strong>reinforcement learning</strong>.</p>
            <p className="hero-bio"><AdvisorText text={content.bio} /></p>
            <div className="hero-actions">
              <a className="button button-primary" href="#research-work">See my work <IconArrowDown /></a>
              <a className="button button-ghost" href={'mailto:' + content.email}>Email me</a>
              {github && <a className="icon-link" href={github.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><IconGitHub /></a>}
              {linkedin && <a className="icon-link" href={linkedin.href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>}
            </div>
          </div>
          {content.photo && <figure className="hero-portrait">
            <div className="portrait-frame">
              <img src={content.photo} alt="Achintya at the Grand Canyon" width={800} height={800} fetchPriority="high" decoding="async" />
            </div>
            <span className="portrait-chip chip-interest" aria-hidden>RL <span>×</span> LLMs</span>
            <figcaption className="portrait-chip chip-location"><IconPin />{content.location}</figcaption>
          </figure>}
        </div>

        <div className="hero-lower">
          <div className="now-card">
            <p className="mono-label">Right now</p>
            <ul>{content.now.map((line) => <li key={line}><AdvisorText text={line} /></li>)}</ul>
          </div>
          <dl className="stats">
            {stats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd className="gradient-text">{stat.value}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function SkillMarquee() {
  const skills = content.skills.flatMap((group) => group.skills)
  const row = skills.map((skill) => <li key={skill}>{skill}</li>)
  return (
    <div className="marquee" aria-label="Tools I work with">
      <ul className="marquee-track">{row}</ul>
      <ul className="marquee-track" aria-hidden>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
    </div>
  )
}
