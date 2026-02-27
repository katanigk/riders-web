import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

// TODO: replace with real data source (CMS, MD files, DB)
const PLACEHOLDER_ARTICLES: Record<string, { title: string; description: string }> = {};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = PLACEHOLDER_ARTICLES[slug];
  if (!article) return { title: "מאמר | RIDERS" };
  return {
    title: `${article.title} | ידע מהשטח | RIDERS`,
    description: article.description,
    openGraph: {
      title: `${article.title} | RIDERS`,
      description: article.description,
    },
  };
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = PLACEHOLDER_ARTICLES[slug];
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          href="/knowledge"
          className="text-[var(--primary)] hover:underline text-sm mb-8 inline-block"
        >
          ← חזרה לידע מהשטח
        </Link>
        <article>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
          <p className="text-gray-400">{article.description}</p>
        </article>
      </div>
    </main>
  );
}
