import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  CloudOff,
  Settings,
  Flame,
  BookMarked,
  GraduationCap,
  Target,
  Play,
  Footprints,
  Award,
  Medal,
} from "lucide-react";
import { Lesson, UserProgress } from "../types";
import { LANGUAGES, LESSONS } from "../data";
import { displayStreak, levelInfo, todayXp } from "../lib/progress";
import Heatmap from "./ui/Heatmap";
import CountUp from "./ui/CountUp";
import { playSfx } from "../utils/sfx";

interface HomeScreenProps {
  key?: string;
  progress: UserProgress;
  activeLanguageId: number;
  onStartLesson: (lesson: Lesson) => void;
  onOpenSettings: () => void;
}

const BADGES = [
  { id: "First Step", hint: "Finish your first lesson", Icon: Footprints },
  { id: "Scholar", hint: "Finish 5 lessons", Icon: GraduationCap },
  { id: "10 Day Streak", hint: "Learn 10 days in a row", Icon: Flame },
  { id: "Language Master", hint: "Earn 500 XP", Icon: Award },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } };

function Ring({ value, goal }: { value: number; goal: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / Math.max(goal, 1));
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
      <circle cx="40" cy="40" r={r} className="fill-none stroke-neutral-100" strokeWidth="7" />
      <motion.circle
        cx="40"
        cy="40"
        r={r}
        className="fill-none stroke-orange-500"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - pct) }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function HomeScreen({ progress, activeLanguageId, onStartLesson, onOpenSettings }: HomeScreenProps) {
  const lang = LANGUAGES.find((l) => l.languageId === activeLanguageId) || LANGUAGES[0];
  const langLessons = LESSONS.filter((l) => l.languageId === activeLanguageId);
  const next = langLessons.find((l) => !progress.completedLessons.includes(l.lessonId)) || langLessons[0];

  const { level, into, next: levelSize, pct } = levelInfo(progress.totalXp);
  const streak = displayStreak(progress);
  const goal = progress.dailyXpGoal || 50;
  const today = todayXp(progress);

  const wordsLearned = useMemo(() => {
    const set = new Set<number>();
    LESSONS.filter((l) => progress.completedLessons.includes(l.lessonId)).forEach((l) => l.wordRefs.forEach((w) => set.add(w)));
    return set.size;
  }, [progress.completedLessons]);

  const isNew = progress.completedLessons.length === 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }} className="space-y-4" id="home-container">
      {/* Top row */}
      <motion.div variants={item} className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <img src="./icon.svg" alt="PINORA" className="w-9 h-9 rounded-xl ring-1 ring-black/5" />
          <span className="text-lg font-semibold tracking-tight text-neutral-900">PINORA</span>
          <CloudOff className="w-[18px] h-[18px] text-neutral-400" strokeWidth={2} aria-label="Works offline" />
        </div>
        <button
          onClick={() => {
            playSfx("tap");
            onOpenSettings();
          }}
          className="w-10 h-10 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-600 active:scale-95 transition-transform"
          aria-label="Settings"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
      </motion.div>

      {/* Level / XP */}
      <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-6">
        <p className="text-xs font-medium text-neutral-500">Level {level}</p>
        <div className="flex items-baseline gap-1.5 mt-1">
          <CountUp value={progress.totalXp} className="text-5xl font-semibold tracking-tight text-neutral-900 tabular-nums" />
          <span className="text-sm font-medium text-neutral-400">XP</span>
        </div>
        <div className="h-1.5 rounded-full bg-neutral-100 mt-5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-neutral-900"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-neutral-400 mt-2">
          {levelSize - into} XP to level {level + 1}
        </p>
      </motion.div>

      {/* Stat tiles */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        {[
          { label: "Streak", value: streak, unit: streak === 1 ? "day" : "days", Icon: Flame },
          { label: "Words", value: wordsLearned, unit: "learned", Icon: BookMarked },
          { label: "Lessons", value: progress.completedLessons.length, unit: "done", Icon: GraduationCap },
        ].map(({ label, value, unit, Icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-neutral-200/70 p-4">
            <Icon className="w-[18px] h-[18px] text-neutral-400" />
            <p className="text-2xl font-semibold tracking-tight text-neutral-900 mt-3 tabular-nums">{value}</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              {label} · {unit}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Daily goal */}
      <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-5 flex items-center gap-5">
        <div className="relative">
          <Ring value={today} goal={goal} />
          <Target className="w-5 h-5 text-neutral-900 absolute inset-0 m-auto" />
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Daily goal</p>
          <p className="text-sm text-neutral-500 mt-0.5">
            <span className="text-neutral-900 font-medium tabular-nums">{today}</span> / {goal} XP today
          </p>
          <p className="text-xs text-neutral-400 mt-1">{today >= goal ? "Goal reached. Nice work." : "Finish a lesson to fill the ring."}</p>
        </div>
      </motion.div>

      {/* Heatmap */}
      <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-5">
        <Heatmap history={progress.xpHistory || []} />
      </motion.div>

      {/* Continue */}
      {next && (
        <motion.button
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            playSfx("tap");
            onStartLesson(next);
          }}
          className="w-full text-left rounded-3xl bg-neutral-900 text-white p-5 flex items-center justify-between gap-4"
        >
          <div className="min-w-0">
            <p className="text-xs text-white/50">{isNew ? "Start learning" : "Continue"} · {lang.name}</p>
            <p className="text-base font-semibold mt-1 truncate">{next.title}</p>
            <p className="text-xs text-white/50 mt-0.5">+{next.xpReward} XP</p>
          </div>
          <span className="shrink-0 w-11 h-11 rounded-full bg-white text-neutral-900 flex items-center justify-center">
            <Play className="w-4 h-4 fill-neutral-900 ml-0.5" />
          </span>
        </motion.button>
      )}

      {/* Badges */}
      <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Medal className="w-4 h-4 text-neutral-400" />
          <p className="text-sm font-semibold text-neutral-900">Badges</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {BADGES.map(({ id, hint, Icon }) => {
            const earned = progress.achievements?.includes(id);
            return (
              <div key={id} className="flex flex-col items-center text-center gap-1.5" title={hint}>
                <span
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    earned ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span className={`text-[10px] leading-tight ${earned ? "text-neutral-900 font-medium" : "text-neutral-400"}`}>{id}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
