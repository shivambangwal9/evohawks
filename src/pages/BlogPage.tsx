import { useState, useMemo } from 'react';
import { BLOG_ARTICLES, type BlogArticle } from '../data/blogData';
import { type PageId } from '../hooks/usePageRouter';
import { ArrowRight, BookOpen, Clock, Search, Sparkles } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageId, slug?: string) => void;
}

const CATEGORIES = [
  'All Guides',
  'Social & Content',
  'Paid Performance',
  'Creative Production',
  'Web & E-commerce',
  'Branding & Strategy',
  'Growth & Marketing'
];

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Guides');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article: BlogArticle) => {
      const matchesCategory = selectedCategory === 'All Guides' || article.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.targetKeyword.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-28 pb-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0099FF]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FF1361]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:text-[#0099FF] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-white">Client Resources &amp; Guides</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/20 text-[#0099FF] text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest Agency Guidance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Client Resources &amp; <br />
            <span className="bg-gradient-to-r from-[#0099FF] via-cyan-400 to-[#FF1361] bg-clip-text text-transparent">
              Growth Intelligence
            </span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Transparent frameworks, realistic pricing benchmarks, pre-production shotlists, and technical guides. No fluff, no fabricated statistics—just genuine guidance from our senior production and engineering desk.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-10 pb-8 border-b border-slate-800">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#0099FF] to-[#0077CC] text-white shadow-lg shadow-[#0099FF]/25 border border-[#0099FF]'
                    : 'bg-[#0B0F19] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides by topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#0B0F19] border border-slate-800 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-[#0B0F19]/60 rounded-3xl border border-slate-800/80 p-8">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No matching guides found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Try adjusting your search terms or selecting a different category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('All Guides'); setSearchQuery(''); }}
              className="px-5 py-2.5 rounded-full bg-[#0099FF] text-white text-xs font-bold hover:bg-[#0077CC] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                onClick={() => onNavigate('blog-detail', article.slug)}
                className="group cursor-pointer bg-[#0B0F19]/80 border border-slate-800/80 hover:border-[#0099FF]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#0099FF]/10 relative overflow-hidden"
              >
                {/* Subtle top neon border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0099FF] to-[#FF1361] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#0099FF]/10 text-[#0099FF] font-mono text-[11px] font-medium border border-[#0099FF]/20">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white group-hover:text-[#0099FF] transition-colors leading-snug mb-3">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer Meta & CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0099FF] to-[#FF1361] text-[10px] font-bold text-white flex items-center justify-center">
                      {article.author.avatar}
                    </div>
                    <span className="text-xs text-slate-400">{article.author.name}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0099FF] group-hover:translate-x-1 transition-transform">
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#0D1528] to-[#050508] border border-[#0099FF]/30 relative overflow-hidden">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Have a Specific Project Question?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Our leadership team provides direct, candid feasibility evaluations on web architecture, vertical video production, and performance marketing ad spend.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('start-project')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0099FF] to-[#0077CC] text-white text-xs font-bold tracking-wider uppercase hover:shadow-lg hover:shadow-[#0099FF]/30 transition-all flex items-center gap-2"
              >
                <span>Start Project Intake</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className="px-6 py-3 rounded-full bg-[#050508] border border-slate-700 text-white text-xs font-bold tracking-wider uppercase hover:border-[#0099FF] transition-all"
              >
                View Transparent Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
