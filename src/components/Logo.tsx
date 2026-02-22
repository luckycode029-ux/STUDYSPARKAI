import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizes = {
    sm: { icon: 20, text: 'text-lg', container: 'w-8 h-8', gap: 'gap-2' },
    md: { icon: 24, text: 'text-xl', container: 'w-10 h-10', gap: 'gap-2.5' },
    lg: { icon: 32, text: 'text-3xl', container: 'w-14 h-14', gap: 'gap-4' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${currentSize.gap} ${className}`}>
      <div className={`${currentSize.container} spark-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20 glow-primary shrink-0`}>
        {/* Stylized SVG representing the StudySpark logo (S + Book + Sparks) */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-2/3 h-2/3"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M12 6v6" />
          <path d="M9 9h6" />
        </svg>
      </div>
      {showText && (
        <span className={`${currentSize.text} font-display font-black tracking-tight text-text-primary`}>
          StudySpark <span className="gradient-text">AI</span>
        </span>
      )}
    </div>
  );
};
