import React from 'react';
import { TESTIMONIALS_DATA } from '../data/agencyData';
import { Marquee } from './ui/Marquee';
import { MessageSquare, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
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
            <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
            <span>PARTNER ENDORSEMENTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            Client Testimonials &amp; Trust
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans-clean">
            We build long-term relationships grounded in transparency, quality execution, and real results.
          </p>
        </motion.div>

        {/* 21st.dev Infinite Scrolling Marquee for Testimonials with Pause on Hover */}
        <div className="relative mask-marquee-h overflow-hidden py-4">
          <Marquee pauseOnHover={true} duration="40s" gap="1.5rem">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="w-80 sm:w-96 relative rounded-3xl bg-white border border-slate-200 hover:border-sky-400 p-7 flex flex-col justify-between transition-shadow duration-300 shadow-sm hover:shadow-xl group overflow-hidden"
              >

                <div>
                  {/* Service Tag & 5-Star Rating */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-tech font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                      {item.serviceReceived}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-base text-slate-700 font-sans-clean italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-display font-bold text-xs text-white shadow-xs">
                    {item.avatarText}
                  </div>
                  <div>
                    <div className="text-sm font-display font-bold text-slate-900">
                      {item.clientName}
                    </div>
                    <div className="text-xs font-tech text-slate-500 font-medium">
                      {item.role} • {item.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Commitment Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 text-xs font-tech text-slate-600 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>We value authenticity — testimonials are verified from real client engagements as partnerships launch.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
