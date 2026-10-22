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

interface ProcessPageProps {
  onOpenProjectModal: (service?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenProjectModal }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

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
      className="pt-28 pb-20 overflow-hidden min-h-screen"
    >
      {/* Process Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-6 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <Activity className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>TRANSPARENT 5-STAGE SPRINT CADENCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-6">
            Predictable Velocity. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Zero Guesswork.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            A battle-tested 5-stage sprint methodology designed to eliminate delays, align stakeholders, and launch with precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenProjectModal("Stage 01 Discovery")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
            >
              <span>Kick Off Stage 01</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Interactive 5-Stage Flight Simulator Hub */}
      <section className="relative py-20 bg-transparent border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              The 5-Stage Flight Path
            </h2>
            <p className="text-sm text-slate-400 font-sans-clean">
              Click any stage below to inspect sprint milestones, review cadences, and tangible outcomes.
            </p>
          </div>

          {/* Tab Selector - Swipeable on mobile, grid on sm+ */}
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 scrollbar-none touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {PROCESS_DATA.map((stepItem, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => setActiveStep(index)}
                  className={`flex-shrink-0 w-36 sm:w-auto p-4 rounded-[1.75rem] border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    isActive
                      ? 'bg-[#0E1224] border-[#0099FF] shadow-[0_0_25px_rgba(0,153,255,0.3)]'
                      : 'bg-[#060810] border-white/10 hover:border-white/25 hover:bg-[#0A0D18]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProcessTabLine"
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0099FF] to-[#FF1361]"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className={`text-[11px] sm:text-xs font-tech font-extrabold ${isActive ? 'text-[#38BDF8]' : 'text-slate-500'}`}>
                      STAGE 0{stepItem.step}
                    </span>
                    <ProcessStepIcon iconName={stepItem.icon} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-[#38BDF8]' : 'text-slate-500'}`} />
                  </div>
                  <div className={`text-xs sm:text-sm font-display font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {stepItem.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Card */}
          {(() => {
            const current = PROCESS_DATA[activeStep];
            return (
              <div className="relative rounded-[3rem] rounded-tl-lg bg-gradient-to-br from-[#0A0D18] via-[#060810] to-[#0A0D18] border border-white/10 p-6 sm:p-10 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
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
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0099FF]/15 border border-[#0099FF]/30 flex items-center justify-center text-[#38BDF8] shadow-[0_0_20px_rgba(0,153,255,0.2)] flex-shrink-0">
                          <ProcessStepIcon iconName={current.icon} className="w-5 h-5 sm:w-7 sm:h-7" />
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
                          onClick={() => onOpenProjectModal(`Stage 0${current.step}: ${current.title}`)}
                          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
                        >
                          <span>Start This Stage</span>
                          <ArrowRight className="w-4 h-4" />
                        </MagneticButton>
                        
                        {activeStep < PROCESS_DATA.length - 1 && (
                          <button
                            onClick={() => setActiveStep(activeStep + 1)}
                            className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-[#060810] hover:bg-[#12162A] border border-white/10 transition-colors cursor-pointer"
                          >
                            Next: Stage 0{activeStep + 2} &rarr;
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Deliverables Column */}
                    <div className="lg:col-span-5 bg-[#060810] rounded-[2.5rem] border border-white/10 p-5 sm:p-7 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] w-full">
                      <div className="text-xs font-tech text-[#38BDF8] font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0099FF]" />
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
                            <div className="w-5 h-5 rounded-full bg-[#FF1361]/15 border border-[#FF1361]/30 flex items-center justify-center text-[10px] font-tech text-[#FF2A85] font-bold flex-shrink-0 mt-0.5">
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
      <section className="relative py-20 bg-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
              <Calendar className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>COMMUNICATION &amp; SPRINT RHYTHM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
              Weekly Client Cadence
            </h2>
            <p className="text-sm text-slate-400 font-sans-clean">
              You will never be left wondering where your project stands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weeklyCadence.map((cadence, idx) => {
              const Icon = cadence.icon;
              const cornerRadius = idx === 0 ? 'rounded-[2.75rem] rounded-tl-sm' : idx === 1 ? 'rounded-[2.75rem] rounded-tr-sm' : 'rounded-[2.75rem] rounded-bl-sm';
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 ${cornerRadius} bg-[#060810] border border-white/10 hover:border-[#0099FF]/50 transition-all flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-tech font-bold text-[#38BDF8] bg-[#0A0D18] px-3 py-1 rounded-full border border-[#0099FF]/30">
                        {cadence.day}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] font-tech text-slate-400 font-medium">
                        <Icon className="w-3.5 h-3.5 text-[#0099FF]" />
                        <span>{cadence.time}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-2">
                      {cadence.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-sans-clean leading-relaxed">
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
