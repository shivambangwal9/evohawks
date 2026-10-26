import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useSiteConfig } from '../context/SiteConfigContext';
import type { ManagedProject, StaffMember } from '../context/authTypes';
import type { PortfolioItem } from '../data/agencyData';
import { PostPortfolioModal } from '../components/PostPortfolioModal';
import { generateStrongPassword } from '../utils/security';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Briefcase, 
  X, 
  Save, 
  Sliders, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Phone, 
  RotateCcw, 
  Download, 
  Eye, 
  Tag,
  Users,
  UserPlus,
  KeyRound,
  Check,
  Copy,
  Lock,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import type { PageId } from '../hooks/usePageRouter';

interface AdminDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { 
    user, 
    projects, 
    staffMembers,
    logout, 
    createProject, 
    updateProject, 
    deleteProject,
    addStaffMember,
    updateStaffMember,
    deleteStaffMember
  } = useAuth();

  const { 
    siteConfig, 
    updateSiteConfig, 
    resetSiteConfig, 
    portfolioItems, 
    addPortfolioItem, 
    updatePortfolioItem, 
    deletePortfolioItem,
    resetPortfolioItems,
    exportConfigJson,
    importConfigJson
  } = useSiteConfig();

  const isSuperAdmin = user?.role === 'superadmin';

  // Primary Tab: 'customizer' | 'portfolio' | 'sprints' | 'staff'
  const [activeTab, setActiveTab] = useState<'customizer' | 'portfolio' | 'sprints' | 'staff'>('customizer');

  // Customizer Local Form State
  const [formData, setFormData] = useState(siteConfig);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importExportModal, setImportExportModal] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Portfolio Management State
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);

  // Sprint / Projects Management State
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ManagedProject | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Staff Management State
  const [staffSearch, setStaffSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [staffFormError, setStaffFormError] = useState<string | null>(null);
  const [copiedStaffId, setCopiedStaffId] = useState<string | null>(null);
  const [revealedPasswordId, setRevealedPasswordId] = useState<string | null>(null);

  // New Staff Form State
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'admin' | 'staff'>('staff');
  const [newStaffTitle, setNewStaffTitle] = useState('');
  const [newStaffDept, setNewStaffDept] = useState<StaffMember['department']>('Engineering');
  const [newStaffStatus, setNewStaffStatus] = useState<'active' | 'suspended'>('active');

  // Handle Add Staff
  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffFormError(null);

    if (!newStaffName.trim() || !newStaffEmail.trim() || !newStaffPassword.trim()) {
      setStaffFormError('Please fill in all required fields (Name, Email, Password).');
      return;
    }

    const result = addStaffMember({
      name: newStaffName.trim(),
      email: newStaffEmail.trim(),
      password: newStaffPassword.trim(),
      role: newStaffRole,
      title: newStaffTitle.trim() || (newStaffRole === 'admin' ? 'Agency Admin' : 'Staff Specialist'),
      department: newStaffDept,
      status: newStaffStatus
    });

    if (result.success) {
      setAddStaffModalOpen(false);
      setNewStaffName('');
      setNewStaffEmail('');
      setNewStaffPassword('');
      setNewStaffTitle('');
      setStaffFormError(null);
    } else {
      setStaffFormError(result.error || 'Failed to add staff member.');
    }
  };

  // Handle Edit Staff
  const handleEditStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;

    updateStaffMember(editingStaff.id, {
      name: editingStaff.name,
      email: editingStaff.email,
      password: editingStaff.password,
      role: editingStaff.role,
      title: editingStaff.title,
      department: editingStaff.department,
      status: editingStaff.status
    });

    setEditingStaff(null);
  };

  const handleCopyStaffInfo = (staff: StaffMember) => {
    navigator.clipboard.writeText(`Email: ${staff.email} | Password: ${staff.password || 'Staff@Evo2026'}`);
    setCopiedStaffId(staff.id);
    setTimeout(() => setCopiedStaffId(null), 2500);
  };

  // Filtered Staff Members
  const filteredStaff = staffMembers.filter(s => {
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    const matchesSearch = 
      s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.title.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.department.toLowerCase().includes(staffSearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Keep form data in sync if siteConfig changes externally
  React.useEffect(() => {
    setFormData(siteConfig);
  }, [siteConfig]);

  // Handle Customizer Save
  const handleSaveCustomizer = (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Sanitize URLs to avoid broken social links
    const sanitizeUrl = (url?: string) => {
      if (!url) return '';
      const trimmed = url.trim();
      if (!trimmed) return '';
      if (/^https?:\/\//i.test(trimmed)) return trimmed;
      return `https://${trimmed}`;
    };

    const sanitizedData = {
      ...formData,
      instagramUrl: sanitizeUrl(formData.instagramUrl),
      linkedinUrl: sanitizeUrl(formData.linkedinUrl),
      youtubeUrl: sanitizeUrl(formData.youtubeUrl),
      twitterUrl: sanitizeUrl(formData.twitterUrl),
      contactEmail: formData.contactEmail?.trim() || '',
      whatsappCleanNumber: formData.whatsappCleanNumber?.replace(/[^0-9]/g, '') || formData.whatsappCleanNumber,
    };

    setFormData(sanitizedData);
    updateSiteConfig(sanitizedData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  // Handle Portfolio Save
  const handleSavePortfolioItem = (itemData: Omit<PortfolioItem, 'id'> & { id?: string }) => {
    if (editingPortfolioItem && itemData.id) {
      updatePortfolioItem(itemData.id, itemData);
    } else {
      addPortfolioItem(itemData);
    }
    setEditingPortfolioItem(null);
    setPostModalOpen(false);
  };

  // Filtered Portfolio Items
  const filteredPortfolio = portfolioItems.filter(p => 
    p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
    (p.clientName && p.clientName.toLowerCase().includes(portfolioSearch.toLowerCase())) ||
    p.industry.toLowerCase().includes(portfolioSearch.toLowerCase())
  );

  // Filtered Client Sprint Projects
  const filteredProjects = projects.filter(p => selectedStatus === 'All' || p.status === selectedStatus);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProject({
      title: newTitle || 'Untitled Project',
      clientName: newClientName || 'Client Partner',
      clientEmail: newClientEmail || 'client@partner.com',
      category: 'Websites',
      status: 'In Progress',
      progress: 15,
      budget: '₹65,000',
      startDate: new Date().toISOString().split('T')[0],
      deadline: '2026-10-01',
      leadStrategist: 'Aryan (Head of Tech)',
      deliverables: [
        { id: 'd-1', title: 'Kickoff & Scope Lock', completed: true },
        { id: 'd-2', title: 'Sprint Delivery & QA', completed: false }
      ],
      milestones: [
        { step: '01', title: 'Sprint Discovery & Architecture', date: 'Week 1', status: 'completed' },
        { step: '02', title: 'Engineering & Production', date: 'Week 2', status: 'current' },
        { step: '03', title: 'Final Handover & Launch', date: 'Week 4', status: 'upcoming' }
      ],
      notes: newNotes
    });

    setCreateModalOpen(false);
    setNewTitle('');
    setNewClientName('');
    setNewClientEmail('');
    setNewNotes('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    updateProject(editingProject.id, {
      title: editingProject.title,
      clientName: editingProject.clientName,
      clientEmail: editingProject.clientEmail,
      budget: editingProject.budget,
      progress: editingProject.progress,
      status: editingProject.status,
      deadline: editingProject.deadline,
      leadStrategist: editingProject.leadStrategist,
      notes: editingProject.notes
    });
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Center Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF1361]/15 border border-[#FF1361]/30 text-xs font-tech text-[#FF2A85] font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF1361]" />
              <span>{isSuperAdmin ? 'SUPER ADMIN ROOT AUTHORITY' : 'AGENCY STAFF ADMIN'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
              Website &amp; Agency <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF]">Control Center</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Logged in as <strong className="text-white">{user?.name || 'Super Admin'}</strong> ({user?.email}) • Full customization &amp; portfolio publishing privileges.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('home')}
              className="py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-tech font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <Eye className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('login');
              }}
              className="py-2.5 px-4 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 font-tech font-semibold text-xs transition-colors cursor-pointer border border-white/5"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2 my-8 p-1.5 rounded-full bg-[#0A0D18] border border-white/10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('customizer')}
            className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-tech font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'customizer'
                ? 'bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white shadow-[0_0_20px_rgba(255,19,97,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Website Customizer</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-tech font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white shadow-[0_0_20px_rgba(255,19,97,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Portfolio &amp; &quot;Work That Speaks&quot;</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-white font-mono">
              {portfolioItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sprints')}
            className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-tech font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'sprints'
                ? 'bg-gradient-to-r from-[#0099FF] to-[#38BDF8] text-white shadow-[0_0_20px_rgba(0,153,255,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Client Sprints &amp; Deliverables</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-white font-mono">
              {projects.length}
            </span>
          </button>

          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab('staff')}
              className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-tech font-bold transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'staff'
                  ? 'bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white shadow-[0_0_20px_rgba(255,19,97,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-[#FF2A85]" />
              <span>Staff &amp; Access Control</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-white font-mono">
                {staffMembers.length}
              </span>
            </button>
          )}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: WEBSITE CUSTOMIZER                                      */}
        {/* ============================================================== */}
        {activeTab === 'customizer' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Quick Actions & Status Notification */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-[2rem] bg-gradient-to-r from-[#0A0D18] via-[#0D1022] to-[#0A0D18] border border-white/10 shadow-lg">
              <div>
                <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF1361]" />
                  <span>Full Website Customizer</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 font-sans-clean">
                  All updates take effect in real time across the entire site and persist in your browser storage.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveCustomizer()}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] hover:shadow-[0_0_20px_rgba(255,19,97,0.4)] text-white text-xs font-tech font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saveSuccess ? '✓ Saved Live!' : 'Save All Changes Live'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all website customizations back to initial factory baseline?')) {
                      resetSiteConfig();
                    }
                  }}
                  className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs font-tech font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setJsonText(exportConfigJson());
                    setImportExportModal(true);
                  }}
                  className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-tech font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
                >
                  <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Export / Import JSON</span>
                </button>
              </div>
            </div>

            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-tech font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>All website customizations saved successfully! Updated in real time on the live site and persisted in your browser.</span>
              </motion.div>
            )}

            {/* Customizer Form */}
            <form onSubmit={handleSaveCustomizer} noValidate className="space-y-8">
              
              {/* Section A: Brand & Hero Identity */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/10">
                  <Globe className="w-5 h-5 text-[#0099FF]" />
                  <div>
                    <h3 className="text-lg font-display font-black text-white">Brand &amp; Hero Section</h3>
                    <p className="text-xs text-slate-400">Headlines, slogan, agency name, and primary calls to action</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Agency Brand Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Tagline</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Hero Floating Badge Text</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Hero Headline Line 1</label>
                    <input
                      type="text"
                      value={formData.heroHeadlineLine1}
                      onChange={(e) => setFormData({ ...formData, heroHeadlineLine1: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Hero Headline Line 2 (Cerulean Gradient)</label>
                    <input
                      type="text"
                      value={formData.heroHeadlineLine2}
                      onChange={(e) => setFormData({ ...formData, heroHeadlineLine2: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Hero Headline Line 3 (Neon Rose Gradient)</label>
                    <input
                      type="text"
                      value={formData.heroHeadlineLine3}
                      onChange={(e) => setFormData({ ...formData, heroHeadlineLine3: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Agency Slogan</label>
                    <input
                      type="text"
                      value={formData.slogan}
                      onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Hero Supporting Description</label>
                    <textarea
                      rows={3}
                      value={formData.heroDescription}
                      onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Primary Hero CTA Button</label>
                    <input
                      type="text"
                      value={formData.heroPrimaryCtaText}
                      onChange={(e) => setFormData({ ...formData, heroPrimaryCtaText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Secondary Hero CTA Button</label>
                    <input
                      type="text"
                      value={formData.heroSecondaryCtaText}
                      onChange={(e) => setFormData({ ...formData, heroSecondaryCtaText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Section B: "Work That Speaks" Section Copy */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/10">
                  <Layers className="w-5 h-5 text-[#FF1361]" />
                  <div>
                    <h3 className="text-lg font-display font-black text-white">&quot;Work That Speaks&quot; Section Headings</h3>
                    <p className="text-xs text-slate-400">Configure the exact heading, pill badge, and intro text for the portfolio showcase</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Section Pill Badge Text</label>
                    <input
                      type="text"
                      value={formData.workBadge}
                      onChange={(e) => setFormData({ ...formData, workBadge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Section Title</label>
                    <input
                      type="text"
                      value={formData.workHeading}
                      onChange={(e) => setFormData({ ...formData, workHeading: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Section Subtitle / Description</label>
                    <input
                      type="text"
                      value={formData.workDescription}
                      onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Section C: Top Announcement Bar */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="text-lg font-display font-black text-white">Top Announcement Bar</h3>
                    <p className="text-xs text-slate-400">Display a global banner across the very top of all pages</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.announcementEnabled}
                      onChange={(e) => setFormData({ ...formData, announcementEnabled: e.target.checked })}
                      className="w-4 h-4 rounded text-[#FF1361] focus:ring-0 cursor-pointer accent-[#FF1361]"
                    />
                    <span className="text-xs font-tech font-bold text-white">Enable Global Announcement Bar</span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Announcement Message</label>
                      <input
                        type="text"
                        value={formData.announcementText}
                        onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">CTA Link Text</label>
                      <input
                        type="text"
                        value={formData.announcementLinkText}
                        onChange={(e) => setFormData({ ...formData, announcementLinkText: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section D: Contact Info & WhatsApp */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/10">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-display font-black text-white">Contact &amp; Direct Communication</h3>
                    <p className="text-xs text-slate-400">Updates email, consultation telephone, floating WhatsApp action, and office location</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Primary Contact Email</label>
                    <input
                      type="text"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Phone Number (Display)</label>
                    <input
                      type="text"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">WhatsApp Number (Clean with country code)</label>
                    <input
                      type="text"
                      value={formData.whatsappCleanNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappCleanNumber: e.target.value })}
                      placeholder="e.g. 919876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Office / Base Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Operating Hours</label>
                    <input
                      type="text"
                      value={formData.operatingHours}
                      onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Response Time SLA</label>
                    <input
                      type="text"
                      value={formData.responseTime}
                      onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Section E: Social Media Profiles */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 pb-4 mb-6 border-b border-white/10">
                  <Tag className="w-5 h-5 text-[#38BDF8]" />
                  <div>
                    <h3 className="text-lg font-display font-black text-white">Social Media Channels</h3>
                    <p className="text-xs text-slate-400">Links rendered in footer and contact sections</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">Instagram URL</label>
                    <input
                      type="text"
                      value={formData.instagramUrl}
                      onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">YouTube URL</label>
                    <input
                      type="text"
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">X / Twitter URL</label>
                    <input
                      type="text"
                      value={formData.twitterUrl}
                      onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060810] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Save Floating Dock */}
              <div className="sticky bottom-6 z-30 p-4 rounded-3xl bg-[#080B14]/95 border border-[#FF1361]/50 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4">
                <span className="text-xs font-tech text-slate-300 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF2A85]" />
                  <span>{saveSuccess ? 'Changes saved and active across the live website!' : 'Unsaved changes will be applied instantly to the live website.'}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleSaveCustomizer()}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] text-white text-xs sm:text-sm font-tech font-bold hover:shadow-[0_0_30px_rgba(255,19,97,0.5)] transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveSuccess ? '✓ Saved Live & Persisted!' : 'Save All Changes Live'}</span>
                </button>
              </div>

            </form>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PORTFOLIO & "WORK THAT SPEAKS" MANAGER                  */}
        {/* ============================================================== */}
        {activeTab === 'portfolio' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header Action Bar */}
            <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF1361]/15 text-[#FF2A85] text-xs font-tech font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PORTFOLIO SHOWCASE MANAGER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                  &quot;Work That Speaks&quot; Portfolio Hub
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl font-sans-clean">
                  You have full authority to post your portfolio work here. Any item added, edited, or removed immediately reflects in the &quot;Work That Speaks&quot; space on the Homepage and Work page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setEditingPortfolioItem(null);
                    setPostModalOpen(true);
                  }}
                  className="py-3 px-6 rounded-full bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] text-white text-xs sm:text-sm font-tech font-bold hover:shadow-[0_0_25px_rgba(255,19,97,0.5)] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Portfolio Work</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset portfolio showcase back to clean baseline projects?')) {
                      resetPortfolioItems();
                    }
                  }}
                  className="py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-tech font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Baseline</span>
                </button>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="p-3 sm:p-4 rounded-full bg-[#0A0D18] border border-white/10 shadow-lg flex items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search portfolio items by title, category, or industry..."
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#060810] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF1361]"
                />
              </div>

              <span className="text-xs font-tech text-slate-400 pr-3 hidden sm:inline">
                Showing <strong className="text-white">{filteredPortfolio.length}</strong> of {portfolioItems.length} items
              </span>
            </div>

            {/* Portfolio Grid */}
            {filteredPortfolio.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolio.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-[2.25rem] bg-[#0A0D18] border border-white/10 hover:border-[#FF1361]/40 transition-all flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] group relative overflow-hidden"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-[#070912] mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold bg-black/80 text-[#FF2A85] border border-[#FF1361]/30">
                            {project.badge || 'Production Project'}
                          </span>
                        </div>
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-tech text-[#38BDF8] bg-black/80 border border-[#0099FF]/30">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] font-tech text-[#38BDF8] font-bold uppercase tracking-wider mb-1">
                        {project.industry}
                      </div>

                      <h3 className="text-lg font-display font-black text-white mb-1.5 flex items-center justify-between">
                        <span>{project.title}</span>
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 font-sans-clean mb-3">
                        {project.overview || project.description}
                      </p>

                      {/* Services Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.services && project.services.slice(0, 3).map((srv, i) => (
                          <span key={i} className="text-[10px] font-tech px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingPortfolioItem(project);
                          setPostModalOpen(true);
                        }}
                        className="py-1.5 px-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-tech font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-white/5"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${project.title}" from Work That Speaks?`)) {
                            deletePortfolioItem(project.id);
                          }
                        }}
                        className="py-1.5 px-3 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs font-tech transition-colors flex items-center gap-1 cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-[260px] rounded-[2.5rem] bg-[#0A0D18]/70 border border-dashed border-white/15 p-8 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-slate-400 mb-4 font-sans-clean">
                  No portfolio items found matching your filter.
                </p>
                <button
                  onClick={() => {
                    setEditingPortfolioItem(null);
                    setPostModalOpen(true);
                  }}
                  className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white text-xs font-tech font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Work to this Space</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CLIENT PROJECTS & SPRINTS                               */}
        {/* ============================================================== */}
        {activeTab === 'sprints' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header & Launch Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <div>
                <h2 className="text-2xl font-display font-black text-white">Client Project &amp; Sprint Tracker</h2>
                <p className="text-xs text-slate-400 mt-1">Manage active deliverables, client milestones, budgets, and velocity</p>
              </div>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="py-3 px-6 rounded-full bg-gradient-to-r from-[#0099FF] to-[#38BDF8] text-white font-tech font-bold text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(0,153,255,0.4)] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Launch New Client Project</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'In Progress', 'Review', 'Completed', 'Planning'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`py-2 px-5 rounded-full text-xs font-tech font-semibold transition-all cursor-pointer ${
                    selectedStatus === status
                      ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_15px_rgba(255,19,97,0.3)]'
                      : 'bg-[#0A0D18] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-6 rounded-[2rem] bg-[#0A0D18] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-tech font-bold uppercase ${
                        p.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        p.status === 'In Progress' ? 'bg-[#0099FF]/20 text-[#38BDF8] border border-[#0099FF]/30' :
                        p.status === 'Review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {p.status}
                      </span>
                      <span className="text-xs font-tech text-slate-400">• {p.category}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-xs text-slate-400 font-sans-clean">Client: {p.clientName} ({p.clientEmail}) • Budget: {p.budget}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#05070C] rounded-full h-2 mt-3 overflow-hidden border border-white/5 max-w-md">
                      <div
                        className="bg-gradient-to-r from-[#0099FF] to-[#FF1361] h-full rounded-full transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProject(p)}
                      className="py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-tech font-semibold flex items-center gap-1.5 border border-white/10 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Edit Scope</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete project "${p.title}"?`)) {
                          deleteProject(p.id);
                        }
                      }}
                      className="p-2 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: STAFF & TEAM ACCESS MANAGEMENT (SUPER ADMIN ONLY)       */}
        {/* ============================================================== */}
        {activeTab === 'staff' && isSuperAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header & Quick Action Banner */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-r from-[#0A0D18] via-[#0E1224] to-[#0A0D18] border border-[#FF1361]/30 shadow-[0_15px_35px_rgba(255,19,97,0.15)]">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF1361]/15 border border-[#FF1361]/30 text-rose-300 text-xs font-tech font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF1361]" />
                  <span>MASTER ROOT AUTHORITY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                  Agency Staff &amp; Team Access Control
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl font-sans-clean">
                  Super Admin command: Provision internal staff accounts, designate department permissions, and protect against unauthorized access.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStaffFormError(null);
                  setNewStaffName('');
                  setNewStaffEmail('');
                  setNewStaffPassword(generateStrongPassword());
                  setNewStaffRole('staff');
                  setNewStaffTitle('');
                  setNewStaffDept('Engineering');
                  setNewStaffStatus('active');
                  setAddStaffModalOpen(true);
                }}
                className="py-3 px-6 rounded-full bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] text-white font-tech font-bold text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(255,19,97,0.45)] transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Add New Staff Member</span>
              </button>
            </div>

            {/* Security Guardrail Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-[2rem] bg-[#0A0D18] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
                  <span className="uppercase font-semibold">Active Staff Roster</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-2xl font-display font-black text-white flex items-center gap-2">
                  <span>{staffMembers.filter(s => s.status === 'active').length}</span>
                  <span className="text-xs text-slate-500 font-normal">/ {staffMembers.length} members</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Authorized internal team</p>
              </div>

              <div className="p-5 rounded-[2rem] bg-[#0A0D18] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
                  <span className="uppercase font-semibold">Super Admin Root</span>
                  <ShieldCheck className="w-4 h-4 text-[#FF1361]" />
                </div>
                <div className="text-lg font-mono font-bold text-white truncate">
                  teamevohawks
                </div>
                <p className="text-[11px] text-emerald-400 mt-1 font-tech">&#10003; High Entropy Protected</p>
              </div>

              <div className="p-5 rounded-[2rem] bg-[#0A0D18] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
                  <span className="uppercase font-semibold">Brute-Force Shield</span>
                  <KeyRound className="w-4 h-4 text-[#0099FF]" />
                </div>
                <div className="text-lg font-display font-bold text-white">
                  5 Attempts Max
                </div>
                <p className="text-[11px] text-sky-400 mt-1 font-tech">15-Min Auto Lockout</p>
              </div>

              <div className="p-5 rounded-[2rem] bg-[#0A0D18] border border-white/10 shadow-md">
                <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-2">
                  <span className="uppercase font-semibold">Session Timeout</span>
                  <Lock className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-lg font-display font-bold text-white">
                  4 Hours
                </div>
                <p className="text-[11px] text-purple-400 mt-1 font-tech">Crypto Session Watchdog</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[2rem] bg-[#0A0D18] border border-white/10">
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  placeholder="Search staff by name, email, or role..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#05070C] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF1361]"
                />
              </div>

              {/* Department Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {['All', 'Engineering', 'Design', 'Video', 'Marketing', 'Operations'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`py-1.5 px-3.5 rounded-full text-xs font-tech font-semibold transition-all cursor-pointer ${
                      selectedDept === dept
                        ? 'bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Staff Grid Cards */}
            {filteredStaff.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredStaff.map((staff) => (
                  <div 
                    key={staff.id}
                    className="p-6 rounded-[2.5rem] bg-[#0A0D18] border border-white/10 hover:border-white/20 transition-all shadow-lg flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF1361] via-[#0099FF] to-[#38BDF8] flex items-center justify-center text-white font-display font-black text-base shadow-[0_0_15px_rgba(255,19,97,0.3)] shrink-0">
                            {staff.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-display font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                                {staff.name}
                              </h3>
                              <span className={`text-[10px] font-tech font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                staff.status === 'active' 
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              }`}>
                                {staff.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{staff.title}</p>
                          </div>
                        </div>

                        <span className="text-[11px] font-tech font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {staff.department}
                        </span>
                      </div>

                      {/* Credentials & Access Info */}
                      <div className="space-y-2 py-3 border-y border-white/5 text-xs font-mono">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-500 font-tech">Email:</span>
                          <span className="text-slate-200">{staff.email}</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-500 font-tech">Role Level:</span>
                          <span className="font-tech font-bold text-[#38BDF8] uppercase text-[11px]">
                            {staff.role === 'admin' ? 'Agency Admin Lead' : 'Staff Specialist'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-500 font-tech">Password:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-200">
                              {revealedPasswordId === staff.id ? (staff.password || 'Staff@Evo2026') : '••••••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => setRevealedPasswordId(revealedPasswordId === staff.id ? null : staff.id)}
                              className="text-slate-500 hover:text-white p-1 rounded transition-colors"
                              title={revealedPasswordId === staff.id ? 'Hide' : 'Reveal'}
                            >
                              {revealedPasswordId === staff.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span className="text-slate-500 font-tech">Joined:</span>
                          <span>{staff.createdAt} • Active: {staff.lastActive || 'Recently'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="flex items-center justify-between pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => handleCopyStaffInfo(staff)}
                        className="py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-tech font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                      >
                        {copiedStaffId === staff.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Credentials</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5">
                        {/* Toggle Active / Suspended */}
                        <button
                          type="button"
                          onClick={() => {
                            const newStatus = staff.status === 'active' ? 'suspended' : 'active';
                            updateStaffMember(staff.id, { status: newStatus });
                          }}
                          className={`py-1.5 px-3 rounded-full text-xs font-tech font-semibold transition-colors cursor-pointer border ${
                            staff.status === 'active'
                              ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          {staff.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>

                        {/* Edit Staff */}
                        <button
                          type="button"
                          onClick={() => setEditingStaff(staff)}
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                          title="Edit Staff Member"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#0099FF]" />
                        </button>

                        {/* Delete Staff */}
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Permanently revoke staff access for "${staff.name}" (${staff.email})?`)) {
                              deleteStaffMember(staff.id);
                            }
                          }}
                          className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer border border-white/10"
                          title="Revoke / Delete Staff Account"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-[260px] rounded-[2.5rem] bg-[#0A0D18]/70 border border-dashed border-white/15 p-8 flex flex-col items-center justify-center text-center">
                <Users className="w-10 h-10 text-slate-600 mb-3" />
                <p className="text-sm text-slate-400 mb-4 font-sans-clean">
                  No staff members found matching &quot;{staffSearch}&quot; in {selectedDept}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStaffSearch('');
                    setSelectedDept('All');
                  }}
                  className="py-2 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-tech font-bold cursor-pointer transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>
        )}

      </div>

      {/* Post / Edit Portfolio Modal */}
      <PostPortfolioModal
        isOpen={postModalOpen}
        onClose={() => {
          setPostModalOpen(false);
          setEditingPortfolioItem(null);
        }}
        onSave={handleSavePortfolioItem}
        initialData={editingPortfolioItem}
      />

      {/* JSON Import/Export Modal */}
      {importExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#090C16] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-display font-black text-white">Export / Import Website Configuration</h3>
              <button onClick={() => setImportExportModal(false)} className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3 font-sans-clean">
              Copy this JSON payload to backup your custom branding and portfolio items, or paste a new JSON payload to import settings.
            </p>

            <textarea
              rows={12}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#05070C] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#0099FF] mb-4 flex-1"
            />

            {importStatus && (
              <div className="text-xs font-tech mb-3 text-emerald-400 font-bold">{importStatus}</div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonText);
                  setImportStatus('Copied JSON to clipboard!');
                  setTimeout(() => setImportStatus(null), 2500);
                }}
                className="px-4 py-2 rounded-full bg-white/10 text-xs font-tech text-white hover:bg-white/20"
              >
                Copy JSON
              </button>

              <button
                onClick={() => {
                  const ok = importConfigJson(jsonText);
                  if (ok) {
                    setImportStatus('Configuration imported and saved successfully!');
                    setTimeout(() => setImportExportModal(false), 1500);
                  } else {
                    setImportStatus('Failed to parse JSON. Please check syntax.');
                  }
                }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-xs font-tech font-bold text-white shadow-lg"
              >
                Apply Imported JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Project Scope Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#090C16] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-display font-black text-white">Edit Sprint Scope</h3>
              <button onClick={() => setEditingProject(null)} className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Progress % ({editingProject.progress}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingProject.progress}
                    onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) || 0 })}
                    className="w-full mt-2"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-full text-xs font-tech text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0099FF] to-[#38BDF8] text-xs font-tech font-bold text-white"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Client Project Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#090C16] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-display font-black text-white">Launch New Sprint</h3>
              <button onClick={() => setCreateModalOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyperion Web Architecture"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Client Email</label>
                  <input
                    type="email"
                    placeholder="client@company.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-tech text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0099FF] to-[#38BDF8] text-xs font-tech font-bold text-white shadow-lg"
                >
                  Create Sprint Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADD NEW STAFF MEMBER MODAL                                     */}
      {/* ============================================================== */}
      {addStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#090C16] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-lg font-display font-black text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#FF1361]" />
                  <span>Provision New Staff Account</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Assign internal team credentials and role permissions</p>
              </div>
              <button 
                type="button"
                onClick={() => setAddStaffModalOpen(false)} 
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {staffFormError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{staffFormError}</span>
              </div>
            )}

            <form onSubmit={handleAddStaffSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF1361]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aryan@evohawks.tech"
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF1361]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Department</label>
                  <select
                    value={newStaffDept}
                    onChange={(e) => setNewStaffDept(e.target.value as StaffMember['department'])}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF1361]"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Video">Video</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Role Level</label>
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value as 'admin' | 'staff')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF1361]"
                  >
                    <option value="staff">Staff Member</option>
                    <option value="admin">Admin Lead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Architect / Motion Lead"
                  value={newStaffTitle}
                  onChange={(e) => setNewStaffTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF1361]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-tech text-slate-300 font-bold">Initial Password *</label>
                  <button
                    type="button"
                    onClick={() => setNewStaffPassword(generateStrongPassword())}
                    className="text-[11px] font-tech text-[#38BDF8] hover:text-white cursor-pointer transition-colors"
                  >
                    ⚡ Auto-Generate Strong Password
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter strong password"
                  value={newStaffPassword}
                  onChange={(e) => setNewStaffPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-[#FF1361]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Account Status</label>
                <div className="flex items-center gap-4 text-xs font-tech">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="staffStatus"
                      value="active"
                      checked={newStaffStatus === 'active'}
                      onChange={() => setNewStaffStatus('active')}
                      className="accent-[#FF1361]"
                    />
                    <span className="text-emerald-400 font-bold">Active (Can Login)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="staffStatus"
                      value="suspended"
                      checked={newStaffStatus === 'suspended'}
                      onChange={() => setNewStaffStatus('suspended')}
                      className="accent-[#FF1361]"
                    />
                    <span className="text-amber-400 font-bold">Suspended (Blocked)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setAddStaffModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-tech text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-xs font-tech font-bold text-white shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(255,19,97,0.4)]"
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* EDIT STAFF MEMBER MODAL                                        */}
      {/* ============================================================== */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#090C16] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-lg font-display font-black text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#0099FF]" />
                  <span>Edit Staff Member</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{editingStaff.email}</p>
              </div>
              <button 
                type="button"
                onClick={() => setEditingStaff(null)} 
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditStaffSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingStaff.email}
                  onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Department</label>
                  <select
                    value={editingStaff.department}
                    onChange={(e) => setEditingStaff({ ...editingStaff, department: e.target.value as StaffMember['department'] })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#0099FF]"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Video">Video</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Role Level</label>
                  <select
                    value={editingStaff.role}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value as 'admin' | 'staff' })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#0099FF]"
                  >
                    <option value="staff">Staff Member</option>
                    <option value="admin">Admin Lead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Job Title</label>
                <input
                  type="text"
                  value={editingStaff.title}
                  onChange={(e) => setEditingStaff({ ...editingStaff, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-tech text-slate-300 font-bold">Password / Reset Key</label>
                  <button
                    type="button"
                    onClick={() => setEditingStaff({ ...editingStaff, password: generateStrongPassword() })}
                    className="text-[11px] font-tech text-[#38BDF8] hover:text-white cursor-pointer transition-colors"
                  >
                    ⚡ Generate New Password
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={editingStaff.password || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1">Account Status</label>
                <div className="flex items-center gap-4 text-xs font-tech">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="editStaffStatus"
                      value="active"
                      checked={editingStaff.status === 'active'}
                      onChange={() => setEditingStaff({ ...editingStaff, status: 'active' })}
                      className="accent-[#0099FF]"
                    />
                    <span className="text-emerald-400 font-bold">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="editStaffStatus"
                      value="suspended"
                      checked={editingStaff.status === 'suspended'}
                      onChange={() => setEditingStaff({ ...editingStaff, status: 'suspended' })}
                      className="accent-[#0099FF]"
                    />
                    <span className="text-amber-400 font-bold">Suspended (Blocked)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="px-4 py-2.5 rounded-full text-xs font-tech text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0099FF] to-[#38BDF8] text-xs font-tech font-bold text-white shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(0,153,255,0.4)]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Portfolio Work Creation & Edit Modal */}
      <PostPortfolioModal
        isOpen={postModalOpen}
        initialData={editingPortfolioItem}
        onClose={() => {
          setPostModalOpen(false);
          setEditingPortfolioItem(null);
        }}
        onSave={handleSavePortfolioItem}
      />

    </div>
  );
};
