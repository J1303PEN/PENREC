"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { AuthStatus } from "./auth-status";

const links = [
  ["Artists", "/artists"],
  ["Music", "/releases"],
  ["News", "/news"],
  ["Store", "/store"],
  ["About", "/about"],
  ["Studio", "/studio"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="PENREC home">
          <Logo />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}<span aria-hidden="true" />
        </button>
        <nav id="primary-nav" className={open ? "nav nav--open" : "nav"} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link href="/search" aria-label="Search">⌕</Link>
          <AuthStatus />
        </nav>
      </div>
    </header>
  );
}
