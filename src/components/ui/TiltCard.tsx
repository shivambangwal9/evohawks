import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
  tiltDegree = 12,
  glareOpacity = 0.15,
  glareColor = '#00F0FF',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [0, 1], [tiltDegree, -tiltDegree]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-tiltDegree, tiltDegree]);

  const glareX = useTransform(mouseXSpring, [0, 1], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-[1000px] transition-shadow duration-300 ${className}`}
    >
      {/* 3D Content Container */}
      <div className="relative w-full h-full rounded-[inherit] overflow-hidden">
        {children}

        {/* Dynamic Cursor Spotlight Glare */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${glareX} ${glareY}, ${glareColor}25, transparent 75%)`,
            opacity: glareOpacity,
          }}
        />
      </div>
    </motion.div>
  );
};
