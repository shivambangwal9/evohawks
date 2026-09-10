import React from 'react';
import { motion } from 'framer-motion';

interface MotionRingProps {
  size?: number;
  className?: string;
  speed?: number;
}

export const MotionRing: React.FC<MotionRingProps> = ({ 
  size = 280, 
  className = '',
  speed = 20
}) => {
  return (
    <div 
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Pulse Wave Ring */}
      <div className="absolute inset-0 rounded-full border border-sky-400/25 animate-radar" />

      {/* Main Clockwise Ring with Gradient Dash */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-dashed border-sky-500/40"
      >
        {/* Orbiting Photon Satellite Node */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.8)]" />
      </motion.div>

      {/* Inner Counter-Clockwise Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: speed * 1.3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-violet-500/35"
      >
        {/* Orbiting Violet Particle */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
      </motion.div>

      {/* Innermost Crosshair Ring */}
      <div className="absolute inset-16 rounded-full border border-cyan-400/20 bg-sky-500/5 backdrop-blur-[2px] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
      </div>
    </div>
  );
};
