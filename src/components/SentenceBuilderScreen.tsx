import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Eye, PartyPopper } from "lucide-react";
import { UserProgress } from "../types";
import { SENTENCES } from "../data/sentences";
import { useT } from "../lib/i18n";
import { playSfx } from "../utils/sfx";
import OverlayHeader from "./ui/OverlayHeader";
import SpeakBtn from "./ui/SpeakBtn";

interface Props {
  key?: string;
  update: (fn: (p: UserProgress) => UserProgress) => void;
  addXp: (xp: number) => void;
  onBack: () => void;
}

const shuffle = <T,>(a: T[]) => [...a].sort(() => 0.5 - Math.random());

export default function SentenceBuilderScreen({ update, addXp, onBack }: Props) {
  const t = useT();
  const items = useMemo(() => shuffle(SENTENCES.filter((s) => s.sambal.split(" ").length >= 3 && s.sambal.split(" ").length <= 9)).slice(0, 8), []);
  const [n, setN] = useState(0);
  const [done, setDone] = useState(0);
  const cur = items[n];
  const tokens = useMemo(() => (cur ? shuffle(cur.sambal.split(" ").map((w, i) => ({ id: i, w }))) : []), [n]);
  const [picked, setPicked] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [misses, setMisses] = useState(0);
  const finished = n >= items.length;

  const answer = picked.map((id) => tokens.find((x) => x.id === id)!.w).join(" ");

  const check = () => {
    if (answer === cur.sambal) {
      playSfx("correct");
      setStatus("ok");
      setDone((d) => d + 1);
      update((p) => ({ ...p, sentencesBuilt: (p.sentencesBuilt || 0) + 1 }));
    } else {
      playSfx("wrong");
      setStatus("bad");
      setMisses((m) => m + 1);
      setTimeout(() => setStatus("idle"), 600);
    }
  };

  const next = () => {
    setPicked([]);
    setStatus("idle");
    setMisses(0);
    setN((x) => x + 1);
  };

  const reveal = () => {
    const used = new Set<number>();
    const ids = cur.sambal.split(" ").map((w) => {
      const tk = tokens.find((x) => x.w === w && !used.has(x.id))!;
      used.add(tk.id);
      return tk.id;
    });
    setPicked(ids);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      <OverlayHeader title={t("sb.title")} subtitle={t("sb.sub")} onBack={onBack} />
      {!finished && cur && (
        <>
          <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <motion.div className="h-full bg-orange-500" animate={{ width: `${(n / items.length) * 100}%` }} />
          </div>
          <div className="bg-white rounded-3xl border border-neutral-200/70 p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-medium text-neutral-900 leading-snug">{cur.english}</p>
              {status === "ok" && <SpeakBtn text={cur.sambal} />}
            </div>
            <motion.div animate={status === "bad" ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}
              className={`min-h-[76px] rounded-2xl border-2 border-dashed p-3 flex flex-wrap gap-2 ${status === "ok" ? "border-emerald-400 bg-emerald-50" : status === "bad" ? "border-red-400 bg-red-50" : "border-neutral-200"}`}>
              <AnimatePresence>
                {picked.map((id) => (
                  <motion.button key={id} layout initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                    onClick={() => status !== "ok" && setPicked((p) => p.filter((x) => x !== id))}
                    className="px-3 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium">
                    {tokens.find((x) => x.id === id)!.w}
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              {tokens.filter((x) => !picked.includes(x.id)).map((x) => (
                <motion.button key={x.id} layout whileTap={{ scale: 0.92 }}
                  onClick={() => { playSfx("tap"); status !== "ok" && setPicked((p) => [...p, x.id]); }}
                  className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-sm font-medium text-neutral-800">
                  {x.w}
                </motion.button>
              ))}
            </div>
            {status === "bad" && <p className="text-sm text-red-600">{t("sb.wrong")}</p>}
            {status === "ok" && <p className="text-sm text-emerald-700 flex items-center gap-1.5"><Check className="w-4 h-4" /> {t("sb.correct")}</p>}
          </div>
          <div className="flex gap-3">
            {status !== "ok" && misses >= 2 && (
              <button onClick={reveal} className="px-4 py-3.5 rounded-2xl bg-white border border-neutral-200 text-neutral-700 flex items-center gap-2 text-sm font-medium">
                <Eye className="w-4 h-4" />
              </button>
            )}
            {status === "ok" ? (
              <button onClick={next} className="flex-1 py-3.5 rounded-2xl bg-neutral-900 text-white font-semibold">{t("common.next")}</button>
            ) : (
              <button onClick={check} disabled={picked.length === 0} className="flex-1 py-3.5 rounded-2xl bg-neutral-900 text-white font-semibold disabled:opacity-30">{t("common.check")}</button>
            )}
          </div>
        </>
      )}
      {finished && (
        <div className="bg-white rounded-3xl border border-neutral-200/70 p-8 text-center space-y-4">
          <PartyPopper className="w-8 h-8 mx-auto text-orange-500" />
          <p className="text-lg font-semibold">{done} / {items.length}</p>
          <button onClick={() => { addXp(done * 5); onBack(); }} className="w-full py-3.5 rounded-2xl bg-neutral-900 text-white font-semibold">
            {t("common.done")} · +{done * 5} XP
          </button>
        </div>
      )}
    </motion.div>
  );
}
