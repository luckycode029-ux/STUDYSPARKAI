import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'motion/react';

interface StatusStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'error';
}

export const StatusState: React.FC<StatusStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-12 px-6"
    >
      <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl ${
        variant === 'error' 
          ? 'bg-brand-coral/10 text-brand-coral shadow-brand-coral/10' 
          : 'bg-brand-cyan/10 text-brand-cyan shadow-brand-cyan/10 glow-cyan'
      }`}>
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl sm:text-3xl font-black text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary max-w-sm mb-10 leading-relaxed font-medium">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} icon={ArrowRight} className="flex-row-reverse px-10">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
