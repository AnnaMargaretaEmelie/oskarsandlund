import { createClient } from "next-sanity";

export const sanityAdminClient = createClient({
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (!process.env.SANITY_API_TOKEN) {
  throw new Error("Missing SANITY_API_TOKEN");
}