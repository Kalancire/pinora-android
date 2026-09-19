import React, { useMemo } from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Flame, 
  BookOpen, 
  Compass, 
  CheckCircle, 
  Play, 
  Globe, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  Medal,
  Star,
  RotateCcw
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Language, Lesson, UserProgress } from "../types";
import { LANGUAGES, LESSONS, WORDS } from "../data";

interface HomeScreenProps {
  key?: string;
  progress: UserProgress;
  activeLanguageId: number;
  onSelectLanguage: (id: number) => void;
  onStartLesson: (lesson: Lesson, startMode?: "study" | "quiz") => void;
  onOpenDictionary: () => void;
  onOpenGuide?: () => void;
  onOpenStories?: () => void;
}

export default function HomeScreen({
  progress,
  activeLanguageId,
  onSelectLanguage,
  onStartLesson,
  onOpenDictionary,
  onOpenGuide,
  onOpenStories
}: HomeScreenProps) {
  const activeLanguage = LANGUAGES.find(l => l.languageId === activeLanguageId) || LANGUAGES[0];
  const langLessons = LESSONS.filter(l => l.languageId === activeLanguageId);

  // Calculate statistics
  const completedCount = langLessons.filter(l => progress.completedLessons.includes(l.lessonId)).length;
  const progressPercent = langLessons.length > 0 
    ? Math.round((completedCount / langLessons.length) * 100) 
    : 0;

  // Next lesson algorithm
  const nextLesson = langLessons.find(l => !progress.completedLessons.includes(l.lessonId)) || langLessons[0];

  // Chart Data
  const chartData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const record = progress.xpHistory?.find(h => h.date === dateStr);
      return { name: dayName, xp: record ? record.xp : 0 };
    });
  }, [progress.xpHistory]);

  // Filter mistakes for active language
  const activeMistakes = useMemo(() => {
    if (!progress.mistakes) return [];
    return progress.mistakes.filter(wordId => WORDS.find(w => w.wordId === wordId)?.languageId === activeLanguageId);
  }, [progress.mistakes, activeLanguageId]);

  const handleStartReview = () => {
    if (activeMistakes.length === 0) return;
    
    // Create a virtual lesson for review
    const reviewLesson: Lesson = {
      lessonId: -1,
      languageId: activeLanguageId,
      title: "Mistakes Review",
      nativeTitle: "Pagsusuri",
      wordRefs: activeMistakes,
      xpReward: 10 * activeMistakes.length,
      lessonNumber: 0
    };
    
    onStartLesson(reviewLesson, "quiz");
  };

  // Available Badges definition
  const AVAILABLE_BADGES = [
    { id: "Early Bird", description: "Start a lesson early", icon: <Sparkles className="w-5 h-5" /> },
    { id: "Language Master", description: "Earn over 500 total XP", icon: <Award className="w-5 h-5" /> },
    { id: "10 Day Streak", description: "Maintain a 10 day learning streak", icon: <Flame className="w-5 h-5" /> },
    { id: "Scholar", description: "Complete at least 5 lessons", icon: <BookOpen className="w-5 h-5" /> }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
      id="home-container"
    >
      {/* Upper Status Bar - Gamification stats */}
      <div className="grid grid-cols-3 gap-4" id="stats-grid">
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between"
          id="stat-xp"
        >
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <Award className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Total XP</span>
          </div>
          <span className="text-3xl font-display text-neutral-900 mt-3">{progress.totalXp}</span>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between"
          id="stat-streak"
        >
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <Flame className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Current Streak</span>
          </div>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-display text-neutral-900">{progress.currentStreak}</span>
            <span className="text-xs text-neutral-400 font-mono">days</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col justify-between"
          id="stat-active-lang"
        >
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <Globe className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Active Language</span>
          </div>
          <span className="text-lg font-display font-medium text-neutral-900 mt-3 truncate">
            {activeLanguage.icon} {activeLanguage.nativeName}
          </span>
        </motion.div>
      </div>

      {/* Chart and Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* XP Chart */}
        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-neutral-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-neutral-500" />
            XP Over 7 Days
          </h3>
          <div className="h-44 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#737373' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#737373' }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', color: '#171717', borderRadius: '6px', fontSize: '12px' }}
                  labelStyle={{ fontWeight: '600', color: '#171717', marginBottom: '4px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="#171717" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#171717', strokeWidth: 0 }} 
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <Medal className="w-4 h-4 text-neutral-500" />
            Achievements
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-44 scrollbar-thin scrollbar-thumb-neutral-200">
            {AVAILABLE_BADGES.map((badge) => {
              const isEarned = progress.achievements?.includes(badge.id);
              return (
                <div 
                  key={badge.id}
                  className={`flex items-center gap-3 p-3 rounded-md border transition-all ${
                    isEarned ? "bg-neutral-50 border-neutral-200" : "bg-neutral-50 border-neutral-100 opacity-50 grayscale"
                  }`}
                >
                  <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-md ${
                    isEarned ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
                  }`}>
                    {badge.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-semibold ${isEarned ? "text-neutral-900" : "text-neutral-500"}`}>
                        {badge.id}
                      </h4>
                      {isEarned && <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />}
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-0.5 truncate">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero card showing next study suggestion */}
      <div className="bg-neutral-900 text-white rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md relative overflow-hidden" id="continue-hero">
        {/* Subtle decorative logo watermark */}
        <div className="absolute -right-6 -bottom-6 w-44 h-44 opacity-15 pointer-events-none rounded-3xl overflow-hidden select-none">
          <img src="/icon.svg" alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-neutral-200 rounded text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10">
            <Sparkles className="w-3 h-3" /> Recommended Module
          </span>
          <h2 className="text-xl md:text-2xl font-bold leading-tight font-display tracking-tight text-white">
            Ready to learn {activeLanguage.name}?
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-lg leading-relaxed">
            Continue your curriculum in {activeLanguage.region}. Maintain momentum and earn up to +{nextLesson ? nextLesson.xpReward : 50} XP upon completion.
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => nextLesson && onStartLesson(nextLesson)}
          className="self-start md:self-auto bg-white text-neutral-900 font-semibold px-6 py-3 rounded-md shadow-sm text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2 border border-neutral-200"
          id="continue-learning-btn"
        >
          <Play className="w-4 h-4 fill-neutral-900" />
          Commence Lesson
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {activeMistakes.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-red-900 font-display">Review Mistakes ({activeMistakes.length})</h3>
            <p className="text-sm text-red-700 mt-1 max-w-lg">
              You have {activeMistakes.length} word{activeMistakes.length > 1 ? 's' : ''} to review in {activeLanguage.name}. Practice them in a flashcard quiz to strengthen your memory!
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleStartReview}
            className="self-start md:self-auto bg-red-600 text-white font-semibold px-6 py-3 rounded-md shadow-sm text-sm hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Review Now
          </motion.button>
        </div>
      )}

      {/* Language Picker Cards */}
      <div id="language-section">
        <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Select Target Language</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="lang-selector">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.languageId === activeLanguageId;
            return (
              <motion.button
                key={lang.languageId}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectLanguage(lang.languageId)}
                className={`flex items-start gap-4 p-5 rounded-lg border text-left transition-all ${
                  isSelected 
                    ? "bg-white border-neutral-900 ring-1 ring-neutral-900 shadow-md" 
                    : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm text-neutral-500"
                }`}
                id={`lang-card-${lang.languageId}`}
              >
                <span className="text-2xl">{lang.icon}</span>
                <div className="min-w-0 flex-1 mt-0.5">
                  <h4 className={`font-bold text-sm font-display ${isSelected ? "text-neutral-900" : "text-neutral-700"}`}>{lang.name}</h4>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{lang.nativeName}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Featured DepEd Botolan Sambal Orthography & Stories Showcase */}
      {activeLanguageId === 1 && (
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-lg p-5 shadow-sm space-y-4" id="sambal-guide-feature">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-700 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                Official DepEd Zambales & SIL 2017 Framework
              </span>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                Manulat Tamoy Na: Panlekan Panulat nin Sambal Botolan
              </h3>
            </div>
            <span className="text-[10px] text-neutral-300 font-mono bg-neutral-800 border border-neutral-700 px-2 py-1 rounded self-start sm:self-auto">
              Mother Tongue-Based MLE
            </span>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">
            Explore the official 20-letter alphabet, glottal stop hyphenation, nominal markers (<code className="text-amber-300 font-mono">ya, na, ha, hi, ni, koni</code>), plural markers (<code className="text-amber-300 font-mono">aw-</code> &amp; reduplication), and authentic Zambales indigenous narratives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="flex items-center justify-between p-3.5 rounded bg-white text-neutral-900 hover:bg-neutral-100 transition-all font-semibold text-xs shadow-2xs group"
                id="home-open-guide-btn"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-neutral-900" />
                  <div className="text-left">
                    <div className="font-bold">Spelling &amp; Grammar Rules</div>
                    <div className="text-[10px] text-neutral-500 font-normal">Glottal stops, markers &amp; paradigms</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            {onOpenStories && (
              <button
                onClick={onOpenStories}
                className="flex items-center justify-between p-3.5 rounded bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700/80 transition-all font-semibold text-xs shadow-2xs group"
                id="home-open-stories-btn"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <div className="text-left">
                    <div className="font-bold">Zambales Cultural Stories</div>
                    <div className="text-[10px] text-neutral-300 font-normal">6 authentic texts with bilingual audio</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lesson List Dashboard */}
      <div className="space-y-4" id="lesson-section">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 font-display uppercase tracking-wider">Curriculum Path</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold font-mono text-neutral-500 tracking-widest uppercase">{completedCount}/{langLessons.length} Modules</span>
            <div className="w-24 h-1 bg-neutral-200 overflow-hidden rounded-full">
              <div 
                className="h-full bg-neutral-900 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="lessons-grid">
          {langLessons.map((lesson, idx) => {
            const isCompleted = progress.completedLessons.includes(lesson.lessonId);
            const isUnlocked = idx === 0 || progress.completedLessons.includes(langLessons[idx - 1]?.lessonId);

            return (
              <motion.div
                key={lesson.lessonId}
                whileHover={isUnlocked ? { y: -2 } : {}}
                className={`p-5 rounded-lg border transition-all ${
                  isCompleted 
                    ? "bg-white border-neutral-200 shadow-sm" 
                    : isUnlocked 
                      ? "bg-white border-neutral-200 shadow-sm hover:border-neutral-400" 
                      : "bg-neutral-50 border-neutral-100 opacity-70"
                }`}
                id={`lesson-card-${lesson.lessonId}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center font-mono font-bold text-xs border ${
                      isCompleted 
                        ? "bg-neutral-900 text-white border-neutral-900" 
                        : isUnlocked 
                          ? "bg-neutral-100 text-neutral-900 border-neutral-200" 
                          : "bg-neutral-100 text-neutral-400 border-neutral-200"
                    }`}>
                      {String(lesson.lessonNumber).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold font-display tracking-tight ${isUnlocked ? "text-neutral-900" : "text-neutral-400"}`}>
                        {lesson.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-1 italic font-display">
                        {lesson.nativeTitle}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {lesson.wordRefs.length} Units
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 flex items-center gap-1">
                          <Award className="w-3 h-3" /> {lesson.xpReward} XP
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {isCompleted ? (
                      <span className="text-neutral-500 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    ) : isUnlocked ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onStartLesson(lesson)}
                        className="bg-neutral-900 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded shadow-sm hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                        id={`start-lesson-${lesson.lessonId}`}
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Initiate
                      </motion.button>
                    ) : (
                      <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dictionary Quick Navigation */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8" id="dictionary-banner">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 font-display tracking-wide">
            <Compass className="w-4 h-4 text-neutral-500" />
            Lexicon Access
          </h4>
          <p className="text-[11px] text-neutral-500 mt-1 max-w-sm leading-relaxed">Query the offline repository of regional dialects and vocabulary mappings.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onOpenDictionary}
          className="bg-neutral-100 text-neutral-900 border border-neutral-200 font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded shadow-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shrink-0"
          id="learn-dictionary-btn"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Open Lexicon
        </motion.button>
      </div>
    </motion.div>
  );
}
