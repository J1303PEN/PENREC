import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "audio.penrec.co.uk",
        pathname: "/verelles/**",
      },
    ],
  },
};

export default nextConfig;
