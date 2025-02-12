import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code2, GitCompare } from 'lucide-react';

const ModeCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  onClick: () => void 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-panel p-8 cursor-pointer hover:border-amber-500/30 transition-all duration-300"
      onClick={onClick}
    >
      <Icon className="h-12 w-12 text-amber-500 mb-4" />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const ModeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-text">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select the learning mode that best suits your needs and start your coding journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ModeCard
            icon={Code2}
            title="Scratch Mode"
            description="Start from the basics and learn a new programming language step by step with interactive lessons."
            onClick={() => navigate('/scratch-mode')}
          />
          <ModeCard
            icon={GitCompare}
            title="Comparison Mode"
            description="Compare two programming languages side by side and understand their similarities and differences."
            onClick={() => navigate('/comparison-mode')}
          />
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;