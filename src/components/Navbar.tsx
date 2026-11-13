import { useEffect, useRef, useState } from 'react'
import { content } from '../data/content'
import { setPlain, usePlain } from '../hooks/usePlain'
import { useActiveSection } from '../hooks/useScrollSpy'
import { useTheme } from '../hooks/useTheme'
import { IconMoon, IconSun } from './Icons'

const sectionIds = content.nav.map((item) => item.href.slice(1))

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const { theme, toggleTheme } = useTheme()
  const plain = usePlain()
  const label = theme === 'dark' ? 'Switch to the day page' : 'Switch to the night page'
  // Below 1080px the chapter links fold into a menu.
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButton.current?.focus()
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node
      if (!sheet.current?.contains(target) && !menuButton.current?.contains(target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    sheet.current?.querySelector('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])
  const links = (className: string) => content.nav.map((item, index) => <a key={item.href} className={className} href={item.href}
    aria-current={active === item.href.slice(1) ? 'location' : undefined} onClick={() => setOpen(false)}>0{index + 1} {item.label}</a>)

  return (
    <header className="site-header">
      <nav className="page-width navigation" aria-label="Primary">
        <a className="wordmark" href="#top">
          <span className="wordmark-mark" aria-hidden>AL</span>
          <span className="wordmark-name">{content.name}</span>
        </a>
        <div className="nav-links">
          {links('nav-link')}
          <button ref={menuButton} type="button" className="nav-button nav-menu" aria-expanded={open} aria-controls="chapter-menu"
            onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
          <button type="button" className="nav-button nav-skip" onClick={() => setPlain(!plain)}>
            {plain ? 'Show the room' : 'Skip the room'}
          </button>
          <button type="button" className="nav-button nav-icon" onClick={toggleTheme} aria-label={label} title={label}>
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <a className="button button-mint" href={'mailto:' + content.email}>Email me</a>
        </div>
      </nav>
      <div ref={sheet} id="chapter-menu" className="nav-sheet" hidden={!open}>
        <div className="page-width">
          {links('nav-sheet-link')}
          <button type="button" className="nav-sheet-link nav-sheet-skip" onClick={() => { setPlain(!plain); setOpen(false) }}>
            {plain ? 'Show the room' : 'Skip the room'}
          </button>
        </div>
      </div>
    </header>
  )
}
