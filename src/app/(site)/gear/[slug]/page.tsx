import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GearDepartmentsNav from "@/components/GearDepartmentsNav";
import {
  clothingSeasons,
  getGearDepartment,
  getGearDepartments,
} from "@/content/gear";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getGearDepartments().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const department = getGearDepartment(slug);
  if (!department) return { title: "מחלקה | RIDERS" };
  return {
    title: `${department.title} | הציוד שאנחנו סומכים עליו | RIDERS`,
    description: department.description,
  };
}

export default async function GearDepartmentPage({ params }: Props) {
  const { slug } = await params;
  const department = getGearDepartment(slug);
  if (!department) notFound();

  if (slug === "bigud") {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <GearDepartmentsNav activeSlug="bigud" />

          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-8 text-gray-300 md:mt-10 md:text-lg md:leading-9">
            ביגוד לשליחי אופניים שעובדים בשטח כל השנה – מהחום של הקיץ ועד הגשם
            והבוץ של החורף. בחרנו פריטים שנוחים לרכיבה ארוכה, מחזיקים מעמד, ולא
            מפריעים לעבודה.
          </p>

          <section
            aria-label="עונות ביגוד"
            className="flex justify-center"
            style={{ gap: "4cm", paddingTop: "2.5cm" }}
          >
            {clothingSeasons.map((season) => (
              <Link
                key={season.slug}
                href={`/gear/bigud/${season.slug}`}
                className="group flex w-[46%] max-w-[280px] flex-col items-center md:max-w-[340px]"
              >
                <h2 className="mb-4 text-center text-xl font-medium text-white transition-colors group-hover:text-[var(--primary)] md:mb-5 md:text-2xl">
                  {season.title}
                </h2>
                <div className="relative w-full overflow-hidden border border-white/15 bg-black">
                  <div className="relative aspect-[9/16] w-full">
                    <Image
                      src={season.image}
                      alt={season.title}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority
                    />
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="border-y border-white/20 py-8 md:py-10">
          <Link
            href="/gear"
            className="mb-6 inline-flex text-sm font-bold text-[var(--primary)] hover:underline"
          >
            ← חזרה לציוד
          </Link>
          <h1 className="text-3xl font-bold leading-tight text-[#EEEEEE] md:text-4xl">
            {department.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
            {department.description}
          </p>
          <p className="mt-8 text-gray-400">המוצרים במחלקה הזו יגיעו בהמשך.</p>
        </section>
      </div>
    </main>
  );
}
