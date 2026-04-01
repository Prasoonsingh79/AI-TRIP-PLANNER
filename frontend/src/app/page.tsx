"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { Compass, Globe, Sparkles, MapPin, Search, Plane, ShieldCheck, Heart, ArrowRight, Star, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "AI Powerered Itineraries",
    desc: "Our neural networks craft hyper-personalized travel plans based on your unique style, budget, and real-time data.",
    icon: Globe,
    color: "from-blue-500 to-indigo-600",
    delay: 0.1
  },
  {
    title: "Vivid Interactive Maps",
    desc: "Visualize your entire route with stunning high-fidelity maps, local hotspots, and dynamic waypoint tracking.",
    icon: MapPin,
    color: "from-fuchsia-500 to-rose-600",
    delay: 0.2
  },
  {
    title: "Smart Budget Insights",
    desc: "Real-time cost calculators and localized pricing data to keep your adventure within your financial orbit.",
    icon: Sparkles,
    color: "from-amber-400 to-orange-600",
    delay: 0.3
  }
]

const steps = [
  { step: "01", title: "Pick Your Vibe", desc: "Tell us where you want to go and what kind of experience you're after." },
  { step: "02", title: "AI Generation", desc: "Our AI analyzes thousands of data points to build your custom plan." },
  { step: "03", title: "Refine & Edit", desc: "Tweak the details on an interactive map until it's absolutely perfect." },
  { step: "04", title: "Fly & Explore", desc: "Save your plan and start your journey with offline access and smart updates." },
]

export default function Home() {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-slate-950 font-sans selection:bg-indigo-500/40">
      
      {/* Dynamic Background Blobs - Enhanced */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-600/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-24 space-y-32">
        
        {/* --- Hero Section --- */}
        <section className="text-center max-w-5xl mx-auto space-y-12">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md"
            >
              <Badge className="bg-indigo-600 text-white font-bold border-none h-6 px-3">NEW v2.0</Badge>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">The Future of Travel is Here</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.9]"
            >
              Travel Smarter <br/> 
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">
                Plan Better.
              </span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl text-slate-400 font-medium tracking-tight h-10 max-w-2xl mx-auto"
            >
              Tailored adventures for <span className="text-white font-bold border-b-2 border-indigo-500/50">
                <Typewriter 
                  words={["Digital Nomads", "Backpackers", "Luxury Seekers", "Solo Travelers", "Families"]}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
            >
              <Link href="/planner">
                <Button className="h-16 px-12 text-lg bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] shadow-2xl shadow-indigo-500/30 font-bold group transition-all duration-300">
                   Get Started Free 
                   <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="h-16 px-12 text-lg text-white border-white/10 bg-white/5 hover:bg-white/10 rounded-[2rem] transition-all duration-300 font-semibold backdrop-blur-sm">
                   Watch Demo
                </Button>
              </Link>
            </motion.div>
        </section>

        {/* --- Trusted By Section --- */}
        <section className="text-center pt-20 border-t border-white/5">
           <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-10">Loved by travelers from around the globe</p>
           <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale invert">
              <Globe className="w-10 h-10" />
              <Plane className="w-10 h-10" />
              <MapPin className="w-10 h-10" />
              <Compass className="w-10 h-10" />
              <Heart className="w-10 h-10" />
           </div>
        </section>

        {/* --- Feature Grid --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {features.map((f, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: f.delay }}
             >
                <Card className="group relative overflow-hidden h-full bg-linear-to-b from-white/7 to-transparent border-white/5 hover:border-indigo-500/30 transition-all duration-500 rounded-[2.5rem] p-6 shadow-2xl">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all" />
                   <CardContent className="p-4 space-y-8 relative z-10">
                      <div className={`w-16 h-16 rounded-3xl bg-linear-to-tr ${f.color} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                         <f.icon className="w-8 h-8 text-white shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black text-white tracking-tight">{f.title}</h3>
                        <p className="text-slate-400 text-base leading-relaxed">{f.desc}</p>
                      </div>
                   </CardContent>
                </Card>
             </motion.div>
           ))}
        </section>

        {/* --- "How it Works" Section --- */}
        <section className="bg-white/2 border border-white/5 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                       The simplest way to <br/>
                       <span className="text-indigo-400">explore the world.</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-medium">
                       We've distilled travel planning down to its essence. No more endless tabs, no more guesswork.
                    </p>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {steps.map((s, idx) => (
                      <div key={idx} className="space-y-2">
                         <div className="text-indigo-500 font-black text-sm tracking-widest">{s.step}</div>
                         <h4 className="text-white font-bold text-lg">{s.title}</h4>
                         <p className="text-slate-500 text-sm">{s.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all animate-pulse" />
                 <div className="relative aspect-square rounded-[3rem] bg-slate-900 border border-white/10 shadow-3xl overflow-hidden">
                    {/* Simplified UI Mockup for visuals */}
                    <div className="absolute inset-0 p-8 flex flex-col gap-6">
                        <div className="h-12 w-3/4 bg-white/5 rounded-2xl animate-pulse" />
                        <div className="h-40 w-full bg-white/5 rounded-3xl animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="flex gap-4">
                           <div className="h-10 w-24 bg-indigo-600/50 rounded-xl" />
                           <div className="h-10 w-24 bg-white/5 rounded-xl" />
                        </div>
                        <div className="space-y-3 mt-auto">
                           <div className="h-4 w-full bg-white/5 rounded-full" />
                           <div className="h-4 w-5/6 bg-white/5 rounded-full" />
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Stat Bar --- - Enhanced */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="p-12 md:p-16 rounded-[4rem] border border-white/10 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-3xl flex flex-wrap justify-around gap-12 text-center shadow-3xl"
        >
          {[
             { val: "50k+", label: "Trips Planned", color: "text-indigo-400" },
             { val: "194", label: "Countries Covered", color: "text-fuchsia-400" },
             { val: "4.9/5", label: "Global Rating", color: "text-cyan-400" },
             { val: "99.9%", label: "Satisfaction", color: "text-emerald-400" }
          ].map((stat, i) => (
            <div key={i} className="space-y-3 group cursor-default">
               <div className="text-5xl md:text-6xl font-black text-white group-hover:scale-110 transition-transform duration-300">{stat.val}</div>
               <div className={`text-xs uppercase font-black tracking-[0.3em] ${stat.color} shadow-sm`}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* --- Footer Upgrade --- */}
        <footer className="pt-20 pb-10 border-t border-white/5 space-y-16">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="space-y-6 max-w-xs transition-all">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-xl shadow-indigo-600/20">A</div>
                    <span className="font-black tracking-tighter text-2xl text-white">AI Advisor</span>
                 </div>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed">
                   Redefining how humanity explores the planet, one intelligent itinerary at a time. Join the revolution.
                 </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
                 <div className="space-y-4">
                    <h5 className="text-white font-bold text-sm tracking-widest uppercase">Explore</h5>
                    <div className="flex flex-col gap-3 text-sm text-slate-500 font-semibold">
                       <Link href="/planner" className="hover:text-indigo-400 transition-colors">Planner</Link>
                       <Link href="/map" className="hover:text-indigo-400 transition-colors">Map View</Link>
                       <Link href="/chat" className="hover:text-indigo-400 transition-colors">AI Chat</Link>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-white font-bold text-sm tracking-widest uppercase">Company</h5>
                    <div className="flex flex-col gap-3 text-sm text-slate-500 font-semibold">
                       <Link href="#" className="hover:text-indigo-400 transition-colors">About</Link>
                       <Link href="#" className="hover:text-indigo-400 transition-colors">Careers</Link>
                       <Link href="#" className="hover:text-indigo-400 transition-colors">Contact</Link>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-white font-bold text-sm tracking-widest uppercase">Help</h5>
                    <div className="flex flex-col gap-3 text-sm text-slate-500 font-semibold">
                       <Link href="#" className="hover:text-indigo-400 transition-colors">Privacy</Link>
                       <Link href="#" className="hover:text-indigo-400 transition-colors">Terms</Link>
                       <Link href="#" className="hover:text-indigo-400 transition-colors">Support</Link>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest border-t border-white/5 pt-10">
              <p>© 2026 Antigravity Labs. All rights reserved.</p>
              <div className="flex gap-8">
                 <Heart className="w-4 h-4 hover:text-rose-500 transition-colors cursor-pointer" />
                 <ShieldCheck className="w-4 h-4 hover:text-emerald-500 transition-colors cursor-pointer" />
                 <Star className="w-4 h-4 hover:text-amber-500 transition-colors cursor-pointer" />
              </div>
           </div>
        </footer>

      </div>
    </div>
  )
}
