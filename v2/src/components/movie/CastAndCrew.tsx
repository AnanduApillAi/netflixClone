'use client';

import { useState, useEffect } from 'react';
import CastMemberCard from './CastMemberCard';
import { getMovieCast, getTvShowCast } from '@/lib/api';

const CastAndCrew = ({ id, mediaType }) => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [activeTab, setActiveTab] = useState('cast');

  useEffect(() => {
    const fetchCastAndCrew = async () => {
      let results;
      if (mediaType === 'movie') {
        results = await getMovieCast(id);
      } else if (mediaType === 'tv') {
        results = await getTvShowCast(id);
      }
      setCast(results.cast);
      setCrew(results.crew);
    };

    if (id && mediaType) {
      fetchCastAndCrew();
    }
  }, [id, mediaType]);

  return (
    <div className="container mx-auto px-4 my-8">
      <div className="flex border-b border-gray-700">
        <button
          className={`px-4 py-2 ${
            activeTab === 'cast' ? 'border-b-2 border-white' : ''
          }`}
          onClick={() => setActiveTab('cast')}
        >
          Cast
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'crew' ? 'border-b-2 border-white' : ''
          }`}
          onClick={() => setActiveTab('crew')}
        >
          Crew
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {activeTab === 'cast'
          ? cast.map((member) => (
              <CastMemberCard key={member.id} member={member} />
            ))
          : crew.map((member) => (
              <CastMemberCard key={member.id} member={member} />
            ))}
      </div>
    </div>
  );
};

export default CastAndCrew;
