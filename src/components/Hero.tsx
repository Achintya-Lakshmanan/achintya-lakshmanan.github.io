import { content } from '../data/content'
import { IconExternal } from './Icons'

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="page-width">
        <p className="eyebrow hero-eyebrow">Software engineer & ML researcher</p>
        <div className="hero-layout">
          <div>
            <h1 className="hero-name"><span>Achintya </span><em>Lakshmanan.</em></h1>
            <p className="hero-bio">{content.bio}</p>
            <div className="hero-links">
              <a className="text-link" href="#research-work">Explore my work <span aria-hidden>↓</span></a>
              {content.socials.map((link) => (
                <a key={link.href} className="text-link" href={link.href}
                  target={link.icon === 'email' ? undefined : '_blank'}
                  rel={link.icon === 'email' ? undefined : 'noopener noreferrer'}>
                  {link.label}<IconExternal />
                </a>
              ))}
            </div>
          </div>
          {content.photo && <figure className="hero-portrait">
            <img src={content.photo} alt="Achintya at the Grand Canyon" width={640} height={720} fetchPriority="high" decoding="async" />
            <figcaption>{content.location}</figcaption>
          </figure>}
        </div>
        <div className="hero-footnote">
          <span>Graduate researcher, Penn State NLP Group</span>
          <span>MS CSE <span aria-hidden>·</span> Expected May 2027</span>
        </div>
      </div>
    </section>
  )
}
