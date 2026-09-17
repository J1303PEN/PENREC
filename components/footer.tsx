import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer new-penrec-footer">
      <div className="shell footer__bottom">
        <span className="footer-wordmark"><strong>PENREC</strong><small>MUSIC &amp; PUBLISHING</small></span>
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
