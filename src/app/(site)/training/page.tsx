import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הכשרות מקצועיות | RIDERS",
  description: "סדנאות והכשרות לשליחי אופניים – ידע מקצועי ומעשי",
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 border-b border-white/20 pb-4">
          הכשרות מקצועיות
        </h1>
        <p className="text-gray-400 text-lg">
          סדנאות, תוכן דיגיטלי והכשרות – יפורסמו כאן. הצטרפו ל-RIDERS לעדכונים.
        </p>
      </div>
    </main>
  );
}
