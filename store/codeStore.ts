import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { beautify } from 'js-beautify';

interface CodeSnippet {
  id: string;
  code: string;
  language: string;
  title: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
}

interface CodeStore {
  snippets: CodeSnippet[];
  recentLanguages: string[];
  addSnippet: (snippet: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSnippet: (id: string, updates: Partial<CodeSnippet>) => void;
  deleteSnippet: (id: string) => void;
  addRecentLanguage: (language: string) => void;
  formatCode: (code: string, language: string) => string;
}

export const useCodeStore = create<CodeStore>()(
  persist(
    (set, get) => ({
      snippets: [],
      recentLanguages: [],
      
      addSnippet: (snippet) => {
        const id = crypto.randomUUID();
        const now = Date.now();
        set((state) => ({
          snippets: [
            {
              ...snippet,
              id,
              createdAt: now,
              updatedAt: now,
              code: get().formatCode(snippet.code, snippet.language),
            },
            ...state.snippets,
          ],
        }));
      },

      updateSnippet: (id, updates) => {
        set((state) => ({
          snippets: state.snippets.map((snippet) =>
            snippet.id === id
              ? {
                  ...snippet,
                  ...updates,
                  updatedAt: Date.now(),
                  code: updates.code
                    ? get().formatCode(updates.code, updates.language || snippet.language)
                    : snippet.code,
                }
              : snippet
          ),
        }));
      },

      deleteSnippet: (id) => {
        set((state) => ({
          snippets: state.snippets.filter((snippet) => snippet.id !== id),
        }));
      },

      addRecentLanguage: (language) => {
        set((state) => ({
          recentLanguages: [
            language,
            ...state.recentLanguages.filter((lang) => lang !== language),
          ].slice(0, 5),
        }));
      },

      formatCode: (code: string, language: string) => {
        try {
          switch (language) {
            case 'javascript':
            case 'typescript':
              return beautify(code, {
                indent_size: 2,
                space_in_empty_paren: true,
              });
            case 'html':
              return beautify.html(code, {
                indent_size: 2,
              });
            case 'css':
              return beautify.css(code, {
                indent_size: 2,
              });
            default:
              return code;
          }
        } catch (error) {
          console.error('Error formatting code:', error);
          return code;
        }
      },
    }),
    {
      name: 'code-store',
      version: 1,
    }
  )
);