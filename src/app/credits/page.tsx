import { ALL_CREDITS_QUERY } from "@/lib/sanity/queries";
import { sanityClient } from "@/lib/sanity/sanity.client";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditCard } from "../components/CreditCard/CreditCard";

export default async function CreditsPage() {
  const credits =
    await sanityClient.fetch<ALL_CREDITS_QUERYResult>(ALL_CREDITS_QUERY);

  return (
    <section>
      {credits.length === 0 ? (
        <p>Inga credits ännu.</p>
      ) : (
        <div>
          {credits.map((credit) => (
            <CreditCard key={credit._id} credit={credit} />
          ))}
        </div>
      )}
    </section>
  );
}
