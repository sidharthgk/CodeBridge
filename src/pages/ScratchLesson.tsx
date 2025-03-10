import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import { GoogleGenerativeAI } from '@google/generative-ai';

const initialLessonSteps = [
  {
    title: 'Hello World',
    content: `Here's a simple "Hello World" program.`,
    defaultCode: {
      python: `print("Hello World")`,
      javascript: `console.log("Hello World");`,
    },
  },
  {
    title: 'Variables & Data Types',
    content: 'Now that you’ve run Hello World, let’s talk about variables...',
    defaultCode: {
      python: `x = 42
print("The answer is", x)`,
      javascript: `let x = 42;
console.log("The answer is", x);`,
    },
  },
  {
    title: 'Functions',
    content: 'Next, let’s look at how to create and call functions...',
    defaultCode: {
      python: `def greet(name):
    return "Hello, " + name

print(greet("World"))`,
      javascript: `function greet(name) {
  return "Hello, " + name;
}
console.log(greet("World"));`,
    },
  },
];

async function fetchLessonFromGemini(stepIndex: number, chosenLanguage: string) {
  const geminiApiKey = 'AIzaSyAL6kABn-Vf669bPbFAEcXf-35Xv9tGWAA';
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  // Updated prompt: ask for concise lesson content (2-3 lines) and default code
  const prompt = `Act as an expert tutor.
For the given lesson step, return JSON in the following format:
{
  "title": "<Lesson Title>",
  "content": "<A brief description (2-3 lines max) of the lesson without code blocks>",
  "defaultCode": { "${chosenLanguage}": "<Default code for the lesson>" }
}
Ensure the order is exactly: title, content, defaultCode.
Step #${stepIndex} for ${chosenLanguage}.
`;

  const result = await model.generateContent(prompt);
  const responseText =
    typeof result.response.text === 'function'
      ? await result.response.text()
      : result.response.text;
  
  // Try to extract JSON from a Markdown code block if present.
  let parsedData;
  try {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = responseText.match(jsonRegex);
    let jsonString = responseText;
    if (match && match[1]) {
      jsonString = match[1];
    }
    parsedData = JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing Gemini output JSON:", error);
    parsedData = {
      title: `Step ${stepIndex + 1} (AI)`,
      content: responseText || 'AI-generated lesson',
      defaultCode: {
        [chosenLanguage]: `// AI-generated ${chosenLanguage} code`
      },
    };
  }
  
  return parsedData;
}

const ScratchLesson: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chosenLanguage = searchParams.get('lang') || 'javascript';
  const [currentStep, setCurrentStep] = useState(0);
  const [lessonSteps, setLessonSteps] = useState(initialLessonSteps);
  const [lessonCode, setLessonCode] = useState('');

  useEffect(() => {
    const step = lessonSteps[currentStep];
    if (!step) return;
    // Get the code for the chosen language; fall back to JavaScript if needed.
    const codeForLang = step.defaultCode?.[chosenLanguage] || step.defaultCode?.javascript || '';
    setLessonCode(codeForLang);
  }, [currentStep, chosenLanguage, lessonSteps]);

  async function handleNextGeminiStep() {
    const newStepIndex = currentStep + 1;
    if (newStepIndex < lessonSteps.length) {
      setCurrentStep(newStepIndex);
      return;
    }
    try {
      const newStepData = await fetchLessonFromGemini(newStepIndex, chosenLanguage);
      setLessonSteps((prev) => [...prev, newStepData]);
      setCurrentStep(newStepIndex);
    } catch (err) {
      console.error(err);
    }
  }

  const handleNext = async () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleNextGeminiStep();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/scratch-mode');
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8">
          {/* Header with lesson info and navigation */}
          <div className="glass-panel p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold gold-text">{chosenLanguage.toUpperCase()} Lesson</h2>
              <p className="text-gray-400">
                Step {currentStep + 1} of {lessonSteps.length}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                className="px-4 py-2 bg-black/40 border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 rounded-lg flex items-center"
                onClick={handlePrevious}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </button>
              <button
                className="px-4 py-2 bg-black/40 border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 rounded-lg flex items-center"
                onClick={handleNext}
              >
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Lesson Content and Interactive Editor */}
          <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">{lessonSteps[currentStep].title}</h3>
            <p className="text-gray-400 mb-6">{lessonSteps[currentStep].content}</p>
            <InteractiveCodeEditor
              initialLanguage={chosenLanguage}
              initialCode={lessonCode}
              showAiButton
              showHeader
              showFooter
              showOutput
              height="400px"
              sourceComponent="scratch-lesson"
              onCodeChange={(newCode) => setLessonCode(newCode)}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScratchLesson;
