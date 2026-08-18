"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navbar component for accessible navigation header.
 *
 * @param {{ searchSlot?: React.ReactNode }} props
 */
export default function Navbar({ searchSlot }) {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="app-container navbar-inner">
        <Link href="/" className="navbar-brand" aria-label="Cine-Stream Home">
          <span>🎬</span> Cine-Stream
        </Link>

        {searchSlot}

        <nav aria-label="Main Navigation">
          <ul className="navbar-nav">
            <li>
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Popular
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className={`nav-link ${pathname === "/favorites" ? "active" : ""}`}
                aria-current={pathname === "/favorites" ? "page" : undefined}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
