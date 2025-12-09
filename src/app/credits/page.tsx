import { sanityClient } from "../../../studio/lib/sanity.client";

export default async function CreditsPage() {
  const credits = await sanityClient.fetch(`*[_type == "credit"]`);

  return (
    <main>
      <h1>Credits</h1>
      <p>Antal credits i Sanity: {credits.length}</p>
    </main>
  );
}
