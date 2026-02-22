/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Youtube, 
  BookOpen, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Play, 
  FileText, 
  BrainCircuit, 
  GraduationCap,
  ArrowRight,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Auth } from './components/Auth';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CreateKit } from './components/CreateKit';
import { StudyKitView } from './components/StudyKitView';
import { Menu } from 'lucide-react';
import { MOCK_STUDY_KIT } from './mockData';
import { Logo } from './components/Logo';

export default function App() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState<'home' | 'session' | 'login' | 'signup' | 'dashboard' | 'create-kit'>('home');
  const [currentKit, setCurrentKit] = useState(MOCK_STUDY_KIT);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setView('session');
    }, 1500);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  const handleGenerateKit = (videoUrl: string) => {
    setUrl(videoUrl);
    // In a real app, we would fetch the generated kit data here
    // For MVP, we'll just use the mock data
    setCurrentKit({
      ...MOCK_STUDY_KIT,
      videoUrl
    });
    setView('session');
  };

  if (isLoggedIn && (view === 'dashboard' || view === 'session' || view === 'create-kit')) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col lg:flex-row">
        <Sidebar 
          activeItem={view === 'dashboard' ? 'dashboard' : view === 'create-kit' ? 'create' : 'kits'} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={(item) => {
            if (item === 'create') setView('create-kit');
            else if (item === 'dashboard') setView('dashboard');
            else if (item === 'kits') setView('dashboard');
          }}
          onLogout={handleLogout}
        />
        
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-4 glass-panel border-b border-white/5 sticky top-0 z-30">
            <Logo size="sm" />
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-text-secondary hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </header>

          <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto no-scrollbar">
            <div className="max-w-6xl mx-auto w-full">
              <AnimatePresence mode="wait">
                {view === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Dashboard 
                      onCreateNew={() => setView('create-kit')} 
                      onViewKit={() => setView('session')}
                    />
                  </motion.div>
                )}
                {view === 'create-kit' && (
                  <motion.div
                    key="create-kit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <CreateKit 
                      onGenerate={handleGenerateKit} 
                      onCancel={() => setView('dashboard')} 
                    />
                  </motion.div>
                )}
                {view === 'session' && (
                  <motion.div
                    key="session"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <StudyKitView data={currentKit} onBack={() => setView(isLoggedIn ? 'dashboard' : 'home')} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col selection:bg-brand-cyan/30">
      <Navbar onNavigate={setView} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Section */}
              <section className="text-center mb-24 md:mb-32">
                <div className="space-y-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black text-brand-cyan uppercase tracking-[0.2em] mb-4"
                  >
                    <Sparkles size={14} />
                    The Future of Learning is Here
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-display font-black text-text-primary leading-[1.1] tracking-tight"
                  >
                    Turn Lectures into <br />
                    <span className="gradient-text">Smart Material</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium"
                  >
                    Instant study guides, flashcards, and quizzes powered by AI. 🧠 <br className="hidden md:block" />
                    Master any subject faster than ever before.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="max-w-3xl mx-auto"
                >
                  <form onSubmit={handleAnalyze} className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-text-secondary group-focus-within:text-brand-cyan transition-colors">
                      <Youtube size={28} />
                    </div>
                    <input
                      type="text"
                      placeholder="Paste YouTube lecture URL here..."
                      className="w-full pl-16 pr-64 py-6 bg-white/5 border border-white/10 rounded-3xl shadow-2xl focus:border-brand-cyan focus:ring-8 focus:ring-brand-cyan/5 outline-none text-xl transition-all text-text-primary placeholder:text-text-secondary/50 backdrop-blur-md"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <div className="absolute right-3 top-3 bottom-3">
                      <Button 
                        type="submit" 
                        size="lg"
                        loading={isProcessing}
                        icon={Sparkles}
                        className="h-full"
                      >
                        Generate Kit
                      </Button>
                    </div>
                  </form>
                  <div className="mt-6 text-sm font-bold text-text-secondary uppercase tracking-widest opacity-60">
                    ⚡ Instant Analysis • 📘 Smart Guides • 🧠 Adaptive Quizzes
                  </div>
                </motion.div>
              </section>

              {/* How It Works Section */}
              <section className="mb-32">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-text-primary mb-4">How It Works</h2>
                  <p className="text-text-secondary text-lg">Master any subject in three simple steps</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                  {[
                    {
                      step: "01",
                      title: "Paste YouTube link",
                      description: "Copy the URL of any educational video or lecture from YouTube.",
                      icon: <Youtube className="text-brand-cyan" />
                    },
                    {
                      step: "02",
                      title: "AI Analysis",
                      description: "Our AI analyzes the video, transcribes content, and identifies key concepts.",
                      icon: <BrainCircuit className="text-brand-purple" />
                    },
                    {
                      step: "03",
                      title: "Master Subject",
                      description: "Get instant study guides, flashcards, and quizzes to reinforce your learning.",
                      icon: <GraduationCap className="text-brand-pink" />
                    }
                  ].map((item, i) => (
                    <div key={i} className="text-center relative group">
                      <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:glow-cyan transition-all duration-500">
                        {item.icon}
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-display font-black text-white/5 -z-10 group-hover:text-white/10 transition-colors">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary mb-4">{item.title}</h3>
                      <p className="text-text-secondary leading-relaxed font-medium">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Features Grid */}
              <section className="mb-32">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-text-primary mb-4">Features</h2>
                  <p className="text-text-secondary text-lg">Everything you need to succeed in your studies</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: <FileText className="text-brand-cyan" />,
                      title: "Study Guides 📘",
                      description: "Comprehensive, structured notes that break down complex topics into digestible sections."
                    },
                    {
                      icon: <Layout className="text-brand-purple" />,
                      title: "Flashcards 🧠",
                      description: "Automatically generated flashcards for key terms and concepts to boost retention."
                    },
                    {
                      icon: <BrainCircuit className="text-brand-pink" />,
                      title: "Practice Quizzes ⚡",
                      description: "Test your knowledge with AI-powered quizzes that adapt to the lecture content."
                    },
                    {
                      icon: <BookOpen className="text-brand-orange" />,
                      title: "Smart Summaries ✨",
                      description: "Quick overviews and key takeaways for when you're short on time."
                    }
                  ].map((feature, i) => (
                    <Card key={i} delay={i * 0.1} className="border-white/5 hover:border-white/10">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:glow-primary transition-all">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary mb-4">{feature.title}</h3>
                      <p className="text-text-secondary leading-relaxed text-sm font-medium">{feature.description}</p>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-black text-text-primary">Recent Lectures</h2>
                  <Button variant="ghost" size="sm" icon={ChevronRight} className="flex-row-reverse font-black uppercase tracking-widest text-xs">
                    View all
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Introduction to Quantum Mechanics",
                      channel: "MIT OpenCourseWare",
                      duration: "45:12",
                      date: "2 hours ago",
                      thumbnail: "https://picsum.photos/seed/quantum/400/225"
                    },
                    {
                      title: "Advanced React Patterns 2024",
                      channel: "Frontend Masters",
                      duration: "1:12:05",
                      date: "Yesterday",
                      thumbnail: "https://picsum.photos/seed/react/400/225"
                    },
                    {
                      title: "Macroeconomics: Monetary Policy",
                      channel: "CrashCourse",
                      duration: "12:30",
                      date: "3 days ago",
                      thumbnail: "https://picsum.photos/seed/econ/400/225"
                    }
                  ].map((lecture, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => setView('session')}
                    >
                      <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-2xl border border-white/5">
                        <img 
                          src={lecture.thumbnail} 
                          alt={lecture.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-brand-bg/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-16 h-16 spark-gradient rounded-full flex items-center justify-center text-white shadow-2xl glow-primary">
                            <Play size={28} fill="currentColor" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-xs font-black rounded-xl">
                          {lecture.duration}
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-text-primary group-hover:text-brand-cyan transition-colors line-clamp-1">
                        {lecture.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-sm font-bold text-text-secondary">
                        <span>{lecture.channel}</span>
                        <span className="text-white/10">•</span>
                        <span>{lecture.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {(view === 'login' || view === 'signup') && (
            <Auth 
              mode={view} 
              onSwitch={setView} 
              onSuccess={handleLoginSuccess} 
            />
          )}

          {view === 'session' && (
            <motion.div
              key="session"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StudyKitView data={currentKit} onBack={() => setView(isLoggedIn ? 'dashboard' : 'home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-bg-alt/50 border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <Logo size="md" />
          
          <div className="text-text-secondary font-bold uppercase tracking-[0.2em] text-xs">
            Built for the next generation of thinkers 🧠
          </div>

          <div className="flex items-center gap-10 text-sm font-bold text-text-secondary">
            <a href="#" className="hover:text-brand-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-cyan transition-colors">Contact</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/5 text-center text-text-secondary/40 text-xs font-bold tracking-widest uppercase">
          © 2026 StudySpark AI. Empowering minds globally.
        </div>
      </footer>
    </div>
  );
}
