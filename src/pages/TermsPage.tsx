import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { BorderBeam } from '../components/ui/BorderBeam';
import type { PageId } from '../hooks/usePageRouter';

export const TermsPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#050508] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-tech text-[#38BDF8] hover:text-white font-bold mb-6 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="p-8 sm:p-12 rounded-[3rem] rounded-tr-sm bg-[#0A0D18]/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-8">
          <BorderBeam size={160} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>COMMERCIAL TERMS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] to-[#FF1361]">Service</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans-clean mt-1">
              Effective Date: October 2026
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-300 font-sans-clean leading-relaxed">
            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                1. Scope of Work &amp; Engagement
              </h2>
              <p>
                All client engagements with Evo Hawks operate under an agreed Scope of Work (SOW) or proposal outlining specific deliverables, milestone schedules, revision rounds, and pricing terms. Any modifications or additions requested outside the agreed SOW are subject to an itemized change request quotation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                2. Intellectual Property &amp; Code Ownership
              </h2>
              <p>
                Upon final invoice payment and milestone sign-off, full commercial ownership rights, Git repository source code, design master files, and exported video assets transfer entirely to the client. Evo Hawks retains the right to display completed work in agency portfolios and case studies unless a formal Non-Disclosure Agreement (NDA) specifies otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                3. Revisions &amp; Approval Process
              </h2>
              <p>
                Standard sprint packages include 2 structured revision rounds during staging review. Clients agree to provide consolidated feedback within 5 business days of staging delivery to maintain sprint momentum. Revisions beyond the included passes are billed at standard developer/designer hourly rates.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                4. Advertising Spend &amp; Third-Party Services
              </h2>
              <p>
                For paid advertising services (Meta Ads, Google Ads), media budget spend is paid directly by the client to the advertising platforms via the client&apos;s own billing profile. Evo Hawks fees cover campaign strategy, creative production, and optimization only. Domain registrations, hosting infrastructure, and specialized third-party software subscriptions are client responsibilities.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                5. Performance Warranties &amp; Disclaimers
              </h2>
              <p>
                While we apply rigorous industry best practices, sub-second code optimization, and data-backed creative testing, Evo Hawks does not warrant or guarantee specific financial results, revenue numbers, sales figures, or search engine rankings (#1 on Google), as commercial outcomes depend on product-market fit, competitor movements, and external platform algorithm policies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                6. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, with jurisdiction in Dehradun, Uttarakhand, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
