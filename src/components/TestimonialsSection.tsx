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
    <section className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF1361]" />
            <span>DELIVERY &amp; TRUST STANDARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">
            What You Receive as a Partner
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean leading-relaxed">
            We hold ourselves to strict standards of transparency, technical quality, and intellectual property ownership on every engagement.
          </p>
        </motion.div>

        {/* 4 Creative Sculpted Delivery Pods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITY_STANDARDS.map((item, idx) => {
            const Icon = getIcon(item.icon);
            const isRose = idx % 2 === 1;
            const curves = [
              'rounded-[2.5rem] rounded-tl-sm',
              'rounded-[2.5rem] rounded-tr-sm',
              'rounded-[2.5rem] rounded-bl-sm',
              'rounded-[2.5rem] rounded-br-sm'
            ];
            const curve = curves[idx % 4];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <TiltCard tiltDegree={8} glareColor={isRose ? '#FF1361' : '#0099FF'} className="h-full">
                  <div className={`${curve} bg-[#0A0D18]/90 border border-white/10 hover:border-[#0099FF]/50 p-6 sm:p-7 flex flex-col justify-between h-full shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_50px_rgba(0,153,255,0.2)] transition-all relative overflow-hidden group`}>
                    <BorderBeam size={100} duration={10 + idx * 2} colorFrom={isRose ? '#FF1361' : '#0099FF'} colorTo={isRose ? '#0099FF' : '#FF1361'} />
                    
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0099FF]/20 to-[#FF1361]/20 border border-white/15 text-[#38BDF8] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                        <Icon className={`w-6 h-6 ${isRose ? 'text-[#FF1361]' : 'text-[#0099FF]'}`} />
                      </div>

                      <div className={`text-[11px] font-tech font-bold uppercase tracking-wider ${isRose ? 'text-[#FF2A85]' : 'text-[#38BDF8]'} mb-1`}>
                        {item.tagline}
                      </div>

                      <h3 className="text-lg font-display font-bold text-white mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 font-sans-clean leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-tech text-slate-400 font-semibold">
                      <Lock className="w-3 h-3 text-[#FF1361]" />
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
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            <ShieldCheck className="w-4 h-4 text-[#0099FF] shrink-0" />
            <span>
              <strong className="text-white">Authentic Endorsements Policy:</strong> Client testimonials and case study metrics are published strictly upon verified client authorization following milestone handover.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
