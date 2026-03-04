import type { Metadata } from "next";
import Link from "next/link";
import { getKnowledgeArticles } from "@/content/knowledge";

export const metadata: Metadata = {
  title: "ידע מהשטח | RIDERS",
  description:
    "טיפים, סיפורים וניסיון משטח שליחות האופניים – מהקהילה של RIDERS בפתח תקווה",
  openGraph: {
    title: "ידע מהשטח | RIDERS",
    description:
      "טיפים, סיפורים וניסיון משטח שליחות האופניים – מהקהילה של RIDERS בפתח תקווה",
  },
};

export default function KnowledgePage() {
  const articles = getKnowledgeArticles();

  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="text-2xl md:text-4xl font-bold text-[#EEEEEE] pb-3 mb-4 border-b border-white/20">
          ידע מהשטח
        </h1>
        <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-10">
          טיפים, סיפורים וניסיון מעשי משליחי אופניים – מהקהילה, בשביל הקהילה.
        </p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/knowledge/${article.slug}`}
              className="block group"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-2">
                {article.description}
              </p>
              <span className="inline-block mt-2 text-[var(--primary)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                קרא עוד ←
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
