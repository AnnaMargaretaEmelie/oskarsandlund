import { sanityClient } from "./sanity.client";
import {  createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const {projectId, dataset} = sanityClient.config();
if(!projectId || !dataset) {
    throw new Error("Missing Sanity projectId or dataset")
}

const builder = createImageUrlBuilder({projectId, dataset})

export function urlFor (source:SanityImageSource) {
    return builder.image(source);
}