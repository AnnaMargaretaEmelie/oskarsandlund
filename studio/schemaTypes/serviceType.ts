import { defineType, defineField } from "sanity";

export const serviceType = defineType({
    name: "service", 
    title: "Service",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "order",
            title: "Order",
            type: "number",
            validation: (rule) => rule.min(1).max(10).required(), 
        }),
        defineField({
            name: "icon",
            title: "Icon/image",
            type: "image",
            options: { hotspot: true },
        }),

    ],
    preview: {
        select: {
            title: "title",
            subtitle: "order",
        },
        prepare({title, subtitle}) {
            return {
                title,
                subtitle,
            };
        },
    },
});