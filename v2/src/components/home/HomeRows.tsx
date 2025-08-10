import MovieRow from "@/components/movies/MovieRow";
import { tmdb } from "@/lib/api";

export default function HomeRows() {
  return (
    <div className="space-y-10 py-10">
      <MovieRow title="Top Rated Movies" fetchUrl={tmdb.topRatedMovies()} />
      <MovieRow title="Netflix Originals" fetchUrl={tmdb.discoverNetflixOriginals()} />
      <MovieRow title="Popular Movies" fetchUrl={tmdb.popularMovies()} />
    </div>
  );
}


