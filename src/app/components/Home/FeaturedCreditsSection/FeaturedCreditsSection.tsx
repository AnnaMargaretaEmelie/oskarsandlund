import { FEATURED_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditCard } from "../../CreditCard/CreditCard";

type FeaturedCreditsSectionProps = {
  credits: FEATURED_CREDITS_QUERYResult;
};

export function FeaturedCreditsSection({
  credits,
}: FeaturedCreditsSectionProps) {
  return (
    <section aria-labelledby="home-featured-credits-heading">
      <h2 id="home-featured-credits-heading">Featured credits</h2>
      {credits.length === 0 ? (
        <p>No featured credits yet.</p>
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
