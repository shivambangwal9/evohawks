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
  CheckCircle, 
  Zap, 
  TrendingUp, 
  Award, 
  Clock 
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const highlights = [
    {
      title: "Design & Tech",
      desc: "Pixel-perfect websites & bespoke brand identities that capture customer trust and convert visitors.",
      icon: Sparkles,
      color: "text-sky-600",
      border: "hover:border-sky-400",
      accent: "#0284C7"
    },
    {
      title: "Content & Video",
      desc: "High-retention Reels, social feeds, and motion graphics that build authority and organic reach.",
      icon: Eye,
      color: "text-violet-600",
      border: "hover:border-violet-400",
      accent: "#7C3AED"
    },
    {
      title: "SEO & Growth",
      desc: "Top search rankings and targeted ad funnels engineered to scale high-intent lead volume.",
      icon: Rocket,
      color: "text-blue-600",
      border: "hover:border-blue-400",
      accent: "#2563EB"
    }
  ];

  const stats = [
    { label: "Client Satisfaction", value: 99.4, decimals: 1, suffix: "%", icon: Award, color: "#0284C7" },
    { label: "Average Ad ROAS", value: 4.8, decimals: 1, suffix: "x", icon: TrendingUp, color: "#7C3AED" },
    { label: "Web Page Speed", value: 0.4, decimals: 1, suffix: "s", icon: Clock, color: "#0EA5E9" },
    { label: "Sprint Velocity", value: 100, decimals: 0, suffix: "%", icon: Zap, color: "#059669" },
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
    <section className="relative py-20 bg-transparent border-y border-slate-200/80 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Metrics Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 pb-12 border-b border-slate-200/80"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-xs backdrop-blur-md flex flex-col items-center text-center group hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={2.2}
                  />
                </div>
                <div className="text-xs font-tech text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Full-Stack Digital Synergy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {AGENCY_CONFIG.trustHeadline}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-sans-clean leading-relaxed mb-6">
              {AGENCY_CONFIG.trustText}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-tech text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-sky-600" />
                <span>Zero fragmented vendors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-violet-600" />
                <span>Synchronized execution</span>
              </div>
            </div>
          </motion.div>

          {/* Right Capability Cards with 3D Tilt & BorderBeam */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      className={`glass-panel p-5 rounded-2xl border border-slate-200 ${item.border} transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden shadow-xs hover:shadow-lg`}
                    >
                      <BorderBeam size={80} duration={9 + idx * 2} colorFrom={item.accent} colorTo="#0EA5E9" />
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <h3 className="text-sm font-display font-bold text-slate-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 font-sans-clean leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[10px] font-tech text-sky-600 font-semibold">
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
