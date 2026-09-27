# Netflix Clone

A Netflix-style catalogue for browsing movies and TV shows, built with the Next.js App Router and powered by [TMDB](https://www.themoviedb.org/) data.

**Live demo:** https://netflix-clone-orpin-theta-64.vercel.app

## Features

- **Animated landing page**: hero carousel of trending titles with Framer Motion transitions
- **Movies and TV catalogues**: genre filtering driven by URL search params, so filtered views are shareable
- **Title detail pages**: overview, rating, genres, cast and crew for every movie and show
- **Search**: multi-search across movies and TV
- **Trailers**: plays the official YouTube trailer when TMDB has one
- **Page transitions**: smooth navigation using the View Transitions API (`next-view-transitions`)

## How it's built

- **Server Components first.** Catalogue, detail and search pages fetch TMDB data on the server, so the API key never reaches the browser. The one client-side call goes through a small proxy route (`/api/tmdb`).
- **Cached fetches.** TMDB requests use Next.js `revalidate` caching: lists refresh every minute, details every 5 minutes, and genre lists hourly. This keeps pages fast and stays well within TMDB's rate limits.
- **Route-level loading and error states.** Each catalogue section has its own `loading.tsx` and `error.tsx`, so a failed TMDB call degrades one section instead of breaking the whole app.
- **Typed API layer.** `src/lib/api.ts` builds every TMDB URL in one place, and `src/lib/types.ts` types the responses.

## Tech stack

Next.js 15 (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · TMDB API

## Running locally

1. Get a free API key from [TMDB](https://www.themoviedb.org/settings/api).
2. Create `.env.local` in the project root:

   ```bash
   TMDB_API_KEY=your_tmdb_api_key
   ```

3. Install and start:

   ```bash
   npm install
   npm run dev
   ```

Open http://localhost:3000.

## Project structure

```
src/
├── app/
│   ├── (catalog)/          # movies, tvshows, search, detail and watch routes
│   ├── api/tmdb/           # server-side TMDB proxy
│   └── page.tsx            # landing page
├── components/
│   ├── landing/            # hero carousel, nav, pills
│   └── movies/             # movie card and grid
└── lib/                    # TMDB client and types
```

## Disclaimer

This is a learning project and is not affiliated with Netflix. Movie and TV data comes from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
