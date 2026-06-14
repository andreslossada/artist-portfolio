<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Dev Commands

- `npm run dev` - Start dev server
- `npm run lint` - ESLint check
- `npm run typecheck` - TypeScript check
- `npm run build` - Production build
- `npm run format` - Prettier write
- `npm run lint:fix` - ESLint auto-fix

Order for full validation: `lint -> typecheck -> build`

## Key Setup

1. Copy `.env.example` to `.env.local` before running dev
2. Data currently uses mocks in `src/lib/content/catalog.ts` (not yet connected to Sanity)

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind v4 with CSS variables in `src/styles/tokens.css`
- GSAP animations in `src/core/gsap/` (ScrollTrigger, useGSAP from @gsap/react)
- Sanity CMS at `src/lib/sanity/` (Studio at `/studio`)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/           # Route group: landing/marketing
│   │   ├── layout.tsx        # Header shell, page transitions
│   │   └── page.tsx          # Home landing (CreativePortfolioLanding)
│   ├── (gallery)/            # Route group: main content
│   │   ├── layout.tsx        # SiteHeader, PageTransition, SiteFooter
│   │   ├── artwork/[slug]/    # Artwork detail (generateStaticParams, view transitions)
│   │   ├── gallery/           # Gallery grid/list view
│   │   ├── shop/             # Products (shirts, stickers, prints)
│   │   ├── shop/[slug]/       # Product detail
│   │   ├── about/
│   │   ├── contact/
│   │   ├── cart/
│   │   └── list/
│   ├── studio/               # Sanity Studio
│   └── api/
│       └── lang/             # Set language preference
├── components/
│   ├── animations/           # GSAP-powered animations (splash, hero-reveal)
│   ├── gallery/              # GalleryGrid, GalleryList
│   ├── sections/             # Page sections (creative-portfolio-landing, featured-artworks, etc.)
│   ├── ui/                   # Primitive components (button, aurora-background, page-transition, etc.)
│   │   ├── time-of-day-wallpaper.tsx  # Injects time colors as CSS vars on <html>
│   │   └── time-slider.tsx            # Dev tool for manual hour override
├── core/gsap/
│   ├── registrar.ts          # Registers GSAP plugins (useGSAP, ScrollTrigger)
│   ├── timelines/           # Animation timeline factories
│   └── triggers/             # Scroll trigger configurations
├── lib/
│   ├── sanity/               # Client, server-client, image builder, GROQ queries
│   ├── artworks.ts           # Data fetching (Sanity or mock fallback via CONTENT_SOURCE)
│   ├── content/catalog.ts    # Mock data (17 artworks, 10 products)
│   ├── dictionaries.ts       # i18n translations (es/en)
│   ├── i18n.ts               # Locale resolution from "lang" cookie
│   ├── runtime-mode.ts       # CONTENT_SOURCE helper
│   └── time-of-day.ts        # Time-based color palette engine (7 stops, interpolation)
├── types/
│   └── content.ts            # Artwork, Product types
└── styles/
    └── tokens.css            # CSS custom properties exposed to Tailwind
```

## Key Architectural Patterns

### Content Source Abstraction
`src/lib/artworks.ts` uses `isMockContentSource()` to switch between Sanity and mock fallback. Mock data in `src/lib/content/catalog.ts` generates artworks from image files in `public/arte/`.

### Runtime Mode Toggles
- `NEXT_PUBLIC_CONTENT_SOURCE=mock|sanity` (defaults to "sanity" but uses mock if Sanity unconfigured)

### View Transitions
Next.js 16 experimental View Transition API enabled in `next.config.ts`. Custom CSS animations (`page-fade-out`, `page-fade-in`) for page transitions. Artwork pages have morph transitions with blur effect.

### GSAP Integration
GSAP plugins registered via `registerGsapPlugins()` in `src/core/gsap/registrar.ts`. Uses `@gsap/react` for React integration. Lenis smooth scrolling used in `CreativePortfolioLanding`.

### i18n
Cookie-based locale ("lang" cookie, values "es" or "en"). Full translation dictionaries in `src/lib/dictionaries.ts`.

### Shop as Catalog
Products displayed with prices and contact-to-buy flow. Buttons link to `/contact` for inquiries.

## API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/lang` | POST | Set language preference |

## Environment Variables

```
# Content Source
NEXT_PUBLIC_CONTENT_SOURCE=mock|sanity

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_WRITE_TOKEN

# Site
NEXT_PUBLIC_SITE_URL
```

## Content Types

```typescript
type Artwork = {
  id: string, slug: string, title: string, year: string,
  medium: string, dimensions: string, imageUrl: string,
  description: string, excerpt: string, price: number,
  category: string
}

type Product = {
  id: string, slug: string, name: string, description: string,
  excerpt: string, price: number, currency: string,
  imageUrl: string,
  category: "shirt" | "sticker" | "print"
}
```

## Time-of-Day Color Palette

The entire site's color palette **dynamically shifts based on real-world time of day**.
Colors are **not** static CSS — they are computed by `getTimeColors()` in `src/lib/time-of-day.ts`
and injected as CSS custom properties (`--color-canvas`, `--color-ink`, etc.) on `<html>` by
the `<TimeOfDayWallpaper>` component in `src/components/ui/time-of-day-wallpaper.tsx`.

**7 time stops** define the full palette at key hours, blended via cosine-eased interpolation:

| Hour | Name      | Canvas     | Vibe          |
|------|-----------|------------|---------------|
| 0.0  | Midnight  | `#020d18`  | Deep ocean    |
| 5.5  | Dawn      | `#0a2840`  | Dark blue     |
| 7.5  | Morning   | `#0077aa`  | Turquoise     |
| 12.0 | Noon      | `#00a8cc`  | Bright cyan   |
| 15.0 | Afternoon | `#0098bb`  | Medium blue   |
| 17.5 | Sunset    | `#005878`  | Golden/orange |
| 19.5 | Evening   | `#0a2a48`  | Dark blue     |

### How to use time colors

- **CSS**: `color: var(--color-ink); background: var(--color-canvas);`
- **Tailwind tokens**: `bg-canvas`, `text-ink`, `border-accent`, `bg-surface`, `text-muted`, `bg-accent-soft` (bridged via `@theme inline` in `tokens.css`)
- **JavaScript**: `import { getTimeColors, getCurrentHour } from "@/lib/time-of-day"` returns a full `TimeColors` object with 25+ properties (canvas, ink, accent, muted, fishColor, sandColor, wave gradient stops, glow colors, etc.)

### How to add a new time-dependent color

1. Add property to `TimeColors` type in `src/lib/time-of-day.ts`
2. Add value to **all 7** `TIME_STOPS`
3. Add interpolation in `getTimeColors()` result object
4. Set as CSS var in `TimeOfDayWallpaper`'s `useEffect`
5. If needed for Tailwind: add alias in `src/styles/tokens.css`

### Dev tools for time palette

- `Ctrl+Shift+H` toggles the floating `TimeSlider` overlay (dev mode only)
- `?hour=14.5` URL param manually sets the hour (0–23.5, step 0.5)
- Wallpaper re-computes every 60s via `setInterval` to keep colors current

### Static fallbacks

`globals.css` defines default `--color-*` values (`#1a7a6e` teal palette) used before
Wallpaper mounts and as fallback. The theme is locked to dark (`data-theme="dark"`).

### Typography

Uses Lora (serif, headings) and Manrope (sans, body) fonts via `--font-sans` and `--font-display` CSS variables.

## Important Conventions

- Server Components by default; use `"use client"` only when needed (animations, cart, interactive elements)
- shadcn/ui component style (new-york) with `cn()` utility (clsx + tailwind-merge)
- Static params generation for artwork/product detail pages with `generateStaticParams()`
- GSAP animations use `useGSAP` hook with cleanup via `gsap.context()`
