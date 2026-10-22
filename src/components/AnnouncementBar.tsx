import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import type { PageId } from '../hooks/usePageRouter';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigate: (page: PageId) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigate }) => {
  const { siteConfig } = useSiteConfig();

  if (!siteConfig.announcementEnabled || !siteConfig.announcementText) {
    return null;
  }

  const handleClick = () => {
    if (siteConfig.announcementLinkUrl) {
      onNavigate(siteConfig.announcementLinkUrl as PageId);
    }
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#FF1361]/90 via-[#8B5CF6]/90 to-[#0099FF]/90 text-white py-1.5 px-3 text-[11px] sm:text-xs font-tech font-semibold text-center flex items-center justify-center gap-2 shadow-[0_2px_15px_rgba(255,19,97,0.3)]">
      <span className="flex items-center gap-1.5 truncate">
        <Sparkles className="w-3 h-3 text-amber-300 shrink-0 animate-pulse" />
        <span className="truncate">{siteConfig.announcementText}</span>
      </span>

      {siteConfig.announcementLinkText && (
        <button
          onClick={handleClick}
          className="underline decoration-white/50 hover:decoration-white font-bold cursor-pointer shrink-0 flex items-center gap-0.5 ml-1 transition-opacity hover:opacity-90"
        >
          <span>{siteConfig.announcementLinkText.replace('&rarr;', '')}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
