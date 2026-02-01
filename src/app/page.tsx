"use client";

import { useState } from "react";
import { Fragrance } from "@/data/fragrances";
import { FragranceSearch } from "@/components/FragranceSearch";
import { NotesPyramid } from "@/components/NotesPyramid";
import { RecommendationCard } from "@/components/RecommendationCard";
import {
  getLayeringRecommendations,
  LayeringRecommendation,
} from "@/lib/recommendations";

export default function Home() {
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(
    null
  );
  const [recommendations, setRecommendations] = useState<
    LayeringRecommendation[]
  >([]);

  const handleFragranceSelect = (fragrance: Fragrance | null) => {
    setSelectedFragrance(fragrance);
    if (fragrance) {
      const recs = getLayeringRecommendations(fragrance, {
        maxResults: 8,
        preferSameGender: false,
      });
      setRecommendations(recs);
    } else {
      setRecommendations([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-2xl shadow-lg">
                <span role="img" aria-label="perfume">
                  ✨
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 dark:from-amber-400 dark:to-rose-400 bg-clip-text text-transparent">
                  Layer Lab
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Fragrance Layering Companion
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              Fragrance Combinations
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Select a fragrance to extract its notes and get personalized
            recommendations for layering combinations that create unique,
            captivating scents.
          </p>

          {/* Search */}
          <FragranceSearch
            onSelect={handleFragranceSelect}
            selectedFragrance={selectedFragrance}
          />
        </section>

        {/* Results Section */}
        {selectedFragrance && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Notes Pyramid */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
                <NotesPyramid fragrance={selectedFragrance} />
              </div>
            </div>

            {/* Right Column - Recommendations */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Recommended Layers
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {recommendations.length} fragrances that pair beautifully with{" "}
                  {selectedFragrance.name}
                </p>
              </div>

              {recommendations.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <p className="text-gray-500 dark:text-gray-400">
                    No recommendations found. Try selecting a different
                    fragrance.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard
                      key={rec.fragrance.id}
                      recommendation={rec}
                      primaryFragrance={selectedFragrance}
                      rank={index + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedFragrance && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">
                <span role="img" aria-label="search">
                  🔍
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Start by selecting a fragrance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Search for your favorite perfume or cologne above to see its
                notes breakdown and discover perfect layering partners.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="text-3xl mb-3">
                  <span role="img" aria-label="notes">
                    🎵
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Note Extraction
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  See top, heart, and base notes visualized in an elegant
                  pyramid
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="text-3xl mb-3">
                  <span role="img" aria-label="layers">
                    🧬
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Smart Matching
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Algorithm-driven recommendations based on note compatibility
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="text-3xl mb-3">
                  <span role="img" aria-label="tips">
                    💡
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Layering Tips
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get expert advice on how to apply and combine your fragrances
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Layer Lab - Your personal fragrance layering companion
            </p>
            <p className="mt-1">
              Discover unique scent combinations and create your signature blend
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
