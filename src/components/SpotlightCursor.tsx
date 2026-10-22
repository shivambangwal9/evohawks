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
    let isRunning = false;

    const updatePosition = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.25;
      currentY += dy * 0.25;

      el.style.transform = `translate3d(${Math.round(currentX - 225)}px, ${Math.round(currentY - 225)}px, 0)`;

      // If still gliding toward mouse, continue loop; otherwise sleep until next mouse move
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        isRunning = false;
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        el.style.opacity = '1';
      }

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      isRunning = false;
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
        background: 'radial-gradient(circle, rgba(0, 153, 255, 0.12) 0%, rgba(255, 19, 97, 0.08) 45%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
};

