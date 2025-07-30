'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import {
  getTrending,
  getNetflixOriginals,
  getTopRated,
} from '@/lib/api';

const MovieScrolls = ({ title, isNetflixOriginals = false }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      let results;
      if (title === 'Trending Now') {
        results = await getTrending();
      } else if (title === 'Popular on Netflix') {
        results = await getNetflixOriginals();
      } else if (title === 'Top Rated') {
        results = await getTopRated();
      }
      setMovies(results.results);
    };

    fetchMovies();
  }, [title]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieScrolls;
