import { UserProgress } from "../types";
import { LANGUAGES, LESSONS } from "../data";
import { wordsLearnedSet } from "./progress";

export interface BadgeDef {
  id: string;
  icon: string; // key mapped in BadgeIcon
  hint: string;
  test: (p: UserProgress) => boolean;
}

const allLessonsDone = (p: UserProgress) =>
  LANGUAGES.some((l) => {
    const ls = LESSONS.filter((x) => x.languageId === l.languageId);
    return ls.length > 0 && ls.every((x) => p.completedLessons.includes(x.lessonId));
  });

export const BADGES: BadgeDef[] = [
  { id: "First Step", icon: "footprints", hint: "Finish your first lesson", test: (p) => p.completedLessons.length >= 1 },
  { id: "Scholar", icon: "grad", hint: "Finish 5 lessons", test: (p) => p.completedLessons.length >= 5 },
  { id: "7 Day Streak", icon: "flame", hint: "Learn 7 days in a row", test: (p) => p.longestStreak >= 7 },
  { id: "30 Day Streak", icon: "flame", hint: "Learn 30 days in a row", test: (p) => p.longestStreak >= 30 },
  { id: "100 Words", icon: "book", hint: "Learn 100 words", test: (p) => wordsLearnedSet(p).size >= 100 },
  { id: "Language Master", icon: "award", hint: "Earn 500 XP", test: (p) => p.totalXp >= 500 },
  { id: "Completionist", icon: "trophy", hint: "Finish every lesson in a language", test: allLessonsDone },
  { id: "Reviewer", icon: "rotate", hint: "Review 50 flashcards", test: (p) => (p.reviews || 0) >= 50 },
  { id: "Sentence Smith", icon: "puzzle", hint: "Build 10 sentences", test: (p) => (p.sentencesBuilt || 0) >= 10 },
  { id: "Voice Keeper", icon: "mic", hint: "Record your first clip", test: (p) => (p.recordingsCount || 0) >= 1 },
  { id: "Contributor", icon: "send", hint: "Suggest a word or correction", test: (p) => (p.suggestions || []).length >= 1 },
  { id: "Keeper of Roots", icon: "landmark", hint: "Read Module 4 (IKSPs)", test: (p) => (p.readModules || []).includes("module-4") },
  { id: "Keeper of Words", icon: "landmark", hint: "Read Module 5 (Language)", test: (p) => (p.readModules || []).includes("module-5") },
  { id: "Keeper of Places", icon: "landmark", hint: "Read Module 6 (People & Places)", test: (p) => (p.readModules || []).includes("module-6") },
];
