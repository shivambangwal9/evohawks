import React, { useState } from 'react';
import { PROCESS_DATA } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MagneticButton } from './ui/MagneticButton';
import { 
  Compass, 
  Target, 
  Sparkles, 
  Rocket, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  GitCommit 
} from 'lucide-react';

const ProcessStepIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case 'Compass': return <Compass className={className} />;
    case 'Target': return <Target className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Rocket': return <Rocket className={className} />;
    case 'Activity': return <Activity className={className} />;
    default: return <GitCommit className={className} />;
  }
};

interface ProcessSectionProps {
  onOpenProjectModal: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenProjectModal }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <Activity className="w-3.5 h-3.5 text-[#FF1361]" />
            <span>TRANSPARENT WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">
            How We Work
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean">
            A structured 5-stage framework designed for predictability, velocity, and measurable results.
          </p>
        </motion.div>

        {/* Step Selector Orbital Track - Creative Stadium Pills */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 scrollbar-none touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {PROCESS_DATA.map((stepItem, index) => {
            const isActive = activeStep === index;
            return (
              <motion.button
                key={stepItem.step}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(index)}
                className={`flex-shrink-0 w-40 sm:w-auto p-4 rounded-full border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-md ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0099FF]/20 via-[#8B5CF6]/20 to-[#FF1361]/20 border-[#0099FF]/50 shadow-[0_0_25px_rgba(0,153,255,0.3)]'
                    : 'bg-[#0A0D18]/85 border-white/10 hover:border-white/25 hover:bg-[#111422]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStepLine"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0099FF] via-[#FF1361] to-[#FF2A85]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className={`text-[10px] sm:text-xs font-tech font-extrabold ${isActive ? 'text-[#38BDF8]' : 'text-slate-400'}`}>
                    STAGE {stepItem.step}
                  </span>
                  <ProcessStepIcon iconName={stepItem.icon} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-[#FF1361]' : 'text-slate-500'}`} />
                </div>
                <div className="text-xs sm:text-sm font-display font-bold text-white px-1 leading-tight truncate">
                  {stepItem.title}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Step Detailed Cockpit Card with Asymmetrical Curves & BorderBeam */}
        {(() => {
          const current = PROCESS_DATA[activeStep];
          return (
            <div className="relative rounded-[3rem] rounded-tl-lg bg-[#0A0D18]/95 border border-white/10 p-6 sm:p-8 md:p-12 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden">
              <BorderBeam size={160} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
                >
                  
                  <div className="lg:col-span-7 flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#0099FF]/20 to-[#FF1361]/20 border border-white/15 flex items-center justify-center text-[#38BDF8] shadow-[0_0_20px_rgba(0,153,255,0.25)] flex-shrink-0">
                        <ProcessStepIcon iconName={current.icon} className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className="text-[11px] sm:text-xs font-tech text-[#38BDF8] font-bold tracking-widest uppercase">
                          STAGE {current.step} OF 05
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white">
                          {current.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-tech text-[#FF2A85] uppercase tracking-wider mb-3 sm:mb-4 font-semibold">
                      {current.tagline}
                    </p>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 font-sans-clean leading-relaxed mb-6 sm:mb-8">
                      {current.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <MagneticButton
                        onClick={onOpenProjectModal}
                        className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] shadow-[0_0_25px_rgba(255,19,97,0.5)] hover:shadow-[0_0_35px_rgba(0,153,255,0.6)] transition-all cursor-pointer"
                      >
                        <span>Start with Step 01</span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                      
                      {activeStep < PROCESS_DATA.length - 1 && (
                        <button
                          onClick={() => setActiveStep(activeStep + 1)}
                          className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                        >
                          Next: Step 0{activeStep + 2} →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Deliverables Column in Sculpted Pod */}
                  <div className="lg:col-span-5 bg-[#060810]/90 rounded-[2.2rem] border border-white/10 p-5 sm:p-6 shadow-inner w-full">
                    <div className="text-xs font-tech text-[#38BDF8] font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF1361]" />
                      <span>Stage Deliverables &amp; Outcomes:</span>
                    </div>

                    <div className="space-y-3">
                      {current.deliverables.map((del, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#0099FF]/20 border border-[#0099FF]/40 flex items-center justify-center text-[10px] font-tech text-[#38BDF8] font-bold flex-shrink-0 mt-0.5 shadow-2xs">
                            {idx + 1}
                          </div>
                          <span className="leading-snug">{del}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
