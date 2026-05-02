import type { Locale } from "@/lib/i18n";

const dictionaries = {
  es: {
    languageSwitcher: {
      spanish: "ES",
      english: "EN",
    },
    metadata: {
      siteTitle: "Irina | Artista pintora",
      siteDescription: "Landing portfolio minimalista para artista pintora",
      aboutTitle: "Sobre mi | Estudio Irina",
      aboutDescription:
        "Conoce la vision, proceso y trayectoria de la artista detras de Estudio Irina.",
      contactTitle: "Contacto | Estudio Irina",
      contactDescription:
        "Contacta al estudio para adquisiciones, comisiones, exposiciones o prensa.",
    },
    header: {
      home: "Inicio",
      gallery: "Galeria",
      shop: "Tienda",
      about: "Sobre mi",
      contact: "Contacto",
    },
    footer: {
      copyright: "Portfolio artistico 2026. Todos los derechos reservados.",
    },
    landing: {
      list: "Lista",
      projects: "Proyectos",
      about: "Sobre mi",
      contact: "Contacto",
    },
    galleryPage: {
      eyebrow: "Galeria",
      title: "Archivo de obra",
    },
    shopPage: {
      eyebrow: "Tienda",
      title: "Ediciones y publicaciones",
      fromArtworkHint: "Estas explorando opciones para adquirir piezas relacionadas.",
      buyWithStripe: "Comprar con Stripe",
    },
    aboutPage: {
      eyebrow: "Sobre mi",
      title: "Pintura contemporanea desde el borde del mar",
      description:
        "Estudio Irina desarrolla obra pictorica en tecnica mixta con enfoque en materialidad, ritmo y memoria del paisaje costero. Cada serie explora la tension entre estructura y accidente.",
      processPillars: [
        {
          title: "Materia y gesto",
          description:
            "Capas de cal, pigmento y veladuras construyen una superficie viva que cambia con la luz.",
        },
        {
          title: "Archivo costero",
          description:
            "La coleccion nace de caminatas frente al mar y del registro de texturas en muros erosionados.",
        },
        {
          title: "Serie limitada",
          description:
            "Cada obra y edicion se desarrolla en lotes pequenos para mantener una narrativa curatorial consistente.",
        },
      ],
      trajectoryEyebrow: "Trayectoria",
      trajectoryDescription:
        "Desde 2020, la artista ha presentado obra en residencias y muestras de estudio en Buenos Aires, Montevideo y Barcelona, colaborando con talleres de conservacion para investigar soportes minerales y materiales de larga duracion.",
      viewGallery: "Ver galeria",
      contact: "Contactar",
    },
    contactPage: {
      eyebrow: "Contacto",
      title: "Hablemos de tu proximo proyecto",
      description:
        "El estudio responde consultas sobre obra disponible, comisiones, colaboraciones curatoriales y prensa. Tiempo estimado de respuesta: 24-48 horas habiles.",
      channels: {
        email: "Correo",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
      },
      acquisitionsTitle: "Adquisiciones",
      acquisitionsDescription:
        "Si te interesa adquirir una pieza o una edicion limitada, puedes explorar la tienda y escribirnos para recibir ficha tecnica completa, disponibilidad y opciones de entrega local.",
      goToShop: "Ir a tienda",
      viewArtwork: "Ver obra",
    },
    artworkPage: {
      backToGallery: "Volver a galeria",
      detailEyebrow: "Detalle de obra",
      technique: "Tecnica",
      dimension: "Dimension",
      year: "Ano",
      shopCta: "Adquirir prints o catalogo",
    },
  },
  en: {
    languageSwitcher: {
      spanish: "ES",
      english: "EN",
    },
    metadata: {
      siteTitle: "Irina | Painter",
      siteDescription: "Minimal portfolio landing page for a painter",
      aboutTitle: "About | Estudio Irina",
      aboutDescription:
        "Learn about the vision, process, and journey behind Estudio Irina.",
      contactTitle: "Contact | Estudio Irina",
      contactDescription:
        "Contact the studio for acquisitions, commissions, exhibitions, or press.",
    },
    header: {
      home: "Home",
      gallery: "Gallery",
      shop: "Shop",
      about: "About",
      contact: "Contact",
    },
    footer: {
      copyright: "Art portfolio 2026. All rights reserved.",
    },
    landing: {
      list: "List",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    galleryPage: {
      eyebrow: "Gallery",
      title: "Artwork archive",
    },
    shopPage: {
      eyebrow: "Shop",
      title: "Editions and publications",
      fromArtworkHint: "You are exploring options to acquire related pieces.",
      buyWithStripe: "Buy with Stripe",
    },
    aboutPage: {
      eyebrow: "About",
      title: "Contemporary painting from the edge of the sea",
      description:
        "Estudio Irina develops mixed-media paintings focused on materiality, rhythm, and coastal memory. Each series explores the tension between structure and chance.",
      processPillars: [
        {
          title: "Matter and gesture",
          description:
            "Layers of lime, pigment, and glazes build a living surface that shifts with light.",
        },
        {
          title: "Coastal archive",
          description:
            "The collection grows from seaside walks and from recording textures on weathered walls.",
        },
        {
          title: "Limited series",
          description:
            "Each artwork and edition is produced in small runs to keep a consistent curatorial narrative.",
        },
      ],
      trajectoryEyebrow: "Trajectory",
      trajectoryDescription:
        "Since 2020, the artist has presented work in residencies and studio exhibitions in Buenos Aires, Montevideo, and Barcelona, collaborating with conservation workshops to research mineral supports and long-lasting materials.",
      viewGallery: "View gallery",
      contact: "Get in touch",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Let us talk about your next project",
      description:
        "The studio responds to inquiries about available works, commissions, curatorial collaborations, and press. Estimated response time: 24-48 business hours.",
      channels: {
        email: "Email",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
      },
      acquisitionsTitle: "Acquisitions",
      acquisitionsDescription:
        "If you are interested in acquiring a piece or a limited edition, you can explore the shop and contact us for a full technical sheet, availability, and local delivery options.",
      goToShop: "Go to shop",
      viewArtwork: "View artwork",
    },
    artworkPage: {
      backToGallery: "Back to gallery",
      detailEyebrow: "Artwork details",
      technique: "Technique",
      dimension: "Dimensions",
      year: "Year",
      shopCta: "Acquire prints or catalog",
    },
  },
} as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];
