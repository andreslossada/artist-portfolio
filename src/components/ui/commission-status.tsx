"use client";

interface CommissionStatusProps {
  status: "open" | "closed";
  openLabel: string;
  closedLabel: string;
}

export default function CommissionStatus({
  status,
  openLabel,
  closedLabel,
}: CommissionStatusProps) {
  const isOpen = status === "open";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide ${
        isOpen
          ? "bg-accent/20 text-accent"
          : "bg-muted/20 text-muted"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOpen ? "bg-accent animate-pulse" : "bg-muted"
        }`}
      />
      {isOpen ? openLabel : closedLabel}
    </div>
  );
}
