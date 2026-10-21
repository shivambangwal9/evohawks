import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MessageCircle, X, ArrowRight } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getQuickChatUrl = (presetText: string) => {
    return `https://wa.me/${AGENCY_CONFIG.contact.whatsappCleanNumber}?text=${encodeURIComponent(presetText)}`;
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pb-safe">
      
      {/* Quick Chat Popover with AnimatePresence & BorderBeam */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-xs sm:w-80 rounded-2xl bg-white/95 border border-emerald-200 p-4 shadow-[0_15px_35px_rgba(16,185,129,0.15)] backdrop-blur-xl relative overflow-hidden"
          >
            <BorderBeam size={90} duration={8} colorFrom="#10B981" colorTo="#0284C7" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-display font-bold text-slate-900">
                  Evo Hawks Direct WhatsApp
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!AGENCY_CONFIG.contact.isPhoneConfigured && (
              <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-sans-clean leading-relaxed">
                <strong className="font-semibold block mb-0.5">Contact Line Notice</strong>
                Official WhatsApp line assignment is in progress. For priority booking, email us at{' '}
                <a href={`mailto:${AGENCY_CONFIG.contact.email}`} className="text-sky-700 font-bold underline">
                  {AGENCY_CONFIG.contact.email}
                </a>.
              </div>
            )}

            <p className="text-xs text-slate-600 font-sans-clean mb-3 leading-relaxed">
              Need an instant brief or consultation for your website, content, or ad funnel?
            </p>

            <div className="space-y-2">
              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to discuss building a website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors border border-slate-200 hover:border-emerald-300 group"
              >
                <span>🌐 Web Development Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to talk about Video & Reels editing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors border border-slate-200 hover:border-emerald-300 group"
              >
                <span>🎬 Video &amp; Reels Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to discuss full-stack digital marketing & SEO.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors border border-slate-200 hover:border-emerald-300 group"
              >
                <span>📈 Digital Marketing &amp; Ads</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button with radar pulse */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#07090E] shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-colors cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 animate-ping" />
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#07090E]" />
        ) : (
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#07090E] fill-current" />
        )}
      </motion.button>
    </div>
  );
};
