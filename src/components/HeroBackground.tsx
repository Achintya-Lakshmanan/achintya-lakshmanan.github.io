import { motion, useReducedMotion } from 'framer-motion'

const DOT_COUNT = 48

function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function HeroBackground() {
  const shouldReduce = useReducedMotion()

  const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
    id: i,
    left: `${seeded(i) * 100}%`,
    top: `${seeded(i + 50) * 100}%`,
    size: 1 + seeded(i + 100) * 2.5,
    delay: seeded(i + 150) * 4,
    duration: 3 + seeded(i + 200) * 4,
  }))

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Mesh gradients */}
      <div className="absolute inset-0 bg-hero-mesh" />

      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)',
        }}
      />

      {/* Floating particles */}
      {!shouldReduce &&
        dots.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full bg-accent-cyan/50"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
            }}
            animate={{
              opacity: [0.15, 0.7, 0.15],
              y: [0, -12, 0],
            }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
    </div>
  )
}
