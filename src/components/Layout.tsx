import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import BackgroundGrid from './BackgroundGrid';

import ThemeSwitcher from './ThemeSwitcher';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen selection:bg-blueprint selection:text-white bg-obsidian">
      <CustomCursor />
      <BackgroundGrid />
      
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference border-b border-white/5 bg-obsidian/50 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-mono text-xs tracking-widest hover:text-blueprint transition-colors font-bold">
            C.S.OS
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 font-mono text-[9px] opacity-40 uppercase tracking-widest">
          <span>LDN 05:17 AM</span>
          <span className="opacity-20 mx-2">▶</span>
          <span>TYO 01:17 PM</span>
        </div>

        <div className="flex gap-8 items-center">
          <div className="hidden lg:flex gap-8">
            {[
              { name: 'ORACLE', path: '/oracle', color: 'text-blueprint' },
              { name: 'SYNTHESIZER', path: '/synthesizer', color: 'text-cyber-lime' },
              { name: 'ARCHITECT', path: '/architect', color: 'text-cyber-coral' }
            ].map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`font-mono text-[9px] tracking-[0.2em] transition-all duration-500 relative group py-2 ${
                  location.pathname === item.path ? item.color : 'opacity-40 hover:opacity-100 hover:' + item.color
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute -bottom-1 left-0 w-full h-0.5 ${item.color.replace('text-', 'bg-')}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
          <button className="font-mono text-[9px] tracking-widest border border-white/20 px-3 py-1.5 hover:bg-white hover:text-obsidian transition-all uppercase">
            CONTACT_CORE
          </button>
        </div>
      </nav>

      <main className="relative pt-24 min-h-screen">
        {children}
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-end mix-blend-difference z-50">
        <div className="font-mono text-[9px] opacity-40 uppercase tracking-widest flex flex-col gap-1">
          <span>CODEX_STUDENT_ENVIRONMENT // SPECULATIVE_UI</span>
          <span>ENGINE: GEMINI-3-FLASH-PREVIEW</span>
        </div>
        
        <div className="flex items-center gap-12 font-mono text-[9px] opacity-40 uppercase">
          <ThemeSwitcher />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            VITAL_SIGNS: STABLE
          </div>
        </div>
      </footer>
    </div>
  );
}
