import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ChevronDown, Mountain, Landmark, Compass, PawPrint, Church } from "lucide-react";
import { PLACES, MORE_PLACES, Place } from "../data/places";

const KIND: Record<Place["kind"], { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  nature: { label: "Nature", Icon: Mountain },
  history: { label: "History", Icon: Landmark },
  adventure: { label: "Adventure", Icon: Compass },
  wildlife: { label: "Wildlife", Icon: PawPrint },
  faith: { label: "Faith", Icon: Church },
};

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function PlacesScreen() {
  const [kind, setKind] = useState<Place["kind"] | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const list = PLACES.filter((p) => kind === "all" || p.kind === kind);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {(["all", ...Object.keys(KIND)] as const).map((k) => (
          <button key={k} onClick={() => setKind(k as any)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border ${kind === k ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200"}`}>
            {k === "all" ? "All" : KIND[k as Place["kind"]].label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((p, i) => {
          const I = KIND[p.kind].Icon;
          const isOpen = open === p.id;
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-neutral-200/70 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : p.id)} className="w-full flex items-center gap-4 p-4 text-left">
                <span className="w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center shrink-0"><I className="w-5 h-5 text-neutral-700" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-neutral-900">{p.name}</span>
                  <span className="block text-xs text-neutral-500 mt-0.5 line-clamp-2">{p.summary}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-3 border-t border-neutral-100 pt-3">
                      <p className="text-sm text-neutral-700 leading-relaxed">{p.summary}</p>
                      {p.facts.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600 leading-relaxed">{p.facts.map((f, k) => <li key={k}>{f}</li>)}</ul>
                      )}
                      <a href={maps(p.query)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5" /> Open in Maps
                      </a>
                      <p className="text-[10px] text-neutral-400">Opens your map app. Needs internet.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {kind === "all" && (
        <div className="bg-white rounded-2xl border border-neutral-200/70 p-4">
          <p className="text-sm font-semibold text-neutral-900 mb-1">Also named in Module 6</p>
          <p className="text-xs text-neutral-400 mb-3">The module lists these without a description.</p>
          <div className="flex flex-wrap gap-2">
            {MORE_PLACES.map((n) => (
              <a key={n} href={maps(n + " Botolan Zambales")} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full bg-neutral-100 text-xs text-neutral-700">{n}</a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
