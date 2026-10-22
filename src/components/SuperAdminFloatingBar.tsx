import React from 'react';
import { useAuth } from '../context/useAuth';
import { 
  ShieldCheck, 
  Plus, 
  Settings, 
  Eye, 
  LogOut 
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';
import { motion } from 'framer-motion';

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

  if (!user || (user.role !== 'superadmin' && user.role !== 'admin')) {
    return null;
  }

  const isSuperAdmin = user.role === 'superadmin';

  return (
    <motion.aside
      aria-label="Super Admin Quick Controls"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto"
    >
      <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 sm:px-4 sm:py-2.5 rounded-full bg-[#080B14]/95 border border-[#FF1361]/40 backdrop-blur-xl shadow-[0_15px_40px_rgba(255,19,97,0.35),0_0_20px_rgba(0,153,255,0.25)] text-white">
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF1361]/15 border border-[#FF1361]/30">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF2A85] shrink-0" />
          <span className="text-[10px] sm:text-xs font-tech font-bold uppercase tracking-wider text-white whitespace-nowrap">
            {isSuperAdmin ? 'Super Admin' : 'Admin'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Action: Post Portfolio Work */}
        <button
          onClick={onOpenPostModal}
          className="px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white text-xs font-tech font-bold hover:shadow-[0_0_20px_rgba(255,19,97,0.5)] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          title="Post new portfolio project to 'Work That Speaks'"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post Work</span>
        </button>

        {/* Action: Customize Website */}
        <button
          onClick={() => onNavigate('admin-portal')}
          className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-tech font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            currentPage === 'admin-portal'
              ? 'bg-white/20 text-white border border-white/30'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
          }`}
          title="Open Website Customizer & Agency Settings"
        >
          <Settings className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="hidden sm:inline">Customize Site</span>
        </button>

        {/* Action: View Work That Speaks */}
        {currentPage === 'home' ? (
          <a
            href="#work"
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-tech flex items-center gap-1 transition-colors cursor-pointer"
            title="Scroll to 'Work That Speaks' section"
          >
            <Eye className="w-3.5 h-3.5 text-[#0099FF]" />
            <span className="hidden md:inline">Work Section</span>
          </a>
        ) : (
          <button
            onClick={() => onNavigate('home')}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-tech flex items-center gap-1 transition-colors cursor-pointer"
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
          className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
          title="Exit Admin Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.aside>
  );
};
