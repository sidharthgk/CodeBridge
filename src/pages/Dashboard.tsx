import React from 'react';
import { useStore } from '../store/useStore';
import { Layout, BookOpen, Code2 } from 'lucide-react';

function Dashboard() {
  const user = useStore((state) => state.user);

  // Placeholder data for demonstration
  const learningProgress = {
    python: 75,
    java: 45,
    javascript: 90,
  };

  const recentProjects = [
    { id: 1, name: 'Todo App', language: 'Python', progress: 100 },
    { id: 2, name: 'Weather App', language: 'Java', progress: 60 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
        Your Learning Dashboard
      </h1>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
          <div className="flex items-center space-x-3 mb-4">
            <Layout className="w-6 h-6 text-[#FFD700]" />
            <h2 className="text-xl font-semibold">Overall Progress</h2>
          </div>
          <div className="text-4xl font-bold text-[#FFD700]">70%</div>
        </div>

        <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-6 h-6 text-[#FFD700]" />
            <h2 className="text-xl font-semibold">Languages Learning</h2>
          </div>
          <div className="text-4xl font-bold text-[#FFD700]">3</div>
        </div>

        <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
          <div className="flex items-center space-x-3 mb-4">
            <Code2 className="w-6 h-6 text-[#FFD700]" />
            <h2 className="text-xl font-semibold">Projects Completed</h2>
          </div>
          <div className="text-4xl font-bold text-[#FFD700]">5</div>
        </div>
      </div>

      {/* Language Progress */}
      <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
        <h2 className="text-2xl font-semibold mb-6">Language Progress</h2>
        <div className="space-y-6">
          {Object.entries(learningProgress).map(([language, progress]) => (
            <div key={language} className="space-y-2">
              <div className="flex justify-between">
                <span className="capitalize">{language}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-[#404040] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFDF50]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040]">
        <h2 className="text-2xl font-semibold mb-6">Recent Projects</h2>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-400">{project.language}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32">
                  <div className="h-2 bg-[#404040] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFDF50]"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;