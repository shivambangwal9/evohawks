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
      className="pt-28 pb-20 overflow-hidden"
    >
      {/* Contact Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent bg-grid-cyber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>DIRECT STRATEGY &amp; ESTIMATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Let's Ignite Your Next <br />
            <span className="text-gradient-cyan">Digital Leap</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-8">
            Tell us about your project, timeline, or current bottlenecks. Our lead strategists will analyze your requirements and deliver an actionable roadmap.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-tech text-emerald-700 font-semibold shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Currently Accepting Sprints • Average 2-Hour Response Time</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <ContactSection preselectedService={preselectedService} />

      {/* Trust & Guarantee Banner */}
      <section className="relative py-16 bg-transparent border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs font-tech text-slate-600">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-center gap-3 shadow-xs font-medium">
              <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0" />
              <span>Strict NDA &amp; Confidentiality Guarantee</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-center gap-3 shadow-xs font-medium">
              <Clock className="w-5 h-5 text-violet-600 flex-shrink-0" />
              <span>48-Hour Proposal Turnaround</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-center gap-3 shadow-xs font-medium">
              <MessageCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Direct Lead WhatsApp Access</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
