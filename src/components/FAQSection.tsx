import React, { useState } from 'react';
import { FAQ_DATA } from '../data/agencyData';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from './ui/BorderBeam';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-transparent border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-tech text-sky-700 font-semibold mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>ANSWERS &amp; CLARIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans-clean">
            Everything you need to know about partnering with Evo Hawks.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills with layoutId */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-slate-200/90 shadow-xs overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap z-10 ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="faqCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full shadow-[0_4px_15px_rgba(2,132,199,0.35)] -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:shadow-[0_0_15px_rgba(2,132,199,0.2)] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* FAQ Accordion List with AnimatePresence */}
        <motion.div layout className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm shadow-xs">
              No matching questions found. Feel free to contact us directly!
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
  );
};
