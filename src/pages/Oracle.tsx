import { useState } from 'react';
import { motion } from 'motion/react';
import { askOracle } from '../services/geminiService';
import ScrambleText from '../components/ScrambleText';
import ReactMarkdown from 'react-markdown';

type OracleMode = 'simple' | 'example' | 'short' | 'default';

export default function Oracle() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<{ p: string, r: string }[]>([]);

  const solve = async (mode: OracleMode = 'default') => {
    if (!query) return;
    setIsProcessing(true);
    try {
      const result = await askOracle(query, mode);
      setResponse(result);
      setHistory(prev => [{ p: query, r: result }, ...prev].slice(0, 5));
    } catch (err) {
      setResponse("ERROR: QUANTUM_LINK_FAILURE");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-12 max-w-4xl pt-8"
    >
      <div
        className="flex items-center gap-4"
      >
        <span className="w-8 h-[1px] bg-blueprint" />
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-blueprint glow-blueprint">
          Terminal : Oracle
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER ACADEMIC QUERY // INPUT DATA"
          className="w-full bg-transparent border border-white/10 p-8 font-mono text-sm focus:border-blueprint outline-none min-h-[160px] transition-colors resize-none"
        />

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'default', label: 'GENERATE RESPONSE' },
            { id: 'simple', label: 'EXPLAIN LIKE 10' },
            { id: 'example', label: 'GIVE EXAMPLE' },
            { id: 'short', label: 'SHORT ANSWER' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => solve(mode.id as OracleMode)}
              disabled={isProcessing}
              className="interactive font-mono text-[9px] tracking-widest px-4 py-2 border border-white/10 hover:border-blueprint hover:bg-blueprint/5 transition-all uppercase disabled:opacity-30"
            >
              [{mode.label}]
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/5 p-8 min-h-[300px]">
            <h3 className="font-mono text-[9px] opacity-30 mb-8 uppercase tracking-widest flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-blueprint animate-pulse' : 'bg-green-500'}`} />
              Synthesis Output
            </h3>
            
            <div className="font-sans text-lg leading-relaxed opacity-90 prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-mono prose-headings:text-blueprint prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-sm prose-li:text-base prose-li:opacity-80">
              {isProcessing ? (
                <div className="flex flex-col gap-4">
                  <div className="h-4 bg-white/5 w-3/4 animate-pulse" />
                  <div className="h-4 bg-white/5 w-full animate-pulse" />
                  <div className="h-4 bg-white/5 w-5/6 animate-pulse" />
                </div>
              ) : response ? (
                <ReactMarkdown>{response}</ReactMarkdown>
              ) : (
                <span className="opacity-20 uppercase font-mono text-xs italic tracking-widest">Awaiting digital transcription...</span>
              )}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/5 p-6 h-full">
            <h3 className="font-mono text-[9px] opacity-30 mb-6 uppercase tracking-widest">Query History</h3>
            <div className="flex flex-col gap-4">
              {history.length === 0 ? (
                <p className="font-mono text-[9px] opacity-20 uppercase">Empty Log</p>
              ) : (
                history.map((item, i) => (
                  <div key={i} className="group cursor-none interactive" onClick={() => setQuery(item.p)}>
                    <p className="font-mono text-[10px] truncate opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                      {item.p}
                    </p>
                    <div className="w-full h-[1px] bg-white/10 mt-1" />
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
