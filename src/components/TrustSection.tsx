import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion, type Variants } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { 
  ShieldCheck, 
  Layers, 
  Rocket, 
  Eye, 
  Sparkles, 
  Award,
  CheckCircle,
  Zap
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const highlights = [
    {
      title: "Design & Tech",
      desc: "Pixel-perfect websites & bespoke brand identities that capture customer trust and convert visitors.",
      icon: Sparkles,
      color: "text-[#0099FF]",
      border: "hover:border-[#0099FF]/50",
      accent: "#0099FF",
      curve: "rounded-[2.5rem] rounded-tl-md"
    },
    {
      title: "Content & Video",
      desc: "High-retention Reels, social feeds, and motion graphics that build authority and organic reach.",
      icon: Eye,
      color: "text-[#FF1361]",
      border: "hover:border-[#FF1361]/50",
      accent: "#FF1361",
      curve: "rounded-[2.5rem] rounded-tr-md"
    },
    {
      title: "SEO & Growth",
      desc: "Top search rankings and targeted ad funnels engineered to scale high-intent lead volume.",
      icon: Rocket,
      color: "text-[#38BDF8]",
      border: "hover:border-[#0099FF]/50",
      accent: "#38BDF8",
      curve: "rounded-[2.5rem] rounded-bl-md"
    }
  ];

  const stats = [
    { label: "Core Disciplines", value: 12, decimals: 0, suffix: "", icon: Layers, color: "#0099FF" },
    { label: "Unified Creative Partner", value: 1, decimals: 0, suffix: "", icon: Sparkles, color: "#FF1361" },
    { label: "Code & Asset Ownership", value: 100, decimals: 0, suffix: "%", icon: ShieldCheck, color: "#38BDF8" },
    { label: "Milestone Transparency", value: 100, decimals: 0, suffix: "%", icon: Award, color: "#FF2A85" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="relative py-14 sm:py-20 bg-transparent border-y border-white/10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Metrics Bar - Creative Stadium Pods */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16 pb-8 sm:pb-12 border-b border-white/10"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[2rem] bg-[#0A0D18]/90 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col items-center text-center group hover:border-[#0099FF]/50 hover:shadow-[0_0_25px_rgba(0,153,255,0.2)] transition-all"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0099FF]/20 to-[#FF1361]/20 border border-white/15 flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div className="text-xl sm:text-3xl font-display font-black text-white tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={2.2}
                  />
                </div>
                <div className="text-[10px] sm:text-xs font-tech text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF1361]" />
              <span>Full-Stack Digital Synergy</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-5">
              {AGENCY_CONFIG.trustHeadline}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans-clean leading-relaxed mb-6">
              {AGENCY_CONFIG.trustText}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-tech text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#0099FF]" />
                <span>Zero fragmented vendors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FF1361]" />
                <span>Synchronized execution</span>
              </div>
            </div>
          </motion.div>

          {/* Right Capability Cards with Asymmetrical Curves & BorderBeam */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TiltCard tiltDegree={14} glareColor={item.accent}>
                    <div 
                      className={`glass-panel p-5 ${item.curve} border border-white/10 ${item.border} transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_40px_rgba(0,153,255,0.2)]`}
                    >
                      <BorderBeam size={80} duration={9 + idx * 2} colorFrom={item.accent} colorTo={idx === 1 ? '#0099FF' : '#FF1361'} />
                      <div>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0099FF]/20 to-[#FF1361]/20 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
                          <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <h3 className="text-sm font-display font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300 font-sans-clean leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-[10px] font-tech text-[#38BDF8] font-semibold">
                        <Layers className="w-3 h-3" />
                        <span>Synchronized</span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
