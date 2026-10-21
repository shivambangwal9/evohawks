import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  preselectedService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedService = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 pb-20 overflow-hidden bg-[#050508] text-white min-h-screen"
    >
      {/* Contact Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-6 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>DIRECT STRATEGY &amp; ESTIMATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-6">
            Let&apos;s Ignite Your Next <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Digital Leap</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-8">
            Tell us about your project, timeline, or current bottlenecks. Our lead strategists will analyze your requirements and deliver an actionable roadmap.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A0D18] border border-emerald-500/30 text-xs font-tech text-emerald-400 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>Currently Accepting Sprints • Typical Response Within 24 Business Hours</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <ContactSection preselectedService={preselectedService} />

      {/* Trust & Guarantee Banner */}
      <section className="relative py-16 bg-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs font-tech text-slate-300">
            <div className="p-5 rounded-[2.25rem] rounded-tl-sm bg-[#060810] border border-white/10 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.4)] font-medium">
              <ShieldCheck className="w-5 h-5 text-[#0099FF] flex-shrink-0" />
              <span>Project Confidentiality &amp; IP Protection</span>
            </div>
            <div className="p-5 rounded-[2.25rem] rounded-tr-sm bg-[#060810] border border-white/10 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.4)] font-medium">
              <Clock className="w-5 h-5 text-[#FF1361] flex-shrink-0" />
              <span>Structured Proposal &amp; Scope Review</span>
            </div>
            <div className="p-5 rounded-[2.25rem] rounded-bl-sm bg-[#060810] border border-white/10 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.4)] font-medium">
              <MessageCircle className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
              <span>Direct WhatsApp &amp; Email Consultation</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
