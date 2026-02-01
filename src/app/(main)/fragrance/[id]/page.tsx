"use client";

import { useState, useEffect, use } from "react";
import { Container } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { Fragrance, FragranceDetail, mapApiFragrance } from "@/lib/types";
import Link from "next/link";

// Note Chip component
function NoteChip({ note }: { note: string }) {
    return (
        <span className="inline-flex px-3 py-1.5 bg-[var(--color-surface)] text-[var(--color-fg)] text-[13px] font-medium rounded-full">
            {note}
        </span>
    );
}

// Notes Section component
function NotesSection({
    title,
    notes,
    defaultOpen = false,
}: {
    title: string;
    notes: string[];
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    if (notes.length === 0) return null;

    return (
        <div className="border-b border-[var(--color-border)] last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="text-headline text-[var(--color-fg)]">{title}</span>
                <div className="flex items-center gap-2">
                    <span className="text-caption">{notes.length} notes</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-4 h-4 text-[var(--color-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className="pb-4 flex flex-wrap gap-2">
                    {notes.map((note) => (
                        <NoteChip key={note} note={note} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FragranceDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const [fragrance, setFragrance] = useState<Fragrance | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchFragrance() {
            try {
                const response = await fetch(`/api/fragrances/${resolvedParams.id}`);
                if (response.ok) {
                    const data: FragranceDetail = await response.json();
                    setFragrance(mapApiFragrance(data));
                }
            } catch (error) {
                console.error("Failed to fetch fragrance:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFragrance();
    }, [resolvedParams.id]);

    if (isLoading) {
        return (
            <Container className="py-6">
                <div className="text-center py-12">
                    <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-caption mt-3">Loading fragrance...</p>
                </div>
            </Container>
        );
    }

    if (!fragrance) {
        return (
            <Container className="py-6">
                <Card className="text-center py-12">
                    <h2 className="text-title text-[var(--color-fg)]">Fragrance not found</h2>
                    <Link href="/collection">
                        <Button variant="secondary" className="mt-4">
                            Back to Collection
                        </Button>
                    </Link>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-6">
            {/* Back button */}
            <Link
                href="/collection"
                className="inline-flex items-center gap-1 text-[var(--color-accent)] text-[15px] font-medium mb-6"
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
                Collection
            </Link>

            {/* Hero */}
            <div className="mb-8">
                <h1 className="text-display text-[var(--color-fg)]">{fragrance.name}</h1>
                <p className="text-body text-[var(--color-muted)] mt-1">
                    {fragrance.brand}
                    {fragrance.concentration && ` · ${fragrance.concentration}`}
                </p>
            </div>

            {/* Notes Pyramid */}
            <Card className="mb-6">
                <h2 className="text-title text-[var(--color-fg)] mb-4">Notes</h2>
                <NotesSection title="Top Notes" notes={fragrance.notes.top} defaultOpen />
                <NotesSection title="Heart Notes" notes={fragrance.notes.middle} />
                <NotesSection title="Base Notes" notes={fragrance.notes.base} />
            </Card>

            {/* Accords */}
            {fragrance.accords && fragrance.accords.length > 0 && (
                <Card className="mb-8">
                    <h2 className="text-headline text-[var(--color-fg)] mb-3">Accords</h2>
                    <div className="flex flex-wrap gap-2">
                        {fragrance.accords.map((accord) => (
                            <span
                                key={accord}
                                className="px-3 py-1.5 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[13px] font-medium rounded-full"
                            >
                                {accord}
                            </span>
                        ))}
                    </div>
                </Card>
            )}

            {/* Primary Action */}
            <div className="fixed bottom-20 md:bottom-8 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent">
                <Container>
                    <Link href={`/recommendations?base=${resolvedParams.id}`}>
                        <Button fullWidth size="lg">
                            Layer with…
                        </Button>
                    </Link>
                </Container>
            </div>
        </Container>
    );
}
