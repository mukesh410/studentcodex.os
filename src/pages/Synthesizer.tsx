import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { synthesizeNotes } from '../services/geminiService';
import { FileText, Zap, Brain, HelpCircle, Upload, Download } from 'lucide-react';
import { extractTextFromPDF } from '../lib/pdf';
import ReactMarkdown from 'react-markdown';

export default function Synthesizer() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }

    setIsParsing(true);
    try {
      const extractedText = await extractTextFromPDF(file);
      setText(prev => prev ? prev + '\n\n' + extractedText : extractedText);
    } catch (err) {
      console.error(err);
      alert('Failed to parse PDF.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleSynthesize = async () => {
    if (!text) return;
    setIsProcessing(true);
    try {
      const result = await synthesizeNotes(text);
      setOutput(result);
    } catch (err) {
      setOutput("ERROR: CORE_DUMP_FAILURE");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthesized_notes_${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-12 max-w-5xl pt-8"
    >
      <div
        className="flex items-center gap-4"
      >
        <span className="w-8 h-[1px] bg-cyber-lime" />
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-cyber-lime glow-lime">
          Terminal : Synthesizer
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div className="group relative border border-white/10 hover:border-cyber-lime transition-colors">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isParsing ? "PARSING_PDF_STREAM..." : "PASTE RAW NOTES // PDF TRANSCRIPT HERE"}
              disabled={isParsing}
              className="w-full bg-transparent p-8 font-mono text-sm outline-none min-h-[400px] transition-colors resize-none overflow-y-auto"
            />
            <div className="absolute top-4 right-4 flex gap-4 opacity-10 group-hover:opacity-100 transition-opacity">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="application/pdf" 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-cyber-lime cursor-pointer transition-colors"
                title="Upload PDF"
              >
                <Upload size={24} />
              </button>
              <FileText className="text-cyber-lime" size={24} />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSynthesize}
              disabled={isProcessing || isParsing || !text}
              className="flex-1 interactive font-mono text-xs tracking-[0.4em] px-8 py-5 border border-cyber-lime/40 bg-cyber-lime text-obsidian hover:bg-white hover:border-white transition-all uppercase font-bold disabled:opacity-20 flex items-center justify-center gap-4"
            >
              {isProcessing ? 'SYNTHESIZING...' : 'EXECUTE_SYNTHESIS'}
              {!isProcessing && <Zap size={16} fill="currentColor" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white/[0.01] border border-white/5 p-12 min-h-[500px] relative overflow-hidden backdrop-blur-sm">
            {/* Aesthetic background graphics */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Brain size={120} className="text-cyber-lime" />
            </div>

            <div className="flex justify-between items-start mb-12">
              <h3 className="font-mono text-[9px] opacity-30 uppercase tracking-[0.3em] flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-cyber-lime animate-ping' : 'bg-cyber-lime/40'}`} />
                Structured Intelligence Output
              </h3>

              {output && !isProcessing && (
                <button
                  onClick={handleExport}
                  className="group/export flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-cyber-lime/40 hover:text-cyber-lime transition-colors"
                  title="Export as Markdown"
                >
                  <Download size={14} className="group-hover/export:scale-110 transition-transform" />
                  <span>EXPORT_MD</span>
                </button>
              )}
            </div>

            {isProcessing ? (
              <div className="space-y-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-3">
                    <div className="h-2 bg-white/10 w-1/4 animate-pulse" />
                    <div className="h-1 bg-white/5 w-full animate-pulse" />
                    <div className="h-1 bg-white/5 w-5/6 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : output ? (
              <div className="prose prose-invert max-w-none prose-p:text-sm prose-p:leading-relaxed prose-headings:font-mono prose-headings:text-cyber-lime prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-sm prose-ul:font-sans prose-li:text-sm prose-li:opacity-80">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 opacity-20">
                <HelpCircle size={48} strokeWidth={1} />
                <p className="font-mono text-[10px] uppercase tracking-widest">Awaiting raw input stream</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['EXTRACT_CORE', 'DETECT_GAPS', 'GEN_QUESTIONS'].map((label) => (
              <div key={label} className="border border-white/5 p-3 flex flex-col gap-1 items-center justify-center grayscale opacity-30">
                <span className="font-mono text-[7px] tracking-tighter opacity-50 uppercase">{label}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
