import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Code2, Save, Play } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import { toast } from 'react-hot-toast';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, activeProject, setActiveProject, updateProjectStep, completeStep } = useProjectStore();
  const [currentCode, setCurrentCode] = useState('');

  useEffect(() => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setActiveProject(project);
    } else {
      navigate('/projects');
    }
  }, [projectId]);

  useEffect(() => {
    if (activeProject) {
      const currentStep = activeProject.steps[activeProject.currentStep];
      setCurrentCode(
        activeProject.savedCode[currentStep.id] || 
        currentStep.initialCode || 
        ''
      );
    }
  }, [activeProject]);

  if (!activeProject) return null;

  const currentStep = activeProject.steps[activeProject.currentStep];

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
  };

  const handleSaveProgress = () => {
    updateProjectStep(activeProject.id, currentStep.id, currentCode);
    toast.success('Progress saved!');
  };

  const handleCompleteStep = () => {
    completeStep(activeProject.id, currentStep.id);
    toast.success('Step completed!');
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
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/projects')}
                  className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-amber-500" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold gold-text">{activeProject.title}</h1>
                  <p className="text-gray-400">{activeProject.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Step {activeProject.currentStep + 1} of {activeProject.steps.length}
                </div>
                <div className="h-2 w-32 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300"
                    style={{ width: `${activeProject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Instructions */}
            <div className="glass-panel p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">{currentStep.title}</h2>
                <p className="text-gray-400">{currentStep.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-amber-500">Instructions:</h3>
                <div className="space-y-2">
                  {currentStep.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-amber-500 text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-400">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-amber-500">Tips:</h3>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  {currentStep.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-amber-500/20">
                <button
                  onClick={handleCompleteStep}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Check className="h-5 w-5" />
                  <span>Complete Step</span>
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-amber-500">Code Editor</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProgress}
                    className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                    title="Save progress"
                  >
                    <Save className="h-4 w-4 text-amber-500" />
                  </button>
                  <button
                    className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                    title="Run code"
                  >
                    <Play className="h-4 w-4 text-amber-500" />
                  </button>
                </div>
              </div>
              
              <InteractiveCodeEditor
                initialCode={currentCode}
                initialLanguage={activeProject.language}
                height="500px"
                showAiButton={true}
                showHeader={true}
                showFooter={true}
                showOutput={true}
                onCodeChange={handleCodeChange}
                sourceComponent="project-learning"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/projects')}
              className="btn-secondary flex items-center space-x-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Projects</span>
            </button>
            {activeProject.currentStep < activeProject.steps.length - 1 && (
              <button
                onClick={handleCompleteStep}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Next Step</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;