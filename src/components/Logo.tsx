import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  lightText?: boolean;
  variant?: 'full' | 'icon-only' | 'stacked' | 'badge';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showTagline = false,
  lightText = false,
  variant = 'full'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-lg md:text-xl tracking-tight',
    lg: 'text-2xl md:text-3xl tracking-tight',
    xl: 'text-4xl md:text-5xl tracking-tighter'
  };

  const badgePadding = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2',
    xl: 'p-2.5'
  };

  // Modern Aerodynamic Faceted Hawk Icon SVG
  const HawkMark = (
    <div className={`relative flex items-center justify-center ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
      {/* Ambient Radial Aura behind Hawk */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/25 via-blue-500/20 to-violet-500/20 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <svg 
        viewBox="0 0 120 120" 
        className="w-full h-full relative z-10 drop-shadow-[0_2px_10px_rgba(2,132,199,0.35)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Primary Hawk Wing Gradient: Electric Cyan -> Cobalt Blue -> Rich Purple */}
          <linearGradient id="hawkPrimaryWingGrad" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#00B4D8" />
            <stop offset="48%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Secondary Forward Wing Gradient */}
          <linearGradient id="hawkSecondaryWingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Specular Facet Gloss Gradient */}
          <linearGradient id="hawkGlossFacet" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.6" />
          </linearGradient>

          {/* Beak & Crest Accent Gradient */}
          <linearGradient id="hawkBeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#00B4D8" />
          </linearGradient>
        </defs>

        {/* Back Underwing Shadow Blade */}
        <polygon 
          points="28,78 52,42 66,54 44,88" 
          fill="#1E293B" 
          fillOpacity="0.2" 
        />

        {/* Primary Swept Wing - Lower Falcon Blade */}
        <polygon 
          points="18,80 58,16 48,52 92,30 64,66 98,50 48,96 56,72" 
          fill="url(#hawkPrimaryWingGrad)" 
        />

        {/* Secondary Inner Flight Facet (Creating Kinetic Depth) */}
        <polygon 
          points="26,78 54,36 44,58 76,46 52,78" 
          fill="url(#hawkGlossFacet)" 
        />

        {/* Forward Aerodynamic Breast & Crest */}
        <polygon 
          points="58,16 78,32 68,48 54,36" 
          fill="url(#hawkSecondaryWingGrad)" 
        />

        {/* Sharp Predatory Beak / Head Hook */}
        <polygon 
          points="78,32 94,36 82,44 76,40" 
          fill="url(#hawkBeakGrad)" 
        />

        {/* Precision Vision Eye - Center Target */}
        <circle 
          cx="70" 
          cy="34" 
          r="4" 
          fill="#FFFFFF" 
        />
        <circle 
          cx="70" 
          cy="34" 
          r="2" 
          fill="#00B4D8" 
        />

        {/* Eye Dynamic Ping Halo */}
        <circle 
          cx="70" 
          cy="34" 
          r="7" 
          stroke="#00B4D8" 
          strokeWidth="1" 
          strokeDasharray="2 2" 
          opacity="0.8" 
        />
      </svg>
    </div>
  );

  // Icon with Frosted Squircle Shield
  const BadgeMark = (
    <div className={`relative rounded-2xl bg-gradient-to-b from-white/90 to-sky-50/80 border border-sky-200/90 shadow-xs group-hover:shadow-md transition-all duration-300 ${badgePadding[size]}`}>
      {HawkMark}
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`group inline-flex items-center select-none cursor-pointer ${className}`} aria-label="Evo Hawks">
        {HawkMark}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`group inline-flex items-center select-none cursor-pointer ${className}`} aria-label="Evo Hawks">
        {BadgeMark}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`group inline-flex flex-col items-center text-center select-none cursor-pointer ${className}`} aria-label="Evo Hawks">
        {BadgeMark}
        <div className="flex flex-col items-center mt-3">
          <span className={`font-display font-black leading-none ${lightText ? 'text-white' : 'text-slate-900'} ${textSizes[size]}`}>
            EVO <span className="text-gradient-cyan">HAWKS</span>
          </span>
          {showTagline && (
            <span className={`text-[10px] tracking-[0.25em] uppercase font-tech font-semibold ${lightText ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
              Build • Create • Grow
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default 'full' horizontal brand lockup
  return (
    <div 
      className={`group inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02] focus:outline-none select-none cursor-pointer ${className}`}
      aria-label="Evo Hawks - Digital Creative & Marketing Agency"
    >
      {/* Icon with Subtle Badge Outline */}
      <div className="relative">
        <div className="p-1 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs group-hover:border-sky-300 transition-colors">
          {HawkMark}
        </div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <span className={`font-display font-black tracking-tight leading-none ${lightText ? 'text-white' : 'text-slate-900'} ${textSizes[size]}`}>
          EVO <span className="text-gradient-cyan">HAWKS</span>
        </span>
        {showTagline && (
          <span className={`text-[10px] tracking-[0.22em] uppercase font-tech font-semibold ${lightText ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
            Build • Create • Grow
          </span>
        )}
      </div>
    </div>
  );
};
