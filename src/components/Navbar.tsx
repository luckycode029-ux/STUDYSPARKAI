import React from 'react';
import { LucideIcon, Sparkles, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (view: 'home' | 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('home');

  const navItems = [
    { label: 'Home', view: 'home' as const, id: 'home' },
    { label: 'Features', view: 'home' as const, id: 'features' },
    { label: 'How it Works', view: 'home' as const, id: 'how-it-works' },
  ];

  const handleNavigate = (view: 'home' | 'login' | 'signup', id: string) => {
    onNavigate(view);
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-brand-bg/80 backdrop-blur-xl px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => handleNavigate('home', 'home')}
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <Logo size="md" />
        </button>
        
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              onClick={() => handleNavigate(item.view, item.id)}
              className="relative text-sm font-bold text-text-secondary hover:text-text-primary transition-colors py-2"
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 spark-gradient rounded-full"
                />
              )}
            </button>
          ))}
          <button 
            onClick={() => handleNavigate('login', 'login')}
            className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
          >
            Login
          </button>
          <Button variant="primary" size="sm" onClick={() => handleNavigate('signup', 'signup')}>
            Try Free
          </Button>
        </div>

        <button 
          className="md:hidden p-2 text-text-secondary hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-brand-bg-alt overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => handleNavigate(item.view, item.id)}
                  className="text-left px-4 py-3 text-base font-bold text-text-secondary hover:bg-white/5 hover:text-text-primary rounded-xl transition-all"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => handleNavigate('login', 'login')}
                className="text-left px-4 py-3 text-base font-bold text-text-secondary hover:bg-white/5 hover:text-text-primary rounded-xl transition-all"
              >
                Login
              </button>
              <div className="pt-2">
                <Button variant="primary" className="w-full py-4" onClick={() => handleNavigate('signup', 'signup')}>
                  Try Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const UserIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
