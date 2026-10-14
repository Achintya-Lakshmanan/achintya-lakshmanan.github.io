interface SectionHeadingProps {
  id: string
  index: string
  title: string
}

export function SectionHeading({ id, index, title }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="section-index">{index}</p>
      <h2 id={id}>{title}</h2>
    </header>
  )
}
