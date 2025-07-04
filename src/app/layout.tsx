import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { QUERIES } from "@/server/db/queries";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hedge Crates",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let credits = 0;
  if (session.userId) {
    const [user] = await QUERIES.getUserByClerkId(session.userId);
    credits = user?.credits ?? 0;
  }
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.variable} ${geistMono.variable} antialiased bg-black text-white`}
        >
          <div className="max-w-7xl mx-auto">
            <Navbar creditBalance={credits} />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
