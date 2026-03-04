"use client";

import ProfileModal from "./ProfileModal";

export default function ProfileModalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProfileModal />
    </>
  );
}
