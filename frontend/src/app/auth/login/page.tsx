"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store token in localStorage and cookies (SESSION ONLY - no max-age)
      localStorage.setItem("token", data.access_token);
      document.cookie = `token=${data.access_token}; path=/; SameSite=Lax`;
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/planner");
      }, 1500);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      if (!success) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center py-12 px-4 overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Success Popup Overlay */}
      {success && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="p-10 rounded-[3rem] bg-white text-slate-950 flex flex-col items-center gap-4 text-center shadow-2xl shadow-indigo-500/20"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Login Successful!</h3>
            <p className="text-slate-500 font-medium">Entering your neural itinerary engine...</p>
          </motion.div>
        </motion.div>
      )}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/20 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white/5 p-8 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-400 mt-2">Log in to your AI Trip Planner account</p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Email Address</Label>
            <Input
              required
              type="email"
              className="bg-slate-900/50 border-slate-700 h-12 focus-visible:ring-cyan-500 text-white transition-all text-base px-4"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-slate-300">Password</Label>
              <Link href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</Link>
            </div>
            <Input
              required
              type="password"
              className="bg-slate-900/50 border-slate-700 h-12 focus-visible:ring-cyan-500 text-white transition-all text-base px-4"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-500/25 transition-all font-bold mt-4"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
