import { useEffect, useRef, useState } from 'react'

const motionKey = 'motion-paused'

export function usePageMotion() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    try { setPaused(localStorage.getItem(motionKey) === '1') } catch { /* storage unavailable */ }
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduced(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)

    // Content starts visible. The observer only adds progressive motion.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('has-entered')
        observer.unobserve(entry.target)
      }
    }, { threshold: .08, rootMargin: '0px 0px -6% 0px' })
    rootRef.current?.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))

    // Pointer position drives the page glow and each card's spotlight border.
    const root = document.documentElement
    let frame = 0
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--cursor-x', event.clientX + 'px')
        root.style.setProperty('--cursor-y', event.clientY + 'px')
        const card = (event.target as Element | null)?.closest?.<HTMLElement>('.spotlight')
        if (card) {
          const box = card.getBoundingClientRect()
          card.style.setProperty('--mx', event.clientX - box.left + 'px')
          card.style.setProperty('--my', event.clientY - box.top + 'px')
        }
      })
    }

    // Reading progress bar along the top edge.
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--progress', String(max > 0 ? window.scrollY / max : 0))
      root.classList.toggle('is-scrolled', window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      preference.removeEventListener('change', updatePreference)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toggleMotion = () => setPaused(current => {
    try { localStorage.setItem(motionKey, current ? '0' : '1') } catch { /* storage unavailable */ }
    return !current
  })

  return { rootRef, paused, reduced, toggleMotion }
}
