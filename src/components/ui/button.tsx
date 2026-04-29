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
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition",
        variant === "solid"
          ? "bg-accent text-white hover:brightness-110"
          : "border-ink/20 text-ink hover:bg-canvas-soft border",
        className,
      )}
      {...props}
    />
  );
}
