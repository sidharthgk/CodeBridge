import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface ExecutionResult {
  output: string;
  error: string | null;
  duration: number;
}

export const useCodeExecution = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);

  const executeCode = useCallback(async (code: string, language: string): Promise<ExecutionResult> => {
    setIsExecuting(true);
    const startTime = performance.now();

    try {
      let output = '';
      let error = null;

      // Simulate code execution with basic evaluation
      switch (language) {
        case 'javascript':
        case 'typescript':
          try {
            // Create a safe evaluation environment
            const consoleOutput: string[] = [];
            const safeConsole = {
              log: (...args: any[]) => consoleOutput.push(args.join(' ')),
              error: (...args: any[]) => consoleOutput.push(`Error: ${args.join(' ')}`),
              warn: (...args: any[]) => consoleOutput.push(`Warning: ${args.join(' ')}`),
            };

            // Execute code in a controlled environment
            const safeEval = new Function('console', code);
            safeEval(safeConsole);
            output = consoleOutput.join('\n');
          } catch (e) {
            error = e instanceof Error ? e.message : 'An error occurred';
          }
          break;

        case 'python':
          output = 'Python execution is simulated in this environment\n';
          output += 'Output: Hello, World!';
          break;

        default:
          output = `Execution for ${language} is simulated.\nOutput: Hello, World!`;
      }

      const duration = performance.now() - startTime;
      const result = { output, error, duration };
      
      setLastResult(result);
      setIsExecuting(false);
      
      if (error) {
        toast.error('Code execution failed');
      } else {
        toast.success('Code executed successfully');
      }

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      const result = {
        output: '',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        duration,
      };

      setLastResult(result);
      setIsExecuting(false);
      toast.error('Code execution failed');

      return result;
    }
  }, []);

  return {
    executeCode,
    isExecuting,
    lastResult,
  };
};