import React, { useState } from 'react';
import { Sparkles, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { motion } from 'motion/react';
import { Logo } from './Logo';

interface AuthProps {
  mode: 'login' | 'signup';
  onSwitch: (mode: 'login' | 'signup') => void;
  onSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ mode, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-text-primary">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm sm:text-base text-text-secondary mt-2">
            {mode === 'login' 
              ? 'Continue your learning journey with StudySpark' 
              : 'Join thousands of students mastering subjects with AI'}
          </p>
        </div>

        <Card hover={false} className="bg-brand-bg-alt/40 backdrop-blur-xl border-white/5 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-brand-cyan transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/5 outline-none transition-all text-sm sm:text-base text-text-primary placeholder:text-text-secondary/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-text-secondary">Password</label>
                {mode === 'login' && (
                  <a href="#" className="text-xs font-bold text-brand-cyan hover:underline">Forgot?</a>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-brand-cyan transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/5 outline-none transition-all text-sm sm:text-base text-text-primary placeholder:text-text-secondary/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-3.5 sm:py-4" 
              loading={isLoading}
              icon={mode === 'login' ? ArrowRight : undefined}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-brand-bg-alt/40 px-4 text-text-secondary font-bold tracking-wider">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button disabled className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 border border-white/10 rounded-xl text-text-secondary font-bold opacity-60 cursor-not-allowed transition-all text-sm sm:text-base">
              <Chrome size={20} />
              Google
            </button>
            <button disabled className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 border border-white/10 rounded-xl text-text-secondary font-bold opacity-60 cursor-not-allowed transition-all text-sm sm:text-base">
              <Github size={20} />
              GitHub
            </button>
          </div>
        </Card>

        <p className="text-center mt-6 sm:mt-8 text-sm text-text-secondary">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => onSwitch('signup')} className="text-brand-cyan font-bold hover:underline">Sign Up</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => onSwitch('login')} className="text-brand-cyan font-bold hover:underline">Sign In</button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
};
