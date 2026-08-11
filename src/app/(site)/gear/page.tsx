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
        <nav
          aria-label="מחלקות ציוד"
          className="flex flex-col items-stretch justify-center gap-4 border-y border-white/20 py-10 sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:py-14"
        >
          {departments.map((department, index) => (
            <div key={department.slug} className="flex items-center sm:contents">
              {index > 0 && (
                <span
                  aria-hidden
                  className="hidden px-6 text-2xl font-light text-white/35 sm:inline md:px-10 md:text-3xl"
                >
                  |
                </span>
              )}
              <Link
                href={`/gear/${department.slug}`}
                className="text-center text-3xl font-bold text-[#EEEEEE] transition-colors hover:text-[var(--primary)] md:text-4xl lg:text-5xl"
              >
                {department.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </main>
  );
}
