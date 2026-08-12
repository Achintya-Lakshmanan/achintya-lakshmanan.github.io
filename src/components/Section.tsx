import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  wash?: boolean
  compact?: boolean
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  wash = false,
  compact = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 ${compact ? 'py-14 sm:py-20' : 'py-20 sm:py-28'} ${wash ? 'section-wash' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div
            className={`section-eyebrow max-w-3xl text-ink ${compact ? 'mb-8 sm:mb-10' : 'mb-12 sm:mb-16'}`}
          >
            <h2
              className={`font-display font-bold leading-[0.95] tracking-[-0.04em] text-ink ${compact ? 'text-4xl sm:text-5xl' : 'text-4xl sm:text-6xl'}`}
            >
              {title}
              <span className="section-underline" aria-hidden />
            </h2>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
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
