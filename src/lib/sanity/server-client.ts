import "server-only";
import { createClient } from "next-sanity";
import { getSanityApiVersion, getSanityDataset, getSanityProjectId } from "./env";

const projectId = getSanityProjectId();
const dataset = getSanityDataset();
const apiVersion = getSanityApiVersion();
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
