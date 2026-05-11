import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaze into the Abyss",
  description: "You have been chosen.",
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
