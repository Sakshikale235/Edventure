import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hover = true,
  glow = false 
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
        glow ? 'hover:shadow-2xl hover:shadow-accent-200/50' : ''
      } ${className}`}
      onClick={onClick}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      } : {}}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;