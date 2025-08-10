"use client";
import {Link} from "next-view-transitions";
import Image from "next/image";
import { poster } from "@/lib/api";
import { MovieCardProps } from "@/lib/types";

export default function MovieCard({ item, href, type }: MovieCardProps) {
  const img = poster(item?.poster_path, "w300");
  const title = item && "title" in item ? item.title : item?.name || "";
  const overview = item?.overview || "No description available.";
  const date = item && "release_date" in item ? item.release_date : item && "first_air_date" in item ? item.first_air_date : undefined;
  const year = date ? new Date(date).getFullYear() : null;
  const rating = typeof item?.vote_average === "number" ? Number(item.vote_average).toFixed(1) : null;

  return (
    <>
      <style>
        {`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .group:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 0.75rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        `}
      </style>
      <div className="group flip-card aspect-[2/3] w-full">
        <div className="flip-card-inner rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
          {/* Front Side */}
          <div className="flip-card-front overflow-hidden relative bg-[#F8F9FA]">
            {img ? (
              <Image
                alt={title}
                className="w-full h-full object-cover"
                src={img}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center">
                <div className="text-[#9CA3AF] text-xs">No Image</div>
              </div>
            )}
            {/* Top meta badges */}
            {(year || rating) && (
              <div className="absolute inset-x-0 top-0 p-2 flex items-start justify-between">
                <div className="min-w-0">
                  {year && (
                    <span className="inline-block px-2 py-1 text-[11px] font-medium rounded-full bg-black/70 text-white shadow">
                      {year}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  {rating && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-full bg-black/70 text-white shadow">
                      <span aria-hidden>★</span> {rating}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Back Side */}
          <div className="flip-card-back bg-gray-800 text-white p-4 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-300 leading-relaxed line-clamp-7">{overview}</p>
              
            </div>
            <Link
              className="mt-4 self-start bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 text-sm inline-flex items-center"
              href={href}
            >
              View {type === "tv" ? "TV Show" : "Movie"}
              <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" width="24" height="24" viewBox="0 0 24 24"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
