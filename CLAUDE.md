# Artist Portfolio - Claude Code Context

This is a Next.js 16 + React 19 artist portfolio with GSAP animations, Sanity CMS, and Stripe commerce.

@AGENTS.md

## Project-Specific Context

### Artist Portfolio Features
- 17 artwork pieces displayed in gallery
- 10 commerce products (shirts, stickers, prints)
- Spanish/English i18n with cookie-based locale
- Cookie name: `lang` (values: `es` or `en`)

### Mock Content
When `NEXT_PUBLIC_CONTENT_SOURCE=mock` (default when Sanity is unconfigured):
- Artworks loaded from `src/lib/content/catalog.ts`
- Images served from `public/arte/` directory
- Slugs formatted as `obra-XX-<filename>`

### GSAP Usage
- GSAP plugins registered in `src/core/gsap/registrar.ts`
- Use `useGSAP` hook from `@gsap/react` for React components
- Lenis smooth scrolling on landing slider
- ScrollTrigger for scroll-based animations

### View Transitions
- Enabled in `next.config.ts` (experimental View Transition API)
- Custom page fade animations via CSS classes
- Artwork detail pages use morph transitions with blur effect

### Cart
- Zustand store persisted to localStorage as `artwork-cart`
- Client-only component
- Methods: `addArtwork`, `addProduct`, `removeItem`, `clearCart`

### Key File Locations
- Components: `src/components/`
- GSAP: `src/core/gsap/`
- Sanity: `src/lib/sanity/`
- Stripe: `src/lib/stripe/`
- i18n: `src/lib/dictionaries.ts`
- Content: `src/lib/content/catalog.ts`
- Types: `src/types/content.ts`