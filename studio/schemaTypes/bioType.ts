import { defineType, defineField } from "sanity";

export const bioType = defineType({
    name: "bio",
    title: "Bio",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required().error(`Name field is required`),
        }),
        defineField({
            name: "profession",
            title: "Profession",
            type: "string",
            validation: (rule) => rule.required().error(`Profession field is required`),
        }),
        defineField({
            name: "shortBio",
            title: "Short description",
            type: "text",
        }),
        defineField({
            name: "profileImage",
            title: "Representative image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "profession",
        },
        prepare({title, subtitle}) {
            return {
                title: title,
                subtitle: subtitle,
            };
        },
    },
});