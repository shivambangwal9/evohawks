import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion, type Variants } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { TiltCard } from './ui/TiltCard';
import { MagneticButton } from './ui/MagneticButton';
import { Marquee } from './ui/Marquee';
import { MotionRing } from './ui/MotionRing';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Video, 
  TrendingUp, 
  Search, 
  Layers, 
  Flame,
  CheckCircle2, 
  Play, 
  Cpu, 
  Zap, 
  Shield, 
  Compass
} from 'lucide-react';

interface HeroProps {
  onOpenProjectModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const marqueeBadges = [
    { label: 'Next.js & React 19', icon: Code2, color: '#0284C7' },
    { label: 'Framer Motion Dynamics', icon: Sparkles, color: '#7C3AED' },
    { label: 'Cinematic Vertical Video', icon: Video, color: '#0EA5E9' },
    { label: 'Technical SEO Structure', icon: Search, color: '#059669' },
    { label: 'Targeted Paid Ads Funnels', icon: TrendingUp, color: '#DB2777' },
    { label: 'High-Performance Architecture', icon: Cpu, color: '#0284C7' },
    { label: 'Agile Sprint Execution', icon: Zap, color: '#D97706' },
    { label: 'Transparent Milestone SOW', icon: Shield, color: '#2563EB' },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] lg:min-h-[96vh] pt-24 sm:pt-30 md:pt-32 pb-12 sm:pb-16 flex flex-col justify-center overflow-hidden bg-transparent bg-grid-cyber"
    >
      {/* Aerodynamic Laser Flight Accent Lines for Light Theme */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 overflow-hidden" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flightGradAnimLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path 
          d="M-100 250 L400 120 L850 340 L1600 80" 
          stroke="url(#flightGradAnimLight)" 
          strokeWidth="1.8" 
          fill="none" 
          className="animate-laser"
        />
        <path 
          d="M-50 480 L550 360 L1150 520 L1800 240" 
          stroke="url(#flightGradAnimLight)" 
          strokeWidth="1.2" 
          fill="none" 
          className="animate-laser-fast opacity-70"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Hero Column: Value Proposition & Clear Messaging */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Agency Badge */}
            <motion.div 
              variants={itemVariants}
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 border border-sky-300 text-xs font-semibold tracking-wider font-tech text-sky-700 shadow-[0_4px_15px_rgba(2,132,199,0.12)] mb-5 sm:mb-6 overflow-hidden group cursor-default"
            >
              <BorderBeam size={100} duration={8} colorFrom="#0284C7" colorTo="#7C3AED" />
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span>{AGENCY_CONFIG.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-3.5xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-black tracking-tight text-slate-900 leading-[1.08] mb-5 sm:mb-6 break-words"
            >
              We Build. <br />
              <span className="text-gradient-cyan">We Create.</span> <br />
              <span className="text-gradient-violet">We Grow.</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl font-sans-clean leading-relaxed mb-6 sm:mb-8"
            >
              {AGENCY_CONFIG.heroDescription}
            </motion.p>

            {/* Slogan Pill */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 text-xs font-tech tracking-widest text-slate-500 uppercase mb-6 sm:mb-8"
            >
              <Compass className="w-4 h-4 text-sky-600" />
              <span>{AGENCY_CONFIG.slogan}</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <MagneticButton
                onClick={onOpenProjectModal}
                className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_10px_30px_rgba(2,132,199,0.4)] transition-all duration-300 cursor-pointer group animate-shimmer overflow-hidden shadow-md"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-slate-800 bg-white/90 hover:bg-white border border-slate-300 hover:border-sky-500 hover:text-sky-600 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Explore Our Work</span>
              </MagneticButton>
            </motion.div>

            {/* Trust Indicator Badges */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-6 pt-5 sm:pt-6 border-t border-slate-200 text-xs font-medium text-slate-600 w-full"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 shrink-0" />
                <span>Single Creative Partner</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                <span>Modern Clean Code</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 shrink-0" />
                <span>100% Asset Handover</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Hero Column: Responsive Ecosystem Cards (Truthful Capabilities) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center items-center mt-6 lg:mt-0 w-full">
            
            {/* MOBILE & TABLET ECOSYSTEM VIEW (< lg) */}
            <div className="block lg:hidden w-full max-w-md mx-auto space-y-3.5">
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 border border-sky-300 shadow-[0_4px_18px_rgba(2,132,199,0.18)]">
                  <Sparkles className="w-4 h-4 text-sky-600 animate-spin-slow" />
                  <span className="text-xs font-tech font-extrabold text-slate-900 tracking-wider">EVO HAWKS DISCIPLINES</span>
                </div>
              </div>

              {/* 2x2 Clean Grid for Mobile */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 w-full">
                {/* Mobile Card 1: Web Development */}
                <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
                  <BorderBeam size={80} duration={8} colorFrom="#0284C7" colorTo="#38BDF8" />
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                    <span className="text-[11px] font-display font-bold text-slate-900 flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-sky-600" /> Web Dev
                    </span>
                    <span className="text-[9px] font-tech text-sky-700 font-bold bg-sky-50 px-1.5 py-0.5 rounded">REACT 19</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans-clean leading-tight">
                    Custom responsive websites built with clean, modern code.
                  </p>
                </div>

                {/* Mobile Card 2: Video Editing */}
                <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
                  <BorderBeam size={80} duration={9} colorFrom="#7C3AED" colorTo="#0284C7" />
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                    <span className="text-[11px] font-display font-bold text-slate-900 flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-violet-600" /> Video &amp; Reels
                    </span>
                    <span className="text-[9px] font-tech text-violet-700 font-bold bg-violet-50 px-1.5 py-0.5 rounded">9:16 CUTS</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans-clean leading-tight">
                    Dynamic pacing, motion graphics, and audio sync for socials.
                  </p>
                </div>

                {/* Mobile Card 3: SEO Architecture */}
                <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
                  <BorderBeam size={80} duration={10} colorFrom="#059669" colorTo="#0284C7" />
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                    <span className="text-[11px] font-display font-bold text-slate-900 flex items-center gap-1">
                      <Search className="w-3.5 h-3.5 text-emerald-600" /> Search &amp; SEO
                    </span>
                    <span className="text-[9px] font-tech text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">ORGANIC</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans-clean leading-tight">
                    Keyword intent, semantic markup, and Core Web Vitals structure.
                  </p>
                </div>

                {/* Mobile Card 4: Paid Marketing */}
                <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden">
                  <BorderBeam size={80} duration={11} colorFrom="#0EA5E9" colorTo="#DB2777" />
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-2">
                    <span className="text-[11px] font-display font-bold text-slate-900 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-pink-600" /> Paid Ads
                    </span>
                    <span className="text-[9px] font-tech text-pink-700 font-bold bg-pink-50 px-1.5 py-0.5 rounded">FUNNELS</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans-clean leading-tight">
                    Meta &amp; Google ad creatives paired with conversion landing pages.
                  </p>
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW (lg:flex): 3D Orbit with Honest Capability Displays */}
            <div className="hidden lg:flex relative w-full max-w-lg aspect-[4/4] items-center justify-center">
              
              {/* Central Motion Graphic Gyro Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <MotionRing size={360} speed={24} />
              </div>

              {/* Central Brand Emblem */}
              <div className="relative z-20">
                <div className="absolute -inset-2 rounded-3xl bg-sky-400/25 blur-md animate-pulse" />
                <div className="relative w-28 h-28 rounded-3xl bg-white/95 border border-sky-300 flex flex-col items-center justify-center shadow-[0_12px_35px_rgba(2,132,199,0.25)] overflow-hidden">
                  <BorderBeam size={80} duration={6} colorFrom="#0284C7" colorTo="#7C3AED" />
                  <Sparkles className="w-9 h-9 text-sky-600 animate-spin-slow" />
                  <span className="text-[10px] font-tech text-slate-900 font-bold mt-1 tracking-widest uppercase">
                    EVO HAWKS
                  </span>
                  <span className="text-[8px] font-tech text-sky-600 font-bold uppercase">CAPABILITIES</span>
                </div>
              </div>

              {/* Floating 3D Tilt Widget 1: Web Development (Top Left) */}
              <div className="absolute top-0 -left-4 z-30 animate-float-gentle will-change-transform">
                <TiltCard tiltDegree={12} glareColor="#0284C7">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-60 hover:border-sky-400 transition-all cursor-default group relative overflow-hidden">
                    <BorderBeam size={100} duration={10} colorFrom="#0284C7" colorTo="#38BDF8" />
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      </div>
                      <span className="text-[10px] font-tech text-sky-700 font-bold flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" /> React 19
                      </span>
                    </div>
                    <div className="text-xs font-display font-bold text-slate-900 mb-1">
                      Web Development
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans-clean leading-snug">
                      High-speed responsive sites, bespoke landing pages &amp; web apps.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-tech text-sky-700 font-medium mt-2 pt-2 border-t border-slate-100">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Clean semantic code</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Floating 3D Tilt Widget 2: Video Editing (Top Right) */}
              <div 
                className="absolute top-4 -right-4 z-30 animate-float-gentle will-change-transform"
                style={{ animationDelay: '-2.5s' }}
              >
                <TiltCard tiltDegree={12} glareColor="#7C3AED">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-64 hover:border-violet-400 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={100} duration={12} colorFrom="#7C3AED" colorTo="#0284C7" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Video className="w-4 h-4 text-violet-600" />
                        <span>Video &amp; Reels</span>
                      </div>
                      <span className="text-[9px] font-tech text-violet-700 bg-violet-50 px-2 py-0.5 rounded font-bold">
                        9:16 &amp; 16:9
                      </span>
                    </div>
                    
                    <div className="relative bg-slate-50 p-1.5 rounded-lg border border-slate-200 flex items-center gap-1 overflow-hidden h-7">
                      <div className="w-6 h-5 rounded bg-violet-100 flex items-center justify-center text-[8px] font-bold text-violet-600">
                        <Play className="w-2.5 h-2.5 fill-current" />
                      </div>
                      <div className="flex-1 flex gap-1 items-center h-5">
                        <div className="h-full w-1/3 bg-sky-200/70 rounded-xs flex items-center justify-center text-[8px] text-sky-900 font-tech">Hook</div>
                        <div className="h-full w-1/2 bg-violet-200/70 rounded-xs flex items-center justify-center text-[8px] text-violet-900 font-tech">Story</div>
                        <div className="h-full w-1/4 bg-blue-200/70 rounded-xs flex items-center justify-center text-[8px] text-blue-900 font-tech">CTA</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-600 mt-2 font-tech flex justify-between">
                      <span>Sound Design</span>
                      <span className="text-violet-700 font-medium">Motion Overlays</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Floating 3D Tilt Widget 3: SEO Architecture (Bottom Left) */}
              <div 
                className="absolute bottom-6 -left-3 z-30 animate-float-gentle will-change-transform"
                style={{ animationDelay: '-1.5s' }}
              >
                <TiltCard tiltDegree={12} glareColor="#059669">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-60 hover:border-emerald-400 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={90} duration={11} colorFrom="#059669" colorTo="#0284C7" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Search className="w-4 h-4 text-emerald-600" />
                        <span>Search &amp; SEO</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-tech font-bold border border-emerald-200">
                        ORGANIC
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans-clean leading-snug">
                      Keyword intent mapping, schema metadata, and technical site structure.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-tech text-emerald-700 font-medium mt-2 pt-2 border-t border-slate-100">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Sustainable discoverability</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Floating 3D Tilt Widget 4: Paid Marketing (Bottom Right) */}
              <div 
                className="absolute bottom-2 -right-3 z-30 animate-float-gentle will-change-transform"
                style={{ animationDelay: '-3.8s' }}
              >
                <TiltCard tiltDegree={12} glareColor="#DB2777">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-62 hover:border-pink-400 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={100} duration={13} colorFrom="#0EA5E9" colorTo="#DB2777" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <TrendingUp className="w-4 h-4 text-pink-600" />
                        <span>Paid Advertising</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 font-tech font-bold">
                        META &amp; GOOGLE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans-clean leading-snug">
                      Targeted ad creative production paired with conversion landing pages.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-tech text-pink-700 font-medium mt-2 pt-2 border-t border-slate-100">
                      <CheckCircle2 className="w-3 h-3 text-pink-600" />
                      <span>Transparent fee separation</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

            </div>

          </div>

        </div>

        {/* Marquee Bar for Capabilities */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80 relative">
          <div className="mb-4 text-xs uppercase font-tech tracking-widest text-slate-500 flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-sky-600" />
            <span>Core Digital Disciplines &amp; Technology Stack</span>
          </div>

          <div className="relative mask-marquee-h overflow-hidden py-2">
            <Marquee pauseOnHover={true} duration="28s" gap="1rem">
              {marqueeBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-slate-200/90 hover:border-sky-400 shadow-xs hover:shadow-md transition-all cursor-default group"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-tech font-semibold text-slate-700 group-hover:text-slate-900 whitespace-nowrap">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </Marquee>
          </div>
        </div>

      </div>
    </section>
  );
};
