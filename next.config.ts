import type { NextConfig } from "next";
import imageRedirects from "./data/image-redirects.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/books/tobias-tangle/the-clock-that-lost-tuesday.pdf",
        destination: "https://audio.penrec.co.uk/books/tobias-tangle/the-clock-that-lost-tuesday-v2.pdf",
        permanent: true,
      },
      ...imageRedirects,
    ];
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
