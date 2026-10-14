import { About } from './components/About'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero, SkillMarquee } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ResearchProjects, SoftwareProjects } from './components/Projects'
import { usePageMotion } from './hooks/usePageMotion'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { rootRef, paused, reduced, toggleMotion } = usePageMotion()
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="site" ref={rootRef} data-motion={paused || reduced ? 'off' : 'on'}>
      <div className="cursor-glow" aria-hidden />
      <div className="grain" aria-hidden />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar motionPaused={paused} reducedMotion={reduced} onToggleMotion={toggleMotion} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SkillMarquee />
        <ResearchProjects />
        <Experience />
        <SoftwareProjects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
