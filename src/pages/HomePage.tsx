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
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenProjectModal, onNavigate }) => {
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
      <section className="relative py-20 bg-transparent border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>EXPLORE THE AGENCY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900">
              Discover How We Elevate Your Brand
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Services Page Link */}
            <div 
              onClick={() => onNavigate('services')}
              className="group cursor-pointer p-6 rounded-3xl bg-white/85 border border-slate-200 hover:border-sky-400 transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={10} colorFrom="#0284C7" colorTo="#38BDF8" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  All 6 Core Services &rarr;
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                  Explore full capabilities: Web Development, Video Cuts, SEO, Social, Ads, and our interactive Scope Estimator.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-tech text-sky-600 font-semibold flex items-center gap-1">
                <span>Open Services Hub</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Why Us Page Link */}
            <div 
              onClick={() => onNavigate('why-us')}
              className="group cursor-pointer p-6 rounded-3xl bg-white/85 border border-slate-200 hover:border-violet-400 transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={12} colorFrom="#7C3AED" colorTo="#0284C7" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                  Why Us &amp; Comparison &rarr;
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                  Compare Evo Hawks against traditional agencies and freelancers with our interactive side-by-side benchmark table.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-tech text-violet-600 font-semibold flex items-center gap-1">
                <span>View Comparison Table</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Process Page Link */}
            <div 
              onClick={() => onNavigate('process')}
              className="group cursor-pointer p-6 rounded-3xl bg-white/85 border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <BorderBeam size={100} duration={14} colorFrom="#2563EB" colorTo="#059669" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  5-Stage Flight Simulator &rarr;
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans-clean">
                  Test our structured sprint framework from Discovery to Launch with interactive milestone checklists.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-tech text-blue-600 font-semibold flex items-center gap-1">
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
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-200 shadow-xl relative overflow-hidden">
            <BorderBeam size={200} duration={8} colorFrom="#0284C7" colorTo="#7C3AED" />
            
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 mb-4">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 font-sans-clean leading-relaxed">
              Partner with Evo Hawks for pixel-perfect code, cinematic visual storytelling, and high-ROAS marketing.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={() => onOpenProjectModal()}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_8px_25px_rgba(2,132,199,0.4)] transition-all cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer shadow-xs"
              >
                Contact Strategists &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
