const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

const CONTENT_SOURCES = new Set(["sanity", "mock"]);

function isEnabled(value: string | undefined) {
  return value ? TRUE_VALUES.has(value.trim().toLowerCase()) : false;
}

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

export function isCommerceEnabled() {
  const configured =
    process.env.COMMERCE_ENABLED ?? process.env.NEXT_PUBLIC_COMMERCE_ENABLED;

  if (configured === undefined) {
    return true;
  }

  return isEnabled(configured);
}
