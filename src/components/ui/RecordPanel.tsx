import React, { useState } from "react";
import { motion } from "motion/react";
import { Mic, Square, Play, Trash2, Check, RotateCcw } from "lucide-react";
import { useRecorder, fmtMs } from "../../lib/useRecorder";
import { playBlob } from "../../lib/recordings";
import { playSfx } from "../../utils/sfx";

interface Props {
  /** Called with the recorded audio when the user presses Save. Omit for a throwaway "compare" recording. */
  onSave?: (r: { blob: Blob; mime: string; durationMs: number }) => Promise<void> | void;
  saveLabel?: string;
  onResult?: (blob: Blob | null) => void;
}

export default function RecordPanel({ onSave, saveLabel = "Save", onResult }: Props) {
  const r = useRecorder();
  const [playing, setPlaying] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <div className="rounded-2xl bg-neutral-50 border border-neutral-200/70 p-4">
      {r.state === "idle" && (
        <button
          onClick={() => {
            playSfx("tap");
            r.start();
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 text-white text-sm font-semibold active:scale-[0.98] transition-transform"
        >
          <Mic className="w-4 h-4" /> Record
        </button>
      )}

      {r.state === "recording" && (
        <div className="flex items-center gap-4">
          <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.1 }} className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm font-mono tabular-nums text-neutral-700 flex-1">{fmtMs(r.ms)}</span>
          <button
            onClick={async () => {
              await r.stop();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold"
          >
            <Square className="w-3.5 h-3.5 fill-white" /> Stop
          </button>
        </div>
      )}

      {r.state === "done" && r.result && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPlaying(true);
                playBlob(r.result!.blob, () => setPlaying(false));
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-sm font-medium text-neutral-800"
            >
              <Play className={`w-4 h-4 ${playing ? "text-orange-500" : ""}`} /> Play ({fmtMs(r.result.durationMs)})
            </button>
            <button onClick={() => { r.reset(); onResult?.(null); }} className="p-2.5 rounded-xl text-neutral-500 border border-neutral-200 bg-white" aria-label="Discard">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          {onSave ? (
            <button
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                await onSave(r.result!);
                setSaving(false);
                r.reset();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold disabled:opacity-50"
            >
              <Check className="w-4 h-4" /> {saveLabel}
            </button>
          ) : null}
        </div>
      )}

      {r.error && <p className="text-xs text-red-600 mt-3 leading-relaxed">{r.error}</p>}
      {/* expose the temp blob to a parent when used for comparison */}
      {onResult && r.state === "done" && r.result && <Bridge blob={r.result.blob} onResult={onResult} />}
    </div>
  );
}

function Bridge({ blob, onResult }: { blob: Blob; onResult: (b: Blob | null) => void }) {
  React.useEffect(() => onResult(blob), [blob]);
  return null;
}

export { Trash2 };
