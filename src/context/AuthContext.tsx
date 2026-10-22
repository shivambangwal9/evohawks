import React, { useState, useEffect, useCallback } from 'react';
import type { 
  UserRole, 
  User, 
  StaffMember,
  ManagedProject,
  LoginResult
} from './authTypes';
import { AuthContext } from './authContextInstance';
import { generateSecureToken, sanitizeInput, isValidEmail } from '../utils/security';

// Default agency production projects
const INITIAL_PROJECTS: ManagedProject[] = [
  {
    id: 'proj-hyperion-1',
    title: 'Hyperion FinTech Platform Architecture',
    clientName: 'Hyperion Capital',
    clientEmail: 'client@hyperion.com',
    clientPassword: 'Client@Evo2026',
    category: 'Websites',
    status: 'In Progress',
    progress: 75,
    budget: '₹85,000',
    startDate: '2026-08-15',
    deadline: '2026-10-15',
    leadStrategist: 'Aryan Sharma (Tech Lead)',
    deliverables: [
      { id: 'd-1', title: 'Interactive High-Performance UI Kit', completed: true },
      { id: 'd-2', title: 'Biometric Web Auth & Security Guardrails', completed: true },
      { id: 'd-3', title: 'Live Interactive Portfolio Chart Component', completed: true },
      { id: 'd-4', title: 'Production Edge CDN & Cache Deployment', completed: false }
    ],
    milestones: [
      { step: '01', title: 'Discovery & Financial Compliance Blueprint', date: 'Aug 18', status: 'completed' },
      { step: '02', title: 'High-Speed Component Architecture', date: 'Aug 26', status: 'completed' },
      { step: '03', title: 'API Integration & Dynamic Charts', date: 'Sep 05', status: 'current' },
      { step: '04', title: 'Pre-Launch QA Audit & Deployment', date: 'Oct 15', status: 'upcoming' }
    ],
    notes: 'Primary FinTech stack sprint with strict compliance and edge caching verification.'
  },
  {
    id: 'proj-verve-2',
    title: 'Verve Streetwear Vertical Video & Lookbook Sprint',
    clientName: 'Verve Apparel Co.',
    clientEmail: 'team@vervestreetwear.com',
    clientPassword: 'Client@Evo2026',
    category: 'Video',
    status: 'Review',
    progress: 90,
    budget: '₹55,000',
    startDate: '2026-08-22',
    deadline: '2026-10-08',
    leadStrategist: 'Priya Mehta (Creative Director)',
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
      { step: '04', title: 'Campaign Deployment & Asset Handover', date: 'Oct 08', status: 'current' }
    ],
    notes: 'High-tempo vertical storytelling campaign across Reels and TikTok.'
  },
  {
    id: 'proj-lumina-3',
    title: 'Lumina Skin Science SEO & Search Architecture',
    clientName: 'Lumina Wellness',
    clientEmail: 'contact@luminascience.com',
    clientPassword: 'Client@Evo2026',
    category: 'Marketing',
    status: 'In Progress',
    progress: 60,
    budget: '₹40,000',
    startDate: '2026-08-28',
    deadline: '2026-10-28',
    leadStrategist: 'Sneha Nair (Growth Lead)',
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
      { step: '04', title: 'Performance Review & Optimization', date: 'Oct 28', status: 'upcoming' }
    ],
    notes: 'Organic search domination and technical SEO architecture sprint.'
  }
];

// Initial pre-configured staff members roster
const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-aryan-1',
    name: 'Aryan Sharma',
    email: 'aryan@evohawks.tech',
    password: 'Staff@Evo2026',
    role: 'admin',
    title: 'Head of Technology & Ops',
    department: 'Engineering',
    status: 'active',
    createdAt: '2026-01-10',
    lastActive: 'Just now'
  },
  {
    id: 'staff-priya-2',
    name: 'Priya Mehta',
    email: 'priya@evohawks.tech',
    password: 'Staff@Evo2026',
    role: 'staff',
    title: 'Creative & Visual Director',
    department: 'Design',
    status: 'active',
    createdAt: '2026-01-15',
    lastActive: '2 hours ago'
  },
  {
    id: 'staff-kabir-3',
    name: 'Kabir Verma',
    email: 'kabir@evohawks.tech',
    password: 'Staff@Evo2026',
    role: 'staff',
    title: 'Lead Motion & Video Editor',
    department: 'Video',
    status: 'active',
    createdAt: '2026-02-01',
    lastActive: 'Yesterday'
  },
  {
    id: 'staff-sneha-4',
    name: 'Sneha Nair',
    email: 'sneha@evohawks.tech',
    password: 'Staff@Evo2026',
    role: 'staff',
    title: 'Growth & SEO Strategist',
    department: 'Marketing',
    status: 'active',
    createdAt: '2026-02-12',
    lastActive: '3 days ago'
  }
];

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION_MS = 4 * 60 * 60 * 1000; // 4 hours

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current authenticated user session
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('evohawks_secure_user');
      if (!saved) return null;
      const parsed: User = JSON.parse(saved);
      // Validate session expiration
      if (parsed.sessionExpiresAt && Date.now() > parsed.sessionExpiresAt) {
        localStorage.removeItem('evohawks_secure_user');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  // Client projects state
  const [projects, setProjects] = useState<ManagedProject[]>(() => {
    try {
      const saved = localStorage.getItem('evohawks_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Staff members roster state
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem('evohawks_staff_members');
      return saved ? JSON.parse(saved) : INITIAL_STAFF;
    } catch {
      return INITIAL_STAFF;
    }
  });

  // Rate-limiting / brute-force protection state
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('evohawks_auth_failures');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [lockedUntil, setLockedUntil] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('evohawks_auth_lockout');
      if (!saved) return null;
      const lockoutTime = parseInt(saved, 10);
      if (Date.now() > lockoutTime) {
        localStorage.removeItem('evohawks_auth_lockout');
        localStorage.removeItem('evohawks_auth_failures');
        return null;
      }
      return lockoutTime;
    } catch {
      return null;
    }
  });

  // Persist session to local storage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('evohawks_secure_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('evohawks_secure_user');
      }
    } catch {
      // Storage unavailable
    }
  }, [user]);

  // Persist projects to local storage
  useEffect(() => {
    try {
      localStorage.setItem('evohawks_projects', JSON.stringify(projects));
    } catch {
      // Storage unavailable
    }
  }, [projects]);

  // Persist staff members to local storage
  useEffect(() => {
    try {
      localStorage.setItem('evohawks_staff_members', JSON.stringify(staffMembers));
    } catch {
      // Storage unavailable
    }
  }, [staffMembers]);

  // Session activity watchdog: automatically logs out if session expired
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.sessionExpiresAt && Date.now() > user.sessionExpiresAt) {
        setUser(null);
        localStorage.removeItem('evohawks_secure_user');
      }

      // Check lockout expiration
      if (lockedUntil && Date.now() > lockedUntil) {
        setLockedUntil(null);
        setFailedAttempts(0);
        localStorage.removeItem('evohawks_auth_lockout');
        localStorage.removeItem('evohawks_auth_failures');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [user, lockedUntil]);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('evohawks_secure_user');
    } catch {
      // Storage unavailable
    }
  }, []);

  const resetLockout = useCallback(() => {
    setFailedAttempts(0);
    setLockedUntil(null);
    try {
      localStorage.removeItem('evohawks_auth_lockout');
      localStorage.removeItem('evohawks_auth_failures');
    } catch {
      // Storage unavailable
    }
  }, []);

  const recordFailedAttempt = useCallback(() => {
    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);
    try {
      localStorage.setItem('evohawks_auth_failures', nextAttempts.toString());
    } catch {
      // Storage unavailable
    }

    if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockoutEnd = Date.now() + LOCKOUT_DURATION_MS;
      setLockedUntil(lockoutEnd);
      try {
        localStorage.setItem('evohawks_auth_lockout', lockoutEnd.toString());
      } catch {
        // Storage unavailable
      }
    }
  }, [failedAttempts]);

  /**
   * Secure Login Handler
   * 
   * Strict verification rules:
   * 1. Super Admin: username/email matches 'teamevohawks' or 'teamevohawks@gmail.com' (case-insensitive)
   *    and password strictly matches 'Evohawks@84391'.
   * 2. Staff Admin: email matches a registered staff member, password matches, and status is 'active'.
   * 3. Client Portal: email matches a client project and client password matches.
   * 4. Brute force lockouts trigger after 5 consecutive failures.
   */
  const login = (rawEmail: string, rawPassword: string, role: UserRole): LoginResult => {
    // 1. Check if currently in lockout cooldown
    if (lockedUntil && Date.now() < lockedUntil) {
      const remainingMinutes = Math.ceil((lockedUntil - Date.now()) / (60 * 1000));
      return {
        success: false,
        error: `Security Lockout Active: Too many failed login attempts. Please wait ${remainingMinutes} minute(s) before trying again.`,
        lockedUntil
      };
    }

    const email = sanitizeInput(rawEmail).toLowerCase();
    const password = rawPassword ? rawPassword.trim() : '';

    if (!email || !password) {
      recordFailedAttempt();
      return {
        success: false,
        error: 'Please provide both username/email and password.'
      };
    }

    // ==============================================================
    // A. SUPER ADMIN AUTHENTICATION
    // ==============================================================
    if (role === 'superadmin') {
      const isSuperAdminEmail = 
        email === 'teamevohawks' || 
        email === 'teamevohawks@gmail.com' || 
        email === 'teamevohawks@evohawks.tech';
      
      const isSuperAdminPassword = password === 'Evohawks@84391';

      if (isSuperAdminEmail && isSuperAdminPassword) {
        resetLockout();
        const sessionToken = generateSecureToken(32);
        const expiresAt = Date.now() + SESSION_DURATION_MS;

        setUser({
          id: 'root-superadmin-001',
          name: 'Team Evo Hawks (Root)',
          email: 'teamevohawks@gmail.com',
          role: 'superadmin',
          company: 'Evo Hawks Root Authority',
          title: 'Master Administrator',
          department: 'Executive',
          sessionToken,
          loginTime: Date.now(),
          sessionExpiresAt: expiresAt,
          isDemoAccount: false
        });
        return { success: true };
      } else {
        recordFailedAttempt();
        return {
          success: false,
          error: 'Invalid Super Admin credentials. Ensure username is "teamevohawks" and password is correct.'
        };
      }
    }

    // ==============================================================
    // B. AGENCY STAFF AUTHENTICATION
    // ==============================================================
    if (role === 'admin') {
      // Allow superadmin to log in as admin
      if (
        (email === 'teamevohawks' || email === 'teamevohawks@gmail.com') && 
        password === 'Evohawks@84391'
      ) {
        resetLockout();
        const sessionToken = generateSecureToken(32);
        setUser({
          id: 'root-superadmin-001',
          name: 'Team Evo Hawks (Root)',
          email: 'teamevohawks@gmail.com',
          role: 'superadmin',
          company: 'Evo Hawks Agency',
          title: 'Master Administrator',
          sessionToken,
          loginTime: Date.now(),
          sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
          isDemoAccount: false
        });
        return { success: true };
      }

      // Check registered staff roster
      const staff = staffMembers.find(s => s.email.toLowerCase() === email);

      if (!staff) {
        recordFailedAttempt();
        return {
          success: false,
          error: 'Staff account not found. Please contact your Super Administrator.'
        };
      }

      if (staff.status === 'suspended') {
        return {
          success: false,
          error: 'This staff account has been suspended by the Super Administrator.'
        };
      }

      if (staff.password && staff.password !== password) {
        recordFailedAttempt();
        return {
          success: false,
          error: 'Incorrect staff password. Please check your credentials.'
        };
      }

      // Successful staff login
      resetLockout();
      const sessionToken = generateSecureToken(32);
      setUser({
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: 'admin',
        title: staff.title,
        department: staff.department,
        company: 'Evo Hawks Agency',
        sessionToken,
        loginTime: Date.now(),
        sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
        isDemoAccount: false
      });

      // Update staff lastActive
      setStaffMembers(prev => prev.map(s => s.id === staff.id ? { ...s, lastActive: 'Just now' } : s));
      return { success: true };
    }

    // ==============================================================
    // C. CLIENT PORTAL AUTHENTICATION
    // ==============================================================
    if (role === 'client') {
      const matchedProject = projects.find(p => p.clientEmail.toLowerCase() === email);
      const validClientPassword = matchedProject?.clientPassword || 'Client@Evo2026';

      if (matchedProject && password === validClientPassword) {
        resetLockout();
        const sessionToken = generateSecureToken(32);
        setUser({
          id: `client-${matchedProject.id}`,
          name: matchedProject.clientName,
          email: matchedProject.clientEmail,
          role: 'client',
          company: matchedProject.clientName,
          sessionToken,
          loginTime: Date.now(),
          sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
          isDemoAccount: false
        });
        return { success: true };
      } else {
        recordFailedAttempt();
        return {
          success: false,
          error: 'Client portal credentials not recognized. Please use your project email and password.'
        };
      }
    }

    return { success: false, error: 'Unrecognized user role requested.' };
  };

  // Staff Management (Super Admin only)
  const addStaffMember = (staffData: Omit<StaffMember, 'id' | 'createdAt'>): { success: boolean; error?: string } => {
    if (!isValidEmail(staffData.email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const emailExists = staffMembers.some(s => s.email.toLowerCase() === staffData.email.toLowerCase());
    if (emailExists) {
      return { success: false, error: 'A staff member with this email already exists.' };
    }

    const newStaff: StaffMember = {
      ...staffData,
      name: sanitizeInput(staffData.name),
      email: staffData.email.trim().toLowerCase(),
      id: `staff-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Never'
    };

    setStaffMembers(prev => [newStaff, ...prev]);
    return { success: true };
  };

  const updateStaffMember = (id: string, updates: Partial<StaffMember>) => {
    setStaffMembers(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          ...updates,
          name: updates.name ? sanitizeInput(updates.name) : s.name
        };
      }
      return s;
    }));
  };

  const deleteStaffMember = (id: string): { success: boolean; error?: string } => {
    setStaffMembers(prev => prev.filter(s => s.id !== id));
    return { success: true };
  };

  // Project Management
  const createProject = (projectData: Omit<ManagedProject, 'id'>) => {
    const newProject: ManagedProject = {
      ...projectData,
      title: sanitizeInput(projectData.title),
      clientName: sanitizeInput(projectData.clientName),
      id: `proj-${Date.now()}`,
      clientPassword: projectData.clientPassword || 'Client@Evo2026'
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<ManagedProject>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updates,
          title: updates.title ? sanitizeInput(updates.title) : p.title,
          clientName: updates.clientName ? sanitizeInput(updates.clientName) : p.clientName
        };
      }
      return p;
    }));
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
        staffMembers,
        isProductionBackendConnected: false,
        login,
        logout,
        addStaffMember,
        updateStaffMember,
        deleteStaffMember,
        createProject,
        updateProject,
        deleteProject,
        updateProjectStatus,
        toggleDeliverable,
        failedAttempts,
        lockedUntil,
        resetLockout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
