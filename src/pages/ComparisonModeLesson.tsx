import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import { GoogleGenerativeAI } from '@google/generative-ai';

const initialComparisonSteps = [
  {
    title: 'Hello World (Side by Side)',
    contentLeft: `JS - Hello World`,
    contentRight: `Python - Hello World`,
    defaultCodeLeft: {
      javascript: `console.log("Hello World");`,
    },
    defaultCodeRight: {
      python: `print("Hello World")`,
    },
  },
  {
    title: 'Variables (Side by Side)',
    contentLeft: `JS - Variables`,
    contentRight: `Python - Variables`,
    defaultCodeLeft: {
      javascript: `let x = 42;\nconsole.log(x);`,
    },
    defaultCodeRight: {
      python: `x = 42\nprint(x)`,
    },
  },
];

async function fetchComparisonLessonFromGemini(
  stepIndex: number,
  langLeft: string,
  langRight: string
) {
  const geminiApiKey = 'AIzaSyAL6kABn-Vf669bPbFAEcXf-35Xv9tGWAA';
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Prompt instructing the model to return only valid JSON
  const prompt = `
Act as an expert tutor. Provide a side-by-side lesson step comparing code in two languages.
Return ONLY valid JSON in the following format (no markdown):
{
  "title": "Your lesson title",
  "contentLeft": "A brief description for ${langLeft}",
  "contentRight": "A brief description for ${langRight}",
  "defaultCodeLeft": { "${langLeft}": "Default code for ${langLeft}" },
  "defaultCodeRight": { "${langRight}": "Default code for ${langRight}" }
}
Ensure the keys appear exactly in this order: title, contentLeft, contentRight, defaultCodeLeft, defaultCodeRight.
Step #${stepIndex} for ${langLeft} and ${langRight}.
`;

  const result = await model.generateContent(prompt);
  const rawText =
    typeof result.response.text === 'function'
      ? await result.response.text()
      : result.response.text;

  // Strip out possible code fences if the model returns them
  let jsonString = rawText.trim();
  if (jsonString.startsWith('```')) {
    jsonString = jsonString.replace(/^```(\w+)?/, '').replace(/```$/, '').trim();
  }
  // Or a more targeted approach:
  // const codeFenceRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
  // const match = jsonString.match(codeFenceRegex);
  // if (match && match[1]) jsonString = match[1].trim();

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    console.error('Error parsing Gemini JSON:', err);
    console.error('Raw text:', rawText);
    parsed = {
      title: `Step ${stepIndex + 1} (AI)`,
      contentLeft: `Auto content for ${langLeft}`,
      contentRight: `Auto content for ${langRight}`,
      defaultCodeLeft: { [langLeft]: `// AI fallback code for ${langLeft}` },
      defaultCodeRight: { [langRight]: `# AI fallback code for ${langRight}` },
    };
  }
  return parsed;
}

const ComparisonModeLesson: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const langLeft = searchParams.get('langLeft') || 'javascript';
  const langRight = searchParams.get('langRight') || 'python';

  const [currentStep, setCurrentStep] = useState(0);
  const [comparisonSteps, setComparisonSteps] = useState(initialComparisonSteps);

  const [codeLeft, setCodeLeft] = useState('');
  const [codeRight, setCodeRight] = useState('');

  useEffect(() => {
    const step = comparisonSteps[currentStep];
    if (!step) return;
    const leftCode =
      step.defaultCodeLeft?.[langLeft] ||
      step.defaultCodeLeft?.javascript ||
      '';
    const rightCode =
      step.defaultCodeRight?.[langRight] ||
      step.defaultCodeRight?.python ||
      '';
    setCodeLeft(leftCode);
    setCodeRight(rightCode);
  }, [currentStep, langLeft, langRight, comparisonSteps]);

  async function handleNextGeminiStep() {
    const newStepIndex = currentStep + 1;
    if (newStepIndex < comparisonSteps.length) {
      setCurrentStep(newStepIndex);
      return;
    }
    try {
      const newData = await fetchComparisonLessonFromGemini(
        newStepIndex,
        langLeft,
        langRight
      );
      setComparisonSteps((prev) => [...prev, newData]);
      setCurrentStep(newStepIndex);
    } catch (err) {
      console.error(err);
    }
  }

  const handleNext = async () => {
    if (currentStep < comparisonSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleNextGeminiStep();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/comparison-mode');
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
          <div className="glass-panel p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold gold-text">
                Comparing {langLeft.toUpperCase()} & {langRight.toUpperCase()}
              </h2>
              <p className="text-gray-400">
                Step {currentStep + 1} of {comparisonSteps.length}
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

          <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">
              {comparisonSteps[currentStep].title}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-amber-500">
                  {langLeft.toUpperCase()}
                </h4>
                <p className="text-gray-400 mb-4">
                  {comparisonSteps[currentStep].contentLeft}
                </p>
                <InteractiveCodeEditor
                  initialLanguage={langLeft}
                  initialCode={codeLeft}
                  showAiButton
                  showHeader
                  showFooter
                  showOutput
                  height="300px"
                  sourceComponent="comparison-mode-left"
                  onCodeChange={(newCode) => setCodeLeft(newCode)}
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-amber-500">
                  {langRight.toUpperCase()}
                </h4>
                <p className="text-gray-400 mb-4">
                  {comparisonSteps[currentStep].contentRight}
                </p>
                <InteractiveCodeEditor
                  initialLanguage={langRight}
                  initialCode={codeRight}
                  showAiButton
                  showHeader
                  showFooter
                  showOutput
                  height="300px"
                  sourceComponent="comparison-mode-right"
                  onCodeChange={(newCode) => setCodeRight(newCode)}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonModeLesson;
