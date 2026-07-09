import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'article' | 'section'
}

const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const motionProps = {
    className,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: true, margin: '-60px' as const },
    variants,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  }

  if (as === 'li') {
    return <motion.li {...motionProps}>{children}</motion.li>
  }
  if (as === 'article') {
    return <motion.article {...motionProps}>{children}</motion.article>
  }
  if (as === 'section') {
    return <motion.section {...motionProps}>{children}</motion.section>
  }
  return <motion.div {...motionProps}>{children}</motion.div>
}
