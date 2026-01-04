import { ALL_CREDITS_QUERY } from "@/lib/sanity/queries";
import { sanityClient } from "@/lib/sanity/sanity.client";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditsList } from "../components/Credits/CreditsList/CreditsList";
import { getSpotifyCoverUrl } from "@/lib/spotify/spotify";
import { urlFor } from "@/lib/sanity/sanity.image";

export default async function CreditsPage() {
  const credits =
    await sanityClient.fetch<ALL_CREDITS_QUERYResult>(ALL_CREDITS_QUERY);

  const creditsWithCover = await Promise.all(
    credits.map(async (credit) => {
      const spotifyCover = credit.spotifyUrl
        ? await getSpotifyCoverUrl(credit.spotifyUrl)
        : null;

      const sanityCover = credit.coverImage
        ? urlFor(credit.coverImage).width(600).height(600).url()
        : null;

      return {
        ...credit,
        resolvedCoverSrc: spotifyCover ?? sanityCover ?? null,
      };
    })
  );

  return (
    <section>
      <h1>Credits</h1>
      {credits.length === 0 ? (
        <p>Inga credits ännu.</p>
      ) : (
        <CreditsList credits={creditsWithCover} />
      )}
    </section>
  );
}
