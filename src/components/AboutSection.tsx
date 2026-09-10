import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { BorderBeam } from './ui/BorderBeam';
import { 
  Eye, 
  Zap, 
  TrendingUp, 
  Compass
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const ethosPoints = [
    {
      keyword: "SEE HIGHER",
      desc: "Bird's-eye strategic vision. We analyze market gaps, competitive landscapes, and high-intent customer behavior before launching.",
      icon: Eye,
      accent: "text-sky-600"
    },
    {
      keyword: "MOVE FASTER",
      desc: "Rapid agile delivery without compromising quality. Fast website loading, high-tempo content sprints, and agile campaign iterations.",
      icon: Zap,
      accent: "text-blue-600"
    },
    {
      keyword: "GROW FURTHER",
      desc: "Sustainable digital equity. We build compounding SEO rank, scalable paid funnels, and engaged brand communities that last.",
      icon: TrendingUp,
      accent: "text-indigo-600"
    }
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-transparent border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Vision & Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span>THE EVO HAWKS PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mb-6">
              {AGENCY_CONFIG.aboutHeadline}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-sans-clean leading-relaxed mb-6">
              {AGENCY_CONFIG.aboutText}
            </p>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
              <BorderBeam size={100} duration={14} colorFrom="#0284C7" colorTo="#7C3AED" />
              <p className="text-sm text-slate-700 font-sans-clean leading-relaxed">
                Rather than treating digital channels as fragmented afterthoughts, we build an interconnected engine where your website, creative content, and marketing fuel one another with speed and precision.
              </p>
            </div>

            {/* Core Values / Ethos Grid */}
            <div className="space-y-4 w-full">
              {ethosPoints.map((ethos, idx) => {
                const Icon = ethos.icon;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 6 }}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-all flex items-start gap-4 cursor-default shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className={`w-5 h-5 ${ethos.accent}`} />
                    </div>
                    <div>
                      <div className="text-xs font-tech font-bold text-slate-900 tracking-wider mb-1">
                        {ethos.keyword}
                      </div>
                      <p className="text-xs text-slate-600 font-sans-clean leading-relaxed">
                        {ethos.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* Right Column: Abstract Hawk Flight Geometric Visual Art with Orbital Rings & 3D Tilt */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center"
          >
            <TiltCard tiltDegree={12} glareColor="#0284C7" className="w-full max-w-md aspect-square">
              <div className="relative w-full h-full rounded-3xl bg-white/95 border border-slate-200 p-8 flex flex-col items-center justify-center overflow-hidden shadow-xl">
                <BorderBeam size={160} duration={10} colorFrom="#0284C7" colorTo="#7C3AED" />
                
                {/* Animated Orbital Radar Rings */}
                <div className="absolute w-72 h-72 rounded-full border border-sky-300/40 animate-spin-slow pointer-events-none" />
                <div className="absolute w-88 h-88 rounded-full border border-dashed border-violet-400/30 animate-spin-slow-reverse pointer-events-none" />

                {/* Large Abstract Geometric Hawk Vector Silhouette */}
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-56 h-56 drop-shadow-[0_8px_30px_rgba(2,132,199,0.3)] animate-float relative z-10"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="hawkLargeGradAnimLightSec" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00B4D8" />
                      <stop offset="50%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>

                  {/* Primary Angular Wing Blade */}
                  <polygon points="100,20 30,130 90,95 30,165 100,120 170,165 110,95 170,130" fill="url(#hawkLargeGradAnimLightSec)" opacity="0.95" />
                  
                  {/* Secondary Inner Flight Facet */}
                  <polygon points="100,45 60,115 100,90 140,115" fill="#FFFFFF" fillOpacity="0.9" />
                  
                  {/* Hawk Eye Precision Target */}
                  <circle cx="100" cy="70" r="4" fill="#00B4D8" />
                  <circle cx="100" cy="70" r="10" stroke="#00B4D8" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
                </svg>

                {/* Floating Stat Badges on Visual */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-tech bg-white/90 border border-slate-200 px-4 py-2.5 rounded-xl backdrop-blur-md z-20 shadow-md">
                  <span className="text-slate-600 font-medium">Brand Ethos</span>
                  <span className="text-sky-600 font-bold">Speed • Tech • Growth</span>
                </div>

              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
