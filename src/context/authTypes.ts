/**
 * Authentication and Project Types for Evo Hawks
 * 
 * Note: This frontend portal is currently structured as an architectural prototype
 * and demonstration sandbox. In production, authentication and authorization
 * must be verified via a secure backend (e.g., Supabase Auth or a server-side session API).
 */

export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
  isDemoAccount?: boolean;
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
  isDemoSpecimen?: boolean;
}

export interface AuthContextType {
  user: User | null;
  projects: ManagedProject[];
  isProductionBackendConnected: boolean;
  login: (email: string, password: string, role: UserRole) => boolean;
  demoLogin: (role: UserRole) => void;
  logout: () => void;
  createProject: (project: Omit<ManagedProject, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ManagedProject>) => void;
  deleteProject: (id: string) => void;
  updateProjectStatus: (id: string, status: ManagedProject['status']) => void;
  toggleDeliverable: (projectId: string, deliverableId: string) => void;
}
