import { useState } from 'react';
import { BLOG_ARTICLES, type BlogArticle } from '../data/blogData';
import { type PageId } from '../hooks/usePageRouter';
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronDown, ChevronUp, Share2, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface BlogDetailPageProps {
  slug: string;
  onNavigate: (page: PageId, slug?: string) => void;
}

export function BlogDetailPage({ slug, onNavigate }: BlogDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const article: BlogArticle | undefined = BLOG_ARTICLES.find(a => a.slug === slug) || BLOG_ARTICLES[0];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-24 left-1/3 w-[500px] h-[500px] bg-[#0099FF]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-96 h-96 bg-[#FF1361]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#0099FF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Guides</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0F19] border border-slate-800 text-xs font-mono text-slate-300 hover:border-[#0099FF] transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Guide'}</span>
          </button>
        </div>

        {/* Category & Read Time Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3.5 py-1 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/20 text-[#0099FF] text-xs font-mono font-medium">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Updated {article.lastUpdated}
          </span>
        </div>

        {/* Primary H1 */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          {article.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 font-normal">
          {article.excerpt}
        </p>

        {/* Author Bio Bar */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0B0F19]/90 border border-slate-800 mb-12">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0099FF] to-[#FF1361] text-xs font-bold text-white flex items-center justify-center shrink-0">
            {article.author.avatar}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{article.author.name}</div>
            <div className="text-xs text-slate-400">{article.author.role} • Evo Hawks Digital Agency</div>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="space-y-12 text-slate-200">
          {article.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-2 border-t border-slate-800/60">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}

              {section.calloutBox && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0099FF]/10 border border-[#0099FF]/30 my-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0099FF] mb-2 font-mono uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>{section.calloutBox.title}</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {section.calloutBox.text}
                  </p>
                </div>
              )}

              {section.bulletPoints && (
                <div className="space-y-3 pl-2 sm:pl-4 my-4">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <div key={bpIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0099FF] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {bp}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Interactive FAQs Accordion */}
        {article.faq && article.faq.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0099FF]" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-3">
              {article.faq.map((faqItem, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-2xl bg-[#0B0F19] border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full text-left p-5 flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-[#0099FF] transition-colors"
                  >
                    <span>{faqItem.question}</span>
                    {openFaqIndex === fIdx ? (
                      <ChevronUp className="w-4 h-4 text-[#0099FF] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === fIdx && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                      {faqItem.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Service Context CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#0D1528] to-[#050508] border border-[#0099FF]/40 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#0099FF] mb-1">
                Related Service
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Need Professional {article.relatedServiceTitle}?
              </h4>
              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Review our scope of deliverables, working process, and transparent sprint packages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('service-detail', article.relatedServiceSlug)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0099FF] to-[#0077CC] text-white text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-[#0099FF]/25 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Explore Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('start-project')}
                className="px-5 py-2.5 rounded-full bg-[#050508] border border-slate-700 text-white text-xs font-bold uppercase tracking-wider hover:border-[#0099FF] transition-all text-center"
              >
                <span>Start Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
