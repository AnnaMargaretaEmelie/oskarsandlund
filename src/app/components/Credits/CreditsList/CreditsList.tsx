"use client";

import { ALL_CREDITS_QUERYResult } from "@/lib/sanity/sanity.types";
import { CreditCard } from "../CreditCard/CreditCard";
import styles from "./CreditsList.module.scss";

type CreditsListProps = {
  credits: ALL_CREDITS_QUERYResult;
};

export function CreditsList({ credits }: CreditsListProps) {
  return (
    <div className={styles.grid}>
      {credits.map((credit) => (
        <CreditCard key={credit._id} credit={credit} />
      ))}
    </div>
  );
}
