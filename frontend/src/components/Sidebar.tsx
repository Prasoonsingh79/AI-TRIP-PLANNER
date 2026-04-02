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
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 bottom-0 w-64 bg-slate-50/50 backdrop-blur-3xl border-r border-slate-200 z-90 hidden lg:flex flex-col p-6 pt-28 shadow-2xl shadow-slate-200/50"
    >
      <nav className="flex-1 space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link key={link.href} href={link.href}>
              <motion.div 
                whileHover={{ x: 5 }}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 transition-all duration-300 group relative",
                  isActive 
                    ? "text-indigo-600 font-black" 
                    : "text-slate-400 hover:text-slate-800"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 rounded-full"
                  />
                )}
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-700"
                )} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] leading-none">
                   {link.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-6 border-t border-slate-200">
        <button className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-slate-800 transition-all text-[10px] font-black uppercase tracking-[0.25em] group">
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          Settings
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            window.location.href = "/auth/login";
          }}
          className="w-full flex items-center gap-4 px-6 py-4 text-rose-500/70 hover:text-rose-600 hover:bg-rose-500/5 transition-all text-[10px] font-black uppercase tracking-[0.25em]"
        >
          <LogOut className="w-5 h-5" />
          Disconnect
        </button>
      </div>
    </motion.aside>
  );
}
