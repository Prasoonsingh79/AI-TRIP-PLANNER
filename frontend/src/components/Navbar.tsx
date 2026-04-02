"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, User, LogIn, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Planner", href: "/planner" },
    { name: "Packing Helper", href: "/packing" },
    { name: "AI Chat", href: "/chat" },
  ];

  return (
    <nav className="fixed top-2 inset-x-0 mx-auto w-[98%] max-w-7xl z-100 transition-all duration-300">
      <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-2xl px-6 shadow-2xl shadow-black/40">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 via-fuchsia-600 to-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center text-white font-black text-xl group-hover:rotate-6 transition-transform">
                A
              </div>
              <span className="font-black text-2xl tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">
                AI Advisor
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className="relative px-6 py-2 group">
                  <span className={`relative z-10 text-sm font-black uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-white"
                  }`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                  {!isActive && (
                     <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/auth/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Auth
              </motion.button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-linear-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white font-black uppercase tracking-[0.15em] rounded-2xl h-12 px-8 shadow-xl shadow-indigo-600/20 group transition-all duration-300 border-none">
                 Join Elite
                 <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
