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
  // Fresh MySQL production build trigger
  initDb().catch(console.error);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
