import React from 'react';
import { motion } from 'framer-motion';
import LoadingLogo from './LoadingLogo'; // Ensure this path is correct

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="text-center">
        <LoadingLogo size="xl" className="mb-8" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-amber-500/80 text-lg"
        >
          Loading amazing things...
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;