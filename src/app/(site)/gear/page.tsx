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
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="מחלקות ציוד"
          className="border-y border-white/20"
          style={{ paddingBlock: "2.5rem" }}
        >
          <ul
            className="m-0 flex list-none flex-wrap items-center justify-center p-0"
            style={{ gap: "0" }}
          >
            {departments.map((department, index) => (
              <li key={department.slug} className="flex items-center">
                {index > 0 && (
                  <span
                    aria-hidden
                    style={{
                      marginInline: "clamp(1.25rem, 3.5vw, 3rem)",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "1.1rem",
                      lineHeight: 1,
                    }}
                  >
                    •
                  </span>
                )}
                <Link
                  href={`/gear/${department.slug}`}
                  className="whitespace-nowrap font-medium text-white transition-colors hover:text-[var(--primary)]"
                  style={{
                    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                    lineHeight: 1.2,
                  }}
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
