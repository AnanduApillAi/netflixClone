import Image from "next/image";
import {Link} from "next-view-transitions";
import { tmdb, poster, backdrop } from "@/lib/api";
import HeroNav from "@/components/landing/HeroNav";
import { TMDBTvShow } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(tmdb.details("tv", id), { next: { revalidate: 300 } }).catch(() => null);
  const data: TMDBTvShow | null = res?.ok ? await res.json() : null;
  console.log(data)
  const title = data?.name ? `${data.name} | Netflix Clone` : "TV Show | Netflix Clone";
  return { title };
}

export default async function TvshowDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(tmdb.details("tv", id, "videos,credits"), {
    next: { revalidate: 300 },
  }).catch(() => null);
  const data: TMDBTvShow | null = res?.ok ? await res.json() : null;
  
  if (!data) {
    return (
      <main className="min-h-screen bg-white">
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

  // TV show specific data parsing
  const episodeRuntime = Array.isArray(data.episode_run_time) && data.episode_run_time.length > 0 ? data.episode_run_time[0] : undefined;
  const hours = episodeRuntime ? Math.floor(episodeRuntime / 60) : undefined;
  const minutes = episodeRuntime && typeof hours === "number" ? episodeRuntime % 60 : undefined;

  const trailer = data.videos?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube");
  const mainCast = data.credits?.cast?.slice(0, 6) || [];
  const creators = data.created_by || [];
  // Removed unused producers variable
  const firstAirYear = data.first_air_date ? new Date(data.first_air_date).getFullYear() : undefined;
  const voteAverage = typeof data.vote_average === "number" ? Number(data.vote_average).toFixed(1) : undefined;

  return (
    <main className="min-h-screen bg-white">
      <div className="">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8 pt-4">
          <HeroNav />
        </div>

        {/* Hero */}
        <section className="relative mt-2 bg-gradient-to-b from-gray-900 via-gray-900 to-[#111827]">
          {bg ? (
            <div className="absolute inset-0 opacity-40">
              <Image src={bg} alt={data.name} fill className="object-cover" />
            </div>
          ) : null}
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-8 items-end lg:items-stretch">
            {posterUrl ? (
              <div className="w-full lg:w-auto flex-shrink-0 flex justify-center sm:justify-start">
                <div className="relative w-[260px] max-w-sm aspect-[2/3] rounded-xl overflow-hidden ">
                  <Image src={posterUrl} alt={data.name} fill className="object-cover" />
                </div>
              </div>
            ) : null}
            <div className="text-white flex flex-col justify-center md:justify-end w-full">
              <p className="text-sm text-gray-300 tracking-wider">
                {firstAirYear && <span>{firstAirYear}</span>}
                {data.number_of_seasons && <span> • {data.number_of_seasons} Season{data.number_of_seasons > 1 ? 's' : ''}</span>}
                {typeof hours === "number" && typeof minutes === "number" && (
                  <span> • {hours}h {minutes}m</span>
                )}
                {voteAverage && (
                  <span className="ml-1 inline-flex items-center gap-1 text-amber-300"><span aria-hidden>★</span> {voteAverage}</span>
                )}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold mt-2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]">{data.name}</h1>
                              {Array.isArray(data.genres) && data.genres.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {data.genres.map((g) => (
                      <span key={g.id} className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}
              {trailer && (
                <div className="mt-8">
                  <Link href={`/watch/tv/${id}`} className="inline-flex items-center justify-center bg-[#8B5CF6] hover:bg-[#8a5cf6c4]  text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-200">
                    <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                    Play Trailer
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Light content surface with rounded top */}
        <section className="relative z-20 -mt-6">
          <div className="">
            <div className="bg-[#F9FAFB] text-[#1F2937] rounded-t-3xl p-6  sm:p-8 ">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[1200px] mx-auto px-0 lg:px-8">
                {/* Left: Overview + Cast + Seasons */}
                <div className="lg:col-span-2">
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-[#8B5CF6] pl-4">Overview</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">{data.overview || "No overview available."}</p>
                  </section>
                  
                 
                  
                  <div className="border-b border-gray-200 my-8" />
                  {mainCast.length > 0 && (
                    <section>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-[#8B5CF6] pl-4">Cast</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {mainCast.map((actor) => (
                          <div key={actor.id} className="text-center group">
                            <div className="relative w-32 h-32 mx-auto">
                              <div className="w-32 h-32">
                                {actor.profile_path ? (
                                  <Image src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} fill className="object-cover rounded-2xl" />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 rounded-2xl" />
                                )}
                              </div>
                            </div>
                            <h3 className="mt-4 text-gray-900 font-semibold">{actor.name}</h3>
                            <p className="text-gray-500 text-sm">{actor.character}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Right: Details + Networks + Production */}
                <div className="lg:col-span-1 space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-amber-400 pl-4">Details</h2>
                    <div className="space-y-4 text-gray-800 bg-gray-100 p-6 rounded-lg">
                      {creators.length > 0 && (
                        <div>
                          <div className="flex items-center">
                            <svg className="text-gray-500 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h16v2H4zm0 5h10v2H4zm0 5h16v2H4z"/></svg>
                            <div>
                              <p className="font-semibold text-gray-600">Creators</p>
                              <p className="font-medium">{creators.map((c) => c.name).join(", ")}</p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 my-2" />
                        </div>
                      )}
                      {data.status && (
                        <div>
                          <div className="flex items-center">
                            <svg className="text-gray-500 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                            <div>
                              <p className="font-semibold text-gray-600">Status</p>
                              <p className="font-medium">{data.status}</p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 my-2" />
                        </div>
                      )}
                      {data.first_air_date && (
                        <div>
                          <div className="flex items-center">
                            <svg className="text-gray-500 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v1h18V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm14 7H3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z"/></svg>
                            <div>
                              <p className="font-semibold text-gray-600">First Air Date</p>
                              <p className="font-medium">{new Date(data.first_air_date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 my-2" />
                        </div>
                      )}
                      {data.last_air_date && (
                        <div>
                          <div className="flex items-center">
                            <svg className="text-gray-500 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v1h18V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm14 7H3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z"/></svg>
                            <div>
                              <p className="font-semibold text-gray-600">Last Air Date</p>
                              <p className="font-medium">{new Date(data.last_air_date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 my-2" />
                        </div>
                      )}
                        {data.number_of_episodes && (
                          <div>
                            <div className="flex items-center">
                              <svg className="text-gray-500 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
                              <div>
                                <p className="font-semibold text-gray-600">Total Episodes</p>
                                <p className="font-medium">{data.number_of_episodes}</p>
                              </div>
                            </div>
                            <div className="border-t border-gray-200 my-2" />
                          </div>
                        )}
                      {data.seasons && (
                        <div>
                        <div className="flex items-center">
                          <svg className="text-gray-500 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
                          <div>
                            <p className="font-semibold text-gray-600">Total Seasons</p>
                            <p className="font-medium">{data.number_of_seasons}</p>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 my-2" />
                      </div>
                      )}
                      {typeof data.vote_count === "number" && (
                        <div className="flex items-center">
                          <svg className="text-gray-500 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 4.01 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 17.99 4 20 6.01 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                          <div>
                            <p className="font-semibold text-gray-600">Votes</p>
                            <p className="font-bold text-amber-400 text-lg">{data.vote_count.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  

                  {Array.isArray(data.production_companies) && data.production_companies.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-amber-400 pl-4">Production</h2>
                      <div className="space-y-3">
                        {data.production_companies.slice(0, 6).map((company) => (
                          <div key={company.id} className="flex items-center p-3 bg-gray-100 rounded-lg ">
                            <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center mr-4">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="#8B5CF6" aria-hidden="true"><path d="M4 6h16v12H4zM2 8h2v8H2zm18 0h2v8h-2z"/></svg>
                            </div>
                            <p className="font-semibold text-gray-800">{company.name}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


