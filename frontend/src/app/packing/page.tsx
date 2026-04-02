"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Package, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Backpack, 
  CloudSun,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function PackingPage() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [loading, setLoading] = useState(false);
  const [packingData, setPackingData] = useState<any>(null);

  const generateList = async () => {
    if (!destination || !dates) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/packing-list", {
        destination,
        travel_dates: dates,
        travelers: "1 Adult",
        age_group: "Adult",
        budget: "Moderate",
        interests: ["Sightseeing"],
        transport_pref: "Flight",
        stay_pref: "Hotel",
        name: "My Trip"
      });
      setPackingData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 lg:pl-72 selection:bg-indigo-500/10 selection:text-indigo-900 overflow-x-hidden relative">
      
      {/* Background Orbs - Subtler for Light Theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[5%] left-[20%] w-[500px] h-[500px] bg-fuchsia-500/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" /> Smart Preparation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter"
          >
            AI <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-indigo-400 to-indigo-600">Packing Assistant</span>
          </motion.h1>
          <p className="text-slate-500 text-sm lg:text-lg max-w-2xl font-medium leading-relaxed">
            Never forget an essential again. Our neural engine analyzes your destination's weather, terrain, and culture to build the perfect kit.
          </p>
        </div>

        {/* Input Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-white border-slate-200 p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[120px] rounded-full -mr-32 -mt-32 transition-all group-hover:bg-indigo-500/10" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Where are you heading?</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600" />
                  <Input 
                    placeholder="e.g. Paris, France" 
                    className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-indigo-600 font-medium"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">When are you going?</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fuchsia-600" />
                  <Input 
                    placeholder="e.g. July 2026" 
                    className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-fuchsia-600 font-medium"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button 
               onClick={generateList}
               disabled={loading || !destination || !dates}
               className="w-full h-16 mt-8 rounded-2xl bg-indigo-600 hover:bg-slate-900 text-white font-black text-sm uppercase tracking-widest gap-2 shadow-xl shadow-indigo-600/20 disabled:opacity-50 group transition-all border-none"
            >
              {loading ? "Generating Smart List..." : "Generate My Packing List"}
              {!loading && <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
            </Button>
          </Card>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {packingData && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-10"
            >
              {/* Weather Summary */}
              <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-indigo-50 rounded-[32px] border border-indigo-100 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                   <CloudSun className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-slate-900">Weather Analysis</h3>
                  <p className="text-indigo-600 font-bold">{packingData.weather_forecast}</p>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packingData.categories.map((cat: any, idx: number) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-white border-slate-200 p-6 rounded-[28px] hover:border-indigo-500/20 transition-all flex flex-col h-full group shadow-lg shadow-slate-200/40">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600/10 transition-colors">
                              {cat.name === 'Clothing' ? <Backpack className="w-5 h-5 text-indigo-600" /> : <Package className="w-5 h-5 text-slate-400" />}
                           </div>
                           <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm">{cat.name}</h4>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-slate-200 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        {cat.items.map((item: string) => (
                           <label key={item} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer group/item transition-all">
                              <input type="checkbox" className="w-5 h-5 rounded-md bg-white border-slate-200 text-indigo-600 focus:ring-0 cursor-pointer" />
                              <span className="text-sm text-slate-600 group-hover/item:text-slate-900 font-bold">{item}</span>
                           </label>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pro Tip */}
              <div className="p-8 bg-fuchsia-50 rounded-[32px] border border-fuchsia-100 flex gap-6 items-start shadow-sm">
                 <div className="p-3 bg-fuchsia-600 rounded-xl shadow-lg shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Pro Preparation Tip</h4>
                    <p className="text-fuchsia-600 font-bold leading-relaxed italic">"{packingData.pro_tip}"</p>
                 </div>
              </div>

              <div className="flex justify-center pt-8">
                 <Button className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all gap-3 shadow-2xl border-none">
                    Save to My Account <ArrowRight className="w-4 h-4" />
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!packingData && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-slate-200 shadow-sm">
                <Backpack className="w-10 h-10 text-slate-300" />
             </div>
             <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Waiting for destination data...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
