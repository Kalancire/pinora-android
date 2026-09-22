import React from "react";
import { motion } from "motion/react";
import { Heart, Share2, Sparkles } from "lucide-react";
import { UserProgress } from "../../types";
import { WORDS } from "../../data";
import { useT } from "../../lib/i18n";
import { toggleFavorite } from "../../lib/progress";
import { shareCard } from "../../lib/share";
import SpeakBtn from "./SpeakBtn";

/** One Sambal word per day, rotating through words that carry a cultural or usage note. */
export function wordOfTheDay() {
  const pool = WORDS.filter((w) => w.languageId === 1 && (w.category === "Culture" || w.note));
  const day = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
  return pool[day % pool.length];
}

export default function WordOfDay({ progress, update }: { progress: UserProgress; update: (fn: (p: UserProgress) => UserProgress) => void }) {
  const t = useT();
  const w = wordOfTheDay();
  const fav = (progress.favorites || []).includes(w.wordId);
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/70 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-orange-500" />
        <p className="text-sm font-semibold text-neutral-900">{t("home.wotd")}</p>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-2xl font-semibold tracking-tight text-neutral-900 break-words">{w.word}</p>
          <p className="text-sm text-neutral-600 mt-0.5">{w.meaning}</p>
          {w.note && <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{w.note}</p>}
        </div>
        <SpeakBtn text={w.word} wordId={w.wordId} />
      </div>
      <div className="flex gap-2 mt-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => update((p) => toggleFavorite(p, w.wordId))}
          className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 ${fav ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-700"}`}>
          <Heart className={`w-3.5 h-3.5 ${fav ? "fill-white" : ""}`} /> {fav ? "Saved" : "Save"}
        </motion.button>
        <button onClick={() => shareCard({ eyebrow: t("home.wotd"), title: w.word, subtitle: w.meaning, detail: w.note }, `${w.word}: ${w.meaning}`)}
          className="px-4 py-2 rounded-full bg-neutral-100 text-xs font-medium text-neutral-700 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5" /> {t("home.share")}
        </button>
      </div>
    </div>
  );
}
