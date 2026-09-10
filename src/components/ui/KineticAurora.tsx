import React from 'react';

export const KineticAurora: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Luminous Gradient Blobs */}
      <div 
        className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#38BDF8]/20 via-[#00B4D8]/18 to-[#818CF8]/15 blur-[120px] animate-aurora" 
      />
      <div 
        className="absolute top-[35%] -right-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#818CF8]/20 via-[#C084FC]/15 to-[#38BDF8]/15 blur-[140px] animate-aurora-reverse" 
      />
      <div 
        className="absolute top-[65%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#00F0FF]/15 via-[#60A5FA]/18 to-[#A78BFA]/12 blur-[130px] animate-aurora" 
      />
      <div 
        className="absolute -bottom-[10%] right-[15%] w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-[#38BDF8]/20 via-[#818CF8]/18 to-[#00B4D8]/12 blur-[130px] animate-aurora-reverse" 
      />
    </div>
  );
};
