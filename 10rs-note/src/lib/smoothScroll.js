import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ autoRaf: false })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function smoothScrollTo(y, duration = 1.4) {
  if (lenis && duration <= 0) lenis.scrollTo(y, { immediate: true })
  else if (lenis)
    lenis.scrollTo(y, {
      duration,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
    })
  else window.scrollTo({ top: y })
}
