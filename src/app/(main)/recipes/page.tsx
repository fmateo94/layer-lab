"use client";

import { useState } from "react";
import { Container } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import Link from "next/link";

// Mock saved recipes (in a real app, this would come from storage/backend)
interface SavedRecipe {
    id: string;
    name: string;
    fragrances: Array<{ name: string; brand: string; sprays: number }>;
    rating?: number;
    createdAt: Date;
}

const mockRecipes: SavedRecipe[] = [];

export default function RecipesPage() {
    const [recipes] = useState<SavedRecipe[]>(mockRecipes);
    const [sortBy, setSortBy] = useState<"recent" | "rating">("recent");

    const sortedRecipes = [...recipes].sort((a, b) => {
        if (sortBy === "rating") {
            return (b.rating || 0) - (a.rating || 0);
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return (
        <Container className="py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display text-[var(--color-fg)]">Recipes</h1>
                    <p className="text-body text-[var(--color-muted)] mt-2">
                        Your saved layering combinations
                    </p>
                </div>
                <Link href="/recipes/new">
                    <Button size="sm">+ New</Button>
                </Link>
            </div>

            {/* Sort toggle */}
            {recipes.length > 1 && (
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setSortBy("recent")}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${sortBy === "recent"
                                ? "bg-[var(--color-accent)] text-white"
                                : "bg-[var(--color-surface)] text-[var(--color-muted)]"
                            }`}
                    >
                        Recent
                    </button>
                    <button
                        onClick={() => setSortBy("rating")}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${sortBy === "rating"
                                ? "bg-[var(--color-accent)] text-white"
                                : "bg-[var(--color-surface)] text-[var(--color-muted)]"
                            }`}
                    >
                        Top Rated
                    </button>
                </div>
            )}

            {/* Empty state */}
            {recipes.length === 0 && (
                <Card className="text-center py-12">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[var(--color-muted)]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                    </div>
                    <h2 className="text-title text-[var(--color-fg)] mb-2">
                        No recipes yet
                    </h2>
                    <p className="text-body text-[var(--color-muted)] mb-6 max-w-sm mx-auto">
                        Start building your first layering recipe
                    </p>
                    <Link href="/recipes/new">
                        <Button>Create Recipe</Button>
                    </Link>
                </Card>
            )}

            {/* Recipes list */}
            {sortedRecipes.length > 0 && (
                <div className="space-y-3">
                    {sortedRecipes.map((recipe) => (
                        <Card key={recipe.id} interactive>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-headline text-[var(--color-fg)]">
                                        {recipe.name}
                                    </h3>
                                    <p className="text-caption mt-1">
                                        {recipe.fragrances.map((f) => f.name).join(" + ")}
                                    </p>
                                </div>
                                {recipe.rating && (
                                    <div className="flex items-center gap-1 text-[var(--color-warning)]">
                                        <span>★</span>
                                        <span className="text-caption">{recipe.rating}</span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
}
