import { Language, Word, Lesson } from "./types";
import { MODULE_WORDS, MODULE_LESSONS } from "./data/module5Words";

export const LANGUAGES: Language[] = [
  {
    languageId: 1,
    name: "Botolan Sambal",
    nativeName: "Sambal",
    region: "Zambales",
    icon: "wheat",
    enabled: true
  },
  {
    languageId: 2,
    name: "Cebuano",
    nativeName: "Bisaya",
    region: "Visayas & Mindanao",
    icon: "waves",
    enabled: true
  },
  {
    languageId: 3,
    name: "Ilocano",
    nativeName: "Ilokano",
    region: "Ilocos Region & Northern Luzon",
    icon: "mountain",
    enabled: true
  }
];

const BASE_WORDS: Word[] = [
  // --- BOTOLAN SAMBAL (Language ID 1) ---
  {
    wordId: 101,
    languageId: 1,
    word: "Mahampat a mahambak",
    meaning: "Good morning",
    pronunciation: "ma-ham-pat a ma-ham-bak",
    category: "Greetings"
  },
  {
    wordId: 102,
    languageId: 1,
    word: "Mahampat a mahilem",
    meaning: "Good afternoon",
    pronunciation: "ma-ham-pat a ma-hi-lem",
    category: "Greetings"
  },
  {
    wordId: 103,
    languageId: 1,
    word: "Mahampat a yabi",
    meaning: "Good evening",
    pronunciation: "ma-ham-pat a ya-bi",
    category: "Greetings"
  },
  {
    wordId: 104,
    languageId: 1,
    word: "Salamat",
    meaning: "Thank you",
    pronunciation: "sa-la-mat",
    category: "Phrases"
  },
  {
    wordId: 105,
    languageId: 1,
    word: "Kumusta kawo?",
    meaning: "How are you? (plural/polite)",
    pronunciation: "ku-mus-ta ka-wo",
    category: "Phrases",
    variant: "Komosta kawo?",
    note: "Module 5 spells this loanword komosta ('how, quality', from Spanish) with o for u.",
    source: "Module 5"
  },
  {
    wordId: 106,
    languageId: 1,
    word: "Mahampat ako",
    meaning: "I'm fine",
    pronunciation: "ma-ham-pat a-ko",
    category: "Phrases"
  },
  {
    wordId: 107,
    languageId: 1,
    word: "Hiko",
    meaning: "I / me",
    pronunciation: "hi-ko",
    category: "Pronouns"
  },
  {
    wordId: 108,
    languageId: 1,
    word: "Hika",
    meaning: "You (singular)",
    pronunciation: "hi-ka",
    category: "Pronouns"
  },
  {
    wordId: 109,
    languageId: 1,
    word: "Hiyá",
    meaning: "He / She",
    pronunciation: "hi-ya",
    category: "Pronouns"
  },
  {
    wordId: 110,
    languageId: 1,
    word: "Hita",
    meaning: "We (inclusive - including you)",
    pronunciation: "hi-ta",
    category: "Pronouns"
  },
  {
    wordId: 111,
    languageId: 1,
    word: "Hikayi",
    meaning: "We (exclusive - excluding you)",
    pronunciation: "hi-ka-yi",
    category: "Pronouns",
    note: "Module 5: 1st person plural (we, excluding you), full nominative. Minimal form: kayi. Genitive: nawen. Oblique: konnawen.",
    source: "Module 5; 2017 orthography guide"
  },
  {
    wordId: 112,
    languageId: 1,
    word: "Hila",
    meaning: "They",
    pronunciation: "hi-la",
    category: "Pronouns"
  },
  {
    wordId: 113,
    languageId: 1,
    word: "Miha",
    meaning: "One",
    pronunciation: "mi-ha",
    category: "Numbers"
  },
  {
    wordId: 114,
    languageId: 1,
    word: "Lowa",
    meaning: "Two",
    pronunciation: "lo-wa",
    category: "Numbers"
  },
  {
    wordId: 115,
    languageId: 1,
    word: "Tatlo",
    meaning: "Three",
    pronunciation: "tat-lo",
    category: "Numbers"
  },
  {
    wordId: 116,
    languageId: 1,
    word: "Apat",
    meaning: "Four",
    pronunciation: "a-pat",
    category: "Numbers"
  },
  {
    wordId: 117,
    languageId: 1,
    word: "Lima",
    meaning: "Five",
    pronunciation: "li-ma",
    category: "Numbers"
  },
  {
    wordId: 118,
    languageId: 1,
    word: "Anem",
    meaning: "Six",
    pronunciation: "a-nem",
    category: "Numbers",
    note: "Module 5 cardinal 6 is anem (corrected from 'Alem'); the 2017 guide also lists anem (six).",
    source: "Module 5"
  },
  {
    wordId: 119,
    languageId: 1,
    word: "Pito",
    meaning: "Seven",
    pronunciation: "pi-to",
    category: "Numbers"
  },
  {
    wordId: 120,
    languageId: 1,
    word: "Walo",
    meaning: "Eight",
    pronunciation: "wa-lo",
    category: "Numbers"
  },
  {
    wordId: 121,
    languageId: 1,
    word: "Siyam",
    meaning: "Nine",
    pronunciation: "si-yam",
    category: "Numbers"
  },
  {
    wordId: 122,
    languageId: 1,
    word: "Mapò",
    meaning: "Ten",
    pronunciation: "ma-po",
    category: "Numbers",
    variant: "mapu (cf. luwampu 20, limampu 50 in the 2017 guide)",
    note: "Module 5 cardinal 10 is mapò. The same -pò ending appears in lowampò (20) and tatlompò (30).",
    source: "Module 5"
  },
  {
    wordId: 123,
    languageId: 1,
    word: "Bali",
    meaning: "House",
    pronunciation: "ba-li",
    category: "Nouns",
    note: "The 1968 Dictionary of Botolan Sambal gives 'bali' = house, and the 2017 guide's example sentences use bali ('Bali nawen ya bayri').",
    source: "1968 Dictionary of Botolan Sambal; 2017 orthography guide"
  },
  {
    wordId: 124,
    languageId: 1,
    word: "Lanom",
    meaning: "Water",
    pronunciation: "la-nom",
    category: "Nouns",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 125,
    languageId: 1,
    word: "Kanan",
    meaning: "Food",
    pronunciation: "ka-nan",
    category: "Nouns",
    note: "Not found in Module 5 or the 2017 guide (which use kona 'viand' and ikakan 'something to eat'). Kept from the original word list; verify with a native speaker."
  },
  {
    wordId: 126,
    languageId: 1,
    word: "Anak",
    meaning: "Child",
    pronunciation: "a-nak",
    category: "Nouns"
  },
  {
    wordId: 127,
    languageId: 1,
    word: "Mangan",
    meaning: "To eat",
    pronunciation: "ma-ngan",
    category: "Verbs",
    note: "Perfective active: nangan ('Nangan ya anak nin kanen', the child ate some rice). Perfective object focus: kinan. The root is kan; kanen means cooked rice.",
    source: "Module 5; 2017 orthography guide"
  },
  {
    wordId: 128,
    languageId: 1,
    word: "Mowako",
    meaning: "To walk",
    pronunciation: "mo-wa-ko",
    category: "Verbs"
  },
  {
    wordId: 129,
    languageId: 1,
    word: "Mowayo",
    meaning: "To run",
    pronunciation: "mo-wa-yo",
    category: "Verbs"
  },
  {
    wordId: 130,
    languageId: 1,
    word: "Lomateng",
    meaning: "To arrive",
    pronunciation: "lo-ma-teng",
    category: "Verbs"
  },
  // --- ADDITIONAL VOCABULARY FROM MANULAT TAMOY NA (2017 ORTHOGRAPHY GUIDE) ---
  // Body Parts (Parti nin Nawini)
  {
    wordId: 131,
    languageId: 1,
    word: "Ulo",
    meaning: "Head",
    pronunciation: "u-lo",
    category: "Body",
    variant: "olo",
    note: "Module 5 writes olo with o for u: 'pitoy oloy' = seven heads.",
    source: "Module 5"
  },
  {
    wordId: 132,
    languageId: 1,
    word: "Habot",
    meaning: "Hair",
    pronunciation: "ha-bot",
    category: "Body"
  },
  {
    wordId: 133,
    languageId: 1,
    word: "Mata",
    meaning: "Eyes",
    pronunciation: "ma-ta",
    category: "Body"
  },
  {
    wordId: 134,
    languageId: 1,
    word: "Balungo",
    meaning: "Nose",
    pronunciation: "ba-lu-ngo",
    category: "Body"
  },
  {
    wordId: 135,
    languageId: 1,
    word: "Labi",
    meaning: "Lips",
    pronunciation: "la-bi",
    category: "Body"
  },
  {
    wordId: 136,
    languageId: 1,
    word: "Ngipen",
    meaning: "Teeth",
    pronunciation: "ngi-pen",
    category: "Body",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 137,
    languageId: 1,
    word: "Gemet",
    meaning: "Hand",
    pronunciation: "ge-met",
    category: "Body"
  },
  {
    wordId: 138,
    languageId: 1,
    word: "Biti",
    meaning: "Foot / Leg",
    pronunciation: "bi-ti",
    category: "Body",
    variant: "bitih",
    note: "The 1968 dictionary writes bitih = foot, leg.",
    source: "1968 Dictionary of Botolan Sambal"
  },
  {
    wordId: 139,
    languageId: 1,
    word: "Tu-ol",
    meaning: "Knee",
    pronunciation: "tu-ol",
    category: "Body"
  },
  {
    wordId: 140,
    languageId: 1,
    word: "Puso",
    meaning: "Heart",
    pronunciation: "pu-so",
    category: "Body"
  },
  // Family & Kinship (Mimbro nin Pamilya)
  {
    wordId: 141,
    languageId: 1,
    word: "Tatay",
    meaning: "Father",
    pronunciation: "ta-tay",
    category: "Family",
    note: "The 1968 dictionary lists tata as 'uncle', while the 2017 guide's letter list gives tata as 'father'. Check usage with an elder.",
    source: "1968 Dictionary of Botolan Sambal; 2017 orthography guide"
  },
  {
    wordId: 142,
    languageId: 1,
    word: "Nanay",
    meaning: "Mother",
    pronunciation: "na-nay",
    category: "Family"
  },
  {
    wordId: 143,
    languageId: 1,
    word: "Kaka",
    meaning: "Elder brother or sister",
    pronunciation: "ka-ka",
    category: "Family"
  },
  {
    wordId: 144,
    languageId: 1,
    word: "Poto",
    meaning: "Youngest child / sibling",
    pronunciation: "po-to",
    category: "Family"
  },
  {
    wordId: 145,
    languageId: 1,
    word: "Papo",
    meaning: "Grandparent",
    pronunciation: "pa-po",
    category: "Family"
  },
  {
    wordId: 146,
    languageId: 1,
    word: "Manunuro",
    meaning: "Teacher",
    pronunciation: "ma-nu-nu-ro",
    category: "Community"
  },
  {
    wordId: 147,
    languageId: 1,
    word: "Doktor",
    meaning: "Doctor / Healer",
    pronunciation: "dok-tor",
    category: "Community"
  },
  {
    wordId: 148,
    languageId: 1,
    word: "Mamaliyan",
    meaning: "Farmer",
    pronunciation: "ma-ma-li-yan",
    category: "Community"
  },
  // Animals (Aw-Ayup)
  {
    wordId: 149,
    languageId: 1,
    word: "Damuwag",
    meaning: "Carabao (Water Buffalo)",
    pronunciation: "da-mu-wag",
    category: "Animals",
    variant: "damowag",
    note: "Module 5 spelling: 'Ahè pinati nin tawo ya damowag ko' = The person didn't kill my water buffalo.",
    source: "Module 5; 2017 orthography guide"
  },
  {
    wordId: 150,
    languageId: 1,
    word: "Aho",
    meaning: "Dog",
    pronunciation: "a-ho",
    category: "Animals"
  },
  {
    wordId: 151,
    languageId: 1,
    word: "Poha",
    meaning: "Cat",
    pronunciation: "po-ha",
    category: "Animals",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 152,
    languageId: 1,
    word: "Manok",
    meaning: "Chicken",
    pronunciation: "ma-nok",
    category: "Animals",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 153,
    languageId: 1,
    word: "Bake",
    meaning: "Monkey",
    pronunciation: "ba-ke",
    category: "Animals",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 154,
    languageId: 1,
    word: "Kuna",
    meaning: "Fish / Viand",
    pronunciation: "ku-na",
    category: "Animals"
  },
  {
    wordId: 155,
    languageId: 1,
    word: "Utan",
    meaning: "Snake",
    pronunciation: "u-tan",
    category: "Animals",
    variant: "otan",
    note: "Module 5 spelling: 'Habayti ya otan ay ma-in pitoy oloy kapapalimo' = This snake had seven frightening heads. Plural: aw-otan.",
    source: "Module 5; 2017 orthography guide"
  },
  {
    wordId: 156,
    languageId: 1,
    word: "Pag-ong",
    meaning: "Turtle",
    pronunciation: "pag-ong",
    category: "Animals",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 157,
    languageId: 1,
    word: "Uyha",
    meaning: "Philippine deer",
    pronunciation: "uy-ha",
    category: "Animals"
  },
  {
    wordId: 158,
    languageId: 1,
    word: "Gigang",
    meaning: "Spider",
    pronunciation: "gi-gang",
    category: "Animals"
  },
  {
    wordId: 159,
    languageId: 1,
    word: "Aya",
    meaning: "Ant",
    pronunciation: "a-ya",
    category: "Animals"
  },
  // Plants & Harvest (Tawtanaman)
  {
    wordId: 160,
    languageId: 1,
    word: "Ha-a",
    meaning: "Banana",
    pronunciation: "ha-a",
    category: "Plants"
  },
  {
    wordId: 161,
    languageId: 1,
    word: "Ungot",
    meaning: "Coconut",
    pronunciation: "u-ngot",
    category: "Plants"
  },
  {
    wordId: 162,
    languageId: 1,
    word: "Pali",
    meaning: "Rice plant / Palay grain",
    pronunciation: "pa-li",
    category: "Plants"
  },
  {
    wordId: 163,
    languageId: 1,
    word: "Boya",
    meaning: "Milled rice",
    pronunciation: "bo-ya",
    category: "Plants"
  },
  {
    wordId: 164,
    languageId: 1,
    word: "Kamoti",
    meaning: "Sweet potato",
    pronunciation: "ka-mo-ti",
    category: "Plants"
  },
  {
    wordId: 165,
    languageId: 1,
    word: "Manga",
    meaning: "Mango",
    pronunciation: "ma-nga",
    category: "Plants"
  },
  {
    wordId: 166,
    languageId: 1,
    word: "La-iya",
    meaning: "Ginger",
    pronunciation: "la-i-ya",
    category: "Plants"
  },
  {
    wordId: 167,
    languageId: 1,
    word: "Bagoyboy",
    meaning: "Tiger grass (broom plant)",
    pronunciation: "ba-goy-boy",
    category: "Plants",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  // Nature & Places (Dawdogal)
  {
    wordId: 168,
    languageId: 1,
    word: "Bakil",
    meaning: "Mountain / Forest",
    pronunciation: "ba-kil",
    category: "Places",
    note: "The 1968 dictionary glosses bakil as 'hill' (reduplicated: a small hill); the 2017 guide and its stories use it for mountain and forest.",
    source: "1968 Dictionary of Botolan Sambal; 2017 orthography guide"
  },
  {
    wordId: 169,
    languageId: 1,
    word: "Balah",
    meaning: "River",
    pronunciation: "ba-lah",
    category: "Places"
  },
  {
    wordId: 170,
    languageId: 1,
    word: "Iskwilawan",
    meaning: "School",
    pronunciation: "is-kwi-la-wan",
    category: "Places"
  },
  {
    wordId: 171,
    languageId: 1,
    word: "Himba-an",
    meaning: "Church",
    pronunciation: "him-ba-an",
    category: "Places",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 172,
    languageId: 1,
    word: "Banowa",
    meaning: "Town",
    pronunciation: "ba-no-wa",
    category: "Places"
  },
  {
    wordId: 173,
    languageId: 1,
    word: "Kapati-an",
    meaning: "Volcanic sand / Lahar plain",
    pronunciation: "ka-pa-ti-an",
    category: "Nature"
  },
  {
    wordId: 174,
    languageId: 1,
    word: "Langit",
    meaning: "Sky / Heavens",
    pronunciation: "la-ngit",
    category: "Nature"
  },
  {
    wordId: 175,
    languageId: 1,
    word: "Uran",
    meaning: "Rain",
    pronunciation: "u-ran",
    category: "Nature"
  },
  {
    wordId: 176,
    languageId: 1,
    word: "Allo",
    meaning: "Sun / Day",
    pronunciation: "al-lo",
    category: "Nature"
  },
  {
    wordId: 177,
    languageId: 1,
    word: "Buwan",
    meaning: "Moon / Month",
    pronunciation: "bu-wan",
    category: "Nature",
    variant: "bowan",
    note: "The 1968 dictionary writes bowan = month.",
    source: "1968 Dictionary of Botolan Sambal"
  },
  // Time & Days (Hawhalita ha Oras)
  {
    wordId: 178,
    languageId: 1,
    word: "Mahambak",
    meaning: "Morning",
    pronunciation: "ma-ham-bak",
    category: "Time"
  },
  {
    wordId: 179,
    languageId: 1,
    word: "Ogti-allo",
    meaning: "Noon / Midday",
    pronunciation: "og-ti-al-lo",
    category: "Time"
  },
  {
    wordId: 180,
    languageId: 1,
    word: "Mahilem",
    meaning: "Afternoon",
    pronunciation: "ma-hi-lem",
    category: "Time"
  },
  {
    wordId: 181,
    languageId: 1,
    word: "Yabi",
    meaning: "Night / Evening",
    pronunciation: "ya-bi",
    category: "Time",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  {
    wordId: 182,
    languageId: 1,
    word: "Nubuka",
    meaning: "Tomorrow",
    pronunciation: "nu-bu-ka",
    category: "Time"
  },
  {
    wordId: 183,
    languageId: 1,
    word: "Hapa-eg",
    meaning: "Now / Today",
    pronunciation: "ha-pa-eg",
    category: "Time",
    note: "Module 5: 'Hapa-eg, hi Ripolyo ay nag-in katowà ya papwak' = Now, Ripolyo became an ugly frog.",
    source: "Module 5"
  },
  {
    wordId: 184,
    languageId: 1,
    word: "Lunis",
    meaning: "Monday",
    pronunciation: "lu-nis",
    category: "Time"
  },
  {
    wordId: 185,
    languageId: 1,
    word: "Sabado",
    meaning: "Saturday",
    pronunciation: "sa-ba-do",
    category: "Time"
  },
  {
    wordId: 186,
    languageId: 1,
    word: "Dominggo",
    meaning: "Sunday",
    pronunciation: "do-ming-go",
    category: "Time",
    source: "1968 Dictionary of Botolan Sambal (confirmed)"
  },
  // Verbs (Aw-Ilgo nin Galaw)
  {
    wordId: 187,
    languageId: 1,
    word: "Manlabi",
    meaning: "To love",
    pronunciation: "man-la-bi",
    category: "Verbs"
  },
  {
    wordId: 188,
    languageId: 1,
    word: "Magkanta",
    meaning: "To sing",
    pronunciation: "mag-kan-ta",
    category: "Verbs"
  },
  {
    wordId: 189,
    languageId: 1,
    word: "Magtalek",
    meaning: "To dance",
    pronunciation: "mag-ta-lek",
    category: "Verbs"
  },
  {
    wordId: 190,
    languageId: 1,
    word: "Tumangoy",
    meaning: "To swim",
    pronunciation: "tu-ma-ngoy",
    category: "Verbs"
  },
  {
    wordId: 191,
    languageId: 1,
    word: "Matoloy",
    meaning: "To sleep",
    pronunciation: "ma-to-loy",
    category: "Verbs"
  },
  {
    wordId: 192,
    languageId: 1,
    word: "Mag-ilba",
    meaning: "To wash clothes",
    pronunciation: "mag-il-ba",
    category: "Verbs"
  },
  {
    wordId: 193,
    languageId: 1,
    word: "Mananem",
    meaning: "To plant / farm",
    pronunciation: "ma-na-nem",
    category: "Verbs"
  },
  {
    wordId: 194,
    languageId: 1,
    word: "Mag-ilgo",
    meaning: "To speak / talk",
    pronunciation: "mag-il-go",
    category: "Verbs"
  },
  // Question Words & Culture
  {
    wordId: 195,
    languageId: 1,
    word: "Anya",
    meaning: "What",
    pronunciation: "an-ya",
    category: "Questions"
  },
  {
    wordId: 196,
    languageId: 1,
    word: "Hino",
    meaning: "Who",
    pronunciation: "hi-no",
    category: "Questions"
  },
  {
    wordId: 197,
    languageId: 1,
    word: "Ayri",
    meaning: "Where",
    pronunciation: "ay-ri",
    category: "Questions",
    note: "Module 5's sentence 'Ayri ka ampa-iri?' (Where are you living?) and 'ayripaman' (wherever) show it means 'where'. (Module 5's pronoun list glosses ayri as 'what', which conflicts with its own example; anya is 'what'.)",
    source: "Module 5; 2017 orthography guide"
  },
  {
    wordId: 198,
    languageId: 1,
    word: "Makano",
    meaning: "When (future)",
    pronunciation: "ma-ka-no",
    category: "Questions",
    note: "Module 5: makano = when (future); nakano = when (past).",
    source: "Module 5"
  },
  {
    wordId: 199,
    languageId: 1,
    word: "Pangno",
    meaning: "How",
    pronunciation: "pang-no",
    category: "Questions"
  },
  {
    wordId: 200,
    languageId: 1,
    word: "Apo Namalyari",
    meaning: "The Supreme Creator (Zambales Indigenous Deity)",
    pronunciation: "a-po na-mal-ya-ri",
    category: "Culture"
  },

  // --- CEBUANO (Language ID 2) ---
  {
    wordId: 201,
    languageId: 2,
    word: "Maayong buntag",
    meaning: "Good morning",
    pronunciation: "ma-a-yong bun-tag",
    category: "Greetings"
  },
  {
    wordId: 202,
    languageId: 2,
    word: "Maayong hapon",
    meaning: "Good afternoon",
    pronunciation: "ma-a-yong ha-pon",
    category: "Greetings"
  },
  {
    wordId: 203,
    languageId: 2,
    word: "Maayong gabii",
    meaning: "Good evening",
    pronunciation: "ma-a-yong ga-bi-i",
    category: "Greetings"
  },
  {
    wordId: 204,
    languageId: 2,
    word: "Salamat",
    meaning: "Thank you",
    pronunciation: "sa-la-mat",
    category: "Phrases"
  },
  {
    wordId: 205,
    languageId: 2,
    word: "Kumusta ka?",
    meaning: "How are you?",
    pronunciation: "ku-mus-ta ka",
    category: "Phrases"
  },
  {
    wordId: 206,
    languageId: 2,
    word: "Maayo man ko",
    meaning: "I'm fine",
    pronunciation: "ma-a-yo man ko",
    category: "Phrases"
  },
  {
    wordId: 207,
    languageId: 2,
    word: "Ako",
    meaning: "I / me",
    pronunciation: "a-ko",
    category: "Pronouns"
  },
  {
    wordId: 208,
    languageId: 2,
    word: "Ikaw",
    meaning: "You (singular)",
    pronunciation: "i-kaw",
    category: "Pronouns"
  },
  {
    wordId: 209,
    languageId: 2,
    word: "Siya",
    meaning: "He / She",
    pronunciation: "si-ya",
    category: "Pronouns"
  },
  {
    wordId: 210,
    languageId: 2,
    word: "Kita",
    meaning: "We (inclusive)",
    pronunciation: "ki-ta",
    category: "Pronouns"
  },
  {
    wordId: 211,
    languageId: 2,
    word: "Kami",
    meaning: "We (exclusive)",
    pronunciation: "ka-mi",
    category: "Pronouns"
  },
  {
    wordId: 212,
    languageId: 2,
    word: "Sila",
    meaning: "They",
    pronunciation: "si-la",
    category: "Pronouns"
  },
  {
    wordId: 213,
    languageId: 2,
    word: "Usa",
    meaning: "One",
    pronunciation: "u-sa",
    category: "Numbers"
  },
  {
    wordId: 214,
    languageId: 2,
    word: "Duha",
    meaning: "Two",
    pronunciation: "du-ha",
    category: "Numbers"
  },
  {
    wordId: 215,
    languageId: 2,
    word: "Tulo",
    meaning: "Three",
    pronunciation: "tu-lo",
    category: "Numbers"
  },
  {
    wordId: 216,
    languageId: 2,
    word: "Upat",
    meaning: "Four",
    pronunciation: "u-pat",
    category: "Numbers"
  },
  {
    wordId: 217,
    languageId: 2,
    word: "Lima",
    meaning: "Five",
    pronunciation: "li-ma",
    category: "Numbers"
  },
  {
    wordId: 218,
    languageId: 2,
    word: "Unom",
    meaning: "Six",
    pronunciation: "u-nom",
    category: "Numbers"
  },
  {
    wordId: 219,
    languageId: 2,
    word: "Pito",
    meaning: "Seven",
    pronunciation: "pi-to",
    category: "Numbers"
  },
  {
    wordId: 220,
    languageId: 2,
    word: "Walo",
    meaning: "Eight",
    pronunciation: "wa-lo",
    category: "Numbers"
  },
  {
    wordId: 221,
    languageId: 2,
    word: "Siyam",
    meaning: "Nine",
    pronunciation: "si-yam",
    category: "Numbers"
  },
  {
    wordId: 222,
    languageId: 2,
    word: "Napulo",
    meaning: "Ten",
    pronunciation: "na-pu-lo",
    category: "Numbers"
  },
  {
    wordId: 223,
    languageId: 2,
    word: "Balay",
    meaning: "House",
    pronunciation: "ba-lay",
    category: "Nouns"
  },
  {
    wordId: 224,
    languageId: 2,
    word: "Tubig",
    meaning: "Water",
    pronunciation: "tu-big",
    category: "Nouns"
  },
  {
    wordId: 225,
    languageId: 2,
    word: "Pagkaon",
    meaning: "Food",
    pronunciation: "pag-ka-on",
    category: "Nouns"
  },
  {
    wordId: 226,
    languageId: 2,
    word: "Bata",
    meaning: "Child",
    pronunciation: "ba-ta",
    category: "Nouns"
  },
  {
    wordId: 227,
    languageId: 2,
    word: "Kaon",
    meaning: "To eat",
    pronunciation: "ka-on",
    category: "Verbs"
  },
  {
    wordId: 228,
    languageId: 2,
    word: "Lakaw",
    meaning: "To walk",
    pronunciation: "la-kaw",
    category: "Verbs"
  },
  {
    wordId: 229,
    languageId: 2,
    word: "Dagan",
    meaning: "To run",
    pronunciation: "da-gan",
    category: "Verbs"
  },
  {
    wordId: 230,
    languageId: 2,
    word: "Abot",
    meaning: "To arrive / reach",
    pronunciation: "a-bot",
    category: "Verbs"
  },

  // --- ILOCANO (Language ID 3) ---
  {
    wordId: 301,
    languageId: 3,
    word: "Naimbag a bigat",
    meaning: "Good morning",
    pronunciation: "na-im-bag a bi-gat",
    category: "Greetings"
  },
  {
    wordId: 302,
    languageId: 3,
    word: "Naimbag a malem",
    meaning: "Good afternoon",
    pronunciation: "na-im-bag a ma-lem",
    category: "Greetings"
  },
  {
    wordId: 303,
    languageId: 3,
    word: "Naimbag a rabii",
    meaning: "Good evening",
    pronunciation: "na-im-bag a ra-bi-i",
    category: "Greetings"
  },
  {
    wordId: 304,
    languageId: 3,
    word: "Agyamanak",
    meaning: "Thank you",
    pronunciation: "ag-ya-ma-nak",
    category: "Phrases"
  },
  {
    wordId: 305,
    languageId: 3,
    word: "Kumustaka?",
    meaning: "How are you?",
    pronunciation: "ku-mus-ta-ka",
    category: "Phrases"
  },
  {
    wordId: 306,
    languageId: 3,
    word: "Nasayaatak met",
    meaning: "I'm fine",
    pronunciation: "na-sa-ya-a-tak met",
    category: "Phrases"
  },
  {
    wordId: 307,
    languageId: 3,
    word: "Siak",
    meaning: "I / me",
    pronunciation: "shak",
    category: "Pronouns"
  },
  {
    wordId: 308,
    languageId: 3,
    word: "Sika",
    meaning: "You (singular)",
    pronunciation: "si-ka",
    category: "Pronouns"
  },
  {
    wordId: 309,
    languageId: 3,
    word: "Isu",
    meaning: "He / She",
    pronunciation: "i-su",
    category: "Pronouns"
  },
  {
    wordId: 310,
    languageId: 3,
    word: "Datayo",
    meaning: "We (inclusive)",
    pronunciation: "da-ta-yo",
    category: "Pronouns"
  },
  {
    wordId: 311,
    languageId: 3,
    word: "Dakami",
    meaning: "We (exclusive)",
    pronunciation: "da-ka-mi",
    category: "Pronouns"
  },
  {
    wordId: 312,
    languageId: 3,
    word: "Isuda",
    meaning: "They",
    pronunciation: "i-su-da",
    category: "Pronouns"
  },
  {
    wordId: 313,
    languageId: 3,
    word: "Maysa",
    meaning: "One",
    pronunciation: "may-sa",
    category: "Numbers"
  },
  {
    wordId: 314,
    languageId: 3,
    word: "Dua",
    meaning: "Two",
    pronunciation: "du-a",
    category: "Numbers"
  },
  {
    wordId: 315,
    languageId: 3,
    word: "Tallo",
    meaning: "Three",
    pronunciation: "tal-lo",
    category: "Numbers"
  },
  {
    wordId: 316,
    languageId: 3,
    word: "Uppat",
    meaning: "Four",
    pronunciation: "up-pat",
    category: "Numbers"
  },
  {
    wordId: 317,
    languageId: 3,
    word: "Lima",
    meaning: "Five",
    pronunciation: "li-ma",
    category: "Numbers"
  },
  {
    wordId: 318,
    languageId: 3,
    word: "Enem",
    meaning: "Six",
    pronunciation: "e-nem",
    category: "Numbers"
  },
  {
    wordId: 319,
    languageId: 3,
    word: "Pito",
    meaning: "Seven",
    pronunciation: "pi-to",
    category: "Numbers"
  },
  {
    wordId: 320,
    languageId: 3,
    word: "Walo",
    meaning: "Eight",
    pronunciation: "wa-lo",
    category: "Numbers"
  },
  {
    wordId: 321,
    languageId: 3,
    word: "Siam",
    meaning: "Nine",
    pronunciation: "syam",
    category: "Numbers"
  },
  {
    wordId: 322,
    languageId: 3,
    word: "Sangapulo",
    meaning: "Ten",
    pronunciation: "sa-nga-pu-lo",
    category: "Numbers"
  },
  {
    wordId: 323,
    languageId: 3,
    word: "Balay",
    meaning: "House",
    pronunciation: "ba-lay",
    category: "Nouns"
  },
  {
    wordId: 324,
    languageId: 3,
    word: "Danum",
    meaning: "Water",
    pronunciation: "da-num",
    category: "Nouns"
  },
  {
    wordId: 325,
    languageId: 3,
    word: "Kanen",
    meaning: "Food",
    pronunciation: "ka-nen",
    category: "Nouns"
  },
  {
    wordId: 326,
    languageId: 3,
    word: "Ubing",
    meaning: "Child",
    pronunciation: "u-bing",
    category: "Nouns"
  },
  {
    wordId: 327,
    languageId: 3,
    word: "Mangan",
    meaning: "To eat",
    pronunciation: "ma-ngan",
    category: "Verbs"
  },
  {
    wordId: 328,
    languageId: 3,
    word: "Magna",
    meaning: "To walk",
    pronunciation: "mag-na",
    category: "Verbs"
  },
  {
    wordId: 329,
    languageId: 3,
    word: "Taray",
    meaning: "To run",
    pronunciation: "ta-ray",
    category: "Verbs"
  },
  {
    wordId: 330,
    languageId: 3,
    word: "Dumteng",
    meaning: "To arrive",
    pronunciation: "dum-teng",
    category: "Verbs"
  }
];

export const WORDS: Word[] = [...BASE_WORDS, ...MODULE_WORDS];

const BASE_LESSONS: Lesson[] = [
  // Botolan Sambal Lessons (1xx)
  {
    lessonId: 101,
    languageId: 1,
    title: "Greeting the Day",
    nativeTitle: "Mga Depat ya Pagbati",
    wordRefs: [101, 102, 103],
    xpReward: 50,
    lessonNumber: 1
  },
  {
    lessonId: 102,
    languageId: 1,
    title: "Polite Phrases & I",
    nativeTitle: "Salamat tan Mononod",
    wordRefs: [104, 105, 106, 107, 108],
    xpReward: 60,
    lessonNumber: 2
  },
  {
    lessonId: 103,
    languageId: 1,
    title: "Counting One to Five",
    nativeTitle: "Miha tan Lima",
    wordRefs: [113, 114, 115, 116, 117],
    xpReward: 60,
    lessonNumber: 3
  },
  {
    lessonId: 104,
    languageId: 1,
    title: "Around the Home",
    nativeTitle: "Lobos ya Bali",
    wordRefs: [123, 124, 125, 126],
    xpReward: 50,
    lessonNumber: 4
  },
  {
    lessonId: 105,
    languageId: 1,
    title: "Action Verbs",
    nativeTitle: "Gawen tan Kowako",
    wordRefs: [127, 128, 129, 130],
    xpReward: 50,
    lessonNumber: 5
  },
  {
    lessonId: 106,
    languageId: 1,
    title: "Body & Anatomy",
    nativeTitle: "Parti nin Nawini",
    wordRefs: [131, 132, 133, 134, 135, 136, 137, 138, 139, 140],
    xpReward: 70,
    lessonNumber: 6
  },
  {
    lessonId: 107,
    languageId: 1,
    title: "Family & Community",
    nativeTitle: "Mimbro nin Pamilya",
    wordRefs: [141, 142, 143, 144, 145, 146, 147, 148],
    xpReward: 65,
    lessonNumber: 7
  },
  {
    lessonId: 108,
    languageId: 1,
    title: "Fauna of Zambales",
    nativeTitle: "Aw-Ayup nin Zambales",
    wordRefs: [149, 150, 151, 152, 153, 154, 155, 156, 157, 158],
    xpReward: 70,
    lessonNumber: 8
  },
  {
    lessonId: 109,
    languageId: 1,
    title: "Flora, Harvest & Fields",
    nativeTitle: "Tawtanaman boy Bungan Kayo",
    wordRefs: [160, 161, 162, 163, 164, 165, 166, 167],
    xpReward: 65,
    lessonNumber: 9
  },
  {
    lessonId: 110,
    languageId: 1,
    title: "Mountains, Rivers & Land",
    nativeTitle: "Bakil, Balah boy Dogal",
    wordRefs: [168, 169, 170, 171, 172, 173, 174, 175, 176, 177],
    xpReward: 70,
    lessonNumber: 10
  },
  {
    lessonId: 111,
    languageId: 1,
    title: "Time, Days & Calendar",
    nativeTitle: "Aw-Allo boy Oras",
    wordRefs: [178, 179, 180, 181, 182, 183, 184, 185, 186],
    xpReward: 70,
    lessonNumber: 11
  },
  {
    lessonId: 112,
    languageId: 1,
    title: "Actions & Activities",
    nativeTitle: "Aw-Ilgo nin Galaw",
    wordRefs: [187, 188, 189, 190, 191, 192, 193, 194],
    xpReward: 65,
    lessonNumber: 12
  },
  {
    lessonId: 113,
    languageId: 1,
    title: "Questions & Sacred Heritage",
    nativeTitle: "Hawpastang boy Pamana",
    wordRefs: [195, 196, 197, 198, 199, 200],
    xpReward: 60,
    lessonNumber: 13
  },

  // Cebuano Lessons (2xx)
  {
    lessonId: 201,
    languageId: 2,
    title: "Common Greetings",
    nativeTitle: "Mga Pagbati",
    wordRefs: [201, 202, 203],
    xpReward: 50,
    lessonNumber: 1
  },
  {
    lessonId: 202,
    languageId: 2,
    title: "Daily Interactions",
    nativeTitle: "Adlaw-adlaw nga Pulong",
    wordRefs: [204, 205, 206, 207, 208],
    xpReward: 60,
    lessonNumber: 2
  },
  {
    lessonId: 203,
    languageId: 2,
    title: "Counting Objects",
    nativeTitle: "Pag-ihap sa Bisaya",
    wordRefs: [213, 214, 215, 216, 217],
    xpReward: 60,
    lessonNumber: 3
  },
  {
    lessonId: 204,
    languageId: 2,
    title: "Household & Family",
    nativeTitle: "Balay ug Kabanay",
    wordRefs: [223, 224, 225, 226],
    xpReward: 50,
    lessonNumber: 4
  },
  {
    lessonId: 205,
    languageId: 2,
    title: "Everyday Acts",
    nativeTitle: "Mga Buhat",
    wordRefs: [227, 228, 229, 230],
    xpReward: 50,
    lessonNumber: 5
  },

  // Ilocano Lessons (3xx)
  {
    lessonId: 301,
    languageId: 3,
    title: "Polite Warm Greetings",
    nativeTitle: "Kasta a Kablaaw",
    wordRefs: [301, 302, 303],
    xpReward: 50,
    lessonNumber: 1
  },
  {
    lessonId: 302,
    languageId: 3,
    title: "Courtesies & Self",
    nativeTitle: "Pammadayaw ken Bagbagi",
    wordRefs: [304, 305, 306, 307, 308],
    xpReward: 60,
    lessonNumber: 2
  },
  {
    lessonId: 303,
    languageId: 3,
    title: "Numbers 1 to 5",
    nativeTitle: "Panagbilang",
    wordRefs: [313, 314, 315, 316, 317],
    xpReward: 60,
    lessonNumber: 3
  },
  {
    lessonId: 304,
    languageId: 3,
    title: "Life at Home",
    nativeTitle: "Biag iti Balay",
    wordRefs: [323, 324, 325, 326],
    xpReward: 50,
    lessonNumber: 4
  },
  {
    lessonId: 305,
    languageId: 3,
    title: "Verbal Expressions",
    nativeTitle: "Dagiti Tignay",
    wordRefs: [327, 328, 329, 330],
    xpReward: 50,
    lessonNumber: 5
  }
];

export const LESSONS: Lesson[] = [...BASE_LESSONS, ...MODULE_LESSONS];
