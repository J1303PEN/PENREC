import type { Metadata } from "next";
import "./globals.css";
import "./gallery-2-1a.css";
import "./gallery-2-1b.css";
import "./hero-2-1d.css";
import "./player-2-2a.css";
import "./player-2-2b.css";
import "./catalogue-2-3.css";
import "./studio-2-5a.css";
import "./accounts-3-1.css";
import "./catalogue-expansion.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GlobalPlayer } from "@/components/global-player";
import { PlayerProvider } from "@/components/player-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://penrec.co.uk"),
  title: { default: "PENREC Music Group", template: "%s | PENREC Music Group" },
  description: "PENREC Music Group — independent music, artists and releases from Darren Penman's record label and creative studio.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://penrec.co.uk",
    siteName: "PENREC Music Group",
    title: "PENREC Music Group",
    description: "Independent music, artists and releases from PENREC Music Group.",
  },
  twitter: { card: "summary_large_image", title: "PENREC Music Group", description: "Independent music, artists and releases from PENREC Music Group." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organisation = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PENREC Music Group",
    alternateName: "PENREC Records",
    url: "https://penrec.co.uk",
  };
  return (
    <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organisation)}}/><PlayerProvider><a className="skip-link" href="#content">Skip to content</a><Header />{children}<Footer /><GlobalPlayer /></PlayerProvider></body></html>
  );
}
