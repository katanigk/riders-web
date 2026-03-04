"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const EMAIL_DEBOUNCE_MS = 600;
const basicEmailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const benefits = [
  {
    title: "גישה לקהילה ולפורום",
    desc: "פורום שבו ניתן לשתף חוויות, לקבל תשובות על שאלות מקצועיות\nולהכיר את העובדים בשטח — במקום לעבוד לבד מול הלחץ והאתגרים.",
  },
  {
    title: "ידע מהשטח והמלצות ציוד",
    desc: "משליחים שכבר טעו ועברו — המלצות על ציוד שעובד בתנאי השטח\nשל פתח תקווה, טיפים שמונעים בזבוז זמן וכסף על רכישות לא נכונות.",
  },
  {
    title: "עדכונים על הכשרות וסדנאות",
    desc: "הזדמנות לשדרג יכולות מקצועיות — הכשרות וסדנאות ייחודיות\nשמעניקות כלים מעשיים.",
  },
  {
    title: "מערכת חירום קהילתית",
    desc: "כשמשהו קורה בשטח — תקלה, תאונה או אירוע חירום —\nיש מי שיגיע, יתמוך ויעזור. לא נשארים לבד ברגעים הכי קשים.",
  },
  {
    title: "הגשת מועמדות למועדון RIDERS",
    desc: "הדרך להמשיך קדימה — הפרטים נפתחים רק לנרשמים.",
  },
];

function normalizeNicknameRaw(n: string): string {
  return n.trim().toLowerCase();
}

export default function JoinPage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [country, setCountry] = useState("פתח תקווה");
  const [emailPrefs, setEmailPrefs] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [socialLoading, setSocialLoading] = useState<"google" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [appleMsg, setAppleMsg] = useState(false);
  const [socialError, setSocialError] = useState<string | null>(null);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);
  const emailCheckTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emailRef = useRef("");

  const isMobile = useIsMobile();

  const [nicknameAvailability, setNicknameAvailability] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");
  const [nicknameAvailabilityMsg, setNicknameAvailabilityMsg] = useState<string>("");

  async function checkEmailRegistered(emailToCheck: string) {
    const trimmed = emailToCheck.trim().toLowerCase();
    if (!trimmed || !basicEmailRe.test(trimmed)) {
      setEmailAlreadyInUse(false);
      return;
    }
    setEmailChecking(true);
    try {
      const { auth } = await import("@/lib/firebase");
      if (!auth) {
        setEmailAlreadyInUse(false);
        return;
      }
      const { fetchSignInMethodsForEmail } = await import("firebase/auth");
      const methods = await fetchSignInMethodsForEmail(auth, trimmed);
      if (emailRef.current.trim().toLowerCase() === trimmed) {
        setEmailAlreadyInUse(methods.length > 0);
      }
    } catch {
      if (emailRef.current.trim().toLowerCase() === trimmed) {
        setEmailAlreadyInUse(false);
      }
    } finally {
      setEmailChecking(false);
    }
  }

  function scheduleEmailCheck(value: string) {
    if (emailCheckTimeoutRef.current) {
      clearTimeout(emailCheckTimeoutRef.current);
      emailCheckTimeoutRef.current = null;
    }
    const trimmed = value.trim();
    if (!trimmed || !basicEmailRe.test(trimmed)) {
      setEmailAlreadyInUse(false);
      return;
    }
    emailCheckTimeoutRef.current = setTimeout(() => {
      emailCheckTimeoutRef.current = null;
      checkEmailRegistered(value);
    }, EMAIL_DEBOUNCE_MS);
  }

  async function checkNicknameAvailability(name: string) {
    const trimmed = name.trim();
    if (!trimmed) {
      setNicknameAvailability("idle");
      setNicknameAvailabilityMsg("");
      return;
    }
    setNicknameAvailability("checking");
    setNicknameAvailabilityMsg("בודק זמינות כינוי...");
    try {
      const { db } = await import("@/lib/firebase");
      if (!db) {
        setNicknameAvailability("error");
        setNicknameAvailabilityMsg("לא ניתן לבדוק כרגע. נסה שוב מאוחר יותר.");
        return;
      }
      const { doc, getDoc } = await import("firebase/firestore");
      const normalized = normalizeNicknameRaw(trimmed);
      const nickRef = doc(db, "nicknames", normalized);
      const snap = await getDoc(nickRef);
      if (snap.exists()) {
        setNicknameAvailability("taken");
        setNicknameAvailabilityMsg("הכינוי כבר בשימוש. נסה כינוי אחר.");
      } else {
        setNicknameAvailability("available");
        setNicknameAvailabilityMsg("הכינוי פנוי לשימוש.");
      }
    } catch (err) {
      console.error("nickname availability error:", err);
      setNicknameAvailability("error");
      setNicknameAvailabilityMsg("לא ניתן לבדוק את זמינות הכינוי כרגע.");
    }
  }

  async function handleSocialSignIn() {
    if (!agreeTerms) {
      setSocialError("נא לאשר את תנאי השימוש ומדיניות הפרטיות");
      return;
    }
    setSocialLoading("google");
    setSocialError(null);
    setErrorMsg("");
    try {
      const { auth, db } = await import("@/lib/firebase");
      if (!auth || !db) {
        setErrorMsg("Firebase לא מוגדר. הוסף את פרטי .env.local.");
        setStatus("error");
        setSocialLoading(null);
        return;
      }
      const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
      const { doc, setDoc, getDoc, setDoc: setNickDoc, serverTimestamp } = await import("firebase/firestore");

      const userCred = await signInWithPopup(auth, new GoogleAuthProvider());

      const userRef = doc(db, "users", userCred.user.uid);
      const existing = await getDoc(userRef);
      if (!existing.exists()) {
        const rawNickname =
          userCred.user.displayName || userCred.user.email?.split("@")[0] || "";
        const finalNickname = rawNickname || "";
        const normalized = normalizeNicknameRaw(finalNickname);
        await setDoc(
          userRef,
          {
            email: userCred.user.email || "",
            nickname: finalNickname,
            normalizedNickname: normalized,
            country: country,
            emailPrefs: emailPrefs,
            role: "member" as const, // חבר קהילה; club = חבר מועדון (קידום ידני)
            createdAt: new Date(),
          },
          { merge: true }
        );
        await setNickDoc(doc(db, "nicknames", normalized), {
          uid: userCred.user.uid,
          createdAt: serverTimestamp(),
        });
      }
      setStatus("success");
      setTimeout(() => {
        if (typeof window !== "undefined") window.location.replace("/");
      }, 800);
    } catch (err: unknown) {
      setStatus("error");
      const code = (err as { code?: string })?.code ?? "";
      const msg = err instanceof Error ? err.message : String(err);
      const s = code || msg;
      if (s.includes("popup-closed") || s.includes("cancelled-popup")) setErrorMsg("ההתחברות בוטלה");
      else if (s.includes("auth/operation-not-allowed")) setErrorMsg("התחברות עם Google לא מופעלת. הפעל ב־Firebase Console.");
      else if (s.includes("auth/")) setErrorMsg("שגיאת אימות: " + (msg || code));
      else setErrorMsg(msg || String(err) || "אירעה שגיאה. נסה שוב.");
      console.error("Social sign-in error:", err);
    } finally {
      setSocialLoading(null);
    }
  }

  function validatePassword(p: string): { ok: boolean; msg?: string } {
    if (p.length < 8) return { ok: false, msg: "הסיסמה חייבת לכלול לפחות 8 תווים." };
    const hasDigit = /\d/.test(p);
    const hasLower = /[a-z]/.test(p);
    if (!hasDigit || !hasLower) return { ok: false, msg: "הסיסמה חייבת לכלול אות קטנה ומספר." };
    return { ok: true };
  }

  function validateNickname(n: string): { ok: boolean; msg?: string } {
    if (!n.trim()) return { ok: false, msg: "נא להזין כינוי." };
    if (n.startsWith("-") || n.endsWith("-")) return { ok: false, msg: "הכינוי לא יכול להתחיל או להסתיים במקף." };
    if ((n.match(/-/g) || []).length > 1) return { ok: false, msg: "הכינוי יכול להכיל מקף אחד בלבד." };
    if (!/^[a-zA-Z0-9\u0590-\u05FF\-]+$/.test(n)) return { ok: false, msg: "הכינוי יכול להכיל רק אותיות, מספרים ומקף." };
    return { ok: true };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg("נא לאשר את תנאי השימוש ומדיניות הפרטיות");
      setStatus("error");
      return;
    }
    const pwdCheck = validatePassword(password);
    if (!pwdCheck.ok) {
      setErrorMsg(pwdCheck.msg ?? "סיסמה לא תקינה");
      setStatus("error");
      return;
    }
    const nickCheck = validateNickname(nickname);
    if (!nickCheck.ok) {
      setErrorMsg(nickCheck.msg ?? "כינוי לא תקין");
      setStatus("error");
      return;
    }
    if (nicknameAvailability === "taken") {
      setErrorMsg("הכינוי כבר בשימוש. בחר כינוי אחר.");
      setStatus("error");
      return;
    }
    if (emailAlreadyInUse) {
      setErrorMsg("האימייל שהזנת כבר משויך לחשבון קיים.");
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
      const { doc, setDoc, setDoc: setNickDoc, serverTimestamp } = await import("firebase/firestore");

      const timeoutMs = 25_000;
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeoutMs)
      );

      const userCred = await Promise.race([
        createUserWithEmailAndPassword(auth, email, password),
        timeoutPromise,
      ]);
      try {
        const normalized = normalizeNicknameRaw(nickname);
        await Promise.race([
          setDoc(doc(db, "users", userCred.user.uid), {
            email,
            nickname,
            normalizedNickname: normalized,
            country,
            emailPrefs,
            role: "member" as const,
            createdAt: new Date(),
          }),
          timeoutPromise,
        ]);
        await setNickDoc(doc(db, "nicknames", normalized), {
          uid: userCred.user.uid,
          createdAt: serverTimestamp(),
        });
      } catch (firestoreErr) {
        console.error("Firestore save failed:", firestoreErr);
      }
      setStatus("success");
      setEmail("");
      setPassword("");
      setNickname("");
      setAgreeTerms(false);
      setTimeout(() => {
        if (typeof window !== "undefined") window.location.replace("/");
      }, 800);
    } catch (err: unknown) {
      setStatus("error");
      setEmailAlreadyInUse(false);
      const code = (err as { code?: string })?.code ?? "";
      const msg = err instanceof Error ? err.message : String(err);
      const fullStr = [code, msg, JSON.stringify(err)].filter(Boolean).join(" ").toLowerCase();
      const isEmailAlreadyInUse =
        fullStr.includes("email-already-in-use") || fullStr.includes("email already in use");
      if (isEmailAlreadyInUse) {
        setEmailAlreadyInUse(true);
        setErrorMsg("האימייל שהזנת כבר משויך לחשבון קיים.");
      } else if (fullStr.includes("weak-password")) setErrorMsg("הסיסמה חלשה מדי – לפחות 8 תווים כולל אות קטנה ומספר.");
      else if (fullStr.includes("invalid-email")) setErrorMsg("כתובת אימייל לא תקינה");
      else if (fullStr.includes("permission-denied") || fullStr.includes("permission_denied")) setErrorMsg("אין הרשאה לשמור ל-Firestore. בדוק Rules ב-Console → Firestore → Security ושמור (Publish).");
      else if (fullStr.includes("auth/operation-not-allowed")) setErrorMsg("אימות באימייל/סיסמה לא מופעל. הפעל ב־Firebase Console → Authentication → Sign-in method.");
      else if (fullStr.includes("timeout")) setErrorMsg("הבקשה לקחה זמן רב. בדוק את החיבור לאינטרנט ונסה שוב.");
      else if (fullStr.includes("auth/")) setErrorMsg("שגיאת אימות: " + (msg || code));
      else setErrorMsg("שגיאה: " + (code || msg || String(err)) + ". פתח קונסול (F12) לפרטים.");
      console.error("Signup error:", err);
    }
  }

  return (
    <main
      className={`w-full min-w-0 ${
        isMobile ? "flex flex-col-reverse" : "min-h-screen grid grid-cols-2"
      }`}
      dir="rtl"
    >
      {/* ימין / למטה במובייל: טופס לבן – GitHub style */}
      <section
        className={`w-full min-w-0 flex flex-col items-center px-6 md:px-12 py-10 [color:#24292f] ${
          isMobile ? "" : "min-h-screen"
        }`}
        dir="rtl"
        style={{ backgroundColor: "#ffffff" }}
      >
        <p className="text-sm text-[#57606a] mb-6 w-full text-start" style={{ transform: "translateX(-24px)" }}>
          כבר יש חשבון?{" "}
          <Link href="/login" className="text-[#0969da] hover:underline">
            היכנס →
          </Link>
        </p>
        <div className="w-full max-w-[360px] md:max-w-[490px] mx-auto flex flex-col items-center" onClick={() => { setAppleMsg(false); setSocialError(null); }}>
          <h2 className="text-3xl font-bold text-[#24292f] mb-8 text-start w-full">
            הצטרפות ל <span dir="ltr">RIDERS</span>
          </h2>
          <div className="w-full mb-5">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleSocialSignIn(); }}
              disabled={!!socialLoading}
              className="w-full px-4 border border-[#d0d7de] text-[#24292f] text-lg font-bold flex items-center justify-center gap-5 flex-row-reverse disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ marginBottom: "8px", borderRadius: "8px", paddingTop: "6px", paddingBottom: "6px", backgroundColor: "#f6f8fa", fontWeight: 700 }}
            >
              {socialLoading === "google" ? "מתחבר..." : "המשך עם Google"}
              {socialLoading !== "google" && <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0" style={{ marginInlineEnd: "8px" }}><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setAppleMsg(true); }}
              className="w-full px-4 border border-[#d0d7de] text-[#24292f] text-lg font-bold flex items-center justify-center gap-5 flex-row-reverse"
              style={{ borderRadius: "8px", paddingTop: "6px", paddingBottom: "6px", backgroundColor: "#f6f8fa", fontWeight: 700 }}
            >
              המשך עם Apple
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-gray-900" style={{ marginInlineEnd: "8px" }}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            </button>
          </div>
          {appleMsg && (
            <p className="w-full text-sm text-[#57606a] py-2 px-3 rounded-md bg-[#fff5f5] border border-red-200 mb-2 text-center">
              תקלה מול שרתי אפל. אנא השתמש בהצטרפות עם Google או באימייל.
            </p>
          )}
          {socialError && (
            <p className="w-full text-sm text-[#57606a] py-2 px-3 rounded-md bg-[#fff5f5] border border-red-200 mb-2 text-center">
              {socialError}
            </p>
          )}
          <div className="w-full flex items-center gap-3" style={{ marginTop: "14px", marginBottom: "20px" }}>
            <div className="flex-1 h-px bg-[#d0d7de]" />
            <span className="text-xs text-[#57606a]" style={{ paddingInline: "12px" }}>או</span>
            <div className="flex-1 h-px bg-[#d0d7de]" />
          </div>
          <form onSubmit={handleSubmit} className="w-full [&_input::placeholder]:text-[11.85px]">
            <div style={{ marginBottom: "22px" }}>
              <label htmlFor="email" className="block text-sm text-[#24292f] mb-1.5" style={{ fontWeight: 700 }}>אימייל<span style={{ fontSize: "0.65em", verticalAlign: "super" }}>*</span></label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  emailRef.current = value;
                  setEmail(value);
                  setEmailAlreadyInUse(false);
                  scheduleEmailCheck(value);
                }}
                onBlur={() => {
                  if (emailCheckTimeoutRef.current) {
                    clearTimeout(emailCheckTimeoutRef.current);
                    emailCheckTimeoutRef.current = null;
                  }
                  if (email.trim() && basicEmailRe.test(email.trim())) {
                    checkEmailRegistered(email);
                  }
                }}
                required
                placeholder=""
                className={`w-full rounded-md bg-[#ffffff] text-[#24292f] placeholder-[#6e7681] placeholder:text-xs focus:outline-none focus:ring-2 ${emailAlreadyInUse ? "border-2 border-red-500 focus:ring-red-500 focus:border-red-500" : "border border-[#d0d7de] focus:ring-[#0969da] focus:border-[#0969da]"}`}
                style={{ padding: "10px 16px", fontSize: "1.125rem", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
              />
              {emailChecking && !emailAlreadyInUse && (
                <p className="mt-1.5 text-[#57606a] text-sm">בודק אימייל...</p>
              )}
              {emailAlreadyInUse && (
                <p
                  className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm font-medium"
                  style={{ color: "#d1242f" }}
                  role="alert"
                >
                  <span className="inline-flex shrink-0" aria-hidden>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#d1242f">
                      <path d="M12 2L2 22h20L12 2zm0 4v8h2V6h-2zm0 10v2h2v-2h-2z" />
                    </svg>
                  </span>
                  <span>האימייל שהזנת כבר משויך לחשבון קיים.</span>
                  <span className="inline basis-full sm:basis-auto">
                    <Link href="/login" className="text-[#0969da] hover:underline underline">היכנס</Link>
                    {" או "}
                    <Link href="/forgot-password" className="text-[#0969da] hover:underline underline">איפוס סיסמה</Link>
                  </span>
                </p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block text-sm text-[#24292f] mb-1.5" style={{ fontWeight: 700 }}>סיסמה<span style={{ fontSize: "0.65em", verticalAlign: "super" }}>*</span></label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder=""
                className="w-full rounded-md border border-[#d0d7de] bg-[#ffffff] text-[#24292f] placeholder-[#6e7681] placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#0969da] focus:border-[#0969da]"
                style={{ padding: "10px 16px", fontSize: "1.125rem", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
              />
              <p className="text-[#57606a] mt-1.5 leading-relaxed" style={{ fontSize: "11.9px" }}>
                הסיסמה חייבת לכלול לפחות 8 תווים ובהם אות קטנה ומספר.
              </p>
            </div>
            <div className="mb-5">
              <label htmlFor="nickname" className="block text-sm text-[#24292f] mb-1.5" style={{ fontWeight: 700 }}>
                כינוי<span style={{ fontSize: "0.65em", verticalAlign: "super" }}>*</span>
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setNicknameAvailability("idle");
                  setNicknameAvailabilityMsg("");
                }}
                onBlur={(e) => checkNicknameAvailability(e.target.value)}
                required
                placeholder="Username"
                className="w-full rounded-md border border-[#d0d7de] bg-[#ffffff] text-[#24292f] placeholder-[#6e7681] placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#0969da] focus:border-[#0969da]"
                style={{ padding: "10px 16px", fontSize: "1.125rem", borderRadius: "8px", width: "100%", boxSizing: "border-box" }}
              />
              <div className="mt-1.5 flex flex-col gap-0.5">
                <p className="text-[#57606a] leading-relaxed" style={{ fontSize: "11.9px" }}>
                  הכינוי יכול להכיל אותיות, מספרים ומקף יחיד, ולא יכול להתחיל או להסתיים במקף.
                </p>
                {nicknameAvailability !== "idle" && nicknameAvailabilityMsg && (
                  <p
                    className={
                      nicknameAvailability === "available"
                        ? "text-green-600 text-xs"
                        : nicknameAvailability === "taken"
                        ? "text-red-600 text-xs"
                        : "text-[#57606a] text-xs"
                    }
                  >
                    {nicknameAvailability === "available" && "✓ "}
                    {nicknameAvailabilityMsg}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="country" className="block text-sm font-semibold text-[#24292f] mb-1.5">אזור פעילות<span style={{ fontSize: "0.65em", verticalAlign: "super" }}>*</span></label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-md border border-[#d0d7de] bg-[#ffffff] text-[#24292f] focus:outline-none focus:ring-2 focus:ring-[#0969da] focus:border-[#0969da]"
                style={{
                  padding: "10px 16px",
                  fontSize: "1.125rem",
                  borderRadius: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath stroke='%2357606a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none' d='M2 2l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left 16px center"
                }}
              >
                <option value="פתח תקווה">פתח תקווה</option>
              </select>
              <p className="text-[#57606a] mt-1.5 leading-relaxed" style={{ fontSize: "11.9px" }}>
                מסיבות תאימות, נדרש לאסוף מידע על אזור הפעילות לשליחת עדכונים והודעות.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#24292f] mb-1">דיוור והסכמות</p>
              <div className="flex items-start gap-3">
                <input
                  id="emailPrefs"
                  type="checkbox"
                  checked={emailPrefs}
                  onChange={(e) => setEmailPrefs(e.target.checked)}
                  className="mt-1 rounded border-[#d0d7de] text-[#0969da] focus:ring-[#0969da]"
                />
                <label htmlFor="emailPrefs" className="text-[#24292f]" style={{ fontSize: "13px" }}>
                  רוצה לקבל עדכונים והודעות מזדמנות על הקהילה או על הצעות מיוחדות באזור הפעילות
                </label>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-4">
              <input
                id="agreeTerms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  if (e.target.checked) {
                    setErrorMsg("");
                    setStatus("idle");
                    setSocialError(null);
                  }
                }}
                className="mt-1 rounded border-[#d0d7de] text-[#0969da] focus:ring-[#0969da]"
              />
              <label htmlFor="agreeTerms" className="text-[#24292f] leading-tight" style={{ fontSize: "13px" }}>
                אני מסכים ל
                <Link href="/privacy" className="text-[#0969da] hover:underline">תנאי השירות</Link>
                {" "}ול
                <Link href="/privacy" className="text-[#0969da] hover:underline">מדיניות הפרטיות</Link>
              </label>
            </div>
            <div className="min-h-[1rem]" style={{ marginBottom: "-4px" }}>
              {status === "error" && !emailAlreadyInUse && (
                <p className="text-red-700 text-sm font-medium rounded-md bg-red-50 px-3 py-2 border border-red-300" role="alert">
                  {errorMsg}
                </p>
              )}
              {status === "success" && (
                <div className="rounded-md bg-green-50 px-3 py-2 border border-green-200" role="status">
                  <p className="text-[var(--primary)] font-medium text-sm mb-2">החשבון נוצר בהצלחה!</p>
                  <Link href="/" className="text-sm font-semibold text-[#0969da] hover:underline">
                    ← מעבר לדף הבית
                  </Link>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full min-h-[48px] py-3.5 px-4 bg-[#1a1a1e] text-[#d1d5db] font-semibold hover:bg-[#252529] hover:text-[#e5e7eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              style={{
                borderRadius: "8px",
                fontSize: "1.25rem",
                marginTop: "-4px",
                boxShadow: "0 0 12px rgba(108, 255, 60, 0.35), 0 0 24px rgba(108, 255, 60, 0.15)",
                border: "1px solid rgba(108, 255, 60, 0.4)",
              }}
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
          <p className="text-[#57606a] mt-8 leading-relaxed text-start max-w-[490px]" style={{ fontSize: "11.9px" }}>
            בהרשמה מסכימים ל
            <Link href="/privacy" className="text-[#0969da] hover:underline">תנאי השירות</Link>
            . למידע נוסף על מדיניות הפרטיות של RIDERS — ניתן לעיין ב
            <Link href="/privacy" className="text-[#0969da] hover:underline">מדיניות הפרטיות</Link>
            . נשלח מדי פעם אימיילים הקשורים לחשבון.
          </p>
        </div>
      </section>
      {/* שמאל / למעלה במובייל: פרסומי שחור */}
      <section
        className={`relative w-full min-w-0 flex flex-col items-center text-center px-6 md:px-12 py-10 overflow-hidden bg-[var(--background)] ${
          isMobile ? "" : "min-h-screen justify-between"
        }`}
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
          <span className="absolute top-[10%] right-[15%] w-1 h-1 rounded-full bg-white" />
          <span className="absolute top-[25%] left-[20%] w-1 h-1 rounded-full bg-white/80" />
          <span className="absolute top-[40%] right-[30%] w-1.5 h-1.5 rounded-full bg-white" />
          <span className="absolute top-[55%] left-[10%] w-1 h-1 rounded-full bg-white/70" />
          <span className="absolute top-[70%] right-[25%] w-1 h-1 rounded-full bg-white/80" />
          <span className="absolute top-[80%] left-[35%] w-1 h-1 rounded-full bg-white/60" />
        </div>
        <div className="relative z-10 max-w-md w-full flex flex-col items-center flex-1" style={{ gap: "0.25rem" }}>
          <h1 className="text-2xl md:text-4xl font-bold text-white mt-10 md:mt-[12vh]" style={{ marginBottom: "-8px", lineHeight: 1.2 }}>
            הצטרף לקהילת <span dir="ltr">RIDERS</span>
          </h1>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setOpen(!open)}
            onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
            className="flex flex-col items-center cursor-pointer select-none [&>*:first-child]:mb-0 mb-4"
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
          {!open && (
            <div className="w-full max-w-[320px] md:w-[680px] aspect-square flex-shrink-0 mt-10 md:mt-28 transition-all duration-300">
              <video autoPlay loop muted playsInline className="w-full h-full object-contain object-center">
                <source src="/logodark.mp4" type="video/mp4" />
              </video>
            </div>
          )}
          {open && (
            <ul
              className="mt-3 space-y-3 w-full max-w-md text-sm md:text-lg list-none pl-0 pr-0 break-words flex-1"
              dir="rtl"
              style={{ marginInlineStart: isMobile ? 0 : "36rem" }}
            >
                {benefits.map(({ title, desc }) => (
                  <li key={title} className="list-none">
                    <div className="flex items-center w-fit me-auto" dir="rtl" style={{ columnGap: "0.5em" }}>
                      <span className="text-[var(--primary)] shrink-0">✓</span>
                      <p className="text-white m-0 text-end" style={{ paddingInlineStart: "0.5em" }}>{title}</p>
                    </div>
                    <p className="text-gray-400 m-0 px-1 whitespace-pre-line text-justify" style={{ fontSize: "0.9rem", lineHeight: 1.4, marginTop: "3px" }}>{desc}</p>
                  </li>
                ))}
              </ul>
          )}
        </div>
        {open && (
          <div className="relative z-10 w-[400px] md:w-[520px] h-[155px] md:h-[200px] flex-shrink-0 mt-6">
            <Image src="/riders.png" alt="RIDERS" width={520} height={200} className="w-full h-full object-contain object-center" />
          </div>
        )}
      </section>
    </main>
  );
}
