'use client';

import { useState, useEffect } from 'react';
import { getTrending } from '@/lib/api';

const HomeBanner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const { results } = await getTrending();
      const randomMovie =
        results[Math.floor(Math.random() * results.length)];
      setMovie(randomMovie);
    };

    fetchMovie();
  }, []);

  if (!movie) {
    return <div className="h-screen bg-black"></div>;
  }

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="h-screen bg-black bg-opacity-50 flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white">{movie.title || movie.name}</h1>
          <p className="text-white mt-4 max-w-2xl">{movie.overview}</p>
          <div className="mt-4">
            <button className="bg-white text-black px-4 py-2 rounded mr-4">
              Play
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
