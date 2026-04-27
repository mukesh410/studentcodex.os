import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [accent, setAccent] = useState('blueprint');
  
  const accents = [
    { id: 'blueprint', color: 'bg-blueprint', name: 'GLACIER' },
    { id: 'cyber-lime', color: 'bg-cyber-lime', name: 'TOXIC' },
    { id: 'cyber-amber', color: 'bg-cyber-amber', name: 'EMBER' },
    { id: 'cyber-magenta', color: 'bg-cyber-magenta', name: 'NEON' },
    { id: 'cyber-coral', color: 'bg-cyber-coral', name: 'SOLAR' },
    { id: 'cyber-teal', color: 'bg-cyber-teal', name: 'PULSE' },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty('--active-accent', `var(--color-${accent})`);
  }, [accent]);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-mono text-[8px] opacity-30 tracking-[0.4em] uppercase">Metabolic Shift</h4>
      <div className="flex gap-2">
        {accents.map((a) => (
          <button
            key={a.id}
            onClick={() => setAccent(a.id)}
            className={`w-4 h-4 rounded-full border-2 transition-all ${accent === a.id ? 'border-white scale-125' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-110'} ${a.color} interactive cursor-none`}
            title={a.name}
          />
        ))}
      </div>
    </div>
  );
}
