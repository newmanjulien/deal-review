import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Overbase",
  description: "Canvas-first dashboard shell with a functional icon rail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
