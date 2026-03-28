import type { Metadata } from "next";
import "./globals.css";
import { initDb } from "@/lib/db2";

export const metadata: Metadata = {
  title: "Cal.com – The better way to schedule your meetings",
  description: "A fully customizable scheduling platform for individuals and businesses. Create event types, set availability, and let others book time with you.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Production DB initialization - safe to run multiple times
  initDb().catch(console.error);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
