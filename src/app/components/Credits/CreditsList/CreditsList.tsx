"use client";

import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditCard } from "../CreditCard/CreditCard";
import styles from "./CreditsList.module.scss";
import { useState } from "react";

type FilterKey = "performance" | "engineer" | "producer" | "all";

type Credit = ALL_CREDITS_QUERYResult[number] & {
  resolvedCoverSrc?: string | null;
};

type CreditsListProps = {
  credits: Credit[];
};

const ENGINEER_ROLES = ["mix", "master", "recording"];

function shuffleArray<T>(array: T[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function CreditsList({ credits }: CreditsListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [shuffledCredits, setShuffledCredits] = useState<Credit[] | null>(null);

  function handleFilterClick(filter: FilterKey) {
    setActiveFilter(filter);
    setShuffledCredits(null);
  }
  let visibleCredits = credits;
  if (activeFilter === "performance") {
    visibleCredits = credits.filter((credit) =>
      credit.roles?.includes("performance")
    );
  } else if (activeFilter === "producer") {
    visibleCredits = credits.filter((credit) =>
      credit.roles?.includes("producer")
    );
  } else if (activeFilter === "engineer") {
    visibleCredits = credits.filter((credit) =>
      credit.roles?.some((role) => ENGINEER_ROLES.includes(role))
    );
  }
  function handleRandomizeClick() {
    setShuffledCredits(shuffleArray(visibleCredits));
  }

  const creditsToRender = shuffledCredits ?? visibleCredits;

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <button
          type="button"
          onClick={() => handleFilterClick("performance")}
          className={`${styles.button} ${activeFilter === "performance" ? styles.active : ""}`}
        >
          Performance
        </button>
        <button
          type="button"
          onClick={() => handleFilterClick("engineer")}
          className={`${styles.button} ${activeFilter === "engineer" ? styles.active : ""}`}
        >
          Engineer
        </button>
        <button
          type="button"
          onClick={() => handleFilterClick("producer")}
          className={`${styles.button} ${activeFilter === "producer" ? styles.active : ""}`}
        >
          Producer
        </button>
        <button
          type="button"
          onClick={handleRandomizeClick}
          className={styles.button}
        >
          Randomize
        </button>
        <button
          type="button"
          onClick={() => handleFilterClick("all")}
          className={styles.reset}
        >
          Reset
        </button>
      </div>
      <div className={styles.grid}>
        {creditsToRender.map((credit) => (
          <CreditCard
            key={credit._id}
            credit={credit}
            resolvedCoverSrc={credit.resolvedCoverSrc}
          />
        ))}
      </div>
    </div>
  );
}
