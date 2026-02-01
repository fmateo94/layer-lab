"use client";

import { useState, useEffect, useRef } from "react";
import { Fragrance, fragrances } from "@/data/fragrances";

interface FragranceSearchProps {
  onSelect: (fragrance: Fragrance) => void;
  selectedFragrance: Fragrance | null;
}

export function FragranceSearch({ onSelect, selectedFragrance }: FragranceSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredFragrances, setFilteredFragrances] = useState<Fragrance[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredFragrances(fragrances.slice(0, 10));
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = fragrances.filter(
        (f) =>
          f.name.toLowerCase().includes(lowerQuery) ||
          f.brand.toLowerCase().includes(lowerQuery) ||
          f.accords.some((a) => a.toLowerCase().includes(lowerQuery)) ||
          [...f.notes.top, ...f.notes.middle, ...f.notes.base].some((n) =>
            n.toLowerCase().includes(lowerQuery)
          )
      );
      setFilteredFragrances(filtered.slice(0, 10));
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (fragrance: Fragrance) => {
    onSelect(fragrance);
    setQuery("");
    setIsOpen(false);
  };

  const clearSelection = () => {
    onSelect(null as unknown as Fragrance);
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        {selectedFragrance ? (
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                  {selectedFragrance.name}
                </span>
                <span className="text-sm px-2 py-0.5 bg-amber-200/50 dark:bg-amber-800/50 rounded-full text-amber-700 dark:text-amber-300">
                  {selectedFragrance.concentration}
                </span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                {selectedFragrance.brand}
              </p>
            </div>
            <button
              onClick={clearSelection}
              className="p-2 hover:bg-amber-200/50 dark:hover:bg-amber-800/50 rounded-lg transition-colors"
              aria-label="Clear selection"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-700 dark:text-amber-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder="Search by name, brand, or notes..."
              className="w-full pl-11 pr-4 py-4 text-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm"
            />
          </>
        )}
      </div>

      {isOpen && !selectedFragrance && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden"
        >
          {filteredFragrances.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No fragrances found
            </div>
          ) : (
            <ul className="max-h-[400px] overflow-y-auto">
              {filteredFragrances.map((fragrance) => (
                <li key={fragrance.id}>
                  <button
                    onClick={() => handleSelect(fragrance)}
                    className="w-full px-4 py-3 text-left hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {fragrance.name}
                        </span>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">
                          |
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {fragrance.brand}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                          {fragrance.concentration}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            fragrance.gender === "masculine"
                              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                              : fragrance.gender === "feminine"
                              ? "bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300"
                              : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                          }`}
                        >
                          {fragrance.gender}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                      {fragrance.accords.slice(0, 3).join(" · ")}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
