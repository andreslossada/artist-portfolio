"use client";

import { useState } from "react";

interface CopyEmailCardProps {
  label: string;
  email: string;
}

export default function CopyEmailCard({ label, email }: CopyEmailCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="contact-card group relative cursor-pointer overflow-hidden border border-ink/10 bg-accent p-5 text-left shadow-card transition-transform duration-300 ease-out hover:border-accent/80 active:scale-[0.98] md:p-6"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-accent-soft/80">
        {label}
      </p>
      <div className="font-display relative mt-2 inline-flex items-center gap-2 whitespace-nowrap text-sm leading-tight tracking-tight text-canvas md:mt-3 md:text-base lg:text-lg">
        <span
          className={`transition-opacity duration-300 ${copied ? "opacity-0" : "opacity-100"}`}
        >
          {email}
        </span>
        <span
          className={`absolute left-0 flex items-center gap-2 transition-all duration-300 ${copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
          aria-hidden={!copied}
        >
          <svg
            className="h-6 w-6 text-canvas"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copied
        </span>
      </div>

      {/* subtle flash on copy */}
      <span
        className={`pointer-events-none absolute inset-0 bg-white/10 transition-opacity duration-500 ${copied ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}
