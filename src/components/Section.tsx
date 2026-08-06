import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  wash?: boolean
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  wash = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-20 sm:py-28 ${wash ? 'section-wash' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="section-eyebrow mb-12 max-w-3xl text-ink sm:mb-16">
            <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">
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
