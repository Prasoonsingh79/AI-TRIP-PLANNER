"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Map as MapIcon, 
  CloudSun, 
  Hotel, 
  Utensils, 
  CreditCard, 
  Share2, 
  Download,
  Star,
  CheckCircle2,
  Clock,
  Navigation,
  ChevronRight,
  TrendingUp,
  Wallet,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ResultPage() {
  const router = useRouter();
  const [tripData, setTripData] = useState<any>(null);
  const [weather, setWeather] = useState("Loading...");

  useEffect(() => {
    const data = localStorage.getItem("tripResult");
    if (data) {
      const parsedData = JSON.parse(data);
      setTripData(parsedData);
      
      // Load weather
      axios.get("http://localhost:8000/weather?destination=Any")
        .then((res) => setWeather(res.data.forecast))
        .catch(() => setWeather("Sunny, 28°C"));

      // Auto-save to history
      const token = localStorage.getItem("token");
      if (token) {
        axios.post("http://localhost:8000/save-trip", parsedData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(() => console.log("Trip saved to history"))
          .catch((err) => console.error("History sync failed:", err));
      }
    } else {
      router.push("/planner");
    }
  }, [router]);

  if (!tripData) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-white rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Generating your adventure...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background px-4 md:px-8 pt-36 pb-12 lg:pl-72 lg:pr-10 relative selection:bg-indigo-500/30">
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-fuchsia-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10 font-sans">
        
        {/* Header Section */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/5">
          <div className="space-y-4">
            <Link href="/planner" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
            >
              The <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-400">{tripData.destination || "Destination"}</span> <br/> Masterplan
            </motion.h1>
            <p className="text-slate-400 text-lg max-w-2xl font-medium">{tripData.summary}</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 px-5 border-white/5 bg-white/5 text-slate-300 hover:text-white rounded-xl gap-2 font-bold transition-all">
                <Share2 className="w-4 h-4" /> Share
             </Button>
             <Button className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl gap-2 font-bold shadow-lg shadow-indigo-500/20 transition-all">
                <Download className="w-4 h-4" /> Export PDF
             </Button>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <Card className="bg-white/5 border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:border-white/10 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                 <CloudSun className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Forecast</p>
                <p className="text-white font-bold text-lg">{weather}</p>
              </div>
           </Card>
           <Card className="bg-white/5 border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:border-white/10 transition-colors">
             <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                 <Clock className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Duration</p>
                <p className="text-white font-bold text-lg">{tripData.day_wise?.length || 0} Dynamic Days</p>
              </div>
           </Card>
           <Card className="bg-white/5 border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:border-white/10 transition-colors">
             <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                 <Wallet className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Budgeting</p>
                <p className="text-white font-bold text-lg">
                  {tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}
                  {tripData.budget_breakdown?.total_per_person?.toLocaleString() || 0} / Person
                </p>
              </div>
           </Card>
           <Card className="bg-white/5 border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:border-white/10 transition active:scale-95 cursor-pointer">
             <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                 <MapIcon className="w-5 h-5 text-fuchsia-400" />
              </div>
              <Link href="/map" className="flex-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Routing</p>
                <p className="text-white font-bold text-lg flex items-center gap-1 group whitespace-nowrap">Open Map <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></p>
              </Link>
           </Card>
        </section>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Timeline / Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              Daily Journey
            </h2>
            <div className="space-y-6 relative border-l-2 border-white/5 ml-4 pl-8 pt-2">
               {tripData.day_wise?.map((day: any, idx: number) => (
                 <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pb-10 group"
                 >
                    <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full border-2 border-slate-900 bg-white ring-4 ring-indigo-500/20 flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                       <span className="text-xs font-black text-indigo-600">{day.day}</span>
                    </div>
                    <Card className="bg-white/5 border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors">
                      <CardHeader className="bg-white/5 border-b border-white/5 py-4">
                        <CardTitle className="text-lg font-bold text-white tracking-tight flex items-center justify-between">
                           Day {day.day} Details
                           <Badge variant="outline" className="border-indigo-500/20 text-indigo-400 font-bold tracking-widest text-[10px] uppercase">Plan Active</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-6 space-y-4">
                         {day.activities.map((act: string, i: number) => (
                            <div key={i} className="flex gap-4 items-start group">
                               <div className="mt-1.5 w-5 h-5 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                                  <CheckCircle2 className="w-3 h-3 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                               </div>
                               <p className="text-slate-300 font-medium leading-relaxed">{act}</p>
                            </div>
                         ))}
                      </CardContent>
                    </Card>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Sidebar / Recommended Cards */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-white px-2">Recommendations</h2>
            
            <div className="space-y-6">
                {/* Hotels Block */}
                <div className="bg-linear-to-br from-white/10 to-transparent p-6 rounded-[32px] border border-white/5 space-y-5">
                   <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                         <Hotel className="w-4 h-4 text-fuchsia-400" /> Stays
                      </h3>
                      <Link href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</Link>
                   </div>
                   <div className="space-y-4">
                      {tripData.recommendations?.hotels?.map((h: any, i: number) => (
                        <div key={i} className="group bg-slate-900 border border-white/5 p-4 rounded-2xl space-y-2 hover:border-white/20 transition-all active:scale-[0.98]">
                           <div className="flex justify-between items-start">
                              <h4 className="font-bold text-white text-base group-hover:text-fuchsia-400 transition-colors">{h.name}</h4>
                              <div className="flex items-center gap-0.5 text-orange-400 font-bold text-xs"><Star className="w-3 h-3 fill-orange-400" /> {h.rating}</div>
                           </div>
                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{h.price}</p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Dining Block */}
                <div className="bg-linear-to-br from-white/7 to-transparent p-6 rounded-[32px] border border-white/5 space-y-5">
                   <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                         <Utensils className="w-4 h-4 text-emerald-400" /> Dining
                      </h3>
                      <Link href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Explore</Link>
                   </div>
                   <div className="space-y-3">
                      {tripData.recommendations?.restaurants?.map((r: any, i: number) => (
                         <div key={i} className="flex justify-between items-center bg-slate-900 border border-white/5 p-3.5 rounded-xl hover:border-white/10 transition-colors">
                            <span className="font-bold text-slate-200 text-sm">{r.name}</span>
                            <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-none text-[10px] uppercase font-bold tracking-widest">{r.cuisine}</Badge>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Budget Calculator Micro-App */}
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 to-fuchsia-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-7 rounded-[40px] border border-indigo-500/20 bg-linear-to-br from-indigo-900/40 to-slate-900 backdrop-blur-3xl space-y-6">
                    <h3 className="text-base font-black text-white flex items-center gap-3">
                       <CreditCard className="w-5 h-5 text-indigo-400" /> Expense Splitter
                    </h3>
                    <div className="space-y-4">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                          <span>Transport</span> <span>{tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}{tripData.budget_breakdown?.per_person?.transport?.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                          <span>Stays</span> <span>{tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}{tripData.budget_breakdown?.per_person?.stay?.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                          <span>Culinary</span> <span>{tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}{tripData.budget_breakdown?.per_person?.food?.toLocaleString()}</span>
                       </div>
                       <div className="h-px bg-white/10 my-4" />
                       <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Total Budget</p>
                            <p className="text-3xl font-black text-white">
                              {tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}
                              {tripData.budget_breakdown?.total_per_person?.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Per Person</p>
                       </div>
                       <Button className="w-full h-11 bg-white/3 hover:bg-white/8 text-white border border-white/5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                          Split Bill with Group
                       </Button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
