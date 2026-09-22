import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Lesson, UserProgress } from "../types";
import { LESSONS, WORDS, LANGUAGES } from "../data";
import { useT } from "../lib/i18n";
import { playSfx } from "../utils/sfx";
import OverlayHeader from "./ui/OverlayHeader";
import SpeakBtn from "./ui/SpeakBtn";

interface Props {
  key?: string;
  languageId: number;
  update: (fn: (p: UserProgress) => UserProgress) => void;
  onStartLesson: (l: Lesson) => void;
  onBack: () => void;
}

const shuffle = <T,>(a: T[]) => [...a].sort(() => 0.5 - Math.random());

export default function PlacementScreen({ languageId, update, onStartLesson, onBack }: Props) {
  const t = useT();
  const lessons = LESSONS.filter((l) => l.languageId === languageId);
  const lang = LANGUAGES.find((l) => l.languageId === languageId)!;

  const questions = useMemo(() => {
    const qs = Array.from({ length: 10 }, (_, k) => {
      const li = Math.round((k * (lessons.length - 1)) / 9);
      const lesson = lessons[li];
      const w = WORDS.find((x) => x.wordId === shuffle(lesson.wordRefs)[0])!;
      const pool = WORDS.filter((x) => x.languageId === languageId && x.meaning !== w.meaning && x.meaning.length <= 28 && !x.meaning.includes("("));
      const same = shuffle(Array.from(new Set(pool.filter((x) => x.category === w.category).map((x) => x.meaning))));
      const rest = shuffle(Array.from(new Set(pool.filter((x) => x.category !== w.category).map((x) => x.meaning))));
      return { li, w, options: shuffle([w.meaning, ...[...same, ...rest].slice(0, 2)]) };
    });
    return qs;
  }, []);

  const [n, setN] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const finished = n >= questions.length;
  const q = questions[n];

  const answer = (o: string) => {
    if (picked) return;
    const ok = o === q.w.meaning;
    playSfx(ok ? "correct" : "wrong");
    setPicked(o);
    setTimeout(() => {
      setResults((r) => [...r, ok]);
      setPicked(null);
      setN((x) => x + 1);
    }, 700);
  };

  const rec = useMemo(() => {
    if (!finished) return null;
    const firstMiss = results.findIndex((r) => !r);
    const li = firstMiss === -1 ? Math.max(0, lessons.length - 5) : questions[firstMiss].li;
    return lessons[li];
  }, [finished]);

  const score = results.filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <OverlayHeader title={t("pl.title")} subtitle={`${lang.name} · ${t("pl.sub")}`} onBack={onBack} />
      {!finished && (
        <>
          <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <motion.div className="h-full bg-orange-500" animate={{ width: `${(n / questions.length) * 100}%` }} />
          </div>
          <div className="bg-white rounded-3xl border border-neutral-200/70 p-8 text-center space-y-2">
            <p className="text-xs text-neutral-400">{n + 1} / {questions.length}</p>
            <p className="text-3xl font-semibold tracking-tight text-neutral-900 break-words">{q.w.word}</p>
            <SpeakBtn text={q.w.word} wordId={q.w.wordId} className="mx-auto" />
          </div>
          <div className="space-y-2.5">
            {q.options.map((o) => {
              const right = picked && o === q.w.meaning;
              const wrong = picked === o && o !== q.w.meaning;
              return (
                <motion.button key={o} whileTap={{ scale: 0.98 }} onClick={() => answer(o)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border text-sm font-medium flex items-center justify-between ${right ? "border-emerald-400 bg-emerald-50 text-emerald-800" : wrong ? "border-red-400 bg-red-50 text-red-800" : "border-neutral-200 bg-white text-neutral-800"}`}>
                  {o}
                  {right && <Check className="w-4 h-4" />}
                  {wrong && <X className="w-4 h-4" />}
                </motion.button>
              );
            })}
          </div>
        </>
      )}
      {finished && rec && (
        <div className="bg-white rounded-3xl border border-neutral-200/70 p-8 text-center space-y-4">
          <p className="text-5xl font-semibold tracking-tight">{score}<span className="text-xl text-neutral-400"> / {questions.length}</span></p>
          <p className="text-sm text-neutral-500">{t("pl.result")}</p>
          <p className="text-lg font-semibold text-neutral-900">{rec.title}</p>
          <button
            onClick={() => { update((p) => ({ ...p, recommendedLesson: { ...(p.recommendedLesson || {}), [languageId]: rec.lessonId } })); onStartLesson(rec); }}
            className="w-full py-3.5 rounded-2xl bg-neutral-900 text-white font-semibold"
          >
            {t("common.start")}
          </button>
          <button
            onClick={() => { update((p) => ({ ...p, recommendedLesson: { ...(p.recommendedLesson || {}), [languageId]: rec.lessonId } })); onBack(); }}
            className="w-full py-3 rounded-2xl text-neutral-600 text-sm font-medium"
          >
            {t("common.done")}
          </button>
        </div>
      )}
    </motion.div>
  );
}
