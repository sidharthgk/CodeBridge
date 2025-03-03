import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, ExternalLink, BookOpen, Clock, Star, Users } from 'lucide-react';

const ProjectCard = ({ 
  title, 
  description, 
  difficulty, 
  duration, 
  technologies, 
  image,
  stars,
  learners
}: { 
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  technologies: string[];
  image: string;
  stars: number;
  learners: number;
}) => {
  const difficultyColor = {
    Beginner: 'text-green-500',
    Intermediate: 'text-yellow-500',
    Advanced: 'text-red-500'
  }[difficulty];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-panel overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className={`${difficultyColor}`}>{difficulty}</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-amber-500" />
              <span>{learners} learners</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors">
              <Github className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-amber-500/10 rounded-lg transition-colors">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectLearning = () => {
  const projects = [
    {
      title: 'Build a Modern Chat App',
      description: 'Create a real-time chat application using React and Firebase with modern UI/UX principles.',
      difficulty: 'Intermediate' as const,
      duration: '4-6 hours',
      technologies: ['React', 'Firebase', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80',
      stars: 245,
      learners: 1234
    },
    {
      title: 'Weather Dashboard',
      description: 'Build a beautiful weather dashboard with React, integrating with weather APIs and animations.',
      difficulty: 'Beginner' as const,
      duration: '2-3 hours',
      technologies: ['React', 'APIs', 'ChartJS'],
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80',
      stars: 189,
      learners: 892
    },
    {
      title: 'E-commerce Platform',
      description: 'Create a full-featured e-commerce platform with shopping cart, payments, and admin dashboard.',
      difficulty: 'Advanced' as const,
      duration: '10-12 hours',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80',
      stars: 432,
      learners: 2156
    },
    {
      title: 'Task Management App',
      description: 'Build a Trello-like task management application with drag-and-drop functionality.',
      difficulty: 'Intermediate' as const,
      duration: '6-8 hours',
      technologies: ['React', 'DnD', 'Redux'],
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80',
      stars: 156,
      learners: 945
    }
  ];

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
            <select className="input-field bg-black/50">
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select className="input-field bg-black/50">
              <option value="all">All Technologies</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="python">Python</option>
            </select>
            <select className="input-field bg-black/50">
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="starred">Most Starred</option>
            </select>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
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
