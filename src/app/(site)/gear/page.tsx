import type { Metadata } from "next";
import GearDepartmentsNav from "@/components/GearDepartmentsNav";

export const metadata: Metadata = {
  title: "הציוד שאנחנו סומכים עליו | RIDERS",
  description: "המלצות ציוד לשליחי אופניים – מה שעובד בשטח",
};

export default function GearPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <GearDepartmentsNav />
      </div>
    </main>
  );
}
