import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Volume2, Target, HardDrive, Trash2, Check, Languages, Bell, Download, Upload, MessageSquarePlus } from "lucide-react";
import { UserProgress } from "../types";
import { isNative, nativeFilePath, PROGRESS_FILE } from "../lib/progress";
import { playSfx } from "../utils/sfx";
import { useT } from "../lib/i18n";
import { setReminder } from "../lib/notify";
import { exportBackup, readBackup } from "../lib/backup";
import OverlayHeader from "./ui/OverlayHeader";

interface Props {
  key?: string;
  progress: UserProgress;
  onChange: (patch: Partial<UserProgress>) => void;
  onReset: () => void;
  onBack: () => void;
  onSuggest: () => void;
  onRestore: (p: UserProgress) => void;
}

const GOALS = [30, 50, 100, 150];

function Row({ icon: I, title, sub, children }: { icon: React.ComponentType<{ className?: string }>; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <I className="w-5 h-5 text-neutral-500 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900">{title}</p>
            {sub && <p className="text-xs text-neutral-500 leading-relaxed">{sub}</p>}
          </div>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

const Switch = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <button role="switch" aria-checked={on} onClick={onClick} className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${on ? "bg-neutral-900" : "bg-neutral-200"}`}>
    <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className={`absolute top-1 w-5 h-5 rounded-full bg-white ${on ? "right-1" : "left-1"}`} />
  </button>
);

export default function SettingsScreen({ progress, onChange, onReset, onBack, onSuggest, onRestore }: Props) {
  const t = useT();
  const [path, setPath] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => { nativeFilePath().then(setPath); }, []);

  const on = progress.soundOn !== false;
  const rem = progress.reminder || { on: false, hour: 19, minute: 0 };
  const time = `${String(rem.hour).padStart(2, "0")}:${String(rem.minute).padStart(2, "0")}`;
  const lang = progress.uiLang || "en";

  const applyReminder = async (next: typeof rem) => {
    const ok = await setReminder(next.on, next.hour, next.minute, lang);
    onChange({ reminder: ok ? next : { ...next, on: false } });
    if (!ok && next.on) setMsg("Notifications are blocked. Allow them for PINORA in the phone's settings.");
    else setMsg(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
      <OverlayHeader title={t("set.title")} onBack={onBack} />

      <div className="bg-white rounded-3xl border border-neutral-200/70 divide-y divide-neutral-100">
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-neutral-500" />
            <div>
              <p className="text-sm font-semibold text-neutral-900">{t("set.sound")}</p>
              <p className="text-xs text-neutral-500">{t("set.soundSub")}</p>
            </div>
          </div>
          <Switch on={on} onClick={() => { onChange({ soundOn: !on }); if (!on) setTimeout(() => playSfx("correct"), 50); }} />
        </div>

        <Row icon={Languages} title={t("set.language")}>
          <div className="grid grid-cols-2 gap-2">
            {([["en", "English"], ["fil", "Filipino"]] as const).map(([k, label]) => (
              <button key={k} onClick={() => { playSfx("tap"); onChange({ uiLang: k }); }}
                className={`py-2.5 rounded-xl text-sm font-medium border flex items-center justify-center gap-1 ${lang === k ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"}`}>
                {lang === k && <Check className="w-3.5 h-3.5" />}{label}
              </button>
            ))}
          </div>
        </Row>

        <Row icon={Target} title={t("set.goal")} sub={t("set.goalSub")}>
          <div className="grid grid-cols-4 gap-2">
            {GOALS.map((g) => {
              const sel = (progress.dailyXpGoal || 50) === g;
              return (
                <button key={g} onClick={() => { playSfx("tap"); onChange({ dailyXpGoal: g }); }}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-colors flex items-center justify-center gap-1 ${sel ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"}`}>
                  {sel && <Check className="w-3.5 h-3.5" />}{g}
                </button>
              );
            })}
          </div>
        </Row>

        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-neutral-500" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{t("set.reminder")}</p>
                <p className="text-xs text-neutral-500">{t("set.reminderSub")}</p>
              </div>
            </div>
            <Switch on={rem.on} onClick={() => applyReminder({ ...rem, on: !rem.on })} />
          </div>
          {rem.on && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-neutral-600">{t("set.time")}</span>
              <input type="time" value={time} onChange={(e) => { const [h, m] = e.target.value.split(":").map(Number); if (!Number.isNaN(h)) applyReminder({ on: true, hour: h, minute: m || 0 }); }}
                className="px-3 py-2 rounded-xl border border-neutral-200 text-sm bg-white" />
            </div>
          )}
          {msg && <p className="text-xs text-red-600 mt-3">{msg}</p>}
        </div>

        <Row icon={Download} title={t("set.backup")} sub={t("set.backupSub")}>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => exportBackup(progress)} className="py-2.5 rounded-xl text-sm font-medium border border-neutral-200 bg-white text-neutral-800 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> {t("set.export")}
            </button>
            <button onClick={() => file.current?.click()} className="py-2.5 rounded-xl text-sm font-medium border border-neutral-200 bg-white text-neutral-800 flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" /> {t("set.import")}
            </button>
            <input ref={file} type="file" accept="application/json,.json" hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                const r = await readBackup(f);
                if (!r) return setMsg("That file is not a PINORA backup.");
                onRestore(r.progress);
                setMsg(`Restored. ${r.clips} recording${r.clips === 1 ? "" : "s"} imported.`);
              }} />
          </div>
        </Row>

        <button onClick={onSuggest} className="w-full p-5 flex items-center gap-3 text-left active:bg-neutral-50">
          <MessageSquarePlus className="w-5 h-5 text-neutral-500" />
          <span className="text-sm font-semibold text-neutral-900">{t("set.suggest")}</span>
        </button>

        <Row icon={HardDrive} title={t("set.data")} sub={t("set.dataSub")}>
          <div className="rounded-xl bg-neutral-50 p-3 text-[11px] font-mono text-neutral-500 break-all leading-relaxed">
            {isNative() ? path ?? `Android/data/com.pinora.app/files/${PROGRESS_FILE}` : "Browser storage (the Android app also saves a file in its app folder)"}
          </div>
        </Row>

        <div className="p-5">
          <button onClick={() => { if (window.confirm("Erase all progress and start again from zero?")) onReset(); }} className="flex items-center gap-3 text-red-600 text-sm font-medium active:opacity-60">
            <Trash2 className="w-5 h-5" /> {t("set.reset")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
