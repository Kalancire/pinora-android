import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Volume2, Target, HardDrive, Trash2, Check } from "lucide-react";
import { UserProgress } from "../types";
import { isNative, nativeFilePath, PROGRESS_FILE } from "../lib/progress";
import { playSfx } from "../utils/sfx";
import PageHeader from "./ui/PageHeader";

interface Props {
  key?: string;
  progress: UserProgress;
  onChange: (patch: Partial<UserProgress>) => void;
  onReset: () => void;
  onBack: () => void;
}

const GOALS = [30, 50, 100, 150];

export default function SettingsScreen({ progress, onChange, onReset, onBack }: Props) {
  const [path, setPath] = useState<string | null>(null);
  useEffect(() => {
    nativeFilePath().then(setPath);
  }, []);

  const on = progress.soundOn !== false;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-neutral-500 active:opacity-60" aria-label="Back">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <PageHeader title="Settings" />

      <div className="bg-white rounded-3xl border border-neutral-200/70 divide-y divide-neutral-100">
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-neutral-500" />
            <div>
              <p className="text-sm font-semibold text-neutral-900">Sound effects</p>
              <p className="text-xs text-neutral-500">Taps, correct and wrong answers</p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={on}
            onClick={() => {
              onChange({ soundOn: !on });
              if (!on) setTimeout(() => playSfx("correct"), 50);
            }}
            className={`relative w-12 h-7 rounded-full transition-colors ${on ? "bg-neutral-900" : "bg-neutral-200"}`}
          >
            <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className={`absolute top-1 w-5 h-5 rounded-full bg-white ${on ? "right-1" : "left-1"}`} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-neutral-500" />
            <div>
              <p className="text-sm font-semibold text-neutral-900">Daily goal</p>
              <p className="text-xs text-neutral-500">XP to earn each day</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {GOALS.map((g) => {
              const sel = (progress.dailyXpGoal || 50) === g;
              return (
                <button
                  key={g}
                  onClick={() => {
                    playSfx("tap");
                    onChange({ dailyXpGoal: g });
                  }}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-colors flex items-center justify-center gap-1 ${
                    sel ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"
                  }`}
                >
                  {sel && <Check className="w-3.5 h-3.5" />}
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3">
            <HardDrive className="w-5 h-5 text-neutral-500" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900">Your data</p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Progress starts at zero and is saved on this device automatically. It never needs internet.
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-neutral-50 p-3 text-[11px] font-mono text-neutral-500 break-all leading-relaxed">
            {isNative()
              ? path ?? `Android/data/com.pinora.app/files/${PROGRESS_FILE}`
              : "Browser storage (the Android app also saves a file in its app folder)"}
          </div>
        </div>

        <div className="p-5">
          <button
            onClick={() => {
              if (window.confirm("Erase all progress and start again from zero?")) onReset();
            }}
            className="flex items-center gap-3 text-red-600 text-sm font-medium active:opacity-60"
          >
            <Trash2 className="w-5 h-5" /> Reset all progress
          </button>
        </div>
      </div>
    </motion.div>
  );
}
