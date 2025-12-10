import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType ({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "siteTitle",
            title: "Site Title",
            type: "string",
            validation: (rule) => rule.required().error(`Site Title field is required`),
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
        }),
        defineField({
            name: "navigation",
            title: "Navigation",
            type: "array",
            of: [
                {type: "object",
                    name: "navigationObject",
                    title: "Navigation Link",
                    fields: [
                        {name: "label", title: "Label", type: "string"}, 
                        {name: "href", title: "Link to", type: "string"}
                    ],
                    
                },
            ],
        }),
        defineField({
            name: "contactEmail",
            title: "Email",
            type: "string",
            validation: (rule) => rule.email(),
        }),
        defineField({
            name: "contactPhone",
            title: "Phone",
            type: "string",
        }), 
        defineField({
            name: "contactLocation",
            title: "Location",
            type: "string",
        }),
        defineField({
            name: "socialLinks",
            title: "Social Links",
            type: "array",
            of: [
                {type: "object",
                    name: "socialLink",
                    title: "Social Link",
                    fields: [
                        {name: "label", title: "Label", type: "string"}, 
                        {name: "url", title: "URL", type: "url"}, 
                        {name: "isPrimary", title: "Primary", type: "boolean"}
                    ],
                },
            ],
        }),
        defineField({
            name: "seoDescription",
            title: "SEO description",
            type: "text",
        }),
        defineField({
            name: "defaultOgImage",
            title: "Default OG Image",
            type: "image",
            options: {hotspot: true},
        })
    ],

})