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
          className="border-y border-white/20 py-12 md:py-16"
        >
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-y-4 p-0">
            {departments.map((department, index) => (
              <li key={department.slug} className="flex items-center">
                {index > 0 && (
                  <span
                    aria-hidden
                    className="mx-8 text-2xl text-white/40 md:mx-14 md:text-3xl lg:mx-20"
                  >
                    •
                  </span>
                )}
                <Link
                  href={`/gear/${department.slug}`}
                  className="whitespace-nowrap text-4xl font-medium text-white transition-colors hover:text-[var(--primary)] md:text-5xl lg:text-6xl"
                >
                  {department.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
