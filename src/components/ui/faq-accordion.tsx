"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: readonly { question: string; answer: string }[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col divide-y divide-ink/10">
      {items.map((item, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between gap-4 text-left font-display text-lg md:text-xl"
          >
            <span>{item.question}</span>
            <svg
              className={cn(
                "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                openIndex === index && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openIndex === index ? "max-h-96 pt-3" : "max-h-0"
            )}
          >
            <p className="text-muted leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
