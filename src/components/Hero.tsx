import { rewardBars } from '../data/bars'
import { content } from '../data/content'
import { AdvisorText } from './AdvisorText'
import { IconArrowDown, IconGitHub, IconLinkedIn } from './Icons'

const spark = rewardBars(20, 7, 6)
const [github, linkedin] = content.socials

function AgentTerminal() {
  return (
    <figure className="agent" aria-label="A terminal running an agent loop that summarizes Achintya's profile">
      <div className="terminal">
        <div className="terminal-bar">
          <span aria-hidden /><span aria-hidden /><span aria-hidden />
          <span className="terminal-title">agent_loop.py</span>
        </div>
        <div className="terminal-body">
          {content.terminal.map((line) => <div key={line.call}>
            <p className="terminal-call">&gt; {line.call}</p>
            <p className="terminal-output">{line.output}</p>
          </div>)}
          <p className="terminal-call terminal-reward">&gt; reward</p>
          <div className="bars spark" aria-hidden>
            {spark.map((value, i) => <span key={i} style={{ height: value * 100 + '%', opacity: 0.35 + (i / spark.length) * 0.65 }} />)}
          </div>
          <p className="terminal-status">episode running<span className="cursor" aria-hidden /></p>
        </div>
      </div>
      <div className="portrait">
        <img src={content.photo} alt="Achintya Lakshmanan at the Grand Canyon" width={420} height={524} fetchPriority="high" decoding="async" />
        <span className="portrait-tag">{content.location}</span>
      </div>
    </figure>
  )
}

export function Hero() {
  const gpa = content.education[0]!
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="page-width hero-layout">
        <div className="hero-intro">
          <p className="pill-badge"><span className="dot" aria-hidden />{content.badge}</p>
          <h1 id="hero-title" className="hero-name">Achintya<br />Lakshmanan</h1>
          <div className="tokens" aria-hidden>
            <span className="tokens-label">tokens →</span>
            {content.tokens.map((token, i) => <span key={i} className={'token ' + (i % 2 ? 'token-violet' : 'token-mint')}>{token.replace(' ', '␣')}</span>)}
          </div>
          <p className="hero-role">Software engineer &amp; ML researcher working on <span className="violet">LLM agents</span> and <span className="mint">reinforcement learning</span>.</p>
          <p className="hero-bio"><AdvisorText text={content.bio} /></p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#research">See my research <IconArrowDown /></a>
            {github && <a className="button button-ghost button-large" href={github.href} target="_blank" rel="noopener noreferrer"><IconGitHub />GitHub</a>}
            {linkedin && <a className="button button-ghost button-large" href={linkedin.href} target="_blank" rel="noopener noreferrer"><IconLinkedIn />LinkedIn</a>}
          </div>
        </div>
        <AgentTerminal />
      </div>

      <div className="page-width hero-lower">
        <div className="card now-card">
          <p className="comment">// right now</p>
          <ul>{content.now.map((line) => <li key={line}><AdvisorText text={line} /></li>)}</ul>
        </div>
        <div className="card stat-card">
          <p className="stat-value">{gpa.gpa}</p>
          <p className="stat-label">GPA in the MS CSE program at Penn State</p>
        </div>
      </div>
    </section>
  )
}
