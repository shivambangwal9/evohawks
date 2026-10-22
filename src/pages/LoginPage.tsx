import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import type { UserRole } from '../context/authTypes';
import { motion, AnimatePresence } from 'framer-motion';
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
  Eye, 
  EyeOff, 
  Sliders,
  AlertTriangle,
  Clock,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface LoginPageProps {
  onNavigate: (page: PageId) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, lockedUntil, failedAttempts } = useAuth();
  const [activeRole, setActiveRole] = useState<UserRole>('superadmin');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [remainingLockoutSecs, setRemainingLockoutSecs] = useState<number>(0);

  // Monitor lockout countdown
  useEffect(() => {
    if (!lockedUntil) {
      setRemainingLockoutSecs(0);
      return;
    }

    const checkLockout = () => {
      const remaining = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
      setRemainingLockoutSecs(remaining);
      if (remaining <= 0) {
        setErrorMessage(null);
      }
    };

    checkLockout();
    const timer = setInterval(checkLockout, 1000);
    return () => clearInterval(timer);
  }, [lockedUntil]);

  // Reset form inputs & errors when switching tabs
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    setErrorMessage(null);
    setIdentifier('');
    setPassword('');
  };

  const isLocked = remainingLockoutSecs > 0;

  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isLocked) {
      setErrorMessage(`Security lockout active. Please wait ${formatLockoutTime(remainingLockoutSecs)} before trying again.`);
      return;
    }

    if (!identifier.trim()) {
      setErrorMessage(activeRole === 'superadmin' ? 'Please enter your Super Admin username or email.' : 'Please enter your email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(identifier.trim(), password, activeRole);
      setIsSubmitting(false);

      if (result.success) {
        onNavigate(activeRole === 'client' ? 'client-portal' : 'admin-portal');
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
      }
    }, 300);
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-3 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF1361]" />
            <span>SECURE AGENCY &amp; CLIENT AUTHENTICATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            {activeRole === 'superadmin' && 'Super Admin Control Center'}
            {activeRole === 'admin' && 'Agency Staff Portal'}
            {activeRole === 'client' && 'Client Sprint Workspace'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm font-sans-clean">
            {activeRole === 'superadmin' && 'Master authority: manage portfolio, website settings, staff team, and security.'}
            {activeRole === 'admin' && 'Internal agency staff workspace for sprint tracking and project deliverables.'}
            {activeRole === 'client' && 'Real-time sprint velocity, deliverable sign-offs, and live milestone review.'}
          </p>
        </div>

        {/* Triple Role Selector Tabs */}
        <div className="flex items-center p-1.5 rounded-full bg-[#0A0D18] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleRoleChange('superadmin')}
            className={`relative flex-1 py-3 px-3 rounded-full text-xs font-tech font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 z-10 ${
              activeRole === 'superadmin' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeRole === 'superadmin' && (
              <motion.div
                layoutId="loginActiveRoleTab"
                className="absolute inset-0 bg-gradient-to-r from-[#FF1361] to-[#0099FF] rounded-full shadow-[0_0_15px_rgba(255,19,97,0.35)] -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF2A85]" />
            <span>Super Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`relative flex-1 py-3 px-3 rounded-full text-xs font-tech font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 z-10 ${
              activeRole === 'admin' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeRole === 'admin' && (
              <motion.div
                layoutId="loginActiveRoleTab"
                className="absolute inset-0 bg-gradient-to-r from-[#0099FF] to-[#FF1361] rounded-full shadow-[0_0_15px_rgba(0,153,255,0.35)] -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Staff Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('client')}
            className={`relative flex-1 py-3 px-3 rounded-full text-xs font-tech font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 z-10 ${
              activeRole === 'client' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeRole === 'client' && (
              <motion.div
                layoutId="loginActiveRoleTab"
                className="absolute inset-0 bg-gradient-to-r from-[#0099FF] to-[#38BDF8] rounded-full shadow-[0_0_15px_rgba(0,153,255,0.35)] -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client</span>
          </button>
        </div>

        {/* Security Lockout Banner */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3 shadow-[0_0_25px_rgba(244,63,94,0.2)]"
            >
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="font-semibold block text-white text-sm">Security Lockout Active</strong>
                <p className="mt-1">
                  5 consecutive failed attempts detected. Access is temporarily locked to protect against brute-force intrusion.
                </p>
                <div className="mt-2.5 flex items-center gap-2 font-mono text-rose-300 font-bold bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-500/30 w-fit">
                  <Clock className="w-4 h-4 animate-spin text-rose-400" />
                  <span>Cooldown remaining: {formatLockoutTime(remainingLockoutSecs)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Notification Banner */}
        <AnimatePresence>
          {errorMessage && !isLocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block text-white">Authentication Failed</span>
                <p className="mt-0.5">{errorMessage}</p>
                {failedAttempts > 0 && failedAttempts < 5 && (
                  <p className="mt-1 text-[11px] text-rose-300 font-mono">
                    Attempt {failedAttempts} of 5 before 15-minute security lockout.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role Privileges & Guidance Callout */}
        {activeRole === 'superadmin' && (
          <div className="mb-6 p-4 rounded-[2rem] bg-gradient-to-br from-[#0A0D18] to-[#120716] border border-[#FF1361]/30 text-rose-200/90 text-xs font-sans-clean leading-relaxed shadow-[0_0_20px_rgba(255,19,97,0.15)] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#FF2A85] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5 text-white">Super Admin Access Guard:</strong>
              Use registered superadmin email or username (<strong>teamevohawks</strong>) and your root password to access the Master Control Center and Staff Team Manager.
            </div>
          </div>
        )}

        {/* Card Container */}
        <div className="p-6 sm:p-10 rounded-[3rem] rounded-tl-lg bg-[#060810] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <BorderBeam 
            size={140} 
            duration={10} 
            colorFrom="#0099FF" 
            colorTo="#FF1361" 
          />

          {/* Secure Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-tech text-slate-300 uppercase font-bold mb-1.5">
                {activeRole === 'superadmin' ? 'Super Admin Username / Email' : activeRole === 'admin' ? 'Staff Email' : 'Client Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={activeRole === 'superadmin' ? 'text' : 'email'}
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  disabled={isLocked || isSubmitting}
                  placeholder={
                    activeRole === 'superadmin' 
                      ? 'teamevohawks or teamevohawks@gmail.com' 
                      : activeRole === 'admin'
                      ? 'e.g. aryan@evohawks.tech'
                      : 'e.g. client@hyperion.com'
                  }
                  autoComplete={activeRole === 'superadmin' ? 'username' : 'email'}
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-[#050508] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF1361] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-tech text-slate-300 uppercase font-bold mb-1.5 flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] font-normal text-slate-400 font-sans-clean">Encrypted Session</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  disabled={isLocked || isSubmitting}
                  placeholder="Enter your security password"
                  autoComplete="current-password"
                  className="w-full pl-11 pr-11 py-3 rounded-full bg-[#050508] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF1361] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Guard Notice */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-tech">
              <KeyRound className="w-3.5 h-3.5 text-[#0099FF] shrink-0" />
              <span>Rate-limited defense: 5 failed attempts trigger a 15-minute lockout.</span>
            </div>

            <div className="pt-2">
              <MagneticButton
                type="submit"
                disabled={isSubmitting || isLocked}
                className="w-full py-4 rounded-full text-white font-tech font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] hover:shadow-[0_0_35px_rgba(255,19,97,0.4)] transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Verifying Credentials...</span>
                ) : isLocked ? (
                  <span>Locked ({formatLockoutTime(remainingLockoutSecs)})</span>
                ) : (
                  <>
                    <span>
                      {activeRole === 'superadmin' && 'Enter Super Admin Control Center'}
                      {activeRole === 'admin' && 'Enter Staff Portal'}
                      {activeRole === 'client' && 'Enter Client Workspace'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </MagneticButton>
            </div>
          </form>

          {/* Quick link back */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-tech text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS / High Entropy Security Engine</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-[#38BDF8] hover:text-[#FF1361] font-semibold cursor-pointer transition-colors"
            >
              Return to Website &rarr;
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
