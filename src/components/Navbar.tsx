import { useEffect, useRef, useState } from 'react'
import { content } from '../data/content'
import { useActiveSection } from '../hooks/useScrollSpy'
import { IconClose, IconMenu } from './Icons'

const sectionIds = content.nav.map((item) => item.href.slice(1))

export function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia('(min-width: 768px)')
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false)
    }
    const onBreakpointChange = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onOutsideClick)
    desktop.addEventListener('change', onBreakpointChange)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onOutsideClick)
      desktop.removeEventListener('change', onBreakpointChange)
    }
  }, [open])

  return (
    <header className="site-header" ref={headerRef}>
      <nav className="page-width navigation" aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>Achintya Lakshmanan<span aria-hidden>.</span></a>
        <ul className="desktop-navigation">
          {content.nav.map((item) => <li key={item.href}>
            <a href={item.href} aria-current={active === item.href.slice(1) ? 'location' : undefined}>{item.label}</a>
          </li>)}
        </ul>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open}
          aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((current) => !current)}>
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>
      {open && <nav id="mobile-navigation" className="mobile-navigation page-width" aria-label="Mobile navigation">
        {content.nav.map((item) => <a key={item.href} href={item.href}
          aria-current={active === item.href.slice(1) ? 'location' : undefined}
          onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>}
    </header>
  )
}
