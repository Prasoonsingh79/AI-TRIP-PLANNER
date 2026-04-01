import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Trip Planner | Smart Travel Companion",
  description: "Experience the future of travel with personalized AI-generated itineraries, smart recommendations, and interactive maps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 selection:text-white`}>
        <Navbar />
        <Sidebar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
