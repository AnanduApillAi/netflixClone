import HomeBanner from '@/components/home/HomeBanner';
import MovieScrolls from '@/components/home/MovieScrolls';

export default function HomePage() {
  return (
    <div>
      <HomeBanner />
      <MovieScrolls title="Trending Now" />
      <MovieScrolls title="Popular on Netflix" />
      <MovieScrolls title="Top Rated" />
    </div>
  );
}
