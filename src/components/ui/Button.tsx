"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            fullWidth = false,
            className = "",
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      inline-flex items-center justify-center
      font-semibold
      rounded-full
      transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

        const variants = {
            primary: `
        bg-[var(--color-accent)] text-white
        hover:bg-[var(--color-accent-hover)]
        active:scale-[0.98]
      `,
            secondary: `
        bg-transparent text-[var(--color-fg)]
        border border-[var(--color-border)]
        hover:bg-[var(--color-surface)]
        active:scale-[0.98]
      `,
            ghost: `
        bg-transparent text-[var(--color-muted)]
        hover:text-[var(--color-fg)]
        hover:bg-[var(--color-surface)]
      `,
        };

        const sizes = {
            sm: "text-[13px] px-4 py-2 min-h-[36px]",
            md: "text-[15px] px-5 py-2.5 min-h-[44px]",
            lg: "text-[17px] px-6 py-3 min-h-[52px]",
        };

        return (
            <button
                ref={ref}
                className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
