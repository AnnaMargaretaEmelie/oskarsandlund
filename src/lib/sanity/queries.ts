import { defineQuery } from "next-sanity";

export const ALL_CREDITS_QUERY = defineQuery(`
*[_type == "credit"]
| order(coalesce(sortOrder, 9999) asc, year desc, title asc) {
  _id,
  title,
  artist,
  roles[],
  year,
  externalUrl,
  notes,
  isFeatured,
  "slug": slug.current
}
`);

export const FEATURED_CREDITS_QUERY = defineQuery(`
*[_type == "credit" && isFeatured == true]
| order(coalesce(sortOrder, 9999) asc, year desc, title asc) {
  _id,
  title,
  artist,
  roles[],
  year,
  externalUrl,
  notes,
  "slug": slug.current
}
`);
