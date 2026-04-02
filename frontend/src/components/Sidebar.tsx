"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  Map as MapIcon, 
  Calendar, 
  Settings, 
  LogOut, 
  User,
  Heart,
  History,
  LayoutDashboard,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Trip Planner", href: "/planner", icon: Calendar },
  { name: "Packing Assistant", href: "/packing", icon: ShieldCheck },
  { name: "AI Chat", href: "/chat", icon: Compass },
  { name: "History", href: "/history", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();

  // Hide sidebar on landing page and auth pages
  if (pathname === "/" || pathname?.startsWith("/auth")) return null;

  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-2 top-20 bottom-2 w-64 bg-slate-900/80 backdrop-blur-3xl border border-white/10 z-90 hidden lg:flex flex-col rounded-2xl shadow-2xl p-4"
    >
      <div className="h-16 flex items-center px-4 border-b border-white/5 mb-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-fuchsia-600 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-indigo-600/20">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-white leading-none">Advisor</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Premium AI</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-3.5 pt-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link key={link.href} href={link.href}>
              <motion.div 
                whileHover={{ x: 5 }}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10" 
                    : "text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"
                  />
                )}
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-300"
                )} />
                <span className="text-sm font-black uppercase tracking-widest leading-none">
                   {link.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 pt-6 border-t border-white/5">
        <motion.div 
           whileHover={{ scale: 1.02 }}
           className="bg-linear-to-r from-indigo-600/10 to-transparent p-4 rounded-2xl mb-4 border border-indigo-500/20"
        >
           <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Pro Plan Active</span>
           </div>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Neural Token Access: 100%</p>
        </motion.div>

        <button className="w-full flex items-center gap-4 px-6 py-4 text-slate-600 hover:text-slate-200 hover:bg-white/5 transition-all text-sm font-black uppercase tracking-widest group">
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          Settings
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            window.location.href = "/auth/login";
          }}
          className="w-full flex items-center gap-4 px-6 py-4 text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-black uppercase tracking-widest leading-none"
        >
          <LogOut className="w-5 h-5" />
          Disconnect
        </button>
      </div>
    </motion.aside>
  );
}
