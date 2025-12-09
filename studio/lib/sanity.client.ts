import { createClient } from "next-sanity";
export const sanityClient = createClient({
  projectId:"klistra in det här",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});