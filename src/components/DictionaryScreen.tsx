import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Compass, Flag } from "lucide-react";
import { UserProgress } from "../types";
import { LANGUAGES, WORDS } from "../data";
import { hasWordClip } from "../lib/recordings";
import { toggleFavorite } from "../lib/progress";
import { useT } from "../lib/i18n";
import { playSfx } from "../utils/sfx";
import PageHeader from "./ui/PageHeader";
import LangIcon from "./ui/LangIcon";
import WordCard from "./ui/WordCard";
import SpeakBtn from "./ui/SpeakBtn";

interface Props {
  key?: string;
  initialLanguageId: number;
  progress: UserProgress;
  update: (fn: (p: UserProgress) => UserProgress) => void;
  onSuggest: (wordId?: number, prefill?: string) => void;
  onBackToHome: () => void;
}

interface ScanEntry { w: string; d: string; p: number }
const PAGE = 60;

export default function DictionaryScreen({ initialLanguageId, progress, update, onSuggest }: Props) {
  const t = useT();
  const [langId, setLangId] = useState(initialLanguageId);
  const [source, setSource] = useState<"app" | "scan">("app");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [limit, setLimit] = useState(PAGE);
  const [, bump] = useState(0);
  const [scan, setScan] = useState<ScanEntry[] | null>(null);

  useEffect(() => {
    const h = () => bump((n) => n + 1);
    window.addEventListener("pinora-clips", h);
    return () => window.removeEventListener("pinora-clips", h);
  }, []);
  useEffect(() => setLimit(PAGE), [q, cat, langId, source]);
  useEffect(() => {
    if (source === "scan" && !scan) import("../data/dict1968.json").then((m: any) => setScan(m.default as ScanEntry[]));
  }, [source]);

  const favs = new Set(progress.favorites || []);
  const words = useMemo(() => WORDS.filter((w) => w.languageId === langId), [langId]);
  const categories = useMemo(() => ["All", "Favorites", ...(langId === 1 ? ["Checked"] : []), ...Array.from(new Set(words.map((w) => w.category)))], [words, langId]);

  const ql = q.trim().toLowerCase();
  const filtered = words.filter((w) => {
    const hit = !ql || [w.word, w.meaning, w.pronunciation, w.variant || "", w.note || ""].some((x) => x.toLowerCase().includes(ql));
    const c = cat === "All" || (cat === "Favorites" ? favs.has(w.wordId) : cat === "Checked" ? !!w.source : w.category === cat);
    return hit && c;
  });

  const scanFiltered = useMemo(() => {
    if (!scan) return [];
    if (!ql) return scan;
    return scan.filter((e) => e.w.toLowerCase().includes(ql) || e.d.toLowerCase().includes(ql));
  }, [scan, ql]);

  const showScan = langId === 1 && source === "scan";

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5" id="dictionary-container">
      <PageHeader title={t("nav.dictionary")} subtitle="Words, meanings and sounds. Works offline." />

      <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-neutral-100 rounded-2xl">
        {LANGUAGES.map((l) => {
          const on = l.languageId === langId;
          return (
            <button key={l.languageId} onClick={() => { playSfx("tap"); setLangId(l.languageId); setCat("All"); if (l.languageId !== 1) setSource("app"); }} className="relative py-2.5 rounded-xl flex flex-col items-center gap-1 outline-none">
              {on && <motion.span layoutId="dict-lang" className="absolute inset-0 bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
              <span className={`relative ${on ? "text-neutral-900" : "text-neutral-400"}`}><LangIcon name={l.icon} className="w-4 h-4" /></span>
              <span className={`relative text-xs font-medium ${on ? "text-neutral-900" : "text-neutral-500"}`}>{l.name}</span>
            </button>
          );
        })}
      </div>

      {langId === 1 && (
        <div className="grid grid-cols-2 gap-2">
          {([["app", t("dict.app")], ["scan", t("dict.scan")]] as const).map(([k, label]) => (
            <button key={k} onClick={() => setSource(k)} className={`py-2.5 rounded-xl text-sm font-medium border ${source === k ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"}`}>{label}</button>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search words or meanings" id="dict-search-input"
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 rounded-2xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10" />
      </div>

      {!showScan && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" id="category-filter-scroll">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-colors ${cat === c ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"}`}>
              {c === "Favorites" ? t("dict.favorites") : c === "All" ? t("dict.all") : c}
            </button>
          ))}
        </div>
      )}

      {showScan ? (
        <div className="space-y-3">
          <p className="text-xs text-amber-800 bg-amber-50 rounded-xl px-4 py-3 leading-relaxed">
            Read by machine from a 1968 typed manuscript of Botolan Sambal. Spellings and meanings may contain scanning errors and older orthography (u is often written o). Use the flag to suggest a correction.
          </p>
          {!scan && <p className="text-sm text-neutral-400 text-center py-8">Loading...</p>}
          {scan && <p className="text-xs text-neutral-400 px-1">{scanFiltered.length.toLocaleString()} entries</p>}
          {scanFiltered.slice(0, limit).map((e, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200/70 p-4 flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-neutral-900 break-words">{e.w}</p>
                <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">{e.d}</p>
                <p className="text-[10px] text-neutral-400 mt-1.5">1968 dictionary, page {e.p}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <SpeakBtn text={e.w} size="sm" />
                <button onClick={() => onSuggest(undefined, e.w)} className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center" aria-label="Suggest a correction"><Flag className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {scan && scanFiltered.length > limit && (
            <button onClick={() => setLimit((l) => l + PAGE)} className="w-full py-3 rounded-2xl bg-white border border-neutral-200 text-sm font-medium text-neutral-700">Show more</button>
          )}
        </div>
      ) : (
        <div className="space-y-3" id="vocab-results-layout">
          <p className="text-xs text-neutral-400 px-1">{filtered.length} words</p>
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="vocab-cards-grid">
                {filtered.slice(0, limit).map((w) => (
                  <WordCard key={w.wordId} word={w} isSambal={w.languageId === 1} favorite={favs.has(w.wordId)} hasClip={hasWordClip(w.wordId)}
                    onFavorite={() => { playSfx("tap"); update((p) => toggleFavorite(p, w.wordId)); }}
                    onSuggest={() => onSuggest(w.wordId)} onRecorded={() => bump((n) => n + 1)} />
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl space-y-3">
                <Compass className="w-8 h-8 text-neutral-400 mx-auto" />
                <p className="text-sm font-semibold text-neutral-900">No matches</p>
                <button onClick={() => { setQ(""); setCat("All"); }} className="px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs font-medium text-neutral-600">Clear filters</button>
              </motion.div>
            )}
          </AnimatePresence>
          {filtered.length > limit && <button onClick={() => setLimit((l) => l + PAGE)} className="w-full py-3 rounded-2xl bg-white border border-neutral-200 text-sm font-medium text-neutral-700">Show more</button>}
        </div>
      )}
    </motion.div>
  );
}
