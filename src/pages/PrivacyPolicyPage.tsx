import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { BorderBeam } from '../components/ui/BorderBeam';
import { AGENCY_CONFIG } from '../data/agencyData';
import type { PageId } from '../hooks/usePageRouter';

export const PrivacyPolicyPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
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

        <div className="p-8 sm:p-12 rounded-[3rem] rounded-tl-sm bg-[#0A0D18]/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-8">
          <BorderBeam size={160} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>LEGAL TRANSPARENCY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] to-[#FF1361]">Policy</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans-clean mt-1">
              Last updated: October 2026 • Effective Date: October 2026
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-300 font-sans-clean leading-relaxed">
            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                1. Overview &amp; Commitment
              </h2>
              <p>
                Evo Hawks (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website https://evohawks.tech. We respect your personal data and privacy rights. This policy describes how we collect, handle, and protect your information when you visit our website, submit a project brief, or request a consultation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                2. Information We Collect
              </h2>
              <p className="mb-2">We collect only information necessary to deliver proposals, communicate regarding active projects, and respond to inquiries:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
                <li><strong className="text-white">Contact details:</strong> Full Name, Business Name, Work Email Address, and Phone/WhatsApp Number when you submit a project enquiry form or schedule a consultation.</li>
                <li><strong className="text-white">Project details:</strong> Scope specifications, budget ranges, target dates, and technical requirements provided in project brief submissions.</li>
                <li><strong className="text-white">Technical analytics data:</strong> Privacy-preserving, anonymized aggregate telemetry such as page views and button interactions. We honor Do Not Track (DNT) browser settings.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
                <li>To evaluate project feasibility and prepare tailored Scope of Work proposals.</li>
                <li>To send calendar invitations and schedule confirmed discovery calls.</li>
                <li>To communicate via your preferred channel (WhatsApp, Email, or Phone).</li>
                <li>To maintain accurate project records and billing invoices.</li>
              </ul>
              <p className="mt-2 text-xs font-semibold text-[#FF2A85]">
                We never sell, rent, or trade your contact details or project briefs to third-party brokers, advertisers, or marketing lists.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                4. Data Security &amp; Storage
              </h2>
              <p>
                We apply modern industry-standard security protocols to protect submitted data during transmission (HTTPS/TLS encryption) and prevent unauthorized access. Project briefs are shared only with the core technical and creative leads directly involved in scoping your project.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                5. Third-Party Services
              </h2>
              <p>
                Our site may contain links to external platforms such as WhatsApp for direct communication. These services operate under their own respective privacy policies. Advertising platforms (Meta, Google) manage ad spend accounts under your direct credentials.
              </p>
            </section>

            <section>
              <h2 className="text-base font-display font-bold text-white mb-2">
                6. Your Rights &amp; Contact
              </h2>
              <p>
                You may request access to, correction of, or deletion of your contact records at any time by emailing us at{' '}
                <a href={`mailto:${AGENCY_CONFIG.contact.email}`} className="text-[#38BDF8] hover:text-[#FF1361] font-semibold underline transition-colors">
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
