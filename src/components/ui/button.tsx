import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
};

export function Button({
  className,
  variant = "solid",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-visible:ring-accent/40 inline-flex h-11 items-center justify-center px-5 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        variant === "solid"
          ? "bg-accent text-white hover:brightness-110"
          : "border-accent/30 text-ink hover:bg-accent-soft/55 hover:text-accent border",
        className,
      )}
      {...props}
    />
  );
}
