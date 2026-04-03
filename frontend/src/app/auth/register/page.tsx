"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";

import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/register", {
        email,
        password,
        full_name: name,
      });

      const data = response.data;

      // Store token in localStorage and cookies for middleware
      localStorage.setItem("token", data.access_token);
      document.cookie = `token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
      
      // Delay slightly for the redirect to ensure cookies are ready.
      setTimeout(() => {
        window.location.href = "/planner";
      }, 500);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center py-12 px-4 overflow-hidden relative selection:bg-cyan-500/30">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white/5 p-8 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400 tracking-tight">
            Create an Account
          </h2>
          <p className="text-slate-400 mt-2">Join to build and save smart travel plans.</p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">Full Name</Label>
            <Input
              required
              type="text"
              className="bg-slate-900/50 border-slate-700 h-12 focus-visible:ring-cyan-500 text-white transition-all text-base px-4"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <Label className="text-slate-300">Password</Label>
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
            className="w-full h-12 text-lg bg-linear-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl shadow-lg shadow-indigo-500/25 transition-all font-bold mt-4 text-white"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
