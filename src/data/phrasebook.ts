import { SENTENCES, SentenceItem } from "./sentences";

/**
 * Phrases grouped by situation. Every Sambal sentence comes from the course modules
 * or the 2017 guide, so nothing here is invented. Market, clinic and other everyday
 * situations are not covered yet because the sources do not contain those phrases.
 */
export interface Situation {
  id: string;
  title: string;
  titleFil: string;
  icon: string;
  sentences: string[];
}

export const SITUATIONS: Situation[] = [
  {
    id: "meeting",
    title: "Meeting someone",
    titleFil: "Pakikipagkilala",
    icon: "hand",
    sentences: ["Anya ya ngalan mo?", "Hiko ay taga-Zambales.", "Ayri ka ampa-iri?", "Hino ya nanay mo?"],
  },
  {
    id: "going",
    title: "Going places",
    titleFil: "Pupunta sa lugar",
    icon: "route",
    sentences: ["Ayri ka mako?", "Makano ka murong?", "Mako ta ha balah.", "Mita tamo na!", "Ayri ka mako, hika?"],
  },
  {
    id: "food",
    title: "Food and cooking",
    titleFil: "Pagkain at pagluluto",
    icon: "food",
    sentences: ["Pangno ka ampanluto kanen?", "Nangan ya anak nin kanen.", "Kinan nin anak ya kanen.", "Nangan ya bake nin ha-a.", "Kinan ni Toto ya human."],
  },
  {
    id: "home",
    title: "Home and family",
    titleFil: "Bahay at pamilya",
    icon: "home",
    sentences: ["Bali nawen ya bayri.", "Malhay ya bali nin lalaki.", "Ayin di ya nanay na.", "Inggawa ni Toto ya bulaklak koni Nini."],
  },
  {
    id: "daily",
    title: "Daily life",
    titleFil: "Araw-araw na buhay",
    icon: "sun",
    sentences: ["Agko nakakatoloy nayabi.", "Hay ganda nin babayi!", "Nowayo yaynan nowayo angga ha nibarak ya.", "Ikabayombokah, nabiglà hila.", "Halita-en moyo kongko no makano kawo mako ha istit."],
  },
  {
    id: "nature",
    title: "Nature and farm",
    titleFil: "Kalikasan at bukid",
    icon: "leaf",
    sentences: ["Malawang ya bakil.", "Itanem ta bayti ya hangì nin ha-a.", "Ahè pinati nin tawo ya damowag ko.", "Hay ta-en ay an-et-eten nin bakì.", "Habayti ya otan ay ma-in pitoy oloy kapapalimo."],
  },
];

export function phrasesFor(s: Situation): SentenceItem[] {
  return s.sentences.map((t) => SENTENCES.find((x) => x.sambal.toLowerCase() === t.toLowerCase())).filter(Boolean) as SentenceItem[];
}

export const ALL_PHRASES: SentenceItem[] = SITUATIONS.flatMap(phrasesFor);
