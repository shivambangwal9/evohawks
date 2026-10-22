import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { motion } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { TiltCard } from '../components/ui/TiltCard';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Send, 
  ShieldCheck,
  Building,
  User,
  Smartphone
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';
import { AGENCY_CONFIG } from '../data/agencyData';

interface ClientDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({ onNavigate }) => {
  const { user, projects, logout } = useAuth();
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Get project associated with client email or fallback to first project
  const clientProject = projects.find(p => p.clientEmail.toLowerCase() === user?.email.toLowerCase()) || projects[0];

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    
    // Open WhatsApp with prefilled message
    const msg = encodeURIComponent(`[Client Feedback - ${user?.company || 'Hyperion'}]: ${feedbackMessage}`);
    window.open(`https://wa.me/${AGENCY_CONFIG.contact.whatsappCleanNumber}?text=${msg}`, '_blank');
    setFeedbackSent(true);
    setFeedbackMessage('');
    setTimeout(() => setFeedbackSent(false), 4000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Authenticated Workspace Security Indicator */}
        <div className="mb-6 p-4 rounded-[1.75rem] rounded-tl-sm bg-[#0099FF]/10 border border-[#0099FF]/30 text-sky-200 text-xs font-sans-clean flex items-start gap-3 shadow-[0_0_25px_rgba(0,153,255,0.1)]">
          <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5 text-white">Authenticated Client Sprint Environment</strong>
            Session verified. Real-time deliverable tracking, milestone reviews, and velocity reports are synchronized directly with the Evo Hawks core agency team.
          </div>
        </div>

        {/* Top Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-ping" />
              <span>DEMO CLIENT SPRINT PORTAL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] to-[#FF1361]">{user?.name || 'Valued Client'}</span>
            </h1>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-400 mt-1">
              <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                <Building className="w-4 h-4 text-[#0099FF]" />
                <span>{user?.company || 'Hyperion FinTech'}</span>
              </span>
              <span>•</span>
              <span>{user?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="py-2.5 px-4 rounded-full bg-[#0A0D18] border border-white/10 text-slate-200 hover:text-white hover:border-[#0099FF]/50 font-tech font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,153,255,0.15)]"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>Contact Team</span>
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('login');
              }}
              className="py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-tech font-semibold text-xs transition-colors cursor-pointer border border-white/5"
            >
              Logout
            </button>
          </div>
        </div>

        {clientProject ? (
          <>
            {/* Live Sprint Status Card */}
            <div className="my-8">
              <TiltCard tiltDegree={3} glareColor="#0099FF" className="w-full">
                <div className="p-6 sm:p-8 rounded-[3rem] rounded-tl-lg bg-[#0A0D18]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,153,255,0.08)] relative overflow-hidden">
                  <BorderBeam size={180} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-tech uppercase font-bold px-3 py-1 rounded-full bg-[#0099FF]/15 text-[#38BDF8] border border-[#0099FF]/30">
                          {clientProject.category}
                        </span>
                        <span className={`text-[10px] font-tech uppercase font-bold px-3 py-1 rounded-full ${
                          clientProject.status === 'Completed'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : clientProject.status === 'Review'
                            ? 'bg-[#FF1361]/15 text-[#FF2A85] border border-[#FF1361]/30'
                            : 'bg-[#0099FF]/15 text-[#38BDF8] border border-[#0099FF]/30'
                        }`}>
                          ● {clientProject.status}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                        {clientProject.title}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Assigned Lead: <strong className="text-white">{clientProject.leadStrategist}</strong> • Target Delivery: <strong className="text-white">{clientProject.deadline}</strong>
                      </p>
                    </div>

                    {/* Progress Gauge */}
                    <div className="flex flex-col sm:items-end">
                      <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-[#7B2CBF] to-[#FF1361]">
                        {clientProject.progress}%
                      </div>
                      <span className="text-xs font-tech text-slate-400 uppercase tracking-wider">Overall Velocity</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="my-6">
                    <div className="w-full h-3 bg-[#060810] rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] rounded-full shadow-[0_0_15px_rgba(255,19,97,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${clientProject.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* 4-Stage Milestone Roadmap */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {clientProject.milestones.map((milestone, idx) => {
                      const cornerShape = idx === 0 
                        ? 'rounded-[2rem] rounded-tl-sm'
                        : idx === 1
                        ? 'rounded-[2rem] rounded-tr-sm'
                        : idx === 2
                        ? 'rounded-[2rem] rounded-bl-sm'
                        : 'rounded-[2rem] rounded-br-sm';

                      return (
                        <div
                          key={idx}
                          className={`p-4.5 ${cornerShape} border transition-all ${
                            milestone.status === 'completed'
                              ? 'bg-[#060810] border-emerald-500/30 text-emerald-300'
                              : milestone.status === 'current'
                              ? 'bg-[#060810] border-[#0099FF] shadow-[0_0_25px_rgba(0,153,255,0.25)] text-white ring-1 ring-[#0099FF]/50'
                              : 'bg-[#060810]/60 border-white/5 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-slate-300">
                              Stage {milestone.step}
                            </span>
                            {milestone.status === 'completed' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : milestone.status === 'current' ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#0099FF] animate-pulse shadow-[0_0_10px_#0099FF]" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                            )}
                          </div>
                          <h4 className="text-xs font-bold leading-snug mb-1 text-white">{milestone.title}</h4>
                          <div className="text-[10px] font-tech text-slate-400">{milestone.date}</div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </TiltCard>
            </div>

            {/* Deliverables Hub & Communication Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Deliverables & Assets Download (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-8 rounded-[2.75rem] rounded-tl-lg bg-[#0A0D18]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  <BorderBeam size={160} duration={14} colorFrom="#0099FF" colorTo="#FF1361" />

                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">
                        Deliverables &amp; Asset Vault
                      </h3>
                      <p className="text-xs text-slate-400">Live staging links, code repositories, and creative exports.</p>
                    </div>
                    <span className="text-xs font-tech font-semibold text-[#38BDF8] bg-[#0099FF]/15 px-3 py-1 rounded-full border border-[#0099FF]/30">
                      {clientProject.deliverables.filter(d => d.completed).length}/{clientProject.deliverables.length} Ready
                    </span>
                  </div>

                  <div className="space-y-3">
                    {clientProject.deliverables.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl ${idx % 2 === 0 ? 'rounded-tl-xs' : 'rounded-tr-xs'} bg-[#060810] border border-white/5 hover:border-[#0099FF]/40 transition-colors flex items-center justify-between gap-4`}
                      >
                        <div className="flex items-center gap-3">
                          {item.completed ? (
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                              <Clock className="w-4 h-4 text-slate-500" />
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs font-bold text-white">{item.title}</h4>
                            <span className="text-[10px] font-tech text-slate-400">
                              {item.completed ? 'Shipped & Verified' : 'In Active Production'}
                            </span>
                          </div>
                        </div>

                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="py-1.5 px-3.5 rounded-full bg-[#0099FF]/15 border border-[#0099FF]/30 text-[#38BDF8] hover:text-white hover:bg-[#0099FF]/30 text-xs font-tech font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,153,255,0.2)] transition-all flex-shrink-0"
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] font-tech text-slate-500">Available upon QA</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* SLA Handover Notice */}
                  <div className="mt-6 p-4 rounded-2xl bg-[#060810] border border-white/10 text-xs text-slate-300 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#0099FF] flex-shrink-0" />
                    <span>100% Full IP Handover Guarantee upon final sprint completion.</span>
                  </div>
                </div>
              </div>

              {/* Direct Strategist Channel (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="p-6 sm:p-8 rounded-[2.75rem] rounded-tr-lg bg-[#0A0D18]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0099FF] to-[#FF1361] text-white flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,19,97,0.3)]">
                      EH
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Lead Strategist Dispatch</h4>
                      <p className="text-[11px] font-tech text-[#38BDF8]">Direct 2-hour priority client SLA</p>
                    </div>
                  </div>

                  <form onSubmit={handleSendFeedback} className="space-y-4">
                    <label className="block text-xs font-tech uppercase font-bold text-slate-300">
                      Request Iteration or Ask Question
                    </label>
                    <textarea
                      rows={4}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="e.g. Please update the hero CTA copy to 'Start Free Trial' and send test build..."
                      className="w-full p-3.5 rounded-2xl bg-[#060810] border border-white/10 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF]/40 transition-all shadow-inner"
                    />

                    {feedbackSent && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-tech flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Opening WhatsApp with your formatted brief!</span>
                      </div>
                    )}

                    <MagneticButton
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] text-white font-bold text-xs hover:shadow-[0_0_30px_rgba(255,19,97,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch to Agency WhatsApp</span>
                    </MagneticButton>
                  </form>
                </div>

                {/* Studio Direct Contact Box */}
                <div className="p-6 sm:p-8 rounded-[2.5rem] rounded-br-lg bg-[#060810] border border-[#FF1361]/30 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-36 h-36 bg-[#FF1361]/10 rounded-full blur-3xl pointer-events-none" />
                  <span className="text-[10px] font-tech uppercase text-[#FF2A85] font-bold tracking-wider">
                    Emergency Hotline
                  </span>
                  <h4 className="text-base font-display font-bold mt-1 mb-2">Dedicated Account Lead</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    For high-priority staging updates or urgent campaign scaling, contact your assigned director directly:
                  </p>
                  <div className="space-y-2 text-xs font-tech text-slate-300">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#0099FF]" />
                      <span>{clientProject.leadStrategist}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-[#FF2A85]" />
                      <span>{AGENCY_CONFIG.contact.phone}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </>
        ) : (
          <div className="py-20 text-center bg-[#0A0D18] rounded-[2.5rem] border border-white/10">
            <p className="text-slate-400">No active projects found for this account.</p>
          </div>
        )}

      </div>
    </div>
  );
};
