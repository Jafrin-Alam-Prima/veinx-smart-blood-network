"use client";

import * as React from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "motion/react";

/** Count-up number that animates when scrolled into view. */
export function AnimatedNumber({
  value,
  duration = 1.4,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  format,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: (n: number) => string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) =>
    format ? format(latest) : latest.toFixed(decimals),
  );

  React.useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, duration, mv]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
