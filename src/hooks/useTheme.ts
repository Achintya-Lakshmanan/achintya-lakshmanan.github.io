import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

export const themeColors: Record<Theme, string> = { dark: '#0A0C10', light: '#F4F5F1' }

/** The initial theme is set before paint by the inline script in index.html. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  }, [])

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[next])
    try { localStorage.setItem('theme', next) } catch { /* storage unavailable */ }
    setTheme(next)
  }

  return { theme, toggleTheme }
}
