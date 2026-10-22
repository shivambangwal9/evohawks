import React, { useState, useEffect } from 'react';
import { AGENCY_CONFIG, SYSTEM_NODES } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MagneticButton } from './ui/MagneticButton';
import { 
  Globe, 
  Palette, 
  Share2, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Network, 
  Sparkles 
} from 'lucide-react';

interface SystemCrossSellProps {
  onOpenProjectModal: () => void;
}

export const SystemCrossSell: React.FC<SystemCrossSellProps> = ({ onOpenProjectModal }) => {
  const [activeNode, setActiveNode] = useState<number>(0);

  useEffect(() => {
    // Gentle auto-cycle every 5 seconds if not manually clicked recently
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % SYSTEM_NODES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      case 'Share2': return Share2;
      case 'Search': return Search;
      case 'TrendingUp': return TrendingUp;
      case 'CheckCircle2': return CheckCircle2;
      default: return Sparkles;
    }
  };

  return (
    <section className="relative py-24 bg-transparent border-y border-white/10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D1A]/90 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Network className="w-3.5 h-3.5 text-[#FF1361]" />
            <span className="tracking-wider">CONNECTED DIGITAL ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight mb-4">
            {AGENCY_CONFIG.ecosystemHeadline.split('Growth Engine')[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">
              Growth Engine
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean leading-relaxed">
            {AGENCY_CONFIG.ecosystemText}
          </p>
        </motion.div>

        {/* Interactive Animated Pipeline Display */}
        <div className="relative">
          
          {/* Animated Connecting Laser Flow Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1.5 bg-[#0A0D18] border border-white/10 -translate-y-8 z-0 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361] shadow-[0_0_15px_rgba(0,153,255,0.8)]"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeNode + 1) / SYSTEM_NODES.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Nodes Grid with Bespoke Asymmetric Stadium Pods */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative z-10">
            {SYSTEM_NODES.map((node, index) => {
              const IconComp = getNodeIcon(node.icon);
              const isActive = activeNode === index;
              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveNode(index)}
                  className={`cursor-pointer rounded-[2rem] rounded-tl-sm rounded-br-sm p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 border relative overflow-hidden ${
                    isActive
                      ? 'bg-[#0E1224] border-[#0099FF] shadow-[0_0_30px_rgba(0,153,255,0.35)] scale-105'
                      : 'bg-[#0A0D18]/90 border-white/10 hover:border-[#0099FF]/40 hover:bg-[#0D1020]'
                  }`}
                >
                  {isActive && (
                    <BorderBeam size={80} duration={6} colorFrom="#0099FF" colorTo="#FF1361" />
                  )}

                  {/* Step Number Tag */}
                  <span className={`text-[10px] font-tech font-extrabold mb-2 transition-colors ${isActive ? 'text-[#FF2A85]' : 'text-slate-500'}`}>
                    0{index + 1}
                  </span>

                  {/* Icon Circle */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_20px_rgba(255,19,97,0.4)] rotate-3' 
                      : 'bg-[#060810] text-[#38BDF8] border border-white/10'
                  }`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  {/* Node Name */}
                  <h3 className="text-sm font-display font-bold text-white mb-1">
                    {node.name}
                  </h3>

                  {/* Role Tag */}
                  <span className="text-[11px] font-tech text-[#38BDF8] font-medium mb-2">
                    {node.role}
                  </span>

                  {/* Node Short Metric */}
                  <div className={`text-[10px] font-tech px-2.5 py-1 rounded-full border transition-all ${
                    isActive 
                      ? 'bg-[#0099FF]/20 border-[#0099FF]/50 text-white font-bold shadow-[0_0_10px_rgba(0,153,255,0.3)]' 
                      : 'bg-[#060810] border-white/10 text-slate-400'
                  }`}>
                    {node.metric}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Node Detail Card with AnimatePresence & BorderBeam */}
          <div className="mt-10 rounded-[2.75rem] rounded-tl-lg bg-[#0A0D18]/95 border border-white/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <BorderBeam size={160} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0099FF]/10 border border-[#0099FF]/30 flex items-center justify-center flex-shrink-0 text-[#38BDF8] shadow-[0_0_20px_rgba(0,153,255,0.25)]">
                    <Sparkles className="w-6 h-6 animate-pulse text-[#FF1361]" />
                  </div>
                  <div>
                    <div className="text-xs font-tech text-[#38BDF8] font-bold tracking-wider uppercase mb-1">
                      Ecosystem Synergy: Stage 0{activeNode + 1} — {SYSTEM_NODES[activeNode].name}
                    </div>
                    <h4 className="text-lg sm:text-xl font-display font-bold text-white mb-1">
                      {SYSTEM_NODES[activeNode].role}
                    </h4>
                    <p className="text-sm text-slate-300 font-sans-clean max-w-2xl leading-relaxed">
                      {SYSTEM_NODES[activeNode].description}
                    </p>
                  </div>
                </div>

                <MagneticButton
                  onClick={onOpenProjectModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_30px_rgba(255,19,97,0.4)] transition-all flex-shrink-0 cursor-pointer"
                >
                  <span>Build Complete System</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
