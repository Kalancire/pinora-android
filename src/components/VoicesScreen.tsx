import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, Trash2, Share2, Mic } from "lucide-react";
import { UserProgress } from "../types";
import { Clip, deleteClip, listClips, playBlob, saveClip } from "../lib/recordings";
import { fmtMs } from "../lib/useRecorder";
import { shareFile } from "../lib/share";
import { playSfx } from "../utils/sfx";
import RecordPanel from "./ui/RecordPanel";

interface Props {
  progress: UserProgress;
  update: (fn: (p: UserProgress) => UserProgress) => void;
}

export default function VoicesScreen({ update }: Props) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [barangay, setBarangay] = useState("");
  const refresh = () => listClips("elder").then(setClips);
  useEffect(() => { refresh(); }, []);
  const input = "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10";

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl border border-neutral-200/70 p-5 space-y-3">
        <div className="flex items-center gap-2"><Mic className="w-4 h-4 text-neutral-500" /><p className="text-sm font-semibold text-neutral-900">Record a story or saying</p></div>
        <p className="text-xs text-neutral-500 leading-relaxed">Ask an elder for permission first. Recordings stay on this phone unless you share them.</p>
        <input className={input} placeholder="Title (for example: a saying about the harvest)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <input className={input} placeholder="Speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)} />
          <input className={input} placeholder="Barangay" value={barangay} onChange={(e) => setBarangay(e.target.value)} />
        </div>
        <RecordPanel
          saveLabel="Save recording"
          onSave={async (r) => {
            await saveClip({ id: String(Date.now()), kind: "elder", title: title.trim() || "Untitled", speaker: speaker.trim(), barangay: barangay.trim(), mime: r.mime, blob: r.blob, durationMs: r.durationMs, createdAt: Date.now() });
            update((p) => ({ ...p, recordingsCount: (p.recordingsCount || 0) + 1 }));
            playSfx("correct");
            setTitle("");
            refresh();
          }}
        />
      </div>

      <div className="space-y-3">
        {clips.length === 0 && <p className="text-sm text-neutral-400 text-center py-6">No recordings yet.</p>}
        {clips.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-neutral-200/70 p-4 flex items-center gap-3">
            <button onClick={() => playBlob(c.blob)} className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0" aria-label="Play"><Play className="w-4 h-4 fill-white ml-0.5" /></button>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-neutral-900 truncate">{c.title}</p>
              <p className="text-xs text-neutral-400 truncate">{[c.speaker, c.barangay].filter(Boolean).join(" · ") || "Unknown speaker"} · {fmtMs(c.durationMs)}</p>
            </div>
            <button onClick={() => shareFile(c.blob, `pinora-${c.id}.${c.mime.includes("mp4") ? "m4a" : "webm"}`, c.title || "PINORA recording")} className="p-2 text-neutral-500" aria-label="Share"><Share2 className="w-4 h-4" /></button>
            <button onClick={async () => { await deleteClip(c.id); refresh(); }} className="p-2 text-neutral-400" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
