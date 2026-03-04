"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const roleLabels: Record<string, string> = {
  member: "חבר קהילה",
  club: "ריידר",
};

export default function ProfileModal() {
  const { user, role, loading, profileModalOpen, closeProfileModal } = useAuth();

  if (!profileModalOpen) return null;
  if (loading || !user) return null;

  const initials = user.nickname?.trim()
    ? user.nickname.slice(0, 2).toUpperCase()
    : user.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      dir="rtl"
      onClick={(e) => e.target === e.currentTarget && closeProfileModal()}
      role="dialog"
      aria-modal="true"
      aria-label="פרופיל"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-8 md:p-10 flex flex-col items-center"
        style={{
          border: "1px solid rgba(108, 255, 60, 0.25)",
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          boxShadow: "0 0 0 1px rgba(108, 255, 60, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeProfileModal}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="סגור"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl md:text-4xl font-bold text-white">הפרופיל שלי</h2>

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
          <div className="w-full bg-white/5 rounded-xl p-6 space-y-5 text-right" >
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
              closeProfileModal();
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
  );
}
