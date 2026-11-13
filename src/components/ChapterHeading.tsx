export function ChapterHeading({ id, number, title }: { id: string; number: number; title: string }) {
  return (
    <header className="chapter-heading">
      <span className="chapter-number">Ch. 0{number}</span>
      <h2 id={id}>{title}</h2>
    </header>
  )
}
