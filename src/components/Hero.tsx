import React, { useState, useEffect } from 'react';
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
  Gauge
} from 'lucide-react';

interface HeroProps {
  onOpenProjectModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal }) => {
  const [loadSpeed, setLoadSpeed] = useState('0.42s');
  const [roasVal, setRoasVal] = useState('4.8x');

  useEffect(() => {
    // Dynamic simulated micro-metric live oscillation
    const interval = setInterval(() => {
      const speeds = ['0.38s', '0.41s', '0.36s', '0.44s'];
      const roas = ['4.8x', '5.1x', '4.9x', '5.2x'];
      setLoadSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
      setRoasVal(roas[Math.floor(Math.random() * roas.length)]);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

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
    hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const marqueeBadges = [
    { label: 'Next.js & React 19', icon: Code2, color: '#0284C7' },
    { label: 'Framer Motion 3D', icon: Sparkles, color: '#7C3AED' },
    { label: '4K Cinematic Cuts', icon: Video, color: '#0EA5E9' },
    { label: 'SEO #1 Rank Systems', icon: Search, color: '#059669' },
    { label: 'High-ROAS Meta Ads', icon: TrendingUp, color: '#DB2777' },
    { label: '0.4s Ultra-Fast Load', icon: Gauge, color: '#0284C7' },
    { label: 'Clean Enterprise Code', icon: Cpu, color: '#8B5CF6' },
    { label: '24/7 Rapid Execution', icon: Zap, color: '#D97706' },
    { label: 'Transparent SOW', icon: Shield, color: '#2563EB' },
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[96vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden bg-transparent bg-grid-cyber"
    >
      {/* Aerodynamic Laser Flight Accent Lines for Light Theme */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40" 
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Kinetic Staggered Headline & Messaging */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Small Agency Badge with Glowing Pulse */}
            <motion.div 
              variants={itemVariants}
              className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 border border-sky-300 text-xs font-semibold tracking-wider font-tech text-sky-700 shadow-[0_4px_15px_rgba(2,132,199,0.12)] mb-6 overflow-hidden group cursor-default"
            >
              <BorderBeam size={100} duration={8} colorFrom="#0284C7" colorTo="#7C3AED" />
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span>{AGENCY_CONFIG.badge}</span>
            </motion.div>

            {/* Main Headline with Continuous Shimmering Typography */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-black tracking-tight text-slate-900 leading-[1.08] mb-6"
            >
              We Build. <br />
              <span className="text-gradient-cyan">We Create.</span> <br />
              <span className="text-gradient-violet">We Grow.</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-sans-clean leading-relaxed mb-8"
            >
              {AGENCY_CONFIG.heroDescription}
            </motion.p>

            {/* Slogan pill */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 text-xs font-tech tracking-widest text-slate-500 uppercase mb-8"
            >
              <span className="text-sky-600 font-bold animate-bounce">⚡</span>
              <span>{AGENCY_CONFIG.slogan}</span>
            </motion.div>

            {/* Action Buttons with 21st.dev Magnetic Attraction & Shimmer */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <MagneticButton
                onClick={onOpenProjectModal}
                className="w-full sm:w-auto relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_10px_30px_rgba(2,132,199,0.4)] transition-all duration-300 cursor-pointer group animate-shimmer overflow-hidden"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-semibold text-slate-800 bg-white/90 hover:bg-white border border-slate-300 hover:border-sky-500 hover:text-sky-600 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Explore Our Work</span>
              </MagneticButton>
            </motion.div>

            {/* Trust Indicator Badges */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 text-xs font-medium text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>End-to-End Execution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Modern High-Speed Code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Transparent Deliverables</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Hero Column: Fully Interactive 3D Floating Ecosystem Visual with MotionRing, Tilt & BorderBeams */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            
            <div className="relative w-full max-w-lg aspect-[4/4] flex items-center justify-center">
              
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
                  <span className="text-[8px] font-tech text-sky-600 font-bold uppercase">ECOSYSTEM</span>
                </div>
              </div>

              {/* Floating 3D Tilt Widget 1: Web Design & Code (Top Left) */}
              <motion.div 
                className="absolute top-0 left-0 sm:-left-4 z-30"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <TiltCard tiltDegree={15} glareColor="#0284C7">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-52 sm:w-60 hover:border-sky-400 transition-all cursor-default group relative overflow-hidden">
                    <BorderBeam size={100} duration={10} colorFrom="#0284C7" colorTo="#38BDF8" />
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[10px] font-tech text-sky-600 font-bold flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" /> {loadSpeed}
                      </span>
                    </div>
                    <div className="text-xs font-display font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                      <span>Web Development</span>
                      <span className="text-[9px] font-tech text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">FAST</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-sky-500 to-blue-600 h-full w-[98%] animate-pulse" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-tech mt-2">
                      <span>Performance Score</span>
                      <span className="text-sky-600 font-bold">99/100</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Floating 3D Tilt Widget 2: Video Editing Timeline (Top Right) */}
              <motion.div 
                className="absolute top-4 right-0 sm:-right-4 z-30"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -1, 0]
                }}
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <TiltCard tiltDegree={15} glareColor="#7C3AED">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-56 sm:w-64 hover:border-violet-400 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={100} duration={12} colorFrom="#7C3AED" colorTo="#0284C7" />
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Video className="w-4 h-4 text-violet-600" />
                        <span>Video &amp; Reels Cut</span>
                      </div>
                      {/* Animated soundwaves */}
                      <div className="flex items-end gap-1 h-3.5">
                        <span className="w-1 bg-violet-500 rounded-full animate-soundwave-1" />
                        <span className="w-1 bg-sky-500 rounded-full animate-soundwave-2" />
                        <span className="w-1 bg-blue-500 rounded-full animate-soundwave-3" />
                        <span className="w-1 bg-indigo-500 rounded-full animate-soundwave-4" />
                      </div>
                    </div>
                    
                    {/* Timeline with animated playhead */}
                    <div className="relative bg-slate-50 p-1.5 rounded-lg border border-slate-200 flex items-center gap-1 overflow-hidden h-7">
                      <div className="absolute top-0 bottom-0 w-0.5 bg-sky-500 shadow-[0_0_8px_#0ea5e9] z-10 animate-playhead" />
                      <div className="w-6 h-5 rounded bg-violet-100 flex items-center justify-center text-[8px] font-bold text-violet-600">
                        <Play className="w-2.5 h-2.5 fill-current" />
                      </div>
                      <div className="flex-1 flex gap-1 items-center h-5">
                        <div className="h-full w-1/3 bg-sky-200/70 rounded-xs flex items-center justify-center text-[8px] text-sky-900 font-tech">Hook</div>
                        <div className="h-full w-1/2 bg-violet-200/70 rounded-xs flex items-center justify-center text-[8px] text-violet-900 font-tech">Story</div>
                        <div className="h-full w-1/4 bg-blue-200/70 rounded-xs flex items-center justify-center text-[8px] text-blue-900 font-tech">CTA</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-2 font-tech flex justify-between">
                      <span>Viral Audio Master</span>
                      <span className="text-violet-600 font-bold">Retention 84%</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Floating 3D Tilt Widget 3: SEO Ranker (Bottom Left) */}
              <motion.div 
                className="absolute bottom-6 left-0 sm:-left-3 z-30"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -0.8, 0]
                }}
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <TiltCard tiltDegree={15} glareColor="#0284C7">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-52 sm:w-60 hover:border-sky-400 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={90} duration={11} colorFrom="#059669" colorTo="#0284C7" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Search className="w-4 h-4 text-sky-600" />
                        <span>SEO Dominance</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-tech font-bold animate-pulse border border-emerald-200">
                        #1 RANK
                      </span>
                    </div>
                    {/* Mini animated curve */}
                    <svg viewBox="0 0 100 24" className="w-full h-6 my-1">
                      <path d="M0,20 Q25,18 45,10 T90,2 L100,2" fill="none" stroke="#0284C7" strokeWidth="2" />
                      <path d="M0,20 Q25,18 45,10 T90,2 L100,2 L100,24 L0,24 Z" fill="rgba(2,132,199,0.15)" />
                    </svg>
                    <div className="flex items-center justify-between text-[10px] font-tech text-slate-600">
                      <span className="text-slate-900 font-bold text-xs">+318%</span>
                      <span className="text-emerald-600 font-bold">▲ Organic Growth</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Floating 3D Tilt Widget 4: Paid Marketing / ROAS Dashboard (Bottom Right) */}
              <motion.div 
                className="absolute bottom-2 right-0 sm:-right-3 z-30"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 0.8, 0]
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <TiltCard tiltDegree={15} glareColor="#0EA5E9">
                  <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] w-54 sm:w-62 hover:border-sky-400 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={100} duration={13} colorFrom="#0EA5E9" colorTo="#DB2777" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <TrendingUp className="w-4 h-4 text-sky-600" />
                        <span>Meta &amp; Google Ads</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200 font-tech font-extrabold">
                        ROAS {roasVal}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-tech">High-Converting Lead Funnel</div>
                    <div className="flex items-center justify-between mt-2 text-[10px] font-tech text-slate-600 border-t border-slate-100 pt-1.5">
                      <span>Target Acquisition</span>
                      <span className="text-emerald-600 font-bold">-34% CPA</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

            </div>

          </div>

        </div>

        {/* 21st.dev Infinite Marquee Bar for Capabilities & Superpowers */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80 relative">
          <div className="mb-4 text-xs uppercase font-tech tracking-widest text-slate-500 flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>Full-Stack Agency Superpowers &amp; Technology Stack</span>
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
                    <Icon className="w-3.5 h-3.5 text-sky-600 group-hover:scale-120 transition-transform" />
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
