import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Play, BookOpen, Trophy, GitBranch, Terminal } from 'lucide-react';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';

const languages = [
  { id: 'python', name: 'Python', icon: '🐍', description: 'Perfect for beginners, great for data science and automation.' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', description: 'Power the web with the most popular programming language.' },
  { id: 'java', name: 'Java', icon: '☕', description: 'Build enterprise-grade applications and Android apps.' },
  { id: 'cpp', name: 'C++', icon: '⚙️', description: 'Create high-performance applications and games.' },
  { id: 'rust', name: 'Rust', icon: '🦀', description: 'Write safe, concurrent, and practical systems software.' },
  { id: 'go', name: 'Go', icon: '🐹', description: 'Build fast, reliable, and efficient software at scale.' }
];

const LanguageCard = ({ language, selected, onSelect }: { 
  language: typeof languages[0], 
  selected: boolean,
  onSelect: () => void 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: any,
  title: string,
  description: string
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleStartLearning = () => {
    if (selectedLanguage) {
      setShowEditor(true);
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
          {!showEditor && (
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
          )}

          {/* Features */}
          {!showEditor && (
            <div ref={ref} className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={BookOpen}
                title="Structured Learning"
                description="Follow a carefully crafted curriculum designed for optimal learning progression."
              />
              <FeatureCard
                icon={Terminal}
                title="Interactive Exercises"
                description="Practice with hands-on coding exercises and get instant feedback."
              />
              <FeatureCard
                icon={Trophy}
                title="Track Progress"
                description="Earn achievements and track your learning journey with detailed analytics."
              />
            </div>
          )}

          {/* Start Learning Button */}
          {selectedLanguage && !showEditor && (
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

          {/* Interactive Code Editor */}
          {showEditor && selectedLanguage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="glass-panel p-6">
                <h2 className="text-2xl font-bold mb-4 gold-text">
                  {languages.find(l => l.id === selectedLanguage)?.name} Basics
                </h2>
                <p className="text-gray-400 mb-6">
                  Let's start with the fundamentals. Here's a simple "Hello World" program in {languages.find(l => l.id === selectedLanguage)?.name}.
                  Try running it and then modify it to see what happens!
                </p>
                
                <InteractiveCodeEditor
                  initialLanguage={selectedLanguage}
                  height="400px"
                  showAiButton={true}
                  showHeader={true}
                  showFooter={true}
                  showOutput={true}
                  sourceComponent="scratch-mode"
                />
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                <p className="text-gray-400 mb-4">
                  Now that you've run your first program, here are some things you can try:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 mb-6">
                  <li>Change the greeting message</li>
                  <li>Create a variable with your name and use it in the greeting</li>
                  <li>Add comments to explain what the code does</li>
                  <li>Try creating a function that takes multiple parameters</li>
                </ul>
                <p className="text-gray-400">
                  If you get stuck, click the "Ask AI" button to get help from our AI assistant!
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScratchMode;