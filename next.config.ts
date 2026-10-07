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
      {"source": "/books/tobias-tangle-winter-that-would-not-leave/winter-that-would-not-leave.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-winter-that-would-not-leave/back-cover-v2/winter-that-would-not-leave-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-winter-that-would-not-leave/winter-that-would-not-leave-back-cover-v2.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-winter-that-would-not-leave/back-cover-v2/winter-that-would-not-leave-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-map-of-impossible-doors/map-of-impossible-doors.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-map-of-impossible-doors/back-cover-v2/map-of-impossible-doors-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-map-of-impossible-doors/map-of-impossible-doors-back-cover-v2.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-map-of-impossible-doors/back-cover-v2/map-of-impossible-doors-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-clockwork-rooks/clockwork-rooks.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-clockwork-rooks/back-cover-v2/clockwork-rooks-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-clockwork-rooks/clockwork-rooks-back-cover-v2.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-clockwork-rooks/back-cover-v2/clockwork-rooks-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-last-road-home/last-road-home.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-last-road-home/back-cover-v2/last-road-home-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-last-road-home/last-road-home-back-cover-v2.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-last-road-home/back-cover-v2/last-road-home-premium-v1.pdf", "permanent": true},
      {"source": "/books/tobias-tangle/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-door-beneath-the-river/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-door-beneath-the-river/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-theatre-of-borrowed-shadows/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-theatre-of-borrowed-shadows/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-lighthouse-in-the-orchard/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-lighthouse-in-the-orchard/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-midnight-market/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-midnight-market/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-library-beneath-the-lake/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-library-beneath-the-lake/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-winter-that-would-not-leave/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-winter-that-would-not-leave/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-map-of-impossible-doors/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-map-of-impossible-doors/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-clockwork-rooks/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-clockwork-rooks/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
      {"source": "/books/tobias-tangle-last-road-home/premium-a5-cmyk-unified-v3.pdf", "destination": "https://audio.penrec.co.uk/books/tobias-tangle-last-road-home/unified-v3/premium-a5-cmyk.pdf", "permanent": true},
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
