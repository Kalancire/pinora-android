import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Check, Lock, Play, RotateCcw } from "lucide-react";
import { Lesson, UserProgress } from "../types";
import { LANGUAGES, LESSONS, WORDS } from "../data";
import PageHeader from "./ui/PageHeader";
import LangIcon from "./ui/LangIcon";
import { playSfx } from "../utils/sfx";

interface LearnScreenProps {
  key?: string;
  progress: UserProgress;
  activeLanguageId: number;
  onSelectLanguage: (id: number) => void;
  onStartLesson: (lesson: Lesson, mode?: "study" | "quiz") => void;
}

const list = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const row = { hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } } };

export default function LearnScreen({ progress, activeLanguageId, onSelectLanguage, onStartLesson }: LearnScreenProps) {
  const lessons = LESSONS.filter((l) => l.languageId === activeLanguageId);
  const done = lessons.filter((l) => progress.completedLessons.includes(l.lessonId)).length;
  const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;

  const mistakes = useMemo(
    () => (progress.mistakes || []).filter((id) => WORDS.find((w) => w.wordId === id)?.languageId === activeLanguageId),
    [progress.mistakes, activeLanguageId]
  );

  const startReview = () => {
    if (!mistakes.length) return;
    playSfx("tap");
    onStartLesson(
      {
        lessonId: -1,
        languageId: activeLanguageId,
        title: "Review mistakes",
        nativeTitle: "Pagsusuri",
        wordRefs: mistakes,
        xpReward: 10 * mistakes.length,
        lessonNumber: 0,
      },
      "quiz"
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5" id="learn-container">
      <PageHeader title="Learn" subtitle="Pick a language and follow the path." />

      {/* Language selector */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-neutral-100 rounded-2xl">
        {LANGUAGES.map((lang) => {
          const on = lang.languageId === activeLanguageId;
          return (
            <button
              key={lang.languageId}
              onClick={() => {
                playSfx("tap");
                onSelectLanguage(lang.languageId);
              }}
              className="relative py-3 rounded-xl flex flex-col items-center gap-1 outline-none"
            >
              {on && <motion.span layoutId="lang-pill" className="absolute inset-0 bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
              <span className={`relative ${on ? "text-neutral-900" : "text-neutral-400"}`}>
                <LangIcon name={lang.icon} className="w-5 h-5" />
              </span>
              <span className={`relative text-xs font-medium ${on ? "text-neutral-900" : "text-neutral-500"}`}>{lang.name}</span>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
          <motion.div className="h-full bg-orange-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
        </div>
        <span className="text-xs text-neutral-500 tabular-nums">
          {done}/{lessons.length}
        </span>
      </div>

      {/* Review mistakes */}
      {mistakes.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={startReview}
          className="w-full flex items-center justify-between gap-3 bg-white border border-neutral-200/70 rounded-2xl p-4 text-left"
        >
          <span className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-neutral-700" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-neutral-900">Review mistakes</span>
              <span className="block text-xs text-neutral-500">{mistakes.length} {mistakes.length === 1 ? "word" : "words"} to practice</span>
            </span>
          </span>
          <Play className="w-4 h-4 text-neutral-400" />
        </motion.button>
      )}

      {/* Lesson path */}
      <motion.ol key={activeLanguageId} variants={list} initial="hidden" animate="show" className="space-y-2.5">
        {lessons.map((lesson, i) => {
          const completed = progress.completedLessons.includes(lesson.lessonId);
          const unlocked = i === 0 || progress.completedLessons.includes(lessons[i - 1].lessonId);
          const Icon = completed ? Check : unlocked ? Play : Lock;
          return (
            <motion.li key={lesson.lessonId} variants={row}>
              <motion.button
                whileTap={unlocked ? { scale: 0.985 } : {}}
                disabled={!unlocked}
                onClick={() => {
                  playSfx("tap");
                  onStartLesson(lesson);
                }}
                className={`w-full flex items-center gap-4 text-left rounded-2xl border p-4 transition-colors ${
                  unlocked ? "bg-white border-neutral-200/70" : "bg-neutral-50 border-transparent"
                }`}
              >
                <span
                  className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${
                    completed ? "bg-orange-500 text-white" : unlocked ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-400"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${!completed && unlocked ? "fill-white ml-0.5" : ""}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-semibold truncate ${unlocked ? "text-neutral-900" : "text-neutral-400"}`}>{lesson.title}</span>
                  <span className="block text-xs text-neutral-400 truncate">
                    {lesson.nativeTitle} · {lesson.wordRefs.length} words
                  </span>
                </span>
                <span className="text-xs text-neutral-400 tabular-nums shrink-0">+{lesson.xpReward}</span>
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ol>
    </motion.div>
  );
}
