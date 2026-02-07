"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/layout";
import { Button, Card, Input } from "@/components/ui";
import { Fragrance, FragranceDetail, mapApiFragrance } from "@/lib/types";
import Image from "next/image";

interface RecipeSlot {
    fragrance: Fragrance | null;
    sprays: number;
    role: "base" | "topper" | "optional";
}

// Fragrance Slot component
function FragranceSlot({
    slot,
    onRemove,
    onSpraysChange,
}: {
    slot: RecipeSlot;
    onRemove: () => void;
    onSpraysChange: (sprays: number) => void;
}) {
    const roleLabels = {
        base: "Base Layer",
        topper: "Top Layer",
        optional: "Optional",
    };

    if (!slot.fragrance) {
        return (
            <Card className="flex items-center justify-center h-24 border-dashed">
                <p className="text-caption">{roleLabels[slot.role]} – tap to add</p>
            </Card>
        );
    }

    return (
        <Card className="flex items-center gap-4">
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-surface)] flex items-center justify-center shrink-0 overflow-hidden">
                {slot.fragrance.imageUrl ? (
                    <Image
                        src={slot.fragrance.imageUrl}
                        alt={slot.fragrance.name}
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
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[var(--color-accent)] uppercase">
                        {roleLabels[slot.role]}
                    </span>
                </div>
                <h3 className="text-headline text-[var(--color-fg)] truncate">
                    {slot.fragrance.name}
                </h3>
                <p className="text-caption truncate">{slot.fragrance.brand}</p>
            </div>

            {/* Spray count */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onSpraysChange(Math.max(1, slot.sprays - 1))}
                    className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-fg)]"
                >
                    −
                </button>
                <span className="text-headline w-6 text-center">{slot.sprays}</span>
                <button
                    onClick={() => onSpraysChange(Math.min(10, slot.sprays + 1))}
                    className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-fg)]"
                >
                    +
                </button>
            </div>

            {/* Remove */}
            <button onClick={onRemove} className="p-2 -mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[var(--color-muted)]"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </Card>
    );
}

function RecipeBuilderContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const baseId = searchParams.get("base");
    const addId = searchParams.get("add");

    const [recipeName, setRecipeName] = useState("");
    const [slots, setSlots] = useState<RecipeSlot[]>([
        { fragrance: null, sprays: 2, role: "base" },
        { fragrance: null, sprays: 1, role: "topper" },
        { fragrance: null, sprays: 1, role: "optional" },
    ]);

    useEffect(() => {
        async function fetchFragrances() {
            const updates: { index: number; fragrance: Fragrance }[] = [];

            // Fetch base fragrance (from collection) - goes in slot 0
            if (baseId) {
                try {
                    const response = await fetch(`/api/fragrances/${baseId}`);
                    if (response.ok) {
                        const data: FragranceDetail = await response.json();
                        updates.push({ index: 0, fragrance: mapApiFragrance(data) });
                    }
                } catch (error) {
                    console.error("Failed to fetch base fragrance:", error);
                }
            }

            // Fetch recommended fragrance (topper) - goes in slot 1
            if (addId) {
                try {
                    const response = await fetch(`/api/fragrances/${addId}`);
                    if (response.ok) {
                        const data: FragranceDetail = await response.json();
                        updates.push({ index: 1, fragrance: mapApiFragrance(data) });
                    }
                } catch (error) {
                    console.error("Failed to fetch topper fragrance:", error);
                }
            }

            // Apply all updates at once
            if (updates.length > 0) {
                setSlots((prev) => {
                    const updated = [...prev];
                    updates.forEach(({ index, fragrance }) => {
                        updated[index] = { ...updated[index], fragrance };
                    });
                    return updated;
                });
            }
        }

        fetchFragrances();
    }, [baseId, addId]);

    const removeFromSlot = (index: number) => {
        setSlots((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], fragrance: null };
            return updated;
        });
    };

    const updateSprays = (index: number, sprays: number) => {
        setSlots((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], sprays };
            return updated;
        });
    };

    const handleSave = () => {
        // In a real app, this would save to a backend/local storage
        alert("Recipe saved! (This is a demo)");
        router.push("/recipes");
    };

    const hasFragrances = slots.some((s) => s.fragrance);

    return (
        <Container className="py-6 pb-32">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-display text-[var(--color-fg)]">New Recipe</h1>
                <p className="text-body text-[var(--color-muted)] mt-2">
                    Build your perfect layering combination
                </p>
            </div>

            {/* Recipe Name */}
            <div className="mb-6">
                <Input
                    label="Recipe Name"
                    placeholder="e.g., Summer Evening"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </div>

            {/* Fragrance Slots */}
            <div className="space-y-3 mb-6">
                <h2 className="text-headline text-[var(--color-fg)]">Fragrances</h2>
                {slots.map((slot, index) => (
                    <FragranceSlot
                        key={index}
                        slot={slot}
                        onRemove={() => removeFromSlot(index)}
                        onSpraysChange={(sprays) => updateSprays(index, sprays)}
                    />
                ))}
            </div>

            {/* Ratio Summary */}
            {hasFragrances && (
                <Card className="mb-6">
                    <h3 className="text-headline text-[var(--color-fg)] mb-2">Ratio</h3>
                    <p className="text-body text-[var(--color-muted)]">
                        {slots
                            .filter((s) => s.fragrance)
                            .map((s) => `${s.sprays} spray${s.sprays > 1 ? "s" : ""} ${s.fragrance?.name}`)
                            .join(" + ")}
                    </p>
                </Card>
            )}

            {/* Fixed Save Button */}
            <div className="fixed bottom-20 md:bottom-8 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent">
                <Container>
                    <Button
                        fullWidth
                        size="lg"
                        disabled={!hasFragrances}
                        onClick={handleSave}
                    >
                        Save Recipe
                    </Button>
                </Container>
            </div>
        </Container>
    );
}

export default function RecipeBuilderPage() {
    return (
        <Suspense
            fallback={
                <Container className="py-6">
                    <div className="text-center py-12">
                        <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                </Container>
            }
        >
            <RecipeBuilderContent />
        </Suspense>
    );
}
