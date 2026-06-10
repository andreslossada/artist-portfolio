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
      aboutTitle: "Sobre mí | Estudio Irina",
      aboutDescription:
        "Conoce la visión, proceso y trayectoria de la artista detrás de Estudio Irina.",
      contactTitle: "Contacto | Estudio Irina",
      contactDescription:
        "Contacta al estudio para adquisiciones, comisiones, exposiciones o prensa.",
      cartTitle: "Carrito | Estudio Irina",
      cartDescription:
        "Revisa las obras seleccionadas y contáctanos para adquirirlas.",
      shopTitle: "Tienda | Estudio Irina",
      shopDescription:
        "Camisas, stickers y ediciones limitadas del estudio.",
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
      shop: "Tienda",
      about: "Sobre mí",
      contact: "Contacto",
      cart: "Carrito",
    },
    galleryPage: {
      eyebrow: "Galería",
      title: "Archivo de obra",
      listEyebrow: "Lista",
      listTitle: "Obras en lista",
    },
    shopPage: {
      eyebrow: "Tienda",
      title: "Ediciones y publicaciones",
      fromArtworkHint: "Estás explorando opciones para adquirir piezas relacionadas.",
      buy: "Comprar",
      categoryAll: "Todos",
      categoryShirts: "Camisas",
      categoryStickers: "Stickers",
      categoryPrints: "Ediciones",
      addToCart: "Agregar al carrito",
      viewCart: "Ver carrito",
      unavailable: "No disponible",
      empty: "No hay productos en esta categoría todavía.",
      backToShop: "Volver a tienda",
    },
    aboutPage: {
      eyebrow: "Sobre mí",
      title: "Un universo marino entre sueño y calma",
      description:
        "La obra de Irina es un viaje visual profundamente inspirado en la energía de la playa y el océano. Su estilo destaca por el uso de pinceladas texturizadas y fluidas que imitan el movimiento del agua, combinando tonos fríos y relajantes con destellos cálidos y vibrantes. A través de figuras etéreas, sirenas y elementos marinos, su arte captura la magia del mar, invitando al espectador a sumergirse en un mundo tranquilo y lleno de fantasía.",
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
      title: "Escríbeme",
      description:
        "El estudio responde consultas sobre obra disponible, comisiones, colaboraciones curatoriales y prensa. Tiempo estimado de respuesta: 24-48 horas hábiles.",
      channels: {
        email: "Correo",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
      },
      commissionStatus: {
        open: "Comisiones abiertas",
        closed: "Comisiones cerradas",
      },
      responseTime: {
        label: "Tiempo de respuesta",
        value: "24-48 horas hábiles",
      },
      acquisitionsTitle: "Adquisiciones",
      acquisitionsDescription:
        "Si te interesa adquirir una pieza o una edición limitada, puedes explorar la tienda y escribirnos para recibir ficha técnica completa, disponibilidad y opciones de entrega local.",
      goToShop: "Ir a tienda",
      viewArtwork: "Ver obra",
      faqTitle: "Preguntas frecuentes",
      faqItems: [
        {
          question: "¿Cuánto cuesta una comisión?",
          answer:
            "Los precios varían según el tamaño, complejidad y técnica solicitada. Puedes escribirnos para recibir una cotización personalizada.",
        },
        {
          question: "¿Cuánto tiempo tarda una comisión?",
          answer:
            "El tiempo de entrega depende de la complejidad del proyecto y la cola de trabajo actual. Generalmente entre 2 y 6 semanas.",
        },
        {
          question: "¿Qué necesito para solicitar una comisión?",
          answer:
            "Solo necesitas escribirnos con una descripción de tu idea: tema, tamaño aproximado, presupuesto y fecha desireda. Nosotros te guiamos desde ahí.",
        },
        {
          question: "¿Puedo pedir modificaciones durante el proceso?",
          answer:
            "Sí, se incluye un número de revisiones en la fase de boceto. Cambios mayores pueden generar costo adicional.",
        },
      ],
      cart: {
        title: "Carrito de obra",
        empty: "Tu carrito está vacío.",
        subtotal: "Subtotal",
        checkout: "Comprar",
        clear: "Vaciar carrito",
        remove: "Quitar",
        loading: "Redirigiendo...",
        error: "No se pudo iniciar el checkout. Intenta de nuevo.",
        success: "Pago completado. Carrito vaciado.",
      },
    },
    artworkPage: {
      backToGallery: "Volver a galería",
      detailEyebrow: "Detalle de obra",
      technique: "Técnica",
      dimension: "Dimensión",
      year: "Año",
      shopCta: "Adquirir prints o catálogo",
      addToCart: "Comprar",
      viewCart: "Ver carrito",
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
      cartTitle: "Cart | Estudio Irina",
      cartDescription:
        "Review selected artworks and contact us to acquire them.",
      shopTitle: "Shop | Estudio Irina",
      shopDescription:
        "Shirts, stickers, and limited editions from the studio.",
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
      shop: "Shop",
      about: "About",
      contact: "Contact",
      cart: "Cart",
    },
    galleryPage: {
      eyebrow: "Gallery",
      title: "Artwork archive",
      listEyebrow: "List",
      listTitle: "Artworks in list view",
    },
    shopPage: {
      eyebrow: "Shop",
      title: "Editions and publications",
      fromArtworkHint: "You are exploring options to acquire related pieces.",
      buy: "Buy",
      categoryAll: "All",
      categoryShirts: "Shirts",
      categoryStickers: "Stickers",
      categoryPrints: "Prints",
      addToCart: "Add to cart",
      viewCart: "View cart",
      unavailable: "Unavailable",
      empty: "No products in this category yet.",
      backToShop: "Back to shop",
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
      title: "Write to me",
      description:
        "The studio responds to inquiries about available works, commissions, curatorial collaborations, and press. Estimated response time: 24-48 business hours.",
      channels: {
        email: "Email",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
      },
      commissionStatus: {
        open: "Commissions open",
        closed: "Commissions closed",
      },
      responseTime: {
        label: "Response time",
        value: "24-48 business hours",
      },
      acquisitionsTitle: "Acquisitions",
      acquisitionsDescription:
        "If you are interested in acquiring a piece or a limited edition, you can explore the shop and contact us for a full technical sheet, availability, and local delivery options.",
      goToShop: "Go to shop",
      viewArtwork: "View artwork",
      faqTitle: "Frequently asked questions",
      faqItems: [
        {
          question: "How much does a commission cost?",
          answer:
            "Prices vary depending on size, complexity, and technique. You can write to us for a personalized quote.",
        },
        {
          question: "How long does a commission take?",
          answer:
            "Delivery time depends on project complexity and current queue. Generally between 2 and 6 weeks.",
        },
        {
          question: "What do I need to request a commission?",
          answer:
            "Just write to us with a description of your idea: theme, approximate size, budget, and desired date. We'll guide you from there.",
        },
        {
          question: "Can I request changes during the process?",
          answer:
            "Yes, a number of revisions are included in the sketch phase. Major changes may incur additional cost.",
        },
      ],
      cart: {
        title: "Artwork cart",
        empty: "Your cart is empty.",
        subtotal: "Subtotal",
        checkout: "Buy",
        clear: "Clear cart",
        remove: "Remove",
        loading: "Redirecting...",
        error: "Checkout could not be started. Please try again.",
        success: "Payment completed. Cart cleared.",
      },
    },
    artworkPage: {
      backToGallery: "Back to gallery",
      detailEyebrow: "Artwork details",
      technique: "Technique",
      dimension: "Dimensions",
      year: "Year",
      shopCta: "Acquire prints or catalog",
      addToCart: "Add to cart",
      viewCart: "View cart",
    },
  },
} as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];
