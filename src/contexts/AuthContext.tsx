"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type Role = "guest" | "member" | "club";

interface AuthState {
  user: { uid: string; email: string | null; nickname?: string; photoURL?: string | null } | null;
  role: Role;
  loading: boolean;
  profileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const defaultState: AuthState = {
  user: null,
  role: "guest",
  loading: true,
  profileModalOpen: false,
  openProfileModal: () => {},
  closeProfileModal: () => {},
};

const AuthContext = createContext<AuthState>(defaultState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultState);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    if (!auth) {
      setState({ user: null, role: "guest", loading: false });
      return;
    }
    let cancelled = false;
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (cancelled) return;
      if (!firebaseUser) {
        setState({ user: null, role: "guest", loading: false });
        return;
      }

      let role: Role = "member";
      let nickname: string | undefined;
      if (db) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const fetchTimeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 5000)
          );
          const snap = await Promise.race([getDoc(userRef), fetchTimeout]);
          const data = snap.data();
          if (data?.role === "club") role = "club";
          else if (data?.role === "member" || data?.role === undefined) role = "member";
          const fromDoc = typeof data?.nickname === "string" && data.nickname.trim() ? data.nickname.trim() : null;
          const fallback = firebaseUser.displayName?.trim() || (firebaseUser.email ? firebaseUser.email.split("@")[0] : null);
          nickname = (fromDoc ?? fallback)?.trim() || undefined;
        } catch {
          role = "member";
          const fallback = firebaseUser.displayName?.trim() || (firebaseUser.email ? firebaseUser.email.split("@")[0] : null);
          nickname = fallback?.trim() || undefined;
        }
      } else {
        const fallback = firebaseUser.displayName?.trim() || (firebaseUser.email ? firebaseUser.email.split("@")[0] : null);
        nickname = fallback?.trim() || undefined;
      }
      if (cancelled) return;
      setState({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? null,
          nickname: nickname?.trim() || undefined,
          photoURL: firebaseUser.photoURL ?? null,
        },
        role,
        loading: false,
      });
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  const value: AuthState = {
    ...state,
    profileModalOpen,
    openProfileModal: () => setProfileModalOpen(true),
    closeProfileModal: () => setProfileModalOpen(false),
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
