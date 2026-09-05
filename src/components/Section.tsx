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
  headerTone?: 'default' | 'on-accent'
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  wash = false,
  compact = false,
  headerTone = 'default',
}: SectionProps) {
  const titleColor = headerTone === 'on-accent' ? 'text-white' : 'text-ink'
  const subtitleColor =
    headerTone === 'on-accent' ? 'text-white/90' : 'text-ink-muted'

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 ${compact ? 'py-14 sm:py-16' : 'py-16 sm:py-24'} ${wash ? 'section-wash' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div
            className={`section-rule max-w-3xl ${headerTone === 'on-accent' ? 'border-white' : ''} ${compact ? 'mb-8 sm:mb-10' : 'mb-10 sm:mb-14'}`}
          >
            <h2
              className={`font-display text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl ${titleColor}`}
            >
              {title}
            </h2>
            {subtitle && (
              <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${subtitleColor}`}>
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
