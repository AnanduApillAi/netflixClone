'use client';

import { useState, useEffect } from 'react';

const GenreNav = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    // Fetch genres here and set them to the state
    // For now, we'll use placeholder data
    setGenres([
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
    ]);
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    onGenreChange(e.target.value);
  };

  return (
    <div className="my-4">
      <select
        className="bg-gray-800 text-white p-2 rounded"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreNav;
