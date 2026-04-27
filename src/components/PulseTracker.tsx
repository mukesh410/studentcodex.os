import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, TrendingUp } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  duration: number;
}

export default function PulseTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState(30);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const total = tasks.reduce((acc, t) => acc + t.duration, 0);
    setTotalHours(total / 60);
  }, [tasks]);

  const addTask = () => {
    if (!taskName) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      name: taskName,
      duration: duration
    };
    setTasks([newTask, ...tasks]);
    setTaskName('');
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-mono text-[9px] opacity-30 uppercase tracking-[0.3em] flex items-center gap-2">
          <Activity size={12} className="text-cyber-magenta glow-magenta" />
          Pulse Tracker
        </h3>
        <div className="font-mono text-xs text-cyber-violet font-bold glow-violet">
          {totalHours.toFixed(1)}H LOGGED
        </div>
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="ENTER TASK NAME" 
          className="flex-1 bg-transparent border-b border-white/10 px-2 py-2 font-mono text-[10px] focus:border-cyber-magenta outline-none"
        />
        <select 
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="bg-obsidian border border-white/10 text-[10px] font-mono p-2 outline-none focus:border-cyber-magenta text-cyber-magenta"
        >
          <option value={15}>15M</option>
          <option value={30}>30M</option>
          <option value={45}>45M</option>
          <option value={60}>1H</option>
          <option value={120}>2H</option>
        </select>
        <button 
          onClick={addTask}
          className="interactive font-mono text-[9px] bg-gradient-to-r from-cyber-magenta to-cyber-violet text-white px-4 hover:opacity-80 transition-opacity"
        >
          LOG
        </button>
      </div>

      <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide">
        {tasks.length === 0 ? (
          <div className="py-8 text-center opacity-10 font-mono text-[9px] uppercase tracking-widest border border-dashed border-white/10">
            Awaiting metabolic output
          </div>
        ) : (
          tasks.map((task) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center bg-white/[0.02] p-3 border-l-2 border-cyber-magenta"
            >
              <span className="font-mono text-[10px] uppercase truncate max-w-[150px]">{task.name}</span>
              <span className="font-mono text-[9px] opacity-40">{task.duration}M</span>
            </motion.div>
          ))
        )}
      </div>

      <div className="pt-4 border-t border-white/5 flex gap-4 items-center">
        <TrendingUp size={12} className="text-cyber-magenta opacity-40" />
        <p className="font-mono text-[8px] opacity-30 leading-relaxed uppercase tracking-tighter">
          Recursive analysis indicates {totalHours > 4 ? 'high optimality' : 'pending calibration'}. Keep input consistent.
        </p>
      </div>
    </div>
  );
}
