import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { MagneticButton } from './ui/MagneticButton';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  UserCheck, 
  ShieldCheck, 
  LogOut,
  LayoutDashboard 
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenProjectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenProjectModal 
}) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { name: string; id: PageId }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'work' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'About', id: 'about' },
    { name: 'Process', id: 'process' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: PageId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.06)] py-3' 
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div onClick={() => onNavigate('home')} className="cursor-pointer">
            <Logo size="md" lightText={false} />
          </div>

          {/* Desktop Navigation Links with layoutId active pill */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200/90 backdrop-blur-md shadow-xs">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-colors duration-200 z-10 ${
                    isActive 
                      ? 'text-sky-600' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavbarPill"
                      className="absolute inset-0 bg-sky-50 border border-sky-300/80 rounded-full shadow-[0_2px_10px_rgba(2,132,199,0.15)] -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA Button & Portal Login with Magnetic effect */}
          <div className="hidden sm:flex items-center gap-3">
            {/* User Auth Status Pill */}
            {user ? (
              <div className="flex items-center gap-1.5 bg-white/90 p-1 pl-3 rounded-full border border-slate-200 shadow-2xs">
                <button
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin-portal' : 'client-portal')}
                  className={`text-xs font-tech font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    user.role === 'admin' ? 'text-violet-700 hover:text-violet-900' : 'text-sky-700 hover:text-sky-900'
                  }`}
                  title="Go to Dashboard"
                >
                  {user.role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                  ) : (
                    <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                  )}
                  <span className="max-w-[110px] truncate">{user.company || user.name}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('home');
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="py-2 px-3.5 rounded-full text-xs font-tech font-bold text-slate-700 hover:text-sky-600 bg-white/80 hover:bg-white border border-slate-200/90 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>Portal Login</span>
              </button>
            )}

            <MagneticButton
              onClick={() => onOpenProjectModal()}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:shadow-[0_6px_20px_rgba(2,132,199,0.4)] transition-all duration-300 cursor-pointer overflow-hidden animate-shimmer"
            >
              <Sparkles className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            {user ? (
              <button
                onClick={() => onNavigate(user.role === 'admin' ? 'admin-portal' : 'client-portal')}
                className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-tech font-bold"
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-2.5 py-1.5 rounded-full text-[11px] font-tech font-bold text-slate-700 bg-white border border-slate-200"
              >
                Login
              </button>
            )}

            <button
              onClick={() => onOpenProjectModal()}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer shadow-sm"
            >
              Start →
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-sky-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 border-b border-slate-200 overflow-y-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
              <div className="text-xs uppercase tracking-wider font-tech text-sky-600 font-bold mb-1 px-3">
                Navigation Menu
              </div>
              {navLinks.map((link, idx) => {
                const isActive = currentPage === link.id;
                return (
                  <motion.a
                    key={link.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors border ${
                      isActive 
                        ? 'bg-sky-50 border-sky-300 text-sky-600 shadow-xs' 
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  </motion.a>
                );
              })}

              {/* Portal link in mobile */}
              <motion.button
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.03 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (user) {
                    onNavigate(user.role === 'admin' ? 'admin-portal' : 'client-portal');
                  } else {
                    onNavigate('login');
                  }
                }}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors border bg-slate-50 border-slate-200 text-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  <span>{user ? `Dashboard (${user.role})` : 'Client & Admin Portal'}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </motion.button>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-slate-200 mt-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_6px_20px_rgba(2,132,199,0.3)] text-sm cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 text-sm cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>Get in Touch</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
