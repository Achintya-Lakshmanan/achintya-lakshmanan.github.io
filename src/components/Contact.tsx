import { rewardBars } from '../data/bars'
import { content } from '../data/content'

const curve = rewardBars(40, 99, 11)

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="bars reward-curve" aria-hidden>
        {curve.map((value, i) => <span key={i} className={i > 30 ? 'hot' : undefined} style={{ height: value * 100 + '%' }} />)}
      </div>
      <div className="page-width contact-layout">
        <div className="contact-copy">
          <p className="section-index">05 / reward ↑</p>
          <h2 id="contact-title">Let's talk.</h2>
          <p>{content.contactCopy}</p>
        </div>
        <div className="contact-actions">
          <a className="button button-primary button-huge" href={'mailto:' + content.email}>{content.email} ↗</a>
          <div className="contact-socials">
            {content.socials.map((link) => <a key={link.href} className="button button-ghost" href={link.href}
              target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <span>© {content.copyrightYear} {content.name}</span>
        <span>{content.location}</span>
      </div>
    </footer>
  )
}
