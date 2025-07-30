'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/home/Card';
import { searchMovies } from '@/lib/api';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const searchResults = await searchMovies(query);
        setResults(searchResults.results);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold text-white my-8 text-center">
        Search results for: {query}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {results.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
