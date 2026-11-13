import { useEffect, useRef } from 'react'
import { About } from './About'
import { Contact } from './Contact'
import { Engineering } from './Engineering'
import { Experience } from './Experience'
import { Research } from './Research'

/**
 * The chapters, read over the room. Each opens with a gate, an empty stretch of page where the camera turns to that
 * chapter's corner; once it gets there (`is-arrived`, set by the room) the chapter's cards come up as they scroll in.
 * "Being read" is the last gate or card (`data-beat`) whose top has passed the reading line; it is written on this
 * element as `data-chapter` (-1 in the hero) and `data-beat` for the room to follow.
 */
export function Tour() {
  const tourRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tour = tourRef.current
    if (!tour) return
    const beats = [...tour.querySelectorAll<HTMLElement>('[data-beat]')]
    let frame = 0
    const follow = () => {
      frame = 0
      const line = window.innerHeight * (window.innerWidth < 900 ? 0.62 : 0.55)
      let current: HTMLElement | undefined
      for (const beat of beats) {
        const box = beat.getBoundingClientRect()
        // (A filtered-out card has no box: it is not being read.)
        if (box.height && box.top <= line) current = beat
      }
      const chapter = current?.closest<HTMLElement>('[data-chapter]')?.dataset.chapter ?? '-1'
      const beat = current?.dataset.beat ?? 'top'
      if (tour.dataset.beat !== beat) {
        tour.dataset.beat = beat
        // The card being read gets the violet shadow, matching what lights up in the room.
        beats.forEach((element) => element.classList.toggle('is-current', element === current))
      }
      if (tour.dataset.chapter !== chapter) tour.dataset.chapter = chapter
    }
    const queue = () => { if (!frame) frame = requestAnimationFrame(follow) }
    follow()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)

    // Each card comes up as it scrolls into view (and only once the camera has reached its chapter: see index.css).
    // If the camera hasn't got there a little after a card is in view (a busy GPU, a background tab), the card comes up
    // anyway: what is to be read never waits on the room.
    const fallbacks = new Set<number>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
        const chapter = entry.target.closest('.chapter')
        const timer = window.setTimeout(() => { fallbacks.delete(timer); chapter?.classList.add('is-arrived') }, 1800)
        fallbacks.add(timer)
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })
    tour.querySelectorAll('.chapter > :not(.gate):not(.roles), .roles > li').forEach((element) => observer.observe(element))

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      fallbacks.forEach((timer) => window.clearTimeout(timer))
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [])

  return (
    <div ref={tourRef} className="tour" data-chapter="-1" data-beat="top">
      <div className="page-width tour-grid">
        <div className="chapters">
          <Research />
          <Engineering />
          <Experience />
          <About />
          <Contact />
        </div>
      </div>
    </div>
  )
}
