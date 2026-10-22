import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
  glareOpacity?: number;
  glareColor?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltDegree = 10,
  glareOpacity = 0.15,
  glareColor = '#00F0FF',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) or (pointer: coarse)').matches || window.innerWidth < 1024;
  });
  const rafRef = useRef<number | null>(null);

  if (isTouchDevice) {
    return (
      <div 
        className={`relative ${className}`}
        onClick={onClick}
      >
        <div className="relative w-full h-full rounded-[inherit] overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.1s ease-out';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotX = (0.5 - y) * tiltDegree * 1.5;
      const rotY = (x - 0.5) * tiltDegree * 1.5;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`;

      if (glareRef.current) {
        glareRef.current.style.opacity = `${glareOpacity}`;
        glareRef.current.style.background = `radial-gradient(350px circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, ${glareColor}25, transparent 75%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`relative ${className}`}
    >
      <div className="relative w-full h-full rounded-[inherit] overflow-hidden">
        {children}

        {/* Dynamic Cursor Spotlight Glare (only active on desktop hover) */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
