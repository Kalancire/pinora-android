import React, { useState } from "react";
import { motion } from "motion/react";
import { UserProgress } from "../types";
import { useT } from "../lib/i18n";
import PageHeader from "./ui/PageHeader";
import BotolanModulesScreen from "./BotolanModulesScreen";
import PlacesScreen from "./PlacesScreen";
import VoicesScreen from "./VoicesScreen";

interface Props {
  key?: string;
  progress: UserProgress;
  update: (fn: (p: UserProgress) => UserProgress) => void;
}

export default function CultureScreen({ progress, update }: Props) {
  const t = useT();
  const [tab, setTab] = useState<"modules" | "places" | "voices">("modules");
  const tabs = [
    { id: "modules", label: t("cul.modules") },
    { id: "places", label: t("cul.places") },
    { id: "voices", label: t("cul.voices") },
  ] as const;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
      <PageHeader title={t("nav.culture")} subtitle="Botolan history, language, places and voices." />
      <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-neutral-100 rounded-2xl">
        {tabs.map((x) => (
          <button key={x.id} onClick={() => setTab(x.id)} className="relative py-2.5 rounded-xl text-sm font-medium outline-none">
            {tab === x.id && <motion.span layoutId="culture-tab" className="absolute inset-0 bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)]" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <span className={`relative ${tab === x.id ? "text-neutral-900" : "text-neutral-500"}`}>{x.label}</span>
          </button>
        ))}
      </div>
      {tab === "modules" && <BotolanModulesScreen embedded progress={progress} update={update} onBackToHome={() => {}} />}
      {tab === "places" && <PlacesScreen />}
      {tab === "voices" && <VoicesScreen progress={progress} update={update} />}
    </motion.div>
  );
}
