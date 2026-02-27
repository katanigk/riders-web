"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/community", label: "קהילה" },
  { href: "/knowledge", label: "ידע מהשטח" },
  { href: "/gear", label: "הציוד שאנחנו סומכים עליו" },
  { href: "/training", label: "הכשרות מקצועיות" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="relative w-full min-h-[110px] sticky top-0 z-[100] bg-black border-b border-white/10 isolate pointer-events-auto overflow-visible" dir="rtl">
      <div className="h-full flex items-center justify-between gap-4 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="shrink-0 flex items-center" style={{ gap: "1.5rem" }}>
          <Link
            href="/join"
            className="inline-block py-3 text-white text-base font-medium bg-black/40 hover:bg-white/5 transition-colors whitespace-nowrap"
            style={{ borderRadius: "0.375rem", border: "1px solid rgba(255,255,255,0.35)", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          >
            הרשמה
          </Link>
          <Link
            href="#"
            className="inline-block px-4 py-2 text-[var(--primary)] text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap cursor-default"
            onClick={(e) => e.preventDefault()}
          >
            כניסה
          </Link>
        </div>

        <nav className="flex flex-1 items-center justify-center px-4 relative z-10 pointer-events-auto max-md:hidden">
          <ul className="flex items-center justify-center list-none p-0 m-0">
            {navLinks.map(({ href, label }, index) => (
              <li key={href} className="flex items-center">
                {index > 0 && (
                  <span
                    style={{ margin: '0 24px', color: 'rgba(255,255,255,0.4)', fontSize: '1.25rem' }}
                    aria-hidden
                  >
                    •
                  </span>
                )}
                <Link
                  href={href}
                  style={{ pointerEvents: 'auto' }}
                  className={`
                    inline-block cursor-pointer shrink-0
                    text-sm md:text-base font-medium tracking-wide
                    no-underline relative px-2 py-1 whitespace-nowrap
                    transition-colors duration-200
                    hover:text-[var(--primary)]
                    after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5
                    after:h-[2px] after:bg-[var(--primary)]
                    after:origin-right after:transition-transform after:duration-200
                    after:pointer-events-none
                    ${pathname === href || pathname.startsWith(href + "/") ? "text-[var(--primary)] after:scale-x-100" : "text-gray-300 after:scale-x-0 hover:after:scale-x-100"}
                  `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 flex items-center gap-4">
          <button
            type="button"
            aria-label="תפריט"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hidden max-md:block p-2 text-white hover:text-[var(--primary)] transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <Link href="/" className="flex items-center">
            <Image
              src="/riders.png"
              alt="RIDERS"
              width={360}
              height={120}
              className="h-12 md:h-20 w-auto"
            />
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <nav className="absolute top-full right-0 left-0 bg-black border-t border-white/10 py-4 px-4">
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            <li className="flex items-center px-4 pb-3 mb-3 border-b border-white/10" style={{ gap: "1.5rem" }}>
              <Link href="/join" onClick={() => setMobileOpen(false)} className="inline-block py-3 text-white text-base font-medium bg-black/40 hover:bg-white/5" style={{ borderRadius: "0.375rem", border: "1px solid rgba(255,255,255,0.35)", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                הרשמה
              </Link>
              <Link href="#" onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} className="inline-block px-4 py-2 text-[var(--primary)] text-sm font-medium cursor-default">
                כניסה
              </Link>
            </li>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors
                    ${pathname === href || pathname.startsWith(href + "/") ? "text-[var(--primary)]" : "text-gray-300 hover:text-[var(--primary)] hover:bg-white/5"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
