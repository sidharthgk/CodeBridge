import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, ExternalLink, BookOpen, Clock, Star, Users, ChevronRight } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { Link } from 'react-router-dom';

const ProjectCard = ({ 
  project,
  onClick
}: { 
  project: any;
  onClick: () => void;
}) => {
  const difficultyColor = {
    Beginner: 'text-green-500',
    Intermediate: 'text-yellow-500',
    Advanced: 'text-red-500'
  }[project.difficulty];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-panel overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className={`${difficultyColor}`}>{project.difficulty}</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{project.duration}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <span 
              key={tech}
              className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.progress > 0 && (
          <div className="mt-4">
            <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{project.progress}% Complete</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectLearning = () => {
  const { projects, setActiveProject } = useProjectStore();
  const [filter, setFilter] = useState({
    difficulty: 'all',
    technology: 'all',
    sort: 'newest'
  });

  const handleProjectClick = (project: any) => {
    setActiveProject(project);
    window.location.href = `/project/${project.id}`;
  };

  const filteredProjects = projects
    .filter(project => 
      (filter.difficulty === 'all' || project.difficulty === filter.difficulty) &&
      (filter.technology === 'all' || project.technologies.includes(filter.technology))
    )
    .sort((a, b) => {
      if (filter.sort === 'newest') return -1;
      if (filter.sort === 'popular') return b.progress - a.progress;
      return 0;
    });

  return (
    <div className="min-h-screen pt-20 px-4">
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
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gold-text">Project-Based Learning</h1>
                <p className="text-gray-400">Learn by building real-world applications</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-panel p-4 flex flex-wrap gap-4">
            <select 
              className="input-field bg-black/50"
              value={filter.difficulty}
              onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select 
              className="input-field bg-black/50"
              value={filter.technology}
              onChange={(e) => setFilter({ ...filter, technology: e.target.value })}
            >
              <option value="all">All Technologies</option>
              <option value="React">React</option>
              <option value="Firebase">Firebase</option>
              <option value="TailwindCSS">TailwindCSS</option>
            </select>
            <select 
              className="input-field bg-black/50"
              value={filter.sort}
              onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center">
            <button className="btn-secondary">
              Load More Projects
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectLearning;