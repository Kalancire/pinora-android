import { useEffect, useRef, useState } from "react";
import { Recorder } from "./recordings";

export type RecState = "idle" | "recording" | "done";

export function useRecorder() {
  const rec = useRef<Recorder | null>(null);
  const [state, setState] = useState<RecState>("idle");
  const [result, setResult] = useState<{ blob: Blob; mime: string; durationMs: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    if (state !== "recording") return;
    const t0 = Date.now();
    const i = window.setInterval(() => setMs(Date.now() - t0), 200);
    return () => window.clearInterval(i);
  }, [state]);

  useEffect(() => () => rec.current?.cancel(), []);

  const start = async () => {
    setError(null);
    setResult(null);
    setMs(0);
    try {
      rec.current = new Recorder();
      await rec.current.start();
      setState("recording");
    } catch (e: any) {
      setError(e?.name === "NotAllowedError" ? "Microphone permission was denied. Allow it in the phone's app settings." : "Recording is not available on this device.");
      setState("idle");
    }
  };

  const stop = async () => {
    if (!rec.current) return;
    const r = await rec.current.stop();
    setResult(r);
    setState("done");
  };

  const reset = () => {
    rec.current?.cancel();
    setResult(null);
    setState("idle");
    setMs(0);
  };

  return { state, result, error, ms, start, stop, reset };
}

export const fmtMs = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
