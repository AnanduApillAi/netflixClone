import HeroNav from "@/components/landing/HeroNav";
import MovieGrid from "@/components/movies/MovieGrid";
import { tmdb } from "@/lib/api";

export const metadata = {
  title: "Search | Netflix Clone",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <main className="w-full lg:w-[min(1280px,100%-16px)] bg-white mx-auto pb-10">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <HeroNav />

        <div className="mt-10">
          {q ? (
            <MovieGrid fetchUrl={tmdb.searchMulti(q)} />
          ) : (
            <p className="text-neutral-400">Type a query to search.</p>
          )}
        </div>

      </div>

    </main>
  );
}


