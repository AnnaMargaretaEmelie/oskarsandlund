"use client";
import styles from "./CreditCard.module.scss";
import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import Image from "next/image";
import { useState, useEffect, useMemo, useRef } from "react";
import { enqueueCoverFetch } from "@/lib/spotify/coverQueue";
import { inCooldown, setCooldown } from "@/lib/spotify/coverCooldown";

type Credit = ALL_CREDITS_QUERYResult[number];

type CreditCardProps = {
  credit: Credit;
  resolvedCoverSrc?: string | null;
};

export function CreditCard({ credit, resolvedCoverSrc }: CreditCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coverSrc, setCoverSrc] = useState<string | null>(
    resolvedCoverSrc ?? null
  );
  const hasRequestedRef = useRef(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const coverAlt = useMemo(() => {
    return `Cover for ${credit.title}${credit.artist ? ` by ${credit.artist}` : ""}`;
  }, [credit.title, credit.artist]);

  useEffect(() => {
    if (coverSrc) return;
    if (!credit.spotifyUrl) return;
    if (hasRequestedRef.current) return;

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        hasRequestedRef.current = true;

        (async () => {
          try {
            const url = `/api/spotify-cover?spotifyUrl=${encodeURIComponent(
              credit.spotifyUrl!
            )}`;

            if (inCooldown()) {
              hasRequestedRef.current = false;
              return;
            }
            await enqueueCoverFetch(async () => {
              const res = await fetch(url);

              if (res.status === 429) {
                const retryAfter = res.headers.get("Retry-After");
                const seconds = retryAfter ? Number(retryAfter) : 30;
                setCooldown((Number.isFinite(seconds) ? seconds : 30) * 1000);
                hasRequestedRef.current = false;
                return;
              }

              if (!res.ok) return;
              const json = (await res.json()) as { coverUrl: string | null };
              if (json.coverUrl) setCoverSrc(json.coverUrl);
            });
          } catch {}
        })();

        observer.disconnect();
      },
      {
        root: null,

        rootMargin: "50px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [coverSrc, credit.spotifyUrl]);

  return (
    <div
      ref={cardRef}
      className={styles.wrapper}
      data-open={isOpen ? "true" : "false"}
    >
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
          type="button"
          className={styles.tapTarget}
          aria-label={`Show details for ${credit.title}`}
          onClick={() => setIsOpen((v) => !v)}
        />

        <div className={styles.overlay}>
          {credit.roles?.length ? (
            <p className={styles.roles}>{credit.roles.join(" | ")}</p>
          ) : (
            <p className={styles.rolesMuted}>—</p>
          )}

          <div className={styles.overlayFooter}>
            {credit.year && <p className={styles.year}>{credit.year}</p>}

            {credit.spotifyUrl && (
              <a
                href={credit.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.spotifyButton}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Listen to ${credit.title} on Spotify`}
              >
                <svg
                  className={styles.spotifyIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 0.5C5.648 0.5.5 5.648.5 12S5.648 23.5 12 23.5 23.5 18.352 23.5 12 18.352.5 12 .5Zm5.29 16.94a.9.9 0 0 1-1.24.3c-3.4-2.08-7.68-2.55-12.71-1.39a.9.9 0 1 1-.4-1.75c5.5-1.26 10.24-.72 14.05 1.61.43.26.56.82.3 1.23Zm1.78-3.57a1.05 1.05 0 0 1-1.45.35c-3.9-2.4-9.86-3.1-14.5-1.69a1.05 1.05 0 1 1-.61-2.01c5.31-1.61 11.9-.83 16.4 1.95.49.3.64.95.34 1.4Zm.15-3.71c-4.68-2.78-12.4-3.04-16.88-1.68a1.2 1.2 0 1 1-.7-2.29c5.14-1.56 13.68-1.25 19.05 1.94a1.2 1.2 0 0 1-1.24 2.03h-.23Z" />
                </svg>
                Spotify
              </a>
            )}
          </div>
        </div>
      </div>

      <p className={styles.title}>{credit.title}</p>
      <p className={styles.artist}>{credit.artist}</p>
    </div>
  );
}
