import "server-only";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-29";
const token = process.env.SANITY_API_WRITE_TOKEN;

const hasServerConfig = Boolean(projectId && dataset && token);

export function sanityServerReady() {
  return hasServerConfig;
}

export function getSanityServerClient() {
  if (!hasServerConfig) {
    throw new Error(
      "Missing Sanity server config (projectId, dataset, or SANITY_API_WRITE_TOKEN)",
    );
  }

  return createClient({
    projectId: projectId as string,
    dataset: dataset as string,
    apiVersion,
    useCdn: false,
    token,
  });
}
