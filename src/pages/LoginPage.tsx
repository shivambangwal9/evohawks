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
      className="min-h-screen pt-28 pb-20 flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="mb-4">
            <Logo size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>PORTAL ARCHITECTURE PREVIEW (DEMO)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
            {activeRole === 'client' ? 'Client Workspace Preview' : 'Agency Control Center Preview'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm">
            {activeRole === 'client' 
              ? 'Evaluate the real-time sprint velocity, milestones, and deliverable review interface.' 
              : 'Evaluate the internal agency deliverable manager and client sprint tracker.'}
          </p>
        </div>

        {/* Security & Prototype Architecture Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs font-sans-clean leading-relaxed shadow-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Architecture &amp; Security Disclaimer:</strong>
            This frontend portal operates in <strong>local demonstration mode</strong>. In production, secure authentication and data protection require connection to an enterprise authentication service (e.g., Supabase Auth, Firebase Auth, or JWT backend) with server-side Row-Level Security (RLS) to enforce client data segregation. Do not submit sensitive client data in this prototype sandbox.
          </div>
        </div>

        {/* Dual Role Selector Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl bg-white/80 border border-slate-200 shadow-xs mb-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveRole('client')}
            className={`relative flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-tech font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 z-10 ${
              activeRole === 'client' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {activeRole === 'client' && (
              <motion.div
                layoutId="loginActiveRoleTab"
                className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl shadow-md -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <UserCheck className="w-4 h-4" />
            <span>Client Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole('admin')}
            className={`relative flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-tech font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 z-10 ${
              activeRole === 'admin' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {activeRole === 'admin' && (
              <motion.div
                layoutId="loginActiveRoleTab"
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl shadow-md -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <ShieldCheck className="w-4 h-4" />
            <span>Agency Admin</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 border border-slate-200 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <BorderBeam 
            size={140} 
            duration={10} 
            colorFrom={activeRole === 'client' ? '#0284C7' : '#7C3AED'} 
            colorTo={activeRole === 'client' ? '#38BDF8' : '#6366F1'} 
          />

          {/* Quick 1-Click Instant Demo Launch Bar */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech uppercase text-slate-600 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Instant Demo Access</span>
              </span>
              <span className="text-[10px] font-tech text-sky-700 font-semibold bg-sky-100 px-2 py-0.5 rounded">One-Click Preview</span>
            </div>
            
            {activeRole === 'client' ? (
              <button
                type="button"
                onClick={() => handleInstantDemo('client')}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-tech font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>Launch Demo Client Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleInstantDemo('admin')}
                className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-tech font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>Launch Demo Agency Control Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-[11px] font-tech text-slate-400 uppercase font-semibold">Or Custom Session</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Simulated Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                {activeRole === 'client' ? 'Client Email' : 'Admin Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeRole === 'client' ? 'demo-client@specimen.evohawks.tech' : 'teamevohawks@gmail.com'}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-tech text-slate-700 uppercase font-bold mb-1.5">
                Session Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Demo mode: Any password accepted"
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] font-tech text-slate-400 mt-1">
                Notice: In this demo preview, sessions are simulated locally for interface testing.
              </p>
            </div>

            <div className="pt-2">
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl text-white font-tech font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  activeRole === 'client' 
                    ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-sky-500/20' 
                    : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:shadow-violet-500/20'
                }`}
              >
                <span>{activeRole === 'client' ? 'Enter Client Workspace' : 'Enter Agency Control Center'}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </form>

          {/* Technical Integration Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-tech text-slate-500">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-sky-600" />
              <span>Production Backend: Unconnected</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
            >
              Contact Agency Lead &rarr;
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
