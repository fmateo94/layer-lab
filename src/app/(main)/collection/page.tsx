"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "@/components/layout";
import { Button, Card, Input } from "@/components/ui";
import { FragranceListItem } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AddFragranceDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<FragranceListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setResults([]);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const fetchResults = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/fragrances?query=${encodeURIComponent(query)}&limit=10`
                );
                if (response.ok) {
                    const data = await response.json();
                    setResults(data);
                }
            } catch (error) {
                console.error("Error searching fragrances:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounce = setTimeout(fetchResults, 200);
        return () => clearTimeout(debounce);
    }, [query, isOpen]);

    const handleSelect = (fragrance: FragranceListItem) => {
        onClose();
        router.push(`/fragrance/${fragrance.id}`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-lg mx-4 bg-[var(--color-bg)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                    <h2 className="text-title text-[var(--color-fg)]">
                        Browse Fragrances
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-[var(--radius-md)] hover:bg-[var(--color-surface)] transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-[var(--color-muted)]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Search input */}
                <div className="p-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or brand..."
                        className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-[var(--color-fg)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    />
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto">
                    {isLoading && results.length === 0 && (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                            <span className="text-caption ml-2">
                                Searching...
                            </span>
                        </div>
                    )}

                    {!isLoading && results.length === 0 && query && (
                        <div className="text-center py-8">
                            <p className="text-body text-[var(--color-muted)]">
                                No fragrances found
                            </p>
                        </div>
                    )}

                    {results.map((fragrance) => (
                        <button
                            key={fragrance.id}
                            onClick={() => handleSelect(fragrance)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-surface)] transition-colors border-b border-[var(--color-border)] last:border-b-0 text-left"
                        >
                            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-surface)] flex items-center justify-center shrink-0 overflow-hidden">
                                {fragrance.image_url ? (
                                    <Image
                                        src={fragrance.image_url}
                                        alt={fragrance.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-[var(--color-muted)]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-headline text-[var(--color-fg)] truncate">
                                    {fragrance.name}
                                </p>
                                <p className="text-caption truncate">
                                    {fragrance.brand}
                                    {fragrance.concentration &&
                                        ` · ${fragrance.concentration}`}
                                </p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-[var(--color-muted)] shrink-0"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CollectionPage() {
    const [fragrances, setFragrances] = useState<FragranceListItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = useCallback(() => setIsDialogOpen(true), []);
    const closeDialog = useCallback(() => setIsDialogOpen(false), []);

    useEffect(() => {
        async function fetchFragrances() {
            try {
                const response = await fetch(`/api/fragrances?query=${encodeURIComponent(searchQuery)}`);
                if (response.ok) {
                    const data = await response.json();
                    setFragrances(data);
                }
            } catch (error) {
                console.error("Failed to fetch fragrances:", error);
            } finally {
                setIsLoading(false);
            }
        }

        const debounce = setTimeout(fetchFragrances, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    return (
        <Container className="py-6">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-display text-[var(--color-fg)]">My Collection</h1>
                    <p className="text-body text-[var(--color-muted)] mt-2">
                        Your fragrance wardrobe
                    </p>
                </div>
                <Button size="sm" onClick={openDialog}>
                    + Add
                </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <Input
                    placeholder="Search fragrances..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    }
                />
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="text-center py-12">
                    <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-caption mt-3">Loading fragrances...</p>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && fragrances.length === 0 && (
                <Card className="text-center py-12">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[var(--color-muted)]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                    </div>
                    <h2 className="text-title text-[var(--color-fg)] mb-2">
                        Start your collection
                    </h2>
                    <p className="text-body text-[var(--color-muted)] mb-6 max-w-sm mx-auto">
                        Add your first fragrance to get personalized layering recommendations
                    </p>
                    <Button onClick={openDialog}>Add Fragrance</Button>
                </Card>
            )}

            {/* Fragrance list */}
            {!isLoading && fragrances.length > 0 && (
                <div className="space-y-3">
                    {fragrances.map((fragrance) => (
                        <Link
                            key={fragrance.id}
                            href={`/fragrance/${fragrance.id}`}
                        >
                            <Card interactive className="flex items-center gap-4">
                                {/* Thumbnail */}
                                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-surface)] flex items-center justify-center shrink-0 overflow-hidden">
                                    {fragrance.image_url ? (
                                        <Image
                                            src={fragrance.image_url}
                                            alt={fragrance.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--color-muted)]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                        </svg>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-headline text-[var(--color-fg)] truncate">
                                        {fragrance.name}
                                    </h3>
                                    <p className="text-caption truncate">
                                        {fragrance.brand}
                                        {fragrance.concentration && ` · ${fragrance.concentration}`}
                                    </p>
                                </div>

                                {/* Chevron */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-[var(--color-muted)] shrink-0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            {/* Add Fragrance Dialog */}
            <AddFragranceDialog isOpen={isDialogOpen} onClose={closeDialog} />
        </Container>
    );
}
