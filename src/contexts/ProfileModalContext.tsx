"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ProfileModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ProfileModalContext = createContext<ProfileModalContextType | null>(null);

export function ProfileModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ProfileModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ProfileModalContext.Provider>
  );
}

export function useProfileModal() {
  const ctx = useContext(ProfileModalContext);
  if (!ctx) return { isOpen: false, open: () => {}, close: () => {} };
  return ctx;
}
