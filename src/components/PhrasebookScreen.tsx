import React, { useState } from "react";
import { motion } from "motion/react";
import { Share2, Mic, Hand, Route, UtensilsCrossed, Home as HomeIcon, Sun, Leaf } from "lucide-react";
import { SITUATIONS, phrasesFor } from "../data/phrasebook";
import { useT } from "../lib/i18n";
import { shareCard } from "../lib/share";
import { UserProgress } from "../types";
import OverlayHeader from "./ui/OverlayHeader";
import SpeakBtn from "./ui/SpeakBtn";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = { hand: Hand, route: Route, food: UtensilsCrossed, home: HomeIcon, sun: Sun, leaf: Leaf };

interface Props {
  key?: string;
  progress: UserProgress;
  onPractice: (sentenceId: string) => void;
  onBack: () => void;
}

export default function PhrasebookScreen({ progress, onPractice, onBack }: Props) {
  const t = useT();
  const fil = progress.uiLang === "fil";
  const [sid, setSid] = useState(SITUATIONS[0].id);
  const sit = SITUATIONS.find((s) => s.id === sid)!;
  const phrases = phrasesFor(sit);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
      <OverlayHeader title={t("pb.title")} subtitle={t("pb.sub")} onBack={onBack} />
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {SITUATIONS.map((s) => {
          const I = ICONS[s.icon] || Hand;
          const on = s.id === sid;
          return (
            <button key={s.id} onClick={() => setSid(s.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${on ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"}`}>
              <I className="w-4 h-4" /> {fil ? s.titleFil : s.title}
            </button>
          );
        })}
      </div>
      <div className="space-y-3">
        {phrases.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-neutral-200/70 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-lg font-semibold text-neutral-900 leading-snug">{p.sambal}</p>
                <p className="text-sm text-neutral-600 mt-1">{p.english}</p>
                {p.filipino && <p className="text-xs text-neutral-400 mt-0.5">{p.filipino}</p>}
              </div>
              <SpeakBtn text={p.sambal} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-neutral-400">{p.source}</span>
              <div className="flex gap-2">
                <button onClick={() => onPractice(p.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-100 text-xs font-medium text-neutral-700">
                  <Mic className="w-3.5 h-3.5" /> {t("learn.speak")}
                </button>
                <button
                  onClick={() => shareCard({ eyebrow: "Botolan Sambal", title: p.sambal, subtitle: p.english }, `${p.sambal} = ${p.english}`)}
                  className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center" aria-label={t("common.share")}>
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
