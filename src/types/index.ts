export interface Language {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  progress: {
    [key: string]: number; // language id -> progress percentage
  };
  completedProjects: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  steps: ProjectStep[];
}

export interface ProjectStep {
  title: string;
  description: string;
  codeSnippets: {
    [key: string]: string; // language id -> code
  };
}