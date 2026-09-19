/**
 * Offline-first browser-native Text-to-Speech manager fallback for PINORA.
 * Speeds are adjusted (default ~0.8) to make it slow, distinct, and clear for learners.
 */

export class TtsManager {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static isSupported(): boolean {
    return !!this.synth;
  }

  public static speak(text: string, onStart?: () => void, onEnd?: () => void) {
    if (!this.synth) {
      console.warn("Speech synthesis not supported in this environment (likely sandboxed iframe restriction). Visual guide provided.");
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 1200);
      return;
    }

    try {
      this.synth.cancel(); // Stop playing previous voices

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a Filipino/Tagalog voice
      const voices = this.synth.getVoices();
      const filVoice = voices.find(v => 
        v.lang.startsWith('fil') || 
        v.lang.startsWith('tl') || 
        v.lang.startsWith('en-PH')
      );

      if (filVoice) {
        utterance.voice = filVoice;
      }
      
      utterance.rate = 0.80; // Slower rate for clear pronunciation as per design spec
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (err) => {
        console.error("Speech synthesis error", err);
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis exception", e);
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 1000);
    }
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}
