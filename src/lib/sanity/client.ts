import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-29";

const hasConfig = Boolean(projectId && dataset);

export const sanityClient = hasConfig
  ? createClient({
      projectId: projectId as string,
      dataset: dataset as string,
      apiVersion,
      useCdn: true,
    })
  : null;

export function sanityReady() {
  return hasConfig;
}

export function getSanityClient() {
  if (!sanityClient) {
    throw new Error("Sanity is not configured");
  }

  return sanityClient;
}
