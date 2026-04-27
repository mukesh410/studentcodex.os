import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function BackgroundGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax: background grid lines move at 0.2x speed
  const gridY = useTransform(scrollY, [0, 5000], [0, -1000]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-obsidian">
      <motion.div 
        className="absolute inset-[-100%] broken-grid"
        style={{ y: gridY }}
      />
    </div>
  );
}
