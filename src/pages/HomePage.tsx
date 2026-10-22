import React from 'react';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { SystemCrossSell } from '../components/SystemCrossSell';
import { PortfolioSection } from '../components/PortfolioSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { motion } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ArrowRight, Sparkles, Rocket, Zap } from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface HomePageProps {
  onOpenProjectModal: (service?: string) => void;
  onNavigate: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onOpenProjectModal, 
  onNavigate,
  onOpenBookingModal 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <Hero onOpenProjectModal={() => onOpenProjectModal()} />

      {/* Trust & Live Metrics */}
      <TrustSection />

      {/* Connected Digital Ecosystem Synergy */}
      <SystemCrossSell onOpenProjectModal={() => onOpenProjectModal()} />

      {/* Featured Portfolio Benchmark Showcase */}
      <PortfolioSection onSelectService={(srv) => onOpenProjectModal(srv)} />

      {/* Quick Navigation Cards to Explore Other Dedicated Pages */}
      <section className="relative py-20 bg-transparent border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A0D1A]/90 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
              <span className="tracking-wider">EXPLORE THE AGENCY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Discover How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Elevate Your Brand</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Services Page Link */}
            <div 
              onClick={() => onNavigate('services')}
              className="group cursor-pointer p-7 rounded-[2.75rem] rounded-tl-lg bg-[#0A0D18]/90 border border-white/10 hover:border-[#0099FF]/50 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,153,255,0.2)] relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={10} colorFrom="#0099FF" colorTo="#38BDF8" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0099FF]/10 text-[#38BDF8] border border-[#0099FF]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,153,255,0.2)]">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                  All 12 Core Services &rarr;
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                  Explore full capabilities: Web Development, Video Cuts, SEO, Social, Ads, and our interactive Scope Estimator.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-tech text-[#38BDF8] font-semibold flex items-center gap-1">
                <span>Open Services Hub</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Why Us Page Link */}
            <div 
              onClick={() => onNavigate('why-us')}
              className="group cursor-pointer p-7 rounded-[2.75rem] rounded-tr-lg bg-[#0A0D18]/90 border border-white/10 hover:border-[#FF1361]/50 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(255,19,97,0.2)] relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={12} colorFrom="#FF1361" colorTo="#0099FF" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF1361]/15 text-[#FF2A85] border border-[#FF1361]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,19,97,0.25)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#FF2A85] transition-colors">
                  Why Us &amp; Comparison &rarr;
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                  Compare Evo Hawks against traditional agencies and freelancers with our interactive side-by-side benchmark table.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-tech text-[#FF2A85] font-semibold flex items-center gap-1">
                <span>View Comparison Table</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Process Page Link */}
            <div 
              onClick={() => onNavigate('process')}
              className="group cursor-pointer p-7 rounded-[2.75rem] rounded-bl-lg bg-[#0A0D18]/90 border border-white/10 hover:border-[#0099FF]/50 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,153,255,0.2)] relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={14} colorFrom="#0099FF" colorTo="#FF1361" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  5-Stage Flight Simulator &rarr;
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">
                  Test our structured sprint framework from Discovery to Launch with interactive milestone checklists.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-tech text-[#38BDF8] font-semibold flex items-center gap-1">
                <span>Explore Workflow</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Marquee */}
      <TestimonialsSection />

      {/* Bottom CTA Banner */}
      <section className="relative py-20 bg-transparent overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 sm:p-14 rounded-[3rem] rounded-tl-lg rounded-br-lg bg-[#0A0D18]/95 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
            <BorderBeam size={200} duration={8} colorFrom="#0099FF" colorTo="#FF1361" />
            
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
              Ready to Accelerate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Your Growth?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-sans-clean leading-relaxed">
              Partner with Evo Hawks for clean code, cinematic visual storytelling, and conversion-focused marketing.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={() => onOpenProjectModal()}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              {onOpenBookingModal && (
                <button
                  onClick={onOpenBookingModal}
                  className="px-7 py-4 rounded-full text-sm font-semibold text-white bg-[#060810] hover:bg-[#0E1220] border border-white/15 hover:border-[#0099FF] transition-all cursor-pointer shadow-sm"
                >
                  Book Strategy Call &rarr;
                </button>
              )}

              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-4 rounded-full text-sm font-semibold text-slate-300 bg-[#060810] hover:text-white hover:bg-[#0E1220] border border-white/15 hover:border-[#FF1361] transition-all cursor-pointer shadow-sm"
              >
                Contact Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
