import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  MapPin,
  User,
  Sparkles,
  Globe2,
  Bookmark,
  ChevronRight,
  Eye,
  Info
} from "lucide-react";
import { AW_ISTORYA, Story } from "../data/sambalGuideData";
import { TtsManager } from "../utils/tts";
import PageHeader from "./ui/PageHeader";

interface StoriesScreenProps {
  key?: string;
  onBackToHome: () => void;
  onOpenGuide?: () => void;
}

export default function StoriesScreen({
  onBackToHome,
  onOpenGuide
}: StoriesScreenProps) {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(AW_ISTORYA[0].id);
  const [showFilipino, setShowFilipino] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(false);
  const [playingParagraphIdx, setPlayingParagraphIdx] = useState<number | null>(null);

  const activeStory = AW_ISTORYA.find((s) => s.id === selectedStoryId) || AW_ISTORYA[0];

  const handlePlayParagraph = (text: string, idx: number) => {
    setPlayingParagraphIdx(idx);
    TtsManager.speak(text, undefined, () => {
      setPlayingParagraphIdx(null);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
      id="stories-container"
    >
      <PageHeader title="Stories" subtitle="Zambales readers with audio." />

      {/* Stories Carousel / Selector Grid */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-500 flex items-center justify-between">
          <span>Choose a Zambales Cultural Story:</span>
          <span>{AW_ISTORYA.length} Authentic Texts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" id="story-selector-grid">
          {AW_ISTORYA.map((story) => {
            const isSelected = story.id === activeStory.id;
            return (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStoryId(story.id);
                  setPlayingParagraphIdx(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
                id={`story-tab-${story.id}`}
              >
                <div>
                  <span className={`text-[9px] font-mono block ${isSelected ? "text-neutral-300" : "text-neutral-400"}`}>
                    Story {story.id.replace("story-", "")}
                  </span>
                  <h4 className="font-bold text-xs font-display line-clamp-1 mt-0.5">
                    {story.title}
                  </h4>
                </div>
                <span className={`text-[10px] truncate block mt-2 ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}>
                  {story.author.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Reader Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-6" id="story-reader-view">
        {/* Story Metadata */}
        <div className="border-b border-neutral-100 pb-4 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-700 bg-neutral-100 border border-transparent px-2 py-0.5 rounded-xl">
                Sambal Botolan Reader
              </span>
              <h2 className="text-2xl font-bold font-display text-neutral-900 mt-1">
                {activeStory.title}
              </h2>
            </div>

            {/* Translation Toggles */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs">
              <button
                onClick={() => setShowFilipino(!showFilipino)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                  showFilipino
                    ? "bg-white text-neutral-900 shadow-2xs font-bold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                Filipino: {showFilipino ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                  showEnglish
                    ? "bg-white text-neutral-900 shadow-2xs font-bold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                English: {showEnglish ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neutral-400" />
              <span>By <strong>{activeStory.author}</strong> ({activeStory.designation})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{activeStory.location}</span>
            </div>
          </div>

          {/* Cultural Context */}
          <div className="bg-neutral-100/70 border border-transparent/80 rounded-xl p-3 text-xs text-neutral-800 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="uppercase font-mono text-[10px] text-neutral-700 tracking-wider">Cultural Background:</strong>{" "}
              {activeStory.culturalNote}
            </div>
          </div>
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-6">
          {activeStory.paragraphs.map((para, idx) => {
            const isPlaying = playingParagraphIdx === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-50/70 border border-neutral-200 rounded-2xl p-5 space-y-3 relative hover:border-neutral-300 transition-colors"
                id={`story-para-${idx}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Sambal Text */}
                  <p className="text-base text-neutral-900 leading-relaxed font-serif tracking-normal flex-1">
                    {para.sambal}
                  </p>

                  <button
                    onClick={() => handlePlayParagraph(para.sambal, idx)}
                    className={`p-2 rounded-xl border transition-all shrink-0 mt-1 ${
                      isPlaying
                        ? "bg-neutral-900 text-white border-neutral-900 animate-pulse"
                        : "bg-white text-neutral-500 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300 shadow-2xs"
                    }`}
                    title="Listen to this paragraph"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Filipino Translation */}
                {showFilipino && (
                  <div className="pt-2 border-t border-neutral-200/60 text-xs text-neutral-600 space-y-1">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-neutral-400 block">
                      Filipino Translation:
                    </span>
                    <p className="italic leading-relaxed">{para.filipino}</p>
                  </div>
                )}

                {/* English Translation */}
                {showEnglish && (
                  <div className="pt-2 border-t border-neutral-200/60 text-xs text-neutral-700 space-y-1">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-neutral-400 block">
                      English Translation:
                    </span>
                    <p className="leading-relaxed">{para.english}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key Vocabulary in the Story */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-3">
          <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-500 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            Key Vocabulary in this Narrative:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {activeStory.vocabulary.map((vocab, vIdx) => (
              <div
                key={vIdx}
                className="bg-white border border-neutral-200 rounded-xl p-2.5 text-xs space-y-1 shadow-2xs"
              >
                <div className="font-bold text-neutral-900 font-display flex items-center justify-between">
                  <span>{vocab.word}</span>
                  <button
                    onClick={() => TtsManager.speak(vocab.word)}
                    className="text-neutral-400 hover:text-neutral-800"
                    title="Pronounce word"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-[11px] text-neutral-600">
                  <span className="font-medium text-neutral-700">Fil:</span> {vocab.filipino}
                </div>
                <div className="text-[11px] text-neutral-500">
                  <span className="font-medium text-neutral-700">Eng:</span> {vocab.english}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-neutral-200 gap-3">
          {onOpenGuide && (
            <button
              onClick={onOpenGuide}
              className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-neutral-400" />
              <span>Review the spelling rules for this vocabulary</span>
            </button>
          )}

          <div className="text-[10px] font-mono text-neutral-400">
            Source: Manulat Tamoy Na (2017)
          </div>
        </div>
      </div>
    </motion.div>
  );
}
