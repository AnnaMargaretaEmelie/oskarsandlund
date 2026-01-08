
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@sanity/client";
import { getSpotifyCoverUrl } from "@/lib/spotify/spotify";

type CreditDoc = {
  _id: string;
  spotifyUrl?: string;
  spotifyCoverUrl?: string;
  title?: string;
  artist?: string;
};

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_TOKEN) {
  throw new Error(
    "Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN"
  );
}

const sanityWriteClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const QUERY =  `
  *[_type == "credit" && defined(spotifyUrl) && !defined(spotifyCoverUrl)]{
    _id,
    spotifyUrl,
    spotifyCoverUrl,
    title,
    artist
  }
`;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}


async function fetchCoverWithRetry(spotifyUrl: string, maxAttempts = 5): Promise<string | null> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const cover = await getSpotifyCoverUrl(spotifyUrl);
      return cover; 
    } catch (e: unknown) {
      const message =
    e instanceof Error ? e.message : String(e);;

      const is429 = message.includes("429");
      if (!is429 || attempt === maxAttempts) return null;

      const waitMs = Math.min(60_000, 5_000 * Math.pow(2, attempt - 1));
      console.log(`Spotify rate-limited. Waiting ${Math.round(waitMs / 1000)}s... (attempt ${attempt}/${maxAttempts})`);
      await sleep(waitMs);
    }
  }
  return null;
}

async function main() {
  console.log("Fetching credits missing spotifyCoverUrl...");
  const docs = await sanityWriteClient.fetch<CreditDoc[]>(QUERY);
  console.log(`Found ${docs.length} credits to sync.`);


  let updated = 0;
  let skipped = 0;

  for (const doc of docs) {
    const spotifyUrl = doc.spotifyUrl;
    if (!spotifyUrl) {
      skipped++;
      continue;
    }

    const label = `${doc.title ?? "Untitled"}${doc.artist ? ` - ${doc.artist}` : ""}`;
    console.log(`\n[${updated + skipped + 1}/${docs.length}] ${label}`);


    await sleep(600);

    const coverUrl = await fetchCoverWithRetry(spotifyUrl);

    if (!coverUrl) {
      console.log("  → No coverUrl (leaving empty).");
      skipped++;
      continue;
    }

    await sanityWriteClient
      .patch(doc._id)
      .set({ spotifyCoverUrl: coverUrl })
      .commit({ autoGenerateArrayKeys: true });

    console.log("  → Saved spotifyCoverUrl.");
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
