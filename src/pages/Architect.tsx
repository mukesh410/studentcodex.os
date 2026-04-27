import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateStudyPlan } from '../services/geminiService';
import { Calendar, Clock, BookOpen, ChevronRight, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Architect() {
  const [subjects, setSubjects] = useState('');
  const [hours, setHours] = useState(4);
  const [examDate, setExamDate] = useState('');
  const [plan, setPlan] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const buildPlan = async () => {
    if (!subjects || !examDate) return;
    setIsGenerating(true);
    try {
      const result = await generateStudyPlan(subjects, hours, examDate);
      setPlan(result);
    } catch (err) {
      setPlan("PLAN_GEN_FAILED: DATELINE_PARADOX");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-12 max-w-6xl pt-8"
    >
      <div
        className="flex items-center gap-4"
      >
        <span className="w-8 h-[1px] bg-cyber-coral" />
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-cyber-coral glow-coral">
          Terminal : Architect
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-1px bg-white/5 border border-white/5">
        {/* Input Panel */}
        <div className="lg:col-span-1 bg-obsidian p-8 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <label className="font-mono text-[9px] uppercase tracking-widest opacity-40 flex items-center gap-2">
              <BookOpen size={10} /> Core Subjects
            </label>
            <input
              type="text"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="e.g. Quantum Physics, Calc IV"
              className="bg-transparent border-b border-white/10 py-2 font-mono text-sm focus:border-cyber-coral outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-mono text-[9px] uppercase tracking-widest opacity-40 flex items-center gap-2">
              <Clock size={10} /> Daily Bandwidth
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="16"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="flex-1 accent-cyber-coral"
              />
              <span className="font-mono text-xs text-cyber-coral">{hours}H</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-mono text-[9px] uppercase tracking-widest opacity-40 flex items-center gap-2">
              <Calendar size={10} /> Final Deadline
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="bg-transparent border border-white/10 p-3 font-mono text-xs focus:border-cyber-coral outline-none transition-colors invert"
            />
          </div>

          <button
            onClick={buildPlan}
            disabled={isGenerating || !subjects || !examDate}
            className="interactive mt-8 font-mono text-xs tracking-widest p-4 border border-cyber-coral text-cyber-coral hover:bg-cyber-coral hover:text-obsidian transition-all uppercase disabled:opacity-20 flex items-center justify-between group"
          >
            {isGenerating ? 'GENERATING...' : 'CONSTRUCT_PLAN'}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Plan Display Panel */}
        <div className="lg:col-span-3 bg-obsidian p-12 min-h-[600px] relative overflow-hidden">
          <h3 className="font-mono text-[9px] opacity-30 mb-12 uppercase tracking-[0.4em] flex items-center gap-3">
            <Activity size={12} className="animate-pulse" />
            Adaptive Allocation Map
          </h3>

          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8"
              >
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex gap-8 items-start border-l border-white/5 pl-8">
                    <div className="w-16 h-4 bg-white/5 animate-pulse" />
                    <div className="flex-1 h-3 bg-white/5 animate-pulse" />
                  </div>
                ))}
              </motion.div>
            ) : plan ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="prose prose-invert max-w-none max-h-[700px] overflow-y-auto pr-8 scrollbar-hide prose-headings:text-cyber-coral prose-headings:font-mono prose-headings:uppercase prose-headings:tracking-widest prose-p:font-mono prose-p:text-sm prose-li:font-mono prose-li:text-sm"
              >
                <ReactMarkdown>{plan}</ReactMarkdown>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-6 opacity-10">
                <Calendar size={80} strokeWidth={0.5} />
                <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-center">
                  Define spatial parameters to begin construction
                </p>
              </div>
            )}
          </AnimatePresence>

          {/* Aesthetic Overlay */}
          <div className="absolute bottom-12 right-12 font-mono text-[80px] opacity-[0.02] pointer-events-none select-none font-bold uppercase tracking-tighter">
            ARCHITECT
          </div>
        </div>
      </div>
    </motion.div>
  );
}
