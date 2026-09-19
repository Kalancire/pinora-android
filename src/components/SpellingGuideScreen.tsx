import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
  Layers,
  Search,
  ChevronRight,
  Award
} from "lucide-react";
import {
  GUIDE_METADATA,
  ALPHABET_DATA,
  ORTHOGRAPHY_RULES,
  GRAMMAR_SECTIONS,
  GuideRule,
  GrammarSection,
  AlphabetEntry
} from "../data/sambalGuideData";
import { TtsManager } from "../utils/tts";

interface SpellingGuideScreenProps {
  key?: string;
  onBackToHome: () => void;
  onOpenStories?: () => void;
}

type GuideTab = "rules" | "grammar" | "alphabet" | "credits";

export default function SpellingGuideScreen({
  onBackToHome,
  onOpenStories
}: SpellingGuideScreenProps) {
  const [activeTab, setActiveTab] = useState<GuideTab>("rules");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingText, setPlayingText] = useState<string | null>(null);
  const [selectedRuleId, setSelectedRuleId] = useState<string>(ORTHOGRAPHY_RULES[0].id);

  const handlePlayAudio = (text: string) => {
    setPlayingText(text);
    TtsManager.speak(text, undefined, () => {
      setPlayingText(null);
    });
  };

  const filteredRules = ORTHOGRAPHY_RULES.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nativeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.examples.some((e) =>
        e.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const filteredAlphabet = ALPHABET_DATA.filter(
    (a) =>
      a.letter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sampleWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.initial.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
      id="spelling-guide-container"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-3">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors text-[10px] uppercase font-bold tracking-widest self-start"
          id="guide-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              DepEd Region III & SIL 2017
            </span>
          </div>
          <span className="text-sm font-bold text-neutral-900 font-display block mt-1">
            Manulat Tamoy Na (Panlekan Panulat)
          </span>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="bg-neutral-900 text-white rounded-lg p-6 relative overflow-hidden shadow-sm" id="guide-hero-banner">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Sambal Botolan Orthography & Grammar</span>
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white">
            {GUIDE_METADATA.title}: {GUIDE_METADATA.subtitle}
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            Official educational reference developed by the Department of Education Division of Zambales and SIL Philippines for mother tongue-based education in Botolan.
          </p>
          {onOpenStories && (
            <div className="pt-2">
              <button
                onClick={onOpenStories}
                className="inline-flex items-center gap-2 text-xs font-bold bg-white text-neutral-900 px-4 py-2 rounded hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <span>Read Zambales Cultural Stories (Aw-Istorya)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-neutral-100 p-1 rounded flex flex-wrap gap-1 border border-neutral-200" id="guide-tabs">
        <button
          onClick={() => setActiveTab("rules")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeTab === "rules"
              ? "bg-white text-neutral-900 border border-neutral-200 shadow-sm"
              : "text-neutral-500 hover:text-neutral-900 hover:bg-white/60"
          }`}
          id="tab-btn-rules"
        >
          <Bookmark className="w-3.5 h-3.5" />
          Spelling Rules ({ORTHOGRAPHY_RULES.length})
        </button>
        <button
          onClick={() => setActiveTab("grammar")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeTab === "grammar"
              ? "bg-white text-neutral-900 border border-neutral-200 shadow-sm"
              : "text-neutral-500 hover:text-neutral-900 hover:bg-white/60"
          }`}
          id="tab-btn-grammar"
        >
          <Layers className="w-3.5 h-3.5" />
          Grammar & Markers ({GRAMMAR_SECTIONS.length})
        </button>
        <button
          onClick={() => setActiveTab("alphabet")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeTab === "alphabet"
              ? "bg-white text-neutral-900 border border-neutral-200 shadow-sm"
              : "text-neutral-500 hover:text-neutral-900 hover:bg-white/60"
          }`}
          id="tab-btn-alphabet"
        >
          <BookOpen className="w-3.5 h-3.5" />
          20-Letter Alphabet
        </button>
        <button
          onClick={() => setActiveTab("credits")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeTab === "credits"
              ? "bg-white text-neutral-900 border border-neutral-200 shadow-sm"
              : "text-neutral-500 hover:text-neutral-900 hover:bg-white/60"
          }`}
          id="tab-btn-credits"
        >
          <Award className="w-3.5 h-3.5" />
          DepEd Zambales & Credits
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === "rules" && (
        <div className="space-y-6" id="rules-view">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spelling rules, glottal stops, examples, or words..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 font-sans text-neutral-900 shadow-sm"
            />
          </div>

          {/* Rules list */}
          <div className="space-y-4">
            {filteredRules.map((rule) => (
              <div
                key={rule.id}
                className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4 transition-all hover:border-neutral-300"
                id={`rule-card-${rule.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {rule.ruleNumber}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 font-display mt-1">
                      {rule.title}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-500 italic">
                      {rule.nativeTitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  {rule.description}
                </p>

                {/* Examples Box */}
                <div className="bg-neutral-50 border border-neutral-200 rounded p-4 space-y-3">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-500 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    DepEd Official Examples:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rule.examples.map((ex, idx) => {
                      const isPlaying = playingText === ex.word;
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-neutral-200 rounded p-3 flex items-start justify-between gap-3 shadow-2xs hover:border-neutral-300 transition-colors"
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-neutral-900 font-display">
                                {ex.word}
                              </span>
                              <span className="text-xs text-neutral-500 font-sans">
                                = {ex.meaning}
                              </span>
                            </div>
                            {ex.note && (
                              <p className="text-[11px] text-neutral-500 leading-normal">
                                {ex.note}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => handlePlayAudio(ex.word)}
                            className={`p-1.5 rounded border shrink-0 transition-all ${
                              isPlaying
                                ? "bg-neutral-900 text-white border-neutral-900 animate-pulse"
                                : "bg-neutral-50 text-neutral-500 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300"
                            }`}
                            title="Hear pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grammar Tab */}
      {activeTab === "grammar" && (
        <div className="space-y-6" id="grammar-view">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-xs text-blue-800">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px]">Structure Overview:</span> Botolan Sambal is a predicate-initial language with an elegant nominal marking system that separates personal individuals (e.g. <em>hi Linda, ni Toto, koni Nini</em>) from common nouns (e.g. <em>ya bali, na bake, ha lamisa</em>).
            </div>
          </div>

          <div className="space-y-6">
            {GRAMMAR_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4"
                id={`grammar-sec-${sec.id}`}
              >
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="text-lg font-bold text-neutral-900 font-display">
                    {sec.title}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-500 italic">
                    {sec.nativeTitle}
                  </p>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  {sec.explanation}
                </p>

                {/* Table if present */}
                {sec.table && (
                  <div className="overflow-x-auto border border-neutral-200 rounded">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 border-b border-neutral-200">
                          {sec.table.headers.map((h, i) => (
                            <th key={i} className="p-2.5 font-bold text-neutral-700 uppercase tracking-wider text-[10px]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-neutral-50/60"}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 text-neutral-800 font-mono text-[11px]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sample Sentences */}
                <div className="bg-neutral-50 border border-neutral-200 rounded p-4 space-y-2.5">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-500">
                    Sample Sentences & Breakdowns:
                  </div>

                  <div className="space-y-2">
                    {sec.examples.map((ex, idx) => {
                      const isPlaying = playingText === ex.sentence;
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-neutral-200 rounded p-3 flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-neutral-900 font-display text-sm">
                                {ex.sentence}
                              </span>
                            </div>
                            {ex.breakdown && (
                              <p className="text-[10px] font-mono text-neutral-500">
                                Breakdown: {ex.breakdown}
                              </p>
                            )}
                            {ex.filipino && (
                              <p className="text-neutral-600 italic text-[11px]">
                                Filipino: {ex.filipino}
                              </p>
                            )}
                            <p className="text-neutral-700 font-medium text-[11px]">
                              English: {ex.english}
                            </p>
                          </div>

                          <button
                            onClick={() => handlePlayAudio(ex.sentence)}
                            className={`p-1.5 rounded border shrink-0 transition-all ${
                              isPlaying
                                ? "bg-neutral-900 text-white border-neutral-900 animate-pulse"
                                : "bg-neutral-50 text-neutral-500 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300"
                            }`}
                            title="Hear sentence pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alphabet Matrix Tab */}
      {activeTab === "alphabet" && (
        <div className="space-y-4" id="alphabet-view">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-neutral-600">
              The Sambal Botolan alphabet consists of <strong>20 letters</strong>: 15 native consonants (b, d, g, h, k, l, m, n, ng, p, r, s, t, w, y) and 5 vowels (a, e, i, o, u).
            </div>
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter letters or examples..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-neutral-200 rounded text-xs placeholder-neutral-400 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-400 shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAlphabet.map((alpha) => {
              const isPlaying = playingText === alpha.sampleWord;
              return (
                <div
                  key={alpha.letter}
                  className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm hover:border-neutral-300 transition-all space-y-3"
                  id={`letter-card-${alpha.letter.replace(/\s+/g, '')}`}
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded bg-neutral-900 text-white font-display font-bold text-lg flex items-center justify-center">
                        {alpha.upperLower.split(" ")[0]}
                      </span>
                      <div>
                        <span className="font-bold text-sm text-neutral-900 font-display">
                          {alpha.letter}
                        </span>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1">
                          Example: <strong className="text-neutral-800">{alpha.sampleWord}</strong> ({alpha.meaning})
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(alpha.sampleWord)}
                      className={`p-1.5 rounded border transition-all ${
                        isPlaying
                          ? "bg-neutral-900 text-white border-neutral-900 animate-pulse"
                          : "bg-neutral-50 text-neutral-500 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300"
                      }`}
                      title={`Play audio for ${alpha.sampleWord}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 w-14 shrink-0">Initial:</span>
                      <span className="text-neutral-700 font-mono">{alpha.initial}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 w-14 shrink-0">Middle:</span>
                      <span className="text-neutral-700 font-mono">{alpha.middle}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 w-14 shrink-0">Final:</span>
                      <span className="text-neutral-700 font-mono">{alpha.final}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Credits Tab */}
      {activeTab === "credits" && (
        <div className="space-y-6" id="credits-view">
          <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
            <div className="border-b border-neutral-100 pb-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block font-bold">
                Publication Metadata
              </span>
              <h3 className="text-xl font-bold text-neutral-900 font-display">
                {GUIDE_METADATA.title}: {GUIDE_METADATA.subtitle}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {GUIDE_METADATA.edition} • {GUIDE_METADATA.publisher}
              </p>
            </div>

            {/* Acknowledgment block in authentic Sambal Botolan */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 space-y-2">
              <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Pangikna / Pasasalamat (In Sambal Botolan):
              </div>
              <p className="text-xs text-amber-950 leading-relaxed italic font-serif">
                "{GUIDE_METADATA.acknowledgement}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-neutral-50 border border-neutral-200 rounded p-4">
                <h4 className="font-bold text-neutral-900 font-display uppercase tracking-wider text-[10px]">
                  DepEd Region III Leadership
                </h4>
                <ul className="space-y-1.5 text-neutral-600">
                  <li><strong>Director:</strong> {GUIDE_METADATA.director}</li>
                  <li><strong>CLMD Chief:</strong> {GUIDE_METADATA.clmdChief}</li>
                  <li><strong>Regional IPED Focal Person:</strong> {GUIDE_METADATA.regionalFocalPerson}</li>
                  <li><strong>Location:</strong> {GUIDE_METADATA.location}</li>
                </ul>
              </div>

              <div className="space-y-2 bg-neutral-50 border border-neutral-200 rounded p-4">
                <h4 className="font-bold text-neutral-900 font-display uppercase tracking-wider text-[10px]">
                  Linguists & Consultants (SIL Philippines)
                </h4>
                <p className="text-neutral-600 leading-relaxed">
                  {GUIDE_METADATA.linguists}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-neutral-500">
                    Source: DepEd Indigenous Peoples Education (IPED) Mother Tongue Curriculum
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
