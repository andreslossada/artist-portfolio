import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { ViewTransition } from "react";

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <ViewTransition default="page-shell">{children}</ViewTransition>
      <SiteFooter />
    </>
  );
}
