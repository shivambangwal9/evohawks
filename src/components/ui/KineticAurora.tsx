import React from 'react';

export const KineticAurora: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Luminous Radial Atmosphere - GPU Accelerated without costly blur filter passes */}
      <div 
        className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full will-change-transform animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0, 180, 216, 0.08) 40%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute top-[35%] -right-[10%] w-[700px] h-[700px] rounded-full will-change-transform animate-aurora-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.14) 0%, rgba(192, 132, 252, 0.07) 45%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute top-[65%] -left-[10%] w-[600px] h-[600px] rounded-full will-change-transform animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(96, 165, 250, 0.08) 40%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute -bottom-[10%] right-[15%] w-[650px] h-[650px] rounded-full will-change-transform animate-aurora-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(129, 140, 248, 0.08) 45%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
};

