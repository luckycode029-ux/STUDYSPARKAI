import React, { useState, useEffect } from 'react';
import { Youtube, Sparkles, FileText, Layout, BrainCircuit, CheckCircle2, Loader2, AlertCircle, FileX, ShieldAlert } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { motion, AnimatePresence } from 'motion/react';
import { StatusState } from './StatusState';

interface CreateKitProps {
  onGenerate: (url: string) => void;
  onCancel: () => void;
}

export const CreateKit: React.FC<CreateKitProps> = ({ onGenerate, onCancel }) => {
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<'invalid' | 'no-transcript' | 'failed' | null>(null);
  const [step, setStep] = useState(0);

  const steps = [
    { id: 1, label: 'Extracting transcript', icon: FileText },
    { id: 2, label: 'Understanding content', icon: BrainCircuit },
    { id: 3, label: 'Generating study materials', icon: Sparkles },
  ];

  useEffect(() => {
    let interval: any;
    if (isGenerating && step < steps.length && !error) {
      interval = setInterval(() => {
        // Randomly simulate errors for demo purposes
        const random = Math.random();
        if (step === 0 && random < 0.1) {
          setError('no-transcript');
          return;
        }
        if (step === 1 && random < 0.05) {
          setError('failed');
          return;
        }
        
        setStep((s) => s + 1);
      }, 2000);
    } else if (step === steps.length && !error) {
      setTimeout(() => {
        onGenerate(url);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGenerating, step, error]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Basic validation
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('invalid');
      return;
    }

    setError(null);
    setStep(0);
    setIsGenerating(true);
  };

  const reset = () => {
    setError(null);
    setIsGenerating(false);
    setStep(0);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-display font-black text-text-primary">Create Study Kit 📘</h1>
        <p className="text-text-secondary mt-2">Paste a YouTube link to transform it into learning material</p>
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 border-brand-coral/20 bg-brand-coral/5">
              {error === 'invalid' && (
                <StatusState 
                  variant="error"
                  icon={AlertCircle}
                  title="Invalid YouTube Link"
                  description="We couldn't recognize that URL. Please make sure you're pasting a valid YouTube video link."
                  actionLabel="Try Another Link"
                  onAction={reset}
                />
              )}
              {error === 'no-transcript' && (
                <StatusState 
                  variant="error"
                  icon={FileX}
                  title="Transcript Not Available"
                  description="This video doesn't have a transcript available. Our AI needs text to generate your study materials."
                  actionLabel="Try Different Video"
                  onAction={reset}
                />
              )}
              {error === 'failed' && (
                <StatusState 
                  variant="error"
                  icon={ShieldAlert}
                  title="Processing Failed"
                  description="Something went wrong while analyzing the video. Don't worry, it's not you—it's us. Please try again."
                  actionLabel="Retry Generation"
                  onAction={reset}
                />
              )}
            </Card>
          </motion.div>
        ) : !isGenerating ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-8 border-white/5 bg-brand-bg-alt/40 backdrop-blur-xl">
              <form onSubmit={handleGenerate} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-text-secondary uppercase tracking-widest ml-1">YouTube Video URL</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-secondary group-focus-within:text-brand-cyan transition-colors">
                      <Youtube size={24} />
                    </div>
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-14 pr-4 py-4.5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-cyan focus:ring-8 focus:ring-brand-cyan/5 outline-none transition-all text-lg text-text-primary placeholder:text-text-secondary/50"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h3 className="text-xs font-black text-brand-cyan uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Sparkles size={16} />
                    What will be generated?
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { label: 'Study Guide', icon: FileText, color: 'text-brand-cyan' },
                      { label: 'Flashcards', icon: Layout, color: 'text-brand-purple' },
                      { label: 'Practice Quiz', icon: BrainCircuit, color: 'text-brand-pink' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 text-center group">
                        <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center ${item.color} border border-white/10 group-hover:glow-primary transition-all`}>
                          <item.icon size={20} />
                        </div>
                        <span className="text-[11px] font-bold text-text-secondary leading-tight uppercase tracking-wider">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button 
                    variant="ghost" 
                    className="flex-1" 
                    onClick={onCancel}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-[2]" 
                    disabled={!url}
                    icon={Sparkles}
                    type="submit"
                  >
                    Generate Study Kit
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <Card className="p-12 text-center border-white/5 bg-brand-bg-alt/40 backdrop-blur-xl">
              <div className="relative w-28 h-28 mx-auto mb-10">
                <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
                <motion.div 
                  className="absolute inset-0 border-4 border-brand-cyan rounded-full border-t-transparent glow-cyan"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-brand-cyan">
                  <Sparkles size={36} />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-text-primary mb-3">Crafting your Study Kit ✨</h2>
              <p className="text-text-secondary mb-12 font-medium">Our AI is deep-diving into the lecture content...</p>

              <div className="max-w-xs mx-auto space-y-4">
                {steps.map((s, i) => {
                  const isDone = step > i;
                  const isCurrent = step === i;
                  return (
                    <div 
                      key={s.id} 
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isCurrent ? 'bg-white/5 border border-white/10 glow-cyan' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isDone ? 'bg-emerald-500/20 text-emerald-400' : isCurrent ? 'spark-gradient text-white' : 'bg-white/5 text-text-secondary/30'
                      }`}>
                        {isDone ? <CheckCircle2 size={20} /> : isCurrent ? <Loader2 size={20} className="animate-spin" /> : <s.icon size={20} />}
                      </div>
                      <span className={`text-sm font-bold transition-colors uppercase tracking-widest ${
                        isDone ? 'text-emerald-400' : isCurrent ? 'text-brand-cyan' : 'text-text-secondary/30'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
            
            <p className="text-center text-sm text-text-secondary/40 italic font-medium">
              "The beautiful thing about learning is that no one can take it away from you." — B.B. King
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
