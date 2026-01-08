import { ALL_CREDITS_QUERY } from "@/lib/sanity/queries";
import { sanityClient } from "@/lib/sanity/sanity.client";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditsList } from "../components/Credits/CreditsList/CreditsList";

import { urlFor } from "@/lib/sanity/sanity.image";

export default async function CreditsPage() {
  const credits =
    await sanityClient.fetch<ALL_CREDITS_QUERYResult>(ALL_CREDITS_QUERY);

  const creditsWithCover = credits.map((credit) => {
    const sanityCover = credit.coverImage
      ? urlFor(credit.coverImage).width(600).height(600).url()
      : null;

    return {
      ...credit,
      resolvedCoverSrc: sanityCover ?? null,
    };
  });

  return (
    <section className="section" aria-labelledby="credits-heading">
      <div className="container">
        <div className="u-stack-md">
          <h1 id="credits-heading">Credits</h1>
          {credits.length === 0 ? (
            <p>No credits yet.</p>
          ) : (
            <CreditsList credits={creditsWithCover} />
          )}
        </div>
      </div>
    </section>
  );
}
