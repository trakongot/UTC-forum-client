import React from "react";
import type { Metadata } from "next";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";

export const metadata: Metadata = {
  title: "Threads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Topbar />
      <main className="flex flex-row">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col items-center bg-light-2 px-6 pb-10 pt-28 dark:bg-dark-1 max-md:pb-32 sm:px-10">
          <div className="w-full max-w-3xl">{children}</div>
        </section>
        <RightSidebar />
      </main>
      <Bottombar />
    </>
  );
}
