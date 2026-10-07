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
      {"source": "/books/tobias-tangle-winter-that-would-not-leave/winter-that-would-not-leave.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-winter-that-would-not-leave/winter-that-would-not-leave-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-map-of-impossible-doors/map-of-impossible-doors.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-map-of-impossible-doors/map-of-impossible-doors-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-clockwork-rooks/clockwork-rooks.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-clockwork-rooks/clockwork-rooks-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-last-road-home/last-road-home.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-last-road-home/last-road-home-premium-v1.pdf", "permanent": true},
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
