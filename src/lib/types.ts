// TMDB API Response Types
export interface TMDBMediaBase {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string }>;
  videos?: {
    results: Array<{
      key: string;
      type: string;
      site: string;
    }>;
  };
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
  status?: string;
  media_type?: string;
  original_language?: string;
}

export interface TMDBMovie extends TMDBMediaBase {
  title: string;
  release_date: string;
  runtime?: number;
}

export interface TMDBTvShow extends TMDBMediaBase {
  name: string;
  first_air_date: string;
  last_air_date?: string;
  episode_run_time?: number[];
  created_by?: Array<{ name: string }>;
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: Array<{ id: number; name: string }>;
}


export interface TMDBResponse {
  results: (TMDBMovie | TMDBTvShow)[];
}

export interface TMDBVideo {
  key: string;
  type: string;
  site: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBPerson {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;
  job?: string;
}

export interface TMDBCompany {
  id: number;
  name: string;
}

// Component Props Types
export interface MovieCardProps {
  item: TMDBMovie | TMDBTvShow;
  href: string;
  type: string;
}

export interface MovieGridProps {
  fetchUrl: string;
  type?: "movie" | "tv";
}

// Hero Carousel Types
export interface HeroItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  original_language?: string;
  release_date?: string;
  first_air_date?: string;
}

// Event Types
export interface HeroPillEvent extends Event {
  detail?: {
    value: string;
  };
}
