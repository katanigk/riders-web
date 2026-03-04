"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleLayoutHeader from "@/components/ArticleLayoutHeader";

function isArticlePage(pathname: string): boolean {
  const base = "/knowledge/";
  return pathname.startsWith(base) && pathname.length > base.length;
}

export default function SiteLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showArticleLayout = isArticlePage(pathname ?? "");

  if (showArticleLayout) {
    return (
      <>
        <ArticleLayoutHeader />
        {children}
      </>
    );
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
