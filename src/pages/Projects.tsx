import React from 'react';
import { FolderGit2 } from 'lucide-react';

function Projects() {
  // Placeholder project data
  const projects = [
    {
      id: 1,
      title: 'Todo Application',
      description: 'Build a full-featured todo app with local storage',
      difficulty: 'beginner',
      languages: ['JavaScript', 'Python', 'Java'],
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Create a weather app using public APIs',
      difficulty: 'intermediate',
      languages: ['JavaScript', 'Python', 'Java'],
    },
    {
      id: 3,
      title: 'Chat Application',
      description: 'Build a real-time chat application',
      difficulty: 'advanced',
      languages: ['JavaScript', 'Python', 'Java'],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400';
      case 'intermediate':
        return 'text-yellow-400';
      case 'advanced':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <FolderGit2 className="w-8 h-8 text-[#FFD700]" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFDF50] text-transparent bg-clip-text">
          Project Gallery
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#2D2D2D] p-6 rounded-lg border border-[#404040] hover:border-[#FFD700] transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex items-center justify-between">
              <span className={`capitalize ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </span>
              <div className="flex space-x-2">
                {project.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-1 bg-[#1A1A1A] rounded text-xs text-[#FFD700]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;