"use client";

import { Fragrance } from "@/lib/types";

interface NotesPyramidProps {
  fragrance: Fragrance;
}

// Simple note category detection
function getNoteCategory(note: string): string | undefined {
  const lowerNote = note.toLowerCase();
  const categories: Record<string, string[]> = {
    citrus: ["bergamot", "lemon", "orange", "grapefruit", "lime", "mandarin", "citrus"],
    floral: ["rose", "jasmine", "iris", "violet", "lily", "peony", "magnolia", "tuberose", "neroli", "lavender", "geranium"],
    woody: ["sandalwood", "cedar", "vetiver", "oud", "patchouli", "guaiac", "birch", "cypress", "pine", "wood"],
    spicy: ["pepper", "cardamom", "cinnamon", "nutmeg", "clove", "ginger", "saffron", "cumin"],
    oriental: ["amber", "vanilla", "benzoin", "tonka", "incense", "myrrh", "labdanum"],
    fresh: ["marine", "aquatic", "ozonic", "sea", "mint", "cucumber"],
    green: ["grass", "leaf", "fig", "bamboo", "tea", "basil"],
    gourmand: ["chocolate", "coffee", "caramel", "honey", "praline", "coconut", "almond", "rum"],
    fruity: ["apple", "pear", "raspberry", "blackberry", "strawberry", "cherry", "plum", "fig", "peach", "mango"],
    musk: ["musk", "ambrette", "ambroxan"],
    leather: ["leather", "suede"],
    tobacco: ["tobacco"]
  };

  for (const [category, notes] of Object.entries(categories)) {
    if (notes.some(n => lowerNote.includes(n))) {
      return category;
    }
  }
  return undefined;
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    citrus: "🍋",
    floral: "🌸",
    woody: "🌲",
    spicy: "🌶️",
    oriental: "✨",
    fresh: "💧",
    green: "🌿",
    gourmand: "🍫",
    fruity: "🍎",
    musk: "🤍",
    leather: "🧥",
    tobacco: "🍂"
  };
  return icons[category] || "🌺";
}

function NoteTag({ note }: { note: string }) {
  const category = getNoteCategory(note);
  const icon = category ? getCategoryIcon(category) : "🌺";

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <span>{icon}</span>
      <span>{note}</span>
    </span>
  );
}

export function NotesPyramid({ fragrance }: NotesPyramidProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Notes Pyramid
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {fragrance.name} by {fragrance.brand}
        </p>
      </div>

      {/* Pyramid visualization */}
      <div className="relative">
        {/* Top Notes */}
        <div className="relative z-30 flex flex-col items-center">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[30px] border-b-amber-200 dark:border-b-amber-800/50" />
          <div className="bg-gradient-to-b from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/20 rounded-t-3xl pt-8 pb-4 px-6 w-full max-w-md mx-auto border-x border-t border-amber-200 dark:border-amber-800/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-200">
                  Top Notes
                </h4>
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  First impression
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {fragrance.notes.top.length > 0 ? (
                fragrance.notes.top.map((note) => (
                  <NoteTag key={note} note={note} />
                ))
              ) : (
                <span className="text-sm text-amber-600 dark:text-amber-400 italic">No top notes listed</span>
              )}
            </div>
          </div>
        </div>

        {/* Middle Notes */}
        <div className="relative z-20 -mt-2">
          <div className="bg-gradient-to-b from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-rose-900/20 py-4 px-6 w-full max-w-lg mx-auto border-x border-rose-200 dark:border-rose-800/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💗</span>
              <div>
                <h4 className="font-semibold text-rose-900 dark:text-rose-200">
                  Heart Notes
                </h4>
                <p className="text-xs text-rose-700 dark:text-rose-400">
                  The core character
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {fragrance.notes.middle.length > 0 ? (
                fragrance.notes.middle.map((note) => (
                  <NoteTag key={note} note={note} />
                ))
              ) : (
                <span className="text-sm text-rose-600 dark:text-rose-400 italic">No heart notes listed</span>
              )}
            </div>
          </div>
        </div>

        {/* Base Notes */}
        <div className="relative z-10 -mt-2">
          <div className="bg-gradient-to-b from-stone-100 to-stone-50 dark:from-stone-800/40 dark:to-stone-800/20 rounded-b-3xl py-4 pb-6 px-6 w-full max-w-xl mx-auto border-x border-b border-stone-300 dark:border-stone-700/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌲</span>
              <div>
                <h4 className="font-semibold text-stone-900 dark:text-stone-200">
                  Base Notes
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-400">
                  Foundation & lasting impression
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {fragrance.notes.base.length > 0 ? (
                fragrance.notes.base.map((note) => (
                  <NoteTag key={note} note={note} />
                ))
              ) : (
                <span className="text-sm text-stone-600 dark:text-stone-400 italic">No base notes listed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accords */}
      {fragrance.accords && fragrance.accords.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Main Accords
          </h4>
          <div className="flex flex-wrap gap-2">
            {fragrance.accords.map((accord) => (
              <span
                key={accord}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-sm font-medium shadow-sm"
              >
                {accord}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
