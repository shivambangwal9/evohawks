import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
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
        
        {/* Top Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span>ACTIVE CLIENT SPRINT PORTAL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Welcome, {user?.name || 'Valued Client'}
            </h1>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 mt-1">
              <span className="flex items-center gap-1 font-semibold text-slate-900">
                <Building className="w-4 h-4 text-sky-600" />
                <span>{user?.company || 'Hyperion FinTech'}</span>
              </span>
              <span>•</span>
              <span>{user?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-sky-400 font-tech font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              <span>Contact Team</span>
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('login');
              }}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-tech font-semibold text-xs transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {clientProject ? (
          <>
            {/* Live Sprint Status Card */}
            <div className="my-8">
              <TiltCard tiltDegree={4} glareColor="#0284C7" className="w-full">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-slate-200 shadow-xl relative overflow-hidden">
                  <BorderBeam size={160} duration={12} colorFrom="#0284C7" colorTo="#38BDF8" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-tech uppercase font-bold px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                          {clientProject.category}
                        </span>
                        <span className={`text-[10px] font-tech uppercase font-bold px-2.5 py-1 rounded-md ${
                          clientProject.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : clientProject.status === 'Review'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}>
                          ● {clientProject.status}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                        {clientProject.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Assigned Lead: <strong className="text-slate-800">{clientProject.leadStrategist}</strong> • Target Delivery: <strong className="text-slate-800">{clientProject.deadline}</strong>
                      </p>
                    </div>

                    {/* Progress Gauge */}
                    <div className="flex flex-col sm:items-end">
                      <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                        {clientProject.progress}%
                      </div>
                      <span className="text-xs font-tech text-slate-500 uppercase tracking-wider">Overall Velocity</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="my-6">
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-full shadow-sm"
                        initial={{ width: 0 }}
                        animate={{ width: `${clientProject.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* 4-Stage Milestone Roadmap */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {clientProject.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          milestone.status === 'completed'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : milestone.status === 'current'
                            ? 'bg-sky-50/80 border-sky-300 shadow-sm text-sky-900 ring-2 ring-sky-200/50'
                            : 'bg-slate-50/70 border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                            Stage {milestone.step}
                          </span>
                          {milestone.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : milestone.status === 'current' ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold leading-snug mb-1">{milestone.title}</h4>
                        <div className="text-[10px] font-tech opacity-75">{milestone.date}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </TiltCard>
            </div>

            {/* Deliverables Hub & Communication Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Deliverables & Assets Download (8 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 rounded-3xl bg-white/95 border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-display font-bold text-slate-900">
                        Deliverables &amp; Asset Vault
                      </h3>
                      <p className="text-xs text-slate-500">Live staging links, code repositories, and creative exports.</p>
                    </div>
                    <span className="text-xs font-tech font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                      {clientProject.deliverables.filter(d => d.completed).length}/{clientProject.deliverables.length} Ready
                    </span>
                  </div>

                  <div className="space-y-3">
                    {clientProject.deliverables.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          {item.completed ? (
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center flex-shrink-0">
                              <Clock className="w-4 h-4 text-slate-500" />
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                            <span className="text-[10px] font-tech text-slate-500">
                              {item.completed ? 'Shipped & Verified' : 'In Active Production'}
                            </span>
                          </div>
                        </div>

                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-sky-600 hover:text-sky-700 hover:border-sky-300 text-xs font-tech font-semibold flex items-center gap-1.5 shadow-2xs transition-colors flex-shrink-0"
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] font-tech text-slate-400">Available upon QA</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* SLA Handover Notice */}
                  <div className="mt-6 p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>100% Full IP Handover Guarantee upon final sprint completion.</span>
                  </div>
                </div>
              </div>

              {/* Direct Strategist Channel (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="p-6 rounded-3xl bg-white/95 border border-slate-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-black">
                      EH
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Lead Strategist Dispatch</h4>
                      <p className="text-[11px] font-tech text-slate-500">Direct 2-hour priority client SLA</p>
                    </div>
                  </div>

                  <form onSubmit={handleSendFeedback} className="space-y-3">
                    <label className="block text-xs font-tech uppercase font-bold text-slate-600">
                      Request Iteration or Ask Question
                    </label>
                    <textarea
                      rows={4}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="e.g. Please update the hero CTA copy to 'Start Free Trial' and send test build..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-2xs"
                    />

                    {feedbackSent && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-tech flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Opening WhatsApp with your formatted brief!</span>
                      </div>
                    )}

                    <MagneticButton
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch to Agency WhatsApp</span>
                    </MagneticButton>
                  </form>
                </div>

                {/* Studio Direct Contact Box */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-[10px] font-tech uppercase text-sky-400 font-bold tracking-wider">
                    Emergency Hotline
                  </span>
                  <h4 className="text-base font-display font-bold mt-1 mb-2">Dedicated Account Lead</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    For high-priority staging updates or urgent campaign scaling, contact your assigned director directly:
                  </p>
                  <div className="space-y-2 text-xs font-tech text-slate-200">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      <span>{clientProject.leadStrategist}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{AGENCY_CONFIG.contact.phone}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-600">No active projects found for this account.</p>
          </div>
        )}

      </div>
    </div>
  );
};
