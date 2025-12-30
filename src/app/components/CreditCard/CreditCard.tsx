import styles from "./CreditCard.module.scss";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";

type Credit = ALL_CREDITS_QUERYResult[number];

type CreditCardProps = {
  credit: Credit;
};

export function CreditCard({ credit }: CreditCardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <button
          className={styles.tapTarget}
          aria-label={`Show details for ${credit.title}`}
        />
        <div className={styles.overlay}>
          <p>{credit.roles?.join(", ")}</p>
          {credit.year && <p>{credit.year}</p>}
        </div>
      </div>
      <p className={styles.title}>{credit.title}</p>
      <p className={styles.artist}>{credit.artist}</p>
    </div>
  );
}
