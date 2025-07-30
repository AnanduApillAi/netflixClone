'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-red-600">Netflix</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/home">
                <span className="hover:text-gray-300">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/movies">
                <span className="hover:text-gray-300">Movies</span>
              </Link>
            </li>
            <li>
              <Link href="/tvshows">
                <span className="hover:text-gray-300">TV Shows</span>
              </Link>
            </li>
            <li>
              <Link href="/mylist">
                <span className="hover:text-gray-300">My List</span>
              </Link>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white px-2 py-1 rounded-l"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-2 py-1 rounded-r"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
