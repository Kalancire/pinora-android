import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { Lesson, UserProgress } from "./types";
import {
  EMPTY_PROGRESS,
  applyLessonResult,
  loadLocal,
  loadNative,
  saveLocal,
  saveNative,
} from "./lib/progress";
import { setSfxEnabled, playSfx } from "./utils/sfx";
import HomeScreen from "./components/HomeScreen";
import LearnScreen from "./components/LearnScreen";
import LessonScreen from "./components/LessonScreen";
import DictionaryScreen from "./components/DictionaryScreen";
import SpellingGuideScreen from "./components/SpellingGuideScreen";
import StoriesScreen from "./components/StoriesScreen";
import BotolanModulesScreen from "./components/BotolanModulesScreen";
import SettingsScreen from "./components/SettingsScreen";
import BottomNav, { TabId } from "./components/ui/BottomNav";

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [overlay, setOverlay] = useState<"lesson" | "settings" | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonStartMode, setLessonStartMode] = useState<"study" | "quiz">("study");

  const [progress, setProgress] = useState<UserProgress>(loadLocal);
  const hydrated = useRef(false);
  const saveTimer = useRef<number | null>(null);

  const activeLanguageId = progress.activeLanguageId ?? 1;

  // On Android, restore from the file in the app folder if it is newer than local storage.
  useEffect(() => {
    let alive = true;
    loadNative().then((file) => {
      if (!alive) return;
      if (file && (file.updatedAt ?? 0) > (progress.updatedAt ?? 0)) setProgress(file);
      hydrated.current = true;
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save on every change: local storage right away, the app-folder file shortly after.
  useEffect(() => {
    setSfxEnabled(progress.soundOn !== false);
    saveLocal(progress);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      if (hydrated.current) saveNative(progress);
    }, 350);
  }, [progress]);

  const update = useCallback((patch: Partial<UserProgress> | ((p: UserProgress) => UserProgress)) => {
    setProgress((prev) => {
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      return { ...next, updatedAt: Date.now() };
    });
  }, []);

  const goTab = (t: TabId) => {
    setTab(t);
    setOverlay(null);
    setActiveLesson(null);
    window.scrollTo({ top: 0 });
  };

  const startLesson = (lesson: Lesson, mode: "study" | "quiz" = "study") => {
    setActiveLesson(lesson);
    setLessonStartMode(mode);
    setOverlay("lesson");
    window.scrollTo({ top: 0 });
  };

  const closeLesson = () => {
    setOverlay(null);
    setActiveLesson(null);
  };

  const completeLesson = (xp: number, made: number[] = [], corrected: number[] = []) => {
    if (!activeLesson) return;
    const id = activeLesson.lessonId;
    update((p) => applyLessonResult(p, id, xp, made, corrected));
    playSfx("complete");
    setTab(id === -1 ? "learn" : "home");
    closeLesson();
  };

  const resetAll = () => {
    setProgress({ ...EMPTY_PROGRESS, updatedAt: Date.now() });
    setOverlay(null);
    setTab("home");
  };

  const inLesson = overlay === "lesson" && activeLesson;
  const noop = () => {};

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-200" id="main-root-container">
      <main
        className="mx-auto w-full max-w-2xl px-4 sm:px-6"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 16px)",
          paddingBottom: inLesson ? "32px" : "128px",
        }}
        id="app-viewport"
      >
        <AnimatePresence mode="wait">
          {inLesson && (
            <LessonScreen
              key={`lesson-${activeLesson!.lessonId}`}
              lesson={activeLesson!}
              progress={progress}
              onBackToHome={closeLesson}
              onLessonComplete={completeLesson}
              startMode={lessonStartMode}
            />
          )}

          {!inLesson && overlay === "settings" && (
            <SettingsScreen
              key="settings"
              progress={progress}
              onChange={(patch) => update(patch)}
              onReset={resetAll}
              onBack={() => setOverlay(null)}
            />
          )}

          {!inLesson && overlay === null && tab === "home" && (
            <HomeScreen
              key="home"
              progress={progress}
              activeLanguageId={activeLanguageId}
              onStartLesson={(l) => startLesson(l)}
              onOpenSettings={() => setOverlay("settings")}
            />
          )}

          {!inLesson && overlay === null && tab === "learn" && (
            <LearnScreen
              key="learn"
              progress={progress}
              activeLanguageId={activeLanguageId}
              onSelectLanguage={(id) => update({ activeLanguageId: id })}
              onStartLesson={startLesson}
            />
          )}

          {!inLesson && overlay === null && tab === "dictionary" && (
            <DictionaryScreen key="dictionary" initialLanguageId={activeLanguageId} onBackToHome={noop} />
          )}

          {!inLesson && overlay === null && tab === "stories" && (
            <StoriesScreen key="stories" onBackToHome={noop} onOpenGuide={() => goTab("guide")} />
          )}

          {!inLesson && overlay === null && tab === "guide" && (
            <SpellingGuideScreen key="guide" onBackToHome={noop} onOpenStories={() => goTab("stories")} />
          )}

          {!inLesson && overlay === null && tab === "culture" && <BotolanModulesScreen key="culture" onBackToHome={noop} />}
        </AnimatePresence>
      </main>

      {!inLesson && <BottomNav active={overlay === "settings" ? "home" : tab} onChange={goTab} />}
    </div>
  );
}
