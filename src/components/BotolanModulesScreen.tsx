import React, { useMemo, useState } from "react";
import { ChevronDown, Search, Volume2 } from "lucide-react";
import PageHeader from "./ui/PageHeader";
import { TtsManager } from "../utils/tts";
import { Block, CourseModule, COURSE_MODULES_A } from "../data/botolanModules";
import { MODULE_6 } from "../data/botolanModule6";

const MODULES: CourseModule[] = [...COURSE_MODULES_A, MODULE_6];

function blockText(b: Block): string {
  switch (b.t) {
    case "p":
    case "h":
    case "note":
      return b.text;
    case "list":
      return b.items.join(" ");
    case "table":
      return [...b.headers, ...b.rows.flat()].join(" ");
    case "terms":
      return b.items.map((i) => `${i.term} ${i.meaning} ${i.note || ""}`).join(" ");
    case "sentences":
      return b.items.map((i) => `${i.sambal} ${i.english} ${i.note || ""}`).join(" ");
  }
}

function Speak({ text }: { text: string }) {
  return (
    <button
      onClick={() => TtsManager.speak(text)}
      className="shrink-0 w-9 h-9 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center active:scale-90 transition-transform"
      aria-label={`Play ${text}`}
    >
      <Volume2 className="w-4 h-4" />
    </button>
  );
}

function RenderBlock({ b, audio }: { b: Block; audio?: boolean }): React.ReactElement | null {
  switch (b.t) {
    case "p":
      return <p className="text-sm leading-relaxed text-neutral-700">{b.text}</p>;
    case "h":
      return <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-900 pt-2">{b.text}</h4>;
    case "note":
      return (
        <p className="text-xs leading-relaxed text-neutral-800 bg-neutral-100 border border-transparent rounded-xl px-3 py-2">
          {b.text}
        </p>
      );
    case "list":
      return (
        <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-neutral-700">
          {b.items.map((it, i) => (
            <li key={i} className="break-words">{it}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto border border-neutral-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50">
              <tr>
                {b.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 font-bold text-neutral-800 border-b border-neutral-200 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri} className="border-b border-neutral-100 last:border-0">
                  {r.map((c, ci) => (
                    <td key={ci} className={`px-3 py-2 align-top text-neutral-700 ${ci === 0 ? "font-semibold" : ""}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "terms":
      return (
        <div className="space-y-2">
          {b.items.map((it, i) => (
            <div key={i} className="border border-neutral-200 rounded-xl px-3 py-2 bg-white flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-bold text-neutral-900 font-display">{it.term}</div>
                <div className="text-sm text-neutral-700 leading-relaxed">{it.meaning}</div>
                {it.note && <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{it.note}</div>}
              </div>
              {audio && !/\s/.test(it.term) && <Speak text={it.term} />}
            </div>
          ))}
        </div>
      );
    case "sentences":
      return (
        <div className="space-y-2">
          {b.items.map((it, i) => (
            <div key={i} className="border-l-2 border-neutral-900 pl-3 py-1 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-neutral-900 italic">{it.sambal}</div>
                <div className="text-sm text-neutral-600">{it.english}</div>
                {it.note && <div className="text-xs text-neutral-400">{it.note}</div>}
              </div>
              <Speak text={it.sambal} />
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function BotolanModulesScreen({ onBackToHome }: { key?: string; onBackToHome: () => void }) {
  const [moduleId, setModuleId] = useState(MODULES[1].id);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const mod = MODULES.find((m) => m.id === moduleId) || MODULES[0];
  const q = query.trim().toLowerCase();

  const sections = useMemo(() => {
    if (!q) return mod.sections;
    return mod.sections.filter(
      (s) => s.title.toLowerCase().includes(q) || s.blocks.some((b) => blockText(b).toLowerCase().includes(q))
    );
  }, [mod, q]);

  return (
    <div className="space-y-6" id="botolan-modules-screen">
      <PageHeader title="Culture" subtitle="Botolan history, IKSPs, language and people (Modules 4 to 6)." />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setModuleId(m.id)}
            className={`px-4 py-2 rounded-xl border text-xs font-bold whitespace-nowrap ${
              m.id === moduleId
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
            }`}
          >
            {m.label}: {m.title}
          </button>
        ))}
      </div>

      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">
          {mod.code} · {mod.semester}
        </div>
        <div className="text-sm font-bold text-neutral-900">{mod.lesson}</div>
        <div className="text-xs font-bold text-neutral-700 pt-1">At the end of the session, the student will be able to:</div>
        <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
          {mod.objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search this module (e.g. hikayi, anito, Kainomayan)"
          className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400"
        />
      </div>

      <div className="space-y-3">
        {sections.length === 0 && <p className="text-sm text-neutral-500">No sections match your search.</p>}
        {sections.map((s) => {
          const isOpen = q ? true : !!open[s.id];
          return (
            <div key={s.id} className="border border-neutral-200 rounded-xl bg-white">
              <button
                onClick={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span className="text-sm font-bold text-neutral-900">{s.title}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-neutral-100 pt-3">
                  {s.blocks.map((b, i) => (
                    <React.Fragment key={i}>
                      {RenderBlock({ b, audio: mod.id === "module-5" })}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
