import React from 'react';
import type { PortfolioItem } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MagneticButton } from './ui/MagneticButton';
import { X, Check, Sparkles, ArrowRight } from 'lucide-react';

interface PortfolioModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onInquire: (serviceName: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose, onInquire }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl max-h-[88vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <BorderBeam size={160} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />

            {/* Modal Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto">
              
              {/* Image Header with Badge */}
              <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden bg-slate-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-tech font-bold bg-white/95 text-sky-700 shadow-sm">
                    {project.badge}
                  </span>
                  <span className="text-xs font-tech text-white bg-slate-900/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                    {project.industry}
                  </span>
                </div>
              </div>

              {/* Project Details Body */}
              <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
                <div>
                  <div className="text-xs font-tech text-sky-600 font-bold uppercase tracking-wider mb-1">
                    Category: {project.category}
                  </div>
                  <h3 className="text-xl sm:text-3xl font-display font-extrabold text-slate-900">
                    {project.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-base text-slate-600 font-sans-clean leading-relaxed">
                  {project.description}
                </p>

                {/* Services Used Tags */}
                <div>
                  <div className="text-xs font-tech text-slate-500 font-semibold uppercase tracking-wider mb-2">
                    Services &amp; Technologies:
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.services.map((srv, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Deliverables */}
                <div>
                  <div className="text-xs font-tech text-slate-500 font-semibold uppercase tracking-wider mb-3">
                    Key Scope &amp; Deliverables:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Concept Note Notice */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-3 text-xs text-slate-600">
                  <Sparkles className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Concept Project Notice:</strong> This project showcases the visual design, technical architecture, and creative execution standards delivered by Evo Hawks.
                  </span>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <MagneticButton
                    onClick={() => {
                      onClose();
                      onInquire(project.category);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)] transition-all cursor-pointer"
                  >
                    <span>Request a Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>

                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-center"
                  >
                    Close Preview
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
