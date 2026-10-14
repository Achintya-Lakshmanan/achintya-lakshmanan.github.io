import { content } from '../data/content'
import { useActiveSection } from '../hooks/useScrollSpy'
import { useTheme } from '../hooks/useTheme'
import { IconMoon, IconSun } from './Icons'

const sectionIds = content.nav.map((item) => item.href.slice(1))

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
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
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={label} title={label}>
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <a className="button button-primary button-small" href={'mailto:' + content.email}>Email me</a>
        </div>
      </nav>
    </header>
  )
}
