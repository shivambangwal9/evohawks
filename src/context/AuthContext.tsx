import React, { useState, useEffect } from 'react';
import type { 
  UserRole, 
  User, 
  ManagedProject 
} from './authTypes';
import { AuthContext } from './authContextInstance';

/**
 * ARCHITECTURAL NOTICE — PROTOTYPE PORTAL CONTEXT
 * 
 * This authentication context provides an interactive demo simulation of Evo Hawks'
 * client and agency dashboard.
 * 
 * PRODUCTION REQUIREMENTS:
 * To deploy real authentication and client access control:
 * 1. Connect a managed authentication service (e.g., Supabase Auth, Firebase Auth, Clerk, or AWS Cognito).
 * 2. Implement Row-Level Security (RLS) on PostgreSQL so client accounts can strictly view their own project records.
 * 3. Never store admin secrets, service roles, or unencrypted passwords in the browser.
 * 4. Use HttpOnly cookies or secure token rotation for session management.
 */

const DEMO_PROJECTS: ManagedProject[] = [
  {
    id: 'demo-proj-1',
    title: '[DEMO SPECIMEN] Hyperion FinTech Platform Architecture',
    clientName: 'Demo Client Partner',
    clientEmail: 'demo-client@specimen.evohawks.tech',
    category: 'Websites',
    status: 'In Progress',
    progress: 75,
    budget: '₹85,000 (Sample Scope)',
    startDate: '2026-08-15',
    deadline: '2026-09-15',
    leadStrategist: 'Engineering Lead (Evo Hawks)',
    deliverables: [
      { id: 'd-1', title: 'Interactive Tailwind 4 & Framer Motion UI Kit', completed: true },
      { id: 'd-2', title: 'Biometric Web Auth & Security Guardrails Prototype', completed: true },
      { id: 'd-3', title: 'Live Interactive Portfolio Chart Component', completed: true },
      { id: 'd-4', title: 'Production Edge CDN & Cache Deployment', completed: false }
    ],
    milestones: [
      { step: '01', title: 'Discovery & Financial Compliance Blueprint', date: 'Aug 18', status: 'completed' },
      { step: '02', title: 'High-Speed Component Architecture', date: 'Aug 26', status: 'completed' },
      { step: '03', title: 'API Integration & Dynamic Charts', date: 'Sep 05', status: 'current' },
      { step: '04', title: 'Pre-Launch QA Audit & Deployment', date: 'Sep 15', status: 'upcoming' }
    ],
    notes: 'DEMO SPECIMEN DATA: This mock record demonstrates the sprint milestone tracker and deliverable sign-off UI.',
    isDemoSpecimen: true
  },
  {
    id: 'demo-proj-2',
    title: '[DEMO SPECIMEN] Verve Streetwear Vertical Video & Lookbook Sprint',
    clientName: 'Demo Brand Lead',
    clientEmail: 'demo-brand@specimen.evohawks.tech',
    category: 'Video',
    status: 'Review',
    progress: 90,
    budget: '₹55,000 (Sample Scope)',
    startDate: '2026-08-22',
    deadline: '2026-09-08',
    leadStrategist: 'Creative Director (Evo Hawks)',
    deliverables: [
      { id: 'd-5', title: '15 High-Tempo 9:16 Vertical Cuts in 4K', completed: true },
      { id: 'd-6', title: 'Custom Sound Design & Audio Sync', completed: true },
      { id: 'd-7', title: 'Social Feed Aesthetic & Grid Strategy', completed: true },
      { id: 'd-8', title: 'Final Client Sign-off on Drop Teasers', completed: false }
    ],
    milestones: [
      { step: '01', title: 'Moodboard & Visual Narrative Arc', date: 'Aug 24', status: 'completed' },
      { step: '02', title: 'Batch Filming & Audio Engineering', date: 'Aug 30', status: 'completed' },
      { step: '03', title: 'Motion Graphics & Color Grading', date: 'Sep 03', status: 'completed' },
      { step: '04', title: 'Campaign Deployment & Asset Handover', date: 'Sep 08', status: 'current' }
    ],
    notes: 'DEMO SPECIMEN DATA: Demonstrates media production deliverable tracking and video review workflows.',
    isDemoSpecimen: true
  },
  {
    id: 'demo-proj-3',
    title: '[DEMO SPECIMEN] Lumina Skin Science SEO & Search Architecture',
    clientName: 'Demo Growth Partner',
    clientEmail: 'demo-growth@specimen.evohawks.tech',
    category: 'Marketing',
    status: 'In Progress',
    progress: 60,
    budget: '₹40,000 (Sample Scope)',
    startDate: '2026-08-28',
    deadline: '2026-09-28',
    leadStrategist: 'Growth Strategist (Evo Hawks)',
    deliverables: [
      { id: 'd-9', title: 'Comprehensive SEO Technical Audit & Core Web Vitals Fix', completed: true },
      { id: 'd-10', title: 'Meta Ads Creative Asset Pack (20 variants)', completed: true },
      { id: 'd-11', title: 'Google Search High-Intent Retargeting Funnel', completed: false },
      { id: 'd-12', title: 'Conversion Tracking & Analytics Verification', completed: false }
    ],
    milestones: [
      { step: '01', title: 'Customer Persona & Competitor Funnel Audit', date: 'Sep 01', status: 'completed' },
      { step: '02', title: 'Keyword Mapping & Landing Page Optimization', date: 'Sep 10', status: 'current' },
      { step: '03', title: 'Ad Creative Deployment & Pixel Check', date: 'Sep 18', status: 'upcoming' },
      { step: '04', title: 'Performance Review & Optimization', date: 'Sep 28', status: 'upcoming' }
    ],
    notes: 'DEMO SPECIMEN DATA: Demonstrates multi-channel campaign deliverable tracking and keyword mapping milestones.',
    isDemoSpecimen: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('evohawks_demo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [projects, setProjects] = useState<ManagedProject[]>(() => {
    try {
      const saved = localStorage.getItem('evohawks_demo_projects');
      return saved ? JSON.parse(saved) : DEMO_PROJECTS;
    } catch {
      return DEMO_PROJECTS;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('evohawks_demo_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('evohawks_demo_user');
      }
    } catch {
      // Storage unavailable
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('evohawks_demo_projects', JSON.stringify(projects));
    } catch {
      // Storage unavailable
    }
  }, [projects]);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    // Note: Browser-only demo simulation. Clearly flagged as a demo session.
    if (role === 'admin') {
      setUser({
        id: 'demo-admin-1',
        name: 'Agency Lead (Demo)',
        email: email || 'teamevohawks@gmail.com',
        role: 'admin',
        company: 'Evo Hawks Agency (Demo)',
        isDemoAccount: true
      });
      return true;
    } else {
      setUser({
        id: 'demo-client-1',
        name: 'Client Partner (Demo)',
        email: email || 'demo-client@specimen.evohawks.tech',
        role: 'client',
        company: 'Hyperion FinTech (Demo)',
        isDemoAccount: true
      });
      return true;
    }
  };

  const demoLogin = (role: UserRole) => {
    if (role === 'admin') {
      setUser({
        id: 'demo-admin-1',
        name: 'Agency Lead (Demo)',
        email: 'teamevohawks@gmail.com',
        role: 'admin',
        company: 'Evo Hawks Agency (Demo)',
        isDemoAccount: true
      });
    } else {
      setUser({
        id: 'demo-client-1',
        name: 'Client Partner (Demo)',
        email: 'demo-client@specimen.evohawks.tech',
        role: 'client',
        company: 'Hyperion FinTech (Demo)',
        isDemoAccount: true
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const createProject = (projectData: Omit<ManagedProject, 'id'>) => {
    const newProject: ManagedProject = {
      ...projectData,
      id: `demo-proj-${Date.now()}`,
      isDemoSpecimen: true
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<ManagedProject>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateProjectStatus = (id: string, status: ManagedProject['status']) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        let progress = p.progress;
        if (status === 'Completed') progress = 100;
        else if (status === 'Planning' && progress > 25) progress = 20;
        return { ...p, status, progress };
      }
      return p;
    }));
  };

  const toggleDeliverable = (projectId: string, deliverableId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updated = p.deliverables.map(d => 
          d.id === deliverableId ? { ...d, completed: !d.completed } : d
        );
        const total = updated.length;
        const completedCount = updated.filter(d => d.completed).length;
        const newProgress = total > 0 ? Math.round((completedCount / total) * 100) : p.progress;
        return { 
          ...p, 
          deliverables: updated, 
          progress: newProgress,
          status: newProgress === 100 ? 'Completed' : p.status === 'Completed' ? 'Review' : p.status
        };
      }
      return p;
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        projects,
        isProductionBackendConnected: false,
        login,
        demoLogin,
        logout,
        createProject,
        updateProject,
        deleteProject,
        updateProjectStatus,
        toggleDeliverable
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
