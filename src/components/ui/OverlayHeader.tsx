import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useT } from "../../lib/i18n";

export default function OverlayHeader({ title, subtitle, onBack, right }: { title: string; subtitle?: string; onBack: () => void; right?: React.ReactNode }) {
  const t = useT();
  return (
    <div className="space-y-3">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-neutral-500 active:opacity-60" aria-label={t("common.back")}>
        <ArrowLeft className="w-4 h-4" /> {t("common.back")}
      </button>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-neutral-900">{title}</h1>
          {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
        </div>
        {right}
      </motion.div>
    </div>
  );
}
