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
    <div className="relative min-h-screen bg-surface text-ink">
      {/* Fixed atmospheric layer */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 atm-grid opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute top-[35%] -right-24 h-80 w-80 rounded-full bg-accent-cyan/10 blur-[100px]" />
        <div className="absolute bottom-[15%] -left-20 h-96 w-96 rounded-full bg-accent-violet/12 blur-[110px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
