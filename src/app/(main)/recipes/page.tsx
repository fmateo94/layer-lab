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
                    <div className="text-4xl mb-4">🧪</div>
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
