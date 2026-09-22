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
import { I18nProvider } from "./lib/i18n";
import { refreshIndex } from "./lib/recordings";
import HomeScreen from "./components/HomeScreen";
import LearnScreen from "./components/LearnScreen";
import LessonScreen from "./components/LessonScreen";
import DictionaryScreen from "./components/DictionaryScreen";
import SpellingGuideScreen from "./components/SpellingGuideScreen";
import StoriesScreen from "./components/StoriesScreen";
import CultureScreen from "./components/CultureScreen";
import SettingsScreen from "./components/SettingsScreen";
import ReviewScreen from "./components/ReviewScreen";
import SentenceBuilderScreen from "./components/SentenceBuilderScreen";
import PhrasebookScreen from "./components/PhrasebookScreen";
import SpeakScreen from "./components/SpeakScreen";
import PlacementScreen from "./components/PlacementScreen";
import SuggestScreen from "./components/SuggestScreen";
import BottomNav, { TabId } from "./components/ui/BottomNav";

type Overlay =
  | "lesson" | "settings" | "review" | "sentences" | "phrasebook" | "speak" | "placement" | "suggest" | null;

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonStartMode, setLessonStartMode] = useState<"study" | "quiz">("study");
  const [speakStartId, setSpeakStartId] = useState<string | undefined>(undefined);
  const [suggestPre, setSuggestPre] = useState<{ wordId?: number; word?: string }>({});

  const [progress, setProgress] = useState<UserProgress>(loadLocal);
  const hydrated = useRef(false);
  const saveTimer = useRef<number | null>(null);

  const activeLanguageId = progress.activeLanguageId ?? 1;

  useEffect(() => {
    refreshIndex();
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

  const addXp = useCallback((xp: number) => {
    if (xp <= 0) return;
    update((p) => applyLessonResult(p, -1, xp, [], []));
  }, [update]);

  const goTab = (t: TabId) => {
    setTab(t);
    setOverlay(null);
    setActiveLesson(null);
    window.scrollTo({ top: 0 });
  };

  const openOverlay = (o: Overlay) => {
    setOverlay(o);
    window.scrollTo({ top: 0 });
  };

  const startLesson = (lesson: Lesson, mode: "study" | "quiz" = "study") => {
    setActiveLesson(lesson);
    setLessonStartMode(mode);
    setOverlay("lesson");
    window.scrollTo({ top: 0 });
  };

  const closeOverlay = () => {
    setOverlay(null);
    setActiveLesson(null);
  };

  const completeLesson = (xp: number, made: number[] = [], corrected: number[] = []) => {
    if (!activeLesson) return;
    const id = activeLesson.lessonId;
    update((p) => applyLessonResult(p, id, xp, made, corrected));
    playSfx("complete");
    setTab(id === -1 ? "learn" : "home");
    closeOverlay();
  };

  const resetAll = () => {
    setProgress({ ...EMPTY_PROGRESS, updatedAt: Date.now() });
    setOverlay(null);
    setTab("home");
  };

  const openSuggest = (wordId?: number, prefill?: string) => {
    setSuggestPre({ wordId, word: prefill });
    openOverlay("suggest");
  };

  const inLesson = overlay === "lesson" && activeLesson;
  const noop = () => {};

  return (
    <I18nProvider lang={progress.uiLang || "en"}>
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
                onBackToHome={closeOverlay}
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
                onBack={closeOverlay}
                onSuggest={() => openSuggest()}
                onRestore={(p) => setProgress(p)}
              />
            )}

            {!inLesson && overlay === "review" && (
              <ReviewScreen key="review" progress={progress} update={update} addXp={addXp} onBack={closeOverlay} />
            )}

            {!inLesson && overlay === "sentences" && (
              <SentenceBuilderScreen key="sentences" update={update} addXp={addXp} onBack={closeOverlay} />
            )}

            {!inLesson && overlay === "phrasebook" && (
              <PhrasebookScreen
                key="phrasebook"
                progress={progress}
                onPractice={(sid) => {
                  setSpeakStartId(sid);
                  openOverlay("speak");
                }}
                onBack={closeOverlay}
              />
            )}

            {!inLesson && overlay === "speak" && <SpeakScreen key="speak" startId={speakStartId} onBack={closeOverlay} />}

            {!inLesson && overlay === "placement" && (
              <PlacementScreen key="placement" languageId={activeLanguageId} update={update} onStartLesson={startLesson} onBack={closeOverlay} />
            )}

            {!inLesson && overlay === "suggest" && (
              <SuggestScreen key="suggest" progress={progress} update={update} preWordId={suggestPre.wordId} onBack={closeOverlay} />
            )}

            {!inLesson && overlay === null && tab === "home" && (
              <HomeScreen
                key="home"
                progress={progress}
                activeLanguageId={activeLanguageId}
                onStartLesson={(l) => startLesson(l)}
                onOpenSettings={() => openOverlay("settings")}
                update={update}
              />
            )}

            {!inLesson && overlay === null && tab === "learn" && (
              <LearnScreen
                key="learn"
                progress={progress}
                activeLanguageId={activeLanguageId}
                onSelectLanguage={(id) => update({ activeLanguageId: id })}
                onStartLesson={startLesson}
                onOpen={openOverlay}
              />
            )}

            {!inLesson && overlay === null && tab === "dictionary" && (
              <DictionaryScreen
                key="dictionary"
                initialLanguageId={activeLanguageId}
                progress={progress}
                update={update}
                onSuggest={openSuggest}
                onBackToHome={noop}
              />
            )}

            {!inLesson && overlay === null && tab === "stories" && (
              <StoriesScreen key="stories" onBackToHome={noop} onOpenGuide={() => goTab("guide")} />
            )}

            {!inLesson && overlay === null && tab === "guide" && (
              <SpellingGuideScreen key="guide" onBackToHome={noop} onOpenStories={() => goTab("stories")} />
            )}

            {!inLesson && overlay === null && tab === "culture" && (
              <CultureScreen key="culture" progress={progress} update={update} />
            )}
          </AnimatePresence>
        </main>

        {!inLesson && <BottomNav active={overlay ? "home" : tab} onChange={goTab} />}
      </div>
    </I18nProvider>
  );
}
