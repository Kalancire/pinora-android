import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X, PartyPopper } from "lucide-react";
import { UserProgress } from "../types";
import { WORDS } from "../data";
import { dueWordIds, gradeCard } from "../lib/progress";
import { useT } from "../lib/i18n";
import { playSfx } from "../utils/sfx";
import OverlayHeader from "./ui/OverlayHeader";
import SpeakBtn from "./ui/SpeakBtn";

interface Props {
  key?: string;
  progress: UserProgress;
  update: (fn: (p: UserProgress) => UserProgress) => void;
  addXp: (xp: number) => void;
  onBack: () => void;
}

export default function ReviewScreen({ progress, update, addXp, onBack }: Props) {
  const t = useT();
  const queue = useMemo(() => {
    const ids = dueWordIds(progress).sort(() => 0.5 - Math.random()).slice(0, 20);
    return ids.map((id) => WORDS.find((w) => w.wordId === id)!).filter(Boolean);
  }, []);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [knew, setKnew] = useState(0);
  const finished = i >= queue.length;
  const word = queue[i];

  const grade = (ok: boolean) => {
    playSfx(ok ? "correct" : "wrong");
    update((p) => gradeCard(p, word.wordId, ok));
    if (ok) setKnew((k) => k + 1);
    setShown(false);
    setI((n) => n + 1);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <OverlayHeader title={t("review.title")} onBack={onBack} subtitle={queue.length ? `${Math.min(i + 1, queue.length)} / ${queue.length}` : undefined} />

      {queue.length === 0 && (
        <div className="bg-white rounded-3xl border border-neutral-200/70 p-8 text-center">
          <p className="text-base font-semibold text-neutral-900">{t("review.empty")}</p>
          <p className="text-sm text-neutral-500 mt-2">{t("review.emptySub")}</p>
        </div>
      )}

      {queue.length > 0 && !finished && (
        <>
          <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <motion.div className="h-full bg-orange-500" animate={{ width: `${(i / queue.length) * 100}%` }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.button
              key={word.wordId}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              onClick={() => { playSfx("tap"); setShown(true); }}
              className="w-full min-h-[300px] bg-white rounded-3xl border border-neutral-200/70 p-8 flex flex-col items-center justify-center text-center gap-3"
            >
              <span className="text-4xl font-semibold tracking-tight text-neutral-900 break-words">{word.word}</span>
              <span className="text-sm text-neutral-400 font-mono">/{word.pronunciation}/</span>
              <SpeakBtn text={word.word} wordId={word.wordId} className="mt-1" />
              {shown ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <p className="text-xl font-medium text-neutral-800">{word.meaning}</p>
                  {word.note && <p className="text-xs text-neutral-500 mt-2 leading-relaxed max-w-xs">{word.note}</p>}
                </motion.div>
              ) : (
                <span className="text-xs text-neutral-400 mt-4">{t("common.reveal")}</span>
              )}
            </motion.button>
          </AnimatePresence>
          {shown && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-3">
              <button onClick={() => grade(false)} className="py-4 rounded-2xl bg-white border border-neutral-200 text-neutral-800 font-semibold flex items-center justify-center gap-2 active:scale-[0.98]">
                <X className="w-4 h-4" /> {t("common.again")}
              </button>
              <button onClick={() => grade(true)} className="py-4 rounded-2xl bg-neutral-900 text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98]">
                <Check className="w-4 h-4" /> {t("common.good")}
              </button>
            </motion.div>
          )}
        </>
      )}

      {queue.length > 0 && finished && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl border border-neutral-200/70 p-8 text-center space-y-4">
          <PartyPopper className="w-8 h-8 mx-auto text-orange-500" />
          <p className="text-lg font-semibold text-neutral-900">{t("review.finish")}</p>
          <p className="text-sm text-neutral-500">{knew} / {queue.length}</p>
          <button
            onClick={() => { addXp(knew * 2); onBack(); }}
            className="w-full py-3.5 rounded-2xl bg-neutral-900 text-white font-semibold"
          >
            {t("common.done")} · +{knew * 2} XP
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
