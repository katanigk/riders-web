"use client";

import Link from "next/link";

export default function ArticleLayoutHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="flex items-center justify-center px-4 py-0 leading-none">
        <Link href="/knowledge" className="flex items-center leading-none" aria-label="חזרה לידע מהשטח">
          <img
            src="/riders.png"
            alt="RIDERS"
            className="block"
            style={{ height: "100px", width: "auto" }}
          />
        </Link>
      </div>
    </header>
  );
}
