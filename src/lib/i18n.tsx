import React, { createContext, useContext } from "react";

type Lang = "en" | "fil";

const EN: Record<string, string> = {
  "nav.home": "Home", "nav.learn": "Learn", "nav.dictionary": "Dictionary", "nav.stories": "Stories", "nav.guide": "Spelling guide", "nav.culture": "Culture",
  "home.level": "Level", "home.toNext": "XP to level", "home.streak": "Streak", "home.words": "Words", "home.lessons": "Lessons",
  "home.day": "day", "home.days": "days", "home.learned": "learned", "home.done": "done",
  "home.goal": "Daily goal", "home.goalToday": "XP today", "home.goalMet": "Goal reached. Nice work.", "home.goalHint": "Finish a lesson to fill the ring.",
  "home.start": "Start learning", "home.continue": "Continue", "home.badges": "Badges", "home.wotd": "Word of the day", "home.week": "This week",
  "home.vsLast": "vs last week", "home.activeDays": "Active days", "home.bestDay": "Best day", "home.newWords": "New words",
  "home.share": "Share", "home.shareStreak": "Share my streak",
  "learn.title": "Learn", "learn.sub": "Pick a language and follow the path.", "learn.practice": "Practice", "learn.review": "Review",
  "learn.due": "due", "learn.sentences": "Sentences", "learn.phrasebook": "Phrasebook", "learn.speak": "Speak", "learn.placement": "Placement quiz",
  "learn.lessons": "Lessons", "learn.suggested": "Suggested", "learn.reviewMistakes": "Review mistakes", "learn.wordsToPractice": "words to practice", "learn.words": "words",
  "set.title": "Settings", "set.sound": "Sound effects", "set.soundSub": "Taps, correct and wrong answers", "set.goal": "Daily goal", "set.goalSub": "XP to earn each day",
  "set.language": "App language", "set.reminder": "Daily reminder", "set.reminderSub": "A gentle nudge to practise", "set.time": "Time",
  "set.backup": "Backup", "set.export": "Export backup", "set.import": "Import backup", "set.backupSub": "Save your progress and recordings to a file, or restore them on a new phone.",
  "set.suggest": "Suggest a word or correction", "set.data": "Your data", "set.reset": "Reset all progress",
  "set.dataSub": "Progress starts at zero and is saved on this device automatically. It never needs internet.",
  "common.back": "Back", "common.next": "Next", "common.check": "Check", "common.done": "Done", "common.again": "Again", "common.good": "Got it",
  "common.reveal": "Tap to reveal", "common.listen": "Listen", "common.record": "Record", "common.stop": "Stop", "common.play": "Play", "common.delete": "Delete",
  "common.save": "Save", "common.share": "Share", "common.cancel": "Cancel", "common.start": "Start",
  "review.title": "Review", "review.empty": "Nothing due right now", "review.emptySub": "Finish lessons or favourite words to build your review deck.", "review.finish": "Session complete",
  "sb.title": "Sentence builder", "sb.sub": "Tap the words in the right order.", "sb.correct": "Correct", "sb.wrong": "Not quite. Try again.",
  "pb.title": "Phrasebook", "pb.sub": "Sentences checked against your course modules and the 2017 guide.",
  "sp.title": "Speak", "sp.sub": "Listen, repeat, then compare your voice.", "sp.you": "Your voice", "sp.native": "Recorded speaker",
  "pl.title": "Placement quiz", "pl.sub": "10 quick questions to find your starting lesson.", "pl.result": "Start from",
  "cul.modules": "Modules", "cul.places": "Places", "cul.voices": "Voices", "cul.markRead": "Mark as read", "cul.read": "Read",
  "dict.favorites": "Favorites", "dict.all": "All", "dict.scan": "1968 dictionary", "dict.app": "App words",
  "sug.title": "Suggest a word", "sug.sub": "Saved on this device. Export and send to the team when you are ready.",
};

const FIL: Record<string, string> = {
  "nav.home": "Home", "nav.learn": "Aralin", "nav.dictionary": "Diksyunaryo", "nav.stories": "Kuwento", "nav.guide": "Gabay sa baybay", "nav.culture": "Kultura",
  "home.level": "Antas", "home.toNext": "XP para sa antas", "home.streak": "Tuloy-tuloy", "home.words": "Salita", "home.lessons": "Aralin",
  "home.day": "araw", "home.days": "araw", "home.learned": "natutunan", "home.done": "tapos",
  "home.goal": "Layunin ngayong araw", "home.goalToday": "XP ngayon", "home.goalMet": "Naabot mo na. Galing!", "home.goalHint": "Tapusin ang isang aralin para mapuno ang bilog.",
  "home.start": "Simulan ang pag-aaral", "home.continue": "Ipagpatuloy", "home.badges": "Mga badge", "home.wotd": "Salita ng araw", "home.week": "Ngayong linggo",
  "home.vsLast": "kumpara sa nakaraang linggo", "home.activeDays": "Araw na aktibo", "home.bestDay": "Pinakamahusay na araw", "home.newWords": "Bagong salita",
  "home.share": "I-share", "home.shareStreak": "I-share ang streak ko",
  "learn.title": "Aralin", "learn.sub": "Pumili ng wika at sundan ang daan.", "learn.practice": "Pagsasanay", "learn.review": "Balik-aral",
  "learn.due": "dapat balikan", "learn.sentences": "Mga pangungusap", "learn.phrasebook": "Aklat ng parirala", "learn.speak": "Magsalita", "learn.placement": "Panimulang pagsusulit",
  "learn.lessons": "Mga aralin", "learn.suggested": "Iminumungkahi", "learn.reviewMistakes": "Balikan ang mga mali", "learn.wordsToPractice": "salitang sasanayin", "learn.words": "salita",
  "set.title": "Mga setting", "set.sound": "Tunog", "set.soundSub": "Pindot, tama at maling sagot", "set.goal": "Layunin bawat araw", "set.goalSub": "XP na kikitain bawat araw",
  "set.language": "Wika ng app", "set.reminder": "Pang-araw-araw na paalala", "set.reminderSub": "Banayad na paalala para magsanay", "set.time": "Oras",
  "set.backup": "Backup", "set.export": "I-export ang backup", "set.import": "I-import ang backup", "set.backupSub": "I-save ang progreso at mga recording sa isang file, o ibalik ito sa bagong telepono.",
  "set.suggest": "Magmungkahi ng salita o pagwawasto", "set.data": "Iyong data", "set.reset": "I-reset ang lahat ng progreso",
  "set.dataSub": "Nagsisimula sa zero ang progreso at kusang nase-save sa device na ito. Hindi kailangan ng internet.",
  "common.back": "Bumalik", "common.next": "Susunod", "common.check": "Suriin", "common.done": "Tapos", "common.again": "Ulit", "common.good": "Alam ko",
  "common.reveal": "Pindutin para ipakita", "common.listen": "Pakinggan", "common.record": "Mag-record", "common.stop": "Ihinto", "common.play": "I-play", "common.delete": "Burahin",
  "common.save": "I-save", "common.share": "I-share", "common.cancel": "Kanselahin", "common.start": "Simulan",
  "review.title": "Balik-aral", "review.empty": "Wala pang dapat balikan", "review.emptySub": "Tapusin ang mga aralin o mag-favorite ng salita para mabuo ang deck mo.", "review.finish": "Tapos na ang sesyon",
  "sb.title": "Tagabuo ng pangungusap", "sb.sub": "Pindutin ang mga salita ayon sa tamang pagkakasunod.", "sb.correct": "Tama", "sb.wrong": "Hindi pa tama. Subukan ulit.",
  "pb.title": "Aklat ng parirala", "pb.sub": "Mga pangungusap na galing sa mga module ninyo at sa gabay ng 2017.",
  "sp.title": "Magsalita", "sp.sub": "Making, ulitin, at ihambing ang boses mo.", "sp.you": "Boses mo", "sp.native": "Naka-record na tagapagsalita",
  "pl.title": "Panimulang pagsusulit", "pl.sub": "10 mabilis na tanong para malaman kung saan magsisimula.", "pl.result": "Magsimula sa",
  "cul.modules": "Mga module", "cul.places": "Mga lugar", "cul.voices": "Mga boses", "cul.markRead": "Markahang nabasa na", "cul.read": "Nabasa na",
  "dict.favorites": "Mga paborito", "dict.all": "Lahat", "dict.scan": "Diksyunaryo ng 1968", "dict.app": "Mga salita sa app",
  "sug.title": "Magmungkahi ng salita", "sug.sub": "Naka-save sa device na ito. I-export at ipadala kapag handa ka na.",
};

const Ctx = createContext<(k: string) => string>((k) => EN[k] ?? k);

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = React.useCallback((k: string) => (lang === "fil" ? FIL[k] ?? EN[k] ?? k : EN[k] ?? k), [lang]);
  return <Ctx.Provider value={t}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx);
