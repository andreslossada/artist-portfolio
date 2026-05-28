# Artist Portfolio

Base premium para portfolio artístico con Next.js App Router, GSAP, Sanity y Stripe.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 con tokens en `src/styles/tokens.css`
- GSAP para capas de animación (ScrollTrigger, useGSAP)
- Sanity para contenido editorial
- Stripe Checkout para flujo de compra MVP
- Zustand para estado del carrito (persistencia en localStorage)

## Primer arranque

1. Instala dependencias:

```bash
npm install
```

2. Copia variables de entorno:

```bash
cp .env.example .env.local
```

Control de contenido y tienda por flags:

- `NEXT_PUBLIC_CONTENT_SOURCE=sanity|mock`
  - `sanity`: usa contenido de Sanity.
  - `mock`: usa obras locales de `public/arte` (`src/lib/content/catalog.ts`).
- `NEXT_PUBLIC_COMMERCE_ENABLED=true|false`
  - `true`: carrito y checkout activos.
  - `false`: carrito/checkout ocultos o pausados.

Ejemplo temporal para referencia en producción sin obras reales:

- `NEXT_PUBLIC_CONTENT_SOURCE=mock`
- `NEXT_PUBLIC_COMMERCE_ENABLED=false`

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
- `npm run lint:fix`: corrección automática de ESLint.

Validación completa (en orden): `lint -> typecheck -> build`

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (fuentes, Aurora background)
│   ├── globals.css                # Variables CSS, animaciones, view transitions
│   ├── (marketing)/               # Grupo de rutas: landing/marketing
│   │   ├── layout.tsx            # Splash script, header shell
│   │   └── page.tsx              # Home (CreativePortfolioLanding)
│   ├── (gallery)/                # Grupo de rutas: galería/comercio
│   │   ├── layout.tsx            # SiteHeader, PageTransition, SiteFooter
│   │   ├── artwork/[slug]/       # Detalle de obra
│   │   ├── gallery/              # Galería (grid/list)
│   │   ├── shop/                 # Tienda (shirts, stickers, prints)
│   │   ├── shop/[slug]/          # Detalle de producto
│   │   ├── about/
│   │   ├── contact/
│   │   ├── cart/
│   │   └── list/
│   ├── studio/                    # Sanity Studio (/studio)
│   └── api/
│       ├── checkout/             # POST: crear sesión Stripe Checkout
│       ├── webhooks/stripe/      # POST: webhooks de Stripe
│       ├── sanity/sync-artwork-stripe/  # POST: sync Sanity→Stripe
│       └── lang/                 # POST: cambiar idioma
├── components/
│   ├── animations/               # GSAP (splash, hero-reveal)
│   ├── gallery/                  # GalleryGrid, GalleryList
│   ├── sections/                 # Secciones de página
│   └── ui/                       # Componentes primitivos (shadcn-style)
├── core/gsap/
│   ├── registrar.ts              # Registro de plugins GSAP
│   ├── timelines/                # Factorías de timelines
│   └── triggers/                 # Configuraciones ScrollTrigger
├── lib/
│   ├── sanity/                   # Cliente, server-client, queries GROQ
│   ├── stripe/server.ts          # Singleton de Stripe (server-only)
│   ├── artworks.ts               # Abstracción de contenido
│   ├── content/catalog.ts        # Mock data (17 obras, 10 productos)
│   ├── dictionaries.ts          # Traducciones es/en
│   ├── i18n.ts                   # Resolución de locale
│   └── runtime-mode.ts           # Helpers CONTENT_SOURCE, COMMERCE_ENABLED
├── store/
│   └── cart.ts                   # Zustand cart (client, persist localStorage)
├── types/
│   └── content.ts                # Tipos Artwork, Product, CartItem
└── styles/
    └── tokens.css                # CSS variables para Tailwind
```

## API Routes

| Endpoint | Método | Propósito |
|----------|--------|-----------|
| `/api/checkout` | POST | Crear sesión de Stripe Checkout |
| `/api/webhooks/stripe` | POST | Manejar eventos de Stripe |
| `/api/sanity/sync-artwork-stripe` | POST | Sincronizar obra de Sanity a Stripe |
| `/api/lang` | POST | Establecer preferencia de idioma |

## Tipos de Datos

```typescript
type Image = {
  id: string;
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
  description: string;
  excerpt: string;
  price: number;
  category: string;
  stripePriceId: string;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  excerpt: string;
  price: number;
  currency: string;
  imageUrl: string;
  stripePriceId: string;
  category: "shirt" | "sticker" | "print";
};
```

## Sanity + Stripe Auto-sync

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

## Patrones Arquitectónicos

### Abstracción de Contenido
`src/lib/artworks.ts` usa `isMockContentSource()` para alternar entre Sanity y mock. Los mocks generan datos a partir de imágenes en `public/arte/`.

### View Transitions
- API experimental de Next.js 16 habilitada en `next.config.ts`
- Animaciones CSS personalizadas (`page-fade-out`, `page-fade-in`)
- Transiciones morph con efecto blur en páginas de obra

### i18n
- Locale basado en cookie (`lang` cookie, valores: `es` o `en`)
- Diccionarios completos en `src/lib/dictionaries.ts`

### GSAP + React
- Plugins registrados via `registerGsapPlugins()` en `src/core/gsap/registrar.ts`
- Hook `useGSAP` de `@gsap/react` para componentes React
- Lenis smooth scrolling en el slider de landing

### Cart (Zustand)
- Store en `src/store/cart.ts` (cliente-only)
- Persistencia en localStorage como `artwork-cart`
- Métodos: `addArtwork`, `addProduct`, `removeItem`, `clearCart`, `isInCart`, `subtotal`, `count`

## Variables de Entorno

```bash
# Contenido
NEXT_PUBLIC_CONTENT_SOURCE=mock|sanity

# Comercio
NEXT_PUBLIC_COMMERCE_ENABLED=true|false
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_WRITE_TOKEN
SANITY_STRIPE_SYNC_SECRET

# Sitio
NEXT_PUBLIC_SITE_URL
```