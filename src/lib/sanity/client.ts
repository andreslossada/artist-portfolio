import { createClient } from "next-sanity";
import { getSanityApiVersion, getSanityDataset, getSanityProjectId } from "./env";

const projectId = getSanityProjectId();
const dataset = getSanityDataset();
const apiVersion = getSanityApiVersion();

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
