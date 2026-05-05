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
2. Data currently uses mocks in `src/lib/content/catalog.ts` (not yet connected to Sanity/Stripe)

## Tech Notes

- Next.js 16 + React 19 + TypeScript
- Tailwind v4 with CSS variables in `src/styles/tokens.css`
- GSAP animations in `src/core/gsap/`
- Stripe Checkout API at `src/app/api/checkout/route.ts`
- Sanity client in `src/lib/sanity/`
