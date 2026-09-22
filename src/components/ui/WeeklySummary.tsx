import React, { useMemo } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { UserProgress } from "../../types";
import { addDays, dayKey, wordsLearnedSet } from "../../lib/progress";
import { useT } from "../../lib/i18n";

export default function WeeklySummary({ progress }: { progress: UserProgress }) {
  const t = useT();
  const s = useMemo(() => {
    const map = new Map((progress.xpHistory || []).map((h) => [h.date, h.xp]));
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      const key = dayKey(d);
      return { key, xp: map.get(key) ?? 0, label: d.toLocaleDateString("en-US", { weekday: "narrow" }) };
    });
    const prev = days.slice(0, 7);
    const cur = days.slice(7);
    const sum = (a: typeof cur) => a.reduce((x, y) => x + y.xp, 0);
    const best = [...cur].sort((a, b) => b.xp - a.xp)[0];
    return {
      cur, xp: sum(cur), prevXp: sum(prev), active: cur.filter((d) => d.xp > 0).length,
      best: best.xp > 0 ? best : null,
      words: wordsLearnedSet(progress, addDays(-6)).size,
      max: Math.max(1, ...cur.map((d) => d.xp)),
    };
  }, [progress]);

  const delta = s.xp - s.prevXp;
  const Trend = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/70 p-5">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-sm font-semibold text-neutral-900">{t("home.week")}</p>
        <p className="text-xs text-neutral-500 flex items-center gap-1">
          <Trend className="w-3.5 h-3.5" /> {delta > 0 ? "+" : ""}{delta} XP {t("home.vsLast")}
        </p>
      </div>
      <div className="flex items-end justify-between gap-2 h-16 mb-3">
        {s.cur.map((d, i) => (
          <div key={d.key} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <motion.div initial={{ height: 0 }} animate={{ height: `${Math.max(6, (d.xp / s.max) * 100)}%` }} transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`w-full rounded-md ${d.xp > 0 ? "bg-orange-400" : "bg-neutral-100"}`} />
            <span className="text-[10px] text-neutral-400">{d.label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-100">
        <div><p className="text-lg font-semibold tabular-nums">{s.xp}</p><p className="text-[11px] text-neutral-400">XP</p></div>
        <div><p className="text-lg font-semibold tabular-nums">{s.active}/7</p><p className="text-[11px] text-neutral-400">{t("home.activeDays")}</p></div>
        <div><p className="text-lg font-semibold tabular-nums">{s.words}</p><p className="text-[11px] text-neutral-400">{t("home.newWords")}</p></div>
      </div>
      {s.best && (
        <p className="text-xs text-neutral-400 mt-3">
          {t("home.bestDay")}: {new Date(s.best.key + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" })} ({s.best.xp} XP)
        </p>
      )}
    </div>
  );
}
