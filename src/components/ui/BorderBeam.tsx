import React, { useEffect, useRef, useState } from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  size = 140,
  duration = 12,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = '#00F0FF',
  colorTo = '#8B5CF6',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;

    const el = containerRef.current;
    if (!el) return;

    // Only run animation when card is inside visible viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '50px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {isVisible && (
        <div
          style={
            {
              '--size': `${size}px`,
              '--duration': `${duration}s`,
              '--anchor': `${anchor}%`,
              '--border-width': `${borderWidth}px`,
              '--color-from': colorFrom,
              '--color-to': colorTo,
              '--delay': `-${delay}s`,
            } as React.CSSProperties
          }
          className="absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:will-change-transform after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]"
        />
      )}
    </div>
  );
};
