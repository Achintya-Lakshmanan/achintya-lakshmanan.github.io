import { Fragment, type ReactNode } from 'react'
import { content } from '../data/content'

/** Links the advisor's name wherever it appears in a run of plain text. */
function withAdvisor(text: string, key: number): ReactNode {
  const { name, href } = content.advisor
  const index = text.indexOf(name)
  if (index === -1) return <Fragment key={key}>{text}</Fragment>
  return <Fragment key={key}>
    {text.slice(0, index)}
    <a className="inline-link" href={href} target="_blank" rel="noopener noreferrer">{name}</a>
    {text.slice(index + name.length)}
  </Fragment>
}

/** Renders copy from content.ts: **figures** are highlighted and the advisor's name is linked. */
export function RichText({ text }: { text: string }) {
  return <>
    {text.split('**').map((part, index) => index % 2
      ? <strong className="figure" key={index}>{part}</strong>
      : withAdvisor(part, index))}
  </>
}
