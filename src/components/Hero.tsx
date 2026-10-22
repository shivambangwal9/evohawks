import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { useSiteConfig } from '../context/SiteConfigContext';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
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
  const { siteConfig } = useSiteConfig();
  const [mobileActiveDiscipline, setMobileActiveDiscipline] = useState<number>(0);

  const mobileDisciplines = [
    {
      id: 'web',
      name: 'Web Dev',
      badge: 'REACT 19 + NEXT',
      metric: '100/100 Core Web Vitals',
      icon: Code2,
      color: '#0099FF',
      title: 'High-Velocity Web Architecture',
      description: 'Responsive, bespoke websites and dynamic platforms engineered for sub-second page loads and conversions.',
      deliverable: 'Clean Semantic Code & Edge Deployment'
    },
    {
      id: 'video',
      name: 'Video & Reels',
      badge: '9:16 VERTICAL CUTS',
      metric: '15M+ Organic Impressions',
      icon: Video,
      color: '#FF1361',
      title: 'High-Retention Short-Form Content',
      description: 'Cinematic pacing, customized motion graphics, and audio synchronization engineered for TikTok and Instagram Reels.',
      deliverable: '4K Color Grading & Sound Design Sync'
    },
    {
      id: 'seo',
      name: 'Search & SEO',
      badge: 'INTENT ENGINE',
      metric: '#1 Page Google Rankings',
      icon: Search,
      color: '#38BDF8',
      title: 'Technical Search Domination',
      description: 'Keyword intent mapping, schema graph architecture, and technical Core Web Vitals fixes that compound organic traffic.',
      deliverable: 'Zero Spambacklinks & Real Search Equity'
    },
    {
      id: 'ads',
      name: 'Paid Growth',
      badge: 'META & GOOGLE',
      metric: '+340% Average ROAS',
      icon: TrendingUp,
      color: '#FF2A85',
      title: 'Direct-Response Funnels',
      description: 'High-intent creative ad variations paired with dedicated high-converting landing pages and pixel tracking.',
      deliverable: 'Targeted Customer Acquisition & Retargeting'
    }
  ];

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
      {/* Aerodynamic Laser Flight Accent Lines in Cerulean & Neon Rose */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-45 overflow-hidden" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flightGradAnimDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099FF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF1361" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path 
          d="M-100 250 L400 120 L850 340 L1600 80" 
          stroke="url(#flightGradAnimDark)" 
          strokeWidth="1.8" 
          fill="none" 
          className="animate-laser"
        />
        <path 
          d="M-50 480 L550 360 L1150 520 L1800 240" 
          stroke="url(#flightGradAnimDark)" 
          strokeWidth="1.2" 
          fill="none" 
          className="animate-laser-fast opacity-75"
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
              className="relative inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-semibold tracking-wider font-tech text-[#38BDF8] shadow-[0_0_20px_rgba(0,153,255,0.25)] mb-5 sm:mb-6 overflow-hidden group cursor-default"
            >
              <BorderBeam size={100} duration={8} colorFrom="#0099FF" colorTo="#FF1361" />
              <span className="w-2 h-2 rounded-full bg-[#FF1361] animate-ping" />
              <span>{siteConfig.badge || AGENCY_CONFIG.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-3.5xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-black tracking-tight text-white leading-[1.08] mb-5 sm:mb-6 break-words"
            >
              <span className="sr-only">{siteConfig.name || 'Evo Hawks'} — Creative Production &amp; Digital Marketing Agency. </span>
              {siteConfig.heroHeadlineLine1 || 'We Build.'} <br />
              <span className="text-gradient-cerulean">{siteConfig.heroHeadlineLine2 || 'We Create.'}</span> <br />
              <span className="text-gradient-neon-rose">{siteConfig.heroHeadlineLine3 || 'We Grow.'}</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl font-sans-clean leading-relaxed mb-6 sm:mb-8"
            >
              {siteConfig.heroDescription || AGENCY_CONFIG.heroDescription}
            </motion.p>

            {/* Slogan Pill */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 text-xs font-tech tracking-widest text-slate-400 uppercase mb-6 sm:mb-8"
            >
              <Compass className="w-4 h-4 text-[#FF1361]" />
              <span>{siteConfig.slogan || AGENCY_CONFIG.slogan}</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <MagneticButton
                onClick={onOpenProjectModal}
                className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] hover:shadow-[0_0_35px_rgba(255,19,97,0.5)] transition-all duration-300 cursor-pointer group animate-shimmer overflow-hidden shadow-lg"
              >
                <span>{siteConfig.heroPrimaryCtaText || 'Discuss Your Project'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-slate-200 bg-[#0B0D16]/90 hover:bg-[#121624] border border-white/10 hover:border-[#0099FF]/50 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#38BDF8]" />
                <span>{siteConfig.heroSecondaryCtaText || 'Explore Our Work'}</span>
              </MagneticButton>
            </motion.div>

            {/* Trust Indicator Badges */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10 text-xs font-medium text-slate-300 w-full"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0099FF] shrink-0" />
                <span>Single Creative Partner</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] shrink-0" />
                <span>Modern Clean Code</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1361] shrink-0" />
                <span>100% Asset Handover</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Hero Column: Sculpted Cyber-Creative Aerodynamic Capsules */}
          <div className="lg:col-span-5 relative flex flex-col justify-center items-center mt-6 lg:mt-0 w-full">
            
            {/* MOBILE & TABLET INTERACTIVE DISCIPLINE COCKPIT (< lg) */}
            <div className="block lg:hidden w-full max-w-lg mx-auto space-y-3.5">
              {/* Studio Core Header Pill */}
              <div className="flex items-center justify-between px-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0D16]/95 border border-[#0099FF]/30 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF1361] animate-spin-slow" />
                  <span className="text-[11px] font-tech font-extrabold text-white tracking-wider">AGENCY DISCIPLINES</span>
                </div>
                <span className="text-[10px] font-tech text-[#38BDF8] uppercase tracking-wider font-semibold">
                  Tap to preview &#9889;
                </span>
              </div>

              {/* Interactive Discipline Horizontal Tab Pills */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-full bg-[#070912]/90 border border-white/10 backdrop-blur-xl">
                {mobileDisciplines.map((item, idx) => {
                  const isActive = mobileActiveDiscipline === idx;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMobileActiveDiscipline(idx)}
                      className={`relative py-2 px-1 rounded-full text-[11px] font-tech font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer z-10 ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveDisciplineTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#FF1361] to-[#0099FF] rounded-full shadow-[0_0_15px_rgba(255,19,97,0.4)] -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                      <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#fff' : item.color }} />
                      <span className="truncate max-w-full text-[10px]">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Animated Interactive Showcase Card */}
              {(() => {
                const current = mobileDisciplines[mobileActiveDiscipline];
                const Icon = current.icon;
                return (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="p-5 sm:p-6 rounded-[2.5rem] rounded-tl-md bg-gradient-to-br from-[#0A0D18]/95 to-[#070912]/95 border border-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-xl"
                    >
                      <BorderBeam size={100} duration={8} colorFrom={current.color} colorTo="#FF1361" />

                      {/* Header with Icon, Badge, and Metric */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3.5">
                        <div className="flex items-center gap-2.5">
                          <div 
                            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white/15"
                            style={{ backgroundColor: `${current.color}15` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: current.color }} />
                          </div>
                          <div>
                            <span className="text-[10px] font-tech text-slate-400 uppercase tracking-wider block">
                              Discipline 0{mobileActiveDiscipline + 1}
                            </span>
                            <span 
                              className="text-[10px] font-tech font-bold px-2 py-0.5 rounded-full border inline-block"
                              style={{ 
                                backgroundColor: `${current.color}15`, 
                                color: current.color,
                                borderColor: `${current.color}35`
                              }}
                            >
                              {current.badge}
                            </span>
                          </div>
                        </div>

                        {/* Live Metric Badge */}
                        <div className="text-right">
                          <span className="text-[9px] font-tech text-emerald-400 uppercase tracking-widest block font-bold flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            VERIFIED
                          </span>
                          <span className="text-xs font-display font-black text-white">
                            {current.metric}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base font-display font-bold text-white mb-1.5 leading-snug">
                        {current.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-sans-clean leading-relaxed mb-4">
                        {current.description}
                      </p>

                      {/* Deliverable Pill & CTA Action */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-tech text-[#38BDF8]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0099FF] shrink-0" />
                          <span className="truncate">{current.deliverable}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => scrollToSection('services')}
                          className="py-1.5 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-tech font-bold text-[11px] flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 text-[#FF1361]" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })()}
            </div>

            {/* DESKTOP VIEW (lg:flex): 3D Orbit with Sculpted Asymmetrical Pods */}
            <div className="hidden lg:flex relative w-full max-w-lg aspect-[4/4] items-center justify-center">
              
              {/* Central Motion Graphic Gyro Rings with Dual Luminous Halo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <MotionRing size={360} speed={24} />
              </div>

              {/* Central Brand Jewel Core */}
              <div className="relative z-20">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#0099FF]/40 to-[#FF1361]/40 blur-lg animate-pulse" />
                <div className="relative w-28 h-28 rounded-full bg-[#070912]/95 border border-white/15 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(0,153,255,0.35)] overflow-hidden">
                  <BorderBeam size={90} duration={6} colorFrom="#0099FF" colorTo="#FF1361" />
                  <Sparkles className="w-8 h-8 text-[#FF1361] animate-spin-slow" />
                  <span className="text-[10px] font-tech text-white font-extrabold mt-1 tracking-widest uppercase">
                    EVO HAWKS
                  </span>
                  <span className="text-[8px] font-tech text-[#38BDF8] font-bold uppercase tracking-wider">STUDIO CORE</span>
                </div>
              </div>

              {/* Floating Bespoke Pod 1: Web Development (Top Left Asymmetrical Stadium) */}
              <div className="absolute top-0 -left-6 z-30 animate-float-gentle will-change-transform">
                <TiltCard tiltDegree={12} glareColor="#0099FF">
                  <div className="glass-panel p-4.5 rounded-[2.5rem] rounded-tl-sm border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] w-62 hover:border-[#0099FF]/50 transition-all cursor-default group relative overflow-hidden">
                    <BorderBeam size={100} duration={10} colorFrom="#0099FF" colorTo="#38BDF8" />
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0099FF]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF1361]" />
                      </div>
                      <span className="text-[10px] font-tech text-[#38BDF8] font-bold flex items-center gap-1 bg-[#0099FF]/10 px-2 py-0.5 rounded-full border border-[#0099FF]/30">
                        <Code2 className="w-3.5 h-3.5" /> React 19
                      </span>
                    </div>
                    <div className="text-xs font-display font-bold text-white mb-1">
                      Web Development
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans-clean leading-snug">
                      High-speed responsive sites, bespoke landing pages &amp; web apps.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-tech text-[#38BDF8] font-medium mt-2 pt-2 border-t border-white/10">
                      <CheckCircle2 className="w-3 h-3 text-[#0099FF]" />
                      <span>Clean semantic code</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Floating Bespoke Pod 2: Video Editing (Top Right Asymmetrical Stadium) */}
              <div 
                className="absolute top-4 -right-6 z-30 animate-float-gentle will-change-transform"
                style={{ animationDelay: '-2.5s' }}
              >
                <TiltCard tiltDegree={12} glareColor="#FF1361">
                  <div className="glass-panel p-4.5 rounded-[2.5rem] rounded-tr-sm border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] w-64 hover:border-[#FF1361]/50 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={100} duration={12} colorFrom="#FF1361" colorTo="#0099FF" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Video className="w-4 h-4 text-[#FF1361]" />
                        <span>Video &amp; Reels</span>
                      </div>
                      <span className="text-[9px] font-tech text-[#FF2A85] bg-[#FF1361]/15 px-2 py-0.5 rounded-full border border-[#FF1361]/30 font-bold">
                        9:16 &amp; 16:9
                      </span>
                    </div>
                    
                    {/* Dynamic Soundwave Frequency Track */}
                    <div className="relative bg-[#06080E]/90 p-1.5 rounded-xl border border-white/10 flex items-center gap-2 overflow-hidden h-8">
                      <div className="w-6 h-6 rounded-lg bg-[#FF1361]/20 flex items-center justify-center text-[8px] font-bold text-[#FF1361]">
                        <Play className="w-3 h-3 fill-current" />
                      </div>
                      <div className="flex-1 flex gap-1 items-end h-5 px-1">
                        <div className="w-1 bg-[#0099FF] rounded-full animate-soundwave-1" />
                        <div className="w-1 bg-[#38BDF8] rounded-full animate-soundwave-2" />
                        <div className="w-1 bg-[#FF1361] rounded-full animate-soundwave-3" />
                        <div className="w-1 bg-[#FF2A85] rounded-full animate-soundwave-4" />
                        <div className="w-1 bg-[#0099FF] rounded-full animate-soundwave-2" />
                        <div className="w-1 bg-[#FF1361] rounded-full animate-soundwave-1" />
                        <div className="w-1 bg-[#38BDF8] rounded-full animate-soundwave-3" />
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-300 mt-2 font-tech flex justify-between">
                      <span className="text-[#38BDF8]">Sound Design</span>
                      <span className="text-[#FF2A85] font-medium">Motion Overlays</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Floating Bespoke Pod 3: SEO Architecture (Bottom Left Asymmetrical Stadium) */}
              <div 
                className="absolute bottom-6 -left-5 z-30 animate-float-gentle will-change-transform"
                style={{ animationDelay: '-1.5s' }}
              >
                <TiltCard tiltDegree={12} glareColor="#0099FF">
                  <div className="glass-panel p-4.5 rounded-[2.5rem] rounded-bl-sm border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] w-62 hover:border-[#0099FF]/50 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={90} duration={11} colorFrom="#0099FF" colorTo="#FF1361" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Search className="w-4 h-4 text-[#0099FF]" />
                        <span>Search &amp; SEO</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#0099FF]/15 text-[#38BDF8] font-tech font-bold border border-[#0099FF]/30">
                        ORGANIC
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans-clean leading-snug">
                      Keyword intent mapping, schema metadata, and technical site structure.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-tech text-[#38BDF8] font-medium mt-2 pt-2 border-t border-white/10">
                      <CheckCircle2 className="w-3 h-3 text-[#0099FF]" />
                      <span>Sustainable discoverability</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Floating Bespoke Pod 4: Paid Marketing (Bottom Right Asymmetrical Stadium) */}
              <div 
                className="absolute bottom-2 -right-5 z-30 animate-float-gentle will-change-transform"
                style={{ animationDelay: '-3.8s' }}
              >
                <TiltCard tiltDegree={12} glareColor="#FF1361">
                  <div className="glass-panel p-4.5 rounded-[2.5rem] rounded-br-sm border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] w-64 hover:border-[#FF1361]/50 transition-all cursor-default relative overflow-hidden">
                    <BorderBeam size={100} duration={13} colorFrom="#FF1361" colorTo="#0099FF" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <TrendingUp className="w-4 h-4 text-[#FF1361]" />
                        <span>Paid Advertising</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FF1361]/15 text-[#FF2A85] border border-[#FF1361]/30 font-tech font-bold">
                        META &amp; GOOGLE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans-clean leading-snug">
                      Targeted ad creative production paired with conversion landing pages.
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-tech text-[#FF2A85] font-medium mt-2 pt-2 border-t border-white/10">
                      <CheckCircle2 className="w-3 h-3 text-[#FF1361]" />
                      <span>Transparent fee separation</span>
                    </div>
                  </div>
                </TiltCard>
              </div>

            </div>

          </div>

        </div>

        {/* Marquee Bar for Capabilities in Jet Black Cyber Capsules */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 relative">
          <div className="mb-4 text-xs uppercase font-tech tracking-widest text-slate-400 flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-[#FF1361]" />
            <span>Core Digital Disciplines &amp; Technology Stack</span>
          </div>

          <div className="relative mask-marquee-h overflow-hidden py-2">
            <Marquee pauseOnHover={true} duration="28s" gap="1rem">
              {marqueeBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0D16]/90 hover:bg-[#121624] border border-white/10 hover:border-[#0099FF]/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all cursor-default group"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#0099FF] group-hover:text-[#FF1361] group-hover:scale-110 transition-all" />
                    <span className="text-xs font-tech font-semibold text-slate-200 group-hover:text-white whitespace-nowrap">
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
