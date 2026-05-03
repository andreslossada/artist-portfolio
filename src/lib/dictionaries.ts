import type { Locale } from "@/lib/i18n";

const dictionaries = {
  es: {
    languageSwitcher: {
      spanish: "ES",
      english: "EN",
    },
    themeSwitcher: {
      light: "Claro",
      dark: "Oscuro",
    },
    metadata: {
      siteTitle: "Irina | Artista pintora",
      siteDescription: "Landing portfolio minimalista para artista pintora",
      aboutTitle: "Sobre mí | Estudio Irina",
      aboutDescription:
        "Conoce la visión, proceso y trayectoria de la artista detrás de Estudio Irina.",
      contactTitle: "Contacto | Estudio Irina",
      contactDescription:
        "Contacta al estudio para adquisiciones, comisiones, exposiciones o prensa.",
    },
    header: {
      home: "Inicio",
      gallery: "Galería",
      shop: "Tienda",
      about: "Sobre mí",
      contact: "Contacto",
    },
    footer: {
      copyright: "Portfolio artístico 2026. Todos los derechos reservados.",
    },
    landing: {
      list: "Galería",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
    },
    galleryPage: {
      eyebrow: "Galería",
      title: "Archivo de obra",
    },
    shopPage: {
      eyebrow: "Tienda",
      title: "Ediciones y publicaciones",
      fromArtworkHint: "Estás explorando opciones para adquirir piezas relacionadas.",
      buyWithStripe: "Comprar con Stripe",
    },
    aboutPage: {
      eyebrow: "Sobre mí",
      title: "Un universo marino entre sueño y calma",
      description:
        "La obra de Irina es un viaje visual onírico e inmersivo, profundamente inspirado en la energía de la playa y el océano. Su estilo destaca por el uso de pinceladas texturizadas y fluidas que imitan el movimiento del agua, combinando tonos fríos y relajantes con destellos cálidos y vibrantes. A través de figuras etéreas, sirenas y elementos marinos, su arte captura la magia del mar, invitando al espectador a sumergirse en un mundo tranquilo y lleno de fantasía.",
      visualTags: [
        "Onírico",
        "Inmersivo",
        "Textura fluida",
        "Magia marina",
      ],
      imagePlaceholderTitle: "Retrato de la artista",
      imagePlaceholderHint: "Irina en su estudio.",
      processPillars: [
        {
          title: "Energía oceánica",
          description:
            "Cada composición nace de la fuerza y la calma del mar, transformando su pulso en atmósferas pictóricas.",
        },
        {
          title: "Pincelada líquida",
          description:
            "Las pinceladas texturizadas y fluidas evocan corrientes, espuma y reflejos para sugerir movimiento constante.",
        },
        {
          title: "Fantasía marina",
          description:
            "Sirenas, figuras etéreas y símbolos del océano construyen un relato visual íntimo, sereno y envolvente.",
        },
      ],
      trajectoryEyebrow: "Invitación",
      trajectoryDescription:
        "Cada obra invita a detener el ritmo cotidiano para entrar en una experiencia sensorial donde el mar, la luz y la imaginación dialogan en equilibrio.",
      viewGallery: "Ver galería",
      contact: "Contactar",
    },
    contactPage: {
      eyebrow: "Contacto",
      title: "Hablemos de tu próximo proyecto",
      description:
        "El estudio responde consultas sobre obra disponible, comisiones, colaboraciones curatoriales y prensa. Tiempo estimado de respuesta: 24-48 horas hábiles.",
      channels: {
        email: "Correo",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
      },
      acquisitionsTitle: "Adquisiciones",
      acquisitionsDescription:
        "Si te interesa adquirir una pieza o una edición limitada, puedes explorar la tienda y escribirnos para recibir ficha técnica completa, disponibilidad y opciones de entrega local.",
      goToShop: "Ir a tienda",
      viewArtwork: "Ver obra",
    },
    artworkPage: {
      backToGallery: "Volver a galería",
      detailEyebrow: "Detalle de obra",
      technique: "Técnica",
      dimension: "Dimensión",
      year: "Año",
      shopCta: "Adquirir prints o catálogo",
    },
  },
  en: {
    languageSwitcher: {
      spanish: "ES",
      english: "EN",
    },
    themeSwitcher: {
      light: "Light",
      dark: "Dark",
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
      title: "A marine universe between dream and calm",
      description:
        "Irina's work is a dreamlike and immersive visual journey deeply inspired by the energy of the beach and the ocean. Her style stands out for textured, fluid brushstrokes that echo the movement of water, blending cool and soothing tones with warm, vibrant accents. Through ethereal figures, mermaids, and marine elements, her art captures the magic of the sea and invites the viewer to dive into a tranquil world full of fantasy.",
      visualTags: ["Dreamlike", "Immersive", "Fluid texture", "Marine magic"],
      imagePlaceholderTitle: "Artist portrait",
      imagePlaceholderHint: "Irina in her studio.",
      processPillars: [
        {
          title: "Ocean energy",
          description:
            "Each composition emerges from the sea's force and calm, turning its pulse into pictorial atmospheres.",
        },
        {
          title: "Liquid brushwork",
          description:
            "Textured, fluid brushstrokes evoke currents, foam, and reflections to suggest constant movement.",
        },
        {
          title: "Marine fantasy",
          description:
            "Mermaids, ethereal figures, and ocean symbols create an intimate, serene, and enveloping visual narrative.",
        },
      ],
      trajectoryEyebrow: "Invitation",
      trajectoryDescription:
        "Each artwork invites you to slow down and enter a sensory experience where the sea, light, and imagination exist in balance.",
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
