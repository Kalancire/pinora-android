import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Trash2, Share2 } from "lucide-react";
import { Suggestion, UserProgress } from "../types";
import { WORDS } from "../data";
import { useT } from "../lib/i18n";
import { shareText } from "../lib/share";
import { playSfx } from "../utils/sfx";
import OverlayHeader from "./ui/OverlayHeader";

interface Props {
  key?: string;
  progress: UserProgress;
  update: (fn: (p: UserProgress) => UserProgress) => void;
  preWordId?: number;
  onBack: () => void;
}

export default function SuggestScreen({ progress, update, preWordId, onBack }: Props) {
  const t = useT();
  const pre = preWordId ? WORDS.find((w) => w.wordId === preWordId) : undefined;
  const [kind, setKind] = useState<"new" | "fix">(pre ? "fix" : "new");
  const [word, setWord] = useState(pre?.word ?? "");
  const [meaning, setMeaning] = useState("");
  const [note, setNote] = useState("");
  const list = progress.suggestions || [];

  const save = () => {
    if (!word.trim()) return;
    playSfx("correct");
    const s: Suggestion = { id: String(Date.now()), kind, word: word.trim(), meaning: meaning.trim(), note: note.trim(), wordId: pre?.wordId, createdAt: Date.now() };
    update((p) => ({ ...p, suggestions: [s, ...(p.suggestions || [])] }));
    setWord(""); setMeaning(""); setNote("");
  };

  const exportAll = () =>
    shareText(
      "PINORA suggestions\n\n" +
        list.map((s) => `${s.kind === "fix" ? "Correction" : "New word"}: ${s.word}\nMeaning: ${s.meaning || "-"}\nNote: ${s.note || "-"}`).join("\n\n")
    );

  const input = "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10";

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
      <OverlayHeader title={t("sug.title")} subtitle={t("sug.sub")} onBack={onBack} />
      <div className="bg-white rounded-3xl border border-neutral-200/70 p-5 space-y-3">
        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl">
          {(["new", "fix"] as const).map((k) => (
            <button key={k} onClick={() => setKind(k)} className={`py-2 rounded-lg text-sm font-medium ${kind === k ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500"}`}>
              {k === "new" ? "New word" : "Correction"}
            </button>
          ))}
        </div>
        <input className={input} placeholder="Sambal word" value={word} onChange={(e) => setWord(e.target.value)} />
        <input className={input} placeholder="Meaning (English or Filipino)" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
        <textarea className={input + " min-h-[90px]"} placeholder="Note: example sentence, who told you, barangay..." value={note} onChange={(e) => setNote(e.target.value)} />
        <button onClick={save} disabled={!word.trim()} className="w-full py-3.5 rounded-2xl bg-neutral-900 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-30">
          <Send className="w-4 h-4" /> {t("common.save")}
        </button>
      </div>

      {list.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900">{list.length}</p>
            <button onClick={exportAll} className="flex items-center gap-2 text-sm font-medium text-neutral-700"><Share2 className="w-4 h-4" /> {t("common.share")}</button>
          </div>
          {list.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-neutral-200/70 p-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">{s.kind === "fix" ? "Correction" : "New word"}</p>
                <p className="text-base font-semibold text-neutral-900">{s.word}</p>
                {s.meaning && <p className="text-sm text-neutral-600">{s.meaning}</p>}
                {s.note && <p className="text-xs text-neutral-400 mt-1">{s.note}</p>}
              </div>
              <button onClick={() => update((p) => ({ ...p, suggestions: (p.suggestions || []).filter((x) => x.id !== s.id) }))} className="text-neutral-400 p-2" aria-label={t("common.delete")}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
