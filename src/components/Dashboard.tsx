import React from 'react';
import { Plus, Play, Trash2, Clock, CheckCircle2, BookMarked } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { motion } from 'motion/react';
import { StatusState } from './StatusState';

interface StudyKit {
  id: string;
  title: string;
  status: 'ready' | 'processing';
  date: string;
  thumbnail: string;
}

export const Dashboard: React.FC<{ onCreateNew: () => void, onViewKit: () => void }> = ({ onCreateNew, onViewKit }) => {
  const kits: StudyKit[] = [
    {
      id: '1',
      title: 'Introduction to Quantum Mechanics 🧠',
      status: 'ready',
      date: '2 hours ago',
      thumbnail: 'https://picsum.photos/seed/quantum/400/225'
    },
    {
      id: '2',
      title: 'Advanced React Patterns 2024 ⚡',
      status: 'processing',
      date: '15 mins ago',
      thumbnail: 'https://picsum.photos/seed/react/400/225'
    },
    {
      id: '3',
      title: 'Macroeconomics: Monetary Policy 📘',
      status: 'ready',
      date: 'Yesterday',
      thumbnail: 'https://picsum.photos/seed/econ/400/225'
    }
  ];

  if (kits.length === 0) {
    return (
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl font-display font-bold text-text-primary">Welcome back, Alex! 👋</h1>
          <p className="text-text-secondary mt-1">Ready to master something new today?</p>
        </header>
        <Card className="py-16">
          <StatusState 
            icon={BookMarked} 
            title="No study kits yet" 
            description="Your library is looking a bit empty. Paste a YouTube link to generate your first study kit!"
            actionLabel="Create My First Kit"
            onAction={onCreateNew}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Welcome back, Alex! 👋</h1>
          <p className="text-text-secondary mt-1">Ready to master something new today?</p>
        </div>
        <Button icon={Plus} onClick={onCreateNew}>
          Create New Study Kit
        </Button>
      </header>

      <section>
        <h2 className="text-xl font-bold text-text-primary mb-6">Recent Study Kits</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit, i) => (
            <Card key={kit.id} delay={i * 0.1} className="p-0 overflow-hidden group border-white/5">
              <div className="relative aspect-video">
                <img 
                  src={kit.thumbnail} 
                  alt={kit.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-brand-bg/20 transition-colors" />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md ${
                    kit.status === 'ready' 
                      ? 'bg-emerald-500/90 text-white' 
                      : 'bg-brand-orange/90 text-white'
                  }`}>
                    {kit.status === 'ready' ? <CheckCircle2 size={12} /> : <Clock size={12} className="animate-spin" />}
                    {kit.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-text-primary line-clamp-1 group-hover:text-brand-cyan transition-colors">
                  {kit.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">{kit.date}</p>
                
                <div className="flex items-center gap-3 mt-6">
                  <Button 
                    variant={kit.status === 'ready' ? 'primary' : 'outline'} 
                    size="sm" 
                    className="flex-1"
                    disabled={kit.status === 'processing'}
                    icon={Play}
                    onClick={onViewKit}
                  >
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3 text-text-secondary hover:text-brand-coral hover:bg-brand-coral/10">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
