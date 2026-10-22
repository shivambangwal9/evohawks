import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { BorderBeam } from './ui/BorderBeam';
import { useTheme } from '../context/ThemeContext';
import { 
  Eye, 
  Zap, 
  TrendingUp, 
  Compass
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const ethosPoints = [
    {
      keyword: "SEE HIGHER",
      desc: "Bird's-eye strategic vision. We analyze market gaps, competitive landscapes, and high-intent customer behavior before launching.",
      icon: Eye,
      accent: isLight ? "text-sky-600" : "text-[#0099FF]"
    },
    {
      keyword: "MOVE FASTER",
      desc: "Rapid agile delivery without compromising quality. Fast website loading, high-tempo content sprints, and agile campaign iterations.",
      icon: Zap,
      accent: isLight ? "text-rose-600" : "text-[#FF1361]"
    },
    {
      keyword: "GROW FURTHER",
      desc: "Sustainable digital equity. We build compounding SEO rank, scalable paid funnels, and engaged brand communities that last.",
      icon: TrendingUp,
      accent: isLight ? "text-indigo-600" : "text-[#38BDF8]"
    }
  ];

  return (
    <section id="about" className={`relative py-14 sm:py-24 lg:py-32 bg-transparent border-y ${isLight ? 'border-slate-200' : 'border-white/10'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Vision & Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${
              isLight 
                ? 'bg-white border border-sky-200 text-xs font-tech text-sky-700 shadow-xs' 
                : 'bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] shadow-[0_0_20px_rgba(0,153,255,0.2)]'
            } font-semibold mb-4`}>
              <Compass className={`w-3.5 h-3.5 ${isLight ? 'text-sky-600' : 'text-[#FF1361]'}`} />
              <span>THE EVO HAWKS PHILOSOPHY</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-black ${
              isLight ? 'text-slate-900' : 'text-white'
            } tracking-tight leading-tight mb-6`}>
              {AGENCY_CONFIG.aboutHeadline}
            </h2>

            <p className={`text-base sm:text-lg ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            } font-sans-clean leading-relaxed mb-6`}>
              {AGENCY_CONFIG.aboutText}
            </p>

            <div className={`p-5 rounded-2xl ${
              isLight ? 'bg-white border border-slate-200 shadow-sm' : 'bg-[#0A0D18]/90 border border-white/10 shadow-lg'
            } mb-8 relative overflow-hidden`}>
              <BorderBeam size={100} duration={14} colorFrom="#0099FF" colorTo="#FF1361" />
              <p className={`text-sm ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              } font-sans-clean leading-relaxed`}>
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
                    className={`p-4 rounded-xl ${
                      isLight 
                        ? 'bg-white border border-slate-200 hover:border-sky-300 shadow-xs' 
                        : 'bg-[#0B0D16]/80 border border-white/10 hover:border-[#0099FF]/50 shadow-md'
                    } transition-all flex items-start gap-4 cursor-default`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${
                      isLight ? 'bg-slate-50 border border-slate-100' : 'bg-[#060810] border border-white/10'
                    } flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-5 h-5 ${ethos.accent}`} />
                    </div>
                    <div>
                      <div className={`text-xs font-tech font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      } tracking-wider mb-1`}>
                        {ethos.keyword}
                      </div>
                      <p className={`text-xs ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      } font-sans-clean leading-relaxed`}>
                        {ethos.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* Right Column: Abstract Hawk Flight Geometric Visual Art */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center"
          >
            <TiltCard tiltDegree={12} glareColor="#0099FF" className="w-full max-w-xs sm:max-w-md aspect-square">
              <div className={`relative w-full h-full rounded-3xl ${
                isLight ? 'bg-white/95 border border-slate-200 shadow-xl' : 'bg-[#070912]/95 border border-white/15 shadow-[0_0_40px_rgba(0,153,255,0.25)]'
              } p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden`}>
                <BorderBeam size={160} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />
                
                {/* Animated Orbital Radar Rings */}
                <div className={`absolute w-72 h-72 rounded-full border ${
                  isLight ? 'border-sky-300/40' : 'border-[#0099FF]/20'
                } animate-spin-slow pointer-events-none`} />
                <div className={`absolute w-88 h-88 rounded-full border border-dashed ${
                  isLight ? 'border-violet-400/30' : 'border-[#FF1361]/20'
                } animate-spin-slow-reverse pointer-events-none`} />

                {/* Large Abstract Geometric Hawk Vector Silhouette */}
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-44 h-44 sm:w-56 sm:h-56 drop-shadow-[0_8px_30px_rgba(0,153,255,0.3)] animate-float relative z-10"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="hawkLargeGradAnimLightSec" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0099FF" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#FF1361" />
                    </linearGradient>
                  </defs>

                  {/* Primary Angular Wing Blade */}
                  <polygon points="100,20 30,130 90,95 30,165 100,120 170,165 110,95 170,130" fill="url(#hawkLargeGradAnimLightSec)" opacity="0.95" />
                  
                  {/* Secondary Inner Flight Facet */}
                  <polygon points="100,45 60,115 100,90 140,115" fill={isLight ? "#FFFFFF" : "#0B0D16"} fillOpacity="0.9" />
                  
                  {/* Hawk Eye Precision Target */}
                  <circle cx="100" cy="70" r="4" fill="#0099FF" />
                  <circle cx="100" cy="70" r="10" stroke="#0099FF" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
                </svg>

                {/* Floating Stat Badges on Visual */}
                <div className={`absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-tech ${
                  isLight ? 'bg-white/90 border-slate-200 shadow-md' : 'bg-[#0B0D16]/90 border-white/10 shadow-lg'
                } border px-4 py-2.5 rounded-xl z-20`}>
                  <span className={`${isLight ? 'text-slate-600' : 'text-slate-400'} font-medium`}>Brand Ethos</span>
                  <span className={`${isLight ? 'text-sky-600' : 'text-[#38BDF8]'} font-bold`}>Speed • Tech • Growth</span>
                </div>

              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
