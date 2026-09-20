import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Volume2, 
  HelpCircle, 
  ChevronRight, 
  BookOpen, 
  Award, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  Mic
} from "lucide-react";
import { Lesson, Word, UserProgress } from "../types";
import { WORDS } from "../data";
import { TtsManager } from "../utils/tts";
import { playSfx } from "../utils/sfx";
import { Check as CheckIcon, X as XIcon } from "lucide-react";

interface LessonScreenProps {
  key?: string;
  lesson: Lesson;
  progress: UserProgress;
  startMode?: Mode;
  onBackToHome: () => void;
  onLessonComplete: (xpEarned: number, mistakesMade: number[], mistakesCorrected: number[]) => void;
}

type Mode = "study" | "speech" | "quiz" | "summary";

export default function LessonScreen({
  lesson,
  progress,
  startMode,
  onBackToHome,
  onLessonComplete
}: LessonScreenProps) {
  // Load words for this lesson
  const lessonWords = WORDS.filter(w => lesson.wordRefs.includes(w.wordId));
  
  // State variables
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [revealedStates, setRevealedStates] = useState<Record<number, boolean>>({});
  const [mode, setMode] = useState<Mode>(startMode || "study");
  
  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean | null>(null);
  const [quizWordIdx, setQuizWordIdx] = useState(0);
  const [pointsAccumulated, setPointsAccumulated] = useState(0);
  
  // Mistake tracking
  const [mistakesMade, setMistakesMade] = useState<number[]>([]);
  const [mistakesCorrected, setMistakesCorrected] = useState<number[]>([]);

  // Speech states
  const [speechWordIdx, setSpeechWordIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState<string | null>(null);
  const [speechConfidence, setSpeechConfidence] = useState<number | null>(null);

  const currentWord = lessonWords[currentWordIdx];
  const currentQuizWord = lessonWords[quizWordIdx];
  const currentSpeechWord = lessonWords[speechWordIdx];

  // TTS audio handle
  const handleTts = (text: string) => {
    setIsSpeaking(true);
    TtsManager.speak(text, undefined, () => {
      setIsSpeaking(false);
    });
  };

  const handleStartListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fil-PH"; // Philippine languages fallback
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechResult(null);
      setSpeechConfidence(null);
    };

    recognition.onresult = (event: any) => {
      const result = event.results[0][0];
      setSpeechResult(result.transcript);
      
      const targetWord = currentSpeechWord.word.toLowerCase();
      const heard = result.transcript.toLowerCase();
      
      let conf = result.confidence;
      if (heard.includes(targetWord) || targetWord.includes(heard)) {
        conf = Math.max(conf, 0.85); // Boost if it matches
      }
      
      setSpeechConfidence(conf);
      
      if (conf > 0.6) {
        setPointsAccumulated(p => p + 20); // 20 XP for good pronunciation
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Turn current card over
  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    
    // If first time revealing, award revealing XP
    if (!revealedStates[currentWord.wordId]) {
      setRevealedStates(prev => ({ ...prev, [currentWord.wordId]: true }));
      setPointsAccumulated(p => p + 10); // +10 XP for revealing as per build plan guidelines
    }
  };

  // Generate false options for the matching quiz: same language, same category first,
  // short plain meanings preferred, so wrong answers look realistic but are clearly wrong.
  const generateQuizOptions = (word: { meaning: string; languageId: number; category: string }) => {
    const correctMeaning = word.meaning;
    const pool = WORDS.filter((w) => w.languageId === word.languageId && w.meaning !== correctMeaning && w.meaning.length <= 28 && !w.meaning.includes("("));
    const unique = (arr: typeof pool) => Array.from(new Set(arr.map((w) => w.meaning)));
    const shuffle = <T,>(a: T[]) => [...a].sort(() => 0.5 - Math.random());
    const sameCat = shuffle(unique(pool.filter((w) => w.category === word.category)));
    const rest = shuffle(unique(pool.filter((w) => w.category !== word.category)));
    const distractors = [...sameCat, ...rest].slice(0, 2);
    return shuffle([correctMeaning, ...distractors]);
  };

  // Prime subsequent question for quiz index
  useEffect(() => {
    if (mode === "quiz" && currentQuizWord) {
      setQuizAnswers(generateQuizOptions(currentQuizWord));
      setSelectedQuizAnswer(null);
      setIsQuizCorrect(null);
    }
  }, [mode, quizWordIdx]);

  // Handle quiz option click
  const handleSelectOption = (option: string) => {
    if (selectedQuizAnswer !== null) return; // Prevent clicking multiple times

    setSelectedQuizAnswer(option);
    const correct = option === currentQuizWord.meaning;
    setIsQuizCorrect(correct);
    playSfx(correct ? "correct" : "wrong");

    if (correct) {
      setPointsAccumulated(p => p + 15); // Bonus 15 XP for correct quiz answer
      if (progress.mistakes?.includes(currentQuizWord.wordId)) {
        setMistakesCorrected(prev => [...prev, currentQuizWord.wordId]);
      }
    } else {
      setMistakesMade(prev => [...prev, currentQuizWord.wordId]);
    }
  };

  // Progress study to next word or transits to speech mode
  const handleNextStudy = () => {
    setIsFlipped(false);
    if (currentWordIdx < lessonWords.length - 1) {
      setCurrentWordIdx(prev => prev + 1);
    } else {
      // Start the Speech mode!
      setMode("speech");
      setSpeechWordIdx(0);
    }
  };

  // Progress speech to next word or transits to matching quiz
  const handleNextSpeech = () => {
    setSpeechResult(null);
    setSpeechConfidence(null);
    if (speechWordIdx < lessonWords.length - 1) {
      setSpeechWordIdx(prev => prev + 1);
    } else {
      setMode("quiz");
      setQuizWordIdx(0);
    }
  };

  // Progress quiz question or transit to lesson final summary
  const handleNextQuiz = () => {
    if (quizWordIdx < lessonWords.length - 1) {
      setQuizWordIdx(prev => prev + 1);
    } else {
      // Finish lesson
      setMode("summary");
    }
  };

  // Action buttons for final finish claim
  const handleFinishClaim = () => {
    const finalBonusXp = lesson.xpReward + pointsAccumulated;
    onLessonComplete(finalBonusXp, mistakesMade, mistakesCorrected);
  };

  return (
    <div className="space-y-8" id="lesson-screen-container">
      {/* Slim lesson header */}
      <div className="flex items-center justify-between" id="lesson-header-bar">
        <button
          onClick={onBackToHome}
          className="w-10 h-10 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-600 active:scale-95 transition-transform"
          id="back-to-home-btn"
          aria-label="Close lesson"
        >
          <XIcon className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-neutral-900 tracking-tight truncate max-w-[60%]">{lesson.title}</span>
        <span className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {mode === "study" && currentWord && (
          <motion.div
            key="study-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8 max-w-2xl mx-auto"
            id="study-panel"
          >
            {/* Progression progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-500 tracking-widest font-mono">
                <span>Learn</span>
                <span>
                  {currentWordIdx + 1} / {lessonWords.length}
                </span>
              </div>
              <div className="h-1 bg-neutral-200 overflow-hidden rounded-full">
                <div 
                  className="h-full bg-neutral-900 transition-all duration-300" 
                  style={{ width: `${((currentWordIdx) / lessonWords.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Flashcard Component */}
            <div className="flex justify-center py-6" id="flashcard-wrapper">
              <div 
                className="w-full max-w-md h-64 relative cursor-pointer group"
                onClick={handleFlipCard}
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className={`w-full h-full rounded-2xl p-8 flex flex-col justify-between border transition-all duration-500 absolute backface-hidden select-none ${
                    isFlipped 
                      ? "bg-neutral-50 border-neutral-200" 
                      : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-md"
                  }`}
                  id="target-word-card"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Inside standard side */}
                  {!isFlipped ? (
                    <div className="flex flex-col justify-between h-full w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-sm uppercase font-mono tracking-widest font-bold">
                          {currentWord.category}
                        </span>
                        <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 font-bold uppercase tracking-widest">
                          <HelpCircle className="w-3.5 h-3.5" /> Reveal
                        </div>
                      </div>

                      <div className="text-center my-auto space-y-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 font-display tracking-tight leading-none">
                          {currentWord.word}
                        </h2>
                        <p className="text-neutral-500 font-mono text-xs max-w-xs mx-auto tracking-wide">
                          /{currentWord.pronunciation}/
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTts(currentWord.word);
                          }}
                          className={`p-2.5 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${
                            isSpeaking 
                              ? "bg-neutral-100 text-neutral-900 animate-pulse" 
                              : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 border border-transparent hover:border-neutral-200"
                          }`}
                          id={`tts-word-${currentWord.wordId}`}
                        >
                          <Volume2 className="w-4 h-4" />
                          Audio
                        </button>

                        <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-neutral-400">+10 XP</span>
                      </div>
                    </div>
                  ) : (
                    // Spacing Back of card
                    <div className="flex flex-col justify-between h-full w-full" style={{ transform: "rotateY(180deg)" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] bg-neutral-900 text-white px-2.5 py-1 rounded-sm uppercase font-mono tracking-widest font-bold">
                          Translation
                        </span>
                      </div>

                      <div className="text-center my-auto space-y-3">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 font-display leading-tight">
                          {currentWord.meaning}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTts(currentWord.meaning);
                          }}
                          className="bg-neutral-100 border border-neutral-200 text-neutral-900 px-3 py-2 rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest"
                          id={`tts-translation-${currentWord.wordId}`}
                        >
                          <Volume2 className="w-4 h-4" />
                          English
                        </button>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Flip Back</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="text-center text-[10px] text-neutral-400 font-mono tracking-wide max-w-sm mx-auto border-t border-neutral-200 pt-4">
              Focus on phonetic accuracy before proceeding.
            </div>

            {/* Next progression button */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-widest">
                Bonus: <strong className="text-neutral-900">+{pointsAccumulated} XP</strong>
              </span>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStudy}
                className="bg-neutral-900 text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2"
                id="next-study-card-btn"
              >
                {currentWordIdx === lessonWords.length - 1 ? "Next Phase" : "Next word"}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {mode === "speech" && currentSpeechWord && (
          <motion.div
            key="speech-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8 max-w-2xl mx-auto"
            id="speech-panel"
          >
            {/* Progress Bar for Speech */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-500 tracking-widest font-mono">
                <span className="flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" /> Phase II: Pronunciation
                </span>
                <span>
                  {speechWordIdx + 1} / {lessonWords.length}
                </span>
              </div>
              <div className="h-1 bg-neutral-200 overflow-hidden rounded-full">
                <div 
                  className="h-full bg-neutral-900 transition-all duration-300" 
                  style={{ width: `${((speechWordIdx) / lessonWords.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Speech Challenge Box */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center" id="speech-challenge">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-neutral-400 block mb-3">
                Dictation Target
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900 font-display tracking-tight leading-none">
                {currentSpeechWord.word}
              </h3>
              <p className="text-neutral-500 font-mono text-xs mt-3 tracking-wide">
                Translation: {currentSpeechWord.meaning}
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartListening}
                  disabled={isListening}
                  className={`w-16 h-16 rounded-xl border flex items-center justify-center transition-colors ${
                    isListening 
                      ? "bg-neutral-50 border-neutral-200 text-neutral-900 shadow-[0_0_15px_rgba(0,0,0,0.05)]" 
                      : "bg-neutral-900 border-neutral-900 hover:bg-neutral-800 text-white"
                  }`}
                >
                  <Mic className={`w-6 h-6 ${isListening ? "animate-pulse text-red-500" : ""}`} />
                </motion.button>
                <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">
                  {isListening ? "Awaiting Input..." : "Initialize Microphone"}
                </span>
              </div>

              {/* Feedback Section */}
              <div className="mt-8 min-h-[80px]">
                {speechResult !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border text-left ${
                      (speechConfidence || 0) > 0.6 
                        ? "bg-neutral-100 border-transparent text-emerald-800" 
                        : "bg-neutral-50 border-neutral-200 text-neutral-600"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">Transcribed Input:</p>
                      <p className="text-sm font-medium text-neutral-900 italic">"{speechResult}"</p>
                      <div className="mt-2 flex items-center justify-between border-t border-neutral-200 pt-3">
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${
                          (speechConfidence || 0) > 0.6 ? "text-emerald-600" : "text-neutral-500"
                        }`}>
                          {(speechConfidence || 0) > 0.6 ? "Match Confirmed" : "Suboptimal Match"}
                        </span>
                        {(speechConfidence || 0) > 0.6 && (
                          <span className="text-[10px] font-mono font-bold text-emerald-900 bg-emerald-400 px-2 py-0.5 rounded-sm">
                            +20 XP
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Next progression button */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-widest">
                Bonus: <strong className="text-neutral-200">+{pointsAccumulated} XP</strong>
              </span>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSpeech}
                className="bg-neutral-200 text-neutral-900 font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white transition-colors flex items-center gap-2"
                id="next-speech-card-btn"
              >
                {speechWordIdx === lessonWords.length - 1 ? "Next Phase" : "Next word"}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {mode === "quiz" && currentQuizWord && (
          <motion.div
            key="quiz-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8 max-w-2xl mx-auto"
            id="quiz-panel"
          >
            {/* Progress Bar for Quiz */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-500 tracking-widest font-mono">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Phase III: Assessment
                </span>
                <span>
                  {quizWordIdx + 1} / {lessonWords.length}
                </span>
              </div>
              <div className="h-1 bg-neutral-200 overflow-hidden rounded-full">
                <div 
                  className="h-full bg-neutral-900 transition-all duration-300" 
                  style={{ width: `${((quizWordIdx) / lessonWords.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Quiz Question Box */}
            <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center" id="quiz-question">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-neutral-400 block mb-3">
                Identify Translation
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900 font-display tracking-tight leading-none">
                {currentQuizWord.word}
              </h3>
              <p className="text-neutral-500 font-mono text-xs mt-3 tracking-wide">
                Phonetic: /{currentQuizWord.pronunciation}/
              </p>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => handleTts(currentQuizWord.word)}
                  className="bg-neutral-50 text-neutral-600 px-4 py-2 rounded-xl hover:bg-neutral-100 hover:text-neutral-900 transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-neutral-200"
                  id={`quiz-tts-${currentQuizWord.wordId}`}
                >
                  <Volume2 className="w-4 h-4" /> Reference Audio
                </button>
              </div>
            </div>

            {/* Double Check Options */}
            <div className="space-y-3" id="quiz-options">
              {quizAnswers.map((option, i) => {
                const isSelected = selectedQuizAnswer === option;
                const isCorrectOption = option === currentQuizWord.meaning;
                
                let optionStyle = "bg-white border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 text-neutral-600";
                
                if (selectedQuizAnswer !== null) {
                  if (isSelected) {
                    optionStyle = isCorrectOption 
                      ? "bg-neutral-100 border-emerald-300 text-neutral-600 ring-1 ring-emerald-300"
                      : "bg-red-50 border-red-300 text-red-700";
                  } else if (isCorrectOption) {
                    optionStyle = "bg-neutral-50 border-transparent text-emerald-600 opacity-70";
                  } else {
                    optionStyle = "bg-neutral-50 border-neutral-200 text-neutral-400 opacity-50 grayscale";
                  }
                }

                return (
                  <motion.button
                    key={i}
                    whileTap={selectedQuizAnswer === null ? { scale: 0.98 } : {}}
                    onClick={() => handleSelectOption(option)}
                    disabled={selectedQuizAnswer !== null}
                    className={`w-full p-5 rounded-xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${optionStyle}`}
                    id={`quiz-option-${i}`}
                  >
                    <span>{option}</span>
                    {selectedQuizAnswer !== null && isCorrectOption && (
                      <span className="text-emerald-600 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1"><CheckIcon className="w-3.5 h-3.5" /> Correct</span>
                    )}
                    {selectedQuizAnswer !== null && isSelected && !isCorrectOption && (
                      <span className="text-red-600 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1"><XIcon className="w-3.5 h-3.5" /> Incorrect</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Answer Feedbacks */}
            {selectedQuizAnswer !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-xl border flex items-start gap-3 ${
                  isQuizCorrect 
                    ? "bg-neutral-100 border-transparent text-emerald-800" 
                    : "bg-white border-neutral-200 text-neutral-600"
                }`}
                id="quiz-feedback-box"
              >
                {isQuizCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-emerald-900">Target Accurately Matched (+15 XP)</h4>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                        Retention verified. Proceed to the next module.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">Discrepancy Detected</h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        The precise translation of <strong className="text-neutral-900">"{currentQuizWord.word}"</strong> is <strong className="text-neutral-900">"{currentQuizWord.meaning}"</strong>.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Navigation block */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-widest">
                Score: <strong className="text-neutral-900">+{pointsAccumulated} XP</strong>
              </span>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuiz}
                disabled={selectedQuizAnswer === null}
                className={`font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl transition-colors flex items-center gap-2 ${
                  selectedQuizAnswer !== null 
                    ? "bg-neutral-900 text-white hover:bg-neutral-800" 
                    : "bg-neutral-50 border border-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
                id="quiz-next-question-btn"
              >
                {quizWordIdx === lessonWords.length - 1 ? "Finish" : "Next word"}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {mode === "summary" && (
          <motion.div
            key="summary-mode"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-10 text-center space-y-8"
            id="summary-panel"
          >
            {/* Large flame reward center */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-20 h-20 bg-neutral-900 rounded-xl flex items-center justify-center relative">
                <CheckCircle className="w-10 h-10 text-white" />
                <Award className="w-6 h-6 text-neutral-900 absolute -right-2 -bottom-2 bg-white rounded-xl p-0.5 border border-neutral-200" />
              </div>
              <h2 className="text-3xl font-extrabold text-neutral-900 font-display tracking-tight">
                Lesson complete
              </h2>
              <p className="text-sm text-neutral-500 max-w-sm">
                You finished <strong className="text-neutral-900">{lesson.title}</strong>. Save it to keep your XP.
              </p>
            </div>

            {/* Breakdown statistics list */}
            <div className="bg-neutral-50 rounded-xl p-6 max-w-sm mx-auto space-y-4 text-left border border-neutral-200" id="summary-table">
              <h4 className="text-[10px] uppercase font-mono text-neutral-400 font-bold tracking-widest border-b border-neutral-200 pb-2">
                Your results
              </h4>

              <div className="flex justify-between text-sm py-1">
                <span className="text-neutral-500 text-xs">Lesson reward</span>
                <span className="font-bold text-neutral-900 text-xs">+{lesson.xpReward} XP</span>
              </div>

              <div className="flex justify-between text-sm py-1">
                <span className="text-neutral-500 text-xs">Cards revealed</span>
                <span className="font-bold text-neutral-900 text-xs">+{Object.keys(revealedStates).length * 10} XP</span>
              </div>

              <div className="flex justify-between text-sm py-1">
                <span className="text-neutral-500 text-xs">Quiz bonus</span>
                <span className="font-bold text-neutral-900 text-xs">+{Math.max(0, pointsAccumulated - (Object.keys(revealedStates).length * 10))} XP</span>
              </div>

              <div className="flex justify-between text-sm pt-4 border-t border-neutral-200 mt-2">
                <span className="font-bold text-[10px] uppercase tracking-widest text-neutral-400">Total</span>
                <span className="font-mono font-extrabold text-neutral-900 text-base">+{lesson.xpReward + pointsAccumulated} XP</span>
              </div>
            </div>

            {/* Completion items list */}
            <div className="space-y-3 max-w-sm mx-auto">
              <h4 className="text-[10px] uppercase font-mono text-neutral-500 font-bold text-left tracking-widest">
                Words you practiced
              </h4>
              <div className="grid grid-cols-2 gap-3" id="summary_word_chips">
                {lessonWords.map(w => (
                  <div key={w.wordId} className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl text-[11px] font-bold uppercase tracking-wide text-neutral-600 border border-neutral-200">
                    <span className="truncate">{w.word}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button click progress */}
            <div className="pt-4 max-w-sm mx-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFinishClaim}
                className="w-full bg-neutral-900 text-white hover:bg-neutral-800 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                id="claim-xp-return-btn"
              >
                <Award className="w-4 h-4 shrink-0" />
                Save progress
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
