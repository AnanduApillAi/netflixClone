'use client';

import { useState, useEffect } from 'react';
import Card from '../home/Card';
import GenreNav from './GenreNav';
import { getMoviesByGenre, getTvShowsByGenre } from '@/lib/api';
import { usePathname } from 'next/navigation';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const fetchMovies = async () => {
      let results;
      if (pathname === '/movies') {
        results = await getMoviesByGenre(genre);
      } else if (pathname === '/tvshows') {
        results = await getTvShowsByGenre(genre);
      }
      setMovies(results.results);
    };

    fetchMovies();
  }, [genre, pathname]);

  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre);
  };

  return (
    <div>
      <GenreNav onGenreChange={handleGenreChange} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
