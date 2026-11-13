import { Fragment } from 'react'
import { content } from '../data/content'
import { IconArrowDown, IconGitHub, IconLinkedIn } from './Icons'
import { RichText } from './RichText'
import { usePlain } from '../hooks/usePlain'

const [github, linkedin] = content.socials

export function Hero() {
  const plain = usePlain()
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="page-width hero-grid">
        <div className="panel hero-intro">
          <p className="eyebrow">{content.hero.eyebrow.split(' · ').map((part, index) => <Fragment key={part}>{index > 0 && '\u00a0· '}<span className="nowrap">{part}</span></Fragment>)}</p>
          <h1 id="hero-title" className="hero-name">Achintya<br /><span className="outlined">Lakshmanan</span></h1>
          <p className="hero-claim">I make <span className="violet">language models</span> behave reliably, and I build <span className="mint">software that ships</span>.</p>
          <p className="hero-sub"><RichText text={content.hero.sub} /></p>
          <p className="hero-hint room-only">This is my room. Click anything in it, or scroll and I'll walk you around.</p>
          <div className="hero-actions">
            <a className="button button-ink button-large" href="#research">{plain ? 'Read on' : 'Start the tour'} <IconArrowDown /></a>
            {github && <a className="button button-large button-icon" href={github.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><IconGitHub /></a>}
            {linkedin && <a className="button button-large button-icon" href={linkedin.href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>}
          </div>
        </div>
        {/* The room itself is drawn behind the page once it has loaded. Until then, and without WebGL, a still of it. */}
        <img className="hero-still" src="/room/room.webp" width={1100} height={1100} decoding="async"
          alt="My room at night, drawn in ink and flat color: a whiteboard and bookshelf on the left wall, a pinboard and a night window on the back wall, me at the desk with a monitor and laptop, and a keyboard on a stand in front." />
      </div>
    </section>
  )
}
