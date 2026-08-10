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
  title: "PENREC Music Group",
  description: "Music without boundaries. Discover Soreya, Midnight Avenue, Marco Verturi, The Ashfords, Vierklang, Sophie Beaulieu, Elias Rowan, Shelley Dante, Luca Moretti, Khadijah Brown, Harper Lane, Ethan Blake, FEVER5, Gabriel Laurent, UP4IT!, Fifth & Main, Callia, The Glamour Katz, Northbound and Nikos Andros.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body><PlayerProvider><a className="skip-link" href="#content">Skip to content</a><Header />{children}<Footer /><GlobalPlayer /></PlayerProvider></body></html>
  );
}
