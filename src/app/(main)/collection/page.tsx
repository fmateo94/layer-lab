"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { Button, Card, Input } from "@/components/ui";
import { FragranceListItem } from "@/lib/types";
import Link from "next/link";

export default function CollectionPage() {
    const [fragrances, setFragrances] = useState<FragranceListItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchFragrances() {
            try {
                const response = await fetch(`/api/fragrances?q=${searchQuery}`);
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
            <div className="mb-6">
                <h1 className="text-display text-[var(--color-fg)]">My Collection</h1>
                <p className="text-body text-[var(--color-muted)] mt-2">
                    Your fragrance wardrobe
                </p>
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
                    <div className="text-4xl mb-4">✨</div>
                    <h2 className="text-title text-[var(--color-fg)] mb-2">
                        Start your collection
                    </h2>
                    <p className="text-body text-[var(--color-muted)] mb-6 max-w-sm mx-auto">
                        Add your first fragrance to get personalized layering recommendations
                    </p>
                    <Button>Add Fragrance</Button>
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
                                {/* Thumbnail placeholder */}
                                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-surface)] flex items-center justify-center text-xl shrink-0">
                                    ✨
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
        </Container>
    );
}
