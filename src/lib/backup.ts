import { UserProgress } from "../types";
import { exportClips, importClips } from "./recordings";
import { normalize } from "./progress";
import { shareJsonFile } from "./share";

export async function exportBackup(progress: UserProgress) {
  const clips = await exportClips();
  const payload = { app: "PINORA", version: 2, exportedAt: new Date().toISOString(), progress, clips };
  const stamp = new Date().toISOString().slice(0, 10);
  await shareJsonFile(JSON.stringify(payload), `pinora-backup-${stamp}.json`);
}

export async function readBackup(file: File): Promise<{ progress: UserProgress; clips: number } | null> {
  try {
    const data = JSON.parse(await file.text());
    if (data?.app !== "PINORA" || !data.progress) return null;
    const n = await importClips(data.clips || []);
    return { progress: { ...normalize(data.progress), updatedAt: Date.now() }, clips: n };
  } catch {
    return null;
  }
}
