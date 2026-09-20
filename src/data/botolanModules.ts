/**
 * Botolan History and Culture course library (Polytechnic College of Botolan).
 * Content of Modules 4, 5 and 6. Sambal words, linguistic data, names, dates,
 * figures and prices are kept exactly as the modules give them. Prose taken
 * from third-party articles is summarised in our own words with the facts kept.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[] }
  | { t: "table"; headers: string[]; rows: string[][] }
  | { t: "terms"; items: { term: string; meaning: string; note?: string }[] }
  | { t: "sentences"; items: { sambal: string; english: string; note?: string }[] }
  | { t: "note"; text: string };

export interface ModuleSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface CourseModule {
  id: string;
  label: string;
  title: string;
  lesson: string;
  code: string;
  semester: string;
  objectives: string[];
  sections: ModuleSection[];
}

const COURSE = `Free Elective – Botolan History and Culture`;
const SCHOOL = `Polytechnic College of Botolan (formerly Botolan Community College), Botolan, Zambales`;

/* ====================================================================== */
/* MODULE 4                                                               */
/* ====================================================================== */
const MODULE_4: CourseModule = {
  id: "module-4",
  label: `Module 4`,
  title: `Indigenous Knowledge, Systems and Practices (IKSPs)`,
  lesson: `Indigenous Knowledge, Systems and Practices (IKSPs)`,
  code: `PR-WK-07 to WK-09`,
  semester: `1st Sem 2025-2026`,
  objectives: [
    `Understand what composes Indigenous Knowledge, Systems and Practices (IKSPs) contributory to IP culture.`,
    `Appreciate and respect the ingenuity of Botoleños by tracing the origin of customs, traditions and cultural beliefs.`,
  ],
  sections: [
    {
      id: "m4-info",
      title: `Module information & activities`,
      blocks: [
        {
          t: "table",
          headers: [`Item`, `Detail`],
          rows: [
            [`School`, SCHOOL],
            [`Program`, `Information and Communications Technology Program – Student Learning Module (SLM)`],
            [`Course`, COURSE],
            [`Semester & year`, `1st Sem 2025-2026`],
            [`Year level`, `4`],
            [`Module No.`, `PR-WK-07 to WK-09`],
            [`Lesson`, `Indigenous Knowledge, Systems and Practices (IKSPs)`],
            [`Module model`, `TORCH`],
            [`No. of pages`, `9`],
            [`Instructor`, `Edelwise S. Ignacio`],
          ],
        },
        { t: "note", text: `Module note: do not write anything on the module; use the answer sheets provided (or separate paper). Write your name, section, subject and module number on your answer sheet. Answer all activities. Honesty is the best policy.` },
        { t: "h", text: `Activity 1` },
        { t: "list", items: [`Answer from your own experience or knowledge: What do you know about Indigenous Knowledge, Systems and Practices? Explain.`] },
        { t: "h", text: `Activity 2` },
        { t: "list", items: [`List down example(s) of Indigenous Knowledge, Systems and Practices in Botolan.`] },
      ],
    },
    {
      id: "m4-what",
      title: `What are IKSPs?`,
      blocks: [
        { t: "p", text: `Since time immemorial, every community has been driven by the need to survive and to live meaningfully. A community's survival and continued growth rest on a few basic prerequisites; without them, community life can be harmed or disturbed. The module names three relationships:` },
        { t: "terms", items: [
          { term: `1. Relationship with the place`, meaning: `The link between the human community and its bio-geographical environment. Basic needs, livelihood, technologies, practices, symbols, meanings and decision-making are all connected to the place, and a community grows and develops by relating with it.` },
          { term: `2. Relationship with the human community`, meaning: `For a community to flourish its internal relationships must be nurtured and maintained. This shows in conflict-resolution practices, justice systems, self-help practices, and in the ways a community keeps its sense of unity, collective action and oneness.` },
          { term: `3. Relationship with the sacred / spiritual`, meaning: `Values, relating with the Creator, shared perspectives handed down across generations and the relationship with elders belong to the spiritual dimension. It guides the two relationships above; without it a community's moral and spiritual anchorage weakens, with grave consequences for community life.` },
        ]},
        { t: "p", text: `Seen this way, our ancestors also studied the fields we study in the university, only in a different way, and their products and creations are the evidence of that study. The knowledge of our ancestors, particularly of IP communities, is called Indigenous Knowledge Systems and Practices (IKSPs).` },
        { t: "h", text: `Indigenous Knowledge: Phases of Life (Yugto ng Buhay)` },
        { t: "p", text: `"Indigenous" means "rooted to a place"; the technologies a community produces are usually related to its bio-geographical environment.` },
        { t: "h", text: `Knowledge systems` },
        { t: "p", text: `Each product or creation reflects a knowledge system in itself, involving facts, information, methods, skills, theories and values. IKSPs are:` },
        { t: "list", items: [
          `Generated by a community`,
          `Experience-based and cumulative`,
          `Scientific / empirical – trial and error, careful observation`,
          `Changing and adaptive`,
        ]},
        { t: "p", text: `When a community passes its IKSPs from one generation to the next, refining and enriching them as they are passed on until they become the community's way of life, this is what we today call CULTURE.` },
        { t: "h", text: `IKSPs are not the same as culture` },
        { t: "p", text: `IKSPs can be documented in print or video and kept in a library, and a school may say it has complete documentation. But stored documentation does not translate into culture or culture-based education. IKSPs must be learned, practiced and passed on for them to count as culture. Culture-based education in IPEd means the educational goal is for IKSPs to be learned, passed on and practiced as a way of life in the community.` },
        { t: "note", text: `Learning standard: Establishing and sustaining a relationship of harmony with one's Ancestral Domain.` },
      ],
    },
    {
      id: "m4-systems",
      title: `Systems: farming, trading, hunting & other livelihood`,
      blocks: [
        { t: "p", text: `Systems named in the module: Upland Farming (Rice, Rootcrops), Fishing, Hunting, Gathering, Government & Customary Laws.` },
        { t: "h", text: `Farming` },
        { t: "p", text: `Farming is practiced in three locations: upland (gasak), upland (patal) and lowland.` },
        { t: "terms", items: [
          { term: `Gasak (swidden farm)`, meaning: `A cultivated area on the top or sides of the mountain where shrubs and trees have grown. Most families keep one because it mainly provides food and shelter, even in dire times. Being rain-fed and irregularly sloping, many crops are planted in small amounts: upland rice on the more regularly sloped patches; root crops and vegetables among shrubs or under trees; bananas on the steeper areas; mango, citrus and coconut on the rolling areas.`, note: `Cropping pattern during the year: upland rice – vegetables – cassava / sweet potato / taro / yam / ginger / patani.` },
          { term: `Patal (flat upland farm)`, meaning: `Flat areas on high ground of 1/2 to 1.5 hectares, planted to cassava, sweet potatoes, taro, yam and watermelons because they can be prepared with a plow and harrow.`, note: `Cropping pattern: sweet potato – cassava / taro – sweet potato / watermelon.` },
          { term: `Lahar (lowland farm)`, meaning: `Riverbeds surrounding the villages that retain water until December and dry up completely by March or April. Lowland farms are usually about 1000 sq.m. patches operated in addition to a gasak or patal farm where the residents' dwellings are located.`, note: `Cropping pattern: rice – sweet potato / vegetable – cassava in a year.` },
        ]},
        { t: "h", text: `Trading or vending` },
        { t: "p", text: `Some residents earn continuous income year-round by trading. Small farmers sell to local buyers at prices lower than the market price, or send their commodities to certain buyers in town through the local buyers and pay a fare of Php50.` },
        { t: "h", text: `Hunting` },
        { t: "p", text: `Hunting takes a lot of skill and there is no guarantee of what the forest offers. Hunters go for food and income and to sharpen their hunting skill; it is also their way of life.` },
        { t: "h", text: `Other sources of income` },
        { t: "p", text: `Fishing, charcoal production, gathering banana blossoms (pamumuso), share planting and working as hired labor in bigger farms. Farmers without equipment for wide cultivation often combine these; they cost nothing but labor.` },
      ],
    },
    {
      id: "m4-practices",
      title: `Practices: production, hunting & family life`,
      blocks: [
        { t: "p", text: `Facts, information, methods, skills, theories, values, customs and traditions.` },
        { t: "h", text: `Production` },
        { t: "list", items: [
          `Most residents plant rice (lowland and upland), root crops (sweet potato, cassava, taro, yam, ginger), vegetables (eggplant, beans, squash, winged bean, papaya) and fruits such as mango, bananas and watermelon.`,
          `Production is adapted to the natural fertility and water availability of the area.`,
          `Short-term crops are harvested in three to eight months; permanent crops such as mango, coconut and bananas are planted once but harvested monthly, biannually or annually.`,
        ]},
        { t: "h", text: `Marketing` },
        { t: "p", text: `Marketing depends on the amount produced. Most crops are for family consumption and extras are sold for cash to buy other necessities. For subsistence farmers, root crops are usually eaten, not sold; extra produce is sold or exchanged for rice or other necessities at the local store.` },
        { t: "h", text: `Hunting` },
        { t: "list", items: [
          `Done by teams of 2-5 persons, twice or thrice a month, catching wild fowls, alligators, wild pigs or deer with traps and nets.`,
          `Hunters stay in the forest for 3-7 days. Wild pigs come out in the rainy season and breed in September.`,
          `A hunting gun is now handier than the bow and arrow for bigger animals, although some hunters still use bows. Old techniques remain in use, and the hunter's skill in forecasting a productive hunting day still helps a lot.`,
          `The catch is often augmented by gathering mountain products with market demand: honey, wild orchids, herbal shampoo (gugo) and others, gathered while setting traps.`,
        ]},
        { t: "h", text: `Family life (mid-Baytan)` },
        { t: "p", text: `The locals of mid-Baytan are family-centered and closely knit, and they keep traditional practices and values that stress the importance of the family.` },
        { t: "list", items: [
          `Family routine and roles: newly married children build their dwellings near the parents' house and work on the father's farm for a while; later they are assigned a lot to farm for their own needs and become independent. Grandparents often live in the same compound and eat with one child's family but keep their own dwelling.`,
          `Livelihood is a shared responsibility of a married couple. When the children are grown, the mother works shoulder to shoulder with her husband in the field, and housekeeping becomes the task of the older daughters.`,
          `Children join their parents in farming, gathering banana blossoms, hunting, fishing or other livelihood as soon as they are able. Members of the household work together in harvesting, cleaning, sorting products and bringing them to market the next day.`,
        ]},
      ],
    },
    {
      id: "m4-marriage",
      title: `Marriage-related customs & values`,
      blocks: [
        { t: "p", text: `"Bandi", "langgad", "mamahabi" and "pahungaw" are the more popular cultural practices. They warn family and community members about the consequences of wrongdoing such as hurling insults, elopement and mistreating a wife.` },
        { t: "terms", items: [
          { term: `Bandi / Magbandi`, meaning: `Bandi is the obligation required of a man who wants to marry the woman he desires. Magbandi is the practice of settling the obligation, in cash or in kind, such as cavans of milled rice and fattened pigs the bride's family can use.` },
          { term: `Maglanggad`, meaning: `A punishment for hurting the feelings of a family, friend or neighbor by an insult, a rumor or any other way. When the wrongdoer asks forgiveness, he or she is asked for a "langgad", which may be preparing food for a lunch together with their families.` },
          { term: `Mamahabi`, meaning: `Formally asking for a girl's hand in marriage. Gifts are given to the bride's parents at the first meeting, where the parents agree on the date, the scale of preparation and the gifts the bride's family requires.` },
          { term: `Pahungao / Pahungaw`, meaning: `The obligations a groom who eloped with his bride must settle before they are forgiven and married. It is less strict because the elders must also consider that peace now has to be settled.`, note: `The module writes both "pahungaw" and "pahungao".` },
        ]},
        { t: "p", text: `Magbandi and mamahabi / pahungao ensure newlyweds a decent means of livelihood. The husband is indebted to the wife's family and so must treat his wife well; otherwise her family may intervene and take her back, which could be costly for him to reverse. Maglanggad reminds people to be considerate and respectful. Together these practices keep Ayta families whole and clans at peace.` },
        { t: "h", text: `Other prominent values` },
        { t: "p", text: `Values regarded as shields of survival, which helped people survive and recover from the losses of the Mt. Pinatubo eruption:` },
        { t: "list", items: [
          `Paglingon sa pinanggalingan (caring for one's roots)`,
          `Trust in God`,
          `Use of herbal medicine`,
          `Sharing`,
          `Pursuit of education`,
          `Determination`,
          `Industriousness`,
        ]},
        { t: "p", text: `Hunters share their catch with family and friends when they return to their villages after 3-4 days of hunting. They say: "Bawal magdamot, lalo na sa biyenan" (it is forbidden to be ungenerous, especially to parents-in-law).` },
      ],
    },
    {
      id: "m4-spirit",
      title: `Spirituality: Creator, spirits, man, rituals`,
      blocks: [
        { t: "p", text: `Spirituality: Creator (Lumikha), Spirit (Ispiritu), Man (Tao), Rituals.` },
        { t: "terms", items: [
          { term: `Apo Namalyari`, meaning: `God. Belief in Apo Namalyari and in spirits (anitos) also strengthens the will to survive.` },
          { term: `Bahag & pana`, meaning: `The g-string (bahag) and arrow (pana) are kept as cultural symbols of the people's practical philosophy and open-mindedness.` },
          { term: `Anito`, meaning: `Nature spirits living in specific places within the community and outside the boundaries of human settlement, especially in the mountains. Their physical attributes cannot be described because seeing an anito would cost one's life.` },
          { term: `Naanito`, meaning: `Illness by possession: the person and the anito are in the same body.` },
          { term: `Nabati / Nausog`, meaning: `Illness from being "greeted" (nabati) or "touched" (nausog) by the spirits, without possession. Nabati literally means "being greeted"; nausog colloquially means "being touched".` },
          { term: `Pag-aanito`, meaning: `Described by informants as the "highest" form of ritual a person can perform.` },
        ]},
        { t: "p", text: `The Ayta belief in the anito is still prevalent. Specific rules are followed to avoid the anito's wrath, such as avoiding places believed to be their dwellings (specific trees or mountains) and rules about when not to go out, since contact is believed to be deadly. Although people coexist with the anito, accidentally crossing paths with one is thought to bring disharmony to the individual (illness) and to the community (disrupted social processes).` },
        { t: "p", text: `The belief is a remnant of an older pantheon of gods ruled by Apo Namalyari. The anito belong to the lower class of mythical creatures yet affect everyday life more, because the higher gods live in inaccessible places such as mountain tops while the anito live closer to human settlements, so they are more likely to be antagonized knowingly or unknowingly. This encounter is seen as the cause of individual illness. The belief also instills environmental stewardship, since the anito's dwelling places must be respected and protected.` },
        { t: "p", text: `Pag-aanito is a séance of chanting, dancing, mediumship and ritual objects meant to heal the sick person (naanito) by removing the anito that causes the illness. The dance is believed to entice the spirit with food or gifts, or to threaten it with harm using the heirloom knife. In the literature, the ritual ends with the mang-aanito (the medium) falling unconscious as she "absorbs" the sickness; the community's practice matches the literature except for this ending. It is a communal affair in which each member has a task (audience, sick person, healer or helper) and helps mark the ritual space; without community support the pag-aanito cannot happen.` },
      ],
    },
    {
      id: "m4-summary",
      title: `Summary, quiz & references`,
      blocks: [
        { t: "h", text: `Summary` },
        { t: "p", text: `IKSPs consist of Indigenous Knowledge: Phases of Life (Yugto ng Buhay); Systems: Upland Farming (Rice, Rootcrops), Fishing, Hunting, Gathering, Government & Customary Laws; and Practices: facts, information, methods, skills, theories, values, customs and traditions. "Indigenous" means rooted to a place. IKSPs are generated by a community, experience-based and cumulative, scientific/empirical and adaptive. Passed on from generation to generation, they become the community's way of life, which we call CULTURE.` },
        { t: "h", text: `Quiz #6` },
        { t: "list", items: [
          `What composes Indigenous Knowledge, Systems and Practices (IKSPs)? What is your realization in this topic?`,
          `From the video references, write a reaction paper of a minimum of 150 words.`,
        ]},
        { t: "h", text: `Video references` },
        { t: "list", items: [
          `https://www.youtube.com/watch?v=D0waQ0uVMWQ`,
          `https://www.youtube.com/watch?v=re37MoFz4ZM`,
          `https://www.youtube.com/watch?v=J1aTI38UG0o`,
          `https://www.youtube.com/watch?v=_fv5YRASbaQ&t=192s`,
          `https://www.youtube.com/watch?v=86ubRlfdbyE`,
          `https://www.youtube.com/watch?v=__s238Jbn5k`,
          `https://www.youtube.com/watch?v=H68rkJsruWQ`,
          `https://www.youtube.com/watch?v=vLS1e1ZeSwQ`,
        ]},
        { t: "h", text: `References` },
        { t: "list", items: [
          `https://knepublishing.com/index.php/Kne-Social/article/view/2412/5302`,
          `Martinez, Rudolf Cymorr Kirby P. (2019). The Health Ritual of "Pag-aanito" among the Aetas of Nabuclod, Pampanga, Philippines. Research Article Vol. 1 No. 1, January-June 2019. San Beda University, Manila, Philippines.`,
        ]},
      ],
    },
  ],
};

/* ====================================================================== */
/* MODULE 5                                                               */
/* ====================================================================== */
const MODULE_5: CourseModule = {
  id: "module-5",
  label: `Module 5`,
  title: `IP Language and Literature: Sambal Botolan`,
  lesson: `IP Language and Literature`,
  code: `PR-WK-10`,
  semester: `1st Sem 2024-2025`,
  objectives: [
    `Understand the Sambal Botolan orthography and differentiate it from other Sambalic languages.`,
  ],
  sections: [
    {
      id: "m5-info",
      title: `Module information & activities`,
      blocks: [
        {
          t: "table",
          headers: [`Item`, `Detail`],
          rows: [
            [`School`, SCHOOL],
            [`Program`, `Information and Communications Technology Program – Student Learning Module (SLM)`],
            [`Course`, COURSE],
            [`Semester & year`, `1st Sem 2024-2025`],
            [`Year level`, `4`],
            [`Module No.`, `PR-WK-10`],
            [`Lesson`, `IP Language and Literature`],
            [`Module model`, `TORCH`],
            [`Instructor`, `Edelwise S. Ignacio`],
          ],
        },
        { t: "note", text: `Module note: do not write on the module; use the answer sheets provided. Answer all activities. Honesty is the best policy.` },
        { t: "h", text: `Activity 1` },
        { t: "list", items: [`List down all Sambal word/words that you know.`] },
        { t: "h", text: `Activity 2` },
        { t: "list", items: [`Do you know that there are Sambal languages? If yes, what are the other Sambal languages? What are the differences or similarities of Sambal Botolan to other Sambalic languages?`] },
      ],
    },
    {
      id: "m5-mother-tongue",
      title: `Sambal Botolan: mother tongue of the Aytas`,
      blocks: [
        { t: "p", text: `"Mother tongue" means more than the language learned from one's mother. It is the speaker's dominant and home language: not only the first language acquired chronologically, but the first in importance and in the speaker's ability to master its linguistic and communicative aspects.` },
        { t: "p", text: `Example given: a language school that advertises all-native English-speaking teachers would be criticized if those teachers only had vague childhood memories of speaking English with their mothers but grew up in a non-English-speaking country and were fluent only in a second language. In translation theory, the idea of translating only into one's mother tongue is a claim about translating into one's first and dominant language.` },
      ],
    },
    {
      id: "m5-family",
      title: `The Sambalic language family`,
      blocks: [
        { t: "terms", items: [
          { term: `Ayta Abellen`, meaning: `Spoken in the mountainous western part of Tarlac province in Luzon, reaching into Zambales on the western side of the Zambales mountains (Nitsch 1998). About 3500 speakers (Stone 2005).` },
          { term: `Ayta Ambala`, meaning: `Spoken by more than 2,000 Ayta in the provinces of Bataan and Zambales (Ramos 2005).` },
          { term: `Ayta MagAntsi`, meaning: `Spoken by approximately 4,200 Ayta in a number of sitios (small villages) in Tarlac, Pampanga and Zambales (Storck and Storck 2005).` },
          { term: `Ayta MagIndi`, meaning: `Spoken in Pampanga, in the areas of Nabuklod, Floridablanca, Pasbul, Planas, Kamias and others. Approximately 5000 speakers (Green 1991).` },
          { term: `Bolinao`, meaning: `Spoken by approximately 50,000 people (Gordon 2005) in the municipalities of Bolinao and Anda, Pangasinan (Persons 1998).` },
          { term: `Botolan Sambal`, meaning: `Spoken by 32,867 people (Gordon 2005) around the municipality of Botolan, Zambales. A group of Aytas living in the upland areas of Zambales also speak this language (Antworth 1979). The module also says it is spoken by over 30,000 people.` },
          { term: `Tina Sambal`, meaning: `Spoken by 70,000 people (Gordon 2005) in the northern half of Zambales and in two barangays across the border in Pangasinan (Goschnick 2005).` },
        ]},
        { t: "p", text: `Botolan Sambal is one of the Sambalic languages, a subgroup of the Central Luzon language family. Other Sambalic languages: Ambala Ayta, Abenlen Ayta, Bataan Ayta, Mag-indi Ayta, Mag-antsi Ayta, Bolinao and Tina Sambal. Other Central Luzon languages include Remontado Agta and Kapampangan.` },
        { t: "note", text: `The module says "one of eight Sambalic languages" in its body but "one of Seven Sambalic languages" (and "Mag-inchi Ayta") in its summary. The list above names Botolan Sambal plus seven others. Data are extracted from Antworth (1979).` },
      ],
    },
    {
      id: "m5-phonology",
      title: `Phonology`,
      blocks: [
        { t: "h", text: `Inventory` },
        { t: "table", headers: [`Class`, `Sounds`], rows: [
          [`Stops`, `p  t  k  '  (glottal stop, spelled - or \` here)`],
          [`Voiced stops`, `b  d  g`],
          [`Nasals`, `m  n  ng`],
          [`Fricatives`, `s  h*  (h is not in the original chart)`],
          [`Liquids`, `l  r`],
          [`Glides`, `w  y`],
          [`High vowels`, `i  e  u  (u is spelled o)`],
          [`Low vowel`, `a`],
        ]},
        { t: "terms", items: [
          { term: `Syllable structure`, meaning: `VC, CV, CVC` },
          { term: `Diphthongs`, meaning: `ay, iy, uy, iw, aw, iw`, note: `Listed exactly as in the module (iw appears twice).` },
          { term: `Stress is phonemic`, meaning: `híku 'elbow' vs. hikú 'I'; púsu' 'banana blossom' vs. pusú' 'heart'.` },
          { term: `Stress shifts one syllable with suffixation`, meaning: `tambáy + -an = tambayán 'help'.` },
        ]},
      ],
    },
    {
      id: "m5-case",
      title: `Case-marking particles`,
      blocks: [
        { t: "table", headers: [`Type`, `Nominative (full)`, `Nominative (minimal)`, `Genitive`, `Oblique`], rows: [
          [`Nonpersonal`, `hay`, `ya`, `nin`, `ha`],
          [`Personal sg.`, `hi`, `hi`, `ni`, `koni`],
          [`Personal pl.`, `hili`, `hili`, `nili`, `konli`],
        ]},
        { t: "sentences", items: [
          { sambal: `Namti ya lalaki nin baboy.`, english: `The man killed a pig.` },
          { sambal: `Namati hi Juan nin baboy.`, english: `Juan killed a pig.` },
          { sambal: `Nanaliw hi Maria nin habayti.`, english: `Maria bought some of this.` },
          { sambal: `Nambi hi Jose nin libro ha anak.`, english: `Jose gave a book to a/the child.` },
        ]},
      ],
    },
    {
      id: "m5-pronouns",
      title: `Pronouns`,
      blocks: [
        { t: "table", headers: [`Number`, `Person`, `Nominative, full`, `Nominative, minimal`, `Genitive`, `Oblique`], rows: [
          [`Singular`, `1`, `hiko`, `-ako, ko`, `ko`, `kongko`],
          [``, `1 + 2`, `hita`, `ta`, `ta`, `konta`],
          [``, `2`, `hika`, `ka`, `mo`, `komo`],
          [``, `3`, `hiya`, `ya`, `na`, `kona`],
          [`Plural`, `1`, `hikayi`, `kayi`, `nawen`, `konnawen`],
          [``, `1 + 2`, `hitamo`, `tamo`, `tamo`, `kontamo`],
          [``, `2`, `hikawo`, `kawo`, `moyo, yo`, `komoyo`],
          [``, `3`, `hila`, `hila`, `la`, `konla`],
        ]},
        { t: "note", text: `Notes: -ako 'I' occurs after consonants, -ko after vowels. There are also two fused pronouns: kata 'I to you' (from ko + ka) and katawo 'I to you (plural)' (from ko + kawo).` },
        { t: "h", text: `Deictic pronouns` },
        { t: "table", headers: [`Nominative full`, `Nominative minimal`, `Genitive`, `Oblique`, `Gloss`], rows: [
          [`habayti, hati`, `bayti, yati`, `nin habayti, nin hati`, `bayri, di`, `this`],
          [`haba-in, ha-in`, `ba-in, ya-in`, `nin haba-in, nin ha-in`, `bahen, hen`, `that (medial)`],
          [`habayto, hato`, `bayto, yato`, `nin habayto, nin hato`, `bayro, do`, `that (distal)`],
        ]},
        { t: "h", text: `Interrogative pronouns` },
        { t: "terms", items: [
          { term: `hino`, meaning: `who` },
          { term: `ayri`, meaning: `what (as printed in the module)`, note: `The module's own sentence "Ayri ka ampa-iri?" (Where are you living?) and 'ayripaman' (wherever) show ayri behaves as 'where'; anya is 'what'. Check with your instructor or the 2017 orthography guide.` },
          { term: `nakano`, meaning: `when, past` },
          { term: `makano`, meaning: `when, future` },
          { term: `anya`, meaning: `what` },
          { term: `antà`, meaning: `why` },
          { term: `ongno`, meaning: `how many / how much` },
          { term: `pangno`, meaning: `how (manner)` },
          { term: `komosta`, meaning: `how (quality), from Spanish` },
        ]},
        { t: "h", text: `Indefinite pronouns` },
        { t: "terms", items: [
          { term: `anyaman`, meaning: `whatever, anything` },
          { term: `hinoman`, meaning: `whoever, anybody` },
          { term: `ayripaman`, meaning: `wherever` },
        ]},
      ],
    },
    {
      id: "m5-nouns",
      title: `Plurals, linker & coordinators`,
      blocks: [
        { t: "h", text: `Noun pluralization` },
        { t: "p", text: `Caw- prefix (the first consonant of the root is repeated before -aw-, or aw- is used before vowels).` },
        { t: "terms", items: [
          { term: `law-lapis`, meaning: `pencils` },
          { term: `dawdowih`, meaning: `thorns` },
          { term: `aw-anak`, meaning: `children` },
          { term: `aw-otan`, meaning: `snakes` },
        ]},
        { t: "h", text: `Adjective pluralization` },
        { t: "p", text: `Caw- for unaffixed adjectives; manga- for ma- adjectives.` },
        { t: "terms", items: [
          { term: `manga-ganda`, meaning: `beautiful (plural)` },
          { term: `kawkatowà`, meaning: `ugly, bad (plural)` },
        ]},
        { t: "h", text: `Linker` },
        { t: "p", text: `ya, -y. Examples: malakè ya alahas 'much jewelry'; tatlo-y mipapatel '3 siblings'.` },
        { t: "h", text: `Coordinators` },
        { t: "table", headers: [`Sambal`, `Meaning`], rows: [
          [`boy`, `and`],
          [`o`, `or`],
          [`piro`, `but`],
          [`balè ta`, `but`],
          [`ta`, `because`],
          [`biha`, `and then`],
          [`no`, `if`],
          [`banà ta`, `because`],
          [`emen`, `in order to`],
          [`maski`, `although`],
        ]},
      ],
    },
    {
      id: "m5-numbers",
      title: `Numbers`,
      blocks: [
        { t: "h", text: `Cardinal` },
        { t: "table", headers: [`Number`, `Sambal`], rows: [
          [`1`, `miha`], [`2`, `lowa`], [`3`, `tatlo`], [`4`, `apat`], [`5`, `lima`],
          [`6`, `anem`], [`7`, `pito`], [`8`, `walo`], [`9`, `siyam`], [`10`, `mapò`],
          [`11`, `labimmiha`], [`12`, `labinlowa`], [`20`, `lowampò`], [`30`, `tatlompò`],
          [`100`, `magato`], [`200`, `lowanggato`], [`1000`, `libo`],
        ]},
        { t: "h", text: `Numeral morphology` },
        { t: "table", headers: [``, `Cardinal`, `Ordinal`, `Distributive`, `Restrictive`, `Grouping`], rows: [
          [`e.g.`, `one`, `first`, `one each`, `only one`, `one by one, one at a time`],
          [`1`, `miha`, `primiro, primira, ona, ona`, `ti-iha`, `mimiha`, `mihamiha, mani-iha`],
          [`2`, `lowa`, `ikalowa`, `tilowa`, `lolowa`, `lowalowa, manilowa`],
          [`3`, `tatlo`, `ikatatlo`, `titatlo`, `tatatlo`, `tatlotatlo, manitatlo`],
        ]},
      ],
    },
    {
      id: "m5-verbs",
      title: `Verbs`,
      blocks: [
        { t: "h", text: `Registration (focus) morphology` },
        { t: "terms", items: [
          { term: `Active`, meaning: `-om-, ma-, mag-, mang-, mangi-` },
          { term: `Object`, meaning: `-en, i-, -an` },
          { term: `Locative`, meaning: `pag- -an, pang- -an, pangi- -an` },
          { term: `Benefactive`, meaning: `ipang-, pang-, ipangi-, pangi-` },
          { term: `Instrumental`, meaning: `ipang-, pang-` },
          { term: `Aptative affixes`, meaning: `ma-, maka-, makapag-` },
          { term: `Social verbs`, meaning: `maki-, ipaki-, paki-, ipaki- -an, paki- -an` },
          { term: `Reciprocal verbs`, meaning: `mi-` },
        ]},
        { t: "h", text: `Verb pluralization` },
        { t: "table", headers: [`Indicative`, `Pluralized`], rows: [
          [`mag-`, `mipag-`], [`-om-`, `mipang-`], [`mang-`, `mipang-`], [`mangi-`, `mipangi-`],
        ]},
        { t: "h", text: `Aspect morphology` },
        { t: "table", headers: [`Contemplated (unmarked)`, `Perfective`, `Imperfective`], rows: [
          [`ma-`, `na-`, `ang-ka-`],
          [`mag-`, `nag-`, `am-pag-`],
          [`mang-`, `nang-`, `am-pang-`],
          [`mangi-`, `nangi-`, `am-pangi-`],
          [`maka-`, `naka-`, `am-paka-`],
          [`maki-`, `naki-`, `am-paki-`],
          [`mi-`, `ni-`, `am-pi-`],
          [`-om-`, `-in-om-`, `an- -om-`],
          [`-en`, `-in-`, `an- -en`],
          [`-an`, `-in- -an`, `an- -an`],
          [`pag- -an`, `-in- pag- -an`, `am- pag- -an`],
        ]},
      ],
    },
    {
      id: "m5-sentences",
      title: `Example sentences`,
      blocks: [
        { t: "sentences", items: [
          { sambal: `Nambih hi Juan nin litrato kongko.`, english: `Juan gave a picture to me.` },
          { sambal: `Tinomabà ya baboy.`, english: `The pig got fat.` },
          { sambal: `Nagpatabà hi Jose nin baboy ta patyen ha piesta.`, english: `Jose fattened a pig because he will kill it for the fiesta.` },
          { sambal: `Nangan ya anak nin kanen.`, english: `The child ate some rice.` },
          { sambal: `Kinan nin anak ya kanen.`, english: `The child ate rice.` },
          { sambal: `Niknò hi Pedro ha silya.`, english: `Pedro sat on the chair.` },
          { sambal: `Inikno-an ni Pedro ya silya.`, english: `Pedro sat on the chair.`, note: `[The chair was sat upon.]` },
          { sambal: `Ayri ka ampa-iri?`, english: `Where are you living?` },
          { sambal: `Itanem ta bayti ya hangì nin ha-a.`, english: `Let's plant this banana sucker.` },
          { sambal: `Mako ta ha balah.`, english: `Let's go to the river.` },
          { sambal: `Hay ganda nin babayi!`, english: `How beautiful the woman is!` },
          { sambal: `Ahè pinati nin tawo ya damowag ko.`, english: `The person didn't kill my water buffalo.` },
          { sambal: `Agko nakakatoloy nayabi.`, english: `I couldn't sleep last night.` },
          { sambal: `Agmo ko itapon ha lanom.`, english: `Don't throw me in the water.` },
          { sambal: `Ayin ya hen.`, english: `He is not there.` },
          { sambal: `Ayin di ya nanay na.`, english: `His mother is not here.` },
          { sambal: `Hay ta-en ay an-et-eten nin bakì.`, english: `The rat is chewing the trap.`, note: `ay = inverse marker` },
          { sambal: `Hi Elem ay alwan malhay.`, english: `Elem is not large.` },
          { sambal: `Halita-en moyo kongko no makano kawo mako ha istit.`, english: `Tell me when you are going to the States.` },
          { sambal: `Nag-ompisa ya nin toktoken ya kawayan.`, english: `He began to peck the bamboo.` },
          { sambal: `Hay nangyari ay natinay lalaki.`, english: `What happened was the man died.` },
          { sambal: `Nowayo yaynan nowayo angga ha nibarak ya.`, english: `He ran and ran until he fell down.` },
          { sambal: `Ikabayombokah, nabiglà hila.`, english: `The next morning they were surprised.` },
          { sambal: `Habayti ya otan ay ma-in pitoy oloy kapapalimo.`, english: `This snake had seven frightening heads.` },
          { sambal: `Hapa-eg, hi Ripolyo ay nag-in katowà ya papwak.`, english: `Now, Ripolyo became an ugly frog.` },
        ]},
      ],
    },
    {
      id: "m5-summary",
      title: `Summary, quiz, assignment & references`,
      blocks: [
        { t: "h", text: `Summary` },
        { t: "p", text: `"Mother tongue" denotes not only the language learned from one's mother but also the speaker's dominant and home language. Botolan Sambal is one of the Sambalic languages, a subgroup of the Central Luzon language family. Others: Ambala Ayta, Abenlen Ayta, Bataan Ayta, Mag-indi Ayta, Mag-inchi Ayta, Bolinao and Tina Sambal. Other Central Luzon languages include Remontado Agta and Kapampangan.` },
        { t: "h", text: `Quiz #7` },
        { t: "list", items: [
          `What is the difference/similarities of Sambal Botolan to other Sambal languages? Give examples.`,
          `How will you preserve/show the love in our Sambal language?`,
        ]},
        { t: "h", text: `Assignment (choose 1 or 2)` },
        { t: "list", items: [
          `Write a poem, song or story in Sambal. You may interview a grandparent or an elder in your barangay who is familiar with Sambal if you are not yet fluent in writing it.`,
          `Make a creative video presentation of the Sambal language (choose from the MANULAT TAMOY NA Panlekan Panulat nin Sambal Botolan, First Edition, 2017), upload it to your Facebook account and send the link to Moodle or to the instructor's email.`,
        ]},
        { t: "h", text: `References` },
        { t: "list", items: [
          `MANULAT TAMOY NA Panlekan Panulat nin Sambal Botolan, First Edition, 2017 (additional reference; also in this app under Spelling & Grammar Guide).`,
          `https://www.sil.org/system/files/reapdata/73/98/35/73983596095801132314184196103166272533/Orthography_Sambal_Botolan.pdf`,
          `https://www.thoughtco.com/mother-tongue-language-1691408`,
          `https://zorc.net/RDzorc/SAMBALIC/SambalicLgsOfCentralLuzon[Stone-2008].pdf`,
          `https://iloko.tripod.com/BotolanSambal.htm`,
        ]},
      ],
    },
  ],
};

export const COURSE_MODULES_A: CourseModule[] = [MODULE_4, MODULE_5];
