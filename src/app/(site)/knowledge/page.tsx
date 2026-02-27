import type { Metadata } from "next";

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
  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 border-b border-white/20 pb-4">
          ידע מהשטח
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          טיפים, סיפורים וניסיון מעשי משליחי אופניים – מהקהילה, בשביל הקהילה. המאמרים יופיעו כאן בהדרגה.
        </p>
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <p className="text-gray-400">כרגע אין מאמרים. בקרוב נוסיף תוכן.</p>
        </div>
      </div>
    </main>
  );
}
