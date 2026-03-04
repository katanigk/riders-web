import SiteLayoutClient from "./SiteLayoutClient";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayoutClient>{children}</SiteLayoutClient>;
}
