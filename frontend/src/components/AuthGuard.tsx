"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublicRoute = pathname === "/" || pathname?.startsWith("/auth");

    if (!token && !isPublicRoute) {
      router.push("/auth/login");
    } else {
      setIsReady(true);
    }
  }, [pathname, router]);

  const isPublicRoute = pathname === "/" || pathname?.startsWith("/auth");
  
  // Show nothing until we've checked the token on private routes
  if (!isReady && !isPublicRoute) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
