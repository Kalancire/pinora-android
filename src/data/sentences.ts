import { GRAMMAR_SECTIONS } from "./sambalGuideData";
import { COURSE_MODULES_A } from "./botolanModules";

export interface SentenceItem {
  id: string;
  sambal: string;
  english: string;
  filipino?: string;
  source: string;
}

/** Every full Sambal sentence that appears in the course modules or the 2017 guide, with its translation. */
function build(): SentenceItem[] {
  const out: SentenceItem[] = [];
  const seen = new Set<string>();
  const push = (sambal: string, english: string, source: string, filipino?: string) => {
    const s = sambal.trim();
    if (!s || seen.has(s.toLowerCase())) return;
    seen.add(s.toLowerCase());
    out.push({ id: `s${out.length + 1}`, sambal: s, english: english.trim(), filipino, source });
  };

  // Module 5 sentences (case-marking examples and the 25 example sentences)
  const m5 = COURSE_MODULES_A.find((m) => m.id === "module-5");
  m5?.sections.forEach((sec) => {
    if (sec.id !== "m5-case" && sec.id !== "m5-sentences") return;
    sec.blocks.forEach((b) => {
      if (b.t === "sentences") b.items.forEach((i) => push(i.sambal, i.english, "Module 5"));
    });
  });

  // 2017 guide examples that are single sentences
  GRAMMAR_SECTIONS.forEach((sec) =>
    sec.examples.forEach((e) => {
      if (e.sentence.includes(" / ") || e.sentence.includes(",") && e.sentence.split(",").length > 2) return;
      if (!/[.?!]$/.test(e.sentence.trim())) return;
      push(e.sentence, e.english, "2017 guide", e.filipino);
    })
  );
  return out;
}

export const SENTENCES: SentenceItem[] = build();
