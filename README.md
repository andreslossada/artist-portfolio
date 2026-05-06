# Artist Portfolio

Base premium para portfolio artístico con Next.js App Router, GSAP, Sanity y Stripe.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 con tokens en `src/styles/tokens.css`
- GSAP para capas de animación
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

## Scripts útiles

- `npm run dev`: servidor local.
- `npm run lint`: validación ESLint.
- `npm run typecheck`: validación TypeScript.
- `npm run build`: compilación de producción.
- `npm run format`: formatea con Prettier.

## Sanity + Stripe auto-sync

El proyecto incluye un endpoint para automatizar el `stripePriceId` al publicar obras en Sanity:

- Endpoint: `POST /api/sanity/sync-artwork-stripe`
- Header requerido: `x-sanity-sync-secret: <SANITY_STRIPE_SYNC_SECRET>`
- Payload mínimo: `{ "_id": "<sanity-document-id>" }`

Flujo esperado:

1. La artista crea/publica una obra en `/studio` con `forSale=true` y `price`.
2. Un webhook de Sanity llama al endpoint anterior con el `_id` del documento.
3. El servidor crea/actualiza Product en Stripe y mantiene `stripeProductId` + `stripePriceId` en Sanity.

Sincronización de cambios:

- Si cambias `title` o `slug` en Sanity, se actualiza el Product en Stripe.
- Si cambias `price` en Sanity, se crea un nuevo Price en Stripe y se reemplaza `stripePriceId`.
- Si pones `forSale=false`, el Product se marca como inactivo en Stripe.
- Si vuelves a `forSale=true`, el Product se reactiva y se asegura un Price válido.

Variables requeridas para este flujo:

- `SANITY_API_WRITE_TOKEN` (token con permisos de escritura al dataset)
- `SANITY_STRIPE_SYNC_SECRET` (secreto compartido con webhook de Sanity)
- `STRIPE_SECRET_KEY`

## Estructura inicial

- `src/app/(marketing)/page.tsx`: landing principal.
- `src/app/(gallery)/gallery/page.tsx`: galería.
- `src/app/(gallery)/artwork/[slug]/page.tsx`: detalle de obra.
- `src/app/api/checkout/route.ts`: creación de sesión Stripe Checkout.
- `src/app/api/webhooks/stripe/route.ts`: webhook de Stripe.
- `src/core/gsap/*`: registro, timelines y triggers.
- `src/lib/sanity/*`: cliente y queries de Sanity.
- `src/lib/stripe/server.ts`: cliente server-side de Stripe.

## Estado actual

- Etapa 1 iniciada: foundations y arquitectura base listas.
- Datos de galería/tienda usan mocks en `src/lib/content/catalog.ts` hasta conectar Sanity/Stripe reales.
