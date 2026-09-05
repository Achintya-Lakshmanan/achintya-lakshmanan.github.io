import { motion, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { IconEmail, IconGitHub, IconLinkedIn } from './Icons'
import { HeroBackground } from './HeroBackground'

export function Hero() {
  const shouldReduce = useReducedMotion()
  const github = content.socials.find((social) => social.icon === 'github')
  const linkedin = content.socials.find((social) => social.icon === 'linkedin')

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-ink/20 bg-surface pt-16"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:gap-16 lg:py-20">
          <div className="min-w-0">
            <motion.p
              className="mb-6 inline-flex max-w-full items-center gap-2 border-2 border-ink bg-[#c9f31d] px-3 py-1.5 text-sm font-bold uppercase tracking-[0.12em] shadow-[3px_3px_0_#171717]"
              initial={shouldReduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              Graduate Researcher · Penn State NLP Group
            </motion.p>

            <motion.h1
              className="max-w-4xl font-display text-[clamp(2.5rem,12vw,7rem)] font-bold leading-[0.86] tracking-[-0.07em]"
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
            >
              <span className="block">Achintya</span>
              <span className="block text-accent-cyan">Lakshmanan</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-2xl font-display text-[clamp(1.35rem,2.6vw,2rem)] font-semibold leading-tight tracking-[-0.025em]"
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              {content.positioning}
            </motion.p>

            <motion.p
              className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              {content.bio}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center border-2 border-ink bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[5px_5px_0_#2457f5] transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
              >
                See selected work <span className="ml-2 text-[#c9f31d]">↘</span>
              </a>
              <a
                href={`mailto:${content.email}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-ink bg-[#fffaf0] px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-[#c9f31d]"
              >
                <IconEmail className="h-4 w-4" />
                Email me
              </a>
            </motion.div>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-ink-muted"
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span>University Park, PA</span>
              <span className="text-ink/40" aria-hidden>·</span>
              <span>MS CSE · GPA 3.8 · expected May 2027</span>
              <span className="text-ink/40" aria-hidden>·</span>
              <div className="flex items-center gap-4">
                {github && (
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
                  >
                    <IconGitHub className="h-4 w-4" /> GitHub
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent-cyan"
                  >
                    <IconLinkedIn className="h-4 w-4" /> LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {content.photo && (
            <ProfilePhoto
              src={content.photo}
              name={content.name}
              shouldReduce={!!shouldReduce}
            />
          )}
        </div>

      </div>
    </section>
  )
}

interface ProfilePhotoProps {
  src: string
  name: string
  shouldReduce: boolean
}

function ProfilePhoto({ src, name, shouldReduce }: ProfilePhotoProps) {
  return (
    <motion.figure
      className="relative mx-auto w-full max-w-[18rem] lg:mr-0"
      initial={shouldReduce ? false : { opacity: 0, scale: 0.95, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.14, type: 'spring' }}
    >
      <div className="border-2 border-ink bg-[#fffaf0] p-3 pb-4 shadow-[10px_10px_0_#2457f5]">
        <img
          src={src}
          alt={`${name} at the Grand Canyon`}
          width={640}
          height={720}
          className="aspect-[4/5] w-full object-cover grayscale-[12%]"
          decoding="async"
          fetchPriority="high"
        />
        <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm font-bold">
          <span>Researcher · builder</span>
          <span className="font-sans text-xs font-medium text-ink-muted">Penn State</span>
        </figcaption>
      </div>
    </motion.figure>
  )
}
