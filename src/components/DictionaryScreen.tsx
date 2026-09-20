import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  Volume2, 
  Compass, 
  Sparkles,
  MapPin,
  Tag,
  BookOpen,
  Info
} from "lucide-react";
import { Word } from "../types";
import { LANGUAGES, WORDS } from "../data";
import { TtsManager } from "../utils/tts";
import PageHeader from "./ui/PageHeader";
import { playSfx } from "../utils/sfx";

interface DictionaryScreenProps {
  key?: string;
  initialLanguageId: number;
  onBackToHome: () => void;
}

const CATEGORIES = [
  "All",
  "Greetings",
  "Phrases",
  "Pronouns",
  "Numbers",
  "Body",
  "Family",
  "Community",
  "Animals",
  "Plants",
  "Places",
  "Nature",
  "Time",
  "Verbs",
  "Questions",
  "Culture",
  "Nouns",
  "Adjectives",
  "Demonstratives",
  "Grammar Words"
];

export default function DictionaryScreen({
  initialLanguageId,
  onBackToHome
}: DictionaryScreenProps) {
  // States
  const [selectedLanguageId, setSelectedLanguageId] = useState<number>(initialLanguageId);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [playingWordId, setPlayingWordId] = useState<number | null>(null);

  const activeLanguage = LANGUAGES.find(l => l.languageId === selectedLanguageId) || LANGUAGES[0];

  // Filtering vocabulary words
  const languageWords = WORDS.filter(w => w.languageId === selectedLanguageId);
  
  const filteredWords = languageWords.filter(word => {
    const matchesSearch = 
      word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.pronunciation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (word.variant || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (word.note || "").toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "All" || word.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle TTS
  const handlePlayWord = (word: Word) => {
    setPlayingWordId(word.wordId);
    TtsManager.speak(word.word.split(" / ")[0], undefined, () => {
      setPlayingWordId(null);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
      id="dictionary-container"
    >
      <PageHeader title="Dictionary" subtitle="Words, meanings and sounds. Works offline." />

      {/* Language tab compare selectors */}
      <div className="bg-neutral-50 p-1 rounded-xl flex gap-1 border border-neutral-200" id="language-tab-container">
        {LANGUAGES.map((lang) => {
          const isSelected = lang.languageId === selectedLanguageId;
          return (
            <button
              key={lang.languageId}
              onClick={() => {
                setSelectedLanguageId(lang.languageId);
                // Keep category filter but wipe search query on tab swap
                setSearchQuery("");
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isSelected 
                  ? "bg-white text-neutral-900 border border-neutral-200" 
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-white border border-transparent"
              }`}
              id={`dict-lang-tab-${lang.languageId}`}
            >
              <span className="hidden sm:inline font-display">{lang.name}</span>
              <span className="sm:hidden font-display">{lang.nativeName}</span>
            </button>
          );
        })}
      </div>

      {/* Search Filter Inputs */}
      <div className="space-y-4" id="filter-controls-box">
        {/* Realtime filter input field */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words or meanings"
            className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 transition-all font-sans text-neutral-900"
            id="dict-search-input"
          />
        </div>

        {/* Category horizontal scroll container */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-200" id="category-filter-scroll">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-4 rounded-xl text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all border ${
                  isSelected 
                    ? "bg-neutral-900 text-white border-neutral-900" 
                    : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300"
                }`}
                id={`cat-filter-btn-${cat}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Word results list layout */}
      <div className="space-y-4" id="vocab-results-layout">
        <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono flex items-center justify-between px-1">
          <span>{filteredWords.length} words</span>
          {searchQuery && <span>Filter: "{searchQuery}"</span>}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="vocab-cards-grid">
              {filteredWords.map((word) => {
                const isPlaying = playingWordId === word.wordId;
                
                return (
                  <motion.div
                    layout
                    key={word.wordId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -1 }}
                    className="p-5 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow transition-all flex justify-between items-start gap-4 relative overflow-hidden"
                    id={`dict-word-card-${word.wordId}`}
                  >
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-xl bg-neutral-50 text-neutral-500 border border-neutral-200 flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5 text-neutral-400" />
                          {word.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-neutral-900 font-display tracking-tight leading-none mt-1">
                        {word.word}
                      </h3>
                      
                      <p className="text-xs font-semibold text-neutral-600 flex items-center gap-1.5 mt-2">
                        <BookOpen className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span className="text-neutral-700">{word.meaning}</span>
                      </p>

                      <p className="text-[10px] font-mono font-medium text-neutral-500 bg-neutral-50 px-2 py-1 rounded-xl inline-block mt-2 border border-neutral-200">
                        Phonetic: /{word.pronunciation}/
                      </p>

                      {word.variant && (
                        <p className="text-[11px] text-neutral-600 mt-2">
                          <span className="font-bold">Also written:</span> {word.variant}
                        </p>
                      )}
                      {word.note && (
                        <p className="text-[11px] leading-relaxed text-neutral-500 mt-1">{word.note}</p>
                      )}
                      {word.source && (
                        <p className="text-[9px] uppercase tracking-widest font-mono text-amber-700 mt-1">Source: {word.source}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlayWord(word)}
                      className={`p-2.5 rounded-xl border transition-all mt-6 ${
                        isPlaying 
                          ? "bg-neutral-900 text-white border-neutral-900 animate-pulse" 
                          : "bg-neutral-50 text-neutral-500 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300"
                      }`}
                      id={`play-tts-dict-${word.wordId}`}
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? "text-white" : ""}`} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center bg-neutral-50 border border-dashed border-neutral-200 rounded-xl space-y-3"
              id="no-results-panel"
            >
              <Compass className="w-8 h-8 text-neutral-400 mx-auto" />
              <h4 className="font-bold text-neutral-900 text-sm font-display tracking-tight">Zero matches detected</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto px-4 leading-relaxed">
                No entries found for "{searchQuery}" under {selectedCategory}. Try broadening your search parameters.
              </p>
              
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="inline-flex mt-4 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:text-neutral-900 text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-xl transition-colors"
                id="reset-filter-btn"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
