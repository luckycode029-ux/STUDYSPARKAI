import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`glass-card p-6 ${hover ? 'hover:translate-y-[-4px] hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-300' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};
