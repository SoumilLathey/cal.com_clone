import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schedulo – The better way to schedule your meetings",
  description: "A fully customizable scheduling platform for individuals and businesses. Create event types, set availability, and let others book time with you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
