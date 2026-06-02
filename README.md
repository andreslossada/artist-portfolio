# Artist Portfolio

Base premium para portfolio artístico con Next.js App Router, GSAP y Sanity.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 con tokens en `src/styles/tokens.css`
- GSAP para capas de animación (ScrollTrigger, useGSAP)
- Sanity para contenido editorial

## Primer arranque

1. Instala dependencias:

```bash
npm install
```

2. Copia variables de entorno:

```bash
cp .env.example .env.local
```

Control de contenido por flag:

- `NEXT_PUBLIC_CONTENT_SOURCE=sanity|mock`
  - `sanity`: usa contenido de Sanity.
  - `mock`: usa obras locales de `public/arte` (`src/lib/content/catalog.ts`).

Ejemplo temporal para referencia en producción sin obras reales:

- `NEXT_PUBLIC_CONTENT_SOURCE=mock`

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
│   ├── layout.tsx                 # Root layout (fuentes, Aurora background, splash)
│   ├── globals.css                # Variables CSS, animaciones, view transitions
│   ├── (marketing)/               # Grupo de rutas: landing/marketing
│   │   ├── layout.tsx            # Header shell
│   │   └── page.tsx              # Home (CreativePortfolioLanding)
│   ├── (gallery)/                # Grupo de rutas: galería/contenido
│   │   ├── layout.tsx            # SiteHeader, PageTransition, SiteFooter
│   │   ├── artwork/[slug]/       # Detalle de obra
│   │   ├── gallery/              # Galería (grid/list)
│   │   ├── shop/                 # Tienda (catálogo: shirts, stickers, prints)
│   │   ├── shop/[slug]/          # Detalle de producto
│   │   ├── about/
│   │   ├── contact/
│   │   ├── cart/
│   │   └── list/
│   ├── studio/                    # Sanity Studio (/studio)
│   └── api/
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
│   ├── artworks.ts               # Abstracción de contenido
│   ├── content/catalog.ts        # Mock data (17 obras, 10 productos)
│   ├── dictionaries.ts          # Traducciones es/en
│   ├── i18n.ts                   # Resolución de locale
│   └── runtime-mode.ts           # Helper CONTENT_SOURCE
├── middleware.ts                  # Rate limiting + security headers
├── types/
│   └── content.ts                # Tipos Artwork, Product
└── styles/
    └── tokens.css                # CSS variables para Tailwind
```

## API Routes

| Endpoint | Método | Propósito |
|----------|--------|-----------|
| `/api/lang` | POST | Establecer preferencia de idioma |

## Tipos de Datos

```typescript
type Artwork = {
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
  category: "shirt" | "sticker" | "print";
};
```

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

### Tienda como Catálogo
- Productos con precios y botones que llevan a `/contact` para consultas de compra.

### GSAP + React
- Plugins registrados via `registerGsapPlugins()` en `src/core/gsap/registrar.ts`
- Hook `useGSAP` de `@gsap/react` para componentes React
- Lenis smooth scrolling en el slider de landing

## Variables de Entorno

```bash
# Contenido
NEXT_PUBLIC_CONTENT_SOURCE=mock|sanity

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_API_WRITE_TOKEN

# Sitio
NEXT_PUBLIC_SITE_URL
```
