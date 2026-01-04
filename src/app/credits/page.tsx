import { ALL_CREDITS_QUERY } from "@/lib/sanity/queries";
import { sanityClient } from "@/lib/sanity/sanity.client";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditsList } from "../components/Credits/CreditsList/CreditsList";

export default async function CreditsPage() {
  const credits =
    await sanityClient.fetch<ALL_CREDITS_QUERYResult>(ALL_CREDITS_QUERY);
  return (
    <section>
      <h1>Credits</h1>
      {credits.length === 0 ? (
        <p>Inga credits ännu.</p>
      ) : (
        <CreditsList credits={credits} />
      )}
    </section>
  );
}
