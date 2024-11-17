import React from "react";
import "./globals.css";
import ReactQueryProvider from "@/lib/provider/reactQuery";
// import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className="h-full overflow-auto bg-light-2 dark:bg-dark-2">
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
