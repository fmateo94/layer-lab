"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout";
import { Button, Card, Input } from "@/components/ui";
import {
    Fragrance,
    FragranceDetail,
    LayeringRecommendation,
    RecommendationsResponse,
    mapApiFragrance,
    mapApiRecommendation,
} from "@/lib/types";
import Link from "next/link";

// Explanation Drawer
function ExplanationDrawer({
    isOpen,
    onClose,
    recommendation,
}: {
    isOpen: boolean;
    onClose: () => void;
    recommendation: LayeringRecommendation;
}) {
    if (!isOpen) return null;

    const { sharedNotes, complementaryNotes, reasons } = recommendation;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-card)] rounded-t-2xl max-h-[70vh] overflow-y-auto safe-area-inset-bottom">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-title text-[var(--color-fg)]">
                            {recommendation.fragrance.name}
                        </h3>
                        <button onClick={onClose} className="p-2 -mr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-[var(--color-muted)]"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Why it works */}
                    <div className="mb-6">
                        <h4 className="text-headline text-[var(--color-fg)] mb-2">Why it works</h4>
                        <ul className="space-y-2">
                            {reasons.map((reason, idx) => (
                                <li key={idx} className="text-body text-[var(--color-muted)] flex gap-2">
                                    <span className="text-[var(--color-accent)]">•</span>
                                    <span>{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shared Notes */}
                    {sharedNotes.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-headline text-[var(--color-fg)] mb-2">Shared notes</h4>
                            <div className="flex flex-wrap gap-2">
                                {sharedNotes.map((note) => (
                                    <span
                                        key={note}
                                        className="px-3 py-1.5 bg-[var(--color-surface)] text-[var(--color-fg)] text-[13px] rounded-full"
                                    >
                                        {note}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Complementary Notes */}
                    {complementaryNotes.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-headline text-[var(--color-fg)] mb-2">New notes</h4>
                            <div className="flex flex-wrap gap-2">
                                {complementaryNotes.map((note) => (
                                    <span
                                        key={note}
                                        className="px-3 py-1.5 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[13px] rounded-full"
                                    >
                                        {note}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add to Recipe */}
                    <Link href={`/recipes/new?add=${recommendation.fragrance.id}`}>
                        <Button fullWidth>Add to Recipe</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Recommendation Row
function RecommendationRow({
    recommendation,
    rank,
}: {
    recommendation: LayeringRecommendation;
    rank: number;
}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { fragrance, layeringType } = recommendation;

    const typeLabels = {
        enhance: "Enhances",
        complement: "Complements",
        contrast: "Contrasts",
    };

    return (
        <>
            <Card
                interactive
                className="flex items-center gap-4"
                onClick={() => setDrawerOpen(true)}
            >
                {/* Rank */}
                <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-headline text-[var(--color-fg)] shrink-0">
                    {rank}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-headline text-[var(--color-fg)] truncate">
                        {fragrance.name}
                    </h3>
                    <p className="text-caption truncate">
                        {fragrance.brand} · {typeLabels[layeringType]}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </Card>

            <ExplanationDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                recommendation={recommendation}
            />
        </>
    );
}

function RecommendationsContent() {
    const searchParams = useSearchParams();
    const baseId = searchParams.get("base");

    const [baseFragrance, setBaseFragrance] = useState<Fragrance | null>(null);
    const [recommendations, setRecommendations] = useState<LayeringRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!baseId) {
                setIsLoading(false);
                return;
            }

            try {
                // Fetch base fragrance
                const fragranceResponse = await fetch(`/api/fragrances/${baseId}`);
                if (fragranceResponse.ok) {
                    const data: FragranceDetail = await fragranceResponse.json();
                    setBaseFragrance(mapApiFragrance(data));
                }

                // Fetch recommendations
                const recsResponse = await fetch("/api/recommendations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        base_fragrance_id: baseId,
                        candidate_scope: "global",
                    }),
                });

                if (recsResponse.ok) {
                    const recsData: RecommendationsResponse = await recsResponse.json();
                    setRecommendations(recsData.recommendations.map(mapApiRecommendation));
                }
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [baseId]);

    if (isLoading) {
        return (
            <Container className="py-6">
                <div className="text-center py-12">
                    <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-caption mt-3">Finding perfect layers...</p>
                </div>
            </Container>
        );
    }

    if (!baseId) {
        return (
            <Container className="py-6">
                <Card className="text-center py-12">
                    <div className="text-4xl mb-4">✨</div>
                    <h2 className="text-title text-[var(--color-fg)] mb-2">
                        Select a fragrance first
                    </h2>
                    <p className="text-body text-[var(--color-muted)] mb-6 max-w-sm mx-auto">
                        Go to your collection and tap a fragrance to get layering recommendations
                    </p>
                    <Link href="/collection">
                        <Button>Browse Collection</Button>
                    </Link>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-6">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href={`/fragrance/${baseId}`}
                    className="inline-flex items-center gap-1 text-[var(--color-accent)] text-[15px] font-medium mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Back
                </Link>
                <h1 className="text-display text-[var(--color-fg)]">Recommendations</h1>
                {baseFragrance && (
                    <p className="text-body text-[var(--color-muted)] mt-2">
                        {recommendations.length} suggestions for {baseFragrance.name}
                    </p>
                )}
            </div>

            {/* Recommendations list */}
            {recommendations.length > 0 ? (
                <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <RecommendationRow
                            key={rec.fragrance.id}
                            recommendation={rec}
                            rank={index + 1}
                        />
                    ))}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <p className="text-body text-[var(--color-muted)]">
                        No recommendations found
                    </p>
                </Card>
            )}
        </Container>
    );
}

export default function RecommendationsPage() {
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
            <RecommendationsContent />
        </Suspense>
    );
}
