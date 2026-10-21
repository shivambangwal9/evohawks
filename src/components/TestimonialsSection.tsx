import React from 'react';
import { QUALITY_STANDARDS } from '../data/agencyData';
import { ShieldCheck, Users, FileText, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { TiltCard } from './ui/TiltCard';

export const TestimonialsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'ShieldCheck': return ShieldCheck;
      case 'FileText': return FileText;
      case 'CheckCircle2': return CheckCircle2;
      default: return Sparkles;
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-slate-200/80">
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
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>DELIVERY &amp; TRUST STANDARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            What You Receive as a Partner
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans-clean leading-relaxed">
            We hold ourselves to strict standards of transparency, technical quality, and intellectual property ownership on every engagement.
          </p>
        </motion.div>

        {/* 4-Card Delivery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITY_STANDARDS.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <TiltCard tiltDegree={8} glareColor="#0284C7" className="h-full">
                  <div className="rounded-3xl bg-white border border-slate-200 hover:border-sky-300 p-6 sm:p-7 flex flex-col justify-between h-full shadow-xs hover:shadow-xl transition-all relative overflow-hidden group">
                    <BorderBeam size={100} duration={10 + idx * 2} colorFrom="#0284C7" colorTo="#7C3AED" />
                    
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="text-[11px] font-tech font-bold uppercase tracking-wider text-sky-700 mb-1">
                        {item.tagline}
                      </div>

                      <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-sans-clean leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-tech text-slate-500 font-semibold">
                      <Lock className="w-3 h-3 text-sky-600" />
                      <span>Guaranteed Standard</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Transparent Reviews Disclosure Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-tech text-slate-600 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              <strong>Authentic Endorsements Policy:</strong> Client testimonials and case study metrics are published strictly upon verified client authorization following milestone handover.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
