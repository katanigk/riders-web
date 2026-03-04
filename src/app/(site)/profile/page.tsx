"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const roleLabels: Record<string, string> = {
  member: "חבר קהילה",
  club: "ריידר",
};

export default function ProfilePage() {
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user && typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-8 pb-24 flex items-center justify-center" dir="rtl">
        <p className="text-gray-400">טוען...</p>
      </main>
    );
  }

  const initials = user.nickname?.trim()
    ? user.nickname.slice(0, 2).toUpperCase()
    : user.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <main className="min-h-screen bg-[var(--background)] pt-16 md:pt-24 pb-24" dir="rtl">
      <div className="max-w-2xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <div
          className="w-full max-w-lg rounded-2xl p-8 md:p-10 flex flex-col items-center"
          style={{
            border: "1px solid rgba(108, 255, 60, 0.25)",
            backgroundColor: "rgba(108, 255, 60, 0.03)",
            boxShadow: "0 0 0 1px rgba(108, 255, 60, 0.08)",
          }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            הפרופיל שלי
          </h1>

          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden shrink-0 mt-8"
            style={{ backgroundColor: "rgba(108, 255, 60, 0.2)", color: "var(--primary)", border: "2px solid var(--primary)" }}
          >
            {user.photoURL ? (
              <Image src={user.photoURL} alt="" width={96} height={96} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="w-full max-w-md mt-8 flex flex-col items-center gap-6">
            <div className="w-full bg-white/5 rounded-xl p-6 space-y-5 text-right">
            <div>
              <p className="text-gray-400 text-sm">כינוי</p>
              <p className="text-white text-lg">{user.nickname || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">אימייל</p>
              <p className="text-white text-lg">{user.email || "—"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">סטטוס</p>
              <p className="text-[var(--primary)] font-medium">{roleLabels[role] || roleLabels.member}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              if (auth) {
                await signOut(auth);
                if (typeof window !== "undefined") window.location.href = "/";
              }
            }}
            className="text-gray-400 hover:text-white px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            יציאה מהחשבון
          </button>
        </div>
        </div>
      </div>
    </main>
  );
}
