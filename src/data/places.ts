/**
 * Places named in Module 6. Descriptions repeat what the module says; nothing else is added.
 * "Open in Maps" needs internet and opens the phone's map app with a search.
 */
export interface Place {
  id: string;
  name: string;
  kind: "nature" | "history" | "adventure" | "wildlife" | "faith";
  summary: string;
  facts: string[];
  query: string;
}

export const PLACES: Place[] = [
  {
    id: "pinatubo",
    name: "Mt. Pinatubo crater lake",
    kind: "nature",
    summary: "The famous crater lake left by the June 1991 eruption; the top attraction for Zambales tourism.",
    facts: [
      "Reached by a two-hour 4x4 ride that starts at Camp Kainomayan near the Bucao River.",
      "The package was quoted at P1,400 per person (4x4 ride, guide, ecotourism fee, IP cultural heritage fee, environmental protection fee), minimum of five participants.",
    ],
    query: "Mount Pinatubo crater lake Botolan",
  },
  {
    id: "kainomayan",
    name: "Camp Kainomayan",
    kind: "adventure",
    summary: "Recreational camp in Barangay San Juan near the Bucao River. Kainomayan roughly means well-being in Sambal.",
    facts: [
      "Started with five ATVs rented on weekends; now has a tourist center, wall-climbing, rappelling, paintball, an obstacle course and a zip line.",
      "Camping fee quoted at P100 per person per night; tent rental P150.",
      "Most weekends up to 200 people wait from 5:00 a.m. for the 4x4 ride to Pinatubo.",
    ],
    query: "Camp Kainomayan Botolan Zambales",
  },
  {
    id: "tukal",
    name: "Tukal-Tukal Falls",
    kind: "nature",
    summary: "A four-tiered waterfall that is an emerging major attraction.",
    facts: ["Package quoted at P500 per person, minimum of five participants.", "Many visitors stay overnight at the camp and trek to the falls the next day."],
    query: "Tukal-Tukal Falls Botolan",
  },
  {
    id: "lomboy",
    name: "Lomboy (Malomboy) Lake",
    kind: "adventure",
    summary: "Reached by an ATV \"lahar adventure\" ride across the lahar fields.",
    facts: ["The lahar adventure package to Malomboy Lake was quoted at P1,500."],
    query: "Malomboy Lake Botolan",
  },
  {
    id: "bancal",
    name: "Bancal River",
    kind: "nature",
    summary: "River with kayaking, pedal boats, motorboats and guided mangrove tours.",
    facts: ["Fort Paynauen stands on its bank in Barrio Pader."],
    query: "Bancal River Botolan",
  },
  {
    id: "capayawan",
    name: "Capayawan Beach",
    kind: "nature",
    summary: "One of the beaches named among the town's attractions.",
    facts: [],
    query: "Capayawan Beach Botolan",
  },
  {
    id: "wildlife",
    name: "Botolan Wildlife Farm",
    kind: "wildlife",
    summary: "A 55,000 square-meter privately owned wildlife sanctuary and a national quarantine, rescue and rehabilitation zone for fauna in Zambales.",
    facts: ["Look out for the wildlife \"Rockstar\", Ramses.", "Location: Brgy. San Juan, Botolan, Zambales 2202."],
    query: "Botolan Wildlife Farm",
  },
  {
    id: "paynauen",
    name: "Fort Paynauen (Playa Honda)",
    kind: "history",
    summary: "Moss-covered walls of a Spanish fortress on the bank of the Bancal River in Barrio Pader.",
    facts: [
      "Once the most formidable Spanish garrison in Central Luzon in the first century of Spanish rule.",
      "Paynauen is the original name of Iba.",
      "In 1617 the Spaniards led by Juan Ronquillo destroyed three of six Dutch ships in a two-day battle, the second battle of Playa Honda.",
      "Later used as a prison for recalcitrant natives and for Spanish officials who angered the Governor General or the Archbishop.",
    ],
    query: "Fort Paynauen Botolan",
  },
  {
    id: "stamonica",
    name: "Church of Sta. Monica",
    kind: "history",
    summary: "Coral limestone church built in 1700 and finished around the last quarter of the 19th century.",
    facts: ["Moss-covered one-storey Baroque facade with a semicircular arch entrance, flanked by niches with statues of St. Augustine and St. Monica."],
    query: "Sta. Monica Church Botolan",
  },
  {
    id: "inapoonbato",
    name: "Ina Poon Bato",
    kind: "faith",
    summary: "Shrine of Nuestra Senora dela Paz of Zambales, called Ina Poon Bato or Apo Apang.",
    facts: [
      "Devotees come from Zambales, nearby provinces, Metro Manila, Southern Luzon, the Visayas, Mindanao and abroad.",
      "The wooden image stands on a stony base, a reminder of how an Aeta found her.",
    ],
    query: "Ina Poon Bato shrine Botolan",
  },
];

export const MORE_PLACES = [
  "Sundowners", "Bangan Beach", "Kalinto", "Villa Elisa", "C&J", "Haya", "Villa", "Poggio", "Madison", "Peny Resort", "Mardex Resort",
  "Caribe", "Palasyo", "Nahiko River", "Bucao Bridge and River", "Mt. Calibungan", "Index", "Paudpod", "Binoclutan Falls", "Bulogto", "Sitio Alao",
];
