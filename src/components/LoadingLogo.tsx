import React from 'react';
import { motion } from 'framer-motion';

interface LoadingLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 0.5
      }
    }
  };

  const symbolVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: { 
      y: [-2, 2, -2],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"
      />
      
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className={`font-bold ${sizes[size]} text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center relative z-10`}
      >
        <motion.span variants={symbolVariants}>&lt;</motion.span>
        <motion.span 
          variants={symbolVariants}
          className="mx-0.5"
        >/</motion.span>
        <motion.span variants={symbolVariants}>&gt;</motion.span>
      </motion.div>
    </div>
  );
};

export default LoadingLogo;