import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  index: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, index, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={'content-section ' + className} aria-labelledby={id + '-title'}>
      <div className="page-width">
        <header className="section-heading">
          <div><span className="section-index" aria-hidden>{index}</span><h2 id={id + '-title'}>{title}</h2></div>
          {description && <p>{description}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
