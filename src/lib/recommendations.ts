import { Fragrance, fragrances, noteCategories, getNoteCategory, getComplementaryCategories } from "@/data/fragrances";

export interface LayeringRecommendation {
  fragrance: Fragrance;
  score: number;
  reasons: string[];
  layeringType: "complement" | "enhance" | "contrast";
  sharedNotes: string[];
  complementaryNotes: string[];
}

export interface FragranceAnalysis {
  fragrance: Fragrance;
  noteCategories: Map<string, string[]>;
  dominantAccords: string[];
  primaryCategory: string;
  allNotes: string[];
}

function analyzeFragrance(fragrance: Fragrance): FragranceAnalysis {
  const allNotes = [
    ...fragrance.notes.top,
    ...fragrance.notes.middle,
    ...fragrance.notes.base
  ];

  const categories = new Map<string, string[]>();

  allNotes.forEach(note => {
    const category = getNoteCategory(note);
    if (category) {
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(note);
    }
  });

  // Find primary category (most notes)
  let primaryCategory = "woody";
  let maxNotes = 0;
  categories.forEach((notes, cat) => {
    if (notes.length > maxNotes) {
      maxNotes = notes.length;
      primaryCategory = cat;
    }
  });

  return {
    fragrance,
    noteCategories: categories,
    dominantAccords: fragrance.accords,
    primaryCategory,
    allNotes
  };
}

function calculateNoteOverlap(notes1: string[], notes2: string[]): string[] {
  const set1 = new Set(notes1.map(n => n.toLowerCase()));
  return notes2.filter(n => set1.has(n.toLowerCase()));
}

function hasConflictingNotes(f1: Fragrance, f2: Fragrance): boolean {
  // Some notes clash when layered
  const conflictPairs: [string[], string[]][] = [
    [["citrus", "lemon", "bergamot"], ["heavy oud", "animalic"]],
    [["clean", "fresh", "aquatic"], ["heavy tobacco", "smoke"]],
    [["sweet", "vanilla", "praline"], ["bitter", "metallic"]],
  ];

  const notes1 = [...f1.notes.top, ...f1.notes.middle, ...f1.notes.base].map(n => n.toLowerCase());
  const notes2 = [...f2.notes.top, ...f2.notes.middle, ...f2.notes.base].map(n => n.toLowerCase());

  for (const [group1, group2] of conflictPairs) {
    const hasGroup1InF1 = notes1.some(n => group1.some(g => n.includes(g)));
    const hasGroup2InF2 = notes2.some(n => group2.some(g => n.includes(g)));
    const hasGroup1InF2 = notes2.some(n => group1.some(g => n.includes(g)));
    const hasGroup2InF1 = notes1.some(n => group2.some(g => n.includes(g)));

    if ((hasGroup1InF1 && hasGroup2InF2) || (hasGroup1InF2 && hasGroup2InF1)) {
      return true;
    }
  }

  return false;
}

export function getLayeringRecommendations(
  selectedFragrance: Fragrance,
  options?: {
    maxResults?: number;
    preferSameGender?: boolean;
    seasonFilter?: string[];
  }
): LayeringRecommendation[] {
  const analysis = analyzeFragrance(selectedFragrance);
  const complementaryCategories = getComplementaryCategories(
    Array.from(analysis.noteCategories.keys())
  );

  const recommendations: LayeringRecommendation[] = [];

  for (const candidate of fragrances) {
    // Skip the same fragrance
    if (candidate.id === selectedFragrance.id) continue;

    // Check for conflicting notes
    if (hasConflictingNotes(selectedFragrance, candidate)) continue;

    const candidateAnalysis = analyzeFragrance(candidate);
    let score = 0;
    const reasons: string[] = [];

    // 1. Check for shared notes (enhancing layer)
    const sharedNotes = calculateNoteOverlap(analysis.allNotes, candidateAnalysis.allNotes);
    if (sharedNotes.length > 0) {
      score += sharedNotes.length * 15;
      reasons.push(`Shares ${sharedNotes.length} note(s): ${sharedNotes.slice(0, 3).join(", ")}`);
    }

    // 2. Check for complementary categories
    const candidateCategories = Array.from(candidateAnalysis.noteCategories.keys());
    const complementaryMatches = candidateCategories.filter(c =>
      complementaryCategories.includes(c)
    );
    if (complementaryMatches.length > 0) {
      score += complementaryMatches.length * 20;
      reasons.push(`Complementary ${complementaryMatches.join(", ")} notes`);
    }

    // 3. Season compatibility
    const sharedSeasons = selectedFragrance.season.filter(s =>
      candidate.season.includes(s)
    );
    if (sharedSeasons.length > 0) {
      score += sharedSeasons.length * 5;
    }

    // 4. Occasion compatibility
    const sharedOccasions = selectedFragrance.occasion.filter(o =>
      candidate.occasion.includes(o)
    );
    if (sharedOccasions.length > 0) {
      score += sharedOccasions.length * 5;
    }

    // 5. Gender compatibility
    if (options?.preferSameGender) {
      if (candidate.gender === selectedFragrance.gender ||
          candidate.gender === "unisex" ||
          selectedFragrance.gender === "unisex") {
        score += 10;
      }
    }

    // 6. Accord harmony
    const sharedAccords = selectedFragrance.accords.filter(a =>
      candidate.accords.some(ca => a.includes(ca) || ca.includes(a))
    );
    if (sharedAccords.length > 0) {
      score += sharedAccords.length * 10;
      reasons.push(`Harmonious ${sharedAccords[0]} profile`);
    }

    // 7. Base note compatibility (most important for layering)
    const baseNoteOverlap = calculateNoteOverlap(
      selectedFragrance.notes.base,
      candidate.notes.base
    );
    if (baseNoteOverlap.length > 0) {
      score += baseNoteOverlap.length * 25;
      reasons.push(`Compatible base notes: ${baseNoteOverlap.join(", ")}`);
    }

    // 8. Complementary top-base layering
    const topToBase = calculateNoteOverlap(
      selectedFragrance.notes.top,
      candidate.notes.base
    );
    const baseToTop = calculateNoteOverlap(
      selectedFragrance.notes.base,
      candidate.notes.top
    );
    if (topToBase.length > 0 || baseToTop.length > 0) {
      score += 15;
      reasons.push("Creates interesting top-to-base evolution");
    }

    // Get complementary notes for display
    const complementaryNotes = candidateAnalysis.allNotes.filter(n =>
      !sharedNotes.map(s => s.toLowerCase()).includes(n.toLowerCase())
    );

    // Determine layering type
    let layeringType: "complement" | "enhance" | "contrast" = "complement";
    if (sharedNotes.length >= 3) {
      layeringType = "enhance";
    } else if (complementaryMatches.length > sharedNotes.length) {
      layeringType = "contrast";
    }

    if (score > 20) {
      recommendations.push({
        fragrance: candidate,
        score,
        reasons: reasons.slice(0, 4),
        layeringType,
        sharedNotes,
        complementaryNotes: complementaryNotes.slice(0, 5)
      });
    }
  }

  // Sort by score and limit results
  const maxResults = options?.maxResults ?? 8;
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

export function getLayeringTips(
  primary: Fragrance,
  secondary: Fragrance
): string[] {
  const tips: string[] = [];

  // Application order tip
  const primaryStrength = primary.concentration;
  const secondaryStrength = secondary.concentration;

  const strengthOrder = ["Cologne", "EDT", "EDP", "Parfum"];
  const primaryIdx = strengthOrder.indexOf(primaryStrength);
  const secondaryIdx = strengthOrder.indexOf(secondaryStrength);

  if (primaryIdx < secondaryIdx) {
    tips.push(`Apply ${primary.name} first, then layer ${secondary.name} on top for better projection`);
  } else {
    tips.push(`Apply ${secondary.name} first as a base, then add ${primary.name} on top`);
  }

  // Pulse point tips
  tips.push("Apply to different pulse points for a more complex scent trail");

  // Ratio tip based on concentration
  if (primary.concentration === "EDP" && secondary.concentration === "EDT") {
    tips.push("Use less of the EDP as it will be more concentrated");
  }

  return tips;
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    citrus: "🍋",
    floral: "🌸",
    woody: "🌲",
    spicy: "🌶️",
    oriental: "✨",
    fresh: "💧",
    green: "🌿",
    aromatic: "🌾",
    gourmand: "🍫",
    fruity: "🍎",
    musk: "🤍",
    leather: "👞",
    tobacco: "🍂",
    smoky: "💨",
    animalic: "🦌"
  };
  return icons[category] || "🌺";
}
