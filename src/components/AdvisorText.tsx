import { content } from '../data/content'

/** Renders text with the advisor's name turned into a link to their homepage. */
export function AdvisorText({ text }: { text: string }) {
  const { name, href } = content.advisor
  const index = text.indexOf(name)
  if (index === -1) return <>{text}</>
  return <>
    {text.slice(0, index)}
    <a className="inline-link" href={href} target="_blank" rel="noopener noreferrer">{name}</a>
    {text.slice(index + name.length)}
  </>
}
