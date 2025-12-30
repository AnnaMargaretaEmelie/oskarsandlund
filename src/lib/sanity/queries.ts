import { defineQuery } from "next-sanity";

export const ALL_CREDITS_QUERY = defineQuery(`
*[_type == "credit"]
| order(coalesce(sortOrder, 9999) asc, year desc, title asc) {
  _id,
  title,
  artist,
  roles[],
  year,
  coverImage,
  spotifyUrl,
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
  coverImage,
  spotifyUrl,
  notes,
  isFeatured,
  "slug": slug.current
}
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
*[_type == "siteSettings"][0] {
  _id,
  siteTitle,
  tagline
}
`);

export const BIO_QUERY = defineQuery(`
  *[_type == "bio"][0] {
    _id,
    name,
    profession,
    shortBio,
    profileImage
  }
  `);