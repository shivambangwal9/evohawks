import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/ThemeContext';
import { 
  ShieldCheck, 
  Plus, 
  Settings, 
  Eye, 
  LogOut,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';
import { motion, AnimatePresence } from 'framer-motion';

interface SuperAdminFloatingBarProps {
  onOpenPostModal: () => void;
  onNavigate: (page: PageId) => void;
  currentPage: PageId;
}

export const SuperAdminFloatingBar: React.FC<SuperAdminFloatingBarProps> = ({
  onOpenPostModal,
  onNavigate,
  currentPage
}) => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Default to collapsed on mobile / tablet to prevent screen obstruction
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('evo_admin_dock_collapsed');
      if (saved !== null) return saved === 'true';
      return window.innerWidth < 1024;
    }
    return false;
  });

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('evo_admin_dock_dismissed') === 'true';
    }
    return false;
  });

  if (!user || (user.role !== 'superadmin' && user.role !== 'admin') || isDismissed) {
    return null;
  }

  const isSuperAdmin = user.role === 'superadmin';

  const handleToggleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    try {
      localStorage.setItem('evo_admin_dock_collapsed', String(collapsed));
    } catch {
      // storage unavailable
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem('evo_admin_dock_dismissed', 'true');
    } catch {
      // storage unavailable
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isCollapsed ? (
        /* Collapsed Floating Chip - Sits unobtrusively in bottom corner, freeing entire view */
        <motion.aside
          key="admin-chip-collapsed"
          aria-label="Super Admin Quick Controls (Minimized)"
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 lg:bottom-6 right-3 sm:right-6 z-40"
        >
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleToggleCollapse(false)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border shadow-xl transition-all cursor-pointer group ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 text-slate-800 hover:border-[#FF1361]/50 shadow-[0_10px_30px_rgba(15,23,42,0.14)]'
                  : 'bg-[#080B14]/95 border-[#FF1361]/40 text-white hover:border-[#FF1361] shadow-[0_12px_35px_rgba(255,19,97,0.3)]'
              }`}
              title="Expand Super Admin Controls"
              aria-label="Expand Super Admin Controls"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF2A85] shrink-0" />
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF1361] transition-colors" />
            </button>

            {/* Quick close chip */}
            <button
              onClick={handleDismiss}
              className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white/90 border-slate-200 text-slate-400 hover:text-slate-700'
                  : 'bg-[#080B14]/90 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Hide Admin Dock completely"
              aria-label="Hide Admin Dock completely"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.aside>
      ) : (
        /* Full Expanded Admin Dock with Minimize & Close Actions */
        <motion.aside
          key="admin-dock-expanded"
          aria-label="Super Admin Quick Controls"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[94%] sm:w-auto"
        >
          <div 
            className={`flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:px-4 sm:py-2.5 rounded-full border shadow-2xl transition-colors ${
              isLight
                ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-[0_15px_40px_rgba(15,23,42,0.18)]'
                : 'bg-[#080B14]/95 border-[#FF1361]/40 text-white shadow-[0_15px_40px_rgba(255,19,97,0.35),0_0_20px_rgba(0,153,255,0.25)]'
            }`}
          >
            {/* Status Indicator */}
            <div className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full border ${
              isLight 
                ? 'bg-rose-50 border-rose-200 text-slate-900' 
                : 'bg-[#FF1361]/15 border-[#FF1361]/30 text-white'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF2A85] shrink-0" />
              <span className="text-[10px] sm:text-xs font-tech font-bold uppercase tracking-wider whitespace-nowrap">
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Action: Post Portfolio Work */}
            <button
              onClick={onOpenPostModal}
              className="px-2.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white text-xs font-tech font-bold hover:shadow-[0_0_20px_rgba(255,19,97,0.5)] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Post new portfolio project to 'Work That Speaks'"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Work</span>
            </button>

            {/* Action: Customize Website */}
            <button
              onClick={() => onNavigate('admin-portal')}
              className={`px-2 sm:px-3.5 py-1.5 rounded-full text-xs font-tech font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentPage === 'admin-portal'
                  ? isLight
                    ? 'bg-sky-100 text-sky-800 border border-sky-300 font-bold'
                    : 'bg-white/20 text-white border border-white/30'
                  : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
              }`}
              title="Open Website Customizer & Agency Settings"
            >
              <Settings className="w-3.5 h-3.5 text-[#0099FF]" />
              <span className="hidden sm:inline">Customize Site</span>
            </button>

            {/* Action: View Work That Speaks */}
            {currentPage === 'home' ? (
              <a
                href="#work"
                className={`p-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-tech flex items-center gap-1 transition-colors cursor-pointer border ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
                }`}
                title="Scroll to 'Work That Speaks' section"
              >
                <Eye className="w-3.5 h-3.5 text-[#0099FF]" />
                <span className="hidden md:inline">Work Section</span>
              </a>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className={`p-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-tech flex items-center gap-1 transition-colors cursor-pointer border ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
                }`}
                title="Return to Website Home"
              >
                <Eye className="w-3.5 h-3.5 text-[#0099FF]" />
                <span className="hidden md:inline">View Home</span>
              </button>
            )}

            {/* Logout */}
            <button
              onClick={() => {
                logout();
                onNavigate('home');
              }}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isLight 
                  ? 'text-slate-500 hover:text-rose-600 hover:bg-slate-100' 
                  : 'text-slate-400 hover:text-rose-400 hover:bg-white/10'
              }`}
              title="Exit Admin Mode"
              aria-label="Exit Admin Mode"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>

            {/* Minimize to Corner Chip */}
            <button
              onClick={() => handleToggleCollapse(true)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ml-0.5 border ${
                isLight
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-white/10 border-white/10'
              }`}
              title="Minimize to floating corner icon"
              aria-label="Minimize to floating corner icon"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Dismiss completely */}
            <button
              onClick={handleDismiss}
              className={`p-1.5 rounded-full transition-colors cursor-pointer border ${
                isLight
                  ? 'text-slate-400 hover:text-rose-600 hover:bg-slate-100 border-slate-200'
                  : 'text-slate-400 hover:text-rose-400 hover:bg-white/10 border-white/10'
              }`}
              title="Hide Admin Dock completely"
              aria-label="Hide Admin Dock completely"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
