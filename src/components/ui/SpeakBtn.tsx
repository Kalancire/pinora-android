import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { motion } from "motion/react";
import { playWordAudio, playText } from "../../utils/audio";

interface Props {
  text: string;
  wordId?: number;
  size?: "sm" | "md";
  className?: string;
}

/** Plays a recorded speaker if there is one for this word, otherwise the phone's voice. */
export default function SpeakBtn({ text, wordId, size = "md", className = "" }: Props) {
  const [on, setOn] = useState(false);
  const dim = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={(e) => {
        e.stopPropagation();
        const s = () => setOn(true);
        const d = () => setOn(false);
        if (wordId != null) playWordAudio({ wordId, word: text }, s, d);
        else playText(text, s, d);
      }}
      className={`${dim} shrink-0 rounded-full flex items-center justify-center transition-colors ${on ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-700"} ${className}`}
      aria-label={`Play ${text}`}
    >
      <Volume2 className="w-4 h-4" />
    </motion.button>
  );
}
