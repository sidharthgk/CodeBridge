import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageProgress {
  language: string;
  completedLessons: string[];
  totalTime: number;
  lastAccessed: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: number;
  icon: string;
}

interface UserProgress {
  languageProgress: Record<string, LanguageProgress>;
  achievements: Achievement[];
  streak: {
    current: number;
    longest: number;
    lastActivity: number;
  };
  totalPoints: number;
}

interface UserProgressStore extends UserProgress {
  updateLanguageProgress: (language: string, updates: Partial<LanguageProgress>) => void;
  completeLesson: (language: string, lessonId: string) => void;
  addAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  updateStreak: () => void;
  addPoints: (points: number) => void;
}

const calculateStreak = (lastActivity: number, currentStreak: number): number => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const daysSinceLastActivity = Math.floor((now - lastActivity) / oneDayMs);

  if (daysSinceLastActivity <= 1) {
    return currentStreak + 1;
  }
  return 1;
};

export const useUserProgressStore = create<UserProgressStore>()(
  persist(
    (set, get) => ({
      languageProgress: {},
      achievements: [],
      streak: {
        current: 0,
        longest: 0,
        lastActivity: Date.now(),
      },
      totalPoints: 0,

      updateLanguageProgress: (language, updates) =>
        set((state) => ({
          languageProgress: {
            ...state.languageProgress,
            [language]: {
              ...state.languageProgress[language],
              ...updates,
              lastAccessed: Date.now(),
            },
          },
        })),

      completeLesson: (language, lessonId) =>
        set((state) => {
          const currentProgress = state.languageProgress[language] || {
            language,
            completedLessons: [],
            totalTime: 0,
            lastAccessed: Date.now(),
            skillLevel: 'beginner' as const,
          };

          if (currentProgress.completedLessons.includes(lessonId)) {
            return state;
          }

          return {
            languageProgress: {
              ...state.languageProgress,
              [language]: {
                ...currentProgress,
                completedLessons: [...currentProgress.completedLessons, lessonId],
                lastAccessed: Date.now(),
              },
            },
          };
        }),

      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [
            ...state.achievements,
            { ...achievement, unlockedAt: Date.now() },
          ],
        })),

      updateStreak: () =>
        set((state) => {
          const newStreak = calculateStreak(
            state.streak.lastActivity,
            state.streak.current
          );
          return {
            streak: {
              current: newStreak,
              longest: Math.max(state.streak.longest, newStreak),
              lastActivity: Date.now(),
            },
          };
        }),

      addPoints: (points) =>
        set((state) => ({
          totalPoints: state.totalPoints + points,
        })),
    }),
    {
      name: 'user-progress',
      version: 1,
    }
  )
);