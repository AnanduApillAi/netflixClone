import Link from "next/link";
import { tmdb } from "@/lib/api";

async function getGenres() {
  const res = await fetch(tmdb.genreList("tv"), { next: { revalidate: 60 * 60 } });
  if (!res.ok) return [] as { id: number; name: string }[];
  const data = await res.json();
  return Array.isArray(data.genres) ? data.genres : [];
}

type Genre = { id: number; name: string };

export default async function GenreBar({ current }: { current?: string }) {
  const genres: Genre[] = await getGenres();
  
  return (
    <>
      <style>
        {`
        .filter-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .filter-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}
      </style>
      <div
        className="filter-scrollbar flex items-center space-x-3 overflow-x-auto pb-4 -mb-4"
        role="tablist"
        aria-label="Movie Genres"
      >
        <Link
          href="/tvshows"
          className={`flex-shrink-0 px-5 py-2.5 text-sm font-semibold rounded-full shadow-lg transition-all duration-200 ${
            !current
              ? "text-white bg-indigo-600 hover:bg-indigo-700"
              : "text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800"
          }`}
        >
          All TV Shows
        </Link>
        {genres.map((g) => (
          <Link
            key={g.id}
            href={`/tvshows?genre=${g.id}`}
            className={`flex-shrink-0 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
              current === String(g.id)
                ? "text-white bg-indigo-600 shadow-lg hover:bg-indigo-700"
                : "text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800"
            }`}
          >
            {g.name}
          </Link>
        ))}
        
      </div>
    </>
  );
}


