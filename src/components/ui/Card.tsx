"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: "none" | "sm" | "md" | "lg";
    interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            children,
            padding = "md",
            interactive = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const paddingStyles = {
            none: "",
            sm: "p-3",
            md: "p-4",
            lg: "p-6",
        };

        return (
            <div
                ref={ref}
                className={`
          bg-[var(--color-card)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
          ${paddingStyles[padding]}
          ${interactive ? "cursor-pointer hover:border-[var(--color-accent)] transition-colors duration-200" : ""}
          ${className}
        `}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

// Card Header subcomponent
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function CardHeader({ children, className = "", ...props }: CardHeaderProps) {
    return (
        <div className={`mb-3 ${className}`} {...props}>
            {children}
        </div>
    );
}

// Card Content subcomponent
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function CardContent({ children, className = "", ...props }: CardContentProps) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}
