/**
 * Tiny sound-effects engine built on the Web Audio API.
 * No audio files are needed, so it works fully offline.
 */
type Sfx = "tap" | "nav" | "correct" | "wrong" | "complete";

let ctx: AudioContext | null = null;
let enabled = true;

export const setSfxEnabled = (on: boolean) => {
  enabled = on;
};

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, gain: number) {
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t0 = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

export function playSfx(name: Sfx) {
  if (!enabled) return;
  try {
    switch (name) {
      case "tap":
        tone(760, 0, 0.06, "sine", 0.05);
        break;
      case "nav":
        tone(620, 0, 0.05, "sine", 0.04);
        tone(930, 0.04, 0.06, "sine", 0.03);
        break;
      case "correct":
        tone(587, 0, 0.12, "sine", 0.08);
        tone(880, 0.09, 0.2, "sine", 0.08);
        break;
      case "wrong":
        tone(220, 0, 0.18, "triangle", 0.09);
        tone(165, 0.1, 0.22, "triangle", 0.09);
        break;
      case "complete":
        [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.28, "sine", 0.08));
        break;
    }
  } catch {
    /* audio is optional */
  }
}
