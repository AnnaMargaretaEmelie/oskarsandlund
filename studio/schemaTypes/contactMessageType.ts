import { defineType, defineField } from "sanity";

export const contactMessageType = defineType({
    name: "contactMessage",
    title: "Contact message", 
    type: "document",
    fields: 
    [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "email",
            title: "E-mail",
            type: "string",
            validation: (rule) => rule.required().email(),
        }),

        defineField({
            name: "message",
            title: "Message",
            type: "text",
            validation: (rule) => rule.required(),

        }),

        defineField({
            name: "createdAt",
            title: "Created at",
            type: "datetime",
            validation: (rule) => rule.required(),

        })
    ],

    preview: {
        select: {
            title: "name",
            subtitle: "email",
        },
        prepare({title, subtitle}) {
            return {
                title: title,
                subtitle: subtitle,
            };
        },
    },
})