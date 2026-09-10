import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, motion, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  direction?: 'up' | 'down';
  duration?: number;
  delay?: number;
  className?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  delay = 0,
  className = '',
  decimals = 0,
  prefix = '',
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const rounded = useTransform(motionVal, (latest) => {
    return `${prefix}${latest.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, duration, delay, motionVal]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
};
