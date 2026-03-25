"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/header";
import { Navbar1 } from "@/components/navbar1";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar1 />}
      {!isDashboardRoute && <Header />}
      {children}
    </>
  );
}
