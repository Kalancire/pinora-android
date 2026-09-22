import { Word } from "../types";
import { TtsManager } from "./tts";
import { getWordClip, playBlob } from "../lib/recordings";

/** Plays a fluent speaker's recording of the word if one exists, otherwise the phone's voice. */
export function playWordAudio(word: Pick<Word, "wordId" | "word">, onStart?: () => void, onEnd?: () => void) {
  const clip = getWordClip(word.wordId);
  if (clip) {
    onStart?.();
    playBlob(clip.blob, onEnd);
    return;
  }
  TtsManager.speak(word.word.split(" / ")[0], onStart, onEnd);
}

export function playText(text: string, onStart?: () => void, onEnd?: () => void) {
  TtsManager.speak(text, onStart, onEnd);
}
