import React from 'react';
import { SERVICES_DATA } from '../data/agencyData';
import type { ServiceItem } from '../data/agencyData';
import { motion, type Variants } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { BorderBeam } from './ui/BorderBeam';
import { 
  Globe, 
  Palette, 
  Video, 
  Share2, 
  Search, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  Sparkles 
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      case 'Video': return Video;
      case 'Share2': return Share2;
      case 'Search': return Search;
      case 'TrendingUp': return TrendingUp;
      default: return Sparkles;
    }
  };

  const getAccentColor = (id: string) => {
    switch (id) {
      case 'web-dev': return '#0099FF';
      case 'graphic-design': return '#FF1361';
      case 'video-editing': return '#38BDF8';
      case 'social-media': return '#FF2A85';
      case 'seo-ranking': return '#0099FF';
      case 'digital-marketing': return '#8B5CF6';
      default: return '#0099FF';
    }
  };

  const getCreativeBorderClass = (index: number) => {
    switch (index % 3) {
      case 0: return 'rounded-[2rem] sm:rounded-[2.75rem] rounded-tl-lg rounded-br-lg';
      case 1: return 'rounded-[2rem] sm:rounded-[2.75rem] rounded-tr-lg rounded-bl-lg';
      case 2: return 'rounded-[2rem] sm:rounded-[3rem] rounded-bl-lg rounded-tr-lg';
      default: return 'rounded-[2rem] sm:rounded-[2.75rem]';
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="services" className="relative py-14 sm:py-24 lg:py-32 bg-transparent overflow-hidden">
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
            <span>FULL-SERVICE DIGITAL SOLUTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">
            What We Do
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean">
            Everything you need to build and grow your digital presence.
          </p>
        </motion.div>

        {/* 6 Large Creative Asymmetrical Service Pods */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          {SERVICES_DATA.map((service: ServiceItem, index: number) => {
            const IconComponent = getIcon(service.icon);
            const accent = getAccentColor(service.id);
            const creativeRadius = getCreativeBorderClass(index);
            const isRoseAccent = index % 2 === 1;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="h-full"
              >
                <TiltCard tiltDegree={10} glareColor={accent} className="h-full">
                  <div className={`group relative ${creativeRadius} bg-[#0A0D18]/95 border border-white/10 hover:border-[#0099FF]/50 p-5 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_50px_rgba(0,153,255,0.2)] overflow-hidden`}>
                    <BorderBeam size={120} duration={12} colorFrom={accent} colorTo={isRoseAccent ? '#0099FF' : '#FF1361'} />

                    {/* Subtle Large Artistic Watermark Number in Background */}
                    <span className="absolute -top-3 -right-2 text-6xl sm:text-7xl font-display font-black text-white/[0.04] pointer-events-none group-hover:text-[#0099FF]/10 transition-colors select-none">
                      {service.number}
                    </span>

                    <div className="relative z-10">
                      {/* Service Number & Icon Header */}
                      <div className="flex items-center justify-between mb-5 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#0099FF]/20 via-transparent to-[#FF1361]/20 border border-white/15 flex items-center justify-center group-hover:border-[#0099FF]/60 group-hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,153,255,0.25)]">
                          <IconComponent className={`w-6 h-6 ${isRoseAccent ? 'text-[#FF1361]' : 'text-[#0099FF]'} group-hover:scale-115 transition-transform duration-300`} />
                        </div>
                        <span className="font-tech text-xs tracking-widest text-[#38BDF8] font-bold bg-[#0099FF]/10 px-3 py-1 rounded-full border border-[#0099FF]/25">
                          DISCIPLINE {service.number}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#0099FF] group-hover:to-[#FF1361] group-hover:bg-clip-text transition-all">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs font-semibold text-[#38BDF8] mb-3 font-sans-clean leading-snug">
                        {service.tagline}
                      </p>

                      <p className="text-xs text-slate-300 font-sans-clean leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Sub-Services Checklist Capsules */}
                      <div className="space-y-2 mb-8 pt-4 border-t border-white/10">
                        <div className="text-[11px] font-tech uppercase tracking-wider text-slate-400 font-semibold mb-2">
                          Capabilities Included:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {service.services.map((sub, idx) => (
                            <div key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-200">
                              <Check className="w-3 h-3 text-[#FF1361] shrink-0" />
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectService(service.title)}
                      className="relative z-10 w-full inline-flex items-center justify-between px-5 py-3 rounded-full font-bold text-xs sm:text-sm text-slate-200 bg-[#0B0D16]/90 hover:bg-gradient-to-r hover:from-[#FF1361] hover:to-[#0099FF] hover:text-white border border-white/10 hover:border-transparent transition-all duration-300 shadow-md cursor-pointer group/btn"
                    >
                      <span>{service.cta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </motion.button>
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
