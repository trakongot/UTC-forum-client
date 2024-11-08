import React from "react";

import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-light-2 dark:bg-dark-2">{children}</body>
      </html>
    </ClerkProvider>
  );
}
