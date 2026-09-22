import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Shuffle } from "lucide-react";
import { ALL_PHRASES } from "../data/phrasebook";
import { useT } from "../lib/i18n";
import { playBlob } from "../lib/recordings";
import OverlayHeader from "./ui/OverlayHeader";
import SpeakBtn from "./ui/SpeakBtn";
import RecordPanel from "./ui/RecordPanel";

interface Props {
  key?: string;
  startId?: string;
  onBack: () => void;
}

export default function SpeakScreen({ startId, onBack }: Props) {
  const t = useT();
  const start = Math.max(0, ALL_PHRASES.findIndex((p) => p.id === startId));
  const [i, setI] = useState(start);
  const [mine, setMine] = useState<Blob | null>(null);
  const p = ALL_PHRASES[i];
  const go = (d: number) => { setMine(null); setI((x) => (x + d + ALL_PHRASES.length) % ALL_PHRASES.length); };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <OverlayHeader title={t("sp.title")} subtitle={t("sp.sub")} onBack={onBack} />
      <motion.div key={p.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-neutral-200/70 p-7 text-center space-y-3">
        <p className="text-2xl font-semibold tracking-tight text-neutral-900 leading-snug">{p.sambal}</p>
        <p className="text-sm text-neutral-500">{p.english}</p>
        <SpeakBtn text={p.sambal} className="mx-auto mt-2" />
      </motion.div>

      <div className="space-y-3">
        <RecordPanel onResult={setMine} />
        {mine && (
          <button onClick={() => playBlob(mine)} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-neutral-200 text-sm font-medium text-neutral-800">
            <Play className="w-4 h-4" /> {t("sp.you")}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => go(-1)} className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center" aria-label="Previous"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => { setMine(null); setI(Math.floor(Math.random() * ALL_PHRASES.length)); }} className="flex items-center gap-2 text-sm text-neutral-500"><Shuffle className="w-4 h-4" /> {i + 1} / {ALL_PHRASES.length}</button>
        <button onClick={() => go(1)} className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center" aria-label="Next"><ChevronRight className="w-5 h-5" /></button>
      </div>
    </motion.div>
  );
}
