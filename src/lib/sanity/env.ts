const fallbackDataset = "production";
const fallbackApiVersion = "2026-04-29";

function firstDefined(...values: Array<string | undefined>) {
  return values.find((value) => value && value.trim().length > 0);
}

export function getSanityProjectId() {
  return firstDefined(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    process.env.SANITY_PROJECT_ID,
    process.env.SANITY_STUDIO_PROJECT_ID,
  );
}

export function getSanityDataset() {
  return (
    firstDefined(
      process.env.NEXT_PUBLIC_SANITY_DATASET,
      process.env.SANITY_DATASET,
      process.env.SANITY_STUDIO_DATASET,
    ) ?? fallbackDataset
  );
}

export function getSanityApiVersion() {
  return (
    firstDefined(
      process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      process.env.SANITY_API_VERSION,
      process.env.SANITY_STUDIO_API_VERSION,
    ) ?? fallbackApiVersion
  );
}
