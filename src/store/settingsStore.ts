import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorSettings {
  theme: string;
  fontSize: number;
  wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  autoIndent: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  tabSize: number;
}

interface SettingsStore {
  editorSettings: EditorSettings;
  updateEditorSettings: (settings: Partial<EditorSettings>) => void;
  resetEditorSettings: () => void;
}

const defaultSettings: EditorSettings = {
  theme: 'vs-dark',
  fontSize: 14,
  wordWrap: 'off',
  autoIndent: true,
  minimap: false,
  lineNumbers: true,
  tabSize: 2,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      editorSettings: defaultSettings,
      
      updateEditorSettings: (settings) =>
        set((state) => ({
          editorSettings: {
            ...state.editorSettings,
            ...settings,
          },
        })),
      
      resetEditorSettings: () =>
        set(() => ({
          editorSettings: defaultSettings,
        })),
    }),
    {
      name: 'settings-store',
      version: 1,
    }
  )
);