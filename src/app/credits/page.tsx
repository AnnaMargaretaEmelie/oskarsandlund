import { ALL_CREDITS_QUERY } from "@/lib/sanity/queries";
import { sanityClient } from "@/lib/sanity/sanity.client";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";

export default async function CreditsPage() {
  const credits =
    await sanityClient.fetch<ALL_CREDITS_QUERYResult>(ALL_CREDITS_QUERY);

  return (
    <section>
      {credits.length === 0 ? (
        <p>Inga credits ännu.</p>
      ) : (
        <>
          <p>Antal credits i Sanity: {credits.length}</p>

          <ul>
            {credits.map((credit) => (
              <li key={credit._id}>
                <p>
                  <strong>{credit.title}</strong> – {credit.artist}
                  {credit.year ? ` (${credit.year})` : null}
                </p>

                {credit.roles?.length ? (
                  <p>Roles: {credit.roles.join(", ")}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
