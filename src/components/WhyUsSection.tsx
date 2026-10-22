import React from 'react';
import { WHY_US_DATA } from '../data/agencyData';
import { motion, type Variants } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { BorderBeam } from './ui/BorderBeam';
import { Users, Brain, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'Brain': return Brain;
      case 'Zap': return Zap;
      case 'Layers': return Layers;
      default: return Sparkles;
    }
  };

  const getAccent = (id: string) => {
    switch (id) {
      case 'cross-discipline': return '#0099FF';
      case 'commercial-focus': return '#FF1361';
      case 'speed-execution': return '#38BDF8';
      case 'deep-synergy': return '#FF2A85';
      default: return '#0099FF';
    }
  };

  const getCreativeBorderClass = (index: number) => {
    switch (index) {
      case 0: return 'rounded-[2rem] sm:rounded-[3rem] rounded-tl-lg';
      case 1: return 'rounded-[2rem] sm:rounded-[3rem] rounded-tr-lg';
      case 2: return 'rounded-[2rem] sm:rounded-[3rem] rounded-bl-lg';
      case 3: return 'rounded-[2rem] sm:rounded-[3rem] rounded-br-lg';
      default: return 'rounded-[2rem] sm:rounded-[2.75rem]';
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="why-us" className="relative py-14 sm:py-24 lg:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
            <span>THE AGENCY ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">
            Why Businesses Choose Evo Hawks
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean">
            Built for forward-thinking brands that demand creative excellence and real commercial momentum.
          </p>
        </motion.div>

        {/* 4 Creative Sculpted Architectural Pods */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8"
        >
          {WHY_US_DATA.map((pillar, index) => {
            const Icon = getIcon(pillar.icon);
            const accent = getAccent(pillar.id);
            const creativeCurve = getCreativeBorderClass(index);
            const isRose = index % 2 === 1;

            return (
              <motion.div
                key={pillar.id}
                variants={cardVariants}
                className="h-full"
              >
                <TiltCard tiltDegree={10} glareColor={accent} className="h-full">
                  <div className={`group relative ${creativeCurve} bg-[#0A0D18]/95 border border-white/10 hover:border-[#0099FF]/50 p-5 sm:p-8 md:p-10 flex flex-col justify-between h-full transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_50px_rgba(0,153,255,0.25)] overflow-hidden`}>
                    <BorderBeam size={130} duration={12} colorFrom={accent} colorTo={isRose ? '#0099FF' : '#FF1361'} />

                    {/* Subtle Large Artistic Watermark */}
                    <span className="absolute -top-3 -right-2 text-6xl sm:text-8xl font-display font-black text-white/[0.03] pointer-events-none group-hover:text-[#0099FF]/[0.08] transition-colors select-none">
                      {pillar.number}
                    </span>

                    <div className="relative z-10">
                      {/* Top Row: Icon & Step Number */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0099FF]/20 via-transparent to-[#FF1361]/20 border border-white/15 flex items-center justify-center group-hover:border-[#0099FF]/60 transition-all duration-300 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
                          <Icon className={`w-7 h-7 ${isRose ? 'text-[#FF1361]' : 'text-[#0099FF]'} group-hover:scale-115 transition-transform duration-300`} />
                        </div>
                        <span className="text-xs font-tech font-extrabold text-[#38BDF8] tracking-widest bg-[#0099FF]/10 px-3 py-1 rounded-full border border-[#0099FF]/30">
                          PILLAR {pillar.number}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#0099FF] group-hover:to-[#FF1361] group-hover:bg-clip-text transition-all">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-tech text-[#FF2A85] font-bold uppercase tracking-wider mb-4">
                        {pillar.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-slate-300 font-sans-clean leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom Trust Badge */}
                    <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-tech text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-[#0099FF]" />
                      <span>Guaranteed Standards &amp; Clean Execution</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
