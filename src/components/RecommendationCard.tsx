"use client";

import { LayeringRecommendation, Fragrance } from "@/lib/types";
import { useState } from "react";

interface RecommendationCardProps {
  recommendation: LayeringRecommendation;
  primaryFragrance: Fragrance;
  rank: number;
}

// Generate layering tips based on fragrance characteristics
function getLayeringTips(primary: Fragrance, secondary: Fragrance): string[] {
  const tips: string[] = [];

  // Basic layering advice
  tips.push(`Apply ${primary.name} first as the base layer`);
  tips.push(`Add ${secondary.name} on top after the base settles`);

  // Concentration-based advice
  if (primary.concentration === 'Parfum' || primary.concentration === 'EDP') {
    tips.push("Use 1-2 sprays of the base due to its strength");
  }
  if (secondary.concentration === 'EDT' || secondary.concentration === 'Cologne') {
    tips.push("You may need extra sprays of the topper for balance");
  }

  tips.push("Test on skin to see how they blend with your chemistry");

  return tips;
}

export function RecommendationCard({
  recommendation,
  primaryFragrance,
  rank,
}: RecommendationCardProps) {
  const [showTips, setShowTips] = useState(false);
  const { fragrance, reasons, layeringType, sharedNotes, complementaryNotes } =
    recommendation;

  const tips = getLayeringTips(primaryFragrance, fragrance);

  const layeringTypeStyles = {
    enhance: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-800",
      label: "Enhances",
      description: "Amplifies shared notes",
    },
    complement: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-800",
      label: "Complements",
      description: "Adds harmonious depth",
    },
    contrast: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800",
      label: "Contrasts",
      description: "Creates interesting tension",
    },
  };

  const style = layeringTypeStyles[layeringType];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${style.border} ${style.bg} transition-all hover:shadow-lg`}
    >
      {/* Rank badge */}
      <div className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-md font-bold text-gray-900 dark:text-gray-100">
        {rank}
      </div>

      {/* Layering type badge */}
      <div className="absolute top-3 right-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text} border ${style.border}`}
        >
          {style.label}
        </span>
      </div>

      <div className="p-6 pt-14">
        {/* Fragrance info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {fragrance.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{fragrance.brand}</p>
          <div className="flex items-center gap-2 mt-2">
            {fragrance.concentration && (
              <span className="text-xs px-2 py-0.5 bg-white/50 dark:bg-gray-800/50 rounded-full text-gray-600 dark:text-gray-400">
                {fragrance.concentration}
              </span>
            )}
          </div>
        </div>

        {/* Why it works */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Why it works:
          </h4>
          <ul className="space-y-1">
            {reasons.map((reason, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span className="text-amber-500 mt-0.5">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shared & Complementary Notes */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {sharedNotes.length > 0 && (
            <div className="p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
              <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Shared Notes
              </h5>
              <div className="flex flex-wrap gap-1">
                {sharedNotes.slice(0, 4).map((note) => (
                  <span
                    key={note}
                    className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}
          {complementaryNotes.length > 0 && (
            <div className="p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
              <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                New Notes
              </h5>
              <div className="flex flex-wrap gap-1">
                {complementaryNotes.slice(0, 4).map((note) => (
                  <span
                    key={note}
                    className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded text-xs"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Layering Tips Toggle */}
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors"
        >
          <span>Layering Tips</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transform transition-transform ${
              showTips ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {showTips && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50">
            <ul className="space-y-2">
              {tips.map((tip, idx) => (
                <li
                  key={idx}
                  className="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2"
                >
                  <span className="text-amber-500">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
