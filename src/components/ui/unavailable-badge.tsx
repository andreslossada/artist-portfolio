import { cn } from "@/lib/utils";

type UnavailableBadgeProps = {
  className?: string;
  label?: string;
};

export function UnavailableBadge({ className, label = "No disponible" }: UnavailableBadgeProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-3 left-3 z-10",
        className
      )}
    >
      <div className="bg-ink text-canvas px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.15em] md:text-xs">
        {label}
      </div>
    </div>
  );
}