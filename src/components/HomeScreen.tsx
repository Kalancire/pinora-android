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
  Medal,
  Share2,
} from "lucide-react";
import { Lesson, UserProgress } from "../types";
import { LANGUAGES, LESSONS } from "../data";
import { displayStreak, levelInfo, todayXp, wordsLearnedSet } from "../lib/progress";
import { BADGES } from "../lib/badges";
import BadgeIcon from "./ui/BadgeIcon";
import WordOfDay from "./ui/WordOfDay";
import WeeklySummary from "./ui/WeeklySummary";
import { useT } from "../lib/i18n";
import { shareCard } from "../lib/share";
import Heatmap from "./ui/Heatmap";
import CountUp from "./ui/CountUp";
import { playSfx } from "../utils/sfx";

interface HomeScreenProps {
  key?: string;
  progress: UserProgress;
  activeLanguageId: number;
  onStartLesson: (lesson: Lesson) => void;
  onOpenSettings: () => void;
  update: (fn: (p: UserProgress) => UserProgress) => void;
}

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

export default function HomeScreen({ progress, activeLanguageId, onStartLesson, onOpenSettings, update }: HomeScreenProps) {
  const t = useT();
  const lang = LANGUAGES.find((l) => l.languageId === activeLanguageId) || LANGUAGES[0];
  const langLessons = LESSONS.filter((l) => l.languageId === activeLanguageId);
  const rec = langLessons.find((l) => l.lessonId === progress.recommendedLesson?.[activeLanguageId]);
  const next = (rec && !progress.completedLessons.includes(rec.lessonId) ? rec : undefined) || langLessons.find((l) => !progress.completedLessons.includes(l.lessonId)) || langLessons[0];

  const { level, into, next: levelSize, pct } = levelInfo(progress.totalXp);
  const streak = displayStreak(progress);
  const goal = progress.dailyXpGoal || 50;
  const today = todayXp(progress);

  const wordsLearned = useMemo(() => wordsLearnedSet(progress).size, [progress.completedLessons]);

  const isNew = progress.completedLessons.length === 0;
  const earned = BADGES.filter((b) => b.test(progress));

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
          onClick={() => { playSfx("tap"); onOpenSettings(); }}
          className="w-10 h-10 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-600 active:scale-95 transition-transform"
          aria-label={t("set.title")}
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          {/* Level / XP */}
          <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-6">
            <p className="text-xs font-medium text-neutral-500">{t("home.level")} {level}</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <CountUp value={progress.totalXp} className="text-5xl font-semibold tracking-tight text-neutral-900 tabular-nums" />
              <span className="text-sm font-medium text-neutral-400">XP</span>
            </div>
            <div className="h-1.5 rounded-full bg-neutral-100 mt-5 overflow-hidden">
              <motion.div className="h-full rounded-full bg-neutral-900" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease: "easeOut" }} />
            </div>
            <p className="text-xs text-neutral-400 mt-2">{levelSize - into} {t("home.toNext")} {level + 1}</p>
          </motion.div>

          {/* Stat tiles */}
          <motion.div variants={item} className="grid grid-cols-3 gap-3">
            {[
              { label: t("home.streak"), value: streak, unit: streak === 1 ? t("home.day") : t("home.days"), Icon: Flame },
              { label: t("home.words"), value: wordsLearned, unit: t("home.learned"), Icon: BookMarked },
              { label: t("home.lessons"), value: progress.completedLessons.length, unit: t("home.done"), Icon: GraduationCap },
            ].map(({ label, value, unit, Icon }) => (
              <div key={label} className="bg-white rounded-2xl border border-neutral-200/70 p-4">
                <Icon className="w-[18px] h-[18px] text-neutral-400" />
                <p className="text-2xl font-semibold tracking-tight text-neutral-900 mt-3 tabular-nums">{value}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{label} · {unit}</p>
              </div>
            ))}
          </motion.div>

          {/* Daily goal */}
          <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-5 flex items-center gap-5">
            <div className="relative">
              <Ring value={today} goal={goal} />
              <Target className="w-5 h-5 text-neutral-900 absolute inset-0 m-auto" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-neutral-900">{t("home.goal")}</p>
              <p className="text-sm text-neutral-500 mt-0.5">
                <span className="text-neutral-900 font-medium tabular-nums">{today}</span> / {goal} {t("home.goalToday")}
              </p>
              <p className="text-xs text-neutral-400 mt-1">{today >= goal ? t("home.goalMet") : t("home.goalHint")}</p>
            </div>
            {streak > 0 && (
              <button
                onClick={() => shareCard({ eyebrow: "PINORA", title: `${streak} ${streak === 1 ? "day" : "days"}`, subtitle: `${progress.totalXp} XP · Level ${level}`, detail: "Learning Botolan Sambal" }, `I'm on a ${streak}-day Sambal streak on PINORA.`)}
                className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0"
                aria-label={t("home.shareStreak")}
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>

          {/* Continue */}
          {next && (
            <motion.button
              variants={item}
              whileTap={{ scale: 0.98 }}
              onClick={() => { playSfx("tap"); onStartLesson(next); }}
              className="w-full text-left rounded-3xl bg-neutral-900 text-white p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-xs text-white/50">{isNew ? t("home.start") : t("home.continue")} · {lang.name}</p>
                <p className="text-base font-semibold mt-1 truncate">{next.title}</p>
                <p className="text-xs text-white/50 mt-0.5">+{next.xpReward} XP</p>
              </div>
              <span className="shrink-0 w-11 h-11 rounded-full bg-white text-neutral-900 flex items-center justify-center">
                <Play className="w-4 h-4 fill-neutral-900 ml-0.5" />
              </span>
            </motion.button>
          )}
        </div>

        <div className="space-y-4">
          <motion.div variants={item}><WordOfDay progress={progress} update={update} /></motion.div>
          <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-5">
            <Heatmap history={progress.xpHistory || []} />
          </motion.div>
          <motion.div variants={item}><WeeklySummary progress={progress} /></motion.div>

          {/* Badges */}
          <motion.div variants={item} className="bg-white rounded-3xl border border-neutral-200/70 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Medal className="w-4 h-4 text-neutral-400" />
                <p className="text-sm font-semibold text-neutral-900">{t("home.badges")}</p>
              </div>
              <p className="text-xs text-neutral-400 tabular-nums">{earned.length} / {BADGES.length}</p>
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-4">
              {BADGES.map((b) => {
                const on = earned.includes(b);
                return (
                  <div key={b.id} className="flex flex-col items-center text-center gap-1.5" title={b.hint}>
                    <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${on ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-300"}`}>
                      <BadgeIcon name={b.icon} />
                    </span>
                    <span className={`text-[10px] leading-tight ${on ? "text-neutral-900 font-medium" : "text-neutral-400"}`}>{b.id}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
