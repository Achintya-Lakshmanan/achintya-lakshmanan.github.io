import { content } from '../data/content'
import { IconExternal } from './Icons'

export function Contact() {
  return <section id="contact" className="contact-section" aria-labelledby="contact-title">
    <div className="page-width contact-layout">
      <div><p className="eyebrow">Get in touch</p><h2 id="contact-title">Let's talk.</h2></div>
      <div className="contact-copy"><p>{content.contactCopy}</p>
        <a className="contact-email" href={'mailto:' + content.email}>{content.email}<IconExternal /></a>
        <div className="contact-socials">{content.socials.filter((link) => link.icon !== 'email').map((link) =>
          <a className="text-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<IconExternal /></a>
        )}</div>
      </div>
    </div>
  </section>
}

export function Footer() {
  return <footer className="site-footer"><div className="page-width">
    <p>© {content.copyrightYear} {content.name}</p><a href="#top">Back to top <span aria-hidden>↑</span></a>
  </div></footer>
}
