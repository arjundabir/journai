import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";

const inter = Jersey_10({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "JournAI",
  description: "Explore Campus with AI",
};

export const revalidate = 100; // revalidate the data at most every hour

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
