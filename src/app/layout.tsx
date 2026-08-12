import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import AffiliateHandler from "@/components/AffiliateHandler";
import ProfileModal from "@/components/ProfileModal";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
});

const GA_MEASUREMENT_ID = "G-HGK8RYTZVD";

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <AuthProvider>
          <AffiliateHandler />
          {children}
          <ProfileModal />
        </AuthProvider>
      </body>
    </html>
  );
}
