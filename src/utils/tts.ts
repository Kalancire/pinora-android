/**
 * Text-to-speech for PINORA.
 * - In the Android app it uses the phone's native text-to-speech engine
 *   (works offline once a voice is installed).
 * - In a browser it falls back to the Web Speech API.
 * Speech is slowed (0.8) so learners can hear each syllable.
 */
import { Capacitor } from "@capacitor/core";
import { TextToSpeech } from "@capacitor-community/text-to-speech";

export class TtsManager {
  private static synth: SpeechSynthesis | null =
    typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;

  public static isSupported(): boolean {
    return Capacitor.isNativePlatform() || !!this.synth;
  }

  public static speak(text: string, onStart?: () => void, onEnd?: () => void) {
    if (Capacitor.isNativePlatform()) {
      onStart?.();
      (async () => {
        try {
          await TextToSpeech.stop();
          await TextToSpeech.speak({ text, lang: "fil-PH", rate: 0.8, pitch: 1.0, volume: 1.0, category: "ambient" });
        } catch {
          try {
            await TextToSpeech.speak({ text, lang: "en-US", rate: 0.8, pitch: 1.0, volume: 1.0, category: "ambient" });
          } catch (e) {
            console.warn("Native TTS unavailable", e);
          }
        } finally {
          onEnd?.();
        }
      })();
      return;
    }

    if (!this.synth) {
      onStart?.();
      setTimeout(() => onEnd?.(), 1200);
      return;
    }

    try {
      this.synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const voice = this.synth
        .getVoices()
        .find((v) => v.lang.startsWith("fil") || v.lang.startsWith("tl") || v.lang.startsWith("en-PH"));
      if (voice) u.voice = voice;
      u.rate = 0.8;
      u.pitch = 1.0;
      u.onstart = () => onStart?.();
      u.onend = () => onEnd?.();
      u.onerror = () => onEnd?.();
      this.synth.speak(u);
    } catch (e) {
      console.error("Speech synthesis exception", e);
      onStart?.();
      setTimeout(() => onEnd?.(), 1000);
    }
  }

  public static stop() {
    if (Capacitor.isNativePlatform()) {
      TextToSpeech.stop().catch(() => {});
    } else if (this.synth) {
      this.synth.cancel();
    }
  }
}
