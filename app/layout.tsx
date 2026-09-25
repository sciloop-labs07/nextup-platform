import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextUp — verified opportunities",
  description: "A focused feed of verified opportunities for students and early-career builders.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
