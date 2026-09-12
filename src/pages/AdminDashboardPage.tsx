import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { ManagedProject } from '../context/AuthContext';
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
    <div className="min-h-screen pt-28 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Center Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-tech text-violet-700 font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
              <span>EXECUTIVE ADMIN COMMAND CENTER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Project Management Hub
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Logged in as <strong className="text-slate-900">{user?.name || 'Administrator'}</strong> ({user?.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-tech font-bold text-xs sm:text-sm hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Launch New Project</span>
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('login');
              }}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-tech font-semibold text-xs transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Aggregate Stats Metric Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
          
          <div className="p-5 rounded-2xl bg-white/95 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-tech font-bold uppercase">Total Projects</span>
              <Briefcase className="w-4 h-4 text-violet-600" />
            </div>
            <div className="text-3xl font-display font-black text-slate-900">{totalProjects}</div>
            <div className="text-[11px] font-tech text-slate-400 mt-1">Across all digital disciplines</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/95 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-tech font-bold uppercase">In Active Sprints</span>
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-3xl font-display font-black text-sky-600">{inProgressCount}</div>
            <div className="text-[11px] font-tech text-emerald-600 font-semibold mt-1">High-velocity execution</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/95 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-tech font-bold uppercase">In Client Review</span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-display font-black text-amber-600">{inReviewCount}</div>
            <div className="text-[11px] font-tech text-slate-400 mt-1">Awaiting client sign-off</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/95 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-tech font-bold uppercase">Completed &amp; Live</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-display font-black text-emerald-600">{completedCount}</div>
            <div className="text-[11px] font-tech text-emerald-600 font-semibold mt-1">100% SLA delivered</div>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:bg-white"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {['All', 'In Progress', 'Review', 'Completed', 'Planning'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-tech font-semibold transition-colors cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} tiltDegree={5} glareColor="#7C3AED" className="w-full">
              <div className="p-6 rounded-3xl bg-white/95 border border-slate-200 shadow-lg hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between h-full">
                <BorderBeam 
                  size={120} 
                  duration={12} 
                  colorFrom={project.status === 'Completed' ? '#10B981' : project.status === 'Review' ? '#F59E0B' : '#7C3AED'} 
                  colorTo="#38BDF8" 
                />

                <div>
                  {/* Top Card Meta Row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-tech font-bold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                        {project.category}
                      </span>

                      {/* 1-Click Status Advance Selector */}
                      <select
                        value={project.status}
                        onChange={(e) => updateProjectStatus(project.id, e.target.value as ManagedProject['status'])}
                        className={`text-[10px] font-tech font-bold uppercase px-2.5 py-1 rounded-md border cursor-pointer focus:outline-none ${
                          project.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : project.status === 'Review'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-sky-50 text-sky-700 border-sky-200'
                        }`}
                      >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Actions: Edit & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Client */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.clientName}</span>
                    </span>
                    <span>•</span>
                    <span>{project.clientEmail}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs font-tech font-bold mb-1.5">
                      <span className="text-slate-600">Sprint Progress</span>
                      <span className="text-violet-600">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Deliverables Checklist (Interactive) */}
                  <div className="mb-5 bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                    <div className="text-xs font-tech font-bold uppercase text-slate-600 mb-2.5 flex items-center justify-between">
                      <span>Deliverables Checklist</span>
                      <span className="text-[10px] text-slate-400 font-normal">Click item to toggle</span>
                    </div>
                    <div className="space-y-2">
                      {project.deliverables.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleDeliverable(project.id, item.id)}
                          className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70 hover:border-violet-300 transition-colors cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2">
                            {item.completed ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            )}
                            <span className={item.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-700 font-medium'}>
                              {item.title}
                            </span>
                          </div>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-violet-600 hover:text-violet-800 ml-2"
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
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-tech text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold text-slate-900">{project.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Due {project.deadline}</span>
                  </div>
                </div>

              </div>
            </TiltCard>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-2 py-16 text-center bg-white/60 border border-slate-200 rounded-3xl">
              <p className="text-slate-500 font-tech text-sm">No projects match the selected filters.</p>
              <button
                onClick={() => { setSelectedStatus('All'); setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-tech text-violet-600 font-bold hover:underline cursor-pointer"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[88vh] overflow-y-auto"
            >
              <BorderBeam size={120} duration={8} colorFrom="#7C3AED" colorTo="#0284C7" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-900">Launch New Project</h3>
                  <p className="text-xs text-slate-500">Define scope, client credentials, and milestone checkpoints.</p>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-tech">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Project Name / Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Luxury E-Commerce Portal"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karan Singhania"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Client Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. karan@apex.com"
                      value={newClientEmail}
                      onChange={(e) => setNewClientEmail(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Discipline</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as ManagedProject['category'])}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs focus:outline-none focus:border-violet-500 focus:bg-white"
                    >
                      <option value="Websites">Websites</option>
                      <option value="Video">Video &amp; Reels</option>
                      <option value="Design">Graphic Design</option>
                      <option value="Marketing">Paid Marketing</option>
                      <option value="Social">Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Budget</label>
                    <input
                      type="text"
                      placeholder="₹65,000"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Deadline Date</label>
                    <input
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Lead Strategist</label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan (Head of Tech)"
                    value={newStrategist}
                    onChange={(e) => setNewStrategist(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Deliverables List (1 per line)</label>
                  <textarea
                    rows={3}
                    value={newDeliverablesInput}
                    onChange={(e) => setNewDeliverablesInput(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Executive Notes / Specs</label>
                  <input
                    type="text"
                    placeholder="Key specifications, rush flags, tech stack..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[88vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-900">Edit Project Specs</h3>
                  <p className="text-xs text-slate-500">Update progress, status, budget, and timeline.</p>
                </div>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-tech">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Status</label>
                    <select
                      value={editingProject.status}
                      onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ManagedProject['status'] })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs focus:outline-none focus:border-violet-500 focus:bg-white"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Progress Percentage ({editingProject.progress}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editingProject.progress}
                      onChange={(e) => setEditingProject({ ...editingProject, progress: parseInt(e.target.value) })}
                      className="w-full accent-violet-600 mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Budget</label>
                    <input
                      type="text"
                      value={editingProject.budget}
                      onChange={(e) => setEditingProject({ ...editingProject, budget: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Deadline Date</label>
                    <input
                      type="date"
                      value={editingProject.deadline}
                      onChange={(e) => setEditingProject({ ...editingProject, deadline: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Internal Notes</label>
                  <textarea
                    rows={2}
                    value={editingProject.notes || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, notes: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-xs font-sans focus:outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
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
