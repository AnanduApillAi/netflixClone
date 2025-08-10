import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "assets.nflxext.com" },
    ],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
