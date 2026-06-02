const CONTENT_SOURCES = new Set(["sanity", "mock"]);

export function getContentSource() {
  const configured = process.env.NEXT_PUBLIC_CONTENT_SOURCE?.trim().toLowerCase();

  if (configured && CONTENT_SOURCES.has(configured)) {
    return configured as "sanity" | "mock";
  }

  return "sanity";
}

export function isMockContentSource() {
  return getContentSource() === "mock";
}
