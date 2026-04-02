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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900 px-6">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-xl shadow-indigo-600/10" />
        <div className="text-center space-y-2">
          <p className="text-slate-900 font-black text-2xl tracking-tighter">Architecting Your Escape...</p>
          <p className="text-slate-500 font-medium">Neural engine is processing global data points</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-8 pt-36 pb-12 lg:pl-72 lg:pr-10 relative selection:bg-indigo-500/10 selection:text-indigo-900">
      
      {/* Background elements - Subtler for Light Theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-fuchsia-500/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10 font-sans">
        
        {/* Header Section */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="space-y-4">
            <Link href="/planner" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-indigo-600 transition-all">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase"
            >
              The <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400">{tripData.destination || "Destination"}</span> <br/> Masterplan
            </motion.h1>
            <p className="text-slate-600 text-lg max-w-2xl font-medium leading-relaxed italic">"{tripData.summary}"</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-12 px-6 border-slate-200 bg-white text-slate-600 hover:text-slate-900 rounded-2xl gap-2 font-black text-xs uppercase tracking-widest shadow-sm transition-all border-none">
                <Share2 className="w-4 h-4" /> Share
             </Button>
             <Button className="h-12 px-8 bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl gap-2 font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/10 transition-all border-none">
                <Download className="w-4 h-4" /> Export
             </Button>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: "Forecast", val: weather, icon: CloudSun, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
             { label: "Duration", val: `${tripData.day_wise?.length || 0} Dynamic Days`, icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
             { label: "Budgeting", val: `${tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}${tripData.budget_breakdown?.total_per_person?.toLocaleString() || 0} / Person`, icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
             { label: "Routing", val: "Open Map View", icon: MapIcon, color: "text-fuchsia-600", bg: "bg-fuchsia-50", border: "border-fuchsia-100", link: "/map" }
           ].map((stat, i) => (
             <Link key={i} href={stat.link || "#"}>
               <Card className={cn(
                 "bg-white border-slate-100 p-5 rounded-3xl flex flex-col gap-3 hover:border-indigo-500/20 transition-all shadow-xl shadow-slate-200/40 group",
                 stat.link ? "cursor-pointer active:scale-95" : ""
               )}>
                  <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner", stat.bg, stat.border)}>
                     <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-slate-900 font-black text-base tracking-tight truncate leading-none group-hover:text-indigo-600 transition-colors">{stat.val}</p>
                  </div>
               </Card>
             </Link>
           ))}
        </section>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Timeline / Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-widest pl-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Daily Journey
            </h2>
            <div className="space-y-6 relative border-l-2 border-slate-200 ml-4 pl-8 pt-2">
               {tripData.day_wise?.map((day: any, idx: number) => (
                 <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pb-10 group"
                 >
                    <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full border-2 border-white bg-indigo-600 shadow-lg shadow-indigo-600/30 flex items-center justify-center z-10 transition-all group-hover:scale-110">
                       <span className="text-[10px] font-black text-white">{day.day}</span>
                    </div>
                    <Card className="bg-white border-slate-200 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/20 transition-all shadow-xl shadow-slate-200/40">
                      <CardHeader className="bg-slate-50 border-b border-slate-200 py-5">
                        <CardTitle className="text-lg font-black text-slate-900 tracking-tight flex items-center justify-between uppercase">
                           Day {day.day} Insight
                           <Badge className="bg-indigo-600 text-white font-black tracking-widest text-[9px] uppercase border-none h-6 px-3">Plan Active</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-8 space-y-5">
                         {day.activities.map((act: string, i: number) => (
                            <div key={i} className="flex gap-4 items-start group/item">
                               <div className="mt-1.5 w-6 h-6 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 transition-colors group-hover/item:bg-indigo-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 group-hover/item:text-white transition-colors" />
                               </div>
                               <p className="text-slate-600 font-bold leading-relaxed group-hover/item:text-slate-900 transition-colors">{act}</p>
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
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest px-2">Neural Picks</h2>
            
            <div className="space-y-6">
                {/* Hotels Block */}
                <div className="bg-white p-7 rounded-[40px] border border-slate-200 space-y-6 shadow-xl shadow-slate-200/40">
                   <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                         <Hotel className="w-4 h-4 text-fuchsia-600" /> Stays
                      </h3>
                      <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:text-indigo-400 transition-colors">View All</Link>
                   </div>
                   <div className="space-y-4">
                      {tripData.recommendations?.hotels?.map((h: any, i: number) => (
                        <div key={i} className="group bg-slate-50 border border-slate-100 p-4 rounded-3xl space-y-2 hover:border-indigo-500/20 transition-all active:scale-[0.98] shadow-sm">
                           <div className="flex justify-between items-start">
                              <h4 className="font-black text-slate-900 text-sm group-hover:text-fuchsia-600 transition-colors uppercase leading-tight">{h.name}</h4>
                              <div className="flex items-center gap-0.5 text-orange-500 font-black text-xs"><Star className="w-3 h-3 fill-orange-500" /> {h.rating}</div>
                           </div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{h.price} / NIGHT</p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Dining Block */}
                <div className="bg-white p-7 rounded-[40px] border border-slate-200 space-y-6 shadow-xl shadow-slate-200/40">
                   <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                         <Utensils className="w-4 h-4 text-emerald-600" /> Dining
                      </h3>
                      <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:text-indigo-400 transition-colors">Explore</Link>
                   </div>
                   <div className="space-y-3">
                      {tripData.recommendations?.restaurants?.map((r: any, i: number) => (
                         <div key={i} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:border-emerald-500/20 transition-all shadow-sm">
                            <span className="font-black text-slate-900 text-xs uppercase tracking-tight">{r.name}</span>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none text-[9px] uppercase font-black tracking-widest h-6 shadow-sm">
                               {r.cuisine}
                            </Badge>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Budget Calculator Micro-App */}
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-indigo-600/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-8 rounded-[48px] border border-slate-200 bg-white shadow-3xl shadow-slate-200 space-y-8 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full translate-x-16 -translate-y-16" />
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-3 uppercase tracking-widest">
                       <CreditCard className="w-5 h-5 text-indigo-600" /> Expense Engine
                    </h3>
                    <div className="space-y-5">
                       {[
                         { l: "Transport", v: tripData.budget_breakdown?.per_person?.transport },
                         { l: "Stays", v: tripData.budget_breakdown?.per_person?.stay },
                         { l: "Culinary", v: tripData.budget_breakdown?.per_person?.food }
                       ].map((item, i) => (
                         <div key={i} className="flex justify-between text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-slate-600 transition-colors">
                            <span>{item.l}</span> 
                            <span>{tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}{item.v?.toLocaleString()}</span>
                         </div>
                       ))}
                       <div className="h-px bg-slate-100 my-4" />
                       <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 mb-1">Total Budget</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                              {tripData.budget_breakdown?.currency === 'INR' ? '₹' : '$'}
                              {tripData.budget_breakdown?.total_per_person?.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Per Participant</p>
                       </div>
                       <Button className="w-full h-14 bg-indigo-600 hover:bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border-none shadow-xl shadow-indigo-600/20">
                          Neural Split Bill
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
