import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { MessageCircle, X, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = (presetText: string, serviceCategory: string) => {
    trackEvent('whatsapp_click', {
      trigger_source: 'floating_widget',
      service: serviceCategory,
      text_intent: presetText
    });
  };

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
            className="mb-3 w-[calc(100vw-2rem)] max-w-xs sm:w-80 rounded-[2.25rem] rounded-br-sm bg-[#0A0D18]/95 border border-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden text-white"
          >
            <BorderBeam size={100} duration={8} colorFrom="#0099FF" colorTo="#FF1361" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10B981]" />
                <span className="text-xs font-display font-bold text-white">
                  Evo Hawks Direct WhatsApp
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!AGENCY_CONFIG.contact.isPhoneConfigured && (
              <div className="mb-3 p-2.5 rounded-xl bg-[#FF1361]/10 border border-[#FF1361]/30 text-[11px] text-rose-200 font-sans-clean leading-relaxed">
                <strong className="font-semibold block mb-0.5 text-white">Contact Line Notice</strong>
                Official WhatsApp line assignment is in progress. For priority booking, email us at{' '}
                <a href={`mailto:${AGENCY_CONFIG.contact.email}`} className="text-[#38BDF8] font-bold underline">
                  {AGENCY_CONFIG.contact.email}
                </a>.
              </div>
            )}

            <p className="text-xs text-slate-400 font-sans-clean mb-3 leading-relaxed">
              Need an instant brief or consultation for your website, content, or ad funnel?
            </p>

            <div className="space-y-2">
              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to discuss building a website.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("Website Inquiry", "Website Development")}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#060810] hover:bg-[#0099FF]/15 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-white/5 hover:border-[#0099FF]/30 group"
              >
                <span>🌐 Web Development Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0099FF] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to talk about Video & Reels editing.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("Video Inquiry", "Video Production")}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#060810] hover:bg-[#FF1361]/15 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-white/5 hover:border-[#FF1361]/30 group"
              >
                <span>🎬 Video &amp; Reels Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF2A85] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getQuickChatUrl("Hi Evo Hawks! I'd like to discuss full-stack digital marketing & SEO.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick("Marketing Inquiry", "Digital Marketing & SEO")}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#060810] hover:bg-[#0099FF]/15 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-white/5 hover:border-[#0099FF]/30 group"
              >
                <span>📈 Digital Marketing &amp; Ads</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0099FF] group-hover:translate-x-1 transition-transform" />
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
