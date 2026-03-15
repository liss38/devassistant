
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "DevAssistant - AI Coding Agent",
  description: "React/Next.js AI Agent for developers",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
        {children}
      </body>
    </html>
  );
}