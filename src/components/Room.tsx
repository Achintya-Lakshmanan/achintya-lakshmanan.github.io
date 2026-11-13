import { useEffect, useRef, useState } from 'react'
import type { Room as Scene } from '../scenes/room'
import { usePlain } from '../hooks/usePlain'

const CORNERS = [
  { label: 'Research', href: '#research' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/**
 * The 3D room, on a canvas behind the whole page (see `scenes/room.ts`). Over it: a tag beside each corner of the
 * room in the hero, a caption saying what is on show during the tour, and a pause button.
 */
export function Room() {
  const plain = usePlain()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const tagRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const sceneRef = useRef<Scene | null>(null)
  const [running, setRunning] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (plain) return
    const canvas = canvasRef.current
    const caption = captionRef.current
    const hero = document.querySelector<HTMLElement>('.hero')
    const intro = document.querySelector<HTMLElement>('.hero-intro')
    const tour = document.querySelector<HTMLElement>('.tour')
    const column = document.querySelector<HTMLElement>('.chapters')
    const header = document.querySelector<HTMLElement>('.site-header')
    const sections = [...document.querySelectorAll<HTMLElement>('.chapter')]
    if (!canvas || !caption || !hero || !intro || !tour || !column || !header) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setRunning(!reducedMotion)
    let disposed = false
    // three.js is loaded only in the browser, after the page's text is already readable.
    import('../scenes/room')
      .then(({ createRoom }) => createRoom(canvas, {
        hero, intro, tour, column, sections, header, caption,
        tags: tagRefs.current.filter((tag): tag is HTMLAnchorElement => tag !== null),
        running: !reducedMotion, reducedMotion,
      }))
      .then((scene) => {
        if (disposed) return scene.dispose()
        sceneRef.current = scene
        setReady(true)
      })
      .catch(() => {
        // No WebGL: the page reads as a plain list, with a still of the room in the hero.
        document.documentElement.classList.add('no-room')
      })
    return () => {
      disposed = true
      sceneRef.current?.dispose()
      sceneRef.current = null
      // The room marks the page live on its first frame; with it gone the page goes back to plain paper.
      document.documentElement.classList.remove('room-live')
      sections.forEach((section) => section.classList.remove('is-arrived'))
      setReady(false)
    }
  }, [plain])

  const toggle = () => {
    sceneRef.current?.setRunning(!running)
    setRunning(!running)
  }

  return <>
    <canvas ref={canvasRef} className="room-canvas" aria-hidden />
    <nav className="room-tags" aria-label="Corners of the room">
      {CORNERS.map((corner, index) => <a key={corner.href} ref={(node) => { tagRefs.current[index] = node }} className="room-tag" href={corner.href}>
        <span>0{index + 1}</span>{corner.label}
      </a>)}
    </nav>
    <p ref={captionRef} className="room-caption" aria-hidden />
    {ready && <button type="button" className="room-pause" onClick={toggle}>{running ? 'Pause the room' : 'Play the room'}</button>}
  </>
}
