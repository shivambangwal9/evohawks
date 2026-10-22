import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const HawkFlightCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Completely disable canvas particle rendering on mobile screens for 120 FPS scrolling & battery efficiency
    if (window.innerWidth < 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Cyber-creative particles: Cerulean Blue and Neon Rose against Jet Black
    const colors = ['#0099FF', '#FF1361', '#38BDF8', '#FF2A85'];
    const particles: Particle[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.3) * 0.35,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.35 + 0.2,
        color: colors[i % colors.length],
      });
    }

    const connectDist = 110;
    const connectDistSq = connectDist * connectDist;

    let isPaused = false;

    // Intelligent scroll observer: Pause canvas whenever user scrolls down past the Hero section!
    const checkPauseState = () => {
      const pastHero = window.scrollY > window.innerHeight * 1.1;
      const shouldPause = pastHero || document.hidden;
      if (shouldPause !== isPaused) {
        isPaused = shouldPause;
        if (!isPaused) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    window.addEventListener('scroll', checkPauseState, { passive: true });
    document.addEventListener('visibilitychange', checkPauseState);

    const render = () => {
      if (isPaused) return;

      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes & aerodynamic laser connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles with subtle aerodynamic lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistSq) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = i % 2 === 0 ? '#0099FF' : '#FF1361';
            ctx.globalAlpha = (1 - Math.sqrt(distSq) / connectDist) * 0.22;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', checkPauseState);
      document.removeEventListener('visibilitychange', checkPauseState);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none hidden md:block"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
};
