import { FEATURED_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditCard } from "../../Credits/CreditCard/CreditCard";
import styles from "./FeaturedCreditsSection.module.scss";

type FeaturedCredit = FEATURED_CREDITS_QUERYResult[number] & {
  resolvedCoverSrc?: string | null;
};

type FeaturedCreditsSectionProps = {
  credits: FeaturedCredit[];
};

export function FeaturedCreditsSection({
  credits,
}: FeaturedCreditsSectionProps) {
  return (
    <div className="u-stack-md">
      <h2 id="home-featured-credits-heading">Featured credits</h2>

      {credits.length === 0 ? (
        <p>No featured credits yet.</p>
      ) : (
        <div className={styles.grid}>
          {credits.map((credit) => (
            <CreditCard
              key={credit._id}
              credit={credit}
              resolvedCoverSrc={credit.resolvedCoverSrc}
            />
          ))}
        </div>
      )}
    </div>
  );
}
