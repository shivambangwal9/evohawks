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
      evo: "Bespoke React 19, Next.js, 4K Cinema Video, 0.4s load",
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
      className="pt-28 pb-20 overflow-hidden"
    >
      {/* Why Us Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent bg-grid-cyber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>THE EVO HAWKS ASYMMETRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Why High-Growth Brands <span className="text-gradient-cyan">Choose Us</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            We eliminated agency bloat, slow turnaround times, and fragmented freelancers to build a relentless digital execution powerhouse.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenProjectModal()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] transition-all cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="relative py-20 bg-transparent border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              4 Pillars of Our Advantage
            </h2>
            <p className="text-sm text-slate-600">
              The foundational principles that guarantee commercial momentum for our partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_US_DATA.map((pillar) => {
              const Icon = getIcon(pillar.icon);
              return (
                <TiltCard key={pillar.id} tiltDegree={10} glareColor="#0284C7" className="h-full">
                  <div className="group relative rounded-3xl bg-white/90 border border-slate-200 hover:border-sky-400 p-8 sm:p-10 flex flex-col justify-between h-full transition-all duration-300 shadow-xs hover:shadow-xl backdrop-blur-xl overflow-hidden">
                    <BorderBeam size={120} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center group-hover:border-sky-400 group-hover:bg-sky-100 transition-all duration-300 shadow-xs">
                          <Icon className="w-7 h-7 text-sky-600 group-hover:scale-115 transition-transform duration-300" />
                        </div>
                        <span className="text-sm font-tech font-extrabold text-slate-400 tracking-widest">
                          PILLAR {pillar.number}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-2">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm font-tech text-sky-600 uppercase tracking-wider mb-4 font-bold">
                        {pillar.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-slate-600 font-sans-clean leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-tech text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-sky-600" />
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>THE OBJECTIVE BREAKDOWN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Evo Hawks vs The Alternatives
            </h2>
            <p className="text-sm text-slate-600">
              See why forward-thinking companies choose our streamlined execution model.
            </p>
          </div>

          {/* Desktop Matrix Table */}
          <div className="rounded-3xl bg-white/95 border border-slate-200 overflow-hidden shadow-xl relative">
            <BorderBeam size={180} duration={14} colorFrom="#0284C7" colorTo="#7C3AED" />

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="p-5 sm:p-6 text-xs font-tech uppercase text-slate-500 font-bold">Comparison Dimension</th>
                    <th className="p-5 sm:p-6 text-sm font-display font-bold text-sky-700 bg-sky-100/60 border-x border-sky-200">
                      🦅 Evo Hawks
                    </th>
                    <th className="p-5 sm:p-6 text-xs font-tech uppercase text-slate-500 font-bold">Traditional Agency</th>
                    <th className="p-5 sm:p-6 text-xs font-tech uppercase text-slate-500 font-bold">Freelance Marketplaces</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5 sm:p-6 font-display font-bold text-slate-900 max-w-[200px]">
                        {row.feature}
                      </td>
                      <td className="p-5 sm:p-6 text-slate-900 font-semibold bg-sky-50/40 border-x border-sky-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                        <span>{row.evo}</span>
                      </td>
                      <td className="p-5 sm:p-6 text-slate-500">
                        {row.traditional}
                      </td>
                      <td className="p-5 sm:p-6 text-slate-500">
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
      <section className="relative py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <Clock className="w-8 h-8 text-sky-600 mx-auto mb-3" />
              <h4 className="text-lg font-display font-bold text-slate-900 mb-1">48h Kick-off</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans-clean">No bloated discovery delays. Fast sprints to prototype in days.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <Gauge className="w-8 h-8 text-violet-600 mx-auto mb-3" />
              <h4 className="text-lg font-display font-bold text-slate-900 mb-1">0.4s Speed Target</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans-clean">Optimized bundle sizing and edge hosting standard on all web builds.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h4 className="text-lg font-display font-bold text-slate-900 mb-1">100% IP Handover</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans-clean">You own all source code, design files, and ad accounts outright.</p>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};
