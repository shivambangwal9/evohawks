import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';
import type { PageId } from '../hooks/usePageRouter';

export const RefundPolicyPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-tech text-sky-600 hover:text-sky-700 font-bold mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>BILLING POLICIES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="text-xs text-slate-500 font-sans-clean mt-1">
              Effective Date: October 2026
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 font-sans-clean leading-relaxed">
            <section>
              <h2 className="text-base font-display font-bold text-slate-900 mb-2">
                1. Professional Services Model
              </h2>
              <p>
                Evo Hawks provides custom creative production, software engineering, and digital marketing services. Because all work involves dedicated senior strategist, developer, and designer time allocated exclusively to your project, the following policies govern cancellations and refunds.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-slate-900 mb-2">
                2. One-Time Project Sprints &amp; Deposits
              </h2>
              <p className="mb-2">
                Standard one-time projects require a 50% mobilization deposit upon Scope of Work approval prior to sprint commencement:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                <li><strong>Cancellation prior to sprint kickoff:</strong> If a project is cancelled in writing prior to any production, wireframing, or creative drafting taking place, the deposit is refunded minus a 10% administrative processing fee.</li>
                <li><strong>Cancellation during active sprint:</strong> Once discovery, design wireframes, code engineering, or video shooting has commenced, the initial mobilization deposit is non-refundable as it compensates for dedicated production hours already expended.</li>
                <li><strong>Milestone completion:</strong> If a project is terminated mid-sprint, work completed up to that date will be handed over, and billing will be calculated pro-rata based on approved milestones.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-slate-900 mb-2">
                3. Monthly Recurring Retainers
              </h2>
              <p>
                Ongoing retainers (Social Media Management, SEO, Meta Ads Management, Maintenance) are billed at the beginning of each monthly cycle. Clients may cancel retainers with 14 days written notice prior to the start of the next billing cycle. Partial month refunds are not issued once a monthly sprint cycle is underway.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-slate-900 mb-2">
                4. Third-Party Costs &amp; Media Spend
              </h2>
              <p>
                Advertising budgets paid directly to Meta or Google Ads, domain name purchases, third-party software licenses, and creator collaboration fees are paid directly to external vendors and cannot be refunded by Evo Hawks.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-slate-900 mb-2">
                5. Dispute Resolution
              </h2>
              <p>
                If you are dissatisfied with any milestone deliverable, we encourage open discussion during your 2 included structured revision rounds. If concerns cannot be resolved through revision passes, contact leadership directly at{' '}
                <a href={`mailto:${AGENCY_CONFIG.contact.email}`} className="text-sky-600 font-semibold underline">
                  {AGENCY_CONFIG.contact.email}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
