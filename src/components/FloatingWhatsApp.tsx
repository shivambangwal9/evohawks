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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Chat Popover with AnimatePresence & BorderBeam */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 rounded-2xl bg-[#0D111A] border border-emerald-500/30 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden"
          >
            <BorderBeam size={90} duration={8} colorFrom="#10B981" colorTo="#00F0FF" />

            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-display font-bold text-white">
                  Evo Hawks Direct WhatsApp
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-300 font-sans-clean mb-3 leading-relaxed">
              Need an instant quote or quick consultation for your website, content, or ads?
            </p>

            <div className="space-y-2">
              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to discuss building a website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 text-xs font-semibold text-gray-200 hover:text-white transition-colors border border-white/[0.04] group"
              >
                <span>🌐 Web Development Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to talk about Video & Reels editing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 text-xs font-semibold text-gray-200 hover:text-white transition-colors border border-white/[0.04] group"
              >
                <span>🎬 Video &amp; Reels Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to discuss full-stack digital marketing & SEO.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/20 text-xs font-semibold text-gray-200 hover:text-white transition-colors border border-white/[0.04] group"
              >
                <span>📈 Digital Marketing &amp; Ads</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button with radar pulse */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#07090E] shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-colors cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-300 animate-ping" />
        {isOpen ? (
          <X className="w-6 h-6 text-[#07090E]" />
        ) : (
          <MessageCircle className="w-7 h-7 text-[#07090E] fill-current" />
        )}
      </motion.button>
    </div>
  );
};
