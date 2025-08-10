import Image from "next/image";
import Link from "next/link";
import { tmdb, backdrop } from "@/lib/api";
import { Suspense } from "react";
import { ToastOnMount } from "@/components/ui/toast";

async function fetchHero() {
  const res = await fetch(tmdb.trendingAllWeek(), { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const data = await res.json();
  const results = Array.isArray(data?.results) ? data.results : [];
  if (results.length === 0) return null;
  const random = results[Math.floor(Math.random() * Math.min(20, results.length))];
  return random;
}

export default async function HomeHero() {
  const hero = await fetchHero().catch(() => null);
  const bg = backdrop(hero?.backdrop_path);
  const title = hero?.title || hero?.name || "Featured";
  const overview = hero?.overview ?? "";
  const mediaType = hero?.media_type === "movie" ? "movie" : "tv";
  const id = hero?.id?.toString() ?? "";

  return (
    <section className="relative h-[56vw] min-h-[360px] w-full">
      {!hero && (
        <Suspense>
          <ToastOnMount title="Network error" description="Failed fetching trending content." variant="error" />
        </Suspense>
      )}
      {bg && (
        <Image
          src={bg}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">{title}</h1>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-200 max-w-2xl line-clamp-3">
          {overview}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href={`/watch/${mediaType}/${id}`}
            className="bg-white text-black rounded px-4 py-2 text-sm font-medium hover:bg-neutral-200"
          >
            Play Trailer
          </Link>
          <Link
            href={`/${mediaType}/${id}`}
            className="bg-white/20 text-white rounded px-4 py-2 text-sm font-medium hover:bg-white/30"
          >
            More Info
          </Link>
        </div>
      </div>
    </section>
  );
}


