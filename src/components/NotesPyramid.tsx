"use client";

import { Fragrance, getNoteCategory } from "@/data/fragrances";
import { getCategoryIcon } from "@/lib/recommendations";

interface NotesPyramidProps {
  fragrance: Fragrance;
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
                  First impression · 15-30 minutes
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {fragrance.notes.top.map((note) => (
                <NoteTag key={note} note={note} />
              ))}
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
                  The core character · 30 min - 4 hours
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {fragrance.notes.middle.map((note) => (
                <NoteTag key={note} note={note} />
              ))}
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
                  Foundation & lasting impression · 4+ hours
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {fragrance.notes.base.map((note) => (
                <NoteTag key={note} note={note} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accords */}
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

      {/* Season & Occasion */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Best Seasons
          </h4>
          <div className="flex flex-wrap gap-1">
            {fragrance.season.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded text-xs capitalize"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
            Best Occasions
          </h4>
          <div className="flex flex-wrap gap-1">
            {fragrance.occasion.map((o) => (
              <span
                key={o}
                className="px-2 py-0.5 bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-300 rounded text-xs capitalize"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
