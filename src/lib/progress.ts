import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { UserProgress } from "../types";
import { LESSONS } from "../data";

/**
 * Progress storage.
 * - Every new install starts at zero.
 * - Saved in the WebView's local storage (app data) on every change.
 * - On Android it is also mirrored to a JSON file in the app's own folder:
 *   Android/data/com.pinora.app/files/pinora-progress.json
 */

export const PROGRESS_KEY = "pinora_progress_v2";
export const PROGRESS_FILE = "pinora-progress.json";
export const LEVEL_XP = 100;
export const SRS_DAYS = [0, 1, 2, 4, 8, 16];

export const EMPTY_PROGRESS: UserProgress = {
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  completedLessons: [],
  lastActiveDate: null,
  xpHistory: [],
  achievements: [],
  dailyXpGoal: 50,
  mistakes: [],
  soundOn: true,
  activeLanguageId: 1,
  updatedAt: 0,
  favorites: [],
  srs: {},
  reviews: 0,
  uiLang: "en",
  reminder: { on: false, hour: 19, minute: 0 },
  recommendedLesson: {},
  readModules: [],
  suggestions: [],
  lessonLog: [],
  recordingsCount: 0,
  sentencesBuilt: 0,
};

export const isNative = () => Capacitor.isNativePlatform();

/** Local calendar day as YYYY-MM-DD (not UTC, so the day flips at local midnight). */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const addDays = (n: number, from: Date = new Date()) => {
  const d = new Date(from);
  d.setDate(d.getDate() + n);
  return dayKey(d);
};

/** The streak shown to the user: 0 if they skipped a full day. */
export function displayStreak(p: UserProgress): number {
  if (!p.lastActiveDate) return 0;
  const last = dayKey(new Date(p.lastActiveDate));
  return last === dayKey() || last === addDays(-1) ? p.currentStreak : 0;
}

export function todayXp(p: UserProgress): number {
  return p.xpHistory?.find((h) => h.date === dayKey())?.xp ?? 0;
}

export function levelInfo(totalXp: number) {
  const level = Math.floor(totalXp / LEVEL_XP) + 1;
  const into = totalXp % LEVEL_XP;
  return { level, into, next: LEVEL_XP, pct: (into / LEVEL_XP) * 100 };
}

export function wordsLearnedSet(p: UserProgress, sinceDate?: string): Set<number> {
  const set = new Set<number>();
  const ids = sinceDate
    ? (p.lessonLog || []).filter((l) => l.date >= sinceDate).map((l) => l.lessonId)
    : p.completedLessons;
  LESSONS.filter((l) => ids.includes(l.lessonId)).forEach((l) => l.wordRefs.forEach((w) => set.add(w)));
  return set;
}

/* ---------- spaced review ---------- */

export function dueWordIds(p: UserProgress): number[] {
  const today = dayKey();
  return Object.entries(p.srs || {})
    .filter(([, v]) => v.due <= today)
    .map(([id]) => Number(id));
}

export function gradeCard(p: UserProgress, wordId: number, knew: boolean): UserProgress {
  const cur = p.srs?.[wordId] ?? { box: 1, due: dayKey() };
  const box = knew ? Math.min(5, cur.box + 1) : 1;
  return {
    ...p,
    srs: { ...(p.srs || {}), [wordId]: { box, due: addDays(SRS_DAYS[box]) } },
    reviews: (p.reviews || 0) + 1,
  };
}

export function toggleFavorite(p: UserProgress, wordId: number): UserProgress {
  const fav = new Set(p.favorites || []);
  let srs = p.srs || {};
  if (fav.has(wordId)) fav.delete(wordId);
  else {
    fav.add(wordId);
    if (!srs[wordId]) srs = { ...srs, [wordId]: { box: 1, due: dayKey() } };
  }
  return { ...p, favorites: Array.from(fav), srs };
}

/* ---------- lesson results ---------- */

export function applyLessonResult(
  prev: UserProgress,
  lessonId: number,
  xpEarned: number,
  mistakesMade: number[],
  mistakesCorrected: number[]
): UserProgress {
  const today = dayKey();
  const last = prev.lastActiveDate ? dayKey(new Date(prev.lastActiveDate)) : null;

  let streak = prev.currentStreak;
  if (last !== today) streak = last === addDays(-1) ? prev.currentStreak + 1 : 1;

  const isNew = lessonId !== -1 && !prev.completedLessons.includes(lessonId);
  const completed = isNew ? [...prev.completedLessons, lessonId] : prev.completedLessons;

  const history = [...(prev.xpHistory || [])];
  const idx = history.findIndex((h) => h.date === today);
  if (idx >= 0) history[idx] = { ...history[idx], xp: history[idx].xp + xpEarned };
  else history.push({ date: today, xp: xpEarned });

  let mistakes = [...(prev.mistakes || [])];
  mistakesMade.forEach((m) => {
    if (!mistakes.includes(m)) mistakes.push(m);
  });
  mistakes = mistakes.filter((m) => !mistakesCorrected.includes(m));

  // new lesson words join the spaced review deck; missed words come back tomorrow
  let srs = { ...(prev.srs || {}) };
  const lesson = LESSONS.find((l) => l.lessonId === lessonId);
  if (isNew && lesson) lesson.wordRefs.forEach((w) => { if (!srs[w]) srs[w] = { box: 1, due: addDays(1) }; });
  mistakesMade.forEach((w) => { srs[w] = { box: 1, due: today }; });

  return {
    ...prev,
    totalXp: prev.totalXp + xpEarned,
    currentStreak: streak,
    longestStreak: Math.max(prev.longestStreak, streak),
    completedLessons: completed,
    lastActiveDate: Date.now(),
    xpHistory: history,
    mistakes,
    srs,
    lessonLog: isNew ? [...(prev.lessonLog || []), { lessonId, date: today }] : prev.lessonLog,
  };
}

/* ---------- persistence ---------- */

export function normalize(raw: any): UserProgress {
  return { ...EMPTY_PROGRESS, ...(raw || {}) };
}

export function loadLocal(): UserProgress {
  try {
    const s = localStorage.getItem(PROGRESS_KEY);
    if (s) return normalize(JSON.parse(s));
  } catch (e) {
    console.error("Progress read failed", e);
  }
  return { ...EMPTY_PROGRESS };
}

export function saveLocal(p: UserProgress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch (e) {
    console.error("Progress write failed", e);
  }
}

export async function loadNative(): Promise<UserProgress | null> {
  if (!isNative()) return null;
  try {
    const res = await Filesystem.readFile({ path: PROGRESS_FILE, directory: Directory.External, encoding: Encoding.UTF8 });
    const text = typeof res.data === "string" ? res.data : await (res.data as Blob).text();
    return normalize(JSON.parse(text));
  } catch {
    return null;
  }
}

export async function saveNative(p: UserProgress): Promise<boolean> {
  if (!isNative()) return false;
  try {
    await Filesystem.writeFile({
      path: PROGRESS_FILE,
      data: JSON.stringify(p, null, 2),
      directory: Directory.External,
      encoding: Encoding.UTF8,
      recursive: true,
    });
    return true;
  } catch (e) {
    console.error("Progress file write failed", e);
    return false;
  }
}

export async function nativeFilePath(): Promise<string | null> {
  if (!isNative()) return null;
  try {
    const r = await Filesystem.getUri({ path: PROGRESS_FILE, directory: Directory.External });
    return r.uri.replace("file://", "");
  } catch {
    return null;
  }
}
