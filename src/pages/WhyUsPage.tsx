import React from 'react';
import { WHY_US_DATA } from '../data/agencyData';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/ui/TiltCard';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  Users, 
  Brain, 
  Zap, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Gauge, 
  ArrowRight 
} from 'lucide-react';

interface WhyUsPageProps {
  onOpenProjectModal: (service?: string) => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onOpenProjectModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'Brain': return Brain;
      case 'Zap': return Zap;
      case 'Layers': return Layers;
      default: return Sparkles;
    }
  };

  const comparisonRows = [
    {
      feature: "Project Kick-off & Velocity",
      evo: "Within 48 hours with clear milestone roadmaps",
      traditional: "4 to 6 weeks of bureaucratic meetings",
      freelancers: "Unpredictable response times & delays",
    },
    {
      feature: "Cross-Discipline Synergy",
      evo: "Website, Video & Ads engineered as one unified engine",
      traditional: "Siloed departments with poor internal communication",
      freelancers: "Fragmented vendors passing blame to each other",
    },
    {
      feature: "Code & Design Standards",
      evo: "Bespoke React 19, Next.js, 4K Video, Performance Optimized",
      traditional: "Heavy bloated templates & generic stock visuals",
      freelancers: "Varying quality & inconsistent standards",
    },
    {
      feature: "Communication & Direct Access",
      evo: "Direct WhatsApp & strategic lead access in real-time",
      traditional: "Filtered through junior account managers",
      freelancers: "Ghosting risk during crunch deadlines",
    },
    {
      feature: "Pricing Transparency",
      evo: "Fixed milestone scopes — zero surprise billing",
      traditional: "High retainers & hidden change-order fees",
      freelancers: "Hourly rate creep with vague timesheets",
    },
    {
      feature: "Source Code & Asset Ownership",
      evo: "100% full intellectual property & asset handover",
      traditional: "Vendor lock-in & proprietary CMS hostage",
      freelancers: "Missing source files & broken repo access",
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 pb-20 overflow-hidden min-h-screen"
    >
      {/* Why Us Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-6 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>THE EVO HAWKS ASYMMETRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-6">
            Why High-Growth Brands <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Choose Us</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            We eliminated agency bloat, slow turnaround times, and fragmented freelancers to build a relentless digital execution powerhouse.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="relative py-20 bg-transparent border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              4 Pillars of Our Advantage
            </h2>
            <p className="text-sm text-slate-400 font-sans-clean">
              The foundational principles that guarantee commercial momentum for our partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_US_DATA.map((pillar, idx) => {
              const Icon = getIcon(pillar.icon);
              const cornerRadius = 
                idx === 0 ? 'rounded-[2.75rem] rounded-tl-sm' :
                idx === 1 ? 'rounded-[2.75rem] rounded-tr-sm' :
                idx === 2 ? 'rounded-[2.75rem] rounded-bl-sm' :
                'rounded-[2.75rem] rounded-br-sm';
              return (
                <TiltCard key={pillar.id} tiltDegree={8} glareColor="#0099FF" className="h-full">
                  <div className={`group relative ${cornerRadius} bg-[#060810] border border-white/10 hover:border-[#0099FF]/50 p-8 sm:p-10 flex flex-col justify-between h-full transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden`}>
                    <BorderBeam size={120} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#0099FF]/15 border border-[#0099FF]/30 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#0099FF]/25 transition-all duration-300 shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                          <Icon className="w-7 h-7 text-[#0099FF] group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="text-sm font-tech font-extrabold text-slate-500 tracking-widest">
                          PILLAR {pillar.number}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mb-2">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-tech text-[#FF2A85] uppercase tracking-wider mb-4 font-bold">
                        {pillar.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-slate-300 font-sans-clean leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-tech text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-[#0099FF]" />
                      <span>Guaranteed Standard &amp; Clean Delivery</span>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Agency Comparison Matrix */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>THE OBJECTIVE BREAKDOWN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Evo Hawks vs The Alternatives
            </h2>
            <p className="text-sm text-slate-400 font-sans-clean">
              See why forward-thinking companies choose our streamlined execution model.
            </p>
          </div>

          {/* Mobile Comparison Cards (< md) */}
          <div className="block md:hidden space-y-4">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="bg-[#060810] rounded-[2rem] border border-white/10 p-5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                <h3 className="text-sm font-display font-bold text-white mb-3">
                  {row.feature}
                </h3>
                
                {/* Evo Hawks Winner Card */}
                <div className="bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-[#0099FF]/40 rounded-2xl p-3.5 mb-2.5 shadow-[0_0_15px_rgba(0,153,255,0.15)]">
                  <div className="text-[11px] font-tech text-[#38BDF8] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0099FF] flex-shrink-0" />
                    <span>🦅 Evo Hawks</span>
                  </div>
                  <p className="text-xs text-white font-medium">
                    {row.evo}
                  </p>
                </div>

                {/* Alternatives */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#0A0D18] rounded-xl p-2.5 border border-white/5">
                    <span className="text-[10px] font-tech font-bold uppercase text-slate-500 block mb-0.5">Traditional Agency</span>
                    <span className="text-slate-400 leading-snug">{row.traditional}</span>
                  </div>
                  <div className="bg-[#0A0D18] rounded-xl p-2.5 border border-white/5">
                    <span className="text-[10px] font-tech font-bold uppercase text-slate-500 block mb-0.5">Freelancers</span>
                    <span className="text-slate-400 leading-snug">{row.freelancers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Matrix Table (md+) */}
          <div className="hidden md:block rounded-[3rem] rounded-tl-lg bg-[#060810] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
            <BorderBeam size={180} duration={14} colorFrom="#0099FF" colorTo="#FF1361" />

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0A0D18]">
                    <th className="p-5 sm:p-6 text-xs font-tech uppercase text-slate-400 font-bold">Comparison Dimension</th>
                    <th className="p-5 sm:p-6 text-sm font-display font-bold text-[#38BDF8] bg-gradient-to-r from-[#0099FF]/15 to-[#FF1361]/15 border-x border-[#0099FF]/30">
                      🦅 Evo Hawks
                    </th>
                    <th className="p-5 sm:p-6 text-xs font-tech uppercase text-slate-400 font-bold">Traditional Agency</th>
                    <th className="p-5 sm:p-6 text-xs font-tech uppercase text-slate-400 font-bold">Freelance Marketplaces</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 sm:p-6 font-display font-bold text-white max-w-[200px]">
                        {row.feature}
                      </td>
                      <td className="p-5 sm:p-6 text-white font-semibold bg-[#0099FF]/5 border-x border-[#0099FF]/20 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0099FF] flex-shrink-0 mt-0.5" />
                        <span>{row.evo}</span>
                      </td>
                      <td className="p-5 sm:p-6 text-slate-400">
                        {row.traditional}
                      </td>
                      <td className="p-5 sm:p-6 text-slate-400">
                        {row.freelancers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Speed & SLAs Section */}
      <section className="relative py-16 bg-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-7 rounded-[2.5rem] rounded-tl-sm bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <Clock className="w-8 h-8 text-[#0099FF] mx-auto mb-3" />
              <h4 className="text-lg font-display font-bold text-white mb-1">48h Kick-off</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans-clean">No bloated discovery delays. Fast sprints to prototype in days.</p>
            </div>
            <div className="p-7 rounded-[2.5rem] rounded-tr-sm bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <Gauge className="w-8 h-8 text-[#FF1361] mx-auto mb-3" />
              <h4 className="text-lg font-display font-bold text-white mb-1">Performance Focus</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans-clean">Optimized bundle sizing and edge hosting standard on all web builds.</p>
            </div>
            <div className="p-7 rounded-[2.5rem] rounded-bl-sm bg-[#060810] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
              <ShieldCheck className="w-8 h-8 text-[#38BDF8] mx-auto mb-3" />
              <h4 className="text-lg font-display font-bold text-white mb-1">100% IP Handover</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans-clean">You own all source code, design files, and ad accounts outright.</p>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};
