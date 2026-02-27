import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-6 px-6" dir="rtl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <span>© RIDERS – קהילת שליחי האופניים בפתח תקווה</span>
        <Link href="/privacy" className="text-[var(--primary)] hover:underline">
          מדיניות פרטיות
        </Link>
      </div>
    </footer>
  );
}
