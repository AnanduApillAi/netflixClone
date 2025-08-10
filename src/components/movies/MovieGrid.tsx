import MovieCard from "./MovieCard";
import { MovieGridProps, TMDBMovie, TMDBTvShow } from "@/lib/types";

export default async function MovieGrid({ fetchUrl, type }: MovieGridProps) {
  let items: (TMDBMovie | TMDBTvShow)[] = [];
  try {
    const res = await fetch(fetchUrl, { next: { revalidate: 60 } });
    const data = res.ok ? await res.json() : { results: [] };
    items = Array.isArray(data.results) ? data.results : [];
  } catch {
    items = [];
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
      {items.map((item) => {
        const itemType = type || item.media_type;
        if (!itemType) return null;

        const title = "title" in item ? item.title : item.name;

        return (
          <MovieCard
            key={`${item.id}-${title}`}
            item={item}
            href={`/${itemType}/${item.id}`}
            type={itemType}
          />
        );
      })}
      {items.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-[#9CA3AF] text-sm mb-2">No results found</div>
          <div className="text-[#6B7280] text-xs">Try selecting a different genre or check back later</div>
        </div>
      )}
    </div>
  );
}


