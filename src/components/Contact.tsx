import { useState } from 'react'
import { content } from '../data/content'
import { IconArrowUpRight, IconCheck, IconCopy } from './Icons'
import { socialIconMap } from './socialIcons'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable; the mailto link still works */ }
  }

  return <section id="contact" className="contact-section" aria-labelledby="contact-title">
    <div className="contact-glow" aria-hidden />
    <div className="page-width contact-layout" data-reveal>
      <p className="mono-label"><span aria-hidden>05</span>Get in touch</p>
      <h2 id="contact-title">Let's <em className="gradient-text">talk.</em></h2>
      <p className="contact-copy">{content.contactCopy}</p>
      <div className="contact-actions">
        <a className="button button-primary button-large" href={'mailto:' + content.email}>{content.email}<IconArrowUpRight /></a>
        <button type="button" className="button button-ghost button-large" onClick={copyEmail} aria-live="polite">
          {copied ? <><IconCheck />Copied</> : <><IconCopy />Copy email</>}
        </button>
      </div>
      <ul className="contact-socials">
        {content.socials.filter((link) => link.icon !== 'email').map((link) => {
          const Icon = socialIconMap[link.icon]
          return <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer"><Icon />{link.label}<IconArrowUpRight /></a></li>
        })}
      </ul>
    </div>
  </section>
}

export function Footer() {
  return <footer className="site-footer"><div className="page-width">
    <p>© {content.copyrightYear} {content.name}. Designed and built with React &amp; Vite.</p>
    <a href="#top">Back to top <span aria-hidden>↑</span></a>
  </div></footer>
}
