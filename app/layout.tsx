import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaze into the Abyss",
  description: "28 single-purpose experiences of questionable utility. Press Gaze Further to continue.",
  openGraph: {
    title: "Gaze into the Abyss",
    description: "28 single-purpose experiences of questionable utility. Press Gaze Further to continue.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gaze into the Abyss",
    description: "28 single-purpose experiences of questionable utility. Press Gaze Further to continue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
