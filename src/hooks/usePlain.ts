import { useSyncExternalStore } from 'react'

// "Skip the room": the page as a plain list, with no 3D. The choice is kept for next time, and the inline
// script in index.html applies it before the first paint.
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setPlain(plain: boolean) {
  document.documentElement.classList.toggle('plain', plain)
  try { localStorage.setItem('room', plain ? 'off' : 'on') } catch { /* storage is blocked: it lasts for this visit */ }
  listeners.forEach((listener) => listener())
}

export function usePlain() {
  return useSyncExternalStore(subscribe, () => document.documentElement.classList.contains('plain'), () => false)
}
