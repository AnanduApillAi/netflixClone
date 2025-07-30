const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetcher = (url: string) =>
  fetch(`${BASE_URL}${url}?api_key=${API_KEY}`).then((res) => res.json());

export const getTrending = () => fetcher('/trending/all/week');

export const getNetflixOriginals = () => fetcher('/discover/tv?with_networks=213');

export const getTopRated = () => fetcher('/movie/top_rated');

export const getMoviesByGenre = (genreId: string) =>
  fetcher(`/discover/movie?with_genres=${genreId}`);

export const getTvShowsByGenre = (genreId: string) =>
  fetcher(`/discover/tv?with_genres=${genreId}`);

export const getMovieDetails = (id: string) => fetcher(`/movie/${id}`);

export const getTvShowDetails = (id: string) => fetcher(`/tv/${id}`);

export const getMovieCast = (id: string) => fetcher(`/movie/${id}/credits`);

export const getTvShowCast = (id: string) => fetcher(`/tv/${id}/credits`);

export const searchMovies = (query: string) =>
  fetcher(`/search/movie?query=${query}`);
