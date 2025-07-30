'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import CastAndCrew from '@/components/movie/CastAndCrew';
import { getMovieDetails, getTvShowDetails } from '@/lib/api';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      // A simple way to determine the media type could be to check the URL
      // or pass it as a query parameter. For now, we'll try fetching from both.
      try {
        const movieDetails = await getMovieDetails(id as string);
        setMovie(movieDetails);
        setMediaType('movie');
      } catch (error) {
        try {
          const tvShowDetails = await getTvShowDetails(id as string);
          setMovie(tvShowDetails);
          setMediaType('tv');
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (!movie) {
    return <div className="h-screen bg-black"></div>;
  }

  return (
    <div>
      <div
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="h-screen bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4 flex items-center">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              width={300}
              height={450}
              className="rounded-md"
            />
            <div className="ml-8 text-white">
              <h1 className="text-5xl font-bold">{movie.title || movie.name}</h1>
              <div className="flex items-center mt-4">
                <span className="mr-4">
                  {movie.release_date || movie.first_air_date}
                </span>
                <span>{movie.runtime || movie.episode_run_time?.[0]} min</span>
              </div>
              <div className="flex items-center mt-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="border-2 border-white rounded-full px-2 py-1 mr-2"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="mt-4 max-w-2xl">{movie.overview}</p>
              <div className="mt-4">
                <button className="bg-white text-black px-4 py-2 rounded mr-4">
                  Play Trailer
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CastAndCrew id={id as string} mediaType={mediaType} />
    </div>
  );
};

export default MoviePage;
