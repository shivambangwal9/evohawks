import React, { useEffect } from 'react';
import type { PortfolioItem } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MagneticButton } from './ui/MagneticButton';
import { trackEvent } from '../utils/analytics';
import { 
  X, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Target, 
  Lightbulb, 
  Cpu, 
  Layers 
} from 'lucide-react';

interface PortfolioModalProps {
  project: PortfolioItem | null;
  isOpen?: boolean;
  onClose: () => void;
  onInquire?: (serviceName: string) => void;
  onSelectService?: (serviceName: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ 
  project, 
  onClose, 
  onInquire, 
  onSelectService 
}) => {
  // Track analytics event when case study modal opens
  useEffect(() => {
    if (project) {
      trackEvent('case_study_opened', {
        project_id: project.id,
        project_title: project.title,
        category: project.category
      });
    }
  }, [project]);

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#0B0D16] border border-white/15 rounded-[2.5rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <BorderBeam size={160} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

            {/* Modal Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#05070C]/90 border border-white/15 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-[#0099FF]"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto">
              
              {/* Image Header with Badges */}
              <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden bg-[#070912]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D16] via-[#0B0D16]/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-tech font-bold bg-[#FF1361]/20 text-[#FF2A85] border border-[#FF1361]/40 shadow-md backdrop-blur-md">
                      {project.badge}
                    </span>
                    <span className="text-xs font-tech text-[#38BDF8] bg-[#0099FF]/20 px-3 py-1 rounded-full backdrop-blur-md border border-[#0099FF]/30">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-tech text-slate-300 bg-[#05070C]/70 px-3 py-1 rounded-full border border-white/10">
                    {project.industry}
                  </span>
                </div>
              </div>

              {/* Project Case Study Body */}
              <div className="p-5 sm:p-8 space-y-6">
                <div>
                  <div className="text-xs font-tech text-[#38BDF8] font-bold uppercase tracking-wider mb-1">
                    PROJECT ARCHITECTURE BRIEF
                  </div>
                  <h3 id="case-study-title" className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-sans-clean leading-relaxed">
                  {project.description || project.overview}
                </p>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-[#FF1361]/30">
                    <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#FF2A85] uppercase tracking-wider mb-2">
                      <Target className="w-4 h-4 text-[#FF1361]" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs text-rose-200 font-sans-clean leading-relaxed">
                      {project.challenge || "Balancing high-fidelity visual aesthetics with seamless cross-device performance and fast loading speeds."}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-950/20 border border-[#0099FF]/30">
                    <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#38BDF8] uppercase tracking-wider mb-2">
                      <Lightbulb className="w-4 h-4 text-[#0099FF]" />
                      <span>Evo Hawks Solution</span>
                    </div>
                    <p className="text-xs text-sky-200 font-sans-clean leading-relaxed">
                      {project.solution || project.strategy || "Engineered modular component architecture and high-retention creative formats tailored specifically for target audiences."}
                    </p>
                  </div>
                </div>

                {/* Technologies Stack */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-tech text-slate-400 font-semibold uppercase tracking-wider mb-2.5">
                      <Cpu className="w-3.5 h-3.5 text-[#0099FF]" />
                      <span>Engineering &amp; Creative Stack:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 border border-white/10 text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Deliverables */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-tech text-slate-400 font-semibold uppercase tracking-wider mb-3">
                    <Layers className="w-3.5 h-3.5 text-[#FF1361]" />
                    <span>Deliverables &amp; Assets Handed Over:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <div className="w-4 h-4 rounded-full bg-[#0099FF]/20 flex items-center justify-center text-[#38BDF8] shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Concept Note Notice */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#070912] border border-white/10 flex items-start gap-3 text-xs text-slate-400">
                  <Sparkles className="w-4 h-4 text-[#FF1361] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-white">Concept Project Disclosure:</strong> This project showcases genuine architectural standards and creative deliverables developed by Evo Hawks. No client figures or performance metrics are fabricated.
                  </span>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <MagneticButton
                    onClick={() => {
                      onClose();
                      (onInquire || onSelectService || (() => {}))(project.title);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] shadow-[0_0_25px_rgba(255,19,97,0.5)] hover:shadow-[0_0_35px_rgba(0,153,255,0.6)] transition-all cursor-pointer"
                  >
                    <span>Request Similar Scope Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>

                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-full text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer text-center"
                  >
                    Close Case Study
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
