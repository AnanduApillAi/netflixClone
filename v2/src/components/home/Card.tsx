'use client';

import Image from 'next/image';

const Card = ({ movie }) => {
  return (
    <div className="w-48 h-72 relative rounded-md overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Card;
