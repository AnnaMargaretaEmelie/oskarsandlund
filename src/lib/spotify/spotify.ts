type SpotifyEntity = { type: "track" | "album"; id: string};

let cachedToken: { value: string; expiresAt: number } | null = null;


function parseSpotifyUrl(url: string): SpotifyEntity | null {
    try {
        if (url.startsWith("spotify:")) {
            const parts = url.split(":");
            const type = parts[1];
            const id = parts[2];
            if ((type === "track" || type === "album") && id) return { type, id};
            return null;
        }

        const u = new URL(url);
        const [, type, id] = u.pathname.split("/");
        if ((type === "track" || type === "album") && id) return {type, id};
        return null;
    } catch {
        return null;
    }
}

async function getSpotifyAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) return cachedToken.value;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token error (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in?: number };
  const ttlMs = ((json.expires_in ?? 3600) - 60) * 1000; // minus 60s säkerhetsmarginal

  cachedToken = { value: json.access_token, expiresAt: now + ttlMs };
  return json.access_token;
}

type SpotifyImage = {
    url: string;
    width: number | null; 
    height: number | null;
}

function pickBestImage(images: SpotifyImage[] | undefined): string | null {
    if (!images || images.length === 0) return null;
    return images[0]?.url ?? null;
}

export async function getSpotifyCoverUrl(spotifyUrl: string): Promise<string | null> {
    const entity = parseSpotifyUrl(spotifyUrl);
    if (!entity) return null;

    const token = await getSpotifyAccessToken();
    const endpoint = entity.type === "track" ? `https://api.spotify.com/v1/tracks/${entity.id}` : `https://api.spotify.com/v1/albums/${entity.id}`;

    const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}`},
        next: { revalidate: 60 * 60 },
    });
    console.log("Spotify endpoint", endpoint, "status", res.status);

    if (!res.ok) return null;

    const data = await res.json();

    const images: SpotifyImage[] | undefined = entity.type === "track" ? data?.album?.images: data?.images;

    return pickBestImage(images);
}