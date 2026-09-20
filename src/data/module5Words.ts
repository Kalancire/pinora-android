import { Word, Lesson } from "../types";

/**
 * Botolan Sambal vocabulary taken from the PCB "Botolan History and Culture"
 * modules (Module 4 IKSPs, Module 5 IP Language and Literature, Module 6
 * Prominent Botolenos & Places).
 *
 * Spelling: Module 5 data comes from Antworth (1979), which writes /u/ as "o".
 * Words are given exactly as Module 5 writes them.
 */

let nextId = 1000;
const add = (
  word: string,
  meaning: string,
  pronunciation: string,
  category: string,
  extra: { variant?: string; note?: string; source?: string } = {}
): Word => ({
  wordId: ++nextId,
  languageId: 1,
  word,
  meaning,
  pronunciation,
  category,
  source: "Module 5",
  ...extra,
});

/* ---------- Pronouns ---------- */
const P = "Pronouns";
const pronounsFull: Word[] = [
  add("Hitamo", "We (you and I and others; 1+2 plural)", "hi-ta-mo", P, { note: "Full nominative. Minimal: tamo. Genitive: tamo. Oblique: kontamo." }),
  add("Hikawo", "You (plural)", "hi-ka-wo", P, { note: "Full nominative. Minimal: kawo. Genitive: moyo, yo. Oblique: komoyo." }),
];

const pronounsShort: Word[] = [
  add("Ko / -ako", "I (short form); my / by me", "ko / a-ko", P, { note: "Minimal nominative and genitive. -ako occurs after consonants, -ko after vowels." }),
  add("Ta", "We (you and I; short form)", "ta", P, { note: "Minimal nominative and genitive of hita." }),
  add("Ka", "You (short form)", "ka", P, { note: "Minimal nominative of hika." }),
  add("Mo", "Your / by you", "mo", P, { note: "Genitive of the 2nd person singular." }),
  add("Ya", "He / she (short form)", "ya", P, { note: "Minimal nominative of hiya." }),
  add("Na", "His / her / by him or her", "na", P, { note: "Genitive of the 3rd person singular." }),
  add("Kayi", "We (excluding you; short form)", "ka-yi", P, { note: "Minimal nominative of hikayi." }),
  add("Nawen", "Our / by us (excluding you)", "na-wen", P, { note: "Genitive of the 1st person plural." }),
  add("Tamo", "We (1+2 plural; short form / genitive)", "ta-mo", P),
  add("Kawo", "You (plural; short form)", "ka-wo", P, { note: "Minimal nominative of hikawo." }),
  add("Moyo / Yo", "Your (plural) / by you (plural)", "mo-yo / yo", P, { note: "Genitive of the 2nd person plural." }),
  add("La", "Their / by them", "la", P, { note: "Genitive of the 3rd person plural. The nominative (full and minimal) is hila." }),
];

const pronounsOblique: Word[] = [
  add("Kongko", "To me", "kong-ko", P, { note: "Oblique of hiko. Example: Nambih hi Juan nin litrato kongko = Juan gave a picture to me." }),
  add("Konta", "To us (you and me)", "kon-ta", P),
  add("Komo", "To you", "ko-mo", P),
  add("Kona", "To him / her", "ko-na", P),
  add("Konnawen", "To us (excluding you)", "kon-na-wen", P),
  add("Kontamo", "To us (1+2 plural)", "kon-ta-mo", P),
  add("Komoyo", "To you (plural)", "ko-mo-yo", P),
  add("Konla", "To them", "kon-la", P),
  add("Kata", "I to you", "ka-ta", P, { note: "Fused pronoun from ko + ka." }),
  add("Katawo", "I to you (plural)", "ka-ta-wo", P, { note: "Fused pronoun from ko + kawo." }),
];

/* ---------- Numbers ---------- */
const N = "Numbers";
const numbersBig: Word[] = [
  add("Labimmiha", "Eleven", "la-bim-mi-ha", N),
  add("Labinlowa", "Twelve", "la-bin-lo-wa", N),
  add("Lowampò", "Twenty", "lo-wam-po", N, { note: "The 2017 guide's letter list writes luwampu (twenty)." }),
  add("Tatlompò", "Thirty", "tat-lom-po", N),
  add("Magato", "One hundred", "ma-ga-to", N),
  add("Lowanggato", "Two hundred", "lo-wang-ga-to", N),
  add("Libo", "One thousand", "li-bo", N),
];

const numberForms: Word[] = [
  add("Primiro / Primira / Ona", "First (ordinal)", "pri-mi-ro / pri-mi-ra / o-na", N, { note: "Ordinal of 1 (cardinal: miha)." }),
  add("Ikalowa", "Second (ordinal)", "i-ka-lo-wa", N),
  add("Ikatatlo", "Third (ordinal)", "i-ka-tat-lo", N),
  add("Ti-iha", "One each (distributive)", "ti-i-ha", N),
  add("Tilowa", "Two each (distributive)", "ti-lo-wa", N),
  add("Titatlo", "Three each (distributive)", "ti-tat-lo", N),
  add("Mimiha", "Only one (restrictive)", "mi-mi-ha", N),
  add("Lolowa", "Only two (restrictive)", "lo-lo-wa", N),
  add("Tatatlo", "Only three (restrictive)", "ta-tat-lo", N),
  add("Mihamiha / Mani-iha", "One by one, one at a time (grouping)", "mi-ha-mi-ha / ma-ni-i-ha", N),
  add("Lowalowa / Manilowa", "Two by two (grouping)", "lo-wa-lo-wa / ma-ni-lo-wa", N),
  add("Tatlotatlo / Manitatlo", "Three by three (grouping)", "tat-lo-tat-lo / ma-ni-tat-lo", N),
];

/* ---------- Question words ---------- */
const Q = "Questions";
const questions: Word[] = [
  add("Nakano", "When (past)", "na-ka-no", Q, { note: "Makano is 'when' in the future." }),
  add("Antà", "Why", "an-ta", Q),
  add("Ongno", "How many / how much", "ong-no", Q, { note: "The 2017 guide writes ungno / mani ungno." }),
  add("Komosta", "How (quality)", "ko-mos-ta", Q, { note: "From Spanish (como esta)." }),
  add("Anyaman", "Whatever, anything", "an-ya-man", Q, { note: "Indefinite pronoun." }),
  add("Hinoman", "Whoever, anybody", "hi-no-man", Q, { note: "Indefinite pronoun." }),
  add("Ayripaman", "Wherever", "ay-ri-pa-man", Q, { note: "Indefinite pronoun." }),
];

/* ---------- Demonstratives ---------- */
const D = "Demonstratives";
const demonstratives: Word[] = [
  add("Habayti / Hati", "This (full nominative)", "ha-bay-ti / ha-ti", D, { note: "Minimal: bayti, yati. Genitive: nin habayti, nin hati. Oblique: bayri, di." }),
  add("Haba-in / Ha-in", "That (medial; full nominative)", "ha-ba-in / ha-in", D, { note: "Minimal: ba-in, ya-in. Genitive: nin haba-in, nin ha-in. Oblique: bahen, hen." }),
  add("Habayto / Hato", "That (distal; full nominative)", "ha-bay-to / ha-to", D, { note: "Minimal: bayto, yato. Genitive: nin habayto, nin hato. Oblique: bayro, do." }),
  add("Bayri / Di", "Here (oblique of 'this')", "bay-ri / di", D),
  add("Bahen / Hen", "There (oblique of 'that', medial)", "ba-hen / hen", D, { note: "Example: Ayin ya hen = He is not there." }),
  add("Bayro / Do", "Over there (oblique of 'that', distal)", "bay-ro / do", D),
];

/* ---------- Grammar words ---------- */
const G = "Grammar Words";
const grammar: Word[] = [
  add("Hay", "The (nonpersonal nominative marker, full form)", "hay", G, { note: "Example: Hay ganda nin babayi! = How beautiful the woman is!" }),
  add("Ya", "The (nonpersonal nominative marker, minimal form)", "ya", G, { note: "Example: Namti ya lalaki nin baboy = The man killed a pig. Also serves as a linker." }),
  add("Nin", "Of / a (nonpersonal genitive marker)", "nin", G),
  add("Ha", "To / at / on (nonpersonal oblique marker)", "ha", G, { note: "Example: Mako ta ha balah = Let's go to the river." }),
  add("Hi", "The (personal singular nominative marker)", "hi", G, { note: "Used before names: Namati hi Juan nin baboy = Juan killed a pig." }),
  add("Ni", "Of (personal singular genitive marker)", "ni", G),
  add("Koni", "To (personal singular oblique marker)", "ko-ni", G),
  add("Hili", "The (personal plural nominative marker)", "hi-li", G),
  add("Nili", "Of (personal plural genitive marker)", "ni-li", G),
  add("Konli", "To (personal plural oblique marker)", "kon-li", G),
  add("Ay", "Inverse marker", "ay", G, { note: "Example: Hay ta-en ay an-et-eten nin baki = The rat is chewing the trap." }),
  add("Ya / -y", "Linker (joins a describing word to a noun)", "ya", G, { note: "Examples: malakè ya alahas = much jewelry; tatlo-y mipapatel = 3 siblings." }),
  add("Boy", "And", "boy", G),
  add("O", "Or", "o", G),
  add("Piro", "But", "pi-ro", G),
  add("Balè ta", "But", "ba-le ta", G),
  add("Ta", "Because", "ta", G),
  add("Biha", "And then", "bi-ha", G),
  add("No", "If", "no", G),
  add("Banà ta", "Because", "ba-na ta", G),
  add("Emen", "In order to", "e-men", G),
  add("Maski", "Although", "mas-ki", G),
  add("Ahè", "Not (negative)", "a-he", G, { note: "Example: Ahè pinati nin tawo ya damowag ko = The person didn't kill my water buffalo." }),
  add("Ayin", "Is not (here / there)", "a-yin", G, { note: "Examples: Ayin ya hen = He is not there. Ayin di ya nanay na = His mother is not here." }),
  add("Agko / Agmo", "I do not / don't you", "ag-ko / ag-mo", G, { note: "Examples: Agko nakakatoloy nayabi = I couldn't sleep last night. Agmo ko itapon ha lanom = Don't throw me in the water." }),
  add("Alwan", "Is not (before adjectives)", "al-wan", G, { note: "Example: Hi Elem ay alwan malhay = Elem is not large. The 2017 guide notes alwa nin = alwan." }),
];

/* ---------- Describing words ---------- */
const A = "Adjectives";
const adjectives: Word[] = [
  add("Ganda", "Beautiful", "gan-da", A, { note: "Example: Hay ganda nin babayi! = How beautiful the woman is! Plural adjective: manga-ganda." }),
  add("Malhay", "Large", "mal-hay", A),
  add("Katowà", "Ugly, bad", "ka-to-wa", A, { note: "Plural adjective: kawkatowà." }),
  add("Malakè", "Much, many", "ma-la-ke", A, { note: "Example: malakè ya alahas = much jewelry." }),
  add("Kapapalimo", "Frightening", "ka-pa-pa-li-mo", A, { note: "Example: pitoy oloy kapapalimo = seven frightening heads." }),
  add("Manga-ganda", "Beautiful (plural adjective)", "ma-nga-gan-da", A, { note: "Plural of ma- adjectives uses manga-." }),
  add("Kawkatowà", "Ugly, bad (plural adjective)", "kaw-ka-to-wa", A, { note: "Unaffixed adjectives are pluralized with Caw-." }),
];

/* ---------- Nouns from the sentences ---------- */
const NO = "Nouns";
const nouns: Word[] = [
  add("Kanen", "Rice (cooked)", "ka-nen", NO, { note: "Nangan ya anak nin kanen = The child ate some rice. The 1968 dictionary also glosses kanen as 'cooked rice'." }),
  add("Lalaki", "Man", "la-la-ki", NO),
  add("Babayi", "Woman", "ba-ba-yi", NO),
  add("Tawo", "Person", "ta-wo", NO),
  add("Baboy", "Pig", "ba-boy", NO),
  add("Libro", "Book", "li-bro", NO),
  add("Litrato", "Picture, photograph", "li-tra-to", NO),
  add("Silya", "Chair", "sil-ya", NO),
  add("Hangì", "Banana sucker (shoot)", "ha-ngi", NO, { note: "Itanem ta bayti ya hangì nin ha-a = Let's plant this banana sucker." }),
  add("Bakì", "Rat", "ba-ki", NO, { note: "Hay ta-en ay an-et-eten nin bakì = The rat is chewing the trap." }),
  add("Kawayan", "Bamboo", "ka-wa-yan", NO),
  add("Papwak", "Frog", "pap-wak", NO),
  add("Oloy", "Head(s)", "o-loy", NO, { note: "pitoy oloy = seven heads (olo + linker)." }),
  add("Lapis", "Pencil", "la-pis", NO, { note: "Plural: law-lapis." }),
  add("Dowi", "Thorn", "do-wi", NO, { note: "Plural: dawdowih." }),
  add("Alahas", "Jewelry", "a-la-has", NO),
  add("Piesta", "Fiesta", "pi-es-ta", NO),
  add("Istit", "The States (United States)", "is-tit", NO, { note: "Halita-en moyo kongko no makano kawo mako ha istit = Tell me when you are going to the States." }),
  add("Mipapatel", "Siblings", "mi-pa-pa-tel", NO, { note: "tatlo-y mipapatel = 3 siblings." }),
  add("Aw-anak", "Children", "aw-a-nak", NO, { note: "Plural of anak." }),
  add("Law-lapis", "Pencils", "law-la-pis", NO, { note: "Plural of lapis." }),
  add("Dawdowih", "Thorns", "daw-do-wih", NO, { note: "Plural of dowi." }),
  add("Aw-otan", "Snakes", "aw-o-tan", NO, { note: "Plural of otan (utan)." }),
];

/* ---------- Verbs from Module 5 sentences ---------- */
const V = "Verbs";
const verbs: Word[] = [
  add("Nangan", "Ate (active)", "na-ngan", V, { note: "Nangan ya anak nin kanen = The child ate some rice." }),
  add("Kinan", "Ate (object focus)", "ki-nan", V, { note: "Kinan nin anak ya kanen = The child ate rice." }),
  add("Namti / Namati", "Killed", "nam-ti / na-ma-ti", V, { note: "Namti ya lalaki nin baboy = The man killed a pig. Namati hi Juan nin baboy = Juan killed a pig." }),
  add("Pinati", "Killed (object focus)", "pi-na-ti", V),
  add("Patyen", "To kill (will be killed)", "pat-yen", V, { note: "Nagpatabà hi Jose nin baboy ta patyen ha piesta = Jose fattened a pig because he will kill it for the fiesta." }),
  add("Nanaliw", "Bought", "na-na-liw", V, { note: "Nanaliw hi Maria nin habayti = Maria bought some of this." }),
  add("Nambi / Nambih", "Gave", "nam-bi / nam-bih", V, { note: "Nambi hi Jose nin libro ha anak = Jose gave a book to a/the child. Module 5 also writes nambih." }),
  add("Tinomabà", "Got fat", "ti-no-ma-ba", V, { note: "Tinomabà ya baboy = The pig got fat." }),
  add("Nagpatabà", "Fattened (something)", "nag-pa-ta-ba", V),
  add("Niknò", "Sat", "nik-no", V, { note: "Niknò hi Pedro ha silya = Pedro sat on the chair." }),
  add("Inikno-an", "Was sat upon", "i-nik-no-an", V, { note: "Inikno-an ni Pedro ya silya = Pedro sat on the chair (the chair was sat upon)." }),
  add("Ampa-iri", "Living, staying", "am-pa-i-ri", V, { note: "Ayri ka ampa-iri? = Where are you living?" }),
  add("Itanem", "To plant", "i-ta-nem", V, { note: "Itanem ta bayti ya hangì nin ha-a = Let's plant this banana sucker." }),
  add("Mako", "Go (let's go)", "ma-ko", V, { note: "Mako ta ha balah = Let's go to the river." }),
  add("Nakakatoloy", "Able to sleep", "na-ka-ka-to-loy", V, { note: "Agko nakakatoloy nayabi = I couldn't sleep last night. (nayabi = last night)" }),
  add("Itapon", "To throw", "i-ta-pon", V, { note: "Agmo ko itapon ha lanom = Don't throw me in the water." }),
  add("An-et-eten", "Is chewing / gnawing", "an-et-e-ten", V, { note: "Hay ta-en ay an-et-eten nin bakì = The rat is chewing the trap." }),
  add("Halita-en", "To tell", "ha-li-ta-en", V, { note: "Halita-en moyo kongko no makano kawo mako ha istit = Tell me when you are going to the States." }),
  add("Nag-ompisa", "Began", "nag-om-pi-sa", V, { note: "Nag-ompisa ya nin toktoken ya kawayan = He began to peck the bamboo." }),
  add("Toktoken", "To peck", "tok-to-ken", V),
  add("Nowayo", "Ran", "no-wa-yo", V, { note: "Nowayo yaynan nowayo angga ha nibarak ya = He ran and ran until he fell down." }),
  add("Nibarak", "Fell down", "ni-ba-rak", V),
  add("Natinay", "Died", "na-ti-nay", V, { note: "Hay nangyari ay natinay lalaki = What happened was the man died." }),
  add("Nangyari", "Happened", "nang-ya-ri", V),
  add("Nabiglà", "Was surprised", "na-big-la", V, { note: "Ikabayombokah, nabiglà hila = The next morning they were surprised." }),
  add("Nag-in", "Became", "nag-in", V, { note: "Hapa-eg, hi Ripolyo ay nag-in katowà ya papwak = Now, Ripolyo became an ugly frog." }),
  add("Ma-in", "Had / there is", "ma-in", V, { note: "Habayti ya otan ay ma-in pitoy oloy kapapalimo = This snake had seven frightening heads." }),
];

/* ---------- Time ---------- */
const T = "Time";
const times: Word[] = [
  add("Nayabi", "Last night", "na-ya-bi", T, { note: "From yabi (night)." }),
  add("Ikabayombokah", "The next morning", "i-ka-ba-yom-bo-kah", T),
  add("Angga", "Until", "ang-ga", T, { note: "Nowayo yaynan nowayo angga ha nibarak ya = He ran and ran until he fell down." }),
];

/* ---------- Culture (Modules 4 and 6) ---------- */
const C = "Culture";
const culture: Word[] = [
  add("Gasak", "Upland swidden farm (on mountain tops or sides)", "ga-sak", C, { source: "Module 4", note: "Cultivated area where shrubs and trees have grown; most families keep one because it supplies food and shelter." }),
  add("Patal", "Flat upland farm", "pa-tal", C, { source: "Module 4", note: "Flat high ground of about 1/2 to 1.5 hectares, workable with plow and harrow." }),
  add("Lahar", "Lowland farm (riverbeds around the villages)", "la-har", C, { source: "Module 4", note: "Retains water until December and dries up by March or April." }),
  add("Pamumuso", "Gathering banana blossoms", "pa-mu-mu-so", C, { source: "Module 4", note: "Puso (stress on the first syllable) = banana blossom; pusó' = heart." }),
  add("Gugo", "Herbal shampoo (from the mountains)", "gu-go", C, { source: "Module 4" }),
  add("Bahag", "G-string", "ba-hag", C, { source: "Module 4", note: "Kept with the pana (arrow) as a cultural symbol." }),
  add("Pana", "Arrow", "pa-na", C, { source: "Module 4" }),
  add("Anito", "Nature spirit", "a-ni-to", C, { source: "Module 4", note: "Nature spirits living in specific places, especially the mountains." }),
  add("Naanito", "Possessed by an anito", "na-a-ni-to", C, { source: "Module 4", note: "The person and the anito share the same body." }),
  add("Nabati", "'Greeted' by a spirit", "na-ba-ti", C, { source: "Module 4", note: "Illness from being touched by a spirit without possession. Similar: nausog." }),
  add("Nausog", "'Touched' by a spirit", "na-u-sog", C, { source: "Module 4", note: "Colloquial counterpart of nabati." }),
  add("Pag-aanito", "Healing ritual to remove the anito", "pag-a-a-ni-to", C, { source: "Module 4", note: "A community ritual with chanting, dancing, mediumship and ritual objects. The healer is the mang-aanito." }),
  add("Bandi", "Obligation a man must settle to marry a woman", "ban-di", C, { source: "Module 4", note: "Paid in cash or in kind, such as cavans of milled rice or fattened pigs. The act of settling it is magbandi." }),
  add("Maglanggad", "To give a 'langgad' (penalty for hurting someone's feelings)", "mag-lang-gad", C, { source: "Module 4", note: "The wrongdoer asks forgiveness and is asked for a langgad, such as preparing a shared lunch for the families." }),
  add("Mamahabi", "Formally asking for a girl's hand in marriage", "ma-ma-ha-bi", C, { source: "Module 4", note: "Gifts are given to the bride's parents at the first meeting." }),
  add("Pahungao / Pahungaw", "Obligations of a groom who eloped", "pa-hu-nga-o", C, { source: "Module 4", note: "Module 4 writes both pahungaw and pahungao." }),
  add("Kainomayan", "Well-being (by extension, progress)", "ka-i-no-ma-yan", C, { source: "Module 6", note: "Name of Camp Kainomayan in Barangay San Juan, Botolan." }),
  add("Apo Apang", "Ina Poon Bato (Nuestra Señora dela Paz of Zambales)", "a-po a-pang", C, { source: "Module 6", note: "The name Zambaleños use for the venerated image." }),
  add("Paynauen", "Original name of Iba", "pay-na-u-en", C, { source: "Module 6", note: "Fort Paynauen is also known as Playa Honda." }),
];

export const MODULE_WORDS: Word[] = [
  ...pronounsFull,
  ...pronounsShort,
  ...pronounsOblique,
  ...numbersBig,
  ...numberForms,
  ...questions,
  ...demonstratives,
  ...grammar,
  ...adjectives,
  ...nouns,
  ...verbs,
  ...times,
  ...culture,
];

const ids = (list: Word[]) => list.map((w) => w.wordId);

let nextLesson = 113;
const lesson = (
  title: string,
  nativeTitle: string,
  wordRefs: number[],
  xpReward: number
): Lesson => {
  nextLesson += 1;
  return {
    lessonId: nextLesson,
    languageId: 1,
    title,
    nativeTitle,
    wordRefs,
    xpReward,
    lessonNumber: nextLesson - 100,
  };
};

// Existing base word ids: 107 hiko, 108 hika, 109 hiya, 110 hita, 111 hikayi, 112 hila,
// 118 anem, 119 pito, 120 walo, 121 siyam, 122 mapo, 195-199 question words.
export const MODULE_LESSONS: Lesson[] = [
  lesson("Pronouns: Full Forms", "Hiko, Hika, Hiya", [107, 108, 109, 110, 111, 112, ...ids(pronounsFull)], 70),
  lesson("Pronouns: Short & Possessive Forms", "Ko, Mo, Na", ids(pronounsShort), 70),
  lesson("Pronouns: 'To' Forms", "Kongko, Komo, Kona", ids(pronounsOblique), 70),
  lesson("Numbers 6 to 10", "Anem tan Mapò", [118, 119, 120, 121, 122], 60),
  lesson("Numbers 11 to 1000", "Labimmiha tan Libo", ids(numbersBig), 70),
  lesson("First, Each & One by One", "Ona, Ti-iha, Mihamiha", ids(numberForms), 70),
  lesson("Question Words", "Hino, Anya, Ayri", [195, 196, 197, 198, 199, ...ids(questions)], 75),
  lesson("This, That & There", "Habayti, Haba-in, Habayto", ids(demonstratives), 60),
  lesson("Small Grammar Words", "Hay, Ya, Nin, Ha", ids(grammar), 80),
  lesson("Describing Words", "Ganda, Malhay, Katowà", ids(adjectives), 60),
  lesson("Nouns & Plurals", "Aw-anak, Law-lapis", ids(nouns), 75),
  lesson("Verbs from the Sentences", "Nangan, Nambi, Nowayo", ids(verbs), 80),
  lesson("Nights, Mornings & Until", "Nayabi, Angga", [183, ...ids(times)], 50),
  lesson("Culture & IKSP Words", "Gasak, Bandi, Anito", ids(culture), 80),
];
