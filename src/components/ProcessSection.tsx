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

interface ProcessSectionProps {
  onOpenProjectModal: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenProjectModal }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Target': return Target;
      case 'Sparkles': return Sparkles;
      case 'Rocket': return Rocket;
      case 'Activity': return Activity;
      default: return GitCommit;
    }
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>TRANSPARENT WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            How We Work
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans-clean">
            A structured 5-stage framework designed for predictability, velocity, and measurable results.
          </p>
        </motion.div>

        {/* Step Selector Tab Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {PROCESS_DATA.map((stepItem, index) => {
            const Icon = getStepIcon(stepItem.icon);
            const isActive = activeStep === index;
            return (
              <motion.button
                key={stepItem.step}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-xs ${
                  isActive
                    ? 'bg-white border-sky-400 shadow-[0_6px_20px_rgba(2,132,199,0.2)]'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStepLine"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-600"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-tech font-extrabold ${isActive ? 'text-sky-600' : 'text-slate-400'}`}>
                    STEP {stepItem.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                </div>
                <div className="text-sm font-display font-bold text-slate-900">
                  {stepItem.title}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Step Detailed Card with AnimatePresence & BorderBeam */}
        {(() => {
          const current = PROCESS_DATA[activeStep];
          const CurrentIcon = getStepIcon(current.icon);
          return (
            <div className="relative rounded-3xl bg-white/95 border border-slate-200 p-8 sm:p-12 backdrop-blur-xl shadow-lg overflow-hidden">
              <BorderBeam size={160} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  
                  <div className="lg:col-span-7 flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-13 h-13 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                        <CurrentIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-tech text-sky-600 font-bold tracking-widest uppercase">
                          STAGE {current.step} OF 05
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                          {current.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm font-tech text-slate-500 uppercase tracking-wider mb-4 font-semibold">
                      {current.tagline}
                    </p>

                    <p className="text-base sm:text-lg text-slate-600 font-sans-clean leading-relaxed mb-8">
                      {current.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <MagneticButton
                        onClick={onOpenProjectModal}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)] transition-all cursor-pointer"
                      >
                        <span>Start with Step 01</span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                      
                      {activeStep < PROCESS_DATA.length - 1 && (
                        <button
                          onClick={() => setActiveStep(activeStep + 1)}
                          className="px-5 py-3.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          Next: Step 0{activeStep + 2} →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Deliverables Column */}
                  <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-inner">
                    <div className="text-xs font-tech text-sky-700 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600" />
                      <span>Stage Deliverables &amp; Outcomes:</span>
                    </div>

                    <div className="space-y-3">
                      {current.deliverables.map((del, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                        >
                          <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-tech text-sky-600 font-bold flex-shrink-0 mt-0.5 shadow-2xs">
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
