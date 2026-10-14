import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  index: string
  label?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, index, label, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={'content-section ' + className} aria-labelledby={id + '-title'}>
      <div className="page-width">
        <header className="section-heading" data-reveal>
          <p className="mono-label"><span aria-hidden>{index}</span>{label ?? title}</p>
          <h2 id={id + '-title'}>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
