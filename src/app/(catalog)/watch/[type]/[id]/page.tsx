import { tmdb } from "@/lib/api";
import { TMDBMovie } from "@/lib/types";

export default async function WatchPage({ params }: { params: Promise<{ type: "movie" | "tv"; id: string }> }) {
  const { type, id } = await params;
  const res = await fetch(tmdb.details(type, id, "videos"), { next: { revalidate: 300 } }).catch(() => null);
  const data: TMDBMovie | null = res?.ok ? await res.json() : null;
  const trailer = data?.videos?.results?.find((v) => v.type === "Trailer") ?? null;

  if (!trailer) {
    return <div className="px-6 py-8">Video currently unavailable</div>;
  }

  return (
    <main className="px-6 py-8">
      <div className="aspect-video w-full max-w-5xl mx-auto">
        <iframe
          className="w-full h-full rounded"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube trailer"
          allowFullScreen
        />
      </div>
    </main>
  );
}


