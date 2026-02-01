"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            leftIcon,
            rightIcon,
            className = "",
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-[13px] font-medium text-[var(--color-muted)] mb-2"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
                            {leftIcon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full
              bg-[var(--color-surface)]
              text-[var(--color-fg)]
              placeholder:text-[var(--color-muted)]
              border border-transparent
              rounded-full
              px-4 py-3
              text-[17px]
              min-h-[48px]
              transition-all duration-200
              focus:outline-none
              focus:border-[var(--color-accent)]
              focus:ring-2 focus:ring-[var(--color-accent)]/20
              ${leftIcon ? "pl-12" : ""}
              ${rightIcon ? "pr-12" : ""}
              ${error ? "border-[var(--color-error)]" : ""}
              ${className}
            `}
                        {...props}
                    />
                    {rightIcon && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
                            {rightIcon}
                        </span>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-[13px] text-[var(--color-error)]">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
