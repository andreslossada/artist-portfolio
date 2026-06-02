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
│   └── ui/                   # Primitive components (button, aurora-background, page-transition, etc.)
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
│   └── runtime-mode.ts       # CONTENT_SOURCE helper
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

## CSS Theme System

Colors defined as CSS variables in `globals.css` (e.g., `--color-*`) and exposed to Tailwind via `@theme inline` in `tokens.css`. Uses Lora (serif, headings) and Manrope (sans, body) fonts.

## Important Conventions

- Server Components by default; use `"use client"` only when needed (animations, cart, interactive elements)
- shadcn/ui component style (new-york) with `cn()` utility (clsx + tailwind-merge)
- Static params generation for artwork/product detail pages with `generateStaticParams()`
- GSAP animations use `useGSAP` hook with cleanup via `gsap.context()`
