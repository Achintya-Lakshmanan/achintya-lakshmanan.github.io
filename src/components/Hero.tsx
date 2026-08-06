import { motion, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { socialIconMap } from './socialIcons'
import { HeroBackground } from './HeroBackground'

export function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative flex min-h-screen overflow-hidden border-b-2 border-ink bg-[#ffc857] pt-20"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-w-0 w-full max-w-6xl items-center gap-14 px-5 py-14 sm:px-8 sm:py-24 xl:grid-cols-[1.2fr_0.8fr] xl:gap-10">
        <div className="min-w-0">
          <motion.p
            className="mb-5 inline-flex max-w-full -rotate-1 flex-wrap items-center gap-x-2 gap-y-1 border-2 border-ink bg-[#c9f31d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] shadow-[3px_3px_0_#171717] sm:text-xs sm:tracking-[0.16em]"
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            Penn State · MS CSE
          </motion.p>

          <motion.h1
            className="max-w-full font-display text-[clamp(3rem,15vw,7.5rem)] font-bold uppercase leading-[0.78] tracking-[-0.065em] sm:text-[clamp(4.25rem,11vw,7.5rem)] sm:leading-[0.72] sm:tracking-[-0.075em]"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <span className="block">Achintya</span>
            {' '}
            <span className="block text-accent-cyan">Lakshmanan</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl text-lg font-bold leading-snug text-ink sm:mt-9 sm:text-2xl"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {content.positioning}
          </motion.p>

          <motion.p
            className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.23 }}
          >
            {content.bio}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center border-2 border-ink bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[5px_5px_0_#2457f5] transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-none sm:w-auto"
            >
              Explore selected work ↓
            </a>

            <div className="flex flex-wrap items-center gap-3">
              {content.socials.map((s) => {
                const Icon = socialIconMap[s.icon]
                const isExternal = s.icon !== 'email'
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 border-2 border-ink bg-[#fffaf0] px-3 py-3 text-sm font-bold text-ink transition-transform hover:-rotate-2 hover:bg-[#c9f31d]"
                    aria-label={`${s.label}${isExternal ? ' (opens in a new tab)' : ''}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                )
              })}
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
    <motion.div
      className="relative mx-auto w-full max-w-[18rem] sm:max-w-[21rem] xl:mr-0"
      initial={shouldReduce ? false : { opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.55, delay: 0.18, type: 'spring' }}
    >
      <div
        className="absolute right-0 top-[-1.15rem] z-20 max-w-[11rem] rotate-3 border-2 border-ink bg-accent px-3 py-2 text-xs font-bold leading-tight text-white shadow-[4px_4px_0_#171717] sm:-right-5 sm:-top-6 sm:max-w-none sm:rotate-6 sm:px-4 sm:text-sm"
        aria-hidden
      >
        models + code + side quests
      </div>
      <div
        className="absolute -bottom-4 left-0 z-20 -rotate-3 rounded-full border-2 border-ink bg-[#c9f31d] px-3 py-2 text-[10px] font-bold uppercase tracking-widest shadow-[4px_4px_0_#171717] sm:-bottom-5 sm:-left-5 sm:-rotate-6 sm:px-4 sm:py-3 sm:text-xs"
        aria-hidden
      >
        usually debugging
      </div>
      <div className="border-2 border-ink bg-[#fffaf0] p-3 pb-12 shadow-[12px_12px_0_#2457f5]">
        <img
          src={src}
          alt={`${name} at the Grand Canyon`}
          width={640}
          height={720}
          className="aspect-[4/5] w-full object-cover grayscale-[15%]"
          decoding="async"
          fetchPriority="high"
        />
        <p className="mt-3 text-center font-display text-sm font-bold">
          proof that I occasionally leave my desk
        </p>
      </div>
    </motion.div>
  )
}
