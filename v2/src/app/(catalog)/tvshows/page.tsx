import MovieGrid from "@/components/movies/MovieGrid";
import { tmdb } from "@/lib/api";
import GenreBar from "./GenreBar";
import HeroNav from "@/components/landing/HeroNav";

export const metadata = {
  title: "TV Shows | Netflix Clone",
};

export default async function TvShowsPage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  const { genre } = await searchParams;
  const params = new URLSearchParams({
    language: "en-US",
    sort_by: "popularity.desc",
    include_null_first_air_dates: "false",
    with_watch_monetization_types: "flatrate",
    with_status: "0",
    with_type: "0",
    ...(genre ? { with_genres: genre } : {}),
  }).toString();

  return (
    <main className="min-h-screen text-[#0B0F19]  bg-white">
      {/* Outer framed canvas */}
      <div className="w-[min(1280px,100%-16px)] bg-white mx-auto">
        <div className="mx-auto max-w-[1200px] min-h-screen px-5 lg:px-8">
          <HeroNav />
          
          {/* Page Header */}
          <div className="mt-8 mb-8">
            <h1 className="text-center font-extrabold text-[36px] leading-[1.05] lg:text-[48px] mb-3">
              Discover TV Shows
            </h1>
            <p className="text-center text-[#6B7280] text-[16px] lg:text-[18px] mb-8">
              Binge-watch the latest series and discover hidden gems
            </p>
            
            {/* Genre Selector */}
            <div className="flex justify-center">
              <GenreBar current={genre} />
            </div>
          </div>
          
          {/* Shows Grid */}
          <div className="pb-12">
            <MovieGrid fetchUrl={tmdb.discoverTv(params)} />
          </div>
        </div>
      </div>
    </main>
  );
}


