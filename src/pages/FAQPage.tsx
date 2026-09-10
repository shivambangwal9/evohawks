import React, { useState } from 'react';
import { FAQ_DATA, AGENCY_CONFIG } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../components/ui/BorderBeam';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Send 
} from 'lucide-react';

interface FAQPageProps {
  onOpenProjectModal: (service?: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customQuestion, setCustomQuestion] = useState<string>('');

  const categories = ['All', 'General', 'Services', 'Process', 'Pricing'];

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const handleAskCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    const url = `https://wa.me/${AGENCY_CONFIG.contact.whatsappCleanNumber}?text=${encodeURIComponent(`Hi Evo Hawks team! I have a question: ${customQuestion}`)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 pb-20 overflow-hidden"
    >
      {/* FAQ Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent bg-grid-cyber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-6 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>KNOWLEDGE BASE &amp; ASSURANCES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
            Transparent Answers. <br />
            <span className="text-gradient-cyan">Zero Ambiguity.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            Everything you need to know about our sprints, pricing model, IP ownership, and technical standards.
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions or keywords (e.g. pricing, timeline, Next.js, video)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:shadow-[0_0_20px_rgba(2,132,199,0.2)] transition-all shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Main Accordion Section */}
      <section className="relative py-20 bg-transparent border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 border border-slate-200/90 shadow-xs">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap z-10 ${
                      isSelected ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeFAQPageCategoryPill"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full shadow-[0_4px_15px_rgba(2,132,199,0.35)] -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions Accordion List */}
          <motion.div layout className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 shadow-xs">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-900 mb-1">No matching questions found</p>
                <p className="text-xs text-slate-500">Ask us directly below and our strategists will reply instantly.</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => {
                const isOpen = openIndex === faq.id;
                return (
                  <motion.div
                    layout
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden relative shadow-xs ${
                      isOpen
                        ? 'bg-white border-sky-400 shadow-md'
                        : 'bg-white/80 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isOpen && (
                      <BorderBeam size={100} duration={10} colorFrom="#0284C7" colorTo="#7C3AED" />
                    )}

                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-display font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 font-sans-clean leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </motion.div>

        </div>
      </section>

      {/* Ask Unlisted Question Assistant Box */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-sky-200 shadow-xl relative overflow-hidden">
            <BorderBeam size={130} duration={12} colorFrom="#0284C7" colorTo="#7C3AED" />

            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">
              Have an Unlisted Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              Type your question below to ask our creative director directly on WhatsApp with an average response time of under 2 hours.
            </p>

            <form onSubmit={handleAskCustomQuestion} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="e.g. Can you integrate with custom PostgreSQL databases?"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-sky-500 shadow-2xs"
              />
              <MagneticButton
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs sm:text-sm whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Ask on WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </MagneticButton>
            </form>
          </div>
        </div>
      </section>

    </motion.div>
  );
};
