import type { NextConfig } from "next";
import imageRedirects from "./data/image-redirects.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return imageRedirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "audio.penrec.co.uk",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
