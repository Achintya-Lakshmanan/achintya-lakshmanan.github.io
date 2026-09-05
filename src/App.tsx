import { About } from './components/About'
import { Achievements } from './components/Achievements'
import { Contact, Footer } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <div id="background" className="scroll-mt-20">
          <Education />
          <Skills />
          <Achievements />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
