import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import type { UserRole } from '../context/authTypes';
import { motion } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Logo } from '../components/Logo';
import { 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface LoginPageProps {
  onNavigate: (page: PageId) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, demoLogin } = useAuth();
  const [activeRole, setActiveRole] = useState<UserRole>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(
        email || (activeRole === 'admin' ? 'teamevohawks@gmail.com' : 'demo-client@specimen.evohawks.tech'),
        password,
        activeRole
      );
      setIsSubmitting(false);
      onNavigate(activeRole === 'admin' ? 'admin-portal' : 'client-portal');
    }, 350);
  };

  const handleInstantDemo = (role: UserRole) => {
    demoLogin(role);
    onNavigate(role === 'admin' ? 'admin-portal' : 'client-portal');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-28 pb-20 flex items-center justify-center relative overflow-hidden bg-[#050508] text-white"
    >
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="mb-4">
            <Logo size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>PORTAL ARCHITECTURE PREVIEW (DEMO)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            {activeRole === 'client' ? 'Client Workspace Preview' : 'Agency Control Center Preview'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm font-sans-clean">
            {activeRole === 'client' 
              ? 'Evaluate the real-time sprint velocity, milestones, and deliverable review interface.' 
              : 'Evaluate the internal agency deliverable manager and client sprint tracker.'}
          </p>
        </div>

        {/* Security & Prototype Architecture Notice */}
        <div className="mb-6 p-5 rounded-[2rem] bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-amber-500/30 text-amber-200/90 text-xs font-sans-clean leading-relaxed shadow-[0_0_20px_rgba(245,158,11,0.05)] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5 text-amber-300">Architecture &amp; Security Notice:</strong>
            This frontend portal operates in <strong>local demonstration mode</strong>. In production, secure authentication and data protection connect to enterprise authentication (Supabase / JWT) with server-side Row-Level Security (RLS) to enforce client data segregation.
          </div>
        </div>

        {/* Dual Role Selector Tabs */}
        <div className="flex items-center p-1.5 rounded-full bg-[#0A0D18] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveRole('client')}
            className={`relative flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-tech font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 z-10 ${
              activeRole === 'client' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeRole === 'client' && (
              <motion.div
                layoutId="loginActiveRoleTab"
                className="absolute inset-0 bg-gradient-to-r from-[#0099FF] to-[#FF1361] rounded-full shadow-[0_0_15px_rgba(255,19,97,0.35)] -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <UserCheck className="w-4 h-4" />
            <span>Client Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('admin')}
            className={`relative flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-tech font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 z-10 ${
              activeRole === 'admin' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeRole === 'admin' && (
              <motion.div
                layoutId="loginActiveRoleTab"
                className="absolute inset-0 bg-gradient-to-r from-[#0099FF] to-[#FF1361] rounded-full shadow-[0_0_15px_rgba(255,19,97,0.35)] -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <ShieldCheck className="w-4 h-4" />
            <span>Agency Admin</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="p-6 sm:p-10 rounded-[3rem] rounded-tl-lg bg-[#060810] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
          <BorderBeam 
            size={140} 
            duration={10} 
            colorFrom="#0099FF" 
            colorTo="#FF1361" 
          />

          {/* Quick 1-Click Instant Demo Launch Bar */}
          <div className="mb-6 p-5 rounded-[2rem] bg-gradient-to-br from-[#0A0D18] to-[#060810] border border-[#0099FF]/30 shadow-[0_0_20px_rgba(0,153,255,0.1)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech uppercase text-slate-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>Instant Demo Access</span>
              </span>
              <span className="text-[10px] font-tech text-[#38BDF8] font-semibold bg-[#0A0D18] px-2.5 py-0.5 rounded-full border border-[#0099FF]/30">One-Click Preview</span>
            </div>
            
            {activeRole === 'client' ? (
              <button
                type="button"
                onClick={() => handleInstantDemo('client')}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] text-white font-tech font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch Demo Client Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleInstantDemo('admin')}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] text-white font-tech font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch Demo Agency Control Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[11px] font-tech text-slate-500 uppercase font-semibold">Or Custom Session</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Simulated Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-tech text-slate-300 uppercase font-bold mb-1.5">
                {activeRole === 'client' ? 'Client Email' : 'Admin Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeRole === 'client' ? 'demo-client@specimen.evohawks.tech' : 'teamevohawks@gmail.com'}
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#050508] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-tech text-slate-300 uppercase font-bold mb-1.5">
                Session Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Demo mode: Any password accepted"
                  className="w-full pl-11 pr-11 py-3 rounded-full bg-[#050508] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] font-tech text-slate-500 mt-1 pl-2">
                Notice: In this demo preview, sessions are simulated locally for interface testing.
              </p>
            </div>

            <div className="pt-2">
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full text-white font-tech font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer"
              >
                <span>{activeRole === 'client' ? 'Enter Client Workspace' : 'Enter Agency Control Center'}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </form>

          {/* Technical Integration Notice */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-tech text-slate-400">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>Production Backend: Unconnected</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="text-[#38BDF8] hover:text-[#0099FF] font-semibold cursor-pointer transition-colors"
            >
              Contact Agency Lead &rarr;
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
