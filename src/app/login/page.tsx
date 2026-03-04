"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [socialLoading, setSocialLoading] = useState<"google" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [appleMsg, setAppleMsg] = useState(false);
  const [socialError, setSocialError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const e = params.get("e");
    if (e === "noaccount") setSocialError("לא נמצא חשבון. הצטרף דרך דף ההרשמה.");
    else if (e === "db") setSocialError("לא ניתן לאמת חשבון. וודא ש־Firestore פעיל ב־Firebase Console.");
  }, []);

  async function handleSocialSignIn() {
    setSocialLoading("google");
    setStatus("loading");
    setSocialError(null);
    setErrorMsg("");
    try {
      const { auth, db } = await import("@/lib/firebase");
      if (!auth) {
        setErrorMsg("Firebase לא מוגדר.");
        setStatus("error");
        setSocialLoading(null);
        return;
      }
      const { signInWithPopup, GoogleAuthProvider, signOut, deleteUser } = await import("firebase/auth");
      const { doc, getDoc } = await import("firebase/firestore");
      const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log("[LOGIN] Google sign-in ok, uid:", userCred.user.uid);

      if (!db) {
        await signOut(auth);
        setSocialError("שגיאה: מסד הנתונים לא זמין.");
        setStatus("error");
        setSocialLoading(null);
        return;
      }

      let snap;
      const getDocWithTimeout = async () => {
        const userRef = doc(db, "users", userCred.user.uid);
        const p = getDoc(userRef);
        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Firestore timeout")), 3000)
        );
        return Promise.race([p, timeout]);
      };
      try {
        snap = await getDocWithTimeout();
        console.log("[LOGIN] getDoc ok, exists:", snap.exists());
      } catch (firestoreErr) {
        console.log("[LOGIN] getDoc FAILED:", firestoreErr);
        try {
          await deleteUser(userCred.user);
        } catch { /* ignore */ }
        await signOut(auth);
        setSocialError("לא ניתן לאמת חשבון. וודא ש־Firestore פעיל ב־Firebase Console.");
        setStatus("error");
        setSocialLoading(null);
        if (typeof window !== "undefined") window.location.href = "/login?e=db";
        return;
      }

      if (!snap.exists()) {
        console.log("[LOGIN] No Firestore doc -> rejecting, deleteUser+signOut");
        try {
          await deleteUser(userCred.user);
          console.log("[LOGIN] deleteUser ok");
        } catch (delErr) {
          console.log("[LOGIN] deleteUser FAILED:", delErr);
        }
        await signOut(auth);
        setSocialError("לא נמצא חשבון. הצטרף דרך דף ההרשמה.");
        setStatus("error");
        setSocialLoading(null);
        if (typeof window !== "undefined") window.location.href = "/login?e=noaccount";
        return;
      }

      setStatus("success");
      setTimeout(() => { if (typeof window !== "undefined") window.location.replace("/"); }, 800);
    } catch (err: unknown) {
      setStatus("error");
      const code = (err as { code?: string })?.code ?? "";
      const msg = err instanceof Error ? err.message : String(err);
      const s = code || msg;
      if (s.includes("popup-closed") || s.includes("cancelled-popup")) setErrorMsg("ההתחברות בוטלה");
      else if (s.includes("auth/user-not-found")) setErrorMsg("לא נמצא חשבון. הירשם תחילה.");
      else if (s.includes("auth/")) setErrorMsg("שגיאת אימות: " + (msg || code));
      else setErrorMsg(msg || String(err) || "אירעה שגיאה. נסה שוב.");
      console.error("Social sign-in error:", err);
    } finally {
      setSocialLoading(null);
      setStatus("idle");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const { auth } = await import("@/lib/firebase");
      if (!auth) {
        setErrorMsg("Firebase לא מוגדר.");
        setStatus("error");
        return;
      }
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email, password);
      setStatus("success");
      setTimeout(() => { if (typeof window !== "undefined") window.location.replace("/"); }, 800);
    } catch (err: unknown) {
      setStatus("error");
      const code = (err as { code?: string })?.code ?? "";
      const msg = err instanceof Error ? err.message : String(err);
      const s = code || msg;
      if (s.includes("auth/user-not-found")) setErrorMsg("לא נמצא חשבון עם אימייל זה.");
      else if (s.includes("auth/wrong-password") || s.includes("auth/invalid-credential")) setErrorMsg("סיסמה שגויה.");
      else if (s.includes("auth/invalid-email")) setErrorMsg("כתובת אימייל לא תקינה.");
      else if (s.includes("auth/")) setErrorMsg("שגיאת אימות: " + (msg || code));
      else setErrorMsg(msg || String(err) || "אירעה שגיאה. נסה שוב.");
      console.error("Login error:", err);
    }
  }

  return (
    <main className="login-page min-h-screen w-full flex flex-col items-center justify-start bg-[var(--background)] px-6 pt-8 pb-10" dir="rtl">
      {socialLoading === "google" && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 text-lg" style={{ pointerEvents: "auto", color: "var(--primary)" }}>
          בודק חשבון...
        </div>
      )}
      <div className="w-full max-w-[360px] flex flex-col items-center">
        <Link
          href="/"
          className="mb-2"
          style={{ marginTop: "-32px" }}
        >
          <Image
            src="/riders.png"
            alt="RIDERS"
            width={280}
            height={110}
            className="w-[220px] md:w-[260px] h-auto object-contain"
          />
        </Link>
        <h1 className="text-2xl font-semibold text-white mb-6" style={{ marginTop: "-96px" }}>
          כניסה
        </h1>
        <div className="w-full mt-6">
        <form
          onSubmit={handleSubmit}
          className="w-full"
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              אימייל או כינוי
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=""
              className="w-full px-4 bg-[#0d1117] border border-[#30363d] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              style={{ padding: "10px 16px", fontSize: "15px", height: "48px", lineHeight: "1.5", boxSizing: "border-box", borderRadius: "8px", color: "#ffffff" }}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                סיסמה
              </label>
              <Link href="/forgot-password" className="text-sm text-[#58a6ff] hover:underline">
                שכחת סיסמה?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=""
              className="w-full px-4 bg-[#0d1117] border border-[#30363d] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
              style={{ padding: "10px 16px", fontSize: "15px", height: "48px", lineHeight: "1.5", boxSizing: "border-box", borderRadius: "8px", color: "#ffffff" }}
            />
          </div>
          {status === "error" && (
            <p className="text-red-400 text-sm" role="alert">
              {errorMsg}
            </p>
          )}
          {status === "success" && (
            <div className="text-[var(--primary)] text-sm" role="status">
              <p className="mb-2">נכנס בהצלחה!</p>
              <Link href="/" className="text-[#58a6ff] hover:underline font-medium">← מעבר לדף הבית</Link>
            </div>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#21262d] border border-[#30363d] text-white font-medium hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            style={{ height: "48px", padding: "10px 16px", fontSize: "15px", boxSizing: "border-box", borderRadius: "8px", boxShadow: "0 0 12px rgba(108, 255, 60, 0.35), 0 0 24px rgba(108, 255, 60, 0.15)", borderColor: "rgba(108, 255, 60, 0.4)", color: "#ffffff" }}
          >
            {status === "loading" ? "נכנס..." : "כניסה"}
          </button>
        </form>

        <div className="w-full flex items-center gap-3" style={{ marginTop: "32px", marginBottom: "32px" }}>
          <div className="flex-1 h-px bg-[#30363d]" />
          <span className="text-sm text-gray-500">או</span>
          <div className="flex-1 h-px bg-[#30363d]" />
        </div>

        <div className="w-full" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button
            type="button"
            onClick={handleSocialSignIn}
            disabled={!!socialLoading}
            className="w-full bg-[#21262d] border border-[#30363d] font-medium flex items-center justify-center flex-row-reverse hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ height: "48px", padding: "10px 16px", fontSize: "15px", boxSizing: "border-box", color: "#ffffff", borderRadius: "8px", gap: "24px" }}
          >
            {socialLoading === "google" ? "מתחבר..." : "המשך עם Google"}
            {socialLoading !== "google" && (
              <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => setAppleMsg(true)}
            className="w-full bg-[#21262d] border border-[#30363d] font-medium flex items-center justify-center flex-row-reverse hover:bg-[#30363d] transition-colors"
            style={{ height: "48px", padding: "10px 16px", fontSize: "15px", boxSizing: "border-box", color: "#ffffff", borderRadius: "8px", gap: "24px" }}
          >
            המשך עם Apple
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </button>
          {appleMsg && (
            <p className="text-sm text-gray-400 py-2 text-center">
              תקלה מול שרתי אפל. השתמש בכניסה עם Google או באימייל.
            </p>
          )}
          {socialError && (
            <div className="text-sm text-center space-y-1" style={{ color: "var(--primary)" }}>
              <p>{socialError}</p>
              <Link href="/join" className="block text-[var(--primary)] hover:underline font-medium">
                הצטרף עכשיו →
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm" style={{ marginTop: "40px" }}>
          עדיין אין חשבון?{" "}
          <Link href="/join" className="text-[#58a6ff] hover:underline">
            הצטרף
          </Link>
        </p>
        </div>
      </div>
    </main>
  );
}
