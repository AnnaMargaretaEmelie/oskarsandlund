import { defineField, defineType } from "sanity";

export const creditType = defineType({
    name: "credit",
    title: "Credit",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "artist",
            title: "Artist",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "roles",
            title: "Roles",
            type: "array",
            of: [{type: "string"}],
            options: {
                list: [
                    {title: "Mix", value: "mix"},
                    {title: "Master", value: "master"},
                    {title: "Recording", value: "recording"},
                    {title: "Producer", value: "producer"},
                    {title: "Performance", value: "performance"},
                ],
            },
        }),
        defineField({
            name: "year",
            title: "Year",
            type: "number",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Cover image",
            type: "image",
            options: {hotspot: true},
        }),
        defineField({
            name: "coverAlt",
            title: "Cover image alt text",
            type: "string",
            description: "Short description of the cover image for accessibility.",
        }),
        defineField({
            name: "spotifyUrl",
            title: "Spotify URL",
            type: "url",
            description: "Link to album or track on Spotify."
        }),
        defineField({
            name: "isFeatured",
            title: "Featured on Home page",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "notes",
            title: "Notes",
            type: "text",
        }),
        defineField({
            name: "sortOrder",
            title: "Sort order", 
            type: "number",
        }),
        defineField({
            name: "slug", 
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                slugify: input => input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\s-]/g, "").slice(0,200)
            },
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "artist",
            year: "year",
            media: "coverImage",
        },
        prepare(selection) {
            const {title, subtitle, year, media} = selection;
            return {
                title: title,
                subtitle: `${subtitle ?? ""}${year ? ` • ${year}` : ""}`, media,
            };
        },
    },
});
