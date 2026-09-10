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
      case 'web-dev': return '#0284C7';
      case 'graphic-design': return '#7C3AED';
      case 'video-editing': return '#0EA5E9';
      case 'social-media': return '#DB2777';
      case 'seo-ranking': return '#059669';
      case 'digital-marketing': return '#D97706';
      default: return '#0284C7';
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
    <section id="services" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
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
            <span>FULL-SERVICE DIGITAL SOLUTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            What We Do
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans-clean">
            Everything you need to build and grow your digital presence.
          </p>
        </motion.div>

        {/* 6 Large Service Cards Grid with Framer Motion Stagger & 3D Tilt */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((service: ServiceItem) => {
            const IconComponent = getIcon(service.icon);
            const accent = getAccentColor(service.id);
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="h-full"
              >
                <TiltCard tiltDegree={12} glareColor={accent} className="h-full">
                  <div className="group relative rounded-3xl bg-white/90 border border-slate-200 hover:border-sky-400 p-8 flex flex-col justify-between h-full transition-all duration-300 shadow-xs hover:shadow-xl backdrop-blur-xl overflow-hidden">
                    <BorderBeam size={120} duration={12} colorFrom={accent} colorTo="#0EA5E9" />

                    <div>
                      {/* Service Number & Icon Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-13 h-13 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center group-hover:border-sky-400 group-hover:bg-sky-100 transition-all duration-300 shadow-xs">
                          <IconComponent className="w-6 h-6 text-sky-600 group-hover:scale-115 transition-transform duration-300" />
                        </div>
                        <span className="font-tech text-xs tracking-widest text-slate-400 font-bold">
                          SERVICE {service.number}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight mb-2 group-hover:text-sky-600 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm font-semibold text-slate-700 mb-3 font-sans-clean leading-snug">
                        {service.tagline}
                      </p>

                      <p className="text-xs text-slate-500 font-sans-clean leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Sub-Services Checklist */}
                      <div className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                        <div className="text-[11px] font-tech uppercase tracking-wider text-slate-500 font-semibold mb-2">
                          Capabilities Included:
                        </div>
                        {service.services.map((sub, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                            <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-sky-600" />
                            </div>
                            <span className="leading-tight">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectService(service.title)}
                      className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-50 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-600 hover:text-white border border-slate-200 hover:border-transparent transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
                    >
                      <span>{service.cta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
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
