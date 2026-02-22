import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] hover:scale-[1.02] rounded-full';
  
  const variants = {
    primary: 'spark-gradient text-white hover:glow-primary shadow-lg shadow-brand-blue/20',
    secondary: 'bg-transparent border border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan/10 hover:glow-cyan',
    outline: 'border border-white/10 hover:border-white/30 bg-white/5 text-text-primary',
    ghost: 'hover:bg-white/5 text-text-secondary hover:text-text-primary'
  };

  const sizes = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3.5 text-sm tracking-wide',
    lg: 'px-10 py-4.5 text-base tracking-wide'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 16 : 20} />}
          {children}
        </>
      )}
    </button>
  );
};
