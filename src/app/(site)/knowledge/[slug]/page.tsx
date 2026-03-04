import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKnowledgeArticle, getKnowledgeArticles } from "@/content/knowledge";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getKnowledgeArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
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

function ArticleBody({ body }: { body: string }) {
  const paragraphs = body.trim().split(/\n\n+/).filter(Boolean);
  return (
    <div className="space-y-5 text-justify text-justify-last-right">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed font-medium md:font-normal px-4 md:px-0">
          {p}
        </p>
      ))}
    </div>
  );
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline text-sm mb-8 font-medium"
        >
          ← חזרה לידע מהשטח
        </Link>

        <article className="mx-3 md:mx-0">
          <div className="w-full max-w-[92%] mx-auto md:max-w-none">
            <header className="border-b border-white/20 pb-6 mb-8 px-4 md:px-0">
              <h1 className="text-2xl md:text-4xl font-bold text-[#EEEEEE] leading-tight">
                {article.title}
              </h1>
              <p className="text-gray-400 mt-3 text-base sm:text-lg md:text-xl leading-relaxed font-medium md:font-normal">
                {article.description}
              </p>
            </header>
            <ArticleBody body={article.body} />
          </div>
        </article>
      </div>
    </main>
  );
}
