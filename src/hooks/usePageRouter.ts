import { useState, useEffect, useCallback } from 'react';

export type PageId = 
  | 'home' 
  | 'services' 
  | 'service-detail'
  | 'portfolio' 
  | 'work' // Legacy alias for portfolio
  | 'case-study-detail'
  | 'packages'
  | 'start-project'
  | 'why-us' 
  | 'about' 
  | 'process' 
  | 'faq' 
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'refund-policy'
  | 'login'
  | 'client-portal'
  | 'admin-portal';

export interface RouteState {
  page: PageId;
  slug?: string;
}

export function parseRouteFromHash(): RouteState {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  
  if (!hash) {
    return { page: 'home' };
  }

  const parts = hash.split('/').filter(Boolean);
  const root = parts[0];
  const subSlug = parts[1];

  if (root === 'services') {
    if (subSlug) {
      return { page: 'service-detail', slug: subSlug };
    }
    return { page: 'services' };
  }

  if (root === 'portfolio' || root === 'work') {
    if (subSlug) {
      return { page: 'case-study-detail', slug: subSlug };
    }
    return { page: 'portfolio' };
  }

  if (root === 'packages' || root === 'pricing') {
    return { page: 'packages' };
  }

  if (root === 'start-project' || root === 'startproject' || root === 'get-started') {
    return { page: 'start-project' };
  }

  if (root === 'privacy-policy' || root === 'privacy') {
    return { page: 'privacy-policy' };
  }

  if (root === 'terms' || root === 'terms-of-service') {
    return { page: 'terms' };
  }

  if (root === 'refund-policy' || root === 'cancellation-policy') {
    return { page: 'refund-policy' };
  }

  if (root === 'why-us' || root === 'whyus') {
    return { page: 'why-us' };
  }

  if (root === 'about') {
    return { page: 'about' };
  }

  if (root === 'process') {
    return { page: 'process' };
  }

  if (root === 'faq') {
    return { page: 'faq' };
  }

  if (root === 'contact') {
    return { page: 'contact' };
  }

  if (root === 'login') {
    return { page: 'login' };
  }

  if (root === 'client-portal') {
    return { page: 'client-portal' };
  }

  if (root === 'admin-portal') {
    return { page: 'admin-portal' };
  }

  return { page: 'home' };
}

export function usePageRouter() {
  const [route, setRoute] = useState<RouteState>(parseRouteFromHash);

  const navigateTo = useCallback((page: PageId, slug?: string) => {
    let targetHash = page as string;

    if (page === 'service-detail' && slug) {
      targetHash = `services/${slug}`;
    } else if (page === 'case-study-detail' && slug) {
      targetHash = `portfolio/${slug}`;
    } else if (page === 'work') {
      targetHash = 'portfolio';
    }

    setRoute({
      page: page === 'work' ? 'portfolio' : page,
      slug
    });

    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = parseRouteFromHash();
      setRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return {
    currentPage: route.page,
    currentSlug: route.slug,
    navigateTo,
  };
}
