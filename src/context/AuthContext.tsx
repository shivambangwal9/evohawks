import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  completed: boolean;
  link?: string;
}

export interface ProjectMilestone {
  step: string;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface ManagedProject {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  category: 'Websites' | 'Design' | 'Video' | 'Social' | 'Marketing';
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed';
  progress: number; // 0 - 100
  budget: string;
  startDate: string;
  deadline: string;
  leadStrategist: string;
  deliverables: ProjectDeliverable[];
  milestones: ProjectMilestone[];
  notes?: string;
}

interface AuthContextType {
  user: User | null;
  projects: ManagedProject[];
  login: (email: string, password: string, role: UserRole) => boolean;
  demoLogin: (role: UserRole) => void;
  logout: () => void;
  createProject: (project: Omit<ManagedProject, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ManagedProject>) => void;
  deleteProject: (id: string) => void;
  updateProjectStatus: (id: string, status: ManagedProject['status']) => void;
  toggleDeliverable: (projectId: string, deliverableId: string) => void;
}

const INITIAL_PROJECTS: ManagedProject[] = [
  {
    id: 'proj-1',
    title: 'Hyperion FinTech Next.js 15 Platform',
    clientName: 'Rahul Verma',
    clientEmail: 'client@hyperion.com',
    category: 'Websites',
    status: 'In Progress',
    progress: 75,
    budget: '₹85,000',
    startDate: '2026-08-15',
    deadline: '2026-09-15',
    leadStrategist: 'Aryan (Head of Tech)',
    deliverables: [
      { id: 'd-1', title: 'Interactive Tailwind 4 & Framer Motion UI Kit', completed: true, link: 'https://github.com/evohawks/hyperion-ui' },
      { id: 'd-2', title: 'Biometric Web Auth & Security Guardrails', completed: true, link: 'https://staging.hyperion.evohawks.com/auth' },
      { id: 'd-3', title: 'Live Interactive Portfolio Chart System', completed: true, link: 'https://staging.hyperion.evohawks.com/analytics' },
      { id: 'd-4', title: 'Production Docker Container & Edge CDN Setup', completed: false }
    ],
    milestones: [
      { step: '01', title: 'Discovery & Financial Compliance Blueprint', date: 'Aug 18', status: 'completed' },
      { step: '02', title: 'High-Speed Component Architecture', date: 'Aug 26', status: 'completed' },
      { step: '03', title: 'API Integration & Real-time WebSockets', date: 'Sep 05', status: 'current' },
      { step: '04', title: 'QA Penetration Testing & Global Launch', date: 'Sep 15', status: 'upcoming' }
    ],
    notes: 'Client requested rush delivery. Sub-second latency target on all neo-banking chart routes verified.'
  },
  {
    id: 'proj-2',
    title: 'Verve Streetwear Viral Reels & Brand Drop',
    clientName: 'Aanya Sen',
    clientEmail: 'aanya@vervestudios.com',
    category: 'Video',
    status: 'Review',
    progress: 90,
    budget: '₹55,000',
    startDate: '2026-08-22',
    deadline: '2026-09-08',
    leadStrategist: 'Kunal (Creative Director)',
    deliverables: [
      { id: 'd-5', title: '15 Viral 9:16 Vertical Cuts in 4K Cinema', completed: true, link: 'https://drive.google.com/verve-cuts' },
      { id: 'd-6', title: 'Custom Sound Design & Trending Audio Sync', completed: true },
      { id: 'd-7', title: 'Instagram Feed Aesthetics & Grid Layout Strategy', completed: true },
      { id: 'd-8', title: 'Final Client Sign-off on Drop Teasers', completed: false }
    ],
    milestones: [
      { step: '01', title: 'Moodboard & Visual Narrative Arc', date: 'Aug 24', status: 'completed' },
      { step: '02', title: 'Batch Filming & Audio Engineering', date: 'Aug 30', status: 'completed' },
      { step: '03', title: 'Motion Graphics Color Grading', date: 'Sep 03', status: 'completed' },
      { step: '04', title: 'Multi-Channel Campaign Ignition', date: 'Sep 08', status: 'current' }
    ],
    notes: 'Reels retention target set at 80%+. First batch preview received rave reviews from client marketing team.'
  },
  {
    id: 'proj-3',
    title: 'Lumina Skin Science Performance Marketing & SEO',
    clientName: 'Vikram Mehta',
    clientEmail: 'vikram@luminascience.com',
    category: 'Marketing',
    status: 'In Progress',
    progress: 60,
    budget: '₹40,000',
    startDate: '2026-08-28',
    deadline: '2026-09-28',
    leadStrategist: 'Neha (Lead Growth Strategist)',
    deliverables: [
      { id: 'd-9', title: 'Comprehensive SEO Technical Audit & Core Web Vitals Fix', completed: true },
      { id: 'd-10', title: 'High-Converting Meta Ads Creative Pack (20 variants)', completed: true, link: 'https://figma.com/lumina-ads' },
      { id: 'd-11', title: 'Google Search High-Intent Retargeting Funnel', completed: false },
      { id: 'd-12', title: 'Weekly ROAS & Conversion Performance Dashboard', completed: false }
    ],
    milestones: [
      { step: '01', title: 'Customer Persona & Competitor Funnel Audit', date: 'Sep 01', status: 'completed' },
      { step: '02', title: 'Keyword Mapping & Landing Page Optimization', date: 'Sep 10', status: 'current' },
      { step: '03', title: 'Meta & Google A/B Test Launch', date: 'Sep 18', status: 'upcoming' },
      { step: '04', title: 'Scale to 4.5x Target ROAS', date: 'Sep 28', status: 'upcoming' }
    ],
    notes: 'Initial test campaign showed 3.8x ROAS within first 72 hours of ad spend.'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('evohawks_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [projects, setProjects] = useState<ManagedProject[]>(() => {
    const saved = localStorage.getItem('evohawks_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('evohawks_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('evohawks_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('evohawks_projects', JSON.stringify(projects));
  }, [projects]);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    if (role === 'admin') {
      setUser({
        id: 'usr-admin-1',
        name: 'Siddharth Nair',
        email: email || 'teamevohawks@gmail.com',
        role: 'admin',
        company: 'Evo Hawks Executive'
      });
      return true;
    } else {
      setUser({
        id: 'usr-client-1',
        name: 'Rahul Verma',
        email: email || 'client@hyperion.com',
        role: 'client',
        company: 'Hyperion FinTech'
      });
      return true;
    }
  };

  const demoLogin = (role: UserRole) => {
    if (role === 'admin') {
      setUser({
        id: 'usr-admin-1',
        name: 'Siddharth Nair',
        email: 'teamevohawks@gmail.com',
        role: 'admin',
        company: 'Evo Hawks Executive'
      });
    } else {
      setUser({
        id: 'usr-client-1',
        name: 'Rahul Verma',
        email: 'client@hyperion.com',
        role: 'client',
        company: 'Hyperion FinTech'
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const createProject = (projectData: Omit<ManagedProject, 'id'>) => {
    const newProject: ManagedProject = {
      ...projectData,
      id: `proj-${Date.now()}`
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
