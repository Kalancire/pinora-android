import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { UserProgress } from "../types";

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
};

export const isNative = () => Capacitor.isNativePlatform();

/** Local calendar day as YYYY-MM-DD (not UTC, so the day flips at local midnight). */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
};

/** The streak shown to the user: 0 if they skipped a full day. */
export function displayStreak(p: UserProgress): number {
  if (!p.lastActiveDate) return 0;
  const last = dayKey(new Date(p.lastActiveDate));
  return last === dayKey() || last === yesterdayKey() ? p.currentStreak : 0;
}

export function todayXp(p: UserProgress): number {
  return p.xpHistory?.find((h) => h.date === dayKey())?.xp ?? 0;
}

export function levelInfo(totalXp: number) {
  const level = Math.floor(totalXp / LEVEL_XP) + 1;
  const into = totalXp % LEVEL_XP;
  return { level, into, next: LEVEL_XP, pct: (into / LEVEL_XP) * 100 };
}

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
  if (last !== today) streak = last === yesterdayKey() ? prev.currentStreak + 1 : 1;

  const completed =
    lessonId === -1 || prev.completedLessons.includes(lessonId)
      ? prev.completedLessons
      : [...prev.completedLessons, lessonId];

  const history = [...(prev.xpHistory || [])];
  const idx = history.findIndex((h) => h.date === today);
  if (idx >= 0) history[idx] = { ...history[idx], xp: history[idx].xp + xpEarned };
  else history.push({ date: today, xp: xpEarned });

  const totalXp = prev.totalXp + xpEarned;
  const badges = new Set(prev.achievements || []);
  if (completed.length >= 1) badges.add("First Step");
  if (completed.length >= 5) badges.add("Scholar");
  if (streak >= 10) badges.add("10 Day Streak");
  if (totalXp >= 500) badges.add("Language Master");

  let mistakes = [...(prev.mistakes || [])];
  mistakesMade.forEach((m) => {
    if (!mistakes.includes(m)) mistakes.push(m);
  });
  mistakes = mistakes.filter((m) => !mistakesCorrected.includes(m));

  return {
    ...prev,
    totalXp,
    currentStreak: streak,
    longestStreak: Math.max(prev.longestStreak, streak),
    completedLessons: completed,
    lastActiveDate: Date.now(),
    xpHistory: history,
    achievements: Array.from(badges),
    mistakes,
  };
}

function normalize(raw: any): UserProgress {
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
    const res = await Filesystem.readFile({
      path: PROGRESS_FILE,
      directory: Directory.External,
      encoding: Encoding.UTF8,
    });
    const text = typeof res.data === "string" ? res.data : await (res.data as Blob).text();
    return normalize(JSON.parse(text));
  } catch {
    return null; // no file yet
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
