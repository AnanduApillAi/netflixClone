import Image from "next/image";
import Link from "next/link";
import { tmdb, poster, backdrop } from "@/lib/api";
import HeroNav from "@/components/landing/HeroNav";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(tmdb.details("tv", id), { next: { revalidate: 300 } }).catch(() => null as any);
  const data = res?.ok ? await res.json() : null;
  const title = data?.name ? `${data.name} | Netflix Clone` : "TV Show | Netflix Clone";
  return { title };
}

export default async function TvDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(tmdb.details("tv", id, "videos,credits"), {
    next: { revalidate: 300 },
  }).catch(() => null as any);
  const data = res?.ok ? await res.json() : null;
  
  if (!data) {
    return (
      <main className="min-h-screen text-[#0B0F19]  bg-white">
        <div className="w-[min(1280px,100%-16px)] bg-white mx-auto">
          <div className="mx-auto max-w-[1200px] min-h-screen px-5 lg:px-8">
            <HeroNav />
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-[#9CA3AF] text-lg mb-2">TV Show not found</div>
                <div className="text-[#6B7280] text-sm">The requested TV show could not be found</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const bg = backdrop(data.backdrop_path);
  const posterUrl = poster(data.poster_path, "w500");

  const trailer = data.videos?.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
  const mainCast = data.credits?.cast?.slice(0, 6) || [];
  const creators = data.created_by || [];
  const producers = data.credits?.crew?.filter((c: any) => c.job === "Producer").slice(0, 3) || [];

  return (
    <main className="min-h-screen text-[#0B0F19]  bg-white">
      {/* Outer framed canvas */}
      <div className="w-[min(1280px,100%-16px)] bg-white mx-auto overflow-hidden">
        <div className="mx-auto max-w-[1200px]">
          <div className="px-5 lg:px-8">
            <HeroNav />
          </div>
          
          {/* Hero Section with Backdrop */}
          <div className="relative">
            {bg && (
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-[20px] mx-5 lg:mx-8 mt-6">
                <Image src={bg} alt={data.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="px-5 lg:px-8 pb-12">
            <div className="flex flex-col lg:flex-row gap-8 -mt-20 relative z-10">
              {/* Poster */}
              {posterUrl && (
                <div className="flex-shrink-0 lg:w-[280px]">
                  <div className="relative w-[200px] lg:w-[280px] aspect-[2/3] rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(16,24,40,0.15)] bg-[#F8F9FA] border border-[#E5E7EB]">
                    <Image src={posterUrl} alt={data.name} fill className="object-cover" />
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="flex-1 space-y-6">
                {/* Title & Basic Info */}
                <div>
                  <h1 className="text-[32px] lg:text-[40px] font-extrabold leading-tight mb-3">
                    {data.name}
                  </h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-[#6B7280] text-sm">
                    {data.first_air_date && (
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-[#6B7280] rounded-full"></span>
                        {new Date(data.first_air_date).getFullYear()}
                      </span>
                    )}
                    {typeof data.number_of_seasons === "number" && (
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-[#6B7280] rounded-full"></span>
                        {data.number_of_seasons} Season{data.number_of_seasons !== 1 ? 's' : ''}
                      </span>
                    )}
                    {typeof data.number_of_episodes === "number" && (
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-[#6B7280] rounded-full"></span>
                        {data.number_of_episodes} Episodes
                      </span>
                    )}
                    {data.vote_average && (
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-[#6B7280] rounded-full"></span>
                        ⭐ {Number(data.vote_average).toFixed(1)}
                      </span>
                    )}
                  </div>

                  {/* Genres */}
                  {Array.isArray(data.genres) && data.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {data.genres.map((g: any) => (
                        <span key={g.id} className="px-3 py-1 rounded-full bg-[#F4F5F7] text-[#111827] text-xs font-medium">
                          {g.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Overview</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    {data.overview || "No overview available."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {trailer && (
                    <Link
                      href={`/watch/tv/${id}`}
                      className="px-6 py-3 bg-[#6C5CE7] text-white font-medium rounded-full hover:bg-[#5B4BD6] transition-colors shadow-[0_4px_16px_rgba(108,92,231,0.24)]"
                    >
                      ▶ Play Trailer
                    </Link>
                  )}
                  <button className="px-6 py-3 bg-[#F4F5F7] text-[#111827] font-medium rounded-full hover:bg-[#E5E7EB] transition-colors">
                    + Add to List
                  </button>
                </div>

                {/* Creators & Producers */}
                {(creators.length > 0 || producers.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {creators.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-[#111827] mb-2">Created by</h4>
                        <p className="text-[#6B7280] text-sm">
                          {creators.map((c: any) => c.name).join(", ")}
                        </p>
                      </div>
                    )}
                    {producers.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-[#111827] mb-2">Producers</h4>
                        <p className="text-[#6B7280] text-sm">
                          {producers.map((p: any) => p.name).join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cast Section */}
            {mainCast.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[24px] font-bold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {mainCast.map((actor: any) => (
                    <div key={actor.id} className="text-center">
                      <div className="relative aspect-[3/4] rounded-[12px] overflow-hidden bg-[#F8F9FA] border border-[#E5E7EB] mb-3">
                        {actor.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center">
                            <div className="text-[#9CA3AF] text-xs">No Photo</div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-[#111827] text-sm line-clamp-2 mb-1">
                          {actor.name}
                        </div>
                        <div className="text-[#6B7280] text-xs line-clamp-1">
                          {actor.character}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Show Details */}
              <div className="bg-[#F8F9FA] rounded-[16px] p-6">
                <h3 className="font-semibold text-[#111827] mb-4">Show Details</h3>
                <div className="space-y-3 text-sm">
                  {data.first_air_date && (
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">First Air Date</span>
                      <span className="text-[#111827] font-medium">
                        {new Date(data.first_air_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {data.last_air_date && (
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Last Air Date</span>
                      <span className="text-[#111827] font-medium">
                        {new Date(data.last_air_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {data.status && (
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Status</span>
                      <span className="text-[#111827] font-medium">{data.status}</span>
                    </div>
                  )}
                  {data.vote_count && (
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Votes</span>
                      <span className="text-[#111827] font-medium">
                        {data.vote_count.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Production */}
              {data.production_companies?.length > 0 && (
                <div className="bg-[#F8F9FA] rounded-[16px] p-6">
                  <h3 className="font-semibold text-[#111827] mb-4">Production</h3>
                  <div className="space-y-2">
                    {data.production_companies.slice(0, 4).map((company: any) => (
                      <div key={company.id} className="text-sm text-[#6B7280]">
                        {company.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


