/**
 * Authentication, Staff Roster, and Security Types for Evo Hawks
 */

export type UserRole = 'superadmin' | 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
  title?: string;
  department?: string;
  sessionToken?: string;
  loginTime?: number;
  sessionExpiresAt?: number;
  isDemoAccount?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'staff';
  title: string;
  department: 'Engineering' | 'Design' | 'Video' | 'Marketing' | 'Operations';
  status: 'active' | 'suspended';
  createdAt: string;
  lastActive?: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
  lockedUntil?: number | null;
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
  clientPassword?: string;
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
  staffMembers: StaffMember[];
  isProductionBackendConnected: boolean;
  login: (email: string, password: string, role: UserRole) => LoginResult;
  logout: () => void;
  // Staff Management (Super Admin Control)
  addStaffMember: (staff: Omit<StaffMember, 'id' | 'createdAt'>) => { success: boolean; error?: string };
  updateStaffMember: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaffMember: (id: string) => { success: boolean; error?: string };
  // Project Management
  createProject: (project: Omit<ManagedProject, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ManagedProject>) => void;
  deleteProject: (id: string) => void;
  updateProjectStatus: (id: string, status: ManagedProject['status']) => void;
  toggleDeliverable: (projectId: string, deliverableId: string) => void;
  // Security State
  failedAttempts: number;
  lockedUntil: number | null;
  resetLockout: () => void;
}
