import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies solid variant by default", () => {
    render(<Button>Solid</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-accent");
  });

  it("applies ghost variant class", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-accent/30");
  });
});

describe("cn utility", () => {
  it("merges class names", async () => {
    const { cn } = await import("@/lib/utils");
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("resolves tailwind conflicts", async () => {
    const { cn } = await import("@/lib/utils");
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});
