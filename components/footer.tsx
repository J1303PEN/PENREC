import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__top">
        <Logo />
        <p>Discover. Experience. Remember.</p>
      </div>
      <div className="shell footer__bottom">
        <nav aria-label="Footer navigation">
          <Link href="/artists">Artists</Link><Link href="/releases">Music</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
        </nav>
        <span>© {new Date().getFullYear()} PENREC Music Group</span>
      </div>
    </footer>
  );
}
