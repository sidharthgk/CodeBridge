import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Code2, Play, BookOpen, Trophy, Terminal } from 'lucide-react';

const languages = [
  { id: 'python', name: 'Python', icon: '🐍', description: 'Perfect for beginners, great for data science and automation.' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', description: 'Power the web with the most popular programming language.' },
  { id: 'java', name: 'Java', icon: '☕', description: 'Build enterprise-grade applications and Android apps.' },
  { id: 'cpp', name: 'C++', icon: '⚙️', description: 'Create high-performance applications and games.' },
  { id: 'rust', name: 'Rust', icon: '🦀', description: 'Write safe, concurrent, and practical systems software.' },
  { id: 'go', name: 'Go', icon: '🐹', description: 'Build fast, reliable, and efficient software at scale.' }
];

const LanguageCard = ({
  language,
  selected,
  onSelect,
}: {
  language: typeof languages[0];
  selected: boolean;
  onSelect: () => void;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={onSelect}
      className={`glass-panel p-6 cursor-pointer transition-all duration-300 ${
        selected ? 'border-amber-500 shadow-lg shadow-amber-500/20' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{language.icon}</div>
        <div>
          <h3 className="text-xl font-bold">{language.name}</h3>
          <p className="text-gray-400 text-sm">{language.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6"
    >
      <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-amber-500" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

const ScratchMode = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleStartLearning = () => {
    if (selectedLanguage) {
      // Instead of showing the editor here, navigate to your new ScratchLesson page
      navigate(`/scratch-lesson?lang=${selectedLanguage}`);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          {/* Header */}
          <div className="glass-panel p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <Code2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">Learn from Scratch</h1>
                <p className="text-gray-400">Master a new programming language step by step</p>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-6">Choose Your Language</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {languages.map((lang) => (
                <LanguageCard
                  key={lang.id}
                  language={lang}
                  selected={selectedLanguage === lang.id}
                  onSelect={() => setSelectedLanguage(lang.id)}
                />
              ))}
            </div>
          </div>

          {/* Feature Highlights */}
          <div ref={ref} className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={BookOpen}
              title="Structured Learning"
              description="Follow a carefully crafted curriculum designed for optimal progression."
            />
            <FeatureCard
              icon={Terminal}
              title="Interactive Exercises"
              description="Practice with hands-on coding exercises and get instant feedback."
            />
            <FeatureCard
              icon={Trophy}
              title="Track Progress"
              description="Earn achievements and track your journey with detailed analytics."
            />
          </div>

          {/* Start Learning Button */}
          {selectedLanguage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button
                className="btn-primary flex items-center space-x-2 group"
                onClick={handleStartLearning}
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Start Learning {languages.find(l => l.id === selectedLanguage)?.name}</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScratchMode;
