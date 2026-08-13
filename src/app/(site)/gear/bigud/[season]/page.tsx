import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GearDepartmentsNav from "@/components/GearDepartmentsNav";
import { getClothingSeason, getClothingSeasons } from "@/content/gear";

type Props = { params: Promise<{ season: string }> };

export async function generateStaticParams() {
  return getClothingSeasons().map((s) => ({ season: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { season } = await params;
  const item = getClothingSeason(season);
  if (!item) return { title: "ביגוד | RIDERS" };
  return {
    title: `${item.title} | הציוד שאנחנו סומכים עליו | RIDERS`,
    description: item.description,
  };
}

export default async function ClothingSeasonPage({ params }: Props) {
  const { season } = await params;
  const item = getClothingSeason(season);
  if (!item) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <GearDepartmentsNav activeSlug="bigud" />

        <h1 className="mt-10 text-center text-3xl font-medium text-white md:mt-12 md:text-4xl">
          {item.title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-gray-300 md:mt-8 md:text-lg md:leading-9">
          {item.description}
        </p>
      </div>
    </main>
  );
}
