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
            of: [
                defineField({
                    name: "role",
                    type: "string",
                }),
            ],
            options: {
                layout: "tags",
                list: [
                    {title: "Mix", value: "mix"},
                    {title: "Engineer", value: "engineer"},
                    {title: "Produced", value: "produced"},
                    {title: "Mastered", value: "mastered"},
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
            name: "externalUrl",
            title: "External URL",
            type: "url",
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
            year: "year"
        },
        prepare(selection) {
            const {title, subtitle, year} = selection;
            return {
                title: title,
                subtitle: `${subtitle ?? ""}${year ? ` • ${year}` : ""}`,
            };
        },
    },
});
