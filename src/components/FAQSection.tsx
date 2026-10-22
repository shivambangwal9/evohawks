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
    <section id="faq" className="relative py-24 sm:py-32 bg-transparent border-y border-white/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0D16]/90 border border-white/10 text-xs font-tech text-[#38BDF8] font-semibold mb-4 shadow-[0_0_20px_rgba(0,153,255,0.2)]">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF1361]" />
            <span>ANSWERS &amp; CLARIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans-clean">
            Everything you need to know about partnering with Evo Hawks.
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills with layoutId */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0A0D18]/90 border border-white/10 shadow-lg overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap z-10 ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="faqCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#FF1361] via-[#FF2A85] to-[#0099FF] rounded-full shadow-[0_0_20px_rgba(255,19,97,0.45)] -z-10"
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
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#0A0D18]/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:shadow-[0_0_20px_rgba(0,153,255,0.3)] transition-all shadow-inner"
            />
          </div>
        </div>

        {/* FAQ Accordion List with AnimatePresence & Organic Curved Capsules */}
        <motion.div layout className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-[#0A0D18]/90 rounded-[2rem] border border-white/10 text-slate-400 text-sm shadow-md">
              No matching questions found. Feel free to contact us directly!
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIndex === faq.id;
              return (
                <motion.div
                  layout
                  key={faq.id}
                  className={`rounded-[2rem] border transition-all duration-300 overflow-hidden relative shadow-[0_15px_35px_rgba(0,0,0,0.8)] ${
                    isOpen
                      ? 'bg-[#0E111C]/95 border-[#0099FF]/50 shadow-[0_0_25px_rgba(0,153,255,0.2)]'
                      : 'bg-[#0A0D18]/85 border-white/10 hover:border-white/20'
                  }`}
                >
                  {isOpen && (
                    <BorderBeam size={100} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />
                  )}

                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-display font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    <motion.div 
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-gradient-to-r from-[#FF1361] to-[#0099FF] text-white shadow-[0_0_15px_rgba(255,19,97,0.5)]' : 'bg-white/5 text-slate-400'
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
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 font-sans-clean leading-relaxed border-t border-white/10">
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
