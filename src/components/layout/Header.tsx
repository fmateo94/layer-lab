"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";

const navItems = [
    { href: "/collection", label: "Collection" },
    { href: "/recommendations", label: "Discover" },
    { href: "/recipes", label: "Recipes" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
            <Container>
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <span className="text-headline text-[var(--color-fg)]">
                            Layer Lab
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    px-4 py-2 rounded-full text-[15px] font-medium
                    transition-colors duration-200
                    ${isActive
                                            ? "bg-[var(--color-accent)] text-white"
                                            : "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface)]"
                                        }
                  `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </Container>
        </header>
    );
}
