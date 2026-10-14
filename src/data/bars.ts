// Deterministic pseudo-random values so the decorative bar charts match between
// the prerendered HTML and the hydrated page.
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

/** A rising "reward" curve: fractions in [0, 1] that trend upward with noise. */
export function rewardBars(count: number, seed: number, rate: number): number[] {
  return Array.from({ length: count }, (_, i) => {
    const trend = 1 - Math.exp(-i / rate)
    return Math.min(1, Math.max(0.03, 0.09 + trend * 0.82 + (rand(i + seed) - 0.5) * 0.2))
  })
}

/** Flat, noisy "logit" bars: fractions in [0.2, 1]. */
export function logitBars(count: number, seed: number): number[] {
  return Array.from({ length: count }, (_, i) => 0.2 + rand(seed * 31 + i) * 0.8)
}
