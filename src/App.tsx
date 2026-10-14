import { About } from './components/About'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Research } from './components/Research'
import { Software } from './components/Software'

export default function App() {
  return (
    <div className="site">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Research />
        <Experience />
        <Software />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
