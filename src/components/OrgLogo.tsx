import { useState } from 'react'

interface OrgLogoProps {
  name: string
  src?: string
  size?: number
}

const skip = new Set(['and', 'of', 'the', 'for', 'at', 'in', 'lab', 'group', 'inc', 'llc'])

/** Up to two initials from the significant words in an organization name. */
function monogram(name: string): string {
  const words = name.replace(/[,()]/g, ' ').split(/\s+/).filter((word) => word && !skip.has(word.toLowerCase()))
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase()
  return (words[0]![0]! + words[1]![0]!).toUpperCase()
}

/** Organization logo on a white tile, falling back to a monogram if the image is missing or fails. */
export function OrgLogo({ name, src, size = 44 }: OrgLogoProps) {
  const [failed, setFailed] = useState(!src)
  return (
    <span className="org-logo" style={{ width: size, height: size }} aria-hidden>
      {failed
        ? <span className="org-monogram">{monogram(name)}</span>
        : <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />}
    </span>
  )
}
