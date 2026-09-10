import { useState, useEffect, useCallback } from 'react';

export type PageId = 
  | 'home' 
  | 'services' 
  | 'work' 
  | 'why-us' 
  | 'about' 
  | 'process' 
  | 'faq' 
  | 'contact'
  | 'login'
  | 'client-portal'
  | 'admin-portal';

export const VALID_PAGES: PageId[] = [
  'home',
  'services',
  'work',
  'why-us',
  'about',
  'process',
  'faq',
  'contact',
  'login',
  'client-portal',
  'admin-portal',
];

export function usePageRouter() {
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (VALID_PAGES.includes(hash as PageId)) {
      return hash as PageId;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);

  const navigateTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return {
    currentPage,
    navigateTo,
  };
}
