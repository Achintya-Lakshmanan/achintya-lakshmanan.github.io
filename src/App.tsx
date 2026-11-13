import { Footer } from './components/Contact'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Room } from './components/Room'
import { Tour } from './components/Tour'

export default function App() {
  return (
    <div className="site">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      {/* The room, and its controls: before the page in tab order, so "Pause the room" is a few tabs in. */}
      <Room />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Tour />
      </main>
      <Footer />
    </div>
  )
}
