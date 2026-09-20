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
  variant?: string; // alternate spelling (e.g. Module 5 / Antworth 1979 spelling)
  note?: string; // accuracy / usage note
  source?: string; // where the entry is attested
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
  soundOn?: boolean; // sound effects enabled
  activeLanguageId?: number; // last selected language
  updatedAt?: number; // last save timestamp (used to pick the newest copy)
}
