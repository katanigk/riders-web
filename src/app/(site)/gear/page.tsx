import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הציוד שאנחנו סומכים עליו | RIDERS",
  description: "המלצות ציוד לשליחי אופניים – מה שעובד בשטח",
};

export default function GearPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 border-b border-white/20 pb-4">
          הציוד שאנחנו סומכים עליו
        </h1>
        <p className="text-gray-400 text-lg">
          המלצות, ביקורות ויתרונות למועדון – יגיעו בהמשך. הצטרפו כדי לא לפספס.
        </p>
      </div>
    </main>
  );
}
