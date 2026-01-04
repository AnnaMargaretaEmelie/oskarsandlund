import styles from "./CreditCard.module.scss";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/sanity.image";

type Credit = ALL_CREDITS_QUERYResult[number];

type CreditCardProps = {
  credit: Credit;
  resolvedCoverSrc?: string | null;
};

export function CreditCard({ credit, resolvedCoverSrc }: CreditCardProps) {
  const sanityCover = credit.coverImage
    ? urlFor(credit.coverImage).width(600).height(600).url()
    : null;

  const coverSrc = resolvedCoverSrc ?? sanityCover;

  const coverAlt = `Cover for ${credit.title}${credit.artist ? ` by ${credit.artist}` : ""}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className={styles.coverImage}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
        <button
          className={styles.tapTarget}
          aria-label={`Show details for ${credit.title}`}
        />
        <div className={styles.overlay}>
          <p>{credit.roles?.join(", ")}</p>
          {credit.year && <p>{credit.year}</p>}
          {credit.spotifyUrl && (
            <a
              href={credit.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${credit.title} on Spotify`}
            >
              Listen on Spotify
            </a>
          )}
        </div>
      </div>
      <p className={styles.title}>{credit.title}</p>
      <p className={styles.artist}>{credit.artist}</p>
    </div>
  );
}
