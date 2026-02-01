export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  gender: "masculine" | "feminine" | "unisex";
  concentration: "EDT" | "EDP" | "Parfum" | "Cologne";
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  accords: string[];
  season: ("spring" | "summer" | "fall" | "winter")[];
  occasion: ("casual" | "formal" | "date" | "work" | "party")[];
}

export interface NoteCategory {
  name: string;
  notes: string[];
  complementaryCategories: string[];
}

export const noteCategories: NoteCategory[] = [
  {
    name: "citrus",
    notes: ["bergamot", "lemon", "orange", "grapefruit", "lime", "mandarin", "yuzu", "citron", "blood orange", "tangerine"],
    complementaryCategories: ["woody", "aromatic", "floral", "spicy"]
  },
  {
    name: "floral",
    notes: ["rose", "jasmine", "iris", "violet", "lily", "peony", "magnolia", "tuberose", "neroli", "orange blossom", "ylang-ylang", "gardenia", "lavender", "geranium"],
    complementaryCategories: ["woody", "musk", "vanilla", "citrus", "green"]
  },
  {
    name: "woody",
    notes: ["sandalwood", "cedar", "vetiver", "oud", "patchouli", "guaiac wood", "birch", "cypress", "pine", "teak", "ebony", "driftwood"],
    complementaryCategories: ["citrus", "spicy", "floral", "amber", "leather"]
  },
  {
    name: "spicy",
    notes: ["pepper", "cardamom", "cinnamon", "nutmeg", "clove", "ginger", "saffron", "cumin", "pink pepper", "black pepper", "white pepper"],
    complementaryCategories: ["woody", "oriental", "citrus", "leather"]
  },
  {
    name: "oriental",
    notes: ["amber", "vanilla", "benzoin", "tonka bean", "incense", "myrrh", "frankincense", "opoponax", "labdanum"],
    complementaryCategories: ["spicy", "woody", "floral", "gourmand"]
  },
  {
    name: "fresh",
    notes: ["marine", "aquatic", "ozonic", "sea salt", "cucumber", "melon", "aldehydes", "water lily"],
    complementaryCategories: ["citrus", "green", "aromatic", "musk"]
  },
  {
    name: "green",
    notes: ["grass", "green leaves", "fig leaf", "galbanum", "bamboo", "tea", "basil", "mint", "eucalyptus"],
    complementaryCategories: ["floral", "citrus", "fresh", "woody"]
  },
  {
    name: "aromatic",
    notes: ["rosemary", "thyme", "sage", "oregano", "artemisia", "tarragon", "chamomile"],
    complementaryCategories: ["citrus", "fresh", "woody", "green"]
  },
  {
    name: "gourmand",
    notes: ["chocolate", "coffee", "caramel", "honey", "praline", "coconut", "almond", "hazelnut", "rum", "whiskey", "cognac"],
    complementaryCategories: ["oriental", "vanilla", "spicy", "fruity"]
  },
  {
    name: "fruity",
    notes: ["apple", "peach", "pear", "raspberry", "blackberry", "strawberry", "cherry", "plum", "fig", "apricot", "mango", "passion fruit", "lychee"],
    complementaryCategories: ["floral", "gourmand", "fresh", "citrus"]
  },
  {
    name: "musk",
    notes: ["white musk", "musk", "ambrette", "cashmeran", "skin musk"],
    complementaryCategories: ["floral", "fresh", "woody", "oriental"]
  },
  {
    name: "leather",
    notes: ["leather", "suede", "birch tar", "castoreum"],
    complementaryCategories: ["woody", "spicy", "tobacco", "smoky"]
  },
  {
    name: "tobacco",
    notes: ["tobacco", "pipe tobacco", "tobacco leaf", "tobacco flower"],
    complementaryCategories: ["leather", "woody", "spicy", "oriental"]
  },
  {
    name: "smoky",
    notes: ["smoke", "incense", "burnt wood", "ash", "gunpowder"],
    complementaryCategories: ["leather", "woody", "spicy", "oriental"]
  },
  {
    name: "animalic",
    notes: ["civet", "ambergris", "castoreum", "hyraceum"],
    complementaryCategories: ["floral", "oriental", "woody", "leather"]
  }
];

export const fragrances: Fragrance[] = [
  // Designer Masculine
  {
    id: "dior-sauvage-edp",
    name: "Sauvage",
    brand: "Dior",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["bergamot", "pepper"],
      middle: ["lavender", "sichuan pepper", "star anise", "nutmeg"],
      base: ["ambroxan", "cedar", "vanilla"]
    },
    accords: ["fresh spicy", "woody", "aromatic"],
    season: ["spring", "fall"],
    occasion: ["casual", "work", "date"]
  },
  {
    id: "bleu-de-chanel-edp",
    name: "Bleu de Chanel",
    brand: "Chanel",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["lemon", "mint", "pink pepper", "grapefruit"],
      middle: ["ginger", "nutmeg", "jasmine", "iso e super"],
      base: ["incense", "vetiver", "cedar", "sandalwood"]
    },
    accords: ["woody aromatic", "fresh", "citrus"],
    season: ["spring", "summer", "fall"],
    occasion: ["work", "casual", "formal"]
  },
  {
    id: "acqua-di-gio-profumo",
    name: "Acqua di Gio Profumo",
    brand: "Giorgio Armani",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["bergamot", "sea notes", "aquatic notes"],
      middle: ["geranium", "sage", "rosemary"],
      base: ["patchouli", "amber", "incense"]
    },
    accords: ["aquatic", "aromatic", "woody"],
    season: ["spring", "summer"],
    occasion: ["casual", "work", "date"]
  },
  {
    id: "tom-ford-oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["oud", "rosewood", "cardamom"],
      middle: ["sandalwood", "vetiver", "chinese pepper"],
      base: ["tonka bean", "amber", "vanilla"]
    },
    accords: ["woody", "oud", "smoky"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "party"]
  },
  {
    id: "versace-eros",
    name: "Eros",
    brand: "Versace",
    gender: "masculine",
    concentration: "EDT",
    notes: {
      top: ["mint", "green apple", "lemon"],
      middle: ["tonka bean", "ambroxan", "geranium"],
      base: ["vanilla", "vetiver", "oakmoss", "cedar"]
    },
    accords: ["sweet", "fresh", "aromatic"],
    season: ["spring", "summer", "fall"],
    occasion: ["party", "date", "casual"]
  },
  {
    id: "ysl-la-nuit",
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    gender: "masculine",
    concentration: "EDT",
    notes: {
      top: ["cardamom", "bergamot", "lavender"],
      middle: ["cedar", "cumin", "lavender"],
      base: ["vetiver", "caraway"]
    },
    accords: ["spicy", "woody", "aromatic"],
    season: ["fall", "winter"],
    occasion: ["date", "party", "formal"]
  },
  {
    id: "creed-aventus",
    name: "Aventus",
    brand: "Creed",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["pineapple", "bergamot", "black currant", "apple"],
      middle: ["birch", "patchouli", "moroccan jasmine", "rose"],
      base: ["musk", "oakmoss", "ambergris", "vanilla"]
    },
    accords: ["fruity", "woody", "smoky"],
    season: ["spring", "summer", "fall"],
    occasion: ["work", "formal", "date"]
  },
  {
    id: "dior-homme-intense",
    name: "Dior Homme Intense",
    brand: "Dior",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["lavender", "pear"],
      middle: ["iris", "ambrette", "rose"],
      base: ["vetiver", "cedar", "leather", "vanilla"]
    },
    accords: ["iris", "powdery", "woody"],
    season: ["fall", "winter"],
    occasion: ["formal", "date"]
  },
  {
    id: "jpg-ultra-male",
    name: "Ultra Male",
    brand: "Jean Paul Gaultier",
    gender: "masculine",
    concentration: "EDT",
    notes: {
      top: ["pear", "bergamot", "black lavender", "mint"],
      middle: ["cinnamon", "sage", "cumin"],
      base: ["vanilla", "amber", "benzoin", "cedar"]
    },
    accords: ["sweet", "aromatic", "fresh spicy"],
    season: ["fall", "winter"],
    occasion: ["party", "date", "casual"]
  },
  {
    id: "prada-luna-rossa-carbon",
    name: "Luna Rossa Carbon",
    brand: "Prada",
    gender: "masculine",
    concentration: "EDT",
    notes: {
      top: ["bergamot", "pepper"],
      middle: ["lavender"],
      base: ["ambroxan", "patchouli"]
    },
    accords: ["aromatic", "woody", "fresh spicy"],
    season: ["spring", "fall"],
    occasion: ["work", "casual"]
  },

  // Designer Feminine
  {
    id: "chanel-coco-mademoiselle",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    gender: "feminine",
    concentration: "EDP",
    notes: {
      top: ["orange", "bergamot", "grapefruit"],
      middle: ["rose", "jasmine", "lychee"],
      base: ["patchouli", "vetiver", "vanilla", "white musk"]
    },
    accords: ["floral", "citrus", "fresh"],
    season: ["spring", "summer", "fall"],
    occasion: ["work", "casual", "date"]
  },
  {
    id: "dior-miss-dior",
    name: "Miss Dior",
    brand: "Dior",
    gender: "feminine",
    concentration: "EDP",
    notes: {
      top: ["blood orange", "mandarin"],
      middle: ["rose", "peony", "lily of the valley"],
      base: ["patchouli", "musk", "rosewood"]
    },
    accords: ["floral", "chypre", "rose"],
    season: ["spring", "summer"],
    occasion: ["casual", "date", "work"]
  },
  {
    id: "ysl-black-opium",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    gender: "feminine",
    concentration: "EDP",
    notes: {
      top: ["pear", "pink pepper"],
      middle: ["coffee", "jasmine", "orange blossom"],
      base: ["vanilla", "patchouli", "cedar"]
    },
    accords: ["warm spicy", "sweet", "vanilla"],
    season: ["fall", "winter"],
    occasion: ["party", "date"]
  },
  {
    id: "lancome-la-vie-est-belle",
    name: "La Vie Est Belle",
    brand: "Lancome",
    gender: "feminine",
    concentration: "EDP",
    notes: {
      top: ["black currant", "pear"],
      middle: ["iris", "jasmine", "orange blossom"],
      base: ["praline", "vanilla", "patchouli", "tonka bean"]
    },
    accords: ["gourmand", "sweet", "floral"],
    season: ["fall", "winter"],
    occasion: ["casual", "date", "formal"]
  },
  {
    id: "tom-ford-black-orchid",
    name: "Black Orchid",
    brand: "Tom Ford",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["truffle", "ylang-ylang", "black currant", "bergamot"],
      middle: ["orchid", "lotus", "fruity notes"],
      base: ["patchouli", "sandalwood", "dark chocolate", "incense", "amber", "vanilla"]
    },
    accords: ["oriental", "floral", "balsamic"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "party"]
  },
  {
    id: "gucci-bloom",
    name: "Bloom",
    brand: "Gucci",
    gender: "feminine",
    concentration: "EDP",
    notes: {
      top: ["honeysuckle", "rangoon creeper"],
      middle: ["tuberose", "jasmine"],
      base: ["sandalwood", "orris"]
    },
    accords: ["white floral", "powdery", "green"],
    season: ["spring", "summer"],
    occasion: ["casual", "date", "work"]
  },
  {
    id: "marc-jacobs-daisy",
    name: "Daisy",
    brand: "Marc Jacobs",
    gender: "feminine",
    concentration: "EDT",
    notes: {
      top: ["strawberry", "violet leaves", "grapefruit"],
      middle: ["violet", "gardenia", "jasmine"],
      base: ["musk", "vanilla", "white woods"]
    },
    accords: ["floral", "fresh", "fruity"],
    season: ["spring", "summer"],
    occasion: ["casual", "work"]
  },
  {
    id: "jo-malone-peony-blush",
    name: "Peony & Blush Suede",
    brand: "Jo Malone",
    gender: "feminine",
    concentration: "Cologne",
    notes: {
      top: ["red apple"],
      middle: ["peony", "jasmine", "rose", "carnation"],
      base: ["suede"]
    },
    accords: ["floral", "powdery", "fresh"],
    season: ["spring", "summer"],
    occasion: ["casual", "work", "date"]
  },
  {
    id: "viktor-rolf-flowerbomb",
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    gender: "feminine",
    concentration: "EDP",
    notes: {
      top: ["bergamot", "tea", "osmanthus"],
      middle: ["sambac jasmine", "cattleya orchid", "freesia", "rose", "centifolia rose"],
      base: ["patchouli", "musk"]
    },
    accords: ["floral", "sweet", "oriental"],
    season: ["fall", "winter", "spring"],
    occasion: ["date", "formal", "party"]
  },
  {
    id: "dolce-gabbana-light-blue",
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    gender: "feminine",
    concentration: "EDT",
    notes: {
      top: ["sicilian lemon", "apple", "cedar", "bluebell"],
      middle: ["bamboo", "jasmine", "white rose"],
      base: ["cedar", "musk", "amber"]
    },
    accords: ["citrus", "white floral", "fresh"],
    season: ["spring", "summer"],
    occasion: ["casual", "work"]
  },

  // Niche Fragrances
  {
    id: "maison-francis-br540",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["saffron", "jasmine"],
      middle: ["amberwood", "ambergris"],
      base: ["fir resin", "cedar"]
    },
    accords: ["sweet", "amber", "woody"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "party"]
  },
  {
    id: "byredo-gypsy-water",
    name: "Gypsy Water",
    brand: "Byredo",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["bergamot", "lemon", "pepper", "juniper berries"],
      middle: ["incense", "pine needles", "orris"],
      base: ["amber", "vanilla", "sandalwood"]
    },
    accords: ["woody", "aromatic", "fresh"],
    season: ["spring", "summer", "fall"],
    occasion: ["casual", "work", "date"]
  },
  {
    id: "le-labo-santal-33",
    name: "Santal 33",
    brand: "Le Labo",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["cardamom", "iris", "violet"],
      middle: ["ambrox", "australian sandalwood"],
      base: ["cedarwood", "leather", "musk"]
    },
    accords: ["woody", "leather", "aromatic"],
    season: ["fall", "winter", "spring"],
    occasion: ["casual", "work", "date"]
  },
  {
    id: "pdm-layton",
    name: "Layton",
    brand: "Parfums de Marly",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["apple", "bergamot", "lavender"],
      middle: ["jasmine", "violet", "geranium"],
      base: ["vanilla", "guaiac wood", "cardamom", "sandalwood", "pepper"]
    },
    accords: ["warm spicy", "sweet", "aromatic"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "party"]
  },
  {
    id: "pdm-pegasus",
    name: "Pegasus",
    brand: "Parfums de Marly",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["heliotrope", "bergamot"],
      middle: ["bitter almond", "lavender", "jasmine"],
      base: ["vanilla", "sandalwood", "amber"]
    },
    accords: ["almond", "powdery", "sweet"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "casual"]
  },
  {
    id: "initio-side-effect",
    name: "Side Effect",
    brand: "Initio",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["rum", "cinnamon"],
      middle: ["tobacco", "vanilla"],
      base: ["benzoin", "musk", "honey"]
    },
    accords: ["boozy", "sweet", "tobacco"],
    season: ["fall", "winter"],
    occasion: ["party", "date"]
  },
  {
    id: "xerjoff-naxos",
    name: "Naxos",
    brand: "Xerjoff",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["bergamot", "lemon", "lavender"],
      middle: ["cinnamon", "cashmeran", "honey"],
      base: ["tobacco", "tonka bean", "vanilla"]
    },
    accords: ["honey", "tobacco", "sweet"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "casual"]
  },
  {
    id: "amouage-reflection-man",
    name: "Reflection Man",
    brand: "Amouage",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["rosemary", "pink pepper", "bitter orange", "neroli"],
      middle: ["jasmine", "orris", "ylang-ylang"],
      base: ["sandalwood", "vetiver", "cedar"]
    },
    accords: ["floral", "fresh", "woody"],
    season: ["spring", "summer"],
    occasion: ["work", "formal", "casual"]
  },
  {
    id: "mfk-grand-soir",
    name: "Grand Soir",
    brand: "Maison Francis Kurkdjian",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["amber"],
      middle: ["benzoin", "labdanum"],
      base: ["tonka bean", "vanilla"]
    },
    accords: ["amber", "balsamic", "sweet"],
    season: ["fall", "winter"],
    occasion: ["formal", "date"]
  },
  {
    id: "diptyque-tam-dao",
    name: "Tam Dao",
    brand: "Diptyque",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["cypress", "myrtle"],
      middle: ["rose", "sandalwood"],
      base: ["sandalwood", "cedar", "ambergris", "musk"]
    },
    accords: ["woody", "creamy", "aromatic"],
    season: ["spring", "summer", "fall"],
    occasion: ["work", "casual", "date"]
  },
  {
    id: "jo-malone-wood-sage",
    name: "Wood Sage & Sea Salt",
    brand: "Jo Malone",
    gender: "unisex",
    concentration: "Cologne",
    notes: {
      top: ["sea salt", "ambrette"],
      middle: ["sage"],
      base: ["grapefruit", "driftwood"]
    },
    accords: ["fresh", "mineral", "aromatic"],
    season: ["spring", "summer"],
    occasion: ["casual", "work"]
  },
  {
    id: "creed-green-irish-tweed",
    name: "Green Irish Tweed",
    brand: "Creed",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["lemon verbena", "iris"],
      middle: ["violet leaves"],
      base: ["ambergris", "sandalwood"]
    },
    accords: ["green", "fresh", "aromatic"],
    season: ["spring", "summer"],
    occasion: ["work", "casual", "formal"]
  },
  {
    id: "tf-tobacco-vanille",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["tobacco leaf", "spicy notes"],
      middle: ["vanilla", "cacao", "tonka bean"],
      base: ["dried fruits", "wood"]
    },
    accords: ["tobacco", "vanilla", "sweet"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "party"]
  },
  {
    id: "tf-lost-cherry",
    name: "Lost Cherry",
    brand: "Tom Ford",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["black cherry", "cherry liqueur"],
      middle: ["bitter almond", "turkish rose", "jasmine sambac"],
      base: ["peru balsam", "roasted tonka", "sandalwood", "vetiver", "cedar"]
    },
    accords: ["fruity", "sweet", "almond"],
    season: ["fall", "winter"],
    occasion: ["date", "party"]
  },
  {
    id: "le-labo-rose-31",
    name: "Rose 31",
    brand: "Le Labo",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["cumin", "olibanum"],
      middle: ["rose", "cedar"],
      base: ["cistus", "vetiver", "musk", "amber"]
    },
    accords: ["rose", "woody", "spicy"],
    season: ["fall", "winter", "spring"],
    occasion: ["formal", "date", "work"]
  },
  {
    id: "byredo-mojave-ghost",
    name: "Mojave Ghost",
    brand: "Byredo",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["ambrette", "jamaican nesberry"],
      middle: ["magnolia", "violet", "sandalwood"],
      base: ["ambergris", "cedarwood", "musk"]
    },
    accords: ["woody", "floral", "musky"],
    season: ["spring", "summer"],
    occasion: ["casual", "work", "date"]
  },
  {
    id: "initio-oud-for-greatness",
    name: "Oud for Greatness",
    brand: "Initio",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["nutmeg", "lavender", "saffron"],
      middle: ["agarwood (oud)"],
      base: ["musk", "patchouli"]
    },
    accords: ["oud", "woody", "warm spicy"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "party"]
  },
  {
    id: "creed-millesime-imperial",
    name: "Millesime Imperial",
    brand: "Creed",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["sea salt", "bergamot", "lemon"],
      middle: ["iris"],
      base: ["musk", "wood"]
    },
    accords: ["fresh", "aquatic", "citrus"],
    season: ["spring", "summer"],
    occasion: ["casual", "work"]
  },
  {
    id: "memo-african-leather",
    name: "African Leather",
    brand: "Memo Paris",
    gender: "unisex",
    concentration: "EDP",
    notes: {
      top: ["bergamot", "mango", "cardamom"],
      middle: ["geranium", "saffron"],
      base: ["leather", "oud", "vetiver", "musk"]
    },
    accords: ["leather", "woody", "smoky"],
    season: ["fall", "winter"],
    occasion: ["formal", "date"]
  },
  {
    id: "pdm-herod",
    name: "Herod",
    brand: "Parfums de Marly",
    gender: "masculine",
    concentration: "EDP",
    notes: {
      top: ["cinnamon", "iso e super", "pepper"],
      middle: ["tobacco", "osmanthus", "incense"],
      base: ["vanilla", "musk", "vetiver", "cypriol", "cedar"]
    },
    accords: ["tobacco", "sweet", "spicy"],
    season: ["fall", "winter"],
    occasion: ["formal", "date", "party"]
  }
];

export function getAllNotes(): string[] {
  const notesSet = new Set<string>();
  fragrances.forEach(f => {
    [...f.notes.top, ...f.notes.middle, ...f.notes.base].forEach(note => {
      notesSet.add(note.toLowerCase());
    });
  });
  return Array.from(notesSet).sort();
}

export function getNoteCategory(note: string): string | undefined {
  const lowerNote = note.toLowerCase();
  for (const category of noteCategories) {
    if (category.notes.some(n => lowerNote.includes(n) || n.includes(lowerNote))) {
      return category.name;
    }
  }
  return undefined;
}

export function getComplementaryCategories(categories: string[]): string[] {
  const complementary = new Set<string>();
  categories.forEach(cat => {
    const category = noteCategories.find(nc => nc.name === cat);
    if (category) {
      category.complementaryCategories.forEach(c => complementary.add(c));
    }
  });
  return Array.from(complementary);
}
