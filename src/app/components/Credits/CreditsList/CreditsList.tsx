"use client";

import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditCard } from "../CreditCard/CreditCard";
import styles from "./CreditsList.module.scss";
import { useState } from "react";

type FilterKey = "performance" | "engineer" | "producer" | "randomize" | "all";

type CreditsListProps = {
  credits: ALL_CREDITS_QUERYResult;
};

const ENGINEER_ROLES = ["mix", "master", "recording"];

export function CreditsList({ credits }: CreditsListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  function handleFilterClick(filter: FilterKey) {
    setActiveFilter(filter);
  }
  let visibleCredits = credits;
  if (activeFilter === "performance") {
    visibleCredits = credits.filter((credit) =>
      credit.roles?.includes("performance")
    );
  }
  if (activeFilter === "producer") {
    visibleCredits = credits.filter((credit) =>
      credit.roles?.includes("producer")
    );
  }
  if (activeFilter === "engineer") {
    visibleCredits = credits.filter((credit) =>
      credit.roles?.some((role) => ENGINEER_ROLES.includes(role))
    );
  }

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
          onClick={() => handleFilterClick("randomize")}
          className={`${styles.button} ${activeFilter === "randomize" ? styles.active : ""}`}
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
        {visibleCredits.map((credit) => (
          <CreditCard key={credit._id} credit={credit} />
        ))}
      </div>
    </div>
  );
}
