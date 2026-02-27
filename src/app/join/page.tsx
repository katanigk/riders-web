"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const benefits = [
  { title: "גישה לקהילה ולפורום", desc: "חיבור לשליחי אופניים נוספים בפתח תקווה." },
  { title: "ידע מהשטח והמלצות ציוד", desc: "טיפים וניסיון מעשי מהקהילה." },
  { title: "עדכונים על הכשרות וסדנאות", desc: "הזמנות להכשרות מקצועיות." },
  { title: "מערכת חירום קהילתית", desc: "גב אמיתי ברגעים חשובים." },
  { title: "הגשת מועמדות למועדון RIDERS", desc: "אפשרות להצטרף למועדון הליבה המקצועי." },
];

export default function JoinPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg("נא לאשר את תנאי השימוש ומדיניות הפרטיות");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const { auth, db } = await import("@/lib/firebase");
      if (!auth || !db) {
        setErrorMsg("Firebase לא מוגדר. הוסף את פרטי .env.local.");
        setStatus("error");
        return;
      }
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      const { doc, setDoc } = await import("firebase/firestore");
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        nickname,
        role: "member",
        createdAt: new Date(),
      });
      setStatus("success");
      setEmail("");
      setPassword("");
      setNickname("");
      setAgreeTerms(false);
      setTimeout(() => router.push("/"), 2000);
    } catch (err: unknown) {
      setStatus("error");
      const code = (err as { code?: string })?.code ?? "";
      const msg = err instanceof Error ? err.message : String(err);
      const s = code || msg;
      if (s.includes("email-already-in-use")) setErrorMsg("האימייל כבר רשום במערכת");
      else if (s.includes("weak-password")) setErrorMsg("הסיסמה חלשה מדי – לפחות 6 תווים");
      else if (s.includes("invalid-email")) setErrorMsg("כתובת אימייל לא תקינה");
      else if (s.includes("permission-denied") || s.includes("PERMISSION_DENIED")) setErrorMsg("אין הרשאה לשמור נתונים. בדוק את כללי Firestore ב־Firebase Console.");
      else if (s.includes("auth/operation-not-allowed")) setErrorMsg("אימות באימייל/סיסמה לא מופעל. הפעל ב־Firebase Console → Authentication → Sign-in method.");
      else if (s.includes("auth/")) setErrorMsg("שגיאת אימות: " + (msg || code));
      else setErrorMsg(msg || String(err) || "אירעה שגיאה. נסה שוב.");
      console.error("Signup error:", err);
    }
  }

  return (
    <main className="min-h-screen w-full grid grid-cols-2 min-w-0" dir="rtl">
      {/* ימין: טופס לבן | שמאל: פרסומי שחור – מחלוקה אנכית */}
      <section className="min-h-screen w-full min-w-0 bg-[#f6f8fa] flex flex-col justify-center px-6 md:px-12 py-12" dir="rtl">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            הרשמה ל־<span dir="ltr">RIDERS</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-semibold text-gray-900 mb-1">כינוי</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                placeholder="איך לקרוא לך בקהילה"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              />
              <p className="text-xs text-gray-500 mt-1">אותיות, מספרים ומקף בלבד</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">אימייל</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-1">סיסמה</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="לפחות 6 תווים"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              />
              <p className="text-xs text-gray-500 mt-1">לפחות 6 תווים</p>
            </div>
            <div className="flex items-start gap-3">
              <input
                id="agreeTerms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-600 leading-tight">
                אני מסכים/ה ל
                <Link href="/privacy" className="text-[var(--primary)] hover:underline">תנאי השימוש</Link>
                {" "}ול
                <Link href="/privacy" className="text-[var(--primary)] hover:underline">מדיניות הפרטיות</Link>
              </label>
            </div>
            <div className="min-h-[2rem]">
              {status === "error" && (
                <p className="text-red-600 text-sm font-medium rounded-md bg-red-50 px-3 py-2 border border-red-200" role="alert">
                  {errorMsg}
                </p>
              )}
              {status === "success" && (
                <p className="text-[var(--primary)] font-medium text-sm rounded-md bg-green-50 px-3 py-2 border border-green-200" role="status">
                  החשבון נוצר בהצלחה! מעביר לדף הבית...
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2.5 px-4 rounded-md bg-[#238636] text-white font-semibold hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                "יוצר חשבון..."
              ) : (
                <>
                  צור חשבון
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="rtl:rotate-180">
                    <path d="M6 12 L10 8 L6 4" />
                  </svg>
                </>
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            בקבלת חשבון אתה מסכים ל
            <Link href="/privacy" className="text-[var(--primary)] hover:underline">תנאי השירות</Link>
            . לעוד מידע על מדיניות הפרטיות של RIDERS, עיין ב
            <Link href="/privacy" className="text-[var(--primary)] hover:underline">מדיניות הפרטיות</Link>
            .
          </p>
        </div>
      </section>
      {/* שמאל: פרסומי שחור */}
      <section
        className="relative min-h-screen w-full min-w-0 flex flex-col justify-start items-center text-center px-6 md:px-12 py-12 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0a0a0f 0%, #0f0a1a 40%, #150a25 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
          <span className="absolute top-[10%] right-[15%] w-1 h-1 rounded-full bg-white" />
          <span className="absolute top-[25%] left-[20%] w-1 h-1 rounded-full bg-white/80" />
          <span className="absolute top-[40%] right-[30%] w-1.5 h-1.5 rounded-full bg-white" />
          <span className="absolute top-[55%] left-[10%] w-1 h-1 rounded-full bg-white/70" />
          <span className="absolute top-[70%] right-[25%] w-1 h-1 rounded-full bg-white/80" />
          <span className="absolute top-[80%] left-[35%] w-1 h-1 rounded-full bg-white/60" />
        </div>
        <div className="relative z-10 max-w-md w-full flex flex-col items-center mt-[10vh] md:mt-[12vh]" style={{ gap: "0.25rem" }}>
          <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ margin: 0, lineHeight: 1.2 }}>
            הצטרף לקהילת <span dir="ltr">RIDERS</span>
          </h1>
          <div className="flex flex-col items-center" style={{ marginTop: "-8px" }}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpen(!open)}
              onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
              className="flex flex-col items-center cursor-pointer select-none [&>*:first-child]:mb-0"
            >
              <p className="text-white text-base md:text-lg m-0 pb-0 leading-tight">גלו את היתרונות הייחודיים בהצטרפות לקהילה</p>
              <span
                className="inline-flex shrink-0 transition-transform duration-200 text-white"
                style={{ transform: open ? "rotate(180deg)" : "none" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9 L12 15 L18 9" />
                </svg>
              </span>
            </div>
            {open && (
              <ul className="mt-3 space-y-3 w-full text-right text-base md:text-lg" dir="rtl">
                {benefits.map(({ title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <span className="text-[var(--primary)] shrink-0 mt-0.5">✓</span>
                    <div>
                      <p className="text-white m-0">{title}</p>
                      <p className="text-gray-400 m-0 mt-0.5 text-base md:text-lg">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
