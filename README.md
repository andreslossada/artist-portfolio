# Artist Portfolio

Base premium para portfolio artistico con Next.js App Router, GSAP, Sanity y Stripe.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 con tokens en `src/styles/tokens.css`
- GSAP para capas de animacion
- Sanity para contenido editorial
- Stripe Checkout para flujo de compra MVP

## Primer arranque

1. Instala dependencias:

```bash
npm install
```

2. Copia variables de entorno:

```bash
cp .env.example .env.local
```

3. Levanta desarrollo:

```bash
npm run dev
```

## Scripts utiles

- `npm run dev`: servidor local.
- `npm run lint`: validacion ESLint.
- `npm run typecheck`: validacion TypeScript.
- `npm run build`: compilacion de produccion.
- `npm run format`: formatea con Prettier.

## Estructura inicial

- `src/app/(marketing)/page.tsx`: landing principal.
- `src/app/(gallery)/gallery/page.tsx`: galeria.
- `src/app/(gallery)/artwork/[slug]/page.tsx`: detalle de obra.
- `src/app/api/checkout/route.ts`: creacion de sesion Stripe Checkout.
- `src/app/api/webhooks/stripe/route.ts`: webhook de Stripe.
- `src/core/gsap/*`: registro, timelines y triggers.
- `src/lib/sanity/*`: cliente y queries de Sanity.
- `src/lib/stripe/server.ts`: cliente server-side de Stripe.

## Estado actual

- Etapa 1 iniciada: foundations y arquitectura base listas.
- Datos de galeria/tienda usan mocks en `src/lib/content/catalog.ts` hasta conectar Sanity/Stripe reales.
