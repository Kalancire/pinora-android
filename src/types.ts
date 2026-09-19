export interface Language {
  languageId: number;
  name: string;
  nativeName: string;
  region: string;
  icon: string;
  enabled: boolean;
}

export interface Word {
  wordId: number;
  languageId: number;
  word: string;
  meaning: string;
  pronunciation: string;
  category: string;
}

export interface Lesson {
  lessonId: number;
  languageId: number;
  title: string;
  nativeTitle: string;
  wordRefs: number[]; // Array of wordIds in this lesson
  xpReward: number;
  lessonNumber: number;
}

export interface UserProgress {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  completedLessons: number[]; // Completed lessonIds
  lastActiveDate: number | null; // Timestamp
  xpHistory?: { date: string; xp: number }[]; // Date in YYYY-MM-DD format
  achievements?: string[]; // Array of awarded badge IDs or names
  dailyXpGoal?: number; // Target XP per day
  mistakes?: number[]; // Array of wordIds the user got wrong
}
