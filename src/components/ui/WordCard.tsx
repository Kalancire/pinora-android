import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Mic, Share2, Flag, BadgeCheck, Trash2 } from "lucide-react";
import { Word } from "../../types";
import { getWordClip, deleteClip, saveClip } from "../../lib/recordings";
import { shareCard } from "../../lib/share";
import SpeakBtn from "./SpeakBtn";
import RecordPanel from "./RecordPanel";

interface Props {
  key?: string;
  word: Word;
  favorite: boolean;
  hasClip: boolean;
  isSambal: boolean;
  onFavorite: () => void;
  onSuggest: () => void;
  onRecorded: () => void;
}

export default function WordCard({ word, favorite, hasClip, isSambal, onFavorite, onSuggest, onRecorded }: Props) {
  const [rec, setRec] = useState(false);
  const iconBtn = "w-9 h-9 rounded-full flex items-center justify-center transition-colors";
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="bg-white rounded-2xl border border-neutral-200/70 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">{word.category}</span>
            {word.source ? (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1"><BadgeCheck className="w-3 h-3" /> Checked</span>
            ) : isSambal ? (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-50 text-neutral-400">Original list</span>
            ) : null}
            {hasClip && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 flex items-center gap-1"><Mic className="w-3 h-3" /> Speaker</span>}
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 tracking-tight mt-2 break-words">{word.word}</h3>
          <p className="text-sm text-neutral-700 mt-1">{word.meaning}</p>
          <p className="text-[11px] font-mono text-neutral-400 mt-1.5">/{word.pronunciation}/</p>
        </div>
        <SpeakBtn text={word.word} wordId={word.wordId} />
      </div>

      {word.variant && <p className="text-xs text-neutral-600 mt-3"><span className="font-semibold">Also written:</span> {word.variant}</p>}
      {word.note && <p className="text-xs leading-relaxed text-neutral-500 mt-1.5">{word.note}</p>}
      {word.source && <p className="text-[10px] text-neutral-400 mt-1.5">Source: {word.source}</p>}

      <div className="flex items-center gap-1.5 mt-4">
        <motion.button whileTap={{ scale: 0.85 }} onClick={onFavorite} className={`${iconBtn} ${favorite ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-600"}`} aria-label="Favorite">
          <Heart className={`w-4 h-4 ${favorite ? "fill-white" : ""}`} />
        </motion.button>
        {isSambal && (
          <button onClick={() => setRec((r) => !r)} className={`${iconBtn} ${rec ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600"}`} aria-label="Record pronunciation">
            <Mic className="w-4 h-4" />
          </button>
        )}
        <button onClick={() => shareCard({ eyebrow: "Botolan Sambal", title: word.word, subtitle: word.meaning, detail: word.note }, `${word.word}: ${word.meaning}`)} className={`${iconBtn} bg-neutral-100 text-neutral-600`} aria-label="Share">
          <Share2 className="w-4 h-4" />
        </button>
        {isSambal && (
          <button onClick={onSuggest} className={`${iconBtn} bg-neutral-100 text-neutral-600 ml-auto`} aria-label="Suggest a correction">
            <Flag className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {rec && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="pt-3 space-y-2">
              <p className="text-xs text-neutral-500 leading-relaxed">Record a fluent speaker saying this word. It will replace the phone's voice for this word.</p>
              <RecordPanel
                saveLabel="Save pronunciation"
                onSave={async (r) => {
                  await saveClip({ id: `w${word.wordId}-${Date.now()}`, kind: "word", wordId: word.wordId, mime: r.mime, blob: r.blob, durationMs: r.durationMs, createdAt: Date.now() });
                  onRecorded();
                  setRec(false);
                }}
              />
              {hasClip && (
                <button
                  onClick={async () => { const c = getWordClip(word.wordId); if (c) { await deleteClip(c.id); onRecorded(); } }}
                  className="flex items-center gap-2 text-xs text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove recorded pronunciation
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
