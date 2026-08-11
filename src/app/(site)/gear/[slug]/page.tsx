import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGearDepartment, getGearDepartments } from "@/content/gear";

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
