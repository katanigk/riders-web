import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import AffiliateHandler from "@/components/AffiliateHandler";
import ProfileModal from "@/components/ProfileModal";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RIDERS",
  description: "הבית של שליחי האופניים המקצועיים",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" suppressHydrationWarning>
      <body
        className={`${heebo.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <AffiliateHandler />
          {children}
          <ProfileModal />
        </AuthProvider>
      </body>
    </html>
  );
}
