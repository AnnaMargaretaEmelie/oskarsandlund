import { NextResponse } from "next/server";
import { getSpotifyCoverUrl } from "@/lib/spotify/spotify";

export const revalidate = 60 * 60; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const spotifyUrl = searchParams.get("spotifyUrl");

  if (!spotifyUrl) {
    return NextResponse.json(
      { coverUrl: null, error: "Missing spotifyUrl" },
      { status: 400 }
    );
  }

  try {
    const coverUrl = await getSpotifyCoverUrl(spotifyUrl);

    return NextResponse.json(
      { coverUrl },
      {
        status: 200,
        headers: {
         
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Spotify cover route error:", error);

    return NextResponse.json(
      { coverUrl: null },
      { status: 200 } 
    );
  }
}
