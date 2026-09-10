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
      case 'cross-discipline': return '#0284C7';
      case 'commercial-focus': return '#7C3AED';
      case 'speed-execution': return '#0EA5E9';
      case 'deep-synergy': return '#059669';
      default: return '#0284C7';
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
    <section id="why-us" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>THE AGENCY ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            Why Businesses Choose Evo Hawks
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans-clean">
            Built for forward-thinking brands that demand creative excellence and real commercial momentum.
          </p>
        </motion.div>

        {/* 4 Premium Cards Grid with Stagger & 3D Tilt */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {WHY_US_DATA.map((pillar) => {
            const Icon = getIcon(pillar.icon);
            const accent = getAccent(pillar.id);
            return (
              <motion.div
                key={pillar.id}
                variants={cardVariants}
                className="h-full"
              >
                <TiltCard tiltDegree={10} glareColor={accent} className="h-full">
                  <div className="group relative rounded-3xl bg-white/90 border border-slate-200 hover:border-sky-400 p-8 sm:p-10 flex flex-col justify-between h-full transition-all duration-300 shadow-xs hover:shadow-xl backdrop-blur-xl overflow-hidden">
                    <BorderBeam size={130} duration={12} colorFrom={accent} colorTo="#0EA5E9" />

                    <div>
                      {/* Top Row: Icon & Step Number */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center group-hover:border-sky-400 group-hover:bg-sky-100 transition-all duration-300 shadow-xs">
                          <Icon className="w-7 h-7 text-sky-600 group-hover:scale-115 transition-transform duration-300" />
                        </div>
                        <span className="text-sm font-tech font-extrabold text-slate-400 tracking-widest">
                          PILLAR {pillar.number}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-2 group-hover:text-sky-600 transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-tech text-sky-600 font-bold uppercase tracking-wider mb-4">
                        {pillar.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-slate-600 font-sans-clean leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom Trust Badge */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-tech text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-sky-600" />
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
