import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabel = false,
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-xs sm:text-sm',
    lg: 'px-3.5 py-2 text-sm'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4 h-4'
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all duration-300 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0099FF] ${sizeClasses[size]} ${
        isLight
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/80 shadow-xs'
          : 'bg-[#0B0D16]/90 hover:bg-[#121624] text-amber-300 border border-white/10 hover:border-amber-400/40 shadow-2xs'
      } ${className}`}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-indigo-600"
          >
            <Moon className={iconSizes[size]} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-amber-400 group-hover:text-amber-300"
          >
            <Sun className={iconSizes[size]} />
          </motion.div>
        )}
      </AnimatePresence>

      {showLabel && (
        <span className={`font-tech font-bold uppercase tracking-wider text-[11px] ${
          isLight ? 'text-slate-700' : 'text-slate-300'
        }`}>
          {isLight ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
