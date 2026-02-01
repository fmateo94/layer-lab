"use client";

import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: "default" | "narrow" | "wide";
}

export function Container({
    children,
    className = "",
    size = "default",
}: ContainerProps) {
    const maxWidths = {
        narrow: "max-w-[640px]",
        default: "max-w-[720px]",
        wide: "max-w-[960px]",
    };

    return (
        <div
            className={`
        w-full mx-auto px-4 sm:px-6
        ${maxWidths[size]}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
