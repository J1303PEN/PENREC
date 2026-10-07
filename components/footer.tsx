import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="footer new-penrec-footer">
      <div className="shell footer__bottom">
        <Link href="/" className="footer-logo" aria-label="PENREC Music & Publishing home"><Logo compact /></Link>
        <nav aria-label="Footer utility navigation">
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/cookies">Cookies</Link>
        </nav>
        <span>© {new Date().getFullYear()} PENREC</span>
      </div>
    </footer>
  );
}
