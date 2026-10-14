import { content } from '../data/content'
import { useActiveSection } from '../hooks/useScrollSpy'

const sectionIds = content.nav.map((item) => item.href.slice(1))

export function Navbar() {
  const active = useActiveSection(sectionIds)
  return (
    <header className="site-header">
      <nav className="page-width navigation" aria-label="Primary">
        <a className="wordmark" href="#top">
          <span className="wordmark-mark" aria-hidden>AL</span>
          <span className="wordmark-name">{content.name}</span>
        </a>
        <div className="nav-links">
          {content.nav.map((item) => <a key={item.href} className="nav-link" href={item.href}
            aria-current={active === item.href.slice(1) ? 'location' : undefined}>{item.label}</a>)}
          <a className="button button-primary button-small" href={'mailto:' + content.email}>Email me</a>
        </div>
      </nav>
    </header>
  )
}
