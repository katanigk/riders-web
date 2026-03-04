"use client";

import Image from "next/image";
import Link from "next/link";

export default function ArticleLayoutHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="flex h-24 md:h-32 items-center justify-center px-4">
        <Link href="/knowledge" className="flex items-center" aria-label="חזרה לידע מהשטח">
          <Image
            src="/riders.png"
            alt="RIDERS"
            width={400}
            height={140}
            className="h-[4.5rem] md:h-28 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
