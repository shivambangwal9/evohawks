import React from 'react';

export const KineticAurora: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Luminous Radial Atmosphere - Cerulean Blue & Neon Rose against Jet Black */}
      <div 
        className="absolute -top-[15%] left-[8%] w-[680px] h-[680px] rounded-full will-change-transform animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(0, 153, 255, 0.16) 0%, rgba(2, 132, 199, 0.08) 45%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute top-[32%] -right-[12%] w-[720px] h-[720px] rounded-full will-change-transform animate-aurora-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(255, 19, 97, 0.15) 0%, rgba(255, 42, 133, 0.07) 45%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute top-[65%] -left-[10%] w-[640px] h-[640px] rounded-full will-change-transform animate-aurora"
        style={{
          background: 'radial-gradient(circle, rgba(0, 153, 255, 0.14) 0%, rgba(56, 189, 248, 0.06) 40%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute -bottom-[12%] right-[12%] w-[700px] h-[700px] rounded-full will-change-transform animate-aurora-reverse"
        style={{
          background: 'radial-gradient(circle, rgba(255, 19, 97, 0.14) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
};

