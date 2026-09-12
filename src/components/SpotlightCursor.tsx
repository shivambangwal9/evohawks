import React, { useEffect, useRef } from 'react';

export const SpotlightCursor: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop screens with a mouse
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const el = spotlightRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isVisible = false;

    const updatePosition = () => {
      // Smooth lerp (linear interpolation) for butter-smooth gliding cursor
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      el.style.transform = `translate3d(${currentX - 225}px, ${currentY - 225}px, 0)`;

      if (isVisible) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        el.style.opacity = '1';
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      el.style.opacity = '0';
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed top-0 left-0 pointer-events-none z-30 opacity-0 transition-opacity duration-300 hidden md:block will-change-transform"
      style={{
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.1) 0%, rgba(124, 58, 237, 0.05) 45%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
};

