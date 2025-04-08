import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  code?: string;
  instructions: string[];
  tips: string[];
  completed: boolean;
  initialCode?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  technologies: string[];
  image: string;
  steps: ProjectStep[];
  currentStep: number;
  completed: boolean;
  savedCode: Record<string, string>;
  progress: number;
  language: string;
}

interface ProjectStore {
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  updateProjectStep: (projectId: string, stepId: string, code: string) => void;
  completeStep: (projectId: string, stepId: string) => void;
  saveProjectProgress: (projectId: string, stepId: string, code: string) => void;
}

const calculatorProject = (language: string): Project => ({
  id: `calculator-${language}`,
  title: `Calculator in ${language}`,
  description: `Build a functional calculator using ${language} with basic arithmetic operations and a clean user interface.`,
  difficulty: 'Beginner',
  duration: '1-2 hours',
  technologies: [language],
  image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80',
  steps: [
    {
      id: 'step-1',
      title: 'Basic Setup',
      description: 'Set up the initial structure and basic UI elements',
      instructions: [
        'Create the basic HTML structure for the calculator',
        'Add input/display field for numbers',
        'Create buttons for digits 0-9',
        'Add buttons for basic operations (+, -, *, /)',
      ],
      tips: [
        'Use a grid layout for button arrangement',
        'Consider adding a clear button',
        'Make sure the display field is read-only',
      ],
      completed: false,
      initialCode: language === 'javascript' ? 
`<!DOCTYPE html>
<html>
<head>
  <title>Calculator</title>
  <style>
    .calculator {
      width: 300px;
      margin: 50px auto;
      padding: 20px;
      border-radius: 10px;
      background: #f0f0f0;
    }
    #display {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      text-align: right;
      padding: 5px;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
    }
    button {
      padding: 10px;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="calculator">
    <input type="text" id="display" readonly>
    <div class="buttons">
      <!-- Add buttons here -->
    </div>
  </div>
  <script>
    // Your JavaScript code here
  </script>
</body>
</html>` : 
      language === 'python' ?
`import tkinter as tk

class Calculator:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Calculator")
        
        # Create display
        self.display = tk.Entry(self.window, width=30, justify="right")
        self.display.grid(row=0, column=0, columnspan=4, padx=5, pady=5)
        
        # Add buttons here
        
    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    calc = Calculator()
    calc.run()` : ''
    },
    {
      id: 'step-2',
      title: 'Implement Basic Operations',
      description: 'Add functionality for basic arithmetic operations',
      instructions: [
        'Implement number input handling',
        'Add functionality for addition',
        'Add functionality for subtraction',
        'Add functionality for multiplication',
        'Add functionality for division',
      ],
      tips: [
        'Store the first number when an operation is selected',
        'Clear the display when starting a new number',
        'Handle division by zero',
      ],
      completed: false,
    },
    {
      id: 'step-3',
      title: 'Add Advanced Features',
      description: 'Implement additional calculator features',
      instructions: [
        'Add decimal point functionality',
        'Implement clear button (C)',
        'Add backspace functionality',
        'Implement keyboard support',
      ],
      tips: [
        'Prevent multiple decimal points',
        'Consider adding keyboard shortcuts',
        'Add visual feedback for button clicks',
      ],
      completed: false,
    },
    {
      id: 'step-4',
      title: 'Error Handling and Testing',
      description: 'Add error handling and test the calculator',
      instructions: [
        'Add error handling for invalid operations',
        'Implement input validation',
        'Test all operations thoroughly',
        'Add user feedback for errors',
      ],
      tips: [
        'Test edge cases (large numbers, zero division)',
        'Add clear error messages',
        'Consider adding a history feature',
      ],
      completed: false,
    }
  ],
  currentStep: 0,
  completed: false,
  savedCode: {},
  progress: 0,
  language
});

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [
        calculatorProject('javascript'),
        calculatorProject('python'),
        {
          id: 'chat-app',
          title: 'Build a Modern Chat App',
          description: 'Create a real-time chat application using React and Firebase with modern UI/UX principles.',
          difficulty: 'Intermediate',
          duration: '4-6 hours',
          technologies: ['React', 'Firebase', 'TailwindCSS'],
          image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80',
          steps: [
            {
              id: 'step-1',
              title: 'Project Setup',
              description: 'Initialize the project and install dependencies',
              instructions: ['Set up a new React project', 'Install required dependencies'],
              tips: ['Use Vite for faster development', 'Configure ESLint'],
              completed: false,
            },
            {
              id: 'step-2',
              title: 'User Interface',
              description: 'Create the chat interface with TailwindCSS',
              instructions: ['Create the chat layout', 'Style the components'],
              tips: ['Use Flexbox for layout', 'Keep components modular'],
              completed: false,
            },
            {
              id: 'step-3',
              title: 'Firebase Integration',
              description: 'Set up Firebase and implement real-time messaging',
              instructions: ['Configure Firebase', 'Implement real-time updates'],
              tips: ['Use Firebase SDK', 'Handle offline state'],
              completed: false,
            },
            {
              id: 'step-4',
              title: 'Authentication',
              description: 'Add user authentication and profiles',
              instructions: ['Set up auth flow', 'Create user profiles'],
              tips: ['Use Firebase Auth', 'Implement protected routes'],
              completed: false,
            },
            {
              id: 'step-5',
              title: 'Final Touches',
              description: 'Add finishing touches and deploy',
              instructions: ['Add loading states', 'Optimize performance'],
              tips: ['Test thoroughly', 'Deploy to hosting'],
              completed: false,
            },
          ],
          currentStep: 0,
          completed: false,
          savedCode: {},
          progress: 0,
          language: 'javascript'
        },
      ],
      activeProject: null,
      setActiveProject: (project) => set({ activeProject: project }),
      updateProjectStep: (projectId, stepId, code) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  savedCode: {
                    ...project.savedCode,
                    [stepId]: code,
                  },
                }
              : project
          ),
        })),
      completeStep: (projectId, stepId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  steps: project.steps.map((step) =>
                    step.id === stepId ? { ...step, completed: true } : step
                  ),
                  currentStep: project.currentStep + 1,
                  progress: ((project.currentStep + 1) / project.steps.length) * 100,
                }
              : project
          ),
        })),
      saveProjectProgress: (projectId, stepId, code) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  savedCode: {
                    ...project.savedCode,
                    [stepId]: code,
                  },
                }
              : project
          ),
        })),
    }),
    {
      name: 'project-store',
      version: 1,
    }
  )
);