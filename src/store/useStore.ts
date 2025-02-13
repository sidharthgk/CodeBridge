import { create } from 'zustand';
interface User {
  id: string;
  name: string;
  email: string;
}

interface Language {
  code: string;
  name: string;
}
interface Store {
  user: User | null;
  currentLanguage: Language | null;
  compareLanguage: Language | null;
  isCompareMode: boolean;
  setUser: (user: User | null) => void;
  setCurrentLanguage: (language: Language | null) => void;
  setCompareLanguage: (language: Language | null) => void;
  setCompareMode: (isCompare: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  currentLanguage: null,
  compareLanguage: null,
  isCompareMode: false,
  setUser: (user: User | null) => set({ user }),
  setCurrentLanguage: (language: Language | null) => set({ currentLanguage: language }),
  setCompareLanguage: (language: Language | null) => set({ compareLanguage: language }),
  setCompareMode: (isCompare: boolean) => set({ isCompareMode: isCompare }),
}));