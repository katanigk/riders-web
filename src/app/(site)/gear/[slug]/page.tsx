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

          <section
            aria-label="עונות ביגוד"
            className="flex justify-center"
            style={{ gap: "4cm", paddingTop: "calc(2rem + 2cm)" }}
          >
            {clothingSeasons.map((season) => (
              <article
                key={season.slug}
                className="group relative w-[42%] max-w-[220px] overflow-hidden border border-white/15 bg-black md:max-w-[260px]"
              >
                <div className="relative aspect-[9/16] w-full">
                  <Image
                    src={season.image}
                    alt={season.title}
                    fill
                    sizes="260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <h2 className="absolute bottom-4 right-4 text-xl font-medium text-white md:text-2xl">
                    {season.title}
                  </h2>
                </div>
              </article>
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
