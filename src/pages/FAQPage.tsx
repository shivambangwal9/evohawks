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

  const categories = ['All', 'General', 'Services', 'Process', 'Pricing', 'Operations'];

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
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pt-28 pb-20 overflow-hidden bg-[#050508] text-white min-h-screen"
    >
      {/* FAQ Hero */}
      <section className="relative py-16 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0D18] border border-[#0099FF]/30 text-xs font-tech text-[#38BDF8] font-semibold mb-6 shadow-[0_0_20px_rgba(0,153,255,0.15)]">
            <HelpCircle className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>KNOWLEDGE BASE &amp; ASSURANCES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight mb-6">
            Transparent Answers. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0099FF] via-[#38BDF8] to-[#FF1361]">Zero Ambiguity.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans-clean max-w-3xl mx-auto leading-relaxed mb-10">
            Everything you need to know about our sprints, pricing model, IP ownership, and technical standards.
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions or keywords (e.g. pricing, timeline, Next.js, video)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-[#060810] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Accordion Section */}
      <section className="relative py-20 bg-transparent border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#0A0D18] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap z-10 ${
                      isSelected ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeFAQPageCategoryPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#0099FF] to-[#FF1361] rounded-full shadow-[0_0_15px_rgba(255,19,97,0.35)] -z-10"
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
              <div className="text-center py-16 bg-[#060810] rounded-[2.5rem] border border-white/10 text-slate-400 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <p className="text-base font-semibold text-white mb-1">No matching questions found</p>
                <p className="text-xs text-slate-400">Ask us directly below and our strategists will reply instantly.</p>
              </div>
            ) : (
              filteredFAQs.map((faq, idx) => {
                const isOpen = openIndex === faq.id;
                const cornerRadius = idx % 2 === 0 ? 'rounded-[2.25rem] rounded-tl-sm' : 'rounded-[2.25rem] rounded-tr-sm';
                return (
                  <motion.div
                    layout
                    key={faq.id}
                    className={`${cornerRadius} border transition-all duration-300 overflow-hidden relative ${
                      isOpen
                        ? 'bg-[#0A0D18] border-[#0099FF]/50 shadow-[0_0_30px_rgba(0,153,255,0.15)]'
                        : 'bg-[#060810] border-white/10 hover:border-white/25 shadow-[0_0_20px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    {isOpen && (
                      <BorderBeam size={100} duration={10} colorFrom="#0099FF" colorTo="#FF1361" />
                    )}

                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-display font-bold text-white leading-snug">
                        {faq.question}
                      </span>
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen ? 'bg-gradient-to-r from-[#0099FF] to-[#FF1361] text-white shadow-[0_0_12px_rgba(255,19,97,0.4)]' : 'bg-[#0A0D18] text-slate-400 border border-white/10'
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
                          <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-slate-300 font-sans-clean leading-relaxed border-t border-white/5">
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
          <div className="p-8 sm:p-12 rounded-[3rem] rounded-tl-lg rounded-br-lg bg-gradient-to-br from-[#0A0D18] via-[#060810] to-[#0A0D18] border border-[#0099FF]/40 shadow-[0_0_50px_rgba(0,153,255,0.15)] relative overflow-hidden">
            <BorderBeam size={130} duration={12} colorFrom="#0099FF" colorTo="#FF1361" />

            <div className="w-12 h-12 rounded-2xl bg-[#0099FF]/15 border border-[#0099FF]/30 text-[#38BDF8] flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,153,255,0.2)]">
              <MessageCircle className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-display font-black text-white mb-2">
              Have an Unlisted Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 font-sans-clean leading-relaxed">
              Type your question below to ask our team directly with a response within 24 business hours.
            </p>

            <form onSubmit={handleAskCustomQuestion} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="e.g. Can you integrate with custom PostgreSQL databases?"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-[#060810] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
              />
              <MagneticButton
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0099FF] via-[#0077EE] to-[#FF1361] hover:shadow-[0_0_25px_rgba(255,19,97,0.4)] text-white font-bold text-xs sm:text-sm whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer transition-all"
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
