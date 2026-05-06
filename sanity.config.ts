import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { getSanityDataset, getSanityProjectId } from "./src/lib/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = getSanityProjectId() ?? "";
const dataset = getSanityDataset();

export default defineConfig({
  name: "default",
  title: "Artist Portfolio Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
