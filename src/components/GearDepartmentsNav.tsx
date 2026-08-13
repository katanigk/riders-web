import Link from "next/link";
import { getGearDepartments } from "@/content/gear";

export default function GearDepartmentsNav({
  activeSlug,
}: {
  activeSlug?: string;
}) {
  const departments = getGearDepartments();

  return (
    <nav
      aria-label="מחלקות ציוד"
      className="border-y border-white/20"
      style={{ paddingBlock: "1.25rem" }}
    >
      <ul
        className="m-0 flex list-none flex-wrap items-center justify-center p-0"
        style={{ gap: "0" }}
      >
        {departments.map((department, index) => {
          const isActive = department.slug === activeSlug;
          return (
            <li key={department.slug} className="flex items-center">
              {index > 0 && (
                <span
                  aria-hidden
                  style={{
                    marginInline: "clamp(0.85rem, 2.2vw, 1.75rem)",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.85rem",
                    lineHeight: 1,
                  }}
                >
                  •
                </span>
              )}
              <Link
                href={`/gear/${department.slug}`}
                className="whitespace-nowrap font-medium transition-colors hover:text-[var(--primary)]"
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                  lineHeight: 1.2,
                  color: isActive ? "var(--primary)" : "#ffffff",
                }}
              >
                {department.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
