import { create } from 'zustand';
import type { Language, User, Project } from '../types';

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
  setUser: (user) => set({ user }),
  setCurrentLanguage: (language) => set({ currentLanguage: language }),
  setCompareLanguage: (language) => set({ compareLanguage: language }),
  setCompareMode: (isCompare) => set({ isCompareMode: isCompare }),
}));