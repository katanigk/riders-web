"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navLinks = [
  { href: "/community", label: "קהילה" },
  { href: "/knowledge", label: "ידע מהשטח" },
  { href: "/gear", label: "הציוד שאנחנו סומכים עליו" },
  { href: "/training", label: "הכשרות מקצועיות" },
];

const roleLabels: Record<string, string> = {
  member: "חבר קהילה",
  club: "ריידר",
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, role, loading } = useAuth();
  const isGuest = !user;

  // Mobile layout: לוגו + כפתורי הרשמה/כניסה או אווטאר
  if (isMobile) {
    return (
      <header className="relative w-full sticky top-0 z-[100] bg-black border-b border-white/10" dir="rtl">
        <div className="flex flex-col gap-1 px-4 pt-2 pb-1 max-w-7xl mx-auto">
          {/* Row 1: logo + auth */}
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/riders.png"
                alt="RIDERS"
                width={280}
                height={90}
                className="h-9 w-auto"
              />
            </Link>

            {!loading && (
              isGuest ? (
                <div className="flex items-center">
                  <Link
                    href="/login"
                    className="inline-block px-3 py-1.5 text-[var(--primary)] text-xs font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
                  >
                    כניסה
                  </Link>
                  <Link
                    href="/join"
                    className="inline-block py-2 text-white text-xs font-medium bg-black/40 hover:bg-white/5 transition-colors whitespace-nowrap"
                    style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.35)", paddingLeft: "0.4rem", paddingRight: "0.4rem", marginInlineStart: "0.5rem" }}
                  >
                    הרשמה
                  </Link>
                </div>
              ) : (
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-[var(--primary)] bg-[rgba(108,255,60,0.15)]"
                  aria-label="פרופיל"
                >
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt="" width={36} height={36} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--primary)] font-bold text-xs">
                      {(user.nickname?.trim() || user.email || "?").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </Link>
              )
            )}
          </div>

          {/* Row 2: nav links – שורה אחת במובייל */}
          <nav className="border-t border-white/10 pt-1.5 pb-1 text-[0.82rem] font-medium text-gray-300">
            <div className="w-full flex justify-center">
              <div className="flex items-center justify-between w-full max-w-[95%] px-1">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      inline-block pb-0.5
                      ${pathname === href || pathname.startsWith(href + "/")
                        ? "text-[var(--primary)] border-b border-[var(--primary)]"
                        : "text-gray-300"}
                    `}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="relative w-full min-h-[64px] lg:min-h-[110px] sticky top-0 z-[100] bg-black border-b border-white/10 isolate pointer-events-auto overflow-visible" dir="rtl">
      <div className="h-full flex items-center justify-between gap-2 md:gap-4 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Auth - desktop only */}
        <div className="shrink-0 flex items-center" style={{ gap: "1.5rem", marginInlineStart: "2.5rem" }}>
          {!loading &&
            (isGuest ? (
              <>
                <Link
                  href="/join"
                  className="inline-block py-3 text-white text-base font-medium bg-black/40 hover:bg-white/5 transition-colors whitespace-nowrap"
                  style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.35)", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
                >
                  הרשמה
                </Link>
                <Link
                  href="/login"
                  className="inline-block px-4 py-2 text-[var(--primary)] text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                  כניסה
                </Link>
              </>
            ) : (
              <div className="flex items-center" style={{ gap: "1rem" }}>
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-[var(--primary)] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "rgba(108, 255, 60, 0.15)" }}
                  aria-label="פרופיל"
                >
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt="" width={40} height={40} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--primary)] font-bold text-sm">
                      {(user.nickname?.trim() || user.email || "?").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    if (auth) {
                      await signOut(auth);
                      if (typeof window !== "undefined") window.location.href = "/";
                    }
                  }}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-1.5 bg-white/5 hover:bg-white/10"
                  style={{ borderRadius: "8px" }}
                >
                  יציאה
                </button>
              </div>
            ))}
        </div>

        {/* Nav links - desktop only */}
        <nav className="flex flex-1 items-center justify-center px-4 relative z-10 pointer-events-auto">
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

        <div className="shrink-0 flex items-center gap-2 md:gap-4" style={{ marginInlineStart: "1.5rem" }}>
          <Link href="/" className="flex items-center">
            <Image
              src="/riders.png"
              alt="RIDERS"
              width={360}
              height={120}
              className="h-10 md:h-20 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Desktop only: no mobile drawer */}
    </header>
  );
}
