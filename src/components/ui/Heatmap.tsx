import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { dayKey } from "../../lib/progress";

const WEEKS = 18;
const SHADES = ["bg-neutral-100", "bg-orange-200", "bg-orange-300", "bg-orange-400", "bg-orange-600"];

function level(xp: number) {
  if (xp <= 0) return 0;
  if (xp < 20) return 1;
  if (xp < 50) return 2;
  if (xp < 100) return 3;
  return 4;
}

/** GitHub-style activity heatmap: one square per day, shade = XP earned that day. */
export default function Heatmap({ history }: { history: { date: string; xp: number }[] }) {
  const [picked, setPicked] = useState<{ date: string; xp: number } | null>(null);

  const { cells, months, activeDays, total } = useMemo(() => {
    const byDay = new Map(history.map((h) => [h.date, h.xp]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // grid ends on this week's Saturday; columns are weeks, rows are Sun..Sat
    const end = new Date(today);
    end.setDate(end.getDate() + (6 - end.getDay()));
    const start = new Date(end);
    start.setDate(start.getDate() - (WEEKS * 7 - 1));

    const out: { date: string; xp: number; future: boolean }[] = [];
    let active = 0;
    let sum = 0;
    for (let i = 0; i < WEEKS * 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = dayKey(d);
      const xp = byDay.get(key) ?? 0;
      const future = d > today;
      if (!future && xp > 0) {
        active++;
        sum += xp;
      }
      out.push({ date: key, xp, future });
    }
    const monthLabels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    for (let w = 0; w < WEEKS; w++) {
      const d = new Date(start);
      d.setDate(start.getDate() + w * 7);
      if (d.getMonth() !== lastMonth) {
        monthLabels.push({ col: w, label: d.toLocaleDateString("en-US", { month: "short" }) });
        lastMonth = d.getMonth();
      }
    }
    return { cells: out, months: monthLabels, activeDays: active, total: sum };
  }, [history]);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-sm font-semibold text-neutral-900">Activity</p>
        <p className="text-xs text-neutral-500">
          {activeDays} active {activeDays === 1 ? "day" : "days"} · {total} XP
        </p>
      </div>

      <div className="grid gap-[3px] mb-1.5" style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}>
        {Array.from({ length: WEEKS }).map((_, w) => {
          const m = months.find((x) => x.col === w);
          return (
            <span key={w} className="text-[10px] leading-none text-neutral-400 whitespace-nowrap overflow-visible">
              {m?.label ?? ""}
            </span>
          );
        })}
      </div>

      <div
        className="grid gap-[3px] grid-flow-col"
        style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
        role="img"
        aria-label="Activity heatmap for the last 18 weeks"
      >
        {cells.map((c, i) => (
          <motion.button
            key={c.date}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(i * 0.004, 0.5), type: "spring", stiffness: 380, damping: 24 }}
            onClick={() => !c.future && setPicked({ date: c.date, xp: c.xp })}
            disabled={c.future}
            aria-label={`${c.date}: ${c.xp} XP`}
            className={`aspect-square rounded-[4px] ${c.future ? "bg-transparent" : SHADES[level(c.xp)]} ${
              picked?.date === c.date ? "ring-2 ring-neutral-900 ring-offset-1" : ""
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 min-h-[20px]">
        <p className="text-xs text-neutral-500">
          {picked
            ? `${new Date(picked.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}: ${picked.xp} XP`
            : "Tap a day to see its XP"}
        </p>
        <div className="flex items-center gap-1 text-[10px] text-neutral-400">
          Less
          {SHADES.map((s) => (
            <span key={s} className={`w-2.5 h-2.5 rounded-[3px] ${s}`} />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
