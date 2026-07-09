import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {title}
              <span
                className="mt-3 block h-1 w-14 rounded-full bg-accent-gradient"
                aria-hidden
              />
            </h2>
            {subtitle && (
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
