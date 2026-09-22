/**
 * Voice recordings, stored on the device in IndexedDB (works offline).
 * kind "word": a fluent speaker's recording of one dictionary word.
 * kind "elder": a longer recording (story, saying) with speaker details.
 */
export interface Clip {
  id: string;
  kind: "word" | "elder";
  wordId?: number;
  title?: string;
  speaker?: string;
  barangay?: string;
  mime: string;
  blob: Blob;
  durationMs: number;
  createdAt: number;
}

const DB = "pinora-audio";
const STORE = "clips";

function open(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => {
      const db = r.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

const tx = async <T,>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> => {
  const db = await open();
  return new Promise((res, rej) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
};

export const saveClip = (c: Clip) => tx("readwrite", (s) => s.put(c)).then(() => refreshIndex());
export const deleteClip = (id: string) => tx("readwrite", (s) => s.delete(id)).then(() => refreshIndex());
export const listClips = async (kind?: Clip["kind"]) => {
  const all = (await tx("readonly", (s) => s.getAll())) as Clip[];
  return all.filter((c) => !kind || c.kind === kind).sort((a, b) => b.createdAt - a.createdAt);
};

/* quick lookup: which words have a recorded pronunciation */
const wordClips = new Map<number, Clip>();
export async function refreshIndex() {
  try {
    wordClips.clear();
    (await listClips("word")).forEach((c) => {
      if (c.wordId != null && !wordClips.has(c.wordId)) wordClips.set(c.wordId, c); // newest first
    });
    window.dispatchEvent(new Event("pinora-clips"));
  } catch {
    /* indexedDB unavailable */
  }
}
export const getWordClip = (wordId: number) => wordClips.get(wordId);
export const hasWordClip = (wordId: number) => wordClips.has(wordId);

/* recording */
export class Recorder {
  private rec: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private t0 = 0;

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const type = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((t) => MediaRecorder.isTypeSupported(t)) || "";
    this.rec = new MediaRecorder(this.stream, type ? { mimeType: type } : undefined);
    this.chunks = [];
    this.rec.ondataavailable = (e) => e.data.size && this.chunks.push(e.data);
    this.t0 = Date.now();
    this.rec.start();
  }

  stop(): Promise<{ blob: Blob; mime: string; durationMs: number }> {
    return new Promise((res, rej) => {
      if (!this.rec) return rej(new Error("not recording"));
      const rec = this.rec;
      rec.onstop = () => {
        this.stream?.getTracks().forEach((t) => t.stop());
        const mime = rec.mimeType || "audio/webm";
        res({ blob: new Blob(this.chunks, { type: mime }), mime, durationMs: Date.now() - this.t0 });
      };
      rec.stop();
    });
  }

  cancel() {
    try {
      this.rec?.stop();
    } catch {}
    this.stream?.getTracks().forEach((t) => t.stop());
  }
}

let current: HTMLAudioElement | null = null;
export function playBlob(blob: Blob, onEnd?: () => void) {
  current?.pause();
  const url = URL.createObjectURL(blob);
  const a = new Audio(url);
  current = a;
  a.onended = () => {
    URL.revokeObjectURL(url);
    onEnd?.();
  };
  a.onerror = () => onEnd?.();
  a.play().catch(() => onEnd?.());
  return () => a.pause();
}

/* backup helpers */
const toB64 = (b: Blob) =>
  new Promise<string>((res) => {
    const r = new FileReader();
    r.onloadend = () => res(String(r.result));
    r.readAsDataURL(b);
  });
const fromB64 = async (d: string) => (await fetch(d)).blob();

export async function exportClips() {
  const all = await listClips();
  return Promise.all(all.map(async (c) => ({ ...c, blob: undefined, data: await toB64(c.blob) })));
}
export async function importClips(list: any[]) {
  let n = 0;
  for (const c of list || []) {
    if (!c?.data || !c?.id) continue;
    const { data, ...rest } = c;
    await saveClip({ ...rest, blob: await fromB64(data) });
    n++;
  }
  return n;
}
