import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ScrambleText from '../components/ScrambleText';

const modules = [
  { 
    id: 'ORACLE', 
    name: 'Oracle', 
    path: '/oracle', 
    color: 'text-blueprint', 
    bg: 'bg-blueprint',
    glow: 'glow-blueprint',
    border: 'border-blueprint',
    desc: 'Conversational academic query engine. Recursive problem solving via high-density LLM synthesis.',
    specs: ['LATENCY: 12ms', 'MODEL: GEMINI-3-FLASH', 'PARADIGM: ZERO-SHOT']
  },
  { 
    id: 'SYNTHESIZER', 
    name: 'Synthesizer', 
    path: '/synthesizer', 
    color: 'text-cyber-lime', 
    bg: 'bg-cyber-lime',
    glow: 'glow-lime',
    border: 'border-lime',
    desc: 'Structure unstructured raw intelligence. OCR and PDF high-fidelity abstraction.',
    specs: ['BUFFER: 4GB', 'TYPE: DATA_REDUCTION', 'MODE: LOSSLESS']
  },
  { 
    id: 'ARCHITECT', 
    name: 'Architect', 
    path: '/architect', 
    color: 'text-cyber-coral', 
    bg: 'bg-cyber-coral',
    glow: 'glow-coral',
    border: 'border-coral',
    desc: 'Algorithmic time allocation system. Adaptive scheduling based on metabolic bandwidth.',
    specs: ['LOGIC: HEURISTIC', 'GOAL: OPTIMAL_ALLOC', 'DRIFT: ±0.04%']
  }
];
const floatingWords = [
  { word: 'ADAPTIVE', top: '15%', left: '10%', delay: 0 },
  { word: 'SYNTHESIS', top: '65%', left: '15%', delay: 1 },
  { word: 'RECURSIVE', top: '40%', left: '80%', delay: 2 },
  { word: 'METABOLIC', top: '85%', left: '70%', delay: 3 },
  { word: 'NEURAL', top: '25%', left: '75%', delay: 1.5 },
  { word: 'COGNITIVE', top: '75%', left: '40%', delay: 2.5 },
  { word: 'HEURISTIC', top: '55%', left: '60%', delay: 4 },
  { word: 'ACADEMIC', top: '10%', left: '45%', delay: 5 },
  { word: 'STUDENT', top: '30%', left: '20%', delay: 4.5 },
  { word: 'THESIS', top: '90%', left: '25%', delay: 3.5 },
  { word: 'ALGORITHM', top: '5%', left: '12%', delay: 2 },
  { word: 'LOGIC', top: '20%', left: '90%', delay: 1.2 },
  { word: 'SYLLABUS', top: '45%', left: '5%', delay: 0.5 },
  { word: 'CALCULUS', top: '70%', left: '85%', delay: 3 },
  { word: 'NEURO', top: '15%', left: '60%', delay: 2.2 },
  { word: 'QUANTUM', top: '35%', left: '15%', delay: 1.8 },
  { word: 'SCHEMA', top: '80%', left: '10%', delay: 4 },
  { word: 'OS', top: '50%', left: '50%', delay: 0 },
  { word: 'BUFFER', top: '95%', left: '55%', delay: 5 },
  { word: 'LATENCY', top: '12%', left: '82%', delay: 2.5 },
  { word: 'CODEX', top: '38%', left: '48%', delay: 1 },
  { word: 'SENSORY', top: '28%', left: '38%', delay: 3.2 },
  { word: 'KERNEL', top: '68%', left: '68%', delay: 4.2 },
  { word: 'SIGNAL', top: '82%', left: '42%', delay: 0.8 },
];

export default function Home() {
  const [hoveredModule, setHoveredModule] = useState<typeof modules[0] | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const handleModuleClick = (path: string) => {
    setIsExpanding(true);
    setTimeout(() => {
      navigate(path);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)] gap-0 border-t border-white/10 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Full Screen Expansion Overlay */}
      <AnimatePresence>
        {isExpanding && (
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] h-full ${hoveredModule?.bg || 'bg-blueprint'}`}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Left Side: Dynamic Visual / Info Panel */}
      <section className="lg:w-[55%] flex flex-col justify-start items-center p-12 lg:p-24 pt-20 lg:pt-32 relative overflow-hidden border-r border-white/10 min-h-[400px]">
        {/* Floating Background Words */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingWords.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.15, // Slightly more contrast
                y: [0, -20, 0],
                x: [0, 10, 0],
                translateX: (mousePos.x - window.innerWidth / 2) * 0.02 * (i % 3 + 1),
                translateY: (mousePos.y - window.innerHeight / 2) * 0.02 * (i % 3 + 1),
              }}
              transition={{ 
                opacity: { duration: 2, delay: item.delay },
                y: { duration: 10 + i, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
                translateX: { type: 'spring', damping: 20, stiffness: 50 },
                translateY: { type: 'spring', damping: 20, stiffness: 50 },
              }}
              className="absolute font-mono text-[9px] tracking-[0.5em] font-bold text-white whitespace-nowrap"
              style={{ top: item.top, left: item.left }}
            >
              {item.word}
            </motion.span>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {!hoveredModule ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center z-10"
            >
              <h1 className="text-[12vw] lg:text-[9vw] font-bold tracking-tighter uppercase leading-[0.75] mb-4 text-chromatic glass-text">
                Codex.<br/>OS
              </h1>
              <div className="flex gap-4 justify-center items-center font-mono text-[10px] tracking-[0.4em] mt-12">
                <span className="text-active glow-active">SYSTEM READY</span>
                <span className="w-12 h-[1px] bg-white/20" />
                <span className="opacity-30">EST. 2026</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="z-10 w-full max-w-xl"
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <span className={`w-12 h-[1px] ${hoveredModule.bg}`} />
                  <span className={`font-mono text-[10px] tracking-[0.5em] uppercase font-bold ${hoveredModule.color}`}>
                    Terminal_Insight
                  </span>
                </div>
                
                <h2 className="text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-none glass-text">
                  {hoveredModule.name}
                </h2>
                
                <p className="font-mono text-sm opacity-90 leading-relaxed uppercase tracking-wide max-w-md">
                  {hoveredModule.desc}
                </p>

                <div className="grid grid-cols-1 gap-3 mt-4">
                  {hoveredModule.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-4 border-l border-white/10 pl-4 py-1">
                      <span className="font-mono text-[10px] opacity-20">[{i}]</span>
                      <span className="font-mono text-[10px] tracking-widest opacity-80">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated background aura - adapts to selection */}
        <div className="absolute inset-0 pointer-events-none">
           <motion.div 
             animate={{ 
               scale: hoveredModule ? [1.1, 1.3, 1.1] : [1, 1.2, 1],
               opacity: hoveredModule ? [0.1, 0.15, 0.1] : [0.05, 0.1, 0.05],
               backgroundColor: hoveredModule ? `var(--color-${hoveredModule.id.toLowerCase() === 'oracle' ? 'blueprint' : hoveredModule.id.toLowerCase() === 'synthesizer' ? 'cyber-lime' : 'cyber-coral'})` : 'var(--active-accent)'
             }}
             transition={{ 
               scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
               opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
               backgroundColor: { duration: 1 }
             }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[150px]" 
           />
        </div>
      </section>

      {/* Right Side: List of Features */}
      <section className="lg:w-[45%] flex flex-col p-0 bg-white/[0.01] relative z-10">
        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-obsidian/30 backdrop-blur-sm">
          <h2 className="font-mono text-[9px] tracking-[0.4em] uppercase opacity-60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-active rounded-full animate-pulse" />
            [SELECTED_TERMINALS]
          </h2>
          <span className="font-mono text-[9px] opacity-20">BUILD_4.2</span>
        </div>

        <div className="flex flex-col h-full">
          {modules.map((module, i) => (
            <div 
              key={module.id}
              onMouseEnter={() => setHoveredModule(module)}
              onMouseLeave={() => setHoveredModule(null)}
              onClick={() => handleModuleClick(module.path)}
              className="group border-b border-white/10 p-8 lg:p-12 transition-all hover:bg-white/[0.03] cursor-none interactive overflow-hidden relative"
            >
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-8">
                  <span className={`w-3 h-3 rounded-full border border-white/40 group-hover:scale-150 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.3)] ${module.bg}`} />
                  <div>
                    <h3 className={`text-2xl lg:text-3xl font-medium tracking-tight uppercase group-hover:translate-x-4 transition-transform duration-700 ${module.color}`}>
                      {module.name}
                    </h3>
                    <p className="font-mono text-[8px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 uppercase tracking-widest mt-1">
                      {module.desc.split('.')[0]}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 pr-4">
                  <span className="font-mono text-[9px] tracking-widest opacity-20 group-hover:opacity-100 transition-opacity">/0{i+1}</span>
                  <span className={`font-mono text-[8px] tracking-[0.3em] uppercase hidden lg:block opacity-40 group-hover:opacity-100 transition-opacity`}>{module.id}</span>
                </div>
              </div>
              {/* Highlight sweep on hover */}
              <div className={`absolute top-0 left-0 w-[2px] h-0 group-hover:h-full transition-all duration-500 ${module.bg}`} />
            </div>
          ))}
          
          {/* Fill the remaining space with empty slots */}
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="border-b border-white/10 p-8 lg:p-12 opacity-[0.03]">
              <div className="flex justify-between items-center grayscale">
                <div className="flex items-center gap-8">
                  <span className="w-3 h-3 rounded-full border border-white opacity-20" />
                  <div className="h-6 w-32 bg-white opacity-20" />
                </div>
                <span className="font-mono text-[9px] opacity-20 pr-4">-- / --</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative footer details on home page */}
      <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-4 mix-blend-difference z-20 pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[9px] tracking-[0.3em] opacity-40 uppercase">CORE_KERNEL_LOADED</div>
          <div className="font-mono text-[8px] opacity-20">HASH: 0x821...9FA</div>
        </div>
        <div className="flex flex-col gap-2 mt-4 font-mono text-[9px] tracking-widest uppercase">
          <span className="opacity-30 hover:opacity-100 transition-opacity underline underline-offset-4">LINKEDIN</span>
          <span className="opacity-30 hover:opacity-100 transition-opacity underline underline-offset-4">INSTAGRAM</span>
        </div>
        <div className="mt-8 font-mono text-[10px] tracking-widest opacity-20 uppercase">
          EST.<br/>04.27.26
        </div>
      </div>
    </motion.div>
  );
}
