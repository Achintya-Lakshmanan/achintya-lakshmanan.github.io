import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { content } from '../data/content'
import { useActiveSection } from '../hooks/useScrollSpy'
import type { Theme } from '../hooks/useTheme'
import { IconClose, IconMenu, IconMoon, IconPause, IconPlay, IconSun } from './Icons'

const sectionIds = content.nav.map((item) => item.href.slice(1))
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

interface NavbarProps {
  motionPaused: boolean
  reducedMotion: boolean
  onToggleMotion: () => void
  theme: Theme
  onToggleTheme: () => void
}

export function Navbar({ motionPaused, reducedMotion, onToggleMotion, theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)
  const active = useActiveSection(sectionIds)

  // Slide the pill behind whichever section is in view.
  useIsomorphicLayoutEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>('a[aria-current]')
    setIndicator(link ? { left: link.offsetLeft, width: link.offsetWidth } : null)
  }, [active])

  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia('(min-width: 860px)')
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
    <header className={'site-header' + (open ? ' is-open' : '')} ref={headerRef}>
      <div className="progress-bar" aria-hidden />
      <nav className="page-width navigation" aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          <span className="wordmark-mark" aria-hidden>AL</span>
          <span className="wordmark-name">Achintya Lakshmanan</span>
        </a>
        <ul className="desktop-navigation" ref={listRef}>
          {indicator && <li className="nav-indicator" aria-hidden style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} />}
          {content.nav.map((item) => <li key={item.href}>
            <a href={item.href} aria-current={active === item.href.slice(1) ? 'location' : undefined}>{item.label}</a>
          </li>)}
        </ul>
        <div className="navigation-controls">
          {!reducedMotion && <button className="icon-button" type="button" onClick={onToggleMotion} aria-pressed={motionPaused}
            aria-label={motionPaused ? 'Resume animations' : 'Pause animations'} title={motionPaused ? 'Resume animations' : 'Pause animations'}>
            {motionPaused ? <IconPlay /> : <IconPause />}
          </button>}
          <button className="icon-button" type="button" onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} title={theme === 'dark' ? 'Light theme' : 'Dark theme'}>
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <a className="nav-cta" href={'mailto:' + content.email}>Get in touch</a>
          <button ref={toggleRef} className="icon-button menu-toggle" type="button" aria-expanded={open}
            aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((current) => !current)}>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </nav>
      {open && <nav id="mobile-navigation" className="mobile-navigation page-width" aria-label="Mobile navigation">
        {content.nav.map((item, index) => <a key={item.href} href={item.href} style={{ animationDelay: index * 40 + 'ms' }}
          aria-current={active === item.href.slice(1) ? 'location' : undefined}
          onClick={() => setOpen(false)}><span aria-hidden>{String(index + 1).padStart(2, '0')}</span>{item.label}</a>)}
      </nav>}
    </header>
  )
}
