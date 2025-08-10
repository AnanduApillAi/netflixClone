export type MediaType = "movie" | "tv" | "all";

const TMDB_API_KEY = process.env.TMDB_API_KEY ?? "";
const TMDB_BASE = "https://api.themoviedb.org/3";

function withApiKey(url: string) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}api_key=${TMDB_API_KEY}`;
  
}

export const tmdb = {
  trendingAllWeek: () => withApiKey(`${TMDB_BASE}/trending/all/week`),
  topRatedMovies: (page = 1) => withApiKey(`${TMDB_BASE}/movie/top_rated?page=${page}`),
  popularMovies: (page = 1) => withApiKey(`${TMDB_BASE}/movie/popular?page=${page}`),
  topRatedTv: (page = 1) => withApiKey(`${TMDB_BASE}/tv/top_rated?page=${page}`),
  nowPlayingMovies: (page = 1) => withApiKey(`${TMDB_BASE}/movie/now_playing?page=${page}`),
  airingTodayTv: (page = 1) => withApiKey(`${TMDB_BASE}/tv/airing_today?page=${page}`),
  discoverNetflixOriginals: (page = 1) =>
    withApiKey(`${TMDB_BASE}/discover/tv?with_networks=213&page=${page}`),
  discoverMovies: (params: string) => withApiKey(`${TMDB_BASE}/discover/movie?${params}`),
  discoverTv: (params: string) => withApiKey(`${TMDB_BASE}/discover/tv?${params}`),
  discoverMoviesWith: (params: Record<string, string | number>) =>
    withApiKey(`${TMDB_BASE}/discover/movie?${new URLSearchParams(params as Record<string, string>).toString()}`),
  discoverTvWith: (params: Record<string, string | number>) =>
    withApiKey(`${TMDB_BASE}/discover/tv?${new URLSearchParams(params as Record<string, string>).toString()}`),
  details: (type: Exclude<MediaType, "all">, id: string, append?: string) =>
    withApiKey(`${TMDB_BASE}/${type}/${id}${append ? `?append_to_response=${append}` : ""}`),
  credits: (type: Exclude<MediaType, "all">, id: string) =>
    withApiKey(`${TMDB_BASE}/${type}/${id}/credits`),
  searchMulti: (query: string, page = 1) =>
    withApiKey(`${TMDB_BASE}/search/multi?query=${encodeURIComponent(query)}&page=${page}`),
  genreList: (type: "movie" | "tv") => withApiKey(`${TMDB_BASE}/genre/${type}/list`),
};

export const IMAGE_BASE = "https://image.tmdb.org/t/p";
export const poster = (path?: string | null, size: "w185" | "w300" | "w500" = "w300") =>
  path ? `${IMAGE_BASE}/${size}${path}` : undefined;
export const backdrop = (path?: string | null, size: "w780" | "w1280" = "w1280") =>
  path ? `${IMAGE_BASE}/${size}${path}` : undefined;


