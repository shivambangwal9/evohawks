import React, { useState, useEffect } from 'react';
import type { PortfolioItem } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { 
  X, 
  Sparkles, 
  UploadCloud, 
  Image as ImageIcon, 
  Tag, 
  Briefcase, 
  Layers, 
  TrendingUp, 
  Code2, 
  FileText 
} from 'lucide-react';

interface PostPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<PortfolioItem, 'id'> & { id?: string }) => void;
  initialData?: PortfolioItem | null;
}

const PRESET_IMAGES = [
  { label: 'Luxury E-Commerce', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' },
  { label: 'FinTech Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Vertical Video & Studio', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Brand & Creative Identity', url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Performance Ads & Mobile', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Coffee & Packaging Design', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop' }
];

const CATEGORIES: PortfolioItem['category'][] = [
  'Websites',
  'Branding',
  'Video Production',
  'Social Media',
  'Paid Advertising',
  'E-commerce',
  'SEO and Content',
  'Photography'
];

const BADGES: PortfolioItem['badge'][] = [
  'Production Project',
  'Concept Project',
  'Spec Work'
];

export const PostPortfolioModal: React.FC<PostPortfolioModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<PortfolioItem['category']>('Websites');
  const [badge, setBadge] = useState<PortfolioItem['badge']>('Production Project');
  const [industry, setIndustry] = useState('');
  const [image, setImage] = useState('');
  const [overview, setOverview] = useState('');
  const [challenge, setChallenge] = useState('');
  const [strategy, setStrategy] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [deliverablesInput, setDeliverablesInput] = useState('');
  const [technologiesInput, setTechnologiesInput] = useState('');
  const [metricsPreview, setMetricsPreview] = useState('');
  const [accent, setAccent] = useState('from-sky-500 to-indigo-600');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setClientName(initialData.clientName || initialData.client || '');
      setCategory(initialData.category || 'Websites');
      setBadge(initialData.badge || 'Production Project');
      setIndustry(initialData.industry || '');
      setImage(initialData.image || '');
      setOverview(initialData.overview || initialData.description || '');
      setChallenge(initialData.challenge || '');
      setStrategy(initialData.strategy || initialData.solution || '');
      setServicesInput(initialData.services ? initialData.services.join(', ') : '');
      setDeliverablesInput(initialData.deliverables ? initialData.deliverables.join(', ') : '');
      setTechnologiesInput(initialData.technologies ? initialData.technologies.join(', ') : '');
      setMetricsPreview(initialData.metricsPreview || '');
      setAccent(initialData.accent || 'from-sky-500 to-indigo-600');
    } else {
      // Default blank form for posting new work
      setTitle('');
      setClientName('');
      setCategory('Websites');
      setBadge('Production Project');
      setIndustry('');
      setImage(PRESET_IMAGES[0].url);
      setOverview('');
      setChallenge('');
      setStrategy('');
      setServicesInput('UI/UX Design, Web Development, Performance Optimization');
      setDeliverablesInput('Live Web Application, Design System Tokens, Lighthouse Audit');
      setTechnologiesInput('React, TypeScript, Tailwind CSS, Vite');
      setMetricsPreview('+140% Conversion Lift • 99 Lighthouse Score');
      setAccent('from-sky-500 to-indigo-600');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const services = servicesInput.split(',').map(s => s.trim()).filter(Boolean);
    const deliverables = deliverablesInput.split(',').map(d => d.trim()).filter(Boolean);
    const technologies = technologiesInput.split(',').map(t => t.trim()).filter(Boolean);

    const newItem: Omit<PortfolioItem, 'id'> & { id?: string } = {
      ...(initialData ? { id: initialData.id } : {}),
      title: title.trim(),
      clientName: clientName.trim() || title.trim(),
      client: clientName.trim() || title.trim(),
      category,
      isConcept: badge === 'Concept Project',
      badge,
      industry: industry.trim() || 'Modern Enterprise',
      image: image.trim() || PRESET_IMAGES[0].url,
      overview: overview.trim() || `${title} engineered for high-conversion and performance benchmark excellence.`,
      description: overview.trim() || `${title} engineered for high-conversion and performance benchmark excellence.`,
      challenge: challenge.trim() || 'Required high-velocity execution and modern aesthetic transformation.',
      objectives: ['Maximize audience engagement and conversion', 'Deliver clean responsive performance across mobile and desktop'],
      strategy: strategy.trim() || 'Implemented modern design system paired with optimized edge architecture.',
      solution: strategy.trim() || 'Implemented modern design system paired with optimized edge architecture.',
      workDelivered: deliverables.length > 0 ? deliverables : ['Production delivery', 'Responsive implementation'],
      deliverables: deliverables.length > 0 ? deliverables : ['Production delivery', 'Responsive implementation'],
      services: services.length > 0 ? services : ['UI/UX Systems', 'Web Architecture'],
      technologies: technologies.length > 0 ? technologies : ['React', 'TypeScript', 'Tailwind CSS'],
      toolsUsed: technologies.length > 0 ? technologies : ['Figma', 'Git'],
      resultsAndLearnings: metricsPreview.trim() || 'Delivered on time with flawless user experience and verified metrics.',
      metricsPreview: metricsPreview.trim() || 'Delivered with 100% SLA compliance',
      accent
    };

    onSave(newItem);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl my-8 bg-[#090C16] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 overflow-hidden max-h-[90vh] flex flex-col"
        >
          <BorderBeam size={160} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />

          {/* Modal Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
                <span>SUPER ADMIN PORTFOLIO PUBLISHER</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                {initialData ? 'Edit Portfolio Project' : 'Post Work to "Work That Speaks"'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                This project will immediately appear on the Homepage and Work page.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-5 space-y-5 pr-1 scrollbar-thin">
            {/* Title & Client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#0099FF]" />
                  <span>Project Title *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Luxe Fashion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#FF2A85]" />
                  <span>Client / Brand Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Apparel Global"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>

            {/* Category & Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat} className="bg-white text-slate-900 dark:bg-[#0A0D18] dark:text-white">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF1361]" />
                  <span>Badge Type</span>
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#0099FF]"
                >
                  {BADGES.map(b => (
                    <option key={b} value={b} className="bg-white text-slate-900 dark:bg-[#0A0D18] dark:text-white">{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#0099FF]" />
                  <span>Industry</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luxury Retail / Fintech"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>

            {/* Image URL & Preset Selection */}
            <div>
              <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>Featured Image URL</span>
              </label>
              
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              {/* Preset Image Selector */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] font-tech text-slate-400">Presets:</span>
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`text-[11px] font-tech px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      image === preset.url 
                        ? 'bg-[#0099FF]/20 border-[#0099FF] text-white' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Live Preview of Image */}
              {image && (
                <div className="mt-3 relative h-32 w-full rounded-2xl overflow-hidden border border-white/10 bg-[#05070C]">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-tech text-white">
                    Preview
                  </div>
                </div>
              )}
            </div>

            {/* Overview / Description */}
            <div>
              <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Project Overview &amp; Summary</span>
              </label>
              <textarea
                rows={3}
                placeholder="High-level description of what makes this benchmark exceptional..."
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
              />
            </div>

            {/* Challenge & Strategy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">
                  Client Challenge
                </label>
                <textarea
                  rows={2}
                  placeholder="What core obstacle did the client face?"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">
                  Engineered Strategy
                </label>
                <textarea
                  rows={2}
                  placeholder="How did Evo Hawks solve it?"
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>

            {/* Services & Deliverables Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Services / Tags (comma-separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="React, UI/UX, Meta Ads, Video"
                  value={servicesInput}
                  onChange={(e) => setServicesInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#FF2A85]" />
                  <span>Technologies / Stack (comma-separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="React 19, TypeScript, Tailwind, Figma"
                  value={technologiesInput}
                  onChange={(e) => setTechnologiesInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>

            {/* Impact Metric & Accent Gradient */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Metrics Preview / Key Impact</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sub-second speed • 3.8x ROAS"
                  value={metricsPreview}
                  onChange={(e) => setMetricsPreview(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-slate-300 font-bold mb-1.5">
                  Accent Gradient
                </label>
                <select
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#05070C] border border-white/10 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="from-sky-500 to-indigo-600">Sky &amp; Indigo</option>
                  <option value="from-pink-500 to-rose-700">Pink &amp; Neon Rose</option>
                  <option value="from-emerald-500 to-teal-700">Emerald &amp; Teal</option>
                  <option value="from-amber-500 to-orange-700">Amber &amp; Orange</option>
                  <option value="from-purple-500 to-violet-800">Cyber Violet</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-tech text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-tech font-bold text-white bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] hover:shadow-[0_0_25px_rgba(255,19,97,0.5)] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{initialData ? 'Save Changes' : 'Publish to "Work That Speaks"'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
