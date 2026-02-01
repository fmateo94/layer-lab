"use client";

import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
            <Container className="flex-1 flex flex-col justify-center py-12">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">✨</div>
                    <h1 className="text-display text-[var(--color-fg)]">Layer Lab</h1>
                </div>

                {/* Value prop */}
                <div className="text-center max-w-md mx-auto mb-12">
                    <h2 className="text-title text-[var(--color-fg)] mb-4">
                        Discover the art of fragrance layering
                    </h2>
                    <p className="text-body text-[var(--color-muted)]">
                        Combine your favorite scents to create unique, personalized fragrances
                        that are perfectly yours.
                    </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-12 max-w-sm mx-auto">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-headline text-[var(--color-fg)]">Smart Recommendations</h3>
                            <p className="text-caption">Get AI-powered pairing suggestions based on note compatibility</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-headline text-[var(--color-fg)]">Save Your Recipes</h3>
                            <p className="text-caption">Build and save layering combinations with spray ratios</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-headline text-[var(--color-fg)]">Learn the Notes</h3>
                            <p className="text-caption">Explore top, heart, and base notes of any fragrance</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/collection">
                        <Button size="lg">Add First Fragrance</Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
