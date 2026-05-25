import type { Variants } from "motion/react";

/** Shared cubic-bezier easing (typed as a tuple so Motion accepts it). */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade + rise, staggered by custom index. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE_OUT },
  }),
};
