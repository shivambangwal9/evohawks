import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import type { ManagedProject } from '../context/authTypes';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { TiltCard } from '../components/ui/TiltCard';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Briefcase, 
  User, 
  Calendar, 
  X, 
  Save, 
  CheckSquare, 
  Square, 
  ArrowUpRight,
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
    logout, 
    createProject, 
    updateProject, 
    deleteProject, 
    updateProjectStatus, 
    toggleDeliverable 
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ManagedProject | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newCategory, setNewCategory] = useState<ManagedProject['category']>('Websites');
  const [newBudget, setNewBudget] = useState('₹65,000');
  const [newDeadline, setNewDeadline] = useState('2026-10-01');
  const [newStrategist, setNewStrategist] = useState('Aryan (Head of Tech)');
  const [newNotes, setNewNotes] = useState('');
  const [newDeliverablesInput, setNewDeliverablesInput] = useState('Responsive Design System\nFull API & Database Setup\nEdge Performance QA');

  // Filtered Projects
  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Aggregated Stats
  const totalProjects = projects.length;
  const inProgressCount = projects.filter(p => p.status === 'In Progress').length;
  const inReviewCount = projects.filter(p => p.status === 'Review').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deliverablesList = newDeliverablesInput
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map((item, idx) => ({
        id: `d-new-${Date.now()}-${idx}`,
        title: item,
        completed: false
      }));

    createProject({
      title: newTitle || 'Untitled Project',
      clientName: newClientName || 'Client Partner',
      clientEmail: newClientEmail || 'client@partner.com',
      category: newCategory,
      status: 'In Progress',
      progress: 15,
      budget: newBudget,
      startDate: new Date().toISOString().split('T')[0],
      deadline: newDeadline,
      leadStrategist: newStrategist,
      deliverables: deliverablesList.length > 0 ? deliverablesList : [
        { id: `d-1`, title: 'Kickoff & Scope Lock', completed: true },
        { id: `d-2`, title: 'Sprint Delivery & QA', completed: false }
      ],
      milestones: [
        { step: '01', title: 'Sprint Discovery & Architecture', date: 'Week 1', status: 'completed' },
        { step: '02', title: 'Engineering & Production', date: 'Week 2', status: 'current' },
        { step: '03', title: 'Final Handover & Launch', date: 'Week 4', status: 'upcoming' }
      ],
      notes: newNotes
    });

    setCreateModalOpen(false);
    // Reset form
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

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete project: "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prototype Environment Notice */}
        <div className="mb-6 p-4 rounded-[1.75rem] rounded-tl-sm bg-[#FF1361]/10 border border-[#FF1361]/30 text-rose-200 text-xs font-sans-clean flex items-start gap-3 shadow-[0_0_25px_rgba(255,19,97,0.1)]">
          <AlertCircle className="w-5 h-5 text-[#FF1361] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5 text-white">Demo Environment Preview</strong>
            This administrative control center is operating on browser local state for interface demonstration. In production, project creation, status transitions, and client deliverable management are secured via server-side APIs and database authorization rules (e.g. Supabase / PostgreSQL RLS).
          </div>
        </div>

        {/* Top Control Center Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-pulse" />
              <span>DEMO AGENCY CONTROL CENTER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] to-[#FF1361]">Management Hub</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Logged in as <strong className="text-white">{user?.name || 'Administrator'}</strong> ({user?.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="py-3 px-5 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] text-white font-tech font-bold text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Launch New Project</span>
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('login');
              }}
              className="py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-tech font-semibold text-xs transition-colors cursor-pointer border border-white/5"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Aggregate Stats Metric Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
          
          <div className="p-5 rounded-[2rem] rounded-tl-sm bg-[#0A0D18] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-tech font-bold uppercase">Total Projects</span>
              <Briefcase className="w-4 h-4 text-[#0099FF]" />
            </div>
            <div className="text-3xl font-display font-black text-white">{totalProjects}</div>
            <div className="text-[11px] font-tech text-slate-500 mt-1">Across all digital disciplines</div>
          </div>

          <div className="p-5 rounded-[2rem] rounded-tr-sm bg-[#0A0D18] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-tech font-bold uppercase">In Active Sprints</span>
              <Clock className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="text-3xl font-display font-black text-[#38BDF8]">{inProgressCount}</div>
            <div className="text-[11px] font-tech text-[#0099FF] font-semibold mt-1">High-velocity execution</div>
          </div>

          <div className="p-5 rounded-[2rem] rounded-bl-sm bg-[#0A0D18] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-tech font-bold uppercase">In Client Review</span>
              <AlertCircle className="w-4 h-4 text-[#FF2A85]" />
            </div>
            <div className="text-3xl font-display font-black text-[#FF2A85]">{inReviewCount}</div>
            <div className="text-[11px] font-tech text-slate-500 mt-1">Awaiting client sign-off</div>
          </div>

          <div className="p-5 rounded-[2rem] rounded-br-sm bg-[#0A0D18] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-tech font-bold uppercase">Completed &amp; Live</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-display font-black text-emerald-400">{completedCount}</div>
            <div className="text-[11px] font-tech text-emerald-400/80 font-semibold mt-1">100% SLA delivered</div>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 rounded-full bg-[#0A0D18] border border-white/10 shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#060810] border border-white/10 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {['All', 'In Progress', 'Review', 'Completed', 'Planning'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`py-1.5 px-4 rounded-full text-xs font-tech font-semibold transition-all cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_15px_rgba(255,19,97,0.3)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => {
            const cardShape = idx % 2 === 0
              ? 'rounded-[2.75rem] rounded-tl-sm'
              : 'rounded-[2.75rem] rounded-tr-sm';

            return (
              <TiltCard key={project.id} tiltDegree={4} glareColor="#0099FF" className="w-full">
                <div className={`p-6 sm:p-7 ${cardShape} bg-[#0A0D18]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#0099FF]/40 transition-all relative overflow-hidden flex flex-col justify-between h-full`}>
                  <BorderBeam 
                    size={140} 
                    duration={12} 
                    colorFrom={project.status === 'Completed' ? '#10B981' : project.status === 'Review' ? '#FF1361' : '#0099FF'} 
                    colorTo="#38BDF8" 
                  />

                  <div>
                    {/* Top Card Meta Row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-tech font-bold uppercase px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                          {project.category}
                        </span>

                        {/* 1-Click Status Advance Selector */}
                        <select
                          value={project.status}
                          onChange={(e) => updateProjectStatus(project.id, e.target.value as ManagedProject['status'])}
                          className={`text-[10px] font-tech font-bold uppercase px-3 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            project.status === 'Completed'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : project.status === 'Review'
                              ? 'bg-[#FF1361]/15 text-[#FF2A85] border-[#FF1361]/30'
                              : 'bg-[#0099FF]/15 text-[#38BDF8] border-[#0099FF]/30'
                          }`}
                        >
                          <option value="Planning" className="bg-[#0A0D18] text-white">Planning</option>
                          <option value="In Progress" className="bg-[#0A0D18] text-white">In Progress</option>
                          <option value="Review" className="bg-[#0A0D18] text-white">Review</option>
                          <option value="Completed" className="bg-[#0A0D18] text-white">Completed</option>
                        </select>
                      </div>

                      {/* Actions: Edit & Delete */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-[#0099FF] hover:bg-[#0099FF]/15 transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-[#FF1361] hover:bg-[#FF1361]/15 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Title & Client */}
                    <h3 className="text-xl font-display font-bold text-white mb-1.5">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <User className="w-3.5 h-3.5 text-[#0099FF]" />
                        <span>{project.clientName}</span>
                      </span>
                      <span>•</span>
                      <span>{project.clientEmail}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between text-xs font-tech font-bold mb-1.5">
                        <span className="text-slate-400">Sprint Progress</span>
                        <span className="text-[#38BDF8]">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#060810] rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] rounded-full shadow-[0_0_15px_rgba(255,19,97,0.4)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Deliverables Checklist (Interactive) */}
                    <div className="mb-5 bg-[#060810] rounded-[1.75rem] p-4 border border-white/5">
                      <div className="text-xs font-tech font-bold uppercase text-slate-400 mb-2.5 flex items-center justify-between">
                        <span>Deliverables Checklist</span>
                        <span className="text-[10px] text-slate-500 font-normal">Click item to toggle</span>
                      </div>
                      <div className="space-y-2">
                        {project.deliverables.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleDeliverable(project.id, item.id)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0D18] border border-white/5 hover:border-[#0099FF]/40 transition-colors cursor-pointer text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              {item.completed ? (
                                <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                              )}
                              <span className={item.completed ? 'line-through text-slate-500 font-medium' : 'text-slate-200 font-medium'}>
                                {item.title}
                              </span>
                            </div>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#0099FF] hover:text-[#38BDF8] ml-2"
                                title="External Resource"
                              >
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-tech text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-bold text-white">{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Due {project.deadline}</span>
                    </div>
                  </div>

                </div>
              </TiltCard>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="col-span-2 py-16 text-center bg-[#0A0D18] border border-white/10 rounded-[2.5rem]">
              <p className="text-slate-400 font-tech text-sm">No projects match the selected filters.</p>
              <button
                onClick={() => { setSelectedStatus('All'); setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-tech text-[#0099FF] font-bold hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* CREATE PROJECT MODAL */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0D18] rounded-[2.5rem] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden max-h-[88vh] overflow-y-auto text-white"
            >
              <BorderBeam size={140} duration={8} colorFrom="#0099FF" colorTo="#FF1361" />
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white">Launch New Project</h3>
                  <p className="text-xs text-slate-400">Define scope, client credentials, and milestone checkpoints.</p>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-tech">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Project Name / Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Luxury E-Commerce Portal"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white placeholder-slate-500 text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karan Singhania"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white placeholder-slate-500 text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Client Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. karan@apex.com"
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white placeholder-slate-500 text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Discipline</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as ManagedProject['category'])}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white text-base sm:text-xs focus:outline-none focus:border-[#0099FF]"
                    >
                      <option value="Websites" className="bg-[#0A0D18] text-white">Websites</option>
                      <option value="Video" className="bg-[#0A0D18] text-white">Video &amp; Reels</option>
                      <option value="Design" className="bg-[#0A0D18] text-white">Graphic Design</option>
                      <option value="Marketing" className="bg-[#0A0D18] text-white">Paid Marketing</option>
                      <option value="Social" className="bg-[#0A0D18] text-white">Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Budget</label>
                    <input
                      type="text"
                      placeholder="₹65,000"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white placeholder-slate-500 text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Deadline Date</label>
                    <input
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Lead Strategist</label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan (Head of Tech)"
                    value={newStrategist}
                    onChange={(e) => setNewStrategist(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white placeholder-slate-500 text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Deliverables List (1 per line)</label>
                  <textarea
                    rows={3}
                    value={newDeliverablesInput}
                    onChange={(e) => setNewDeliverablesInput(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white placeholder-slate-500 text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Executive Notes / Specs</label>
                  <input
                    type="text"
                    placeholder="Key specifications, rush flags, tech stack..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white placeholder-slate-500 text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                  />
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="py-2.5 px-5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 font-semibold cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] text-white font-bold hover:shadow-[0_0_20px_rgba(255,19,97,0.4)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Launch Project</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT PROJECT MODAL */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0D18] rounded-[2.5rem] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden max-h-[88vh] overflow-y-auto text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white">Edit Project Specs</h3>
                  <p className="text-xs text-slate-400">Update progress, status, budget, and timeline.</p>
                </div>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-tech">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Status</label>
                    <select
                      value={editingProject.status}
                      onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ManagedProject['status'] })}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white text-base sm:text-xs focus:outline-none focus:border-[#0099FF]"
                    >
                      <option value="Planning" className="bg-[#0A0D18] text-white">Planning</option>
                      <option value="In Progress" className="bg-[#0A0D18] text-white">In Progress</option>
                      <option value="Review" className="bg-[#0A0D18] text-white">Review</option>
                      <option value="Completed" className="bg-[#0A0D18] text-white">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Progress Percentage ({editingProject.progress}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editingProject.progress}
                      onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) })}
                      className="w-full accent-[#0099FF] mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Budget</label>
                    <input
                      type="text"
                      value={editingProject.budget}
                      onChange={(e) => setEditingProject({ ...editingProject, budget: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Deadline Date</label>
                    <input
                      type="date"
                      value={editingProject.deadline}
                      onChange={(e) => setEditingProject({ ...editingProject, deadline: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Internal Notes</label>
                  <textarea
                    rows={2}
                    value={editingProject.notes || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, notes: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#060810] border border-white/10 text-white text-base sm:text-xs font-sans focus:outline-none focus:border-[#0099FF]"
                  />
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="py-2.5 px-5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 font-semibold cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] text-white font-bold hover:shadow-[0_0_20px_rgba(255,19,97,0.4)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
