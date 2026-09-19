import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Flame, 
  Award, 
  RotateCcw, 
  Terminal, 
  Sparkles,
  Heart,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Map
} from "lucide-react";
import { Lesson, UserProgress } from "./types";
import { LANGUAGES, LESSONS } from "./data";
import HomeScreen from "./components/HomeScreen";
import LessonScreen from "./components/LessonScreen";
import DictionaryScreen from "./components/DictionaryScreen";
import SpellingGuideScreen from "./components/SpellingGuideScreen";
import StoriesScreen from "./components/StoriesScreen";

const LOCAL_STORAGE_KEY = "pinora_user_progress_v1";

const DEFAULT_PROGRESS: UserProgress = {
  totalXp: 125, // Start with some initial onboarding XP to feel warm
  currentStreak: 3, // Initial warm streak representation
  longestStreak: 5,
  completedLessons: [],
  lastActiveDate: Date.now() - 3600 * 1000, // Last studied 1 hour ago
  xpHistory: [
    { date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], xp: 40 },
    { date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0], xp: 55 },
    { date: new Date().toISOString().split('T')[0], xp: 30 }
  ],
  achievements: ["Early Bird"],
  dailyXpGoal: 50
};

export default function App() {
  // States
  const [currentScreen, setCurrentScreen] = useState<"home" | "lesson" | "dictionary" | "guide" | "stories">("home");
  const [activeLanguageId, setActiveLanguageId] = useState<number>(1); // Defaults to Botolan Sambal
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonStartMode, setLessonStartMode] = useState<"study" | "quiz">("study");

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Gamification progress states
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          xpHistory: parsed.xpHistory || DEFAULT_PROGRESS.xpHistory,
          achievements: parsed.achievements || DEFAULT_PROGRESS.achievements,
          dailyXpGoal: parsed.dailyXpGoal || DEFAULT_PROGRESS.dailyXpGoal
        };
      }
    } catch (e) {
      console.error("Local storage progress retrieval failed", e);
    }
    return DEFAULT_PROGRESS;
  });

  // Calculate day difference to manage streak increment/resets automatically
  useEffect(() => {
    const checkAndIncrementStreaks = () => {
      if (!progress.lastActiveDate) return;
      
      const now = Date.now();
      const diffMs = now - progress.lastActiveDate;
      const diffHours = diffMs / (1000 * 60 * 60);

      let updatedProgress = { ...progress };
      
      if (diffHours >= 24 && diffHours < 48) {
        // Safe streak increment!
        const nextStreak = progress.currentStreak + 1;
        updatedProgress.currentStreak = nextStreak;
        if (nextStreak > progress.longestStreak) {
          updatedProgress.longestStreak = nextStreak;
        }
        updatedProgress.lastActiveDate = now;
        setProgress(updatedProgress);
      } else if (diffHours >= 48) {
        // Broke streak reset!
        updatedProgress.currentStreak = 1;
        updatedProgress.lastActiveDate = now;
        setProgress(updatedProgress);
      }
    };

    checkAndIncrementStreaks();
  }, []);

  // Sync state mutations to offline localStorage seamlessly
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Launch lesson event
  const handleStartLesson = (lesson: Lesson, startMode: "study" | "quiz" = "study") => {
    setActiveLesson(lesson);
    setLessonStartMode(startMode);
    setCurrentScreen("lesson");
  };

  // Complete lesson successfully event
  const handleLessonComplete = (xpEarned: number, mistakesMade: number[] = [], mistakesCorrected: number[] = []) => {
    if (!activeLesson) return;

    setProgress((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(activeLesson.lessonId);
      const nextCompleted = (alreadyCompleted || activeLesson.lessonId === -1)
        ? prev.completedLessons 
        : [...prev.completedLessons, activeLesson.lessonId];

      const today = new Date().toISOString().split('T')[0];
      const prevXpHistory = prev.xpHistory || [];
      const todayEntryIndex = prevXpHistory.findIndex(entry => entry.date === today);
      
      let nextXpHistory = [...prevXpHistory];
      if (todayEntryIndex >= 0) {
        nextXpHistory[todayEntryIndex] = {
          ...nextXpHistory[todayEntryIndex],
          xp: nextXpHistory[todayEntryIndex].xp + xpEarned
        };
      } else {
        nextXpHistory.push({ date: today, xp: xpEarned });
      }

      // Check achievements
      const newTotalXp = prev.totalXp + xpEarned;
      const nextAchievements = new Set(prev.achievements || []);
      
      if (newTotalXp >= 500) nextAchievements.add("Language Master");
      if (prev.currentStreak >= 10) nextAchievements.add("10 Day Streak");
      if (nextCompleted.length >= 5) nextAchievements.add("Scholar");
      
      // Update mistakes
      let nextMistakes = prev.mistakes ? [...prev.mistakes] : [];
      mistakesMade.forEach(m => {
        if (!nextMistakes.includes(m)) nextMistakes.push(m);
      });
      nextMistakes = nextMistakes.filter(m => !mistakesCorrected.includes(m));

      return {
        ...prev,
        totalXp: newTotalXp,
        completedLessons: nextCompleted,
        lastActiveDate: Date.now(),
        xpHistory: nextXpHistory,
        achievements: Array.from(nextAchievements),
        mistakes: nextMistakes
      };
    });

    setCurrentScreen("home");
    setActiveLesson(null);
  };

  // Reset progress helper for developer testing
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to restore your language progress back to initial default values?")) {
      setProgress(DEFAULT_PROGRESS);
      setCurrentScreen("home");
      setActiveLesson(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 flex flex-col font-sans selection:bg-neutral-200 selection:text-neutral-900 relative" id="main-root-container">
      {/* Top Header Row */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-neutral-200 py-4 px-6 sticky top-0 z-50 shadow-sm" id="page-header">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentScreen("home")}
            title="Return to Home"
            id="header-brand"
          >
            <div className="relative w-9 h-9 flex-shrink-0 shadow-sm rounded-xl overflow-hidden ring-1 ring-black/10 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/icon.svg" 
                alt="PINORA Logo" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
                id="app-header-logo" 
              />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-neutral-900 font-display flex items-center gap-2 leading-none">
                PINORA
                <span className="text-[10px] bg-amber-50 text-amber-700 font-mono py-0.5 px-2 rounded-sm uppercase tracking-widest font-semibold border border-amber-200/60">
                  Offline
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick stats indicators */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Daily Goal Progress Bar */}
              <div className="flex flex-col gap-1.5 w-32">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-500 font-mono tracking-widest">
                  <span>Daily Goal</span>
                  <span>{progress.xpHistory?.find(h => h.date === new Date().toISOString().split('T')[0])?.xp || 0} / {progress.dailyXpGoal || 50}</span>
                </div>
                <div className="w-full h-1 bg-neutral-200 overflow-hidden rounded-full">
                  <div 
                    className="h-full bg-neutral-900 transition-all duration-500"
                    style={{ width: `${Math.min(100, ((progress.xpHistory?.find(h => h.date === new Date().toISOString().split('T')[0])?.xp || 0) / (progress.dailyXpGoal || 50)) * 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="w-px h-6 bg-neutral-200 mx-2"></div>

              <div className="flex items-center gap-2" id="header-streak-badge">
                <Flame className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-semibold text-neutral-700 font-mono">{progress.currentStreak} Days</span>
              </div>
            </div>
            
            <button
              onClick={handleResetProgress}
              className="text-neutral-400 hover:text-neutral-900 transition-colors p-2 rounded-md hover:bg-neutral-100 border border-transparent"
              title="Reset Progress"
              id="reset-dev-controls"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Navigation Bar */}
        <div className="max-w-5xl mx-auto flex items-center gap-1 pt-3 overflow-x-auto scrollbar-none border-t border-neutral-100 mt-3">
          <button
            onClick={() => {
              setCurrentScreen("home");
              setActiveLesson(null);
            }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentScreen === "home" || currentScreen === "lesson"
                ? "bg-neutral-900 text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
            id="nav-tab-home"
          >
            <Compass className="w-3.5 h-3.5" />
            Curriculum
          </button>

          <button
            onClick={() => {
              setCurrentScreen("guide");
              setActiveLesson(null);
            }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentScreen === "guide"
                ? "bg-neutral-900 text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
            id="nav-tab-guide"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Spelling &amp; Grammar Guide
            <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">
              DepEd
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentScreen("stories");
              setActiveLesson(null);
            }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentScreen === "stories"
                ? "bg-neutral-900 text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
            id="nav-tab-stories"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Zambales Stories (Aw-Istorya)
            <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">
              6 Readers
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentScreen("dictionary");
              setActiveLesson(null);
            }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentScreen === "dictionary"
                ? "bg-neutral-900 text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
            id="nav-tab-dictionary"
          >
            <Map className="w-3.5 h-3.5" />
            Lexicon (Dictionary)
          </button>
        </div>
      </header>

      {/* Primary Container Box */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 relative" id="app-viewport">
        {/* Offline Toast Indicator */}
        <AnimatePresence>
          {isOffline && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-neutral-100 text-neutral-900 px-5 py-2.5 rounded shadow-sm flex items-center gap-3 text-sm font-medium border border-neutral-200"
            >
              <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full animate-pulse" />
              Offline mode. Progress saved locally.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <HomeScreen
              key="home-screen"
              progress={progress}
              activeLanguageId={activeLanguageId}
              onSelectLanguage={setActiveLanguageId}
              onStartLesson={handleStartLesson}
              onOpenDictionary={() => setCurrentScreen("dictionary")}
              onOpenGuide={() => setCurrentScreen("guide")}
              onOpenStories={() => setCurrentScreen("stories")}
            />
          )}

          {currentScreen === "lesson" && activeLesson && (
            <LessonScreen
              key={`lesson-screen-${activeLesson.lessonId}`}
              lesson={activeLesson}
              progress={progress}
              onBackToHome={() => {
                setCurrentScreen("home");
                setActiveLesson(null);
              }}
              onLessonComplete={handleLessonComplete}
              startMode={lessonStartMode}
            />
          )}

          {currentScreen === "dictionary" && (
            <DictionaryScreen
              key="dictionary-screen"
              initialLanguageId={activeLanguageId}
              onBackToHome={() => setCurrentScreen("home")}
            />
          )}

          {currentScreen === "guide" && (
            <SpellingGuideScreen
              key="guide-screen"
              onBackToHome={() => setCurrentScreen("home")}
              onOpenStories={() => setCurrentScreen("stories")}
            />
          )}

          {currentScreen === "stories" && (
            <StoriesScreen
              key="stories-screen"
              onBackToHome={() => setCurrentScreen("home")}
              onOpenGuide={() => setCurrentScreen("guide")}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Styled Humanistic Footer */}
      <footer className="border-t border-neutral-200 bg-white py-10 mt-12 px-6" id="page-footer">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <img 
              src="/icon.svg" 
              alt="PINORA Logo" 
              className="w-10 h-10 rounded-xl shadow-xs ring-1 ring-black/10 flex-shrink-0" 
              referrerPolicy="no-referrer" 
              id="footer-pinora-logo"
            />
            <div>
              <span className="text-sm font-display font-semibold text-neutral-900 block">PINORA Project</span>
              <span className="text-xs text-neutral-500 mt-0.5 block max-w-md leading-relaxed">
                Academic preservation initiative mapping Philippine regional and indigenous languages with strict adherence to DepEd & KWF orthographies.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-[11px] font-medium text-neutral-400">
            <span>© {new Date().getFullYear()} PINORA Inst.</span>
            <span>Local Progress Engine V1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
