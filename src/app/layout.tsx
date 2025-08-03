import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// REMOVE Link import if it's not used elsewhere
import Navbar from "@/components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FriendForever",
  description: "Celebrate your crew!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* <-- Replace the old header with this */}
        {children}
      </body>
    </html>
  );
}