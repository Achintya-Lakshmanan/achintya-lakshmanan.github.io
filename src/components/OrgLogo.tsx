import { useState } from 'react'

interface OrgLogoProps {
  name: string
  src?: string
  size?: number
  className?: string
}

/** Up to 2 initials from significant words in the organization name. */
function monogram(name: string): string {
  const skip = new Set([
    'and',
    'of',
    'the',
    'for',
    'at',
    'in',
    'lab',
    'group',
    'inc',
    'llc',
  ])
  const words = name
    .replace(/[,()]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0 && !skip.has(w.toLowerCase()))

  if (words.length === 0) return '?'
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase()
  return (words[0]![0]! + words[1]![0]!).toUpperCase()
}

export function OrgLogo({
  name,
  src,
  size = 44,
  className = '',
}: OrgLogoProps) {
  const [failed, setFailed] = useState(!src)
  const letters = monogram(name)
  const fontSize = size <= 36 ? 11 : size <= 44 ? 13 : 15

  return (
    <div
      className={`org-logo relative shrink-0 overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="font-display font-semibold leading-none text-ink-muted"
            style={{ fontSize }}
          >
            {letters}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
