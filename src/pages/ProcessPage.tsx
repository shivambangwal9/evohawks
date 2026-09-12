import React, { useState } from 'react';
import { PROCESS_DATA } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  Compass, 
  Target, 
  Sparkles, 
  Rocket, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  GitCommit, 
  Calendar, 
  MessageSquare 
} from 'lucide-react';

interface ProcessPageProps {
  onOpenProjectModal: (service?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenProjectModal }) => {
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

  const weeklyCadence = [
    {
      day: "Monday",
      time: "09:00 AM",
      title: "Sprint Alignment & Scope Lock",
      desc: "We confirm milestone deliverables, technical requirements, and asset dependencies for the week.",
      icon: Target
    },
    {
      day: "Wednesday",
      time: "02:00 PM",
      title: "Interactive Staging & Draft Cut Review",
      desc: "Live URL preview or video revision draft shared directly on your private WhatsApp/Slack channel.",
      icon: MessageSquare
    },
    {
      day: "Friday",
      time: "05:00 PM",
      title: "QA Validation & Production Deployment",
      desc: "Full automated tests, speed check, asset package handover, and sign-off on completed milestones.",
      icon: Rocket
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
      {/* Process Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent bg-grid-cyber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>TRANSPARENT 5-STAGE SPRINT CADENCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Predictable Velocity. <br />
            <span className="text-gradient-cyan">Zero Guesswork.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            A battle-tested 5-stage sprint methodology designed to eliminate delays, align stakeholders, and launch with precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenProjectModal("Stage 01 Discovery")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] transition-all cursor-pointer"
            >
              <span>Kick Off Stage 01</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Interactive 5-Stage Flight Simulator Hub */}
      <section className="relative py-20 bg-transparent border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              The 5-Stage Flight Path
            </h2>
            <p className="text-sm text-slate-600">
              Click any stage below to inspect sprint milestones, review cadences, and tangible outcomes.
            </p>
          </div>

          {/* Tab Selector - Swipeable on mobile, grid on sm+ */}
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 scrollbar-none touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {PROCESS_DATA.map((stepItem, index) => {
              const Icon = getStepIcon(stepItem.icon);
              const isActive = activeStep === index;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => setActiveStep(index)}
                  className={`flex-shrink-0 w-36 sm:w-auto p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-xs ${
                    isActive
                      ? 'bg-white border-sky-400 shadow-[0_6px_20px_rgba(2,132,199,0.2)]'
                      : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProcessTabLine"
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-600"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className={`text-[11px] sm:text-xs font-tech font-extrabold ${isActive ? 'text-sky-600' : 'text-slate-400'}`}>
                      STAGE 0{stepItem.step}
                    </span>
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-xs sm:text-sm font-display font-bold text-slate-900 leading-tight">
                    {stepItem.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Card */}
          {(() => {
            const current = PROCESS_DATA[activeStep];
            const CurrentIcon = getStepIcon(current.icon);
            return (
              <div className="relative rounded-2xl sm:rounded-3xl bg-white/95 border border-slate-200 p-5 sm:p-8 md:p-12 backdrop-blur-xl shadow-lg overflow-hidden">
                <BorderBeam size={160} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />
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
                        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs flex-shrink-0">
                          <CurrentIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <div>
                          <span className="text-[11px] sm:text-xs font-tech text-sky-600 font-bold tracking-widest uppercase">
                            STAGE {current.step} OF 05
                          </span>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-900">
                            {current.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-tech text-slate-500 uppercase tracking-wider mb-3 sm:mb-4 font-semibold">
                        {current.tagline}
                      </p>

                      <p className="text-sm sm:text-base md:text-lg text-slate-600 font-sans-clean leading-relaxed mb-6 sm:mb-8">
                        {current.description}
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <MagneticButton
                          onClick={() => onOpenProjectModal(`Stage 0${current.step}: ${current.title}`)}
                          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)] transition-all cursor-pointer"
                        >
                          <span>Start This Stage</span>
                          <ArrowRight className="w-4 h-4" />
                        </MagneticButton>
                        
                        {activeStep < PROCESS_DATA.length - 1 && (
                          <button
                            onClick={() => setActiveStep(activeStep + 1)}
                            className="w-full sm:w-auto text-center px-5 py-3.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            Next: Stage 0{activeStep + 2} &rarr;
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Deliverables Column */}
                    <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-inner w-full">
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

      {/* Weekly Sprint Cadence Breakdown */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>COMMUNICATION &amp; SPRINT RHYTHM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-3">
              Weekly Client Cadence
            </h2>
            <p className="text-sm text-slate-600">
              You will never be left wondering where your project stands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weeklyCadence.map((cadence, idx) => {
              const Icon = cadence.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/90 border border-slate-200 hover:border-sky-400 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-tech font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                        {cadence.day}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-tech text-slate-500 font-medium">
                        <Icon className="w-3.5 h-3.5 text-sky-600" />
                        <span>{cadence.time}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                      {cadence.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-sans-clean leading-relaxed">
                      {cadence.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </motion.div>
  );
};
