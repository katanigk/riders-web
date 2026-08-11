import type { Metadata } from "next";
import Link from "next/link";
import { getGearDepartments } from "@/content/gear";

export const metadata: Metadata = {
  title: "הציוד שאנחנו סומכים עליו | RIDERS",
  description: "המלצות ציוד לשליחי אופניים – מה שעובד בשטח",
};

export default function GearPage() {
  const departments = getGearDepartments();

  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="border-y border-white/20 py-8 md:py-10">
          <h1 className="text-3xl font-bold leading-tight text-[#EEEEEE] md:text-4xl">
            הציוד שאנחנו סומכים עליו
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
            המלצות, ביקורות ויתרונות למועדון – יגיעו בהמשך. הצטרפו כדי לא לפספס.
          </p>

          <nav
            aria-label="מחלקות ציוד"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            {departments.map((department) => (
              <Link
                key={department.slug}
                href={`/gear/${department.slug}`}
                className="group flex min-h-14 flex-1 items-center justify-between border border-white/15 bg-white/[0.04] px-5 py-4 transition-colors hover:border-[var(--primary)]/60 hover:bg-white/[0.07] sm:min-w-[10rem]"
              >
                <span className="text-lg font-bold text-white transition-colors group-hover:text-[var(--primary)] md:text-xl">
                  {department.title}
                </span>
                <span
                  aria-hidden
                  className="text-[var(--primary)] transition-transform group-hover:-translate-x-1"
                >
                  ←
                </span>
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
