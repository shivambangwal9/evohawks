import React from 'react';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  gap?: string;
  duration?: string;
  [key: string]: any;
}

export const Marquee: React.FC<MarqueeProps> = ({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  gap = '1.5rem',
  duration = '35s',
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        '--gap': gap,
        '--duration': duration,
      } as React.CSSProperties}
      className={`group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] ${
        vertical ? 'flex-col' : 'flex-row'
      } ${className}`}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            vertical
              ? 'animate-marquee-vertical flex-col'
              : 'animate-marquee flex-row'
          } ${reverse ? '[animation-direction:reverse]' : ''} ${
            pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
};
