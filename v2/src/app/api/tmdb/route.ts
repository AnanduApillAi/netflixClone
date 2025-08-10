import { NextResponse } from "next/server";
import { tmdb } from "@/lib/api";

// Simple server-side proxy so client components don't need the API key
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") || "popular";

  let url = tmdb.trendingAllWeek();
  if (kind === "popular") url = tmdb.popularMovies();
  else if (kind === "latest") url = tmdb.nowPlayingMovies();
  else if (kind === "top_rated") url = tmdb.topRatedMovies();
  else if (kind === "recommended") url = tmdb.trendingAllWeek();

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return NextResponse.json({ results: [] }, { status: res.status });
    const data = await res.json();
    return NextResponse.json({ results: Array.isArray(data.results) ? data.results : [] });
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}


