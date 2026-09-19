export interface GuideRule {
  id: string;
  ruleNumber: string;
  title: string;
  nativeTitle: string;
  description: string;
  nativeDescription?: string;
  examples: {
    word: string;
    meaning: string;
    note?: string;
  }[];
}

export interface GrammarSection {
  id: string;
  title: string;
  nativeTitle: string;
  explanation: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  examples: {
    sentence: string;
    breakdown?: string;
    filipino?: string;
    english: string;
  }[];
}

export interface AlphabetEntry {
  letter: string;
  upperLower: string;
  sampleWord: string;
  meaning: string;
  initial: string;
  initialMeaning: string;
  middle: string;
  middleMeaning: string;
  final: string;
  finalMeaning: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  designation: string;
  location: string;
  culturalNote: string;
  paragraphs: {
    sambal: string;
    filipino: string;
    english: string;
  }[];
  vocabulary: {
    word: string;
    filipino: string;
    english: string;
  }[];
}

export const GUIDE_METADATA = {
  title: "Manulat Tamoy Na",
  subtitle: "Panlekan Panulat nin Sambal Botolan (A Guide in Writing Sambal Botolan Language)",
  englishTitle: "Botolan Sambal Spelling Guide & Grammar Introduction",
  edition: "First Edition, 2017",
  publisher: "Department of Education – Region III & SIL Philippines",
  location: "Schools Division of Zambales, Iba, Zambales",
  regionalFocalPerson: "Arnold C. Montemayor, M.Ed. (Regional IPED Focal Person)",
  clmdChief: "Elizabeth M. Perfecto, Ed.D. (CLMD Chief)",
  director: "Malcolm S. Garma, CESO V (Director, DepEd Region-III)",
  linguists: "Roger Stone, M.A. (SIL Philippines Linguist), Chitse Magaspag, M.A., Levi Cirilo Cruz, M.A., Mansueto Casquite, M.A., Marciana E. Ramos",
  acknowledgement: `Hikayi ya aw-ayta ni Botolan ay leseb ya nakem nin ampasalamat boy ampamalay ha tawtawo’y nag-in katambay ha pamu-o boy pami-aep nin katandaan ni kawkatutubo tungkol ha Katutubong Katandaan boy Kultura. Koy Apo Namalyari, ya namalsa nin kaganawan boy taw tawo ha babon lota. Ha grupo nin SIL, ha tiknikal ya pagsuporta ha pangalalay boy pangwa nin dawdatus, panambay ha pamiki-ilgo, pamikilamo boy panggawa nin disisyon no pangno ihulat ya haw halita tamo. Malake ya salamat po!!!`
};

export const ALPHABET_DATA: AlphabetEntry[] = [
  { letter: "A a", upperLower: "A a", sampleWord: "aya", meaning: "ant", initial: "awo (yes), allo (sun/day), aho (dog), abaw (beetle)", initialMeaning: "yes / sun / dog / beetle", middle: "ha-a (banana), amak (mat), wanan (right)", middleMeaning: "banana / mat / right", final: "abaya (shoulder), mata (eyes), baya (charcoal)", finalMeaning: "shoulder / eyes / charcoal" },
  { letter: "B b", upperLower: "B b", sampleWord: "bake / baki", meaning: "monkey / rat", initial: "bake (monkey), beyek (piglet), bilawo (winnowing mat), boo (bamboo)", initialMeaning: "monkey / piglet / winnowing mat", middle: "abaw (beetle), kebel (cold), kibit (small bite), hubol (spring)", middleMeaning: "beetle / cold / spring", final: "lanab (flood), nebneb (chest), lo-ob (inside)", finalMeaning: "flood / chest / inside" },
  { letter: "K k", upperLower: "K k", sampleWord: "kuwat / kamat", meaning: "mushroom / follow", initial: "kamat (follow), kimat (lightning), keyekey (eel), kuto (lice)", initialMeaning: "follow / lightning / eel / lice", middle: "laka (old), bakil (mountain), takel (knot), okoy (egg)", middleMeaning: "old / mountain / knot / egg", final: "utak (bolo), etek (brain), kikik (bird of witch), ahok (smoke)", finalMeaning: "bolo / brain / smoke" },
  { letter: "D d", upperLower: "D d", sampleWord: "damuwag", meaning: "carabao", initial: "damuwag (carabao), dee (guitar string), dikot (grass), dogal (place)", initialMeaning: "carabao / string / grass / place", middle: "padta (paste), ledeg (deep), andirit (dragonfly)", middleMeaning: "paste / deep / dragonfly", final: "tamlad (lazy), tiked (back of knee), hilid (room)", finalMeaning: "lazy / back of knee / room" },
  { letter: "E e", upperLower: "E e", sampleWord: "etak", meaning: "big knife / bolo", initial: "ehad (upland farming), emen (like), ebeng (thin/mucus), eleng (low energy)", initialMeaning: "upland farming / like / thin", middle: "elek (snore), etek (brain), ilek (mosquito), nebneb (chest)", middleMeaning: "snore / brain / mosquito / chest", final: "lebe (target), ku-e (snail), tebe (every), take (hug)", finalMeaning: "target / snail / hug" },
  { letter: "G g", upperLower: "G g", sampleWord: "gigang", meaning: "spider", initial: "gigang (spider), gihgih (scrub), golot (old), guma (bolo case)", initialMeaning: "spider / scrub / old / bolo case", middle: "dagaw (game), pegpeg (shiver), lig-lig (side part)", middleMeaning: "game / shiver / side part", final: "damuwag (carabao), peleg (while), lawig (rope)", finalMeaning: "carabao / while / rope" },
  { letter: "H h", upperLower: "H h", sampleWord: "hayi / ha-a", meaning: "nest / banana", initial: "habon (soap), hepey (narrow), hi-il (bamboo floor), hobol (spring)", initialMeaning: "soap / narrow / bamboo floor", middle: "ahin (salt), ehad (upland plant), ahe (no), paliyan (field)", middleMeaning: "salt / no / field", final: "balah (river), peh-peh (lemon), palih (rice plant)", finalMeaning: "river / lemon / rice plant" },
  { letter: "I i", upperLower: "I i", sampleWord: "ipeh", meaning: "cockroach", initial: "ikoy (tail), ipeh (cockroach), ihip (think), ilgo (word), ilek (mosquito)", initialMeaning: "tail / cockroach / think / word", middle: "paibat (eversince), paliyan (field), biklat (snake), litep (confuse)", middleMeaning: "since / field / snake / confuse", final: "babayi (girl/woman), pali (unhusked rice), biti (foot)", finalMeaning: "woman / palay / foot" },
  { letter: "L l", upperLower: "L l", sampleWord: "la-iya", meaning: "ginger", initial: "lanom (water), le-ey (neck), linta (leech), lo-ong (bog), lubot (hole)", initialMeaning: "water / neck / leech / hole", middle: "allo (sun/day), delep (dive), ilgo (word), to-ol (knee)", middleMeaning: "sun / dive / word / knee", final: "alal (fence), takel (rope), bitil (hungry), tampol (hurry)", finalMeaning: "fence / rope / hungry / hurry" },
  { letter: "M m", upperLower: "M m", sampleWord: "mangga", meaning: "mango", initial: "matag-ay (high/tall), memel (stammer), miha (one), moli (climb)", initialMeaning: "high / one / climb", middle: "tambal (medicine), anem (six), ma-imot (selfish), lomot (moss)", middleMeaning: "medicine / six / moss", final: "kayam (tickle), leem (cloud), tim-tim (taste), talom (eggplant)", finalMeaning: "cloud / taste / eggplant" },
  { letter: "N n", upperLower: "N n", sampleWord: "kuna / nebneb", meaning: "fish / chest", initial: "nawini (body), nebneb (chest), nikatak (lost), nuboka (tomorrow)", initialMeaning: "body / chest / lost / tomorrow", middle: "wanan (right), emen (like), minum (drink), lunto (carry on head)", middleMeaning: "right / like / drink", final: "ikan (fish), te-en (nape), apin (mattress), taon (year), uran (rain)", finalMeaning: "fish / nape / year / rain" },
  { letter: "Ng ng", upperLower: "Ng ng", sampleWord: "ngipen", meaning: "tooth / teeth", initial: "nga-nga (open mouth), ngenget (smile), ngipen (teeth), ngongo (lisp)", initialMeaning: "open mouth / smile / teeth", middle: "bungaw (cliff), lengew (miss), ling-ling (nipa hut wall)", middleMeaning: "cliff / miss / wall", final: "bolang (ankle), tuleng (unheeding), kaging (bat)", finalMeaning: "ankle / bat" },
  { letter: "O o", upperLower: "O o", sampleWord: "okoy", meaning: "egg", initial: "okoy (egg), oyha (deer), oybon (calf), omok (ripe), obak (bark)", initialMeaning: "egg / deer / calf / ripe", middle: "bo-ok (owl), po-ol (fire), to-ol (knee), apoy (fire)", middleMeaning: "owl / fire / knee", final: "bawo (widow), botno (knot), allo (day/sun), aplo (gall bladder)", finalMeaning: "widow / knot / sun" },
  { letter: "P p", upperLower: "P p", sampleWord: "poha / pahinga", meaning: "cat / frog", initial: "pahinga (frog), peh-peh (cat), poha (cat), puhel (navel)", initialMeaning: "frog / cat / navel", middle: "apli (not strong), ipeh (cockroach), pi-pi (press), lopi (peel)", middleMeaning: "cockroach / press / peel", final: "alap (retrieve), kirep (eyelashes), hilip (peep), akop (gather with both hands)", finalMeaning: "retrieve / eyelashes / peep" },
  { letter: "R r", upperLower: "R r", sampleWord: "rilo / radyo", meaning: "watch / radio", initial: "rahrah (scratch), radyo (radio), runot (rot)", initialMeaning: "scratch / radio / rot", middle: "uran (rain), tarek (post), karit (scythe), tarok (top of plant)", middleMeaning: "rain / post / scythe", final: "hagir (grate), lahar (volcanic debris)", finalMeaning: "grate / volcanic lahar" },
  { letter: "S s", upperLower: "S s", sampleWord: "sisi / suso", meaning: "snail", initial: "sapot (spider web), seke (belittle), sisiw (chicks), suso (snail)", initialMeaning: "spider web / chicks / snail", middle: "asa (hope), ase (no), asiti (oil), posporo (match), asukal (sugar)", middleMeaning: "hope / match / sugar", final: "langkas (boastful), patis (fish sauce), labanos (soursop), kaktus (cactus)", finalMeaning: "boastful / fish sauce / cactus" },
  { letter: "T t", upperLower: "T t", sampleWord: "takoko / talom", meaning: "native hat / eggplant", initial: "talek (dance), te-en (nape), tiked (knee back), to-ol (knee), tuko (gecko)", initialMeaning: "dance / nape / knee / gecko", middle: "tata (father), patel (sibling), bitil (hungry), habot (hair), butno (knot)", middleMeaning: "father / sibling / hungry / hair", final: "yamot/eyat (root), katat (skin), kelet (curly), pilit (insist), lubot (hole)", finalMeaning: "root / skin / curly / hole" },
  { letter: "U u", upperLower: "U u", sampleWord: "ungot / uhay", meaning: "coconut / comb", initial: "uwe (blanket), uwel (worm), utan (snake)", initialMeaning: "blanket / worm / snake", middle: "hubol (spring), ubul (coconut heart), bakul (bamboo basin)", middleMeaning: "spring / bamboo basin", final: "limampu (fifty), luwampu (twenty)", finalMeaning: "fifty / twenty" },
  { letter: "W w", upperLower: "W w", sampleWord: "hawong / waweng", meaning: "hut / forehead", initial: "waweng (forehead), weywey (stir), witiwit (plow handle)", initialMeaning: "forehead / stir / plow handle", middle: "baw-a (take away), oweh (blanket), baniwit (fishing rod), bawok (goiter)", middleMeaning: "take away / blanket / fishing rod", final: "abaw (beetle), lengew (miss), agiw (cobweb), yawo (arrow)", finalMeaning: "beetle / miss / arrow" },
  { letter: "Y y", upperLower: "Y y", sampleWord: "yawo", meaning: "arrow", initial: "yawong (bowl), yege (shake), yiro (galvanized iron), yoro (starch), yuma (supporter)", initialMeaning: "bowl / shake / iron / starch", middle: "gayaman (centipede), keyekey (eel), korokoy (sand lice)", middleMeaning: "centipede / eel / sand lice", final: "aya (ant), le-ey (neck), bayi (hunting bow), okoy (egg)", finalMeaning: "ant / neck / bow / egg" }
];

export const ORTHOGRAPHY_RULES: GuideRule[] = [
  {
    id: "rule-1",
    ruleNumber: "Giyah 1 / Rule 1",
    title: "Glottal Stop Consonant (Katinig ya Glottal Stop)",
    nativeTitle: "Hay pagtegen ha paghalita (glottal stop)",
    description: "The glottal stop is an abrupt pause or catch in the voice (impit na tunog). In Sambal Botolan, it is systematically represented using hyphens (-) and circumflex accents (^).",
    examples: [
      { word: "da-an", meaning: "old / luma", note: "Hyphen between two identical vowels: da-an, ha-a (banana), la-ab (cry), le-ey (neck), to-ol (knee)" },
      { word: "ba-in / ma-in", meaning: "that / there is", note: "Hyphen between different vowels: ba-in, ha-in, ma-in, pa-en (bait), gi-ek (thresh), ta-en (fish trap). (Exceptions: aem, aep, kaen)" },
      { word: "tag-ay / pag-ong", meaning: "height / turtle", note: "Hyphen between consonant and vowel: tag-ay, hal-ak, beg-ang (molar), pag-ong (turtle), bot-o (bone/seed)" },
      { word: "mag-ilba / man-angaw", meaning: "to wash / to cry", note: "Hyphen between prefixes mag-, nag-, pag-, man- and root words starting with a vowel: mag-ilba, man-angaw, pag-ilgo" },
      { word: "ayâ / bigâ", meaning: "ant / taro (gabi)", note: "Word-final glottal stop is written with a circumflex accent (kudlit ha babo): ayâ, bigâ" }
    ]
  },
  {
    id: "rule-2",
    ruleNumber: "Giyah 2 / Rule 2",
    title: "The Vowel /E/ (Patinig ya /E/)",
    nativeTitle: "Hay Panalahtah nin titik /e/",
    description: "The pronunciation of /a/, /i/, /o/, and /u/ in Sambal Botolan is identical to standard Filipino. The letter /e/, however, is an unrounded central vowel pronounced like the 'e' in the Ilokano affirmative word 'wen' or the 'e' in English 'roses'.",
    examples: [
      { word: "elek", meaning: "snore (hilik)" },
      { word: "ngipen", meaning: "tooth / teeth (ngipin)" },
      { word: "ebeng", meaning: "thin / mucus (payat)" },
      { word: "ahem", meaning: "sour (maasim)" }
    ]
  },
  {
    id: "rule-3",
    ruleNumber: "Giyah 3 / Rule 3",
    title: "Suffixation with Consonant /H/ (Katinig ya /H/)",
    nativeTitle: "Panggamit nin litran /h/ ha kapagyanan",
    description: "The consonant /h/ is preserved or added when suffixing words ending in vowels to form derivatives and passive verb conjugations.",
    examples: [
      { word: "ipeh + en = ipehen", meaning: "to be infested with cockroaches" },
      { word: "gahgah + an = gahgahan", meaning: "to brush thoroughly / is-isan" },
      { word: "pehpeh + en = pehpehen", meaning: "to squeeze calamansi/lemon / pigain" },
      { word: "balah + en = balahen", meaning: "to drain river shallows for catching fish" }
    ]
  },
  {
    id: "rule-4",
    ruleNumber: "Giyah 4 / Rule 4",
    title: "Borrowed Words & Names (Indam ya Halita)",
    nativeTitle: "Pamamaraan ha kawkatinig ya indam",
    description: "Rules for foreign loanwords, technical vocabulary, and everyday vocabulary borrowed into Sambal Botolan.",
    examples: [
      { word: "Manuel L. Quezon / Zambales", meaning: "Names of people and places retain original letters (c, f, j, ñ, q, v, x, z)." },
      { word: "cellphone, laptop, Xerox, CT scan", meaning: "Modern technology & scientific terms are retained in standard international spelling." },
      { word: "Dominggo, Wibis, Iniro, Siptimbri", meaning: "Days of the week and months follow Sambal Botolan orthography (Iniro, Pibriro, Marso, Abril, Mayo, Hunyo, Hulyo, Agosto, Siptimbri, Uktubri, Nobimbri, Disimbri)." },
      { word: "bolpin, radyo, lapis, panyo, kutsara", meaning: "Everyday borrowed nouns are respelled to match Sambal phonology." }
    ]
  },
  {
    id: "rule-5",
    ruleNumber: "Giyah 5 / Rule 5",
    title: "Vowel Lengthening (Makara ya Tunoy)",
    nativeTitle: "Para ha paw patinig ya ma-in makara ya tunoy",
    description: "When a vowel is lengthened in duration, the letter symbol is doubled (an-ihulat nin loway bisis).",
    examples: [
      { word: "deem", meaning: "dark" },
      { word: "leem", meaning: "cloud" },
      { word: "dee", meaning: "string of guitar" },
      { word: "teek", meaning: "deaf person / ear" },
      { word: "daan", meaning: "road / path" },
      { word: "baan", meaning: "isn't it (di ba)" },
      { word: "boo", meaning: "variety of bamboo" }
    ]
  },
  {
    id: "rule-6",
    ruleNumber: "Giyah 6 / Rule 6",
    title: "Contractions & Short Forms (Contraction boy Ipek ya Halita)",
    nativeTitle: "No ampa-ipeken ya loway halita",
    description: "In conversational speech and literature, two words can contract into one. Both the long and shortened forms are fully accepted.",
    examples: [
      { word: "habayto = hayto", meaning: "that (iyon)" },
      { word: "tamo nin = tamon", meaning: "we who / tayo (tayong)" },
      { word: "hila nin = hilan", meaning: "they who (silang)" },
      { word: "wana ni = wani / wanin", meaning: "said by (sabi ng)" },
      { word: "alwa nin = alwan", meaning: "not / isn't (hindi)" },
      { word: "hana = ana", meaning: "already (na)" },
      { word: "hako = ako", meaning: "I / me (ako, ko)" }
    ]
  }
];

export const GRAMMAR_SECTIONS: GrammarSection[] = [
  {
    id: "markers",
    title: "Markers & Clause Structure",
    nativeTitle: "Markers boy Clause Structure",
    explanation: "Sambal Botolan distinguishes between Impersonal (objects, places, events) and Personal (people) nominal markers across three functional cases: Topic/Focus, Possessor/Agent, and Oblique/Beneficiary.",
    table: {
      headers: ["Case", "Impersonal Marker (Bagay / Dogal)", "Personal Marker (Tawo)"],
      rows: [
        ["1. Topic / Focus (Ang)", "ya (Hay / Ya)", "hi (Si)"],
        ["2. Possessor / Agent (Ng / Ni)", "na, ka, nin (Ng)", "ni (Ni)"],
        ["3. Oblique / Direction / Recipient (Sa / Kay)", "ka, ha (Sa)", "koni, koy, kan (Kay)"]
      ]
    },
    examples: [
      { sentence: "Malawang ya bakil.", breakdown: "Wide [Topic] forest", filipino: "Malawak ang gubat.", english: "The forest is wide." },
      { sentence: "Maganda hi Linda.", breakdown: "Beautiful [Topic-Pers] Linda", filipino: "Maganda si Linda.", english: "Linda is beautiful." },
      { sentence: "Malhay ya bali nin lalaki.", breakdown: "Big [Topic] house [Poss] man", filipino: "Malaki ang bahay ng lalaki.", english: "The house of the man is big." },
      { sentence: "Nangan ya bake nin ha-a.", breakdown: "Ate [Topic] monkey [Obj] banana", filipino: "Kumain ang unggoy ng saging.", english: "The monkey ate some banana." },
      { sentence: "Kinan nin bake ya ha-a.", breakdown: "Ate [Agent] monkey [Topic] banana", filipino: "Kinain ng unggoy ang saging.", english: "The monkey ate the banana." },
      { sentence: "Nangan hi Toto nin human.", breakdown: "Ate [Topic-Pers] Toto [Obj] suman", filipino: "Kumain si Toto ng suman.", english: "Toto ate a piece of suman." },
      { sentence: "Kinan ni Toto ya human.", breakdown: "Ate [Agent-Pers] Toto [Topic] suman", filipino: "Kinain ni Toto ang suman.", english: "Toto ate the suman." },
      { sentence: "Inggawa ni Toto ya kona ha aho.", breakdown: "Gave [Agent] Toto [Topic] fish to dog", filipino: "Ibinigay ni Toto ang ulam sa aso.", english: "The viand was given by Toto to the dog." },
      { sentence: "Impatong ni Toto ya libro ha lamisa.", breakdown: "Placed [Agent] Toto [Topic] book on table", filipino: "Inilagay ni Toto ang libro sa mesa.", english: "Toto put the book on the table." },
      { sentence: "Inggawa ni Toto ya bulaklak koni Nini.", breakdown: "Gave [Agent] Toto [Topic] flower to [Recip] Nini", filipino: "Nagbigay si Toto ng bulaklak kay Nini.", english: "Toto gave a flower to Nini." }
    ]
  },
  {
    id: "plurals-questions",
    title: "Plural Indicators & Question Words",
    nativeTitle: "Ampanukoy nin Malake boy Hawpastang",
    explanation: "Plurality in Botolan Sambal is marked with 'aw-' before vowels, and consonant-reduplication + 'aw' before consonants. Questions can be marked with the particle 'nayi'.",
    examples: [
      { sentence: "aw-abaw, aw-etak, aw-ipeh, aw-oyap, aw-uyha", breakdown: "Plural prefix 'aw-' before root words starting with vowels", filipino: "mga salagubang, mga itak, mga ipis, mga bugtong, mga usa", english: "beetles, bolos, cockroaches, riddles, deer" },
      { sentence: "bawbaka, dawdamuwag, kawkeren, mawmanok, tawtawo", breakdown: "Consonant initial: duplicate first consonant + aw", filipino: "mga baka, mga kalabaw, mga kaldero, mga manok, mga tao", english: "cows, carabaos, cooking pots, chickens, people" },
      { sentence: "Inggawa nayi ni Toto ya baw bulaklak koni Nini?", breakdown: "'nayi' is the interrogative particle", filipino: "Nagbigay ba si Toto ng mga bulaklak kay Nini?", english: "Did Toto give some flowers to Nini?" },
      { sentence: "Hino ya nanay mo?", breakdown: "Hino = Who (Sino)", filipino: "Sino ang nanay mo?", english: "Who is your mother?" },
      { sentence: "Anya ya ngalan mo?", breakdown: "Anya = What (Ano)", filipino: "Ano ang pangalan mo?", english: "What is your name?" },
      { sentence: "Ayri ka mako?", breakdown: "Ayri = Where (Saan)", filipino: "Saan ka pupunta?", english: "Where are you going?" },
      { sentence: "Makano ka murong?", breakdown: "Makano = When (Kailan)", filipino: "Kailan ka uuwi?", english: "When are you going home?" },
      { sentence: "Mani ungno ya dolo mo? / Ungno ya pawpatel mo?", breakdown: "Mani ungno / Ungno = How much / How many", filipino: "Magkano ang damit mo? / Ilan kayong magkakapatid?", english: "How much is your clothes? / How many siblings do you have?" },
      { sentence: "Pangno ka ampanluto kanen?", breakdown: "Pangno = How (Paano)", filipino: "Paano ka nagsasaing?", english: "How do you cook rice?" }
    ]
  },
  {
    id: "pronouns",
    title: "Pronoun Paradigms (Pawpanghalip)",
    nativeTitle: "Pawpanghalip: Unan, Pangalawa, boy Pangatlon Grupo",
    explanation: "Sambal Botolan features three sets of pronouns corresponding to grammatical focus, agent/possessor, and beneficiary/oblique.",
    table: {
      headers: ["Person", "Set 1: Topic / Focus (Ako / Ikaw / Siya)", "Set 2: Possessor / Agent (Ko / Mo / Niya)", "Set 3: Oblique / Beneficiary (Akin / Iyo / Kaniya)"],
      rows: [
        ["1st Sing. (I / Me / My)", "hiko (akó)", "ko (ko)", "ikon ko / kongko / ikongko (sa akin)"],
        ["2nd Sing. (You / Your)", "ka, hika (ka, ikáw)", "mo (mo)", "ikon mo / komo (sa iyó)"],
        ["3rd Sing. (He / She)", "hiya (siyá)", "na (niyá)", "ikon na / kona (sa kaniyá)"],
        ["1st Dual / Incl. (We - inclusive)", "kitamo / hitamo (táyo)", "tamo (nátin)", "kontamo (sa átin)"],
        ["1st Plur. Excl. (We - exclusive)", "hikayi (kamí)", "nawen (námin)", "ikon nawen / konnawen (sa ámin)"],
        ["2nd Plur. (You all)", "hikawo (kayó)", "moyo (ninyó)", "ikon moyo / komoyo (sa inyó)"],
        ["3rd Plur. (They / Them)", "hila (silá)", "la (nilá)", "ikon la / konla (sa kanilá)"]
      ]
    },
    examples: [
      { sentence: "Hiko ay taga-Zambales.", filipino: "Ako ay taga-Zambales.", english: "I am from Zambales." },
      { sentence: "Ayri ka mako, hika?", filipino: "Saan ka pupunta, ikaw?", english: "Where are you going, you?" },
      { sentence: "Inggawa na ya libro kongko.", filipino: "Ibinigay niya ang aklat sa akin.", english: "He gave the book to me." },
      { sentence: "Bali nawen ya bayri.", filipino: "Bahay namin ito rito.", english: "This here is our house." },
      { sentence: "Mita tamo na!", filipino: "Tayo na / lakad na tayo!", english: "Let's go now!" }
    ]
  }
];

export const AW_ISTORYA: Story[] = [
  {
    id: "story-1",
    title: "Ayin Kona",
    author: "Johnson Cabangon",
    designation: "Principal-I, Poonbato & Nacolcol Elementary School",
    location: "Botolan, Zambales",
    culturalNote: "An authentic narrative about brotherly respect, fishing/hunting for viands (kona), and the blessings of Apo Namalyari (the Supreme Creator of the Aeta & Sambal communities).",
    paragraphs: [
      {
        sambal: `“Kaka, kaka, anta hay amot, bigla nanguran?”, pastang ni Totoy. “Agka mag-ispanta ta biyaya ba-in ni Apo Apang”, wani ni kaka. “Helken mo noboka, main tamon kona.” Nag-ispanta hi Totoy ha inilgo ni kaka.`,
        filipino: `“Kuya, kuya, bakit napakainit tapos biglang umulan?”, tanong ni Totoy. “Huwag kang magtaka dahil biyaya iyan ni Apo Namalyari”, sabi ni kuya. “Tingnan mo bukas, magkakaroon tayo ng ulam.” Nagtaka si Totoy sa sinabi ni kuya.`,
        english: `“Brother, brother, why was it scorching hot and then suddenly rained?”, asked Totoy. “Do not be surprised, for that is a blessing from Apo Namalyari,” replied his elder brother. “Just see tomorrow, we will have food to eat.” Totoy was amazed at what his brother said.`
      },
      {
        sambal: `Kinabokahan, ampanganti hi Totoy nin kona piro ayin et. “Kaka, kaka, mahilem hana ayin et kona”. “Wamoyto ma-in tamon ma-ikakakan?”, pastang oman ni Totoy. “Manganti ka bay totoy”, tobay ni kaka kona. Kinamahileman, wani kaka kongko, “Mangwa ka nin pambiyanan ta ma-in tan lakwen”.`,
        filipino: `Kinabukasan, naghihintay si Totoy ng ulam ngunit wala pa. “Kuya, kuya, hapon na wala pa ring ulam.” “Akala ko ba may makakain tayo?”, tanong muli ni Totoy. “Maghintay ka lang totoy”, sagot ng kuya sa kanya. Nang dapit-hapon, sabi ni kuya sa akin, “Kumuha ka ng paglalagyan dahil may pupuntahan tayo.”`,
        english: `The next day, Totoy waited for their viand but there was none yet. “Brother, brother, it is already afternoon and there is still no food.” “I thought we would have something to eat?”, asked Totoy once more. “Be patient, Totoy,” his brother answered. By late afternoon, his brother told him, “Get a container, we have somewhere to go.”`
      },
      {
        sambal: `Ha dogal ya nilako nawen ay malake ya anlompad. Hato ya dinakep nawen. Aw abaw awod, ya biyaya ya inggawa konnawen. Kinamahileman, magana’y pamangan ta malake hana ya kona ya ma-ikakakan.`,
        filipino: `Sa lugar na pinuntahan namin ay maraming lumilipad. Iyon ang hinuli namin. Mga salagubang pala, ang biyayang ipinagkaloob sa amin. Nang sumapit ang gabi, masarap ang naging salo-salo dahil marami nang ulam na makakain.`,
        english: `At the place where we went, swarms of insects were in flight. That is what we caught—June beetles (aw-abaw), the blessing provided to us. By evening, everyone ate joyfully because there was an abundance of food for everyone.`
      }
    ],
    vocabulary: [
      { word: "Apo Namalyari / Apo Apang", filipino: "Diyos / Tagapaglikha ng kabundukan", english: "The Creator God in Zambales indigenous belief" },
      { word: "kona", filipino: "ulam", english: "viand / main dish" },
      { word: "aw-abaw", filipino: "mga salagubang", english: "edible June beetles (a seasonal delicacy)" },
      { word: "manganti", filipino: "maghintay", english: "to wait / expect" },
      { word: "kaka", filipino: "kuya / ate", english: "elder brother or sister" }
    ]
  },
  {
    id: "story-2",
    title: "Ha Balah (At the River)",
    author: "Linda D. Gamboa",
    designation: "Master Teacher-I, Baquilan Resettlement School-I",
    location: "Botolan, Zambales",
    culturalNote: "Describes the Saturday tradition of indigenous families visiting the crystal river (balah) in Baquilan to wash clothes, swim, catch fish, and cook rice together outdoors.",
    paragraphs: [
      {
        sambal: `No allo nin Sabado, hikayin mipapatel ay ampaglako ha balah. Gitan-gitan ya i-ilbahan, kalamo ya aho, hi kaka, hi Poto, boy hi Nini ay ampaglako kayi nin balah.`,
        filipino: `Tuwing araw ng Sabado, kaming magkakapatid ay pumupunta sa ilog. Dala-dala ang mga lalabhan, kasama ang aso, si kuya, si Poto, at si Nini, kami ay nagtutungo sa ilog.`,
        english: `Every Saturday, we siblings go to the river. Carrying piles of laundry, accompanied by our dog, our elder brother, Poto, and Nini, we make our way down to the water.`
      },
      {
        sambal: `Peleg ampag-ilba, ampaliyo itaman hi Poto boy hi Nini. Manlapet itaman hi kaka emen ma-in pangugtuhan. Manampaw hako nin kanen kadumali ta emen pangawoto ay ikakan itaman.`,
        filipino: `Habang naglalaba, naliligo naman si Poto at si Nini. Nangingisda naman si kuya upang may maiulam sa tanghalian. Nagsasaing naman ako ng kanin upang pagsapit ng luto ay makakain kaagad.`,
        english: `While laundry is being washed, Poto and Nini splash and swim in the cool stream. Our elder brother fishes so that we have fresh food for lunch. Meanwhile, I cook the rice over fire so everything will be ready when it is done.`
      },
      {
        sambal: `Hay gana nawen mangan. Pangayari mangan malyo kayin kaganawan. Pamurong nawen malinis hana ya aw i-ilbahan. Makapi-urong et nin ma-ikakan. Ha Sabado oman mako kayi na et maliyo boy mag-ilba ha balah.`,
        filipino: `Napakasarap naming kumain. Pagkatapos kumain, naligo kaming lahat. Sa aming pag-uwi ay malinis na ang mga nilabhan, at may maiuuwi pa kaming pagkain. Sa susunod na Sabado, muli kaming pupunta upang maligo at maglaba sa ilog.`,
        english: `How delicious our meal tasted! After eating, everyone bathed together in the river. Upon returning home, all our clothes were clean, and we even had leftovers to bring back. Next Saturday, we will visit the river once again.`
      }
    ],
    vocabulary: [
      { word: "balah", filipino: "ilog", english: "river" },
      { word: "mipapatel", filipino: "magkakapatid", english: "siblings" },
      { word: "ampag-ilba", filipino: "naglaba / naglalaba", english: "washing clothes" },
      { word: "manlapet", filipino: "nangingisda", english: "catching fish" },
      { word: "manampaw", filipino: "nagsasaing", english: "cooking rice" }
    ]
  },
  {
    id: "story-3",
    title: "Hay Bakil Owaog (Mount Owaog)",
    author: "Carol Saribay",
    designation: "Teacher-I, LAKAS High School",
    location: "Villar, Loob-Bunga, Botolan, Zambales",
    culturalNote: "A heartfelt account of indigenous volunteer teachers climbing through steep mountain ranges in Botolan to register indigenous children for schooling.",
    paragraphs: [
      {
        sambal: `Hay Owaog ay mihay dogal ha banowa nin Botolan. Dogal ya ampa-iriyan nin kaw katutubo. Habayti ya dogal ya hati ay mabakil. Mihay allo, nag-ilgo hi Sister Siony, mihay madre, “kailangan tamon maglista nin aw anak ya mag-aral ha an-ipaireng tamo’y iskwilawan.” “Awo po Sister”, wani Carol.`,
        filipino: `Ang Owaog ay isang lugar sa bayan ng Botolan kung saan naninirahan ang mga katutubo. Ang lugar na ito ay mabundok. Isang araw, nagsalita si Sister Siony: “Kailangan nating maglista ng mga batang mag-aaral sa itatayo nating paaralan.” “Opo Sister,” sabi ni Carol.`,
        english: `Owaog is a mountain settlement in the municipality of Botolan inhabited by indigenous families. One day, Sister Siony remarked: “We need to list all the children who will attend our newly established school.” “Yes, Sister,” answered Carol.`
      },
      {
        sambal: `Kinamahambakan, hi Carol, hi Daisy, mihay manuro ya ampa-iri ha Owaog, bot lowa’y anak ya lalaki ay nako ha mani bali-bali, emen maglista nin aw anak ya mipag-aral. Tinanggap kayi itaman nin maayos nin balang bali ya nilako nawen. Tatlo’y matag-ay ya bakil ya inoli nawen bayo nawen na-abot ya lowa’y bali.`,
        filipino: `Kinaumagahan, si Carol, si Daisy, isang gurong nakatira sa Owaog, at dalawang batang lalaki ay nagbahay-bahay upang maglista ng mga mag-aaral. Malugod kaming tinanggap sa bawat tahanan. Tatlong matatayog na bundok ang aming inakyat bago narating ang iba pang kabahayan.`,
        english: `The next morning, Carol, Daisy (a local teacher living in Owaog), and two young boys walked from house to house to register the prospective learners. Every family welcomed us warmly. We traversed three towering peaks before reaching the distant homes.`
      },
      {
        sambal: `No pangno ka-irap moli bakil ay undo itaman kaparan mona-oy bana ta pa-aypa ana. Panlomateng nawen ha bali nin ampa-iriyan nawen ay natanam ko’y sobra’n pakil ko kaya bongat na-ihip ko ya aw-anak ya labay mag-aral kaya midyo maliga ya puso ko maski’n pakil.`,
        filipino: `Kahit gaano kahirap umakyat ng bundok, gumaan ang pakiramdam sa pagbaba dahil pababa na. Pagdating sa aming tinutuluyan, naramdaman ko ang matinding pagod ng aking binti, ngunit nang maisip ko ang mga batang nagnanais mag-aral, napuno ng ligaya ang aking puso.`,
        english: `As strenuous as climbing the mountains was, going downhill brought relief. Back at our base, my weary legs ached severely; yet remembering the bright faces of children eager to study filled my heart with deep warmth and peace.`
      }
    ],
    vocabulary: [
      { word: "bakil", filipino: "bundok / kabundukan", english: "mountain / forest range" },
      { word: "ampa-iriyan", filipino: "tinitirhan / tirahan", english: "dwelling place / community" },
      { word: "manuro", filipino: "guro", english: "teacher" },
      { word: "inoli", filipino: "inakyat", english: "climbed / scaled" },
      { word: "maliga", filipino: "masaya / maligaya", english: "joyful / happy" }
    ]
  },
  {
    id: "story-4",
    title: "Hay Bakil Bangked (Mount Bangked)",
    author: "Anna Liza D. Sabian",
    designation: "IP Representative",
    location: "Barangay Malomboy, Botolan, Zambales",
    culturalNote: "Details a journey into Mount Bangked in Sitio Babayan, Moraza, where four friends find abundant wild nature and discover broom-making grass (bagoyboy) to sustain their livelihood.",
    paragraphs: [
      {
        sambal: `Mihay allo naka-ihip ya apat ya mitata-amigo nin mako ha bakil Bangked. Hati ay makit ha barangay Moraza, Sitio Babayan. Malake ya kawkatutubo ya ampa-iri bayri. Ampanggahak, ampananem pali, biga, loko boy hawha-a. Maganda ya bakil. Puno nin kaw kayon bakil boy aw ayop, manok dikot, baoy dikot boy uyha.`,
        filipino: `Isang araw, naisipan ng apat na magkakaibigan na magpunta sa bundok ng Bangked sa Sitio Babayan, Barangay Moraza. Maraming katutubo ang naninirahan doon. Nagkakaingin sila, nagtatanim ng palay, gabi, kamoteng kahoy, at saging. Puno ang gubat ng ligaw na hayop: labuyo, baboy-damo, at usa.`,
        english: `One day, four friends decided to venture into Mount Bangked located in Sitio Babayan, Barangay Moraza. Many indigenous people reside there, practicing upland farming and harvesting rice, taro, sweet potato, and bananas. The lush forest is teeming with wildlife: wild fowl, boars, and deer.`
      },
      {
        sambal: `Kinamahileman, nakalateng ya mitata-amigo, hili Bapa Sammy, Bapa Tiwarik, Indon Maybot, boy Indon Aray. Wanan hatoy tu-a, “Diritsuhen moyo ba-in ya hapa, biha muli kawo ha gahak ta bayo lumuhan kawo oman ha hapa ya panay bato.” Tinombay hi Bapa Sammy, “Tata, pwidi nayi nin lamowan mo kayi?” “Awo”, tobay nin hatoy tu-a.`,
        filipino: `Kinahapunan ay nakarating ang magkakaibigan: sina Mang Sammy, Mang Tiwarik, Aling Maybot, at Aling Aray. Sabi ng isang matanda: “Diretsuhin ninyo ang batis, akyatin ninyo ang kaingin, at bumaba kayo sa batong sapa.” Tanong ni Mang Sammy: “Tata, maaari mo ba kaming samahan?” “Oo,” sagot ng matanda.`,
        english: `By afternoon, the four companions arrived: Uncle Sammy, Uncle Tiwarik, Aunt Maybot, and Aunt Aray. A village elder advised: “Follow the stream straight, climb the hillside farm, and descend across the rocky creek.” Uncle Sammy asked: “Elder, could you accompany us?” “Yes,” the elder replied.`
      },
      {
        sambal: `Ha pama-inawa napatagan ni Indo Sammy ya emen intanem ya bawbagoyboy, hati baytoy anggaw-en kali nin tambo. Ha katowa-an na, pinagbobolyawan na ya lawlamo na. Angggan nagyayamon hilayna nin Bagoyboy ta i-urong la. Kinabokahan norong hilayna ha bali la nin maligha ta ma-in hilayna nin gaw-en kalin tambo ya ilako la ha pistan banowan Botolan.`,
        filipino: `Sa kanilang pagpapahinga, napansin nila ang malalagong damong bagoyboy na ginagawang walis tambo. Sa tuwa ay tinawag niya ang kanyang mga kasama. Namitas sila ng bagoyboy upang iuwi. Kinabukasan ay umuwi silang masaya dahil may gagawin na silang walis tambo na maibebenta sa pista ng bayan ng Botolan.`,
        english: `While resting, Aunt Maybot noticed abundant wild tiger grass (bagoyboy) used for crafting soft brooms. Overjoyed, she called out to the group. They gathered bundles of bagoyboy to bring home. The following morning, they returned to their village elated, ready to craft brooms to sell at the Botolan town fiesta.`
      }
    ],
    vocabulary: [
      { word: "bagoyboy", filipino: "damong tambo", english: "tiger grass used for making soft brooms" },
      { word: "gahak", filipino: "kaingin / upland farm", english: "cleared upland farming plot" },
      { word: "baoy dikot", filipino: "baboy damo", english: "wild boar" },
      { word: "uyha", filipino: "usa", english: "Philippine deer" },
      { word: "hapa", filipino: "batis / sapa", english: "mountain creek or stream" }
    ]
  },
  {
    id: "story-5",
    title: "Pamako ha Pinatubo (Journey to Mount Pinatubo)",
    author: "Roberto P. Cosme",
    designation: "Indigenous Peoples Elder",
    location: "Barangay Villar, Botolan, Zambales",
    culturalNote: "An elder's pilgrimage to Mount Pinatubo Crater—revered in indigenous belief as the sacred dwelling place of Apo Namalyari—recounting the trek, the crater lake vista, and preserving heritage.",
    paragraphs: [
      {
        sambal: `Hin nakaraan ya buwan nin Abril 20, 2017 ay naglako kayi ha bakil nin Pinatubo ya an ingaten nawen bali nin Apo Namalyari. Pirmi kayin ampako di paibat ha Loob-Bunga, Botolan, Zambales. Hay bawen nawen ay nawoto ya ha-a, ahin boy boya. Malawang ya kapati-an anggan ha aypa nin Pinatubo.`,
        filipino: `Noong nakaraang buwan ng Abril 20, 2017 ay nagtungo kami sa bundok ng Pinatubo na tinatawag naming tahanan ni Apo Namalyari. Palagi kaming pumupunta roon mula sa Loob-Bunga, Botolan, Zambales. Ang aming baon ay nilagang saging, asin, at bigas. Malawak ang kabuhanginan hanggang sa paanan ng Pinatubo.`,
        english: `In April 2017, we journeyed to Mount Pinatubo, revered by our ancestors as the sacred home of Apo Namalyari. We frequently depart from Loob-Bunga, Botolan, Zambales. Our provisions were simple: boiled bananas, salt, and rice. Vast expanses of volcanic sand stretched to the mountain slopes.`
      },
      {
        sambal: `Pagkaligha nawen hin na-abot nawen ya tuktok ya an ingaten nin “Mount Pinatubo Crater”. Hay ihip nawen ay agnawen nin ma-abot, pero napagtiyagaan nawen. Natamolawan nawen ya Pampanga, Tarlac boy dagat nin Tsina. Hay gana nawen ta di awod konnawen ha Zambales ay ma-ari makit ya mawmaganda’y dawdogal.`,
        filipino: `Laking tuwa namin nang marating namin ang tuktok na tinatawag na “Mount Pinatubo Crater”. Akala namin ay hindi namin mararating, ngunit nagtiyaga kami. Natanaw namin ang Pampanga, Tarlac, at ang Dagat Kanlurang Pilipinas. Napakasarap sa pakiramdam na dito sa Zambales ay makikita ang ganitong kagandahan.`,
        english: `Overwhelming joy greeted us as we reached the crater summit of Mount Pinatubo. Though the trail tested our endurance, we persevered. From the crest, we gazed upon Pampanga, Tarlac, and the West Philippine Sea. It brings immense pride that such majestic wonder resides in our homeland of Zambales.`
      },
      {
        sambal: `Pan-omaypa, inilgo nawen ha pawpatel no labay lan makit ya dawdogal ya maganda, moli hila ha Pinatubo. Matamolawan lay na ya kagandawan dogal. Pa-ibat hinhato, malake hana ya tawtawo ya ampaglako ha Pinatubo. Maligha kayi ta angkabiyan alaga boy angka-alagaan hana nin maayos ya Pinatubo.`,
        filipino: `Sa aming pagbaba, sinabi namin sa mga kapatid na kung nais nilang makakita ng magagandang lugar ay umakyat sila sa Pinatubo. Mula noon, marami nang tao ang nagpupunta rito. Masaya kami dahil pinahahalagahan at inaalagaan nang maayos ang Pinatubo.`,
        english: `Upon descending, we urged our kin and community to climb Pinatubo to witness its sacred splendor. Ever since, many travelers have come. We are proud and grateful that Mount Pinatubo is preserved and respected with care.`
      }
    ],
    vocabulary: [
      { word: "Apo Namalyari", filipino: "Diyos ng mga Ayta sa Pinatubo", english: "Supreme Deity of the Pinatubo Indigenous Peoples" },
      { word: "tuktok", filipino: "tugatog / rurok", english: "mountain peak / crater rim" },
      { word: "kapati-an", filipino: "buhanginan / lahar fields", english: "volcanic sand dunes / sand plains" },
      { word: "natamolawan", filipino: "natanaw / nakita", english: "beheld from a vantage / viewed" },
      { word: "angkabiyan alaga", filipino: "binibigyang-halaga / inaalagaan", english: "nurtured and preserved" }
    ]
  },
  {
    id: "story-6",
    title: "Hi Mariya (Maria)",
    author: "Maribel M. Dela Cruz",
    designation: "Teacher-I, San Juan Elementary School",
    location: "Botolan, Zambales",
    culturalNote: "An inspirational true-to-life account of an indigenous young girl from San Juan, Botolan who walked kilometers daily to help her parents in the fields, excelled in school, and returned to her village as an educator.",
    paragraphs: [
      {
        sambal: `Hi Mariya ay taga baryo nin San Juan, Botolan. Allo-allo ay ampaglako hi Mariya ha Mayamban, mihay sityo nin San Juan. Halos sa-ulado nay na ya daan. Tanda na no ongnoy patiko, ongnoy pu-on kato boy lomboy ya angkakit na. Ha Mayamban, ampamaliyan ya tatay ni Mariya. Bana ha mahipeg yay anak, antambayan nay tatay nan mananem kamoti boy tubo kalamo na hi kaka na Holyo.`,
        filipino: `Si Maria ay taga-baryo ng San Juan, Botolan. Araw-araw ay naglalakad siya patungong Mayamban, isang sityo ng San Juan. Saulo na niya ang daan: alam niya ang bawat liko, ang bawat puno ng santol at duhat. Doon ay nagsasaka ang kanyang ama. Dahil masipag siyang bata, tinutulungan niya ang kanyang ama na magtanim ng kamote at tubo kasama ang kanyang kapatid na si Julio.`,
        english: `Maria hails from the village of San Juan in Botolan. Every day she walked toward Sitio Mayamban. She knew every bend in the trail by heart, recognizing each santol and duhat plum tree along the path. In Mayamban, her father tended their farm. Being an industrious child, Maria eagerly assisted him in planting sweet potatoes and sugarcane alongside her brother Julio.`
      },
      {
        sambal: `Hay pananem ay alwan ma-irap para konla, ta anggaw-en lan dagaw. Ampikakamat hilan manaphon kamoti ha taw tubling. Lomateng mahilem ay mowako hilay na et morong. No ma-in aral ay aghila ampakatambay ha paliyan ta wana ni tatay na ay aghila magpalta boy mag-aral hilan mahampat ta emen lano ay ma-in hilan maganday tarabaho.`,
        filipino: `Ang pagtatanim ay hindi mahirap para sa kanila dahil ginagawa nilang laro. Masaya silang nag-aani ng kamote. Pagsapit ng hapon ay naglalakad na sila pauwi. Kapag may pasok sa eskuwela ay hindi sila pinapatrabaho sa bukid dahil bilin ng kanilang ama na huwag liliban at mag-aral nang mabuti upang magkaroon ng magandang kinabukasan.`,
        english: `Tilling the earth felt effortless to them because they turned hard work into play, cheerfully harvesting tubers along the terraces. When dusk fell, they journeyed home. On school days, their father strictly forbade them from skipping classes, insisting that education was their pathway to dignified careers.`
      },
      {
        sambal: `Hapa-eg ay ha Mayamban hana ampa-iri hi Mariya. Allo-allo yay na et ampowako baydo ha dati nan pagdaanan hinhato, piro alwan para makon mananem kamoti boy tubo no alwan para mananem nin karunungan ha aw-iskwila na ta miha yaynay ma-istra.`,
        filipino: `Sa kasalukuyan, sa Mayamban pa rin nakatira si Maria. Araw-araw pa rin siyang naglalakad sa dating landas na kanyang dinaanan noon—ngunit hindi na upang magtanim ng kamote at tubo, kundi upang magtanim ng karunungan sa kanyang mga mag-aaral, sapagkat isa na siyang guro.`,
        english: `Today, Maria still lives in Mayamban. Every sunrise finds her treading the very same mountain paths of her childhood—not to cultivate sweet potatoes and cane, but to sow seeds of knowledge and empowerment into the hearts of her indigenous students, for she has fulfilled her dream of becoming a schoolteacher.`
      }
    ],
    vocabulary: [
      { word: "mahipeg", filipino: "masipag", english: "industrious / hardworking" },
      { word: "paliyan", filipino: "bukid / palayan", english: "rice field / agricultural land" },
      { word: "sa-ulado", filipino: "saulo / kabisado", english: "memorized / familiarized" },
      { word: "karunungan", filipino: "karunungan / kaalaman", english: "wisdom / knowledge" },
      { word: "ma-istra / manunuro", filipino: "guro / titser", english: "schoolteacher" }
    ]
  }
];
