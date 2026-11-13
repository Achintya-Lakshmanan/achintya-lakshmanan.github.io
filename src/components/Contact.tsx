import { content } from '../data/content'
import { ChapterHeading } from './ChapterHeading'

export function Contact() {
  return (
    <section id="contact" className="chapter chapter-last" data-chapter="4" aria-labelledby="contact-title">
      {/* The chapter opens with its heading, held at the top while the camera turns to its corner of the room. */}
      <div className="gate" data-beat="contact">
        <ChapterHeading id="contact-title" number={5} title="Contact" />
      </div>
      <div className="card contact-card">
        <p className="contact-title">Let's talk.</p>
        <p>{content.contactCopy}</p>
        <a className="button button-mint button-large contact-email" href={'mailto:' + content.email}>{content.email} ↗</a>
        <div className="card-links">
          {content.socials.map((link) => <a key={link.href} className="button" href={link.href}
            target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
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
