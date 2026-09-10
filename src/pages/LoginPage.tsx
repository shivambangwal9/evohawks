import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';
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
  Building, 
  Sparkles, 
  CheckCircle2, 
  Zap,
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
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(email || (activeRole === 'admin' ? 'admin@evohawks.com' : 'client@hyperion.com'), password, activeRole);
      setIsSubmitting(false);
      onNavigate(activeRole === 'admin' ? 'admin-portal' : 'client-portal');
    }, 450);
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
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-4">
            <Logo size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>AUTHENTICATION GATEWAY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
            {activeRole === 'client' ? 'Client Project Portal' : 'Agency Control Center'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm">
            {activeRole === 'client' 
              ? 'Inspect real-time sprint velocity, milestones & downloadable deliverables.' 
              : 'Manage client deliverables, update project scopes, and monitor team output.'}
          </p>
        </div>

        {/* Dual Role Selector Tabs with layoutId */}
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
            <span>Client Login</span>
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
        <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <BorderBeam 
            size={140} 
            duration={10} 
            colorFrom={activeRole === 'client' ? '#0284C7' : '#7C3AED'} 
            colorTo={activeRole === 'client' ? '#38BDF8' : '#6366F1'} 
          />

          {/* Quick 1-Click Instant Demo Launch Bar */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech uppercase text-slate-500 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Instant Demo Access</span>
              </span>
              <span className="text-[10px] font-tech text-sky-600 font-semibold">No typing required</span>
            </div>
            
            {activeRole === 'client' ? (
              <button
                type="button"
                onClick={() => handleInstantDemo('client')}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-tech font-bold text-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Client Demo (Hyperion FinTech)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleInstantDemo('admin')}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-tech font-bold text-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Launch Admin Demo (Evo Hawks Lead)</span>
              </button>
            )}
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-4 text-[11px] font-tech text-slate-400 uppercase">Or Enter Credentials</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {activeRole === 'client' && (
              <div>
                <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-1.5">
                  Company / Organization Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Hyperion FinTech"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-2xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-1.5">
                {activeRole === 'client' ? 'Client Email' : 'Admin Staff Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder={activeRole === 'client' ? 'client@hyperion.com' : 'admin@evohawks.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-tech text-slate-600 uppercase font-bold mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  activeRole === 'client'
                    ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)]'
                    : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:shadow-[0_6px_20px_rgba(124,58,237,0.35)]'
                }`}
              >
                <span>{isSubmitting ? 'Authenticating...' : `Enter ${activeRole === 'client' ? 'Client Portal' : 'Admin Center'}`}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </form>

          {/* Security Guarantee Bottom */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] font-tech text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit Encrypted Secure Session • Evo Hawks Gateway</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
